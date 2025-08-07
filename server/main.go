package main

import (
	"encoding/json"
	"final_projecAI_GO/model"
	"final_projecAI_GO/service"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

// Initialize the services
var fileService = &service.FileService{}
var aiService = &service.AIService{Client: &http.Client{}}
var store = sessions.NewCookieStore([]byte("my-key"))

func getSession(r *http.Request) *sessions.Session {
	session, _ := store.Get(r, "chat-session")
	return session
}

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	token := os.Getenv("HUGGINGFACE_TOKEN")
	if token == "" {
		log.Fatal("HUGGINGFACE_TOKEN is not set in the .env file")
	}

	router := mux.NewRouter()

	router.HandleFunc("/upload", func(w http.ResponseWriter, r *http.Request) {
		// TODO: answer here

		err := r.ParseMultipartForm(10 << 20)
		if err != nil {
			http.Error(w, "Unable to parse form", http.StatusBadRequest)
			return
		}

		token := os.Getenv("HUGGINGFACE_TOKEN")
		if token == "" {
			http.Error(w, "HUGGINGFACE_TOKEN not set", http.StatusInternalServerError)
			return
		}

		file, _, err := r.FormFile("file")
		if err != nil {
			http.Error(w, "Unable to retrieve file", http.StatusBadRequest)
			return
		}
		defer file.Close()

		fileContent, err := ioutil.ReadAll(file)
		if err != nil {
			http.Error(w, "Failed to read file", http.StatusInternalServerError)
			return
		}

		table, err := fileService.ProcessFile(string(fileContent))
		if err != nil {
			http.Error(w, "Failed to process file: "+err.Error(), http.StatusInternalServerError)
			return
		}

		query := r.FormValue("query")
		if query == "" {
			http.Error(w, "Missing query for analysis", http.StatusBadRequest)
			return
		}

		result, err := aiService.AnalyzeData(table, query, token)
		if err != nil {
			http.Error(w, "Failed to analyze data: "+err.Error(), http.StatusInternalServerError)
			return
		}

		tapasResponse := model.TapasResponse{
			Answer: result,
		}

		response := map[string]interface{}{
			"status": "success",
			"data":   tapasResponse,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
		// batas pengerjaan
	}).Methods("POST")

	router.HandleFunc("/chat", func(w http.ResponseWriter, r *http.Request) {
		// TODO: answer here

		session := getSession(r)

		var req struct {
			Query string `json:"query"`
		}
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request", http.StatusBadRequest)
			return
		}

		token := os.Getenv("HUGGINGFACE_TOKEN")
		if token == "" {
			http.Error(w, "HUGGINGFACE_TOKEN not set", http.StatusInternalServerError)
			return
		}

		var context string
		if sessionContext, ok := session.Values["context"].(string); ok {
			context = sessionContext
		} else {

			context = ""
		}

		response, err := aiService.ChatWithAI(context, req.Query, token)
		if err != nil {
			http.Error(w, "Failed to chat with AI: "+err.Error(), http.StatusInternalServerError)
			return
		}

		session.Values["context"] = context + "\n" + req.Query + "\n" + response.GeneratedText
		session.Save(r, w)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{
			"status": "success",
			"answer": response.GeneratedText,
		})
	}).Methods("POST")

	corsHandler := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"}, // Allow your React app's origin
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Content-Type", "Authorization"},
	}).Handler(router)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server running on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, corsHandler))
}

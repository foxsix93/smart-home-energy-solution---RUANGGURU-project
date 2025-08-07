package service

import (
	"bytes"
	"encoding/json"
	"errors"
	"final_projecAI_GO/model"
	"fmt"
	"io/ioutil"
	"net/http"
)

type HTTPClient interface {
	Do(req *http.Request) (*http.Response, error)
}

type AIService struct {
	Client HTTPClient
}

func (s *AIService) AnalyzeData(table map[string][]string, query, token string) (string, error) {

	aiRequest := model.AIRequest{
		Inputs: model.Inputs{
			Table: table,
			Query: query,
		},
	}

	if len(table) == 0 {
		return "", errors.New("table is empty")
	}

	url := "https://api-inference.huggingface.co/models/google/tapas-large-finetuned-wtq"
	reqBody, err := json.Marshal(aiRequest)
	if err != nil {
		return "", fmt.Errorf("failed to marshal request: %v", err)
	}

	req, err := http.NewRequest("POST", url, ioutil.NopCloser(bytes.NewReader(reqBody)))
	if err != nil {
		return "", fmt.Errorf("failed to create request: %v", err)
	}

	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Content-Type", "application/json")

	resp, err := s.Client.Do(req)
	if err != nil {
		return "", fmt.Errorf("failed to send request: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("received non-OK response: %v", resp.Status)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("failed to read response body: %v", err)
	}

	fmt.Println("Response Body:", string(body))

	var tapasResponse model.TapasResponse
	if err := json.Unmarshal(body, &tapasResponse); err != nil {
		return "", fmt.Errorf("failed to unmarshal response JSON: %v", err)
	}

	if len(tapasResponse.Cells) > 0 {
		return tapasResponse.Cells[0], nil
	}
	return "", errors.New("no cells found in response")
	// return nil, nil // TODO: replace this
}

func (s *AIService) ChatWithAI(context, query, token string) (model.ChatResponse, error) {
	// TODO: answer here

	url := "https://api-inference.huggingface.co/models/microsoft/Phi-3.5-mini-instruct"

	payload := map[string]string{
		"inputs": context + "\nUser: " + query + "\nAI:",
	}

	jsonData, err := json.Marshal(payload)
	if err != nil {
		return model.ChatResponse{}, errors.New("failed to marshal chat payload")
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		return model.ChatResponse{}, errors.New("failed to create HTTP request")
	}

	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Content-Type", "application/json")

	resp, err := s.Client.Do(req)
	if err != nil {
		return model.ChatResponse{}, errors.New("failed to send HTTP request to Hugging Face API")
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return model.ChatResponse{}, errors.New("Hugging Face API returned status: " + resp.Status)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return model.ChatResponse{}, errors.New("failed to read response body")
	}

	var result []map[string]interface{}
	err = json.Unmarshal(body, &result)
	if err != nil {
		return model.ChatResponse{}, errors.New("failed to unmarshal response JSON")
	}
	fmt.Println("Response Body2:", result)
	if len(result) > 0 {
		if generatedText, ok := result[0]["generated_text"].(string); ok {
			return model.ChatResponse{GeneratedText: generatedText}, nil
		}
	}

	return model.ChatResponse{}, errors.New("no generated text found in response")
}

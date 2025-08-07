import React, { useState } from "react";
import axios from "axios";
import "./index.css";
import FileUploadSection from "./components/FileUploadSection";
import ChatSection from "./components/ChatSection";
import LoadingIndicator from "./components/LoadingIndicator";
import ResponseDisplay from "./components/ResponseDisplay";
import Gallery from "./components/Gallery";
import background from "./components/gambar7.jpeg";
import ContactBar from "./components/ContactBar";
import About from "./components/About";

import image1 from "./components/gambar6.jpeg";
import image2 from "./components/gambar1.jpg";
import image3 from "./components/gambar5.jpeg";
import image4 from "./components/gambar4.jpeg";
import image5 from "./components/gambar2.jpg";

const images = [image1, image2, image3, image4, image5];

function App() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("query", question);

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResponse(res.data.data.answer);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChat = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/chat", { query });
      setResponse(res.data.answer);
    } catch (error) {
      console.error("Error querying chat:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="hidden md:block object-top">
        <Gallery images={images} />
      </div>
      <div>
        <About />
      </div>
      <div className="relative min-h-screen w-full flex flex-col items-center text-center p-4">
        <div className="flex flex-col items-center h-full w-full">
          <div className="text-4xl md:text-5xl font-extrabold mt-4 mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-green-700">
              Data Analysis Chatbot
            </span>
          </div>
          {/* <h1 className="text-2xl md:text-4xl font-bold text-white mb-8">
            Data Analysis Chatbot
          </h1> */}
          <div className="w-full md:w-2/3 lg:w-1/2 mb-6 px-4">
            <FileUploadSection
              handleFileChange={handleFileChange}
              handleUpload={handleUpload}
              question={question}
              setQuestion={setQuestion}
            />
          </div>
          <div className="w-full md:w-2/3 lg:w-1/2 mb-6 px-4">
            <ChatSection handleChat={handleChat} query={query} setQuery={setQuery} />
          </div>
          {loading && <LoadingIndicator />}
          <div className="w-screen md:w-2/3 lg:w-1/2 p-4  rounded shadow mt-4 overflow-auto">
            <ResponseDisplay response={response} />
          </div>
        </div>
      </div>
      <ContactBar />
    </div>
  );
}

export default App;

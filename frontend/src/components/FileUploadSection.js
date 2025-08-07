import React from "react";

const FileUploadSection = ({ handleFileChange, handleUpload, question, setQuestion }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center mb-4">
      <input
        type="file"
        onChange={handleFileChange}
        className="p-2 border rounded mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto"
      />
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question about the file..."
        className="p-2 border rounded mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto"
      />
      <button
        onClick={handleUpload}
        className="text-white p-2 rounded-lg bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 shadow-2xl..."
      >
        Upload and Analyze
      </button>
    </div>
  );
};

export default FileUploadSection;

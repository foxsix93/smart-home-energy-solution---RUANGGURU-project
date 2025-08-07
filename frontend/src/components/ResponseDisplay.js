import React from "react";

const ResponseDisplay = ({ response }) => {
  const formatResponse = (text) => {
    if (!text) return "No response yet";
    const paragraphs = text.split("\n\n").filter(Boolean);

    return paragraphs.map((paragraph, index) => {
      if (paragraph.startsWith("User:")) {
        return (
          <div key={index} className="mb-4">
            <strong className="text-blue-600">{paragraph.split(":")[0]}:</strong>
            <span className="text-gray-700 ml-2">{paragraph.slice(5)}</span>
          </div>
        );
      } else if (paragraph.startsWith("AI:")) {
        return (
          <div key={index} className="mb-4">
            <strong className="text-green-600">{paragraph.split(":")[0]}:</strong>
            <span className="text-gray-700 ml-2">{paragraph.slice(4)}</span>
          </div>
        );
      } else {
        return (
          <p key={index} className="text-gray-700 leading-relaxed mb-2">
            {paragraph}
          </p>
        );
      }
    });
  };

  return (
    <div className="mt-6 p-6 border rounded bg-white shadow w-full max-h-[70vh] overflow-y-auto ">
      <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Response</h2>
      <div className="text-justify whitespace-pre-wrap break-words">{formatResponse(response)}</div>
    </div>
  );
};

export default ResponseDisplay;

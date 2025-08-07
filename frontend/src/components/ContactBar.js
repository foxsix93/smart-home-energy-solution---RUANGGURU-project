import React from "react";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa";

const ContactBar = () => {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col space-y-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-50">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Contact Me</h3>

      <a
        href="mailto:youremail@example.com"
        className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
      >
        <FaEnvelope className="text-blue-600" />
        <span>Email</span>
      </a>

      <a
        href="tel:+1234567890"
        className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition"
      >
        <FaPhone className="text-green-600" />
        <span>Phone</span>
      </a>

      <a
        href="https://www.linkedin.com/in/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 text-gray-700 hover:text-blue-700 transition"
      >
        <FaLinkedin className="text-blue-700" />
        <span>LinkedIn</span>
      </a>

      <a
        href="https://github.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-800 transition"
      >
        <FaGithub className="text-gray-800" />
        <span>GitHub</span>
      </a>
    </div>
  );
};

export default ContactBar;

# 🤖 Smart Data Analysis Chatbot

<div align="center">

[![Go](https://img.shields.io/badge/Go-1.23.2-00ADD8?style=for-the-badge&logo=go)](https://golang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.16-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Hugging Face](https://img.shields.io/badge/Hugging%20Face-API-FFD21E?style=for-the-badge&logo=huggingface)](https://huggingface.co/)

*An intelligent data analysis platform powered by AI that transforms CSV files into insightful conversations*

[🚀 Quick Start](#-quick-start) • [✨ Features](#-features) • [🛠 Tech Stack](#-tech-stack) • [📖 API Documentation](#-api-documentation)

</div>

---

## 🌟 Overview

Smart Data Analysis Chatbot is a full-stack web application that combines the power of AI with intuitive data analysis. Upload your CSV files, ask questions about your data, and get intelligent responses powered by Google's TAPAS model and Microsoft's Phi-3.5 mini AI model.

### 🎯 Key Capabilities

- **📊 CSV Data Analysis**: Upload CSV files and query them using natural language
- **💬 Intelligent Chat**: Interactive AI conversations with context awareness
- **🎨 Beautiful UI**: Modern, responsive design with smooth animations
- **⚡ Real-time Processing**: Instant file processing and AI responses
- **🔐 Secure**: Token-based authentication with Hugging Face API

---

## ✨ Features

### 🔍 Data Analysis
- **Smart CSV Processing**: Automatic parsing and validation of CSV files
- **Natural Language Queries**: Ask questions about your data in plain English
- **TAPAS Integration**: Powered by Google's Table Question Answering model
- **Contextual Responses**: Get accurate answers based on your uploaded data

### 💬 AI Chat
- **Conversational AI**: Chat with Microsoft's Phi-3.5 mini model
- **Session Management**: Maintains conversation context across interactions
- **Multi-turn Conversations**: Build upon previous questions and answers

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Interactive Gallery**: Beautiful image showcase with smooth transitions
- **Loading Indicators**: Visual feedback during processing
- **Modern UI Components**: Built with Chakra UI and Tailwind CSS

---

## 🛠 Tech Stack

### Backend (Go)
- **Runtime**: Go 1.23.2
- **Web Framework**: Gorilla Mux for routing
- **HTTP Client**: Native Go HTTP client for API calls
- **Session Management**: Gorilla Sessions
- **CORS**: rs/cors for cross-origin requests
- **Environment**: godotenv for configuration

### Frontend (React)
- **Framework**: React 18.3.1
- **UI Library**: Chakra UI 3.1.2
- **Styling**: Tailwind CSS 3.4.16
- **Animations**: Framer Motion 11.11.17
- **HTTP Client**: Axios 1.7.7
- **Icons**: React Icons 5.4.0

### AI Integration
- **Table QA**: Google TAPAS (tapas-large-finetuned-wtq)
- **Conversational AI**: Microsoft Phi-3.5-mini-instruct
- **Platform**: Hugging Face Inference API

---

## 🚀 Quick Start

### Prerequisites
- Go 1.23.2 or higher
- Node.js 16+ and npm
- Hugging Face API token

### 1. Clone the Repository
```bash
git clone https://github.com/foxsix93/smart-home-energy-solution---RUANGGURU-project.git
cd smart-home-energy-solution---RUANGGURU-project
```

### 2. Setup Backend

```bash
# Navigate to server directory
cd server

# Install Go dependencies
go mod tidy

# Create .env file
echo "HUGGING_FACE_TOKEN=your_token_here" > .env

# Run the server
go run main.go
```

Server will start on `http://localhost:8080`

### 3. Setup Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend will start on `http://localhost:3000`

### 4. Get Your Hugging Face Token

1. Visit [Hugging Face](https://huggingface.co/)
2. Create an account or sign in
3. Go to Settings → Access Tokens
4. Create a new token with read permissions
5. Add it to your `.env` file

---

## 📖 API Documentation

### Upload & Analyze CSV
```http
POST /upload
Content-Type: multipart/form-data

Parameters:
- file: CSV file
- query: Natural language question about the data

Response:
{
  "status": "success",
  "data": {
    "answer": "AI analysis result"
  }
}
```

### Chat with AI
```http
POST /chat
Content-Type: application/json

Body:
{
  "query": "Your question or message"
}

Response:
{
  "status": "success",
  "answer": "AI generated response"
}
```

---

## 📁 Project Structure

```
📦 smart-data-analysis-chatbot
├── 📂 frontend/                 # React frontend application
│   ├── 📂 public/              # Static assets
│   ├── 📂 src/
│   │   ├── 📂 components/       # React components
│   │   ├── App.js              # Main application component
│   │   └── index.js            # Application entry point
│   ├── package.json            # Frontend dependencies
│   └── tailwind.config.js      # Tailwind CSS configuration
├── 📂 server/                   # Go backend application
│   ├── 📂 model/               # Data models
│   ├── 📂 repository/          # Data access layer
│   ├── 📂 service/             # Business logic
│   │   ├── ai_service.go       # AI integration service
│   │   └── file_service.go     # File processing service
│   ├── main.go                 # Server entry point
│   ├── go.mod                  # Go dependencies
│   └── .env                    # Environment variables
└── README.md                   # Project documentation
```

---

## 🎨 Screenshots

### File Upload Interface
Beautiful drag-and-drop interface for CSV file uploads with real-time validation.

### AI Chat Interface
Conversational interface with typing indicators and smooth message animations.

### Data Analysis Results
Clear presentation of analysis results with proper formatting and context.

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `server` directory:

```env
HUGGING_FACE_TOKEN=your_hugging_face_token_here
PORT=8080  # Optional, defaults to 8080
```

### Frontend Configuration

The frontend is configured to connect to `http://localhost:8080` by default. To change this, update the axios calls in `src/App.js`.

---

## 🚀 Deployment

### Backend Deployment
```bash
# Build for production
go build -o main

# Run the built binary
./main
```

### Frontend Deployment
```bash
# Build for production
npm run build

# Serve the build folder with your preferred static file server
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google TAPAS**: For the powerful table question answering capabilities
- **Microsoft Phi-3.5**: For the conversational AI model
- **Hugging Face**: For providing the inference API platform
- **Gorilla Toolkit**: For excellent Go web development tools
- **React Team**: For the amazing frontend framework

---

<div align="center">

**[⬆ Back to Top](#-smart-data-analysis-chatbot)**

Made with ❤️ by [foxsix93](https://github.com/foxsix93)

</div>

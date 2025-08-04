# ReactChat 💬

A real-time chat application built using React and Firebase, supporting secure authentication, cloud-hosted messaging, and file/document uploads.  
Developed as part of a Master's level software engineering project.

---

## 🚀 Live Demo

🌐 **Live App:** [https://rectchat.web.app](https://rectchat.web.app)

---

## 📦 Features

- 🔐 Firebase Authentication
- 💬 Real-time chat powered by Firestore
- 📁 File & document upload (via Firebase Storage)
- ⚙️ Cloud Functions integration
- 🐳 Dockerized for virtualized deployment

---

## 🛠️ Tech Stack

- Frontend: React (Vite)
- Backend Services: Firebase (Auth, Firestore, Storage, Hosting, Cloud Functions)
- Deployment: Firebase Hosting & Docker
- Container Runtime: NGINX (`nginx:alpine`)

---

## 🐳 Docker Deployment

Docker image is available on Docker Hub:

📦 **Docker Hub:** [https://hub.docker.com/r/fanik05/reactchat-app](https://hub.docker.com/r/fanik05/reactchat-app)

To run locally:

```bash
docker pull fanik05/reactchat-app
docker run -p 8080:80 fanik05/reactchat-app

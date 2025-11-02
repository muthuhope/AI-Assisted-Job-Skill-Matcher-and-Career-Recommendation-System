# Job Skill Matcher

## Overview
The **Job Skill Matcher** is a full-stack web application that helps users upload their resumes and automatically matches them with job postings based on their skills.  
It uses **Spring Boot (Java)** for the backend and **React.js** for the frontend.  
The system parses resumes (PDF format) using **Apache PDFBox**, extracts key skills, and compares them with job requirements stored in a database.

---

## ⚙️ Backend Flow (Spring Boot)

1. **User Uploads Resume**
   - The frontend sends a PDF file to the backend via a REST API (`/api/resume/upload`).
   
2. **Resume Parsing**
   - The backend uses **Apache PDFBox** to read and extract text from the uploaded PDF resume.

3. **Skill Extraction**
   - Extracted text is processed to identify relevant skills using a predefined keyword list or pattern matching.

4. **Job Matching**
   - Extracted skills are compared with job listings stored in the **MySQL database**.
   - The system calculates match scores and returns the most relevant jobs.

5. **Response to Frontend**
   - The matched job list (with titles, company names, and skill matches) is sent back to the frontend for display.

---

## Frontend Flow (React.js)

1. **Login/Register**
   - User logs in using credentials verified through the backend authentication API.

2. **Resume Upload**
   - User uploads a resume through an interactive UI.
   - The resume is sent as a `multipart/form-data` request to the backend.

3. **Job Display**
   - Matched jobs are dynamically displayed with details like position, company, and skill match percentage.

4. **Error Handling**
   - Alerts are shown for invalid uploads, server errors, or missing resumes.

---

## Technologies Used

### 🔹 Backend
- Java 17  
- Spring Boot 3.x  
- Maven  
- MySQL Database  
- Apache PDFBox  
- Spring Data JPA  
- RESTful API Architecture  

### 🔹 Frontend
- React.js  
- Axios (API calls)  
- Bootstrap / CSS for styling  
- React Router DOM  

---

## Features
- Resume text extraction using **Apache PDFBox**  
- Skill-based job matching algorithm  
- User authentication and session handling  
- Real-time API communication between frontend and backend  
- Error-safe and scalable architecture  

---

## How to Run the Project

### Backend (Spring Boot)
```bash
cd backend
mvn clean install
mvn spring-boot:run

**Front End (React.js)**
cd frontend
npm install
npm run dev

**Folder Structure**
job-skill-matcher/
│
├── backend/
│   ├── src/main/java/com/jobskillmatcher/backend/
│   │   ├── controller/
│   │   ├── service/
│   │   ├── entity/
│   │   └── repository/
│   └── resources/
│       └── application.properties
│
└── frontend/
    ├── src/
    ├── public/
    └── package.json

**Author**
Muthukumaran M
MCA Graduate | Full Stack Developer

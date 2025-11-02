import React, { useState } from "react";
import { Loader2, Upload } from "lucide-react";
import "./ResumeAnalyzer.css";

function ResumeAnalyzer() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobRole, setJobRole] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !jobRole) {
      alert("Please select a resume and choose a job role");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("jobRole", jobRole);

    try {
      setLoading(true);
        const response = await fetch("http://192.168.43.74:8080/api/analyze", {
        method: "POST",
        body: formData,
          });


      if (!response.ok) throw new Error("Server Error");

      const data = await response.json();
setAnalysis(data);

// ✅ Save analysis to localStorage for InfoPage
const user = JSON.parse(localStorage.getItem("user"));
const history = JSON.parse(localStorage.getItem("analyzeHistory")) || [];

const newRecord = {
  email: user?.email || "unknown",
  jobRole,
  fileName: selectedFile.name,
  missingSkills: data.missingSkills || [],
  courses: data.courses || [],
};

history.push(newRecord);
localStorage.setItem("analyzeHistory", JSON.stringify(history));
    } catch (error) {
      console.error(error);
      alert("Error analyzing resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const jobRoles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Java Developer",
    "Data Analyst",
    "Machine Learning Engineer",
    "AI Engineer",
  ];

  return (
    <div className="analyzer-page">
      <div className="analyzer-header">
        <h1>🔍 Resume Skill Analyzer</h1>
        <p>Upload your resume and discover how well your skills match your desired job role.</p>
      </div>

      <div className="analyzer-card">
        {/* Upload Section */}
        <div className="form-group">
          <label>Upload Resume (PDF)</label>
          <input type="file" accept=".pdf" onChange={handleFileChange} />
        </div>

        {/* Role Selection */}
        <div className="form-group">
          <label>Select Job Role</label>
          <select value={jobRole} onChange={(e) => setJobRole(e.target.value)}>
            <option value="">-- Choose Job Role --</option>
            {jobRoles.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Analyze Button */}
        <button className="analyze-btn" onClick={handleAnalyze} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="loader-icon" /> Analyzing...
            </>
          ) : (
            <>
              <Upload className="upload-icon" /> Analyze Resume
            </>
          )}
        </button>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="result-section">
          <h2>📊 Analysis Results</h2>

          <div className="result-box">
            <h3>Extracted Skills:</h3>
            <ul>
              {analysis.extractedSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>

            <h3>Missing Skills for {jobRole}:</h3>
            {analysis.missingSkills.length > 0 ? (
              <ul>
                {analysis.missingSkills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p className="all-skills">✅ Great! You have all required skills 🎉</p>
            )}

            {analysis.courses.length > 0 && (
              <>
                <h3>Recommended Courses:</h3>
                <ul>
                  {analysis.courses.map((course, index) => (
                    <li key={index}>
                      <a href={course.link} target="_blank" rel="noopener noreferrer">
                        {course.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeAnalyzer;

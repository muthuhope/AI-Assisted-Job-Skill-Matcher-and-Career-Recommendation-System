import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ResultPage = () => {
  const navigate = useNavigate();
  const [resumeName, setResumeName] = useState("");
  const [jobRole, setJobRole] = useState("");

  useEffect(() => {
    setResumeName(localStorage.getItem("resumeFileName"));
    setJobRole(localStorage.getItem("jobRole"));
  }, []);

  const extractedSkills = ["Java", "Spring Boot", "React", "MySQL"];
  const missingSkills = ["REST API", "PostgreSQL"];
  const recommendedCourses = [
    { name: "Learn REST API - Free Course", link: "#" },
    { name: "Learn PostgreSQL - Free Course", link: "#" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          🧠 Skill Analysis Result
        </h1>
        <p className="text-gray-600 mb-2">📄 {resumeName}</p>
        <p className="text-gray-500 mb-4">
          For Job Role: <strong>{jobRole}</strong>
        </p>

        <h2 className="text-xl font-semibold text-blue-700 mt-4">
          Extracted Skills
        </h2>
        <ul className="mt-2">
          {extractedSkills.map((s, i) => (
            <li key={i} className="bg-gray-100 p-2 rounded-md my-1">
              {s}
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold text-blue-700 mt-4">
          Missing Skills
        </h2>
        <ul className="mt-2">
          {missingSkills.map((s, i) => (
            <li key={i} className="bg-red-100 p-2 rounded-md my-1 text-red-700">
              {s}
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold text-blue-700 mt-4">
          Recommended Courses
        </h2>
        <ul className="mt-2">
          {recommendedCourses.map((c, i) => (
            <li key={i}>
              <a href={c.link} className="text-blue-600 hover:underline">
                {c.name}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => navigate("/analyze")}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          ⬅ Back
        </button>
      </div>
    </div>
  );
};

export default ResultPage;

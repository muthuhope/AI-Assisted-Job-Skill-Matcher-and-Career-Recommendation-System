import React, { useEffect, useState } from "react";
import "./InfoPage.css";

function InfoPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // ✅ Fetch stored analysis history
    const storedData = JSON.parse(localStorage.getItem("analyzeHistory")) || [];
    setData(storedData);
  }, []);

  return (
    <div className="info-wrapper">
      <div className="info-card">
        <h2 className="info-title">📊 User Analysis Info</h2>

        <div className="table-wrapper">
          <table className="info-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Mail ID</th>
                <th>Search Role</th>
                <th>Sent PDF File</th>
                <th>Missing Skills</th>
                <th>Recommended Courses</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.email || "N/A"}</td>
                    <td>{item.jobRole || "N/A"}</td>
                    <td>
                      {item.fileName ? (
                        <a
                          href={`http://localhost:8080/uploads/${item.fileName}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="resume-link"
                        >
                          View Resume
                        </a>
                      ) : (
                        <span>No File</span>
                      )}
                    </td>
                    <td>
                      {item.missingSkills && item.missingSkills.length > 0
                        ? item.missingSkills.join(", ")
                        : "All skills matched 🎉"}
                    </td>
                    <td>
                      {item.courses && item.courses.length > 0 ? (
                        item.courses.map((course, i) => (
                          <div key={i}>
                            <a
                              href={course.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="course-link"
                            >
                              {course.name}
                            </a>
                          </div>
                        ))
                      ) : (
                        <span>No Courses</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default InfoPage;

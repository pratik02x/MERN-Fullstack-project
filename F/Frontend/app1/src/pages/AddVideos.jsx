import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddVideos() {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const navigate = useNavigate();

  //Fetch courses
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:4000/courses");
      setCourses(res.data.data || []);
    } catch (err) {
      console.error("Error fetching courses", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Add video
  const addVideo = async (e) => {
    e.preventDefault();

    if (!courseId || !title || !youtubeUrl) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await axios.post("http://localhost:4000/videos", {
        course_id: courseId,
        title,
        description,
        youtube_url: youtubeUrl
      });

      alert("Video added successfully");

      // reset form
      setCourseId("");
      setTitle("");
      setDescription("");
      setYoutubeUrl("");

      // redirect to list
      navigate("/getallvideos");
    } catch (err) {
      console.error("Error adding video", err);
      alert("Failed to add video");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add Video</h2>

      <form onSubmit={addVideo} className="col-md-6 mx-auto shadow p-4 rounded">
        
        {/* Course */}
        <div className="mb-3">
          <label className="fw-semibold">Select Course</label>
          <select
            className="form-select"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          >
            <option value="">-- Select Course --</option>
            {courses.map((c) => (
              <option key={c.course_id} value={c.course_id}>
                {c.course_name}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div className="mb-3">
          <label className="fw-semibold">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="fw-semibold">Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Youtube URL */}
        <div className="mb-3">
          <label className="fw-semibold">Youtube URL</label>
          <input
            type="text"
            className="form-control"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="https://youtube.com/..."
          />
        </div>

        {/* Buttons */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary px-4">
            Add Video
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddVideos;

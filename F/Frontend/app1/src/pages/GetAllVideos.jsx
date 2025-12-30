import React, { useEffect, useState } from "react";
import axios from "axios";

function GetAllVideos() {
  const [videos, setVideos] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [editVideo, setEditVideo] = useState(null);

  //Fetch all videos
  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:4000/videos");
      setVideos(res.data.data || []);
    } catch (err) {
      console.error("Error fetching videos", err);
    }
  };

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:4000/courses");
      setCourses(res.data.data || []);
    } catch (err) {
      console.error("Error fetching courses", err);
    }
  };

  // Load data on page load
  useEffect(() => {
    fetchVideos();
    fetchCourses();
  }, []);

  // Delete video
  const deleteVideo = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    try {
      await axios.delete(`http://localhost:4000/videos/${id}`);
      fetchVideos(); // refresh table
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // Update video
  const updateVideo = async () => {
    try {
      await axios.put(
        `http://localhost:4000/videos/${editVideo.video_id}`,
        editVideo
      );
      setEditVideo(null);
      fetchVideos();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  // Filter logic
  const filteredVideos =
    selectedCourse === "all"
      ? videos
      : videos.filter((v) => v.course_name === selectedCourse);

  return (
    <div className="container-fluid px-4 py-4">
      <h2 className="text-center mb-4">All Videos</h2>

      {/*Filter*/}
        <div className="col-md-4 mb-3">
          <label className="fw-semibold">Search by Course</label>
          <select
            className="form-select"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="all">All Courses</option>

            {courses.map((course) => (
              <option key={course.course_id} value={course.course_name}>
                {course.course_name}
              </option>
            ))}
          </select>
        </div>


      {/*Table */}
      <div className="table-responsive shadow-sm">
        <table className="table table-bordered align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th>ID</th>
              <th>Course</th>
              <th>Title</th>
              <th>Description</th>
              <th>Youtube URL</th>
              <th>Added At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredVideos.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No videos found
                </td>
              </tr>
            )}

            {filteredVideos.map((v) => (
              <tr key={v.video_id}>
                <td className="text-center">{v.video_id}</td>
                <td>{v.course_name || "N/A"}</td>
                <td>{v.title}</td>
                <td>{v.description}</td>
                <td>
                  <a href={v.youtube_url} target="_blank" rel="noreferrer">
                    {v.youtube_url}
                  </a>
                </td>
                <td>{v.added_at}</td>
                <td className="text-center">
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => setEditVideo(v)}
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteVideo(v.video_id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔹 EDIT MODAL */}
      {editVideo && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Video</h5>
                <button
                  className="btn-close"
                  onClick={() => setEditVideo(null)}
                ></button>
              </div>

              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  placeholder="Title"
                  value={editVideo.title}
                  onChange={(e) =>
                    setEditVideo({ ...editVideo, title: e.target.value })
                  }
                />
                <input
                  className="form-control mb-2"
                  placeholder="Description"
                  value={editVideo.description}
                  onChange={(e) =>
                    setEditVideo({ ...editVideo, description: e.target.value })
                  }
                />
                <input
                  className="form-control"
                  placeholder="Youtube URL"
                  value={editVideo.youtube_url}
                  onChange={(e) =>
                    setEditVideo({ ...editVideo, youtube_url: e.target.value })
                  }
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditVideo(null)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={updateVideo}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetAllVideos;

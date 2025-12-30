import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getcourses } from '../../services/adminServices';

function GetAllCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null);      // Added error state
  const navigate = useNavigate();

  useEffect(() => {
    // Using a cleanup flag to prevent state updates if component unmounts
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getcourses();
        
        if (isMounted) {
          if (res.status === 'success' && res.data) {
            setCourses(res.data);
          } else {
            setError("Failed to load courses.");
          }
        }
      } catch (err) {
        if (isMounted) setError("An error occurred while fetching courses.");
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  // UI for Loading State
  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

  // UI for Error State
  if (error) return <div className="alert alert-danger m-4" role="alert">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0">Available Courses</h2>
        <span className="badge bg-secondary">{courses.length} Courses</span>
      </div>

      <div className="row g-4">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div className="col-md-6 col-lg-4" key={course.course_id}>
              <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '15px', transition: 'transform 0.2s' }}>
                <div className="card-body p-4 d-flex flex-column">
                  <h5 className="fw-bold mb-2 text-dark">{course.course_name}</h5>
                  <p className="text-muted small mb-4">
                    <i className="bi bi-calendar-event me-2"></i>
                    Starts: {formatDate(course.start_date)}
                  </p>
                  <button 
                    className="btn btn-primary mt-auto w-100 rounded-pill shadow-sm"
                    onClick={() => navigate('/course-content', { state: { course } })}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-5">
            <p className="text-muted">No courses available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GetAllCourses;
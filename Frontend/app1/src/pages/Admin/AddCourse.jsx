import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCourse } from '../../services/adminServices';
import { toast } from 'react-toastify';

function AddCourse() {
  const [course, setCourse] = useState({
    course_name: '',
    description: '',
    fees: '',
    start_date: '',
    end_date: '',
    video_expire_days: ''
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null); // Added for UX
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent double submission
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file)); // Create a temporary URL for preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Date Validation
    if (new Date(course.end_date) < new Date(course.start_date)) {
      toast.error("End date cannot be before start date");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    Object.keys(course).forEach(key => {
      formData.append(key, key === 'fees' || key === 'video_expire_days' ? Number(course[key]) : course[key]);
    });
    
    if (imageFile) {
      formData.append('course_image', imageFile); 
    }

    try {
      const res = await addCourse(formData);
      if (res.status === 'success') {
        toast.success("Course added successfully!");
        navigate('/get-all-courses');
      } else {
        toast.error(res.error || "Error adding course");
      }
    } catch (error) {
      toast.error("Server communication error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0" style={{ borderRadius: '15px' }}>
            <div className="card-header bg-primary text-white p-3 text-center" style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
              <h4 className="mb-0 fw-bold">Create New Course</h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold small text-uppercase">Course Name</label>
                  <input type="text" name="course_name" className="form-control" onChange={handleInput} required placeholder="Enter course title" />
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-bold small text-uppercase">Description</label>
                  <textarea name="description" className="form-control" onChange={handleInput} rows="2" required placeholder="Briefly describe the course"></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold small text-uppercase">Course Image</label>
                  <input type="file" className="form-control mb-2" accept="image/*" onChange={handleFileChange} required />
                  {preview && (
                    <div className="text-center border rounded p-2">
                      <img src={preview} alt="Preview" style={{ maxHeight: '150px', maxWidth: '100%' }} />
                    </div>
                  )}
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold small text-uppercase">Fees (₹)</label>
                    <input type="number" name="fees" className="form-control" onChange={handleInput} required min="0" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold small text-uppercase">Video Expire (Days)</label>
                    <input type="number" name="video_expire_days" className="form-control" onChange={handleInput} required min="1" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold small text-uppercase">Start Date</label>
                    <input type="date" name="start_date" className="form-control" onChange={handleInput} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold small text-uppercase">End Date</label>
                    <input type="date" name="end_date" className="form-control" onChange={handleInput} required />
                  </div>
                </div>

                <div className="mt-4 d-grid gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-primary py-2 fw-bold rounded-pill shadow-sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="spinner-border spinner-border-sm me-2"></span>
                    ) : 'Register Course'}
                  </button>
                  <button type="button" className="btn btn-outline-secondary py-2 fw-bold rounded-pill" onClick={() => navigate(-1)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminStudentList() {
    const [students, setStudents] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('All Courses');

    useEffect(() => {
        const fetchData = async () => {
            const token = sessionStorage.getItem("token");
            const res = await axios.get("http://localhost:4000/admin/all-students-list", {
                headers: { token }
            });
            setStudents(res.data); // Postman output shows an array
            setFiltered(res.data);
        };
        fetchData();
    }, []);

    const onFilter = (e) => {
        const val = e.target.value;
        setSelectedCourse(val);
        setFiltered(val === 'All Courses' ? students : students.filter(s => s.course === val));
    };

    return (
        <div className="container mt-4">
            <h3>All Students</h3>
            <select className="form-select mb-3" style={{width: '300px'}} onChange={onFilter}>
                <option value="All Courses">All Courses</option>
                {/* Map your active courses here */}
            </select>
            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr><th>Reg No</th><th>Name</th><th>Email</th><th>Course</th><th>Mobile No</th></tr>
                </thead>
                <tbody>
                    {filtered.map(s => (
                        <tr key={s.reg_no}>
                            <td>{s.reg_no}</td><td>{s.name}</td><td>{s.email}</td>
                            <td>{s.course || "N/A"}</td><td>{s.mobile_no || "123456"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default AdminStudentList;
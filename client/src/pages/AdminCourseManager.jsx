import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminCourseManager() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: '', description: '', image: '',
    price: '', isAffiliate: false, link: '', category: ''
  });
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {                                                                                                                                                                  
    const res = await axios.get(`${apiUrl}/api/admin/courses`);
    const data = res.data;
  
    // Defensive check
    if (Array.isArray(data)) {
      setCourses(data);
    } else {
      console.error("Expected array but got:", data);
      setCourses([]); // fallback
    }
  };
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${apiUrl}/api/admin/courses`, form);
    fetchCourses();
    setForm({ title: '', description: '', image: '', price: '', isAffiliate: false, link: '', category: '' });
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this course?')) {
      await axios.delete(`${apiUrl}/api/admin/courses/${id}`);
      fetchCourses();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Course Manager</h2>
      <form onSubmit={handleSubmit} className="grid gap-4 bg-gray-700 p-4 rounded-xl">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <input name="link" placeholder="Course Link" value={form.link} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <label>
          <input type="checkbox" name="isAffiliate" checked={form.isAffiliate} onChange={handleChange} />
          Affiliate Course
        </label>
        <button type="submit" className="bg-blue-500 text-white py-2 rounded">Add Course</button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl mb-2">Existing Courses</h3>
        {courses.map(c => (
          <div key={c._id} className="flex justify-between items-center bg-white p-3 my-2 rounded shadow">
            <div>
              <p className="font-bold">{c.title}</p>
              <p className="text-sm text-gray-600">{c.link}</p>
            </div>
            <button onClick={() => handleDelete(c._id)} className="bg-red-500 text-white px-3 py-1 rounded">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

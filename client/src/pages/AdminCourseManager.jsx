import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminCourseManager() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: '', description: '', image: '', level: '',
    price: '', isAffiliate: false, affiliatelink: '',rating: '', category: ''
  });

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/admin/courses`, config);
      const data = res.data;
      if (Array.isArray(data)) {
        setCourses(data);
      } else {
        console.error("Expected array but got:", data);
        setCourses([]);
      }
    } catch (error) {
      console.error("Fetch error:", error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/api/admin/courses`, form, config);
      fetchCourses();
      setForm({
        title: '', description: '', image: '', level: '',
        price: '', isAffiliate: false, affiliatelink: '',rating: '', category: ''
      });
    } catch (error) {
      console.error("Submit error:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this course?')) {
      try {
        await axios.delete(`${apiUrl}/api/admin/courses/${id}`, config);
        fetchCourses();
      } catch (error) {
        console.error("Delete error:", error.response?.data || error.message);
      }
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Course Manager</h2>

      <form onSubmit={handleSubmit} className="grid gap-4 bg-gray-800 text-white p-6 rounded-xl shadow-lg">
        <div className="grid gap-2">
          <label htmlFor="title">Title</label>
          <input id="title" name="title" className="p-2 rounded bg-gray-200 text-black" value={form.title} onChange={handleChange} required />
        </div>

        <div className="grid gap-2">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" className="p-2 rounded bg-gray-200 text-black" value={form.description} onChange={handleChange} rows={3} />
        </div>

        <div className="grid gap-2">
          <label htmlFor="image">Image URL</label>
          <input id="image" name="image" className="p-2 rounded bg-gray-200 text-black" value={form.image} onChange={handleChange} />
        </div>

        <div className="grid gap-2">
          <label htmlFor="level">Level</label>
          <input id="level" name="level" className="p-2 rounded bg-gray-200 text-black" value={form.level} onChange={handleChange} />
        </div>

        <div className="grid gap-2">
          <label htmlFor="affiliatelink">Course Link</label>
          <input id="affiliatelink" name="affiliatelink" className="p-2 rounded bg-gray-200 text-black" value={form.affiliatelink} onChange={handleChange} required />
        </div>

        <div className="grid gap-2">
          <label htmlFor="rating">Rating</label>
          <input id="rating" name="rating" type="number" className="p-2 rounded bg-gray-200 text-black" value={form.rating} onChange={handleChange} />
        </div>

        <div className="grid gap-2">
          <label htmlFor="price">Price</label>
          <input id="price" name="price" type="number" className="p-2 rounded bg-gray-200 text-black" value={form.price} onChange={handleChange} />
        </div>

        <div className="grid gap-2">
          <label htmlFor="category">Category</label>
          <input id="category" name="category" className="p-2 rounded bg-gray-200 text-black" value={form.category} onChange={handleChange} />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="isAffiliate" checked={form.isAffiliate} onChange={handleChange} />
          <label htmlFor="isAffiliate">Affiliate Course</label>
        </div>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded text-white mt-2">
          Add Course
        </button>
      </form>

      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4 text-center">Existing Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map(c => (
            <div key={c._id} className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
              {c.image && (
                <img src={c.image} alt={c.title} className="w-full h-48 object-cover rounded-md mb-2" />
              )}
              <h4 className="text-xl font-bold text-gray-800">{c.title}</h4>
              <p className="text-sm text-gray-600">{c.description}</p>
              <p className="text-sm"><span className="font-medium">Category:</span> {c.category}</p>
              <p className="text-sm"><span className="font-medium">Price:</span> {c.price ? `R${c.price}` : 'Free'}</p>
              <p className="text-sm"><span className="font-medium">Affiliate:</span> {c.isAffiliate ? 'Yes' : 'No'}</p>
              <a href={c.affiliatelink} target="_blank" className="text-blue-600 underline text-sm">
                Visit Course
              </a>
              <button onClick={() => handleDelete(c._id)} className="bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1 mt-2 self-end">
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

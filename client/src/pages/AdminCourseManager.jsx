import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Star, ExternalLink } from "lucide-react";

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
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center mt-8">Admin Course Manager</h2>

      <form onSubmit={handleSubmit} className="grid gap-4 bg-gray-800 text-white p-6 rounded-xl shadow-lg max-w-5xl">
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

      <h3 className="text-2xl font-semibold mb-4 text-center">Existing Courses</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(c => (
          <Card key={c._id} className="overflow-hidden hover:shadow-lg transition-shadow border border-slate-200 group">
            <div className="relative h-48">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10 group-hover:opacity-0 transition-opacity z-10"></div>
              <img src={c.image || "/placeholder.svg?height=400&width=600"} alt={c.title} className="object-cover w-full h-full absolute inset-0" />
              {c.isAffiliate && (
                <Badge className="absolute top-2 left-2 bg-blue-600 z-20">Affiliate</Badge>
              )}
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-blue-500 6text-blue-700">
                  {c.category || 'Learn & Certify'}
                </Badge>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
              <CardTitle className="mt-2">{c.title}</CardTitle>
              <CardDescription>{c.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="font-bold text-lg">{c.price ? `R${c.price}` : 'Free'}</p>
                {c.price && <p className="text-sm text-slate-500 line-through">R{(c.price * 1.5).toFixed(2)}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">View Details</Button>
              <Button variant="outline" className="flex items-center gap-1" onClick={() => window.open(c.affiliatelink, "_blank")}>
                <ExternalLink className="h-4 w-4" /> Visit Site
              </Button>
            </CardFooter>
            <div className="px-4 pb-4">
              <Button onClick={() => handleDelete(c._id)} className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white">
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { ExternalLink } from "lucide-react";

export default function AdminWorkEssentialsManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: '', description: '', image: '', price: '', brand: '',
    category: '', isAffiliate: false, affiliatelink: ''
  });

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/admin/work-essentials`, config);
      const data = res.data;
      if (Array.isArray(data)) {
        setItems(data);
      } else {
        setItems([]);
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
      await axios.post(`${apiUrl}/api/admin/work-essentials`, form, config);
      fetchItems();
      setForm({ name: '', description: '', image: '', price: '', brand: '', category: '', isAffiliate: false, affiliatelink: '' });
    } catch (error) {
      console.error("Submit error:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this item?')) {
      try {
        await axios.delete(`${apiUrl}/api/admin/work-essentials/${id}`, config);
        fetchItems();
      } catch (error) {
        console.error("Delete error:", error.response?.data || error.message);
      }
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center mt-8">Admin Work Essentials Manager</h2>

      <form onSubmit={handleSubmit} className="grid gap-4 bg-gray-800 text-white p-6 rounded-xl shadow-lg max-w-5xl">
        <input name="name" placeholder="Product Name" className="p-2 rounded bg-gray-200 text-black" value={form.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" rows={3} className="p-2 rounded bg-gray-200 text-black" value={form.description} onChange={handleChange} />
        <input name="image" placeholder="Image URL" className="p-2 rounded bg-gray-200 text-black" value={form.image} onChange={handleChange} />
        <input name="price" type="number" placeholder="Price" className="p-2 rounded bg-gray-200 text-black" value={form.price} onChange={handleChange} />
        <input name="brand" placeholder="Brand" className="p-2 rounded bg-gray-200 text-black" value={form.brand} onChange={handleChange} />
        <input name="category" placeholder="Category" className="p-2 rounded bg-gray-200 text-black" value={form.category} onChange={handleChange} />
        <input name="affiliatelink" placeholder="Affiliate Link" className="p-2 rounded bg-gray-200 text-black" value={form.affiliatelink} onChange={handleChange} />
        <div className="flex items-center gap-2">
          <input type="checkbox" name="isAffiliate" checked={form.isAffiliate} onChange={handleChange} />
          <label htmlFor="isAffiliate">Affiliate Item</label>
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded text-white mt-2">
          Add Item
        </button>
      </form>

      <h3 className="text-2xl font-semibold mb-4 text-center">Existing Items</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <Card key={item._id} className="overflow-hidden hover:shadow-lg transition-shadow border border-slate-200 group">
            <div className="relative h-48">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="object-cover w-full h-full absolute inset-0" />
              {item.isAffiliate && <Badge className="absolute top-2 left-2 bg-green-600 z-20">Affiliate</Badge>}
            </div>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-lg">R{item.price}</p>
              <p className="text-sm text-slate-500">Brand: {item.brand}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => window.open(item.affiliatelink, '_blank')}>
                <ExternalLink className="h-4 w-4" /> Buy Now
              </Button>
            </CardFooter>
            <div className="px-4 pb-4">
              <Button onClick={() => handleDelete(item._id)} className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white">
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
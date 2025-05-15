import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Checkbox } from "../components/ui/checkbox";
import { Slider } from "../components/ui/slider";
import { Star, ShoppingCart, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

export default function WorkEssentials() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const categoryName = "Work Essentials";
  const categoryDescription = "Gear up with top-rated equipment and tools for your professional journey.";

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${apiUrl}/api/admin/work-essentials`, config);
        const data = res.data;
        if (Array.isArray(data)) {
          setItems(data);
          setFilteredItems(data);
        } else {
          setItems([]);
          setFilteredItems([]);
        }
      } catch (err) {
        console.error("Failed to fetch items:", err.response?.data || err.message);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [apiUrl]);

  useEffect(() => {
    if (items.length === 0) return;
    let result = [...items];
    result = result.filter(item => {
      const price = parseFloat(item.price) || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    if (selectedRatings.length > 0) {
      result = result.filter(item => {
        const rating = parseFloat(item.rating) || 0;
        return selectedRatings.some(r => rating >= r);
      });
    }
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0));
        break;
      case "price-high":
        result.sort((a, b) => (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0));
        break;
      case "rating":
        result.sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0));
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      default:
        result.sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0));
        break;
    }
    setFilteredItems(result);
  }, [items, sortBy, priceRange, selectedRatings]);

  const handlePriceRangeChange = (values) => setPriceRange(values);
  const handleRatingChange = (rating, isChecked) => {
    if (isChecked) setSelectedRatings([...selectedRatings, rating]);
    else setSelectedRatings(selectedRatings.filter(r => r !== rating));
  };
  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedRatings([]);
    setSortBy("featured");
    setFilteredItems(items);
  };

  return (
    <div className="flex flex-col min-h-screen mt-5">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">hitchpath-Shop</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/learn-and-certify" className="text-sm font-medium hover:text-primary">
              Learn & Certify
            </Link>
            <Link to="/work-essentials" className="text-sm font-medium hover:text-primary">
              Work Essentials
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/search" className="text-sm font-medium hover:text-primary">
              Search
            </Link>
            <Link to="/account" className="text-sm font-medium hover:text-primary">
              Account
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{categoryName}</h1>
              <p className="text-slate-400 text-lg">{categoryDescription}</p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-64 shrink-0">
              <div className="sticky top-4 rounded-lg border p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-lg flex items-center">
                    <Filter className="h-4 w-4 mr-2" /> Filters
                  </h2>
                  <Button variant="ghost" size="sm" className="text-xs" onClick={resetFilters}>Reset</Button>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="price">
                    <AccordionTrigger className="text-sm font-medium">Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <Slider 
                          value={priceRange} 
                          max={1000} 
                          step={10} 
                          onValueChange={handlePriceRangeChange}
                        />
                        <div className="flex items-center justify-between">
                          <span className="text-sm">${priceRange[0]}</span>
                          <span className="text-sm">${priceRange[1]}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="rating">
                    <AccordionTrigger className="text-sm font-medium">Rating</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center">
                            <Checkbox 
                              id={`rating-${rating}`} 
                              checked={selectedRatings.includes(rating)}
                              onCheckedChange={(checked) => handleRatingChange(rating, checked)}
                            />
                            <label htmlFor={`rating-${rating}`} className="ml-2 text-sm flex items-center">
                              {Array.from({ length: rating }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                              ))}
                              {Array.from({ length: 5 - rating }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-slate-300" />
                              ))}
                              <span className="ml-1">& Up</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : filteredItems.length === 0 ? (
                <p>No work essentials found.</p>
              ) : (
                filteredItems.map((item, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>{item.name}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm font-semibold">${item.price}</p>
                    </CardContent>
                    <CardFooter>
                      <Button>Add to Cart</Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Checkbox } from "../components/ui/checkbox";
import { Slider } from "../components/ui/slider";
import { Star, ShoppingCart, Filter, SlidersHorizontal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

export default function LearnCertify() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRatings, setSelectedRatings] = useState([]);8
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  
  const categoryName = "Learn & Certify";
  const categoryDescription = "Enhance your skills with industry-recognized certifications and courses.";
  
  // API URL and config should come from your environment or configuration
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      // Add any auth tokens if needed
    }
  };

  // Fetch courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${apiUrl}/api/admin/courses`, config);
        const data = res.data;
        if (Array.isArray(data)) {
          setCourses(data);
          setFilteredCourses(data);
        } else {
          console.error("Expected array but got:", data);
          setCourses([]);
          setFilteredCourses([]);
        }
      } catch (err) {
        console.error("Failed to fetch courses:", err.response?.data || err.message);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [apiUrl]);

  // Apply filters and sorting
  useEffect(() => {
    if (courses.length === 0) return;
    
    let result = [...courses];
    
    // Apply price filter
    result = result.filter(
      course => {
        const price = parseFloat(course.price) || 0;
        return price >= priceRange[0] && price <= priceRange[1];
      }
    );
    
    // Apply rating filter
    if (selectedRatings.length > 0) {
      result = result.filter(course => {
        const rating = parseFloat(course.rating) || 0;
        return selectedRatings.some(r => rating >= r);
      });
    }
    
    // Apply type filter
    if (selectedTypes.length > 0) {
      result = result.filter(course => 
        selectedTypes.includes(course.type)
      );
    }
    
    // Apply level filter
    if (selectedLevels.length > 0) {
      result = result.filter(course => 
        selectedLevels.includes(course.level)
      );
    }
    
    // Apply sorting
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
      case "featured":
      default:
        // Sort by rating as a default "featured" implementation
        result.sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0));
        break;
    }
    
    setFilteredCourses(result);
  }, [courses, sortBy, priceRange, selectedRatings, selectedTypes, selectedLevels]);

  const handlePriceRangeChange = (values) => {
    setPriceRange(values);
  };

  const handleRatingChange = (rating, isChecked) => {
    if (isChecked) {
      setSelectedRatings([...selectedRatings, rating]);
    } else {
      setSelectedRatings(selectedRatings.filter(r => r !== rating));
    }
  };

  const handleTypeChange = (type, isChecked) => {
    if (isChecked) {
      setSelectedTypes([...selectedTypes, type]);
    } else {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    }
  };

  const handleLevelChange = (level, isChecked) => {
    if (isChecked) {
      setSelectedLevels([...selectedLevels, level]);
    } else {
      setSelectedLevels(selectedLevels.filter(l => l !== level));
    }
  };

  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedRatings([]);
    setSelectedTypes([]);
    setSelectedLevels([]);
    setSortBy("featured");
    // Reset to all courses
    setFilteredCourses(courses);
  };

  return (
    <div className="flex flex-col min-h-screen mt-5">
      {/* Navigation - same as in homepage */}
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
        {/* Category Header */}
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
            {/* Filters Sidebar */}
            <div className="w-full md:w-64 shrink-0">
              <div className="sticky top-4 rounded-lg border p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-lg flex items-center">
                    <Filter className="h-4 w-4 mr-2" /> Filters
                  </h2>
                  <Button variant="ghost" size="sm" className="text-xs" onClick={resetFilters}>
                    Reset
                  </Button>
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

                  <AccordionItem value="type">
                    <AccordionTrigger className="text-sm font-medium">Type</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Checkbox 
                            id="type-course" 
                            checked={selectedTypes.includes("course")}
                            onCheckedChange={(checked) => handleTypeChange("course", checked)}
                          />
                          <label htmlFor="type-course" className="ml-2 text-sm">
                            Courses
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox 
                            id="type-certification" 
                            checked={selectedTypes.includes("certification")}
                            onCheckedChange={(checked) => handleTypeChange("certification", checked)}
                          />
                          <label htmlFor="type-certification" className="ml-2 text-sm">
                            Certifications
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox 
                            id="type-bootcamp" 
                            checked={selectedTypes.includes("bootcamp")}
                            onCheckedChange={(checked) => handleTypeChange("bootcamp", checked)}
                          />
                          <label htmlFor="type-bootcamp" className="ml-2 text-sm">
                            Bootcamps
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox 
                            id="type-workshop" 
                            checked={selectedTypes.includes("workshop")}
                            onCheckedChange={(checked) => handleTypeChange("workshop", checked)}
                          />
                          <label htmlFor="type-workshop" className="ml-2 text-sm">
                            Workshops
                          </label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="level">
                    <AccordionTrigger className="text-sm font-medium">Level</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Checkbox 
                            id="level-beginner" 
                            checked={selectedLevels.includes("beginner")}
                            onCheckedChange={(checked) => handleLevelChange("beginner", checked)}
                          />
                          <label htmlFor="level-beginner" className="ml-2 text-sm">
                            Beginner
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox 
                            id="level-intermediate" 
                            checked={selectedLevels.includes("intermediate")}
                            onCheckedChange={(checked) => handleLevelChange("intermediate", checked)}
                          />
                          <label htmlFor="level-intermediate" className="ml-2 text-sm">
                            Intermediate
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox 
                            id="level-advanced" 
                            checked={selectedLevels.includes("advanced")}
                            onCheckedChange={(checked) => handleLevelChange("advanced", checked)}
                          />
                          <label htmlFor="level-advanced" className="ml-2 text-sm">
                            Advanced
                          </label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Button className="w-full mt-6">Apply Filters</Button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-slate-600">
                  {loading ? "Loading courses..." : `Showing ${filteredCourses.length} results`}
                </p>
                <div className="flex items-center space-x-2">
                  <SlidersHorizontal className="h-4 w-4 text-slate-400" />
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px] h-9 text-sm">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="text-center py-12">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
                  <p className="mt-4 text-slate-600">Loading courses...</p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="text-center py-12">
                  <p className="text-red-500">{error}</p>
                  <Button className="mt-4" onClick={() => window.location.reload()}>
                    Try Again
                  </Button>
                </div>
              )}

              {/* No Results State */}
              {!loading && !error && filteredCourses.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-600">No courses found matching your filters.</p>
                  <Button className="mt-4" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              )}

              {/* Courses Grid */}
              {!loading && !error && filteredCourses.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <Card key={course._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <img
                          src={course.image || "/placeholder.svg?height=400&width=600"}
                          alt={course.title}
                          className="object-cover w-full h-full"
                        />
                        {course.isAffiliate && (
                          <Badge className="absolute top-2 right-2 bg-yellow-400 text-black">Affiliate</Badge>
                        )}
                      </div>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{course.category}</Badge>
                          <div className="flex items-center">
                            {Array.from({ length: Math.floor(parseFloat(course.rating) || 0) }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            ))}
                            {parseFloat(course.rating) % 1 > 0 && <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />}
                            {Array.from({ length: 5 - Math.ceil(parseFloat(course.rating) || 0) }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-slate-300" />
                            ))}
                          </div>
                        </div>
                        <CardTitle className="mt-2 line-clamp-1">{course.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-lg">
                            R{parseFloat(course.price) ? `${parseFloat(course.price).toFixed(2)}` : "Free"}
                          </p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        {course.isAffiliate ? (
                          <Button 
                            className="w-full" 
                            onClick={() => window.open(course.affiliatelink, "_blank")}
                          >
                            View Course
                          </Button>
                        ) : (
                          <Button className="w-full">Add to Cart</Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}

              {/* Pagination - This would need to be implemented with your API */}
              {!loading && !error && filteredCourses.length > 0 && (
                <div className="flex items-center justify-center mt-12">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" disabled>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </Button>
                    <Button variant="outline" size="sm" className="bg-primary text-white hover:bg-primary/90">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      4
                    </Button>
                    <Button variant="outline" size="sm">
                      5
                    </Button>
                    <Button variant="outline" size="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
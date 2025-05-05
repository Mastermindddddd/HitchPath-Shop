import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Checkbox } from "../components/ui/checkbox";
import { Slider } from "../components/ui/slider";
import { Star, ShoppingCart, Filter, SlidersHorizontal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

export default function LearnCertify() {
  // This is a template - you would replace this with actual data from your backend
  const categoryName = "Learn & Certify"
  const categoryDescription = "Enhance your skills with industry-recognized certifications and courses."

  // Sample products - replace with actual data
  const products = [
    {
      id: 1,
      name: "Full-Stack Web Development Certification",
      description: "Comprehensive course with real-world projects",
      price: 199.99,
      originalPrice: 299.99,
      rating: 5,
      badge: "New",
      category: "Learn & Certify",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 2,
      name: "Data Science Bootcamp",
      description: "Master data analysis, visualization, and machine learning",
      price: 249.99,
      originalPrice: 349.99,
      rating: 4.5,
      badge: "Bestseller",
      category: "Learn & Certify",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 3,
      name: "UX/UI Design Fundamentals",
      description: "Learn to create beautiful, user-friendly interfaces",
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.8,
      badge: "",
      category: "Learn & Certify",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 4,
      name: "Project Management Professional (PMP) Prep",
      description: "Complete preparation for the PMP certification exam",
      price: 179.99,
      originalPrice: 249.99,
      rating: 4.7,
      badge: "Popular",
      category: "Learn & Certify",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 5,
      name: "Digital Marketing Masterclass",
      description: "Comprehensive training in all aspects of digital marketing",
      price: 159.99,
      originalPrice: 229.99,
      rating: 4.6,
      badge: "",
      category: "Learn & Certify",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 6,
      name: "Cybersecurity Fundamentals",
      description: "Essential skills for protecting digital assets",
      price: 189.99,
      originalPrice: 269.99,
      rating: 4.9,
      badge: "Hot",
      category: "Learn & Certify",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen mt-5">
      {/* Navigation - same as in homepage */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">hitchpath-Shop</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/learn-certify" className="text-sm font-medium hover:text-primary">
              Learn & Certify
            </Link>
            <Link to="/career-toolkit" className="text-sm font-medium hover:text-primary">
              Career Toolkit
            </Link>
            <Link to="/work-essentials" className="text-sm font-medium hover:text-primary">
              Work Essentials
            </Link>
            <Link to="/mindset-wellness" className="text-sm font-medium hover:text-primary">
              Mindset & Wellness
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
                  <Button variant="ghost" size="sm" className="text-xs">
                    Reset
                  </Button>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="price">
                    <AccordionTrigger className="text-sm font-medium">Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <Slider defaultValue={[0, 500]} max={1000} step={10} />
                        <div className="flex items-center justify-between">
                          <span className="text-sm">$0</span>
                          <span className="text-sm">$1000</span>
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
                            <Checkbox id={`rating-${rating}`} />
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
                          <Checkbox id="type-course" />
                          <label htmlFor="type-course" className="ml-2 text-sm">
                            Courses
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox id="type-certification" />
                          <label htmlFor="type-certification" className="ml-2 text-sm">
                            Certifications
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox id="type-bootcamp" />
                          <label htmlFor="type-bootcamp" className="ml-2 text-sm">
                            Bootcamps
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox id="type-workshop" />
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
                          <Checkbox id="level-beginner" />
                          <label htmlFor="level-beginner" className="ml-2 text-sm">
                            Beginner
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox id="level-intermediate" />
                          <label htmlFor="level-intermediate" className="ml-2 text-sm">
                            Intermediate
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox id="level-advanced" />
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
                <p className="text-sm text-slate-600">Showing {products.length} results</p>
                <div className="flex items-center space-x-2">
                  <SlidersHorizontal className="h-4 w-4 text-slate-400" />
                  <Select defaultValue="featured">
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      {product.badge && <Badge className="absolute top-2 right-2 bg-primary">{product.badge}</Badge>}
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{product.category}</Badge>
                        <div className="flex items-center">
                          {Array.from({ length: Math.floor(product.rating) }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          ))}
                          {product.rating % 1 > 0 && <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />}
                          {Array.from({ length: 5 - Math.ceil(product.rating) }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-slate-300" />
                          ))}
                        </div>
                      </div>
                      <CardTitle className="mt-2 line-clamp-1">{product.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
                        <p className="text-sm text-slate-500 line-through">${product.originalPrice.toFixed(2)}</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Add to Cart</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
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
            </div>
          </div>
        </div>
      </main>
      </div>
  )
}
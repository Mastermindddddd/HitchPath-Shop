import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Laptop,
  Heart,
  Star,
  ExternalLink,
} from "lucide-react"

const Hero = () => {
  const parallaxRef = useRef(null);
  const heroRef = useRef(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="pt-[12rem] -mt-[9rem]"
      customPaddings
      id="hero"
    >
      <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-400">Explore Our Categories</h2>
              <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
                Find AI-curated recommendations to advance your career and maintain your well-being.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Category 1 */}
              <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-blue-500">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle>Learn & Certify</CardTitle>
                  <CardDescription>Courses, certifications, and learning resources</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-slate-600">
                    AI-recommended courses and certifications from top educational platforms.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                    Browse Courses <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Category 2 */}
              <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-purple-500">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle>Career Toolkit</CardTitle>
                  <CardDescription>Resumes, interview templates, and career guides</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-slate-600">
                    AI-selected tools to help you stand out in competitive job markets.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                    Explore Tools <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Category 3 */}
              <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-blue-500">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Laptop className="h-8 w-8 text-cyan-600" />
                  </div>
                  <CardTitle>Work Essentials</CardTitle>
                  <CardDescription>Tech gear, laptops, and productivity tools</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-slate-600">
                    AI-recommended tech and tools to maximize your productivity and performance.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                    Shop Gear <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Category 4 */}
              <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-purple-500">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-teal-600" />
                  </div>
                  <CardTitle>Mindset & Wellness</CardTitle>
                  <CardDescription>Journals, meditation apps, and wellness products</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-slate-600">
                    AI-curated resources designed to support your mental well-being and work-life balance.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                    Discover Wellness <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Top Recommended Products</h2>
              <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
                Our AI has analyzed thousands of options to recommend these top products for career advancement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Product 1 */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-slate-200 group">
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10 group-hover:opacity-0 transition-opacity z-10"></div>
                  <img src="/placeholder.svg?height=400&width=600" alt="Product" fill className="object-cover" />
                  <Badge className="absolute top-2 right-2 bg-purple-600 z-20">AI Pick</Badge>
                  <Badge className="absolute top-2 left-2 bg-blue-600 z-20">Affiliate</Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-blue-500 text-blue-700">
                      Learn & Certify
                    </Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    </div>
                  </div>
                  <CardTitle className="mt-2">Full-Stack Web Development Certification</CardTitle>
                  <CardDescription>Comprehensive course with real-world projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-lg">$199.99</p>
                    <p className="text-sm text-slate-500 line-through">$299.99</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">View Details</Button>
                  <Button variant="outline" className="flex items-center gap-1">
                    <ExternalLink className="h-4 w-4" /> Visit Site
                  </Button>
                </CardFooter>
              </Card>

              {/* Product 2 */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-slate-200 group">
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-pink-900/10 group-hover:opacity-0 transition-opacity z-10"></div>
                  <img src="/placeholder.svg?height=400&width=600" alt="Product" fill className="object-cover" />
                  <Badge className="absolute top-2 right-2 bg-orange-500 z-20">Bestseller</Badge>
                  <Badge className="absolute top-2 left-2 bg-blue-600 z-20">Affiliate</Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-purple-500 text-purple-700">
                      Career Toolkit
                    </Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-slate-300" />
                    </div>
                  </div>
                  <CardTitle className="mt-2">Premium Resume Template Bundle</CardTitle>
                  <CardDescription>ATS-friendly templates with matching cover letters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-lg">$49.99</p>
                    <p className="text-sm text-slate-500 line-through">$79.99</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">View Details</Button>
                  <Button variant="outline" className="flex items-center gap-1">
                    <ExternalLink className="h-4 w-4" /> Visit Site
                  </Button>
                </CardFooter>
              </Card>

              {/* Product 3 */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-slate-200 group">
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 to-blue-900/10 group-hover:opacity-0 transition-opacity z-10"></div>
                  <img src="/placeholder.svg?height=400&width=600" alt="Product" fill className="object-cover" />
                  <Badge className="absolute top-2 left-2 bg-blue-600 z-20">Affiliate</Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-cyan-500 text-cyan-700">
                      Work Essentials
                    </Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    </div>
                  </div>
                  <CardTitle className="mt-2">Ergonomic Home Office Bundle</CardTitle>
                  <CardDescription>Complete setup for maximum productivity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-lg">$349.99</p>
                    <p className="text-sm text-slate-500 line-through">$499.99</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">View Details</Button>
                  <Button variant="outline" className="flex items-center gap-1">
                    <ExternalLink className="h-4 w-4" /> Visit Site
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" className="border-purple-500 text-purple-700 hover:bg-purple-50">
                View All Recommendations <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

    </section>
  );
};

export default Hero;
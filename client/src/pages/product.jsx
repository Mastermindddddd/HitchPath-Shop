import { Link } from "react-router-dom";
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Card, CardContent } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Award,
  Clock,
  Users,
  FileText,
  CheckCircle,
  ExternalLink,
  Bot,
  Cpu,
} from "lucide-react"

export default function ProductPage() {
  // This is a template - you would replace this with actual data from your backend
  const product = {
    id: 1,
    name: "Full-Stack Web Development Certification",
    description:
      "Comprehensive course with real-world projects and job placement assistance. Learn the most in-demand technologies and frameworks used by top companies.",
    price: 199.99,
    originalPrice: 299.99,
    rating: 5,
    reviewCount: 128,
    badge: "AI Pick",
    category: "Learn & Certify",
    image: "/placeholder.svg?height=600&width=800",
    features: [
      "24/7 access to course materials",
      "15 real-world projects",
      "Certificate upon completion",
      "Job placement assistance",
      "1-on-1 mentorship sessions",
      "Active community support",
    ],
    details: {
      duration: "6 months",
      level: "Beginner to Advanced",
      students: "10,000+",
      lastUpdated: "April 2025",
      languages: ["English", "Spanish"],
    },
    instructor: {
      name: "Dr. Alex Johnson",
      title: "Senior Software Engineer",
      company: "Tech Innovations Inc.",
      image: "/placeholder.svg?height=200&width=200",
    },
    relatedProducts: [
      {
        id: 2,
        name: "Data Science Bootcamp",
        price: 249.99,
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 3,
        name: "UX/UI Design Fundamentals",
        price: 149.99,
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 4,
        name: "Project Management Professional (PMP) Prep",
        price: 179.99,
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
    partnerName: "TechLearn Academy",
    partnerLogo: "/placeholder.svg?height=100&width=200",
  }

  return (
    <div className="flex flex-col min-h-screen">Beginner to Advanced
Certificate

      {/* Navigation */}
      <header className="border-b bg-black text-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/learn-certify" className="text-sm font-medium hover:text-purple-400">
              Learn & Certify
            </Link>
            <Link to="/career-toolkit" className="text-sm font-medium hover:text-purple-400">
              Career Toolkit
            </Link>
            <Link to="/work-essentials" className="text-sm font-medium hover:text-purple-400">
              Work Essentials
            </Link>
            <Link to="/mindset-wellness" className="text-sm font-medium hover:text-purple-400">
              Mindset & Wellness
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/search" className="text-sm font-medium hover:text-purple-400">
              Search
            </Link>
            <Link to="/account" className="text-sm font-medium hover:text-purple-400">
              Account
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-slate-500">
            <Link to="/" className="hover:text-purple-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/learn-certify" className="hover:text-purple-600">
              Learn & Certify
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-700">{product.name}</span>
          </div>
        </div>

        {/* Product Details */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative rounded-lg overflow-hidden border border-slate-200 h-[400px] md:h-[500px] shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10 z-10"></div>
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                {product.badge && <Badge className="bg-purple-600">{product.badge}</Badge>}
                <Badge className="bg-blue-600">Affiliate</Badge>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="mb-2 border-blue-500 text-blue-700">
                  {product.category}
                </Badge>
                <h1 className="text-3xl font-bold text-slate-400">{product.name}</h1>
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-300"}`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-slate-600">{product.reviewCount} reviews</span>
                  </div>
                  <span className="text-sm text-slate-600">|</span>
                  <span className="text-sm text-slate-600">{product.details.students} students</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-slate-500 mr-2" />
                  <span className="text-sm">{product.details.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-slate-500 mr-2" />
                  <span className="text-sm">{product.details.level}</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-slate-500 mr-2" />
                  <span className="text-sm">Certificate</span>
                </div>
              </div>

              <p className="text-slate-600">{product.description}</p>

              {/* Partner Information */}
              <div className=" p-4 rounded-lg border border-slate-200">
                <div className="flex items-center">
                  <div className="relative w-12 h-12 mr-4">
                    <img
                      src={product.partnerLogo || "/placeholder.svg"}
                      alt={product.partnerName}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Offered by</p>
                    <p className="font-medium">{product.partnerName}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  This is an affiliate link. We may earn a commission if you make a purchase.
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-3xl font-bold text-slate-600">${product.price.toFixed(2)}</p>
                  <p className="text-slate-400 line-through">${product.originalPrice.toFixed(2)}</p>
                </div>
                <Badge className="bg-green-600">33% OFF</Badge>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-sm">Money-back guarantee</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-sm">Lifetime access</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                  <ExternalLink className="mr-2 h-5 w-5" /> Visit Partner Site
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 border-purple-500 text-purple-700 hover:bg-purple-50"
                >
                  Save for Later
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                >
                  <Heart className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Instructor</h3>
                <div className="flex items-center space-x-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={product.instructor.image || "/placeholder.svg"}
                      alt={product.instructor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{product.instructor.name}</p>
                    <p className="text-sm text-slate-600">
                      {product.instructor.title}, {product.instructor.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Recommendation Badge */}
        <section className="container mx-auto px-4 py-6">
          <div className="bg-gradient-to-r from-slate-900 to-purple-900 rounded-lg p-6 text-white">
            <div className="flex items-center">
              <div className="bg-purple-500/30 p-3 rounded-full mr-4">
                <Bot className="h-8 w-8 text-purple-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold">AI Recommendation</h3>
                <p className="text-purple-200">
                  Our AI has analyzed this product and found it to be highly relevant for career advancement in web
                  development.
                </p>
              </div>
              <div className="ml-auto bg-purple-800/50 rounded-full p-4 text-center">
                <div className="text-2xl font-bold">98</div>
                <div className="text-xs text-purple-300">Match Score</div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Tabs */}
        <section className="container mx-auto px-4 py-12">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            <TabsContent value="features" className="p-6 border rounded-lg mt-4">
              <h3 className="text-xl font-bold mb-4">Course Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="curriculum" className="p-6 border rounded-lg mt-4">
              <h3 className="text-xl font-bold mb-4">Course Curriculum</h3>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold">Module 1: Introduction to Web Development</h4>
                  <p className="text-sm text-slate-600 mt-1">Learn the fundamentals of HTML, CSS, and JavaScript</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold">Module 2: Frontend Frameworks</h4>
                  <p className="text-sm text-slate-600 mt-1">Master React.js and build responsive user interfaces</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold">Module 3: Backend Development</h4>
                  <p className="text-sm text-slate-600 mt-1">Create APIs with Node.js and Express</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold">Module 4: Databases</h4>
                  <p className="text-sm text-slate-600 mt-1">Work with SQL and NoSQL databases</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold">Module 5: Deployment and DevOps</h4>
                  <p className="text-sm text-slate-600 mt-1">Deploy applications to the cloud and implement CI/CD</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="p-6 border rounded-lg mt-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Student Reviews</h3>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">Write a Review</Button>
              </div>
              <div className="space-y-6">
                <div className="border-b pb-6">
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <img src="/placeholder.svg?height=100&width=100" alt="Reviewer" fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ))}
                        <span className="ml-2 text-xs text-slate-500">2 weeks ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600">
                    This course completely transformed my career. The projects are practical and the instructor explains
                    complex concepts in an easy-to-understand way.
                  </p>
                </div>
                <div className="border-b pb-6">
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <img src="/placeholder.svg?height=100&width=100" alt="Reviewer" fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-medium">Michael Chen</p>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-slate-300"}`}
                          />
                        ))}
                        <span className="ml-2 text-xs text-slate-500">1 month ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600">
                    Great course with comprehensive content. The only improvement I'd suggest is more advanced topics in
                    the final modules.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="faq" className="p-6 border rounded-lg mt-4">
              <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold">Do I need prior programming experience?</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    No, this course is designed for beginners, though some basic computer knowledge is helpful.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold">Is the certificate recognized by employers?</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Yes, our certification is recognized by over 500 companies worldwide.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold">How long do I have access to the course materials?</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    You have lifetime access to all course materials, including future updates.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold">What if I'm not satisfied with the course?</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    The partner offers a 30-day money-back guarantee if you're not completely satisfied.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold">How does the affiliate program work?</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    We earn a commission when you purchase through our links, at no additional cost to you. We only
                    recommend products we believe in.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Related Products */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">AI Also Recommends</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.relatedProducts.map((relatedProduct) => (
              <Card
                key={relatedProduct.id}
                className="overflow-hidden hover:shadow-lg transition-shadow border border-slate-200"
              >
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10 z-10"></div>
                  <img
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-blue-600 z-20">Affiliate</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold line-clamp-1">{relatedProduct.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <p className="font-bold">${relatedProduct.price.toFixed(2)}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-purple-500 text-purple-700 hover:bg-purple-50"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      </div>
  )
}
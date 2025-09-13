"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Mountain,
  TreePine,
  MapPin,
  Star,
  Calendar,
  Sparkles,
  Camera,
  Heart,
  Navigation,
  Binoculars, 
  Waves,
  MessageCircle,
  Phone,
  Mail,
  MapIcon,
  Home,
  BarChart3,
  ShoppingBag,
} from "lucide-react"
import { FeedbackModal } from "@/components/feedback-modal"
import { AIChatbot } from "@/components/ai-chatbot"

export default function HomePage() {
  const [revealedElements, setRevealedElements] = useState(new Set())
  const [navbarOpacity, setNavbarOpacity] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-reveal-index") || "0")
            setRevealedElements((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".scroll-reveal")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const opacity = Math.min(scrollY / 100, 1) 
      setNavbarOpacity(opacity)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const features = [
    {
      icon: Calendar,
      title: "Smart Travel Planning",
      description: "Create personalized itineraries based on your preferences with intelligent recommendations",
      link: "/planner",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: MapPin,
      title: "Interactive Maps & Navigation",
      description: "Explore destinations with detailed maps and integrated Google Maps navigation",
      link: "/maps",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: ShoppingBag,
      title: "Local Marketplace",
      description: "Discover authentic tribal handicrafts, homestays, and cultural experiences from local artisans",
      link: "/marketplace",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Tourism officials can access comprehensive data insights and visitor analytics",
      link: "/analytics",
      gradient: "from-orange-500 to-red-600",
    },
  ]

  const destinations = [
    {
      name: "Baidyanath Dham",
      image: "/baidyanath-temple-complex.png",
      rating: 4.9,
      category: "Spiritual",
      description: "Sacred Jyotirlinga temple complex with stunning white architecture and spiritual significance",
      highlights: ["Temple Complex", "Spiritual Tours", "Architecture"],
    },
    {
      name: "Betla National Park",
      image: "/betla-national-park-wildlife-sanctuary-with-tigers.jpg",
      rating: 4.8,
      category: "Wildlife",
      description: "Experience diverse wildlife including tigers, elephants, and exotic birds",
      highlights: ["Tiger Safari", "Bird Watching", "Nature Trails"],
    },
    {
      name: "Hundru Falls",
      image: "/waterfall-lush-forest.png",
      rating: 4.7,
      category: "Nature",
      description: "Spectacular 98-meter waterfall surrounded by lush greenery and pristine nature",
      highlights: ["Waterfall Trek", "Photography", "Monsoon Views"],
    },
    {
      name: "Dassam Falls",
      image: "/dassam-falls-branded.png",
      rating: 4.6,
      category: "Adventure",
      description: "Thrilling waterfall perfect for adventure enthusiasts and nature lovers",
      highlights: ["Rock Climbing", "Rappelling", "Natural Pools"],
    },
    {
      name: "Netarhat Hill Station",
      image: "/netarhat-sunset-point-golden-hour.jpg",
      rating: 4.8,
      category: "Hill Station",
      description: "Queen of Chotanagpur plateau famous for breathtaking sunrise and sunset views",
      highlights: ["Sunrise Point", "Sunset Views", "Hill Station"],
    },
    {
      name: "Palamau Fort",
      image: "/palamau-fort-historical-architecture.jpg",
      rating: 4.5,
      category: "Heritage",
      description: "Historical fort ruins showcasing medieval architecture and rich heritage",
      highlights: ["Historical Tours", "Architecture", "Heritage Walk"],
    },
    {
      name: "Ranchi Hill Station",
      image: "/ranchi-hill-station-panoramic-view.jpg",
      rating: 4.4,
      category: "Urban",
      description: "Capital city with beautiful hills, waterfalls, and modern amenities",
      highlights: ["City Tours", "Rock Garden", "Tagore Hill"],
    },
    {
      name: "Tribal Cultural Village",
      image: "/traditional-tribal-village-with-authentic-handicra.jpg",
      rating: 4.9,
      category: "Culture",
      description: "Immerse yourself in authentic tribal culture and traditions",
      highlights: ["Cultural Dance", "Handicrafts", "Local Cuisine"],
    },
    {
      name: "Patratu Valley",
      image: "/cable-car-ropeway-hills.png",
      rating: 4.7,
      category: "Adventure",
      description: "Scenic valley with cable car rides and panoramic mountain views",
      highlights: ["Cable Car", "Valley Views", "Adventure Sports"],
    },
    {
      name: "Jonha Falls",
      image: "/waterfall-lush-forest.png",
      rating: 4.5,
      category: "Nature",
      description: "Hidden gem waterfall perfect for trekking and nature photography",
      highlights: ["Trekking", "Photography", "Natural Beauty"],
    },
    {
      name: "Hazaribagh Wildlife Sanctuary",
      image: "/betla-national-park-wildlife-sanctuary-with-tigers.jpg",
      rating: 4.6,
      category: "Wildlife",
      description: "Rich biodiversity sanctuary with leopards, sambars, and migratory birds",
      highlights: ["Wildlife Safari", "Bird Watching", "Nature Walks"],
    },
    {
      name: "Rajrappa Temple",
      image: "/baidyanath-temple-complex.png",
      rating: 4.4,
      category: "Spiritual",
      description: "Ancient temple dedicated to Goddess Chhinnamasta with scenic surroundings",
      highlights: ["Temple Visit", "River Views", "Spiritual Experience"],
    },
    {
      name: "Jagannath Temple Ranchi",
      image: "/baidyanath-temple-complex.png",
      rating: 4.6,
      category: "Spiritual",
      description: "Replica of famous Puri Jagannath Temple with annual Rath Yatra celebrations",
      highlights: ["Rath Yatra", "Temple Architecture", "Religious Festival"],
    },
    {
      name: "Birsa Zoological Park",
      image: "/betla-national-park-wildlife-sanctuary-with-tigers.jpg",
      rating: 4.3,
      category: "Wildlife",
      description: "Home to diverse wildlife species including white tigers and exotic birds",
      highlights: ["White Tigers", "Safari", "Family Outing"],
    },
    {
      name: "Kanke Dam",
      image: "/waterfall-lush-forest.png",
      rating: 4.2,
      category: "Nature",
      description: "Scenic dam surrounded by hills, perfect for boating and picnics",
      highlights: ["Boating", "Picnic Spot", "Hill Views"],
    },
    {
      name: "Maithon Dam",
      image: "/cable-car-ropeway-hills.png",
      rating: 4.4,
      category: "Adventure",
      description: "One of India's first underground power stations with beautiful reservoir",
      highlights: ["Underground Tour", "Water Sports", "Engineering Marvel"],
    },
    {
      name: "Parasnath Hill",
      image: "/netarhat-sunset-point-golden-hour.jpg",
      rating: 4.7,
      category: "Spiritual",
      description: "Highest peak in Jharkhand, sacred Jain pilgrimage site with ancient temples",
      highlights: ["Jain Temples", "Trekking", "Highest Peak"],
    },
    {
      name: "Deoghar Temple Complex",
      image: "/baidyanath-temple-complex.png",
      rating: 4.8,
      category: "Spiritual",
      description: "Ancient temple town with multiple shrines and spiritual significance",
      highlights: ["Multiple Temples", "Pilgrimage", "Spiritual Journey"],
    },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-emerald-400/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-teal-400/15 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-green-400/25 rounded-full animate-parallax-float"></div>
        <div className="absolute top-1/3 right-1/3 w-5 h-5 bg-emerald-300/20 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-4 h-4 bg-teal-300/15 rounded-full animate-float-slow"></div>
      </div>

      <header
        className="border-b backdrop-blur-md sticky top-0 z-50 glass-card transition-all duration-300"
        style={{
          backgroundColor: `rgba(255, 255, 255, ${navbarOpacity * 0.8})`,
          borderColor: `rgba(229, 231, 235, ${navbarOpacity})`
        }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">       
          <div className="flex items-center gap-2 relative opacity-95 hover:opacity-100 transition-opacity">
            <img src="/LOGOOO.jpg" alt="Jharkhand Tourism Logo back" className="h-18 w-75" />
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/planner"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
            >
              <Calendar className="h-4 w-4" />
              Plan Trip
            </Link>
            <Link
              href="/maps"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
            >
              <MapIcon className="h-4 w-4" />
              Explore Maps
            </Link>
            <Link
              href="/analytics"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
            >
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Link>
            <Link
              href="/marketplace"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
            >
              <ShoppingBag className="h-4 w-4" />
              Marketplace
            </Link>
          </nav>

          <FeedbackModal
            trigger={
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
              >
                <MessageCircle className="h-4 w-4" />
                Feedback
              </Button>
            }
          />
        </div>
      </header>

      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
        <video 
  className="w-full h-full object-cover" 
  autoPlay 
  loop 
  muted 
  playsInline
>
  <source src="/1.1.MOV" type="video/mp4" />
  Your browser does not support the video tag.
</video>


          
        </div>
       <div className="container mx-auto max-w-6xl relative z-10 px-4 py-12">
<h1
  style={{
    position: "absolute",
    top: "25%", // higher on screen
    left: "6%",
    color: "#f4f4f4",
    fontSize: "60px",
    fontWeight: "bold",
    fontFamily: "'Times New Roman', serif",
    textAlign: "left",
    textShadow: "3px 3px 8px rgba(0,0,0,0.8)",
    letterSpacing: "2px",
  }}
>
  WELCOME TO
</h1>

<h2
  style={{
    position: "absolute",
    top: "50%", // just below WELCOME TO
    left: "8%", 
    color: "#f4f4f4",
    fontSize: "48px", // smaller
    fontFamily: "'Times New Roman', serif",
    fontWeight: "bold",
    textAlign: "left",
    textShadow: "3px 3px 8px rgba(0,0,0,0.8)",
  }}
>
  Jharkhand
</h2>

<p
  style={{
    position: "absolute",
    top: "75%", // below both headings
    left: "6%",
    color: "#e6e6e6",
    fontSize: "20px",
    fontStyle: "italic",
    fontFamily: "'Georgia', serif",
    textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
  }}
>
  ~ Not just landscapes, but legacies...
</p>


          <div className="scroll-reveal" data-reveal-index="1">
            <p
              className="text-xl md:text-2xl text-white text-pretty mb-12 max-w-4xl mx-auto animate-fade-in-scale leading-relaxed drop-shadow-lg"
              style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.6)" }}
            >
              Experience the mystical beauty of ancient temples, cascading waterfalls, pristine wildlife sanctuaries,
              and rich tribal heritage in India's hidden gem
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center scroll-reveal" data-reveal-index="2">
            <Link href="/planner">
              <Button
                size="lg"
                className="text-xl px-12 py-6 btn-ripple hover-lift animate-pulse-glow bg-white text-black hover:bg-gray-100 border-2 border-white shadow-lg"
              >
                <TreePine className="h-6 w-6 mr-3" />
                Plan Your Journey
              </Button>
            </Link>
            <Link href="/maps">
              <Button
                size="lg"
                className="text-xl px-12 py-6 btn-ripple hover-lift bg-gray-900 text-white border-2 border-white hover:bg-white hover:text-black shadow-lg backdrop-blur-sm"
                style={{ backgroundColor: "rgba(17, 24, 39, 0.9)" }}
              >
                <Binoculars className="h-6 w-6 mr-3" />
                Explore Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-nature-gradient">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20 scroll-reveal" data-reveal-index="3">
            <h2 className="text-5xl font-bold mb-6 relative text-primary">
              Our Features
              <Sparkles className="inline-block ml-3 h-12 w-12 text-accent animate-float" />
            </h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
              Powered by modern technology to enhance your travel experience and connect you with authentic local
              culture
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`scroll-reveal ${revealedElements.has(index + 4) ? "revealed" : ""}`}
                data-reveal-index={index + 4}
              >
                <Link href={feature.link}>
                  <Card className="border-border/50 hover-lift hover-glow glass-card h-full cursor-pointer relative overflow-hidden group">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    ></div>

                    <CardHeader className="relative z-10 pb-4">
                      <div className="relative mb-6">
                        <feature.icon className="h-16 w-16 text-primary mb-4 animate-float group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute -top-2 -right-2">
                          <Sparkles className="h-6 w-6 text-accent animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                      </div>
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <CardDescription className="text-lg leading-relaxed">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-muted/30 tribal-pattern">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20 scroll-reveal" data-reveal-index="9">
            <h2 className="text-5xl font-bold mb-6 relative text-primary">
              Famous Travel Destinations
              <Heart className="inline-block ml-3 h-12 w-12 text-red-500 animate-pulse" />
            </h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
              From sacred temples to roaring waterfalls, discover the diverse beauty and rich heritage of Jharkhand
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((destination, index) => (
              <div
                key={index}
                className={`scroll-reveal ${revealedElements.has(index + 10) ? "revealed" : ""}`}
                data-reveal-index={index + 10}
              >
                <Card className="overflow-hidden hover-lift hover-glow glass-card group h-full">
                  <div className="aspect-[4/3] relative image-zoom">
                    <img
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Badge className="absolute top-4 left-4 glass-card animate-fade-in-scale" variant="secondary">
                      {destination.category}
                    </Badge>
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {destination.highlights.map((highlight, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="mr-1 mb-1 text-xs glass-card text-white border-white/50"
                        >
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                        {destination.name}
                      </CardTitle>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 animate-pulse" />
                        <span className="text-sm font-medium">{destination.rating}</span>
                      </div>
                    </div>
                    <CardDescription className="text-sm leading-relaxed mb-4">
                      {destination.description}
                    </CardDescription>
                    <Link
                      href={`https://www.google.com/maps/search/${encodeURIComponent(destination.name + " Jharkhand")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full"
                    >
                      <Button className="w-full btn-ripple hover-lift bg-transparent" variant="outline">
                        <Navigation className="h-4 w-4 mr-2" />
                        Get Directions
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t py-16 px-4 bg-nature-gradient">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Mountain className="h-8 w-8 text-primary animate-float" />
                <span className="text-2xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Jharkhand Tourism Platform
                </span>
                <TreePine className="h-8 w-8 text-accent animate-float-slow" />
              </div>
              <p className="text-muted-foreground text-lg mb-6">
                Promoting sustainable eco-tourism and cultural heritage preservation in the heart of India
              </p>
              <FeedbackModal
                trigger={
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Share Feedback
                  </Button>
                }
              />
            </div>

            {/* Government Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-primary">Government of Jharkhand</h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+91-651-2446721</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>tourism@jharkhand.gov.in</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Tourism Dept, Ranchi</span>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-xs">Follow us:</span>
                </div>
                <div className="flex gap-2">
                  <a
                    href="https://instagram.com/jharkhandtourism"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:text-pink-600 transition-colors"
                  >
                    @jharkhandtourism
                  </a>
                </div>
                <div className="flex gap-2">
                  <a
                    href="https://twitter.com/JharkhandGov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    @JharkhandGov
                  </a>
                </div>
              </div>
            </div>

            {/* Developer Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-accent">Development Team</h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>dev@jharkhnadtourism.in</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+91-9876543210</span>
                </div>
                <p className="text-xs mt-4">
                  Built with ❤️ for promoting Jharkhand's natural beauty and cultural heritage.
                </p>
                <p className="text-xs">Report technical issues or suggest improvements through our feedback system.</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>
              © 2024 Government of Jharkhand. All rights reserved. | Promoting sustainable tourism and cultural
              preservation.
            </p>
          </div>
        </div>
      </footer>

      <AIChatbot />
    </div>
  )
}

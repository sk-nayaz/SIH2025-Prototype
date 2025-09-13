"use client"

import { useState } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {
  Mountain,
  ShoppingBag,
  Star,
  MapPin,
  Search,
  Heart,
  Share2,
  Calendar,
  Users,
  HomeIcon,
  Palette,
  Music,
  Utensils,
  Clock,
  Truck,
} from "lucide-react"
import { AIChatbot } from "@/components/ai-chatbot"

const MarketplacePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState(new Set())

  const categories = [
    { id: "all", name: "All Items", icon: ShoppingBag },
    { id: "handicrafts", name: "Tribal Handicrafts", icon: Palette },
    { id: "homestays", name: "Homestays", icon: HomeIcon },
    { id: "events", name: "Cultural Events", icon: Music },
    { id: "food", name: "Local Cuisine", icon: Utensils },
  ]

  const marketplaceItems = [
    // Handicrafts
    {
      id: "1",
      category: "handicrafts",
      name: "Handwoven Tribal Basket",
      description: "Authentic bamboo basket crafted by Santhal artisans using traditional techniques",
      price: 850,
      originalPrice: 1200,
      rating: 4.8,
      reviews: 124,
      seller: "Munda Craft Collective",
      location: "Khunti District",
      image: "/1.jpg",
      tags: ["Handmade", "Eco-friendly", "Traditional"],
      inStock: true,
      deliveryTime: "5-7 days",
      featured: true,
    },
    {
      id: "2",
      category: "handicrafts",
      name: "Dokra Metal Art Figurine",
      description: "Traditional brass figurine made using ancient lost-wax casting technique",
      price: 2400,
      originalPrice: 3000,
      rating: 4.9,
      reviews: 89,
      seller: "Jharkhand Dokra Artists",
      location: "Dumka",
      image: "/5.jpeg",
      tags: ["Antique", "Handcrafted", "Cultural"],
      inStock: true,
      deliveryTime: "3-5 days",
      featured: true,
    },
    {
      id: "3",
      category: "handicrafts",
      name: "Tribal Jewelry Set",
      description: "Authentic silver jewelry with traditional Oraon tribal designs",
      price: 3200,
      originalPrice: 4500,
      rating: 4.7,
      reviews: 67,
      seller: "Tribal Heritage Crafts",
      location: "Gumla",
      image: "/6.jpeg",
      tags: ["Silver", "Traditional", "Handmade"],
      inStock: false,
      deliveryTime: "7-10 days",
      featured: false,
    },

    // Homestays
    {
      id: "4",
      category: "homestays",
      name: "Eco-Village Homestay",
      description: "Experience authentic tribal life in a sustainable eco-village setting",
      price: 1500,
      originalPrice: 2000,
      rating: 4.6,
      reviews: 156,
      seller: "Green Valley Homestays",
      location: "Netarhat",
      image: "/7.jpeg",
      tags: ["Eco-friendly", "Cultural", "Nature"],
      inStock: true,
      deliveryTime: "Instant booking",
      featured: true,
      capacity: "4 guests",
      amenities: ["Traditional meals", "Cultural programs", "Nature walks"],
    },
    {
      id: "5",
      category: "homestays",
      name: "Tribal Heritage Home",
      description: "Stay with a Munda family and learn traditional crafts and cooking",
      price: 1200,
      originalPrice: 1800,
      rating: 4.8,
      reviews: 203,
      seller: "Munda Family Homestay",
      location: "Ranchi Rural",
      image: "/8.jpeg",
      tags: ["Authentic", "Family-run", "Cultural"],
      inStock: true,
      deliveryTime: "Instant booking",
      featured: false,
      capacity: "6 guests",
      amenities: ["Home-cooked meals", "Craft workshops", "Village tours"],
    },

    // Events
    {
      id: "6",
      category: "events",
      name: "Sarhul Festival Experience",
      description: "Join the traditional Sarhul festival celebration with tribal communities",
      price: 800,
      originalPrice: 1200,
      rating: 4.9,
      reviews: 234,
      seller: "Cultural Events Jharkhand",
      location: "Multiple Villages",
      image: "/9.jpeg",
      tags: ["Festival", "Cultural", "Traditional"],
      inStock: true,
      deliveryTime: "Event date: March 15-17",
      featured: true,
      duration: "3 days",
      includes: ["Traditional dance", "Folk music", "Local cuisine"],
    },
    {
      id: "7",
      category: "events",
      name: "Karma Festival Tour",
      description: "Experience the vibrant Karma festival with traditional dance and music",
      price: 600,
      originalPrice: 900,
      rating: 4.7,
      reviews: 178,
      seller: "Jharkhand Cultural Tours",
      location: "Chaibasa",
      image: "/10.jpeg",
      tags: ["Festival", "Dance", "Music"],
      inStock: true,
      deliveryTime: "Event date: August 20-22",
      featured: false,
      duration: "2 days",
      includes: ["Cultural performances", "Traditional food", "Craft exhibitions"],
    },

    // Food
    {
      id: "8",
      category: "food",
      name: "Traditional Tribal Meal Kit",
      description: "Authentic ingredients and recipes for traditional Jharkhand cuisine",
      price: 450,
      originalPrice: 600,
      rating: 4.5,
      reviews: 92,
      seller: "Tribal Kitchen Collective",
      location: "Ranchi",
      image: "/11.jpeg",
      tags: ["Organic", "Traditional", "Healthy"],
      inStock: true,
      deliveryTime: "2-3 days",
      featured: false,
      serves: "4-6 people",
      includes: ["Recipe cards", "Spice mix", "Cooking instructions"],
    },
    {
      id: "9",
      category: "food",
      name: "Handia Brewing Kit",
      description: "Traditional rice beer brewing kit with authentic tribal recipe",
      price: 750,
      originalPrice: 1000,
      rating: 4.3,
      reviews: 56,
      seller: "Traditional Beverages Co.",
      location: "Jamshedpur",
      image: "/12.jpeg",
      tags: ["Traditional", "Fermented", "Cultural"],
      inStock: true,
      deliveryTime: "3-5 days",
      featured: false,
      yields: "2 liters",
      includes: ["Rice variety", "Fermentation starter", "Instructions"],
    },
  ]

  const filteredItems = marketplaceItems.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.seller.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleFavorite = (itemId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId)
      } else {
        newFavorites.add(itemId)
      }
      return newFavorites
    })
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getCategoryIcon = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.icon : ShoppingBag
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Mountain className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Jharkhand Tourism</h1>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Local Marketplace</h2>
          <p className="text-muted-foreground text-lg">
            Discover authentic tribal handicrafts, homestays, cultural events, and local cuisine
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for handicrafts, homestays, events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">All Products</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="homestays">Homestays</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => {
                const IconComponent = getCategoryIcon(item.category)
                return (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="aspect-video h-48 relative">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <IconComponent className="h-3 w-3" />
                          {categories.find((cat) => cat.id === item.category)?.name}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        {item.featured && <Badge className="bg-yellow-500 text-white">Featured</Badge>}
                        <button
                          onClick={() => toggleFavorite(item.id)}
                          className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              favorites.has(item.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                            }`}
                          />
                        </button>
                      </div>
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge variant="destructive">Out of Stock</Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-lg line-clamp-2">{item.name}</CardTitle>
                        <div className="flex items-center gap-1 ml-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{item.rating}</span>
                          <span className="text-xs text-muted-foreground">({item.reviews})</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>

                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{item.location}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{item.seller}</span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-primary">{formatPrice(item.price)}</span>
                          {item.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {formatPrice(item.originalPrice)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Truck className="h-3 w-3" />
                          {item.deliveryTime}
                        </div>
                      </div>

                      {/* Category-specific info */}
                      {item.category === "homestays" && (
                        <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Up to {item.capacity}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">Includes: {item.amenities?.join(", ")}</div>
                        </div>
                      )}

                      {item.category === "events" && (
                        <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{item.duration}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">Includes: {item.includes?.join(", ")}</div>
                        </div>
                      )}

                      {item.category === "food" && (
                        <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Utensils className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {item.serves ? `Serves : ${item.serves}` : `Yields ${item.yields}`}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">Includes: {item.includes?.join(", ")}</div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          disabled={!item.inStock}
                          onClick={() => {
                            if (item.category === "homestays" || item.category === "events") {
                              alert(`Booking ${item.name}... This would redirect to booking system.`)
                            } else {
                              alert(`Added ${item.name} to cart! This would add to shopping cart.`)
                            }
                          }}
                        >
                          {item.category === "homestays" || item.category === "events" ? "Book Now" : "Add to Cart"}
                        </Button>
                        <Button variant="outline" size="icon">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems
                .filter((item) => item.featured)
                .map((item) => {
                  const IconComponent = getCategoryIcon(item.category)
                  return (
                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                      <div className="aspect-video h-48 relative">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <IconComponent className="h-3 w-3" />
                            {categories.find((cat) => cat.id === item.category)?.name}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-yellow-500 text-white">Featured</Badge>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-lg line-clamp-2">{item.name}</CardTitle>
                          <div className="flex items-center gap-1 ml-2">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{item.rating}</span>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-primary">{formatPrice(item.price)}</span>
                            {item.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                {formatPrice(item.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>

                        <Button
                          className="w-full"
                          disabled={!item.inStock}
                          onClick={() => {
                            if (item.category === "homestays" || item.category === "events") {
                              alert(`Booking ${item.name}... This would redirect to booking system.`)
                            } else {
                              alert(`Added ${item.name} to cart! This would add to shopping cart.`)
                            }
                          }}
                        >
                          {item.category === "homestays" || item.category === "events" ? "Book Now" : "Add to Cart"}
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          </TabsContent>

          <TabsContent value="homestays" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems
                .filter((item) => item.category === "homestays")
                .map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video h-48 relative">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <HomeIcon className="h-3 w-3" />
                          Homestay
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <CardTitle className="text-lg mb-2">{item.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>

                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{item.location}</span>
                      </div>

                      <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Up to {item.capacity}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Amenities: {item.amenities?.join(", ")}</div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-bold text-primary">{formatPrice(item.price)}/night</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{item.rating}</span>
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        onClick={() => {
                          alert(`Booking ${item.name}... This would redirect to booking system.`)
                        }}
                      >
                        Book Homestay
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems
                .filter((item) => item.category === "events")
                .map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video h-48 relative">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Cultural Event
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <CardTitle className="text-lg mb-2">{item.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>

                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{item.location}</span>
                      </div>

                      <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{item.duration}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Experience: {item.includes?.join(", ")}</div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-bold text-primary">{formatPrice(item.price)}/person</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{item.rating}</span>
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        onClick={() => {
                          alert(`Joining ${item.name}... This would redirect to booking system.`)
                        }}
                      >
                        Join Event
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <AIChatbot />
    </div>
  )
}

export default MarketplacePage
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import {
  Mountain,
  MapPin,
  Filter,
  Star,
  Route,
  Eye,
  Car,
  Bus,
  Train,
  Plane,
  Clock,
  Phone,
  DollarSign,
  Calendar,
} from "lucide-react"
import { InteractiveMap } from "@/components/interactive-map"
import { AIChatbot } from "@/components/ai-chatbot"

const MapsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false)
  const [selectedDestinationDetails, setSelectedDestinationDetails] = useState(null)

  const destinations = [
    {
      id: "1",
      name: "Betla National Park",
      category: "wildlife",
      coordinates: { lat: 23.8859, lng: 84.1917 },
      rating: 4.8,
      reviews: 1247,
      description: "Home to tigers, elephants, and diverse wildlife in pristine forest ecosystem",
      image: "/betla-national-park-wildlife-sanctuary-with-tigers.jpg",
      distance: "45 km",
      travelTime: "1.5 hours",
      bestTime: "Oct - Mar",
      activities: ["Wildlife Safari", "Bird Watching", "Nature Photography", "Jungle Trek"],
      facilities: ["Rest House", "Canteen", "Guide Service", "Vehicle Rental"],
      entryFee: "₹200 (Indian), ₹1500 (Foreign)",
      openHours: "6:00 AM - 6:00 PM",
      contact: "+91-6562-255123",
    },
    {
      id: "2",
      name: "Hundru Falls",
      category: "waterfall",
      coordinates: { lat: 23.4241, lng: 85.5762 },
      rating: 4.6,
      reviews: 892,
      description: "Spectacular 98-meter waterfall cascading down rocky cliffs",
      image: "/waterfall-lush-forest.png",
      distance: "32 km",
      travelTime: "1 hour",
      bestTime: "Jul - Dec",
      activities: ["Waterfall Viewing", "Photography", "Picnic", "Rock Climbing"],
      facilities: ["Parking", "Food Stalls", "Viewing Platform", "Safety Rails"],
      entryFee: "₹50",
      openHours: "7:00 AM - 7:00 PM",
      contact: "+91-651-2234567",
    },
    {
      id: "3",
      name: "Dassam Falls",
      category: "waterfall",
      coordinates: { lat: 23.3167, lng: 85.4167 },
      rating: 4.5,
      reviews: 743,
      description: "Multi-tiered waterfall perfect for adventure activities",
      image: "/dassam-falls-branded.png",
      distance: "40 km",
      travelTime: "1.2 hours",
      bestTime: "Jul - Feb",
      activities: ["Rappelling", "Rock Climbing", "Swimming", "Camping"],
      facilities: ["Adventure Gear Rental", "Camping Site", "First Aid", "Guides"],
      entryFee: "₹75",
      openHours: "6:00 AM - 6:00 PM",
      contact: "+91-651-2456789",
    },
    {
      id: "4",
      name: "Baidyanath Dham",
      category: "spiritual",
      coordinates: { lat: 24.4917, lng: 86.7056 },
      rating: 4.9,
      reviews: 2156,
      description: "Sacred Jyotirlinga temple complex with stunning white architecture",
      image: "/baidyanath-temple-complex.png",
      distance: "250 km",
      travelTime: "5 hours",
      bestTime: "Year Round",
      activities: ["Temple Visit", "Architecture Tour", "Meditation", "Festival Participation"],
      facilities: ["Parking", "Prasad Counter", "Rest Area", "Information Center"],
      entryFee: "Free",
      openHours: "4:00 AM - 11:00 PM",
      contact: "+91-6434-222333",
    },
    {
      id: "5",
      name: "Netarhat Hill Station",
      category: "adventure",
      coordinates: { lat: 23.4667, lng: 84.2667 },
      rating: 4.7,
      reviews: 1089,
      description: "Queen of Chotanagpur plateau famous for sunrise and sunset views",
      image: "/netarhat-sunset-point-golden-hour.jpg",
      distance: "156 km",
      travelTime: "4 hours",
      bestTime: "Oct - Mar",
      activities: ["Sunrise Viewing", "Sunset Point", "Trekking", "Photography"],
      facilities: ["Hotels", "Restaurants", "Viewing Points", "Parking"],
      entryFee: "₹30",
      openHours: "24 hours",
      contact: "+91-6562-244567",
    },
    {
      id: "6",
      name: "Patratu Valley",
      category: "adventure",
      coordinates: { lat: 23.6833, lng: 85.1667 },
      rating: 4.6,
      reviews: 654,
      description: "Scenic valley with cable car rides and panoramic mountain views",
      image: "/cable-car-ropeway-hills.png",
      distance: "42 km",
      travelTime: "1.5 hours",
      bestTime: "Oct - Apr",
      activities: ["Cable Car", "Valley Views", "Adventure Sports", "Photography"],
      facilities: ["Cable Car Station", "Restaurants", "Parking", "Souvenir Shop"],
      entryFee: "₹150 (Cable Car)",
      openHours: "9:00 AM - 6:00 PM",
      contact: "+91-651-2345678",
    },
    {
      id: "7",
      name: "Hazaribagh Wildlife Sanctuary",
      category: "wildlife",
      coordinates: { lat: 23.9833, lng: 85.3667 },
      rating: 4.4,
      reviews: 567,
      description: "Rich biodiversity sanctuary with leopards, sambars, and migratory birds",
      image: "/betla-national-park-wildlife-sanctuary-with-tigers.jpg",
      distance: "90 km",
      travelTime: "2.5 hours",
      bestTime: "Nov - Mar",
      activities: ["Wildlife Safari", "Bird Watching", "Nature Walks", "Photography"],
      facilities: ["Forest Rest House", "Guide Service", "Canteen", "Vehicle Rental"],
      entryFee: "₹150",
      openHours: "6:00 AM - 5:00 PM",
      contact: "+91-6546-234567",
    },
    {
      id: "8",
      name: "Jonha Falls",
      category: "waterfall",
      coordinates: { lat: 23.2833, lng: 85.4167 },
      rating: 4.3,
      reviews: 432,
      description: "Hidden gem waterfall perfect for trekking and nature photography",
      image: "/waterfall-lush-forest.png",
      distance: "38 km",
      travelTime: "1.2 hours",
      bestTime: "Jul - Jan",
      activities: ["Trekking", "Photography", "Swimming", "Picnic"],
      facilities: ["Parking", "Food Stalls", "Changing Rooms", "Safety Rails"],
      entryFee: "₹40",
      openHours: "7:00 AM - 6:00 PM",
      contact: "+91-651-2567890",
    },
    {
      id: "9",
      name: "Rajrappa Temple",
      category: "spiritual",
      coordinates: { lat: 23.6167, lng: 85.5833 },
      rating: 4.5,
      reviews: 789,
      description: "Ancient temple dedicated to Goddess Chhinnamasta with scenic surroundings",
      image: "/baidyanath-temple-complex.png",
      distance: "65 km",
      travelTime: "2 hours",
      bestTime: "Year Round",
      activities: ["Temple Visit", "River Views", "Spiritual Experience", "Photography"],
      facilities: ["Parking", "Prasad Counter", "Rest Area", "Boat Service"],
      entryFee: "Free",
      openHours: "5:00 AM - 9:00 PM",
      contact: "+91-651-2678901",
    },
    {
      id: "10",
      name: "Tribal Cultural Village",
      category: "culture",
      coordinates: { lat: 23.3441, lng: 85.3096 },
      rating: 4.9,
      reviews: 654,
      description: "Authentic tribal village showcasing Santhal, Munda, and Oraon cultures",
      image: "/traditional-tribal-village-with-authentic-handicra.jpg",
      distance: "28 km",
      travelTime: "45 mins",
      bestTime: "Year Round",
      activities: ["Cultural Tour", "Handicraft Workshop", "Traditional Dance", "Local Cuisine"],
      facilities: ["Homestay", "Cultural Center", "Craft Shop", "Community Kitchen"],
      entryFee: "₹100",
      openHours: "8:00 AM - 8:00 PM",
      contact: "+91-651-2345678",
    },
    {
      id: "11",
      name: "Parasnath Hill",
      category: "spiritual",
      coordinates: { lat: 23.9667, lng: 86.1667 },
      rating: 4.7,
      reviews: 1234,
      description: "Highest peak in Jharkhand, sacred Jain pilgrimage site with ancient temples",
      image: "/netarhat-sunset-point-golden-hour.jpg",
      distance: "165 km",
      travelTime: "4.5 hours",
      bestTime: "Oct - Mar",
      activities: ["Jain Temple Visit", "Trekking", "Sunrise Views", "Pilgrimage"],
      facilities: ["Dharamshala", "Food Stalls", "Guide Service", "Rest Areas"],
      entryFee: "Free",
      openHours: "4:00 AM - 8:00 PM",
      contact: "+91-6564-234567",
    },
    {
      id: "12",
      name: "Jagannath Temple Ranchi",
      category: "spiritual",
      coordinates: { lat: 23.3441, lng: 85.3096 },
      rating: 4.6,
      reviews: 987,
      description: "Replica of famous Puri Jagannath Temple with annual Rath Yatra celebrations",
      image: "/baidyanath-temple-complex.png",
      distance: "8 km",
      travelTime: "20 mins",
      bestTime: "Year Round",
      activities: ["Temple Visit", "Rath Yatra", "Architecture Tour", "Photography"],
      facilities: ["Parking", "Prasad Counter", "Information Center", "Rest Area"],
      entryFee: "Free",
      openHours: "5:00 AM - 10:00 PM",
      contact: "+91-651-2234567",
    },
    {
      id: "13",
      name: "Birsa Zoological Park",
      category: "wildlife",
      coordinates: { lat: 23.4167, lng: 85.4333 },
      rating: 4.3,
      reviews: 756,
      description: "Home to diverse wildlife species including white tigers and exotic birds",
      image: "/betla-national-park-wildlife-sanctuary-with-tigers.jpg",
      distance: "16 km",
      travelTime: "30 mins",
      bestTime: "Oct - Mar",
      activities: ["Wildlife Viewing", "Safari", "Bird Watching", "Family Outing"],
      facilities: ["Cafeteria", "Parking", "Battery Car", "Souvenir Shop"],
      entryFee: "₹50 (Adult), ₹25 (Child)",
      openHours: "9:00 AM - 5:00 PM",
      contact: "+91-651-2345678",
    },
    {
      id: "14",
      name: "Kanke Dam",
      category: "adventure",
      coordinates: { lat: 23.4333, lng: 85.3167 },
      rating: 4.2,
      reviews: 543,
      description: "Scenic dam surrounded by hills, perfect for boating and picnics",
      image: "/waterfall-lush-forest.png",
      distance: "12 km",
      travelTime: "25 mins",
      bestTime: "Oct - Apr",
      activities: ["Boating", "Picnic", "Photography", "Hill Views"],
      facilities: ["Boat Rental", "Food Stalls", "Parking", "Changing Rooms"],
      entryFee: "₹30",
      openHours: "8:00 AM - 6:00 PM",
      contact: "+91-651-2456789",
    },
    {
      id: "15",
      name: "Maithon Dam",
      category: "adventure",
      coordinates: { lat: 23.8667, lng: 86.8333 },
      rating: 4.4,
      reviews: 678,
      description: "One of India's first underground power stations with beautiful reservoir",
      image: "/cable-car-ropeway-hills.png",
      distance: "52 km",
      travelTime: "1.5 hours",
      bestTime: "Nov - Mar",
      activities: ["Underground Tour", "Water Sports", "Boating", "Engineering Marvel"],
      facilities: ["Visitor Center", "Boat Service", "Cafeteria", "Parking"],
      entryFee: "₹100",
      openHours: "9:00 AM - 5:00 PM",
      contact: "+91-6564-345678",
    },
    {
      id: "16",
      name: "Deoghar Temple Complex",
      category: "spiritual",
      coordinates: { lat: 24.4833, lng: 86.7 },
      rating: 4.8,
      reviews: 1876,
      description: "Ancient temple town with multiple shrines and spiritual significance",
      image: "/baidyanath-temple-complex.png",
      distance: "253 km",
      travelTime: "5.5 hours",
      bestTime: "Year Round",
      activities: ["Multiple Temple Visits", "Pilgrimage", "Spiritual Journey", "Festival Participation"],
      facilities: ["Dharamshala", "Prasad Counters", "Information Centers", "Medical Aid"],
      entryFee: "Free",
      openHours: "4:00 AM - 11:00 PM",
      contact: "+91-6434-234567",
    },
    {
      id: "17",
      name: "Palamau Fort",
      category: "culture",
      coordinates: { lat: 24.0167, lng: 84.0667 },
      rating: 4.5,
      reviews: 432,
      description: "Historical fort ruins showcasing medieval architecture and rich heritage",
      image: "/palamau-fort-historical-architecture.jpg",
      distance: "170 km",
      travelTime: "4 hours",
      bestTime: "Oct - Mar",
      activities: ["Historical Tours", "Architecture Study", "Heritage Walk", "Photography"],
      facilities: ["Guide Service", "Information Board", "Parking", "Rest Area"],
      entryFee: "₹25",
      openHours: "8:00 AM - 6:00 PM",
      contact: "+91-6562-345678",
    },
    {
      id: "18",
      name: "Tagore Hill",
      category: "culture",
      coordinates: { lat: 23.3667, lng: 85.3333 },
      rating: 4.1,
      reviews: 321,
      description: "Historic hill where Rabindranath Tagore spent time, now a cultural center",
      image: "/ranchi-hill-station-panoramic-view.jpg",
      distance: "5 km",
      travelTime: "15 mins",
      bestTime: "Year Round",
      activities: ["Cultural Programs", "Literature Tours", "Sunset Views", "Photography"],
      facilities: ["Cultural Center", "Library", "Cafeteria", "Parking"],
      entryFee: "₹20",
      openHours: "9:00 AM - 7:00 PM",
      contact: "+91-651-2567890",
    },
    {
      id: "19",
      name: "Rock Garden Ranchi",
      category: "adventure",
      coordinates: { lat: 23.35, lng: 85.3167 },
      rating: 4.0,
      reviews: 654,
      description: "Artistic rock formations and sculptures in a beautiful garden setting",
      image: "/ranchi-hill-station-panoramic-view.jpg",
      distance: "7 km",
      travelTime: "20 mins",
      bestTime: "Oct - Apr",
      activities: ["Garden Walk", "Photography", "Art Appreciation", "Family Outing"],
      facilities: ["Parking", "Food Court", "Souvenir Shop", "Rest Areas"],
      entryFee: "₹40",
      openHours: "9:00 AM - 6:00 PM",
      contact: "+91-651-2678901",
    },
    {
      id: "20",
      name: "Dimna Lake",
      category: "adventure",
      coordinates: { lat: 22.7833, lng: 86.2 },
      rating: 4.3,
      reviews: 567,
      description: "Artificial lake surrounded by hills, perfect for water sports and relaxation",
      image: "/waterfall-lush-forest.png",
      distance: "13 km",
      travelTime: "25 mins",
      bestTime: "Oct - Mar",
      activities: ["Water Sports", "Boating", "Fishing", "Picnic"],
      facilities: ["Boat Rental", "Water Sports Equipment", "Cafeteria", "Parking"],
      entryFee: "₹50",
      openHours: "8:00 AM - 6:00 PM",
      contact: "+91-657-2345678",
    },
  ]

  const getTransportOptions = () => {
    const transportData = [
      {
        id: "1",
        type: "bus",
        from: "Ranchi",
        to: "Betla National Park",
        duration: "2 hours",
        cost: "₹150-250",
        frequency: "Every 2 hours",
        nextAvailable: "10:30 AM",
        destinationIds: ["1"], // Betla National Park
      },
      {
        id: "2",
        type: "car",
        from: "Ranchi",
        to: "Hundru Falls",
        duration: "1 hour",
        cost: "₹800-1200",
        frequency: "On demand",
        nextAvailable: "Available now",
        destinationIds: ["2"], // Hundru Falls
      },
      {
        id: "3",
        type: "train",
        from: "Ranchi",
        to: "Daltonganj",
        duration: "3.5 hours",
        cost: "₹200-800",
        frequency: "2 daily",
        nextAvailable: "2:15 PM",
        destinationIds: ["1", "17"], // For Betla and Palamau Fort
      },
      {
        id: "4",
        type: "bus",
        from: "Ranchi",
        to: "Tribal Villages",
        duration: "1.5 hours",
        cost: "₹100-180",
        frequency: "Every 3 hours",
        nextAvailable: "11:45 AM",
        destinationIds: ["10"], // Tribal Cultural Village
      },
      {
        id: "5",
        type: "car",
        from: "Ranchi",
        to: "Netarhat",
        duration: "4 hours",
        cost: "₹2000-3000",
        frequency: "On demand",
        nextAvailable: "Available now",
        destinationIds: ["5"], // Netarhat Hill Station
      },
      {
        id: "6",
        type: "bus",
        from: "Ranchi",
        to: "Deoghar",
        duration: "5.5 hours",
        cost: "₹300-500",
        frequency: "Every 4 hours",
        nextAvailable: "1:00 PM",
        destinationIds: ["4", "16"], // Baidyanath Dham and Deoghar Temple Complex
      },
    ]

    if (selectedDestination) {
      return transportData.filter((option) => option.destinationIds.includes(selectedDestination.id))
    }

    const filteredDestinations = destinations.filter(
      (dest) => selectedCategory === "all" || dest.category === selectedCategory,
    )

    const relevantDestinationIds = filteredDestinations.map((dest) => dest.id)

    return transportData.filter((option) => option.destinationIds.some((id) => relevantDestinationIds.includes(id)))
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("Location access denied")
        },
      )
    }
  }, [])

  const filteredDestinations = destinations.filter((dest) => {
    return selectedCategory === "all" || dest.category === selectedCategory
  })

  const getCategoryColor = (category) => {
    switch (category) {
      case "wildlife":
        return "bg-green-100 text-green-800"
      case "waterfall":
        return "bg-blue-100 text-blue-800"
      case "culture":
        return "bg-purple-100 text-purple-800"
      case "adventure":
        return "bg-orange-100 text-orange-800"
      case "spiritual":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTransportIcon = (type) => {
    switch (type) {
      case "bus":
        return Bus
      case "train":
        return Train
      case "car":
        return Car
      case "flight":
        return Plane
      default:
        return Car
    }
  }

  const openGoogleMaps = (destination) => {
    const { lat, lng } = destination.coordinates
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`
    window.open(url, "_blank")
  }

  const handleViewDetails = (destination) => {
    setSelectedDestinationDetails(destination)
    setViewDetailsOpen(true)
  }

  const handleDestinationSelect = (destination) => {
    setSelectedDestination(destination)
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
          <h2 className="text-3xl font-bold mb-2">Interactive Tourism Maps</h2>
          <p className="text-muted-foreground text-lg">
            Explore destinations with smart navigation and detailed information
          </p>
        </div>

        <Tabs defaultValue="explore" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="explore">Explore Destinations</TabsTrigger>
            <TabsTrigger value="transport">Transportation</TabsTrigger>
          </TabsList>

          <TabsContent value="explore" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-48">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 mr-2" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value)
                      setSelectedDestination(null)
                    }}
                    className="w-full"
                  >
                    <option value="all">All Destinations</option>
                    <option value="wildlife">Wildlife</option>
                    <option value="waterfall">Waterfalls</option>
                    <option value="culture">Culture</option>
                    <option value="adventure">Adventure</option>
                    <option value="spiritual">Spiritual</option>
                  </select>
                </div>
              </div>
            </div>

            <InteractiveMap destinations={destinations} selectedCategory={selectedCategory} />

            {/* Destinations Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((destination) => (
                <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <img
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={getCategoryColor(destination.category)} variant="secondary">
                        {destination.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl">{destination.name}</CardTitle>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{destination.rating}</span>
                        <span className="text-xs text-muted-foreground">({destination.reviews})</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{destination.description}</p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {destination.distance}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <div className="flex-1">
                        <button
                          className="w-full bg-transparent border rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-muted transition-colors"
                          onClick={() => handleViewDetails(destination)}
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </button>
                      </div>

                      <div className="flex-1">
                        <button
                          className="w-full border rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-muted transition-colors"
                          onClick={() => openGoogleMaps(destination)}
                        >
                          <Route className="h-4 w-4" />
                          Get Directions
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transport" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Destination for Transportation</CardTitle>
                <CardDescription>Choose a destination to see specific transportation options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDestinations.map((destination) => (
                    <Card
                      key={destination.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedDestination?.id === destination.id ? "ring-2 ring-primary bg-primary/5" : ""
                      }`}
                      onClick={() => handleDestinationSelect(destination)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={destination.image || "/placeholder.svg"}
                            alt={destination.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-medium">{destination.name}</h4>
                            <p className="text-sm text-muted-foreground">{destination.distance}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transportation Options</CardTitle>
                <CardDescription>
                  {selectedDestination
                    ? `Transport information for ${selectedDestination.name}`
                    : "Transport information for selected destinations"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getTransportOptions().map((option) => {
                    const IconComponent = getTransportIcon(option.type)
                    return (
                      <div key={option.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">
                              {option.from} → {option.to}
                            </h4>
                            <Badge variant="outline" className="capitalize">
                              {option.type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {option.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              {option.cost}
                            </span>
                            <span>Frequency: {option.frequency}</span>
                          </div>
                          <p className="text-sm text-green-600 mt-1">Next available: {option.nextAvailable}</p>
                        </div>
                      </div>
                    )
                  })}
                  {getTransportOptions().length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No transportation options available for the selected filters.</p>
                      <p className="text-sm mt-2">Try selecting a different destination or category.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* View Details Modal */}
      <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          {selectedDestinationDetails && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedDestinationDetails.name}</DialogTitle>
                <DialogDescription>
                  <Badge className={getCategoryColor(selectedDestinationDetails.category)} variant="secondary">
                    {selectedDestinationDetails.category}
                  </Badge>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <img
                    src={selectedDestinationDetails.image || "/placeholder.svg"}
                    alt={selectedDestinationDetails.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      Rating & Reviews
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedDestinationDetails.rating}/5 ({selectedDestinationDetails.reviews} reviews)
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      Distance & Time
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedDestinationDetails.distance} • {selectedDestinationDetails.travelTime}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-green-600" />
                      Best Time to Visit
                    </h4>
                    <p className="text-sm text-muted-foreground">{selectedDestinationDetails.bestTime}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Phone className="h-4 w-4 text-blue-600" />
                      Contact
                    </h4>
                    <p className="text-sm text-muted-foreground">{selectedDestinationDetails.contact}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedDestinationDetails.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Activities</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDestinationDetails.activities.map((activity, index) => (
                      <Badge key={index} variant="outline">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Facilities</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDestinationDetails.facilities.map((facility, index) => (
                      <Badge key={index} variant="secondary">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-semibold mb-1">Entry Fee</h4>
                    <p className="text-sm text-muted-foreground">{selectedDestinationDetails.entryFee}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Open Hours</h4>
                    <p className="text-sm text-muted-foreground">{selectedDestinationDetails.openHours}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    className="flex-1 bg-primary text-primary-foreground rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                    onClick={() => openGoogleMaps(selectedDestinationDetails)}
                  >
                    <Route className="h-4 w-4" />
                    Get Directions
                  </button>
                  <button
                    className="flex-1 border rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-muted transition-colors"
                    onClick={() => handleDestinationSelect(selectedDestinationDetails)}
                  >
                    <Bus className="h-4 w-4" />
                    View Transport
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <AIChatbot />
    </div>
  )
}

export default MapsPage

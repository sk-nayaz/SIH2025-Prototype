"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mountain, MapPin, Calendar, Users, Clock, TreePine, Heart, Download, Languages } from "lucide-react"
import Link from "next/link"
import { AIChatbot } from "@/components/ai-chatbot"

const ItineraryItem = {
  id: "",
  day: 0,
  time: "",
  activity: "",
  location: "",
  duration: "",
  cost: "",
  description: "",
  category: "",
  image: "",
}

export default function PlannerPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("english")
  const [preferences, setPreferences] = useState({
    duration: "",
    interests: [],
    groupSize: "",
    accommodation: "",
    transportation: "",
    startDate: "",
    specialRequirements: "",
  })
  const [generatedItinerary, setGeneratedItinerary] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)

  const languages = [
    { value: "english", label: "English" },
    { value: "hindi", label: "हिंदी" },
    { value: "bengali", label: "বাংলা" },
    { value: "santali", label: "ᱥᱟᱱᱛᱟᱲᱤ" },
  ]

  const interestOptions = [
    "Wildlife & Nature",
    "Tribal Culture",
    "Adventure Sports",
    "Photography",
    "Spiritual Sites",
    "Local Cuisine",
    "Handicrafts",
    "Waterfalls",
    "Historical Sites",
    "Eco-Tourism",
  ]

  const sampleItinerary = [
    {
      id: "1",
      day: 1,
      time: "09:00 AM",
      activity: "Arrival & Temple Visit",
      location: "Baidyanath Dham",
      duration: "3 hours",
      cost: "₹500",
      description: "Visit the sacred Jyotirlinga temple complex with stunning white architecture",
      category: "culture",
      image: "/baidyanath-temple-complex.png",
    },
    {
      id: "2",
      day: 1,
      time: "02:00 PM",
      activity: "Tribal Museum Visit",
      location: "Ranchi Tribal Museum",
      duration: "3 hours",
      cost: "₹200",
      description: "Explore rich tribal heritage, traditional artifacts, and cultural exhibitions",
      category: "culture",
      image: "/tribal-dance-performance-cultural-festival.jpg",
    },
    {
      id: "3",
      day: 2,
      time: "06:00 AM",
      activity: "Wildlife Safari",
      location: "Betla National Park",
      duration: "6 hours",
      cost: "₹1,500",
      description: "Early morning safari to spot tigers, elephants, and exotic birds in pristine forest",
      category: "nature",
      image: "/betla-national-park-wildlife-sanctuary-with-tigers.jpg",
    },
    {
      id: "4",
      day: 2,
      time: "07:00 PM",
      activity: "Cultural Performance",
      location: "Tribal Village",
      duration: "2 hours",
      cost: "₹800",
      description: "Traditional Santhal dance and music performance by local artists",
      category: "culture",
      image: "/traditional-tribal-village-with-authentic-handicra.jpg",
    },
    {
      id: "5",
      day: 3,
      time: "08:00 AM",
      activity: "Waterfall Trek",
      location: "Hundru Falls",
      duration: "4 hours",
      cost: "₹500",
      description: "Trek to the spectacular 98-meter waterfall with photography opportunities",
      category: "adventure",
      image: "/waterfall-lush-forest.png",
    },
    {
      id: "6",
      day: 3,
      time: "03:00 PM",
      activity: "Dassam Falls Adventure",
      location: "Dassam Falls",
      duration: "3 hours",
      cost: "₹600",
      description: "Experience the thrilling waterfall perfect for adventure enthusiasts",
      category: "adventure",
      image: "/dassam-falls-branded.png",
    },
    {
      id: "7",
      day: 4,
      time: "09:00 AM",
      activity: "Sunset Viewing",
      location: "Netarhat Hill Station",
      duration: "3 hours",
      cost: "₹300",
      description: "Experience the famous Netarhat sunset from the Queen of Chotanagpur",
      category: "nature",
      image: "/netarhat-sunset-point-golden-hour.jpg",
    },
  ]

  useEffect(() => {
    if (preferences.interests.length > 0 || preferences.duration || preferences.accommodation) {
      generateItinerary()
    }
  }, [preferences])

  const generateItinerary = async () => {
    setIsGenerating(true)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    let filteredItinerary = [...sampleItinerary]

    if (preferences.interests.length > 0) {
      filteredItinerary = sampleItinerary.filter((item) => {
        return preferences.interests.some((interest) => {
          switch (interest) {
            case "Wildlife & Nature":
              return item.category === "nature"
            case "Tribal Culture":
              return item.category === "culture"
            case "Adventure Sports":
              return item.category === "adventure"
            case "Local Cuisine":
              return item.category === "food"
            case "Spiritual Sites":
              return item.location.includes("Baidyanath") || item.category === "culture"
            case "Waterfalls":
              return item.location.includes("Falls")
            case "Photography":
              return item.category === "nature" || item.location.includes("Falls")
            case "Handicrafts":
              return item.category === "culture"
            case "Historical Sites":
              return item.location.includes("Fort") || item.category === "culture"
            case "Eco-Tourism":
              return item.category === "nature"
            default:
              return true
          }
        })
      })
    }

    // Filter by duration
    if (preferences.duration) {
      const maxDays = preferences.duration === "1-2" ? 2 : preferences.duration === "3-5" ? 5 : 10
      filteredItinerary = filteredItinerary.filter((item) => item.day <= maxDays)
    }

    setGeneratedItinerary(filteredItinerary)
    setIsGenerating(false)
  }

  const downloadPDF = () => {
    const printContent = `
      <html>
        <head>
          <title>Jharkhand Travel Itinerary</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .day { margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 15px; }
            .activity { margin-bottom: 15px; padding: 10px; border-left: 4px solid #007bff; }
            .details { font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Jharkhand Travel Itinerary</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>
          ${Array.from(new Set(generatedItinerary.map((item) => item.day)))
            .map(
              (day) => `
            <div class="day">
              <h2>Day ${day}</h2>
              ${generatedItinerary
                .filter((item) => item.day === day)
                .map(
                  (item) => `
                <div class="activity">
                  <h3>${item.activity}</h3>
                  <p><strong>Location:</strong> ${item.location}</p>
                  <p><strong>Time:</strong> ${item.time} | <strong>Duration:</strong> ${item.duration} | <strong>Cost:</strong> ${item.cost}</p>
                  <p>${item.description}</p>
                </div>
              `,
                )
                .join("")}
            </div>
          `,
            )
            .join("")}
        </body>
      </html>
    `

    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(printContent)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "nature":
        return TreePine
      case "culture":
        return Users
      case "adventure":
        return Mountain
      case "food":
        return Heart
      default:
        return MapPin
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "nature":
        return "bg-green-100 text-green-800"
      case "culture":
        return "bg-purple-100 text-purple-800"
      case "adventure":
        return "bg-orange-100 text-orange-800"
      case "food":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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

          <div className="flex items-center gap-4">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-32">
                <Languages className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold mb-4 text-balance">AI-Powered Travel Planner</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Create a personalized itinerary for your Jharkhand adventure with our intelligent travel planning system
          </p>
        </div>

        <Tabs defaultValue="preferences" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="preferences" className="text-sm">
              Travel Preferences
            </TabsTrigger>
            <TabsTrigger value="itinerary" className="text-sm">
              Generated Itinerary
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preferences" className="space-y-8">
            <Card className="max-w-4xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Tell Us About Your Trip</CardTitle>
                <CardDescription className="text-base">
                  Share your preferences to create the perfect Jharkhand experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-foreground">Trip Duration</label>
                    <Select
                      value={preferences.duration}
                      onValueChange={(value) => setPreferences((prev) => ({ ...prev, duration: value }))}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 Days</SelectItem>
                        <SelectItem value="3-5">3-5 Days</SelectItem>
                        <SelectItem value="6-10">6-10 Days</SelectItem>
                        <SelectItem value="10+">10+ Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-foreground">Group Size</label>
                    <Input
                      placeholder="Number of travelers"
                      className="h-11"
                      value={preferences.groupSize}
                      onChange={(e) => setPreferences((prev) => ({ ...prev, groupSize: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-foreground">Start Date</label>
                    <Input
                      type="date"
                      className="h-11"
                      value={preferences.startDate}
                      onChange={(e) => setPreferences((prev) => ({ ...prev, startDate: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-foreground">Accommodation</label>
                    <Select
                      value={preferences.accommodation}
                      onValueChange={(value) => setPreferences((prev) => ({ ...prev, accommodation: value }))}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select accommodation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="homestay">Tribal Homestay</SelectItem>
                        <SelectItem value="eco-resort">Eco Resort</SelectItem>
                        <SelectItem value="hotel">Hotel</SelectItem>
                        <SelectItem value="camping">Camping</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-foreground">Transportation</label>
                    <Select
                      value={preferences.transportation}
                      onValueChange={(value) => setPreferences((prev) => ({ ...prev, transportation: value }))}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select transportation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public Transport</SelectItem>
                        <SelectItem value="private">Private Vehicle</SelectItem>
                        <SelectItem value="rental">Car Rental</SelectItem>
                        <SelectItem value="guided">Guided Tour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-semibold text-foreground">Your Interests</label>
                  <p className="text-sm text-muted-foreground">Select all that apply to personalize your itinerary</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {interestOptions.map((interest) => (
                      <Button
                        key={interest}
                        variant={preferences.interests.includes(interest) ? "default" : "outline"}
                        size="sm"
                        className="h-auto py-3 px-4 text-xs font-medium justify-start"
                        onClick={() => {
                          setPreferences((prev) => ({
                            ...prev,
                            interests: prev.interests.includes(interest)
                              ? prev.interests.filter((i) => i !== interest)
                              : [...prev.interests, interest],
                          }))
                        }}
                      >
                        {interest}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">Special Requirements</label>
                  <Input
                    placeholder="Dietary restrictions, accessibility needs, special occasions..."
                    className="h-11"
                    value={preferences.specialRequirements}
                    onChange={(e) => setPreferences((prev) => ({ ...prev, specialRequirements: e.target.value }))}
                  />
                </div>

                <div className="flex justify-center pt-4">
                  <Button onClick={generateItinerary} disabled={isGenerating} className="px-8 py-3 text-base">
                    {isGenerating ? "Generating..." : "Generate My Itinerary"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="itinerary" className="space-y-8">
            <div className="text-center space-y-4">
              <div>
                <h3 className="text-3xl font-bold text-balance">Your Personalized Itinerary</h3>
                <p className="text-muted-foreground text-lg">Crafted specifically for your Jharkhand adventure</p>
              </div>
              {generatedItinerary.length > 0 && (
                <Button variant="outline" onClick={downloadPDF} className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              )}
            </div>

            {generatedItinerary.length > 0 ? (
              <div className="space-y-8 max-w-5xl mx-auto">
                {Array.from(new Set(generatedItinerary.map((item) => item.day))).map((day) => (
                  <Card key={day} className="overflow-hidden">
                    <CardHeader className="bg-primary/5">
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-primary-foreground font-bold">{day}</span>
                        </div>
                        Day {day}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        {generatedItinerary
                          .filter((item) => item.day === day)
                          .map((item) => {
                            const IconComponent = getCategoryIcon(item.category)
                            return (
                              <div
                                key={item.id}
                                className="flex gap-6 p-6 border rounded-xl hover:shadow-md transition-shadow"
                              >
                                {item.image && (
                                  <div className="flex-shrink-0 hidden sm:block">
                                    <img
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.activity}
                                      className="w-32 h-24 object-cover rounded-lg"
                                    />
                                  </div>
                                )}
                                <div className="flex-shrink-0">
                                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <IconComponent className="h-6 w-6 text-primary" />
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="min-w-0 flex-1">
                                      <h4 className="font-semibold text-lg text-balance">{item.activity}</h4>
                                      <p className="text-muted-foreground flex items-center gap-2 mt-1">
                                        <MapPin className="h-4 w-4 flex-shrink-0" />
                                        {item.location}
                                      </p>
                                    </div>
                                    <Badge className={getCategoryColor(item.category)} variant="secondary">
                                      {item.category}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-4 text-pretty">{item.description}</p>
                                  <div className="flex flex-wrap items-center gap-6 text-sm">
                                    <span className="flex items-center gap-2 text-muted-foreground">
                                      <Clock className="h-4 w-4" />
                                      {item.time}
                                    </span>
                                    <span className="flex items-center gap-2 text-muted-foreground">
                                      <Clock className="h-4 w-4" />
                                      {item.duration}
                                    </span>
                                    <span className="flex items-center gap-2 font-medium text-green-700">
                                      <span className="text-green-600">₹</span>
                                      {item.cost}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="max-w-2xl mx-auto">
                <CardContent className="text-center py-16">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                  <h3 className="text-xl font-semibold mb-3">Ready to Plan Your Adventure?</h3>
                  <p className="text-muted-foreground mb-6 text-pretty">
                    Set your travel preferences to generate a personalized itinerary for your Jharkhand journey
                  </p>
                  <Button onClick={() => document.querySelector('[value="preferences"]')?.click()}>
                    Set My Preferences
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <AIChatbot />
    </div>
  )
}

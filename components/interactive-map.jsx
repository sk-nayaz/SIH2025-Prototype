"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Zap, TreePine, Mountain, Users, Star, ExternalLink } from "lucide-react"

export function InteractiveMap({ destinations = [], selectedCategory = "all" }) {
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [mapCenter, setMapCenter] = useState({ lat: 23.6102, lng: 85.2799 }) // Ranchi coordinates
  const [userLocation, setUserLocation] = useState(null)

  // Filter destinations based on category
  const filteredDestinations = destinations.filter(
    (dest) => selectedCategory === "all" || dest.category === selectedCategory,
  )

  useEffect(() => {
    // Get user's current location
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

  const getCategoryColor = (category) => {
    switch (category) {
      case "wildlife":
        return "bg-green-500"
      case "waterfall":
        return "bg-blue-500"
      case "culture":
        return "bg-purple-500"
      case "adventure":
        return "bg-orange-500"
      case "spiritual":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "wildlife":
        return TreePine
      case "waterfall":
        return Mountain
      case "culture":
        return Users
      case "adventure":
        return Zap
      case "spiritual":
        return Star
      default:
        return MapPin
    }
  }

  const openGoogleMaps = (destination) => {
    const { lat, lng } = destination.coordinates
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`
    window.open(url, "_blank")
  }

  const calculateDistance = (dest) => {
    if (!userLocation) return "Distance unknown"

    const R = 6371 // Earth's radius in km
    const dLat = ((dest.coordinates.lat - userLocation.lat) * Math.PI) / 180
    const dLng = ((dest.coordinates.lng - userLocation.lng) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((userLocation.lat * Math.PI) / 180) *
        Math.cos((dest.coordinates.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c

    return `${Math.round(distance)} km away`
  }

  return (
    <div className="space-y-6">
      {/* Interactive Map Container */}
      <Card className="h-96 relative overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <CardContent className="h-full p-0 relative">
          {/* Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-blue-100/50">
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                {/* Jharkhand state outline (simplified) */}
                <path
                  d="M50 150 Q100 100 150 120 Q200 110 250 130 Q300 140 350 160 Q340 200 320 220 Q280 240 240 230 Q200 250 160 240 Q120 220 100 200 Q70 180 50 150 Z"
                  fill="currentColor"
                  className="text-green-200"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                {/* Rivers */}
                <path
                  d="M80 180 Q150 170 220 180 Q280 190 320 200"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-blue-300"
                />

                {/* Hills */}
                <circle cx="120" cy="140" r="15" fill="currentColor" className="text-green-300" />
                <circle cx="180" cy="130" r="12" fill="currentColor" className="text-green-300" />
                <circle cx="250" cy="150" r="18" fill="currentColor" className="text-green-300" />
              </svg>
            </div>
          </div>

          {/* Destination Markers */}
          <div className="absolute inset-0 p-4">
            {filteredDestinations.slice(0, 8).map((destination, index) => {
              const IconComponent = getCategoryIcon(destination.category)
              // Position markers in a scattered pattern across the map
              const positions = [
                { top: "20%", left: "25%" },
                { top: "35%", left: "60%" },
                { top: "50%", left: "30%" },
                { top: "25%", left: "70%" },
                { top: "65%", left: "45%" },
                { top: "40%", left: "15%" },
                { top: "70%", left: "75%" },
                { top: "15%", left: "45%" },
              ]

              const position = positions[index] || { top: "50%", left: "50%" }

              return (
                <div
                  key={destination.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ top: position.top, left: position.left }}
                  onClick={() => setSelectedDestination(destination)}
                >
                  <div
                    className={`w-8 h-8 rounded-full ${getCategoryColor(destination.category)} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="h-4 w-4 text-white" />
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {destination.name}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* User Location Marker */}
          {userLocation && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>
          )}

          {/* Map Controls */}
          <div className="absolute top-4 right-4 space-y-2">
            <Button size="sm" variant="secondary" className="w-10 h-10 p-0">
              <Navigation className="h-4 w-4" />
            </Button>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 space-y-2">
            <h4 className="text-xs font-semibold">Categories</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { category: "wildlife", label: "Wildlife", icon: TreePine },
                { category: "waterfall", label: "Waterfalls", icon: Mountain },
                { category: "culture", label: "Culture", icon: Users },
                { category: "spiritual", label: "Spiritual", icon: Star },
              ].map(({ category, label, icon: Icon }) => (
                <div key={category} className="flex items-center gap-1">
                  <div className={`w-3 h-3 rounded-full ${getCategoryColor(category)}`}></div>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Destination Details */}
      {selectedDestination && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex gap-4">
              {selectedDestination.image && (
                <img
                  src={selectedDestination.image || "/placeholder.svg"}
                  alt={selectedDestination.name}
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                />
              )}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold">{selectedDestination.name}</h3>
                    <p className="text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {userLocation ? calculateDistance(selectedDestination) : selectedDestination.distance}
                    </p>
                  </div>
                  <Badge className={`${getCategoryColor(selectedDestination.category)} text-white`}>
                    {selectedDestination.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{selectedDestination.description}</p>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => openGoogleMaps(selectedDestination)}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setSelectedDestination(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{filteredDestinations.length}</div>
            <div className="text-sm text-muted-foreground">Destinations</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {filteredDestinations.filter((d) => d.category === "wildlife").length}
            </div>
            <div className="text-sm text-muted-foreground">Wildlife Parks</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {filteredDestinations.filter((d) => d.category === "waterfall").length}
            </div>
            <div className="text-sm text-muted-foreground">Waterfalls</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {filteredDestinations.filter((d) => d.category === "culture").length}
            </div>
            <div className="text-sm text-muted-foreground">Cultural Sites</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

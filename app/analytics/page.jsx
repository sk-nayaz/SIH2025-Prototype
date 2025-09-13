"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {
  Mountain,
  TrendingUp,
  Users,
  MapPin,
  Calendar,
  Activity,
  Download,
  Filter,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
} from "lucide-react"
import { AIChatbot } from "@/components/ai-chatbot"

const AnalyticsPage = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("30d")
  const [isLoading, setIsLoading] = useState(false)

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalVisitors: 45672,
      totalBookings: 1234,
      revenue: 2456789,
      popularDestinations: 18,
      growthRate: 12.5,
      conversionRate: 2.7,
    },
    visitorStats: [
      { month: "Jan", visitors: 3200, bookings: 89 },
      { month: "Feb", visitors: 3800, bookings: 102 },
      { month: "Mar", visitors: 4200, bookings: 118 },
      { month: "Apr", visitors: 3900, bookings: 95 },
      { month: "May", visitors: 4500, bookings: 134 },
      { month: "Jun", visitors: 5200, bookings: 156 },
      { month: "Jul", visitors: 6100, bookings: 189 },
      { month: "Aug", visitors: 5800, bookings: 167 },
      { month: "Sep", visitors: 5400, bookings: 145 },
      { month: "Oct", visitors: 4800, bookings: 128 },
      { month: "Nov", visitors: 4200, bookings: 111 },
      { month: "Dec", visitors: 3800, bookings: 98 },
    ],
    topDestinations: [
      { name: "Betla National Park", visitors: 8945, bookings: 234, revenue: 456789, growth: 15.2 },
      { name: "Hundru Falls", visitors: 7234, bookings: 189, revenue: 234567, growth: 8.7 },
      { name: "Baidyanath Dham", visitors: 6789, bookings: 167, revenue: 345678, growth: 12.3 },
      { name: "Netarhat Hill Station", visitors: 5432, bookings: 145, revenue: 234567, growth: -2.1 },
      { name: "Tribal Cultural Village", visitors: 4567, bookings: 123, revenue: 189456, growth: 18.9 },
    ],
    demographics: {
      ageGroups: [
        { group: "18-25", percentage: 28, count: 12788 },
        { group: "26-35", percentage: 35, count: 15985 },
        { group: "36-45", percentage: 22, count: 10048 },
        { group: "46-55", percentage: 10, count: 4567 },
        { group: "55+", percentage: 5, count: 2284 },
      ],
      sources: [
        { source: "Organic Search", percentage: 42, visitors: 19182 },
        { source: "Social Media", percentage: 28, count: 12788 },
        { source: "Direct", percentage: 18, visitors: 8221 },
        { source: "Referrals", percentage: 8, visitors: 3654 },
        { source: "Paid Ads", percentage: 4, visitors: 1827 },
      ],
    },
    seasonalTrends: [
      { season: "Winter", months: "Dec-Feb", visitors: 11800, bookings: 289, avgStay: 3.2 },
      { season: "Spring", months: "Mar-May", visitors: 12600, bookings: 347, avgStay: 3.8 },
      { season: "Summer", months: "Jun-Aug", visitors: 17100, bookings: 512, avgStay: 4.1 },
      { season: "Monsoon", months: "Sep-Nov", visitors: 14400, bookings: 398, avgStay: 3.5 },
    ],
    recentAlerts: [
      { type: "success", message: "Tourism revenue increased by 15% this month", time: "2 hours ago" },
      { type: "warning", message: "Betla National Park approaching capacity limit", time: "4 hours ago" },
      { type: "info", message: "New cultural festival data available", time: "1 day ago" },
      { type: "error", message: "Booking system maintenance scheduled", time: "2 days ago" },
    ],
  }

  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-IN").format(num)
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
            <button
              onClick={refreshData}
              className="flex items-center gap-2 px-3 py-2 text-sm border rounded-lg hover:bg-muted transition-colors"
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm border rounded-lg hover:bg-muted transition-colors">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Tourism Analytics Dashboard</h2>
          <p className="text-muted-foreground text-lg">
            Monitor tourism trends, visitor patterns, and economic impact across Jharkhand
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Time Range:</span>
          </div>
          <div className="flex gap-2">
            {["7d", "30d", "90d", "1y"].map((range) => (
              <button
                key={range}
                onClick={() => setSelectedTimeRange(range)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  selectedTimeRange === range ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                }`}
              >
                {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : range === "90d" ? "90 Days" : "1 Year"}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(analyticsData.overview.totalVisitors)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{analyticsData.overview.growthRate}%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(analyticsData.overview.totalBookings)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8.2%</span> conversion rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tourism Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(analyticsData.overview.revenue)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+15.3%</span> from last quarter
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Destinations</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.popularDestinations}</div>
              <p className="text-xs text-muted-foreground">Across all categories</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="destinations">Destinations</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Visitor Trends Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Visitor Trends</CardTitle>
                  <CardDescription>Visitor count and bookings over the past year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.visitorStats.slice(-6).map((stat, index) => (
                      <div key={stat.month} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 text-sm font-medium">{stat.month}</div>
                          <div className="flex-1 bg-muted rounded-full h-2 relative">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-500"
                              style={{ width: `${(stat.visitors / 6500) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{formatNumber(stat.visitors)}</div>
                          <div className="text-xs text-muted-foreground">{stat.bookings} bookings</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Alerts</CardTitle>
                  <CardDescription>Important updates and notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.recentAlerts.map((alert, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                        <div className="flex-shrink-0 mt-0.5">
                          {alert.type === "success" && <CheckCircle className="h-4 w-4 text-green-600" />}
                          {alert.type === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                          {alert.type === "info" && <Activity className="h-4 w-4 text-blue-600" />}
                          {alert.type === "error" && <AlertTriangle className="h-4 w-4 text-red-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{alert.message}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{alert.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="destinations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Destinations</CardTitle>
                <CardDescription>Most popular destinations by visitor count and revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topDestinations.map((destination, index) => (
                    <div key={destination.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">#{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">{destination.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatNumber(destination.visitors)} visitors • {destination.bookings} bookings
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatCurrency(destination.revenue)}</div>
                        <div
                          className={`text-sm flex items-center gap-1 ${
                            destination.growth > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          <TrendingUp className="h-3 w-3" />
                          {destination.growth > 0 ? "+" : ""}
                          {destination.growth}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Age Demographics</CardTitle>
                  <CardDescription>Visitor distribution by age groups</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.demographics.ageGroups.map((group) => (
                      <div key={group.group} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-16 text-sm font-medium">{group.group}</div>
                          <div className="flex-1 bg-muted rounded-full h-3 relative">
                            <div
                              className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500"
                              style={{ width: `${group.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{group.percentage}%</div>
                          <div className="text-xs text-muted-foreground">{formatNumber(group.count)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>How visitors discover Jharkhand tourism</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.demographics.sources.map((source) => (
                      <div key={source.source} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-20 text-sm font-medium">{source.source}</div>
                          <div className="flex-1 bg-muted rounded-full h-3 relative">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                              style={{ width: `${source.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{source.percentage}%</div>
                          <div className="text-xs text-muted-foreground">
                            {formatNumber(source.visitors || source.count)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Seasonal Tourism Trends</CardTitle>
                <CardDescription>Tourism patterns across different seasons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {analyticsData.seasonalTrends.map((season) => (
                    <div key={season.season} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{season.season}</h4>
                        <Badge variant="outline">{season.months}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Visitors</span>
                          <span className="font-medium">{formatNumber(season.visitors)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Bookings</span>
                          <span className="font-medium">{season.bookings}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Avg Stay</span>
                          <span className="font-medium">{season.avgStay} days</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <AIChatbot />
    </div>
  )
}

export default AnalyticsPage

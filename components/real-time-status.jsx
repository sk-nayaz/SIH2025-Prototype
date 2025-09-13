"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Wifi, WifiOff, Activity } from "lucide-react"

interface SystemStatus {
  isOnline: boolean
  lastUpdate: Date
  activeUsers: number
  serverStatus: "healthy" | "warning" | "error"
  features: {
    aiChat: boolean
    maps: boolean
    marketplace: boolean
    analytics: boolean
  }
}

export function RealTimeStatus() {
  const [status, setStatus] = useState<SystemStatus>({
    isOnline: true,
    lastUpdate: new Date(),
    activeUsers: 1247,
    serverStatus: "healthy",
    features: {
      aiChat: true,
      maps: true,
      marketplace: true,
      analytics: true,
    },
  })

  useEffect(() => {
    // Simulate real-time status updates
    const interval = setInterval(() => {
      setStatus((prev) => ({
        ...prev,
        lastUpdate: new Date(),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        isOnline: Math.random() > 0.05, // 95% uptime simulation
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "error":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Activity className="h-4 w-4" />
          System Status
        </CardTitle>
        <CardDescription className="text-xs">Real-time platform monitoring</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm">Connection</span>
          <div className="flex items-center gap-2">
            {status.isOnline ? (
              <Wifi className="h-4 w-4 text-green-600" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-600" />
            )}
            <Badge variant={status.isOnline ? "default" : "destructive"} className="text-xs">
              {status.isOnline ? "Online" : "Offline"}
            </Badge>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm">Server Health</span>
          <Badge variant="outline" className={`text-xs ${getStatusColor(status.serverStatus)}`}>
            {status.serverStatus}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm">Active Users</span>
          <div className="flex items-center gap-1">
            <Zap className="h-3 w-3 text-blue-600" />
            <span className="text-sm font-medium">{status.activeUsers.toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium">Features Status</span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center justify-between">
              <span>AI Chat</span>
              <div className={`w-2 h-2 rounded-full ${status.features.aiChat ? "bg-green-500" : "bg-red-500"}`} />
            </div>
            <div className="flex items-center justify-between">
              <span>Maps</span>
              <div className={`w-2 h-2 rounded-full ${status.features.maps ? "bg-green-500" : "bg-red-500"}`} />
            </div>
            <div className="flex items-center justify-between">
              <span>Marketplace</span>
              <div className={`w-2 h-2 rounded-full ${status.features.marketplace ? "bg-green-500" : "bg-red-500"}`} />
            </div>
            <div className="flex items-center justify-between">
              <span>Analytics</span>
              <div className={`w-2 h-2 rounded-full ${status.features.analytics ? "bg-green-500" : "bg-red-500"}`} />
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">Last updated: {status.lastUpdate.toLocaleTimeString()}</div>
      </CardContent>
    </Card>
  )
}

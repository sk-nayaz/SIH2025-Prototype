"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Bell, X, Check, AlertCircle, Info, CheckCircle, Clock } from "lucide-react"

interface Notification {
  id: string
  type: "booking" | "weather" | "promotion" | "system" | "alert"
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: "low" | "medium" | "high"
  actionUrl?: string
}

export function RealTimeNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "booking",
      title: "Booking Confirmed",
      message: "Your Betla National Park safari booking has been confirmed for tomorrow at 6:00 AM",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      priority: "high",
      actionUrl: "/bookings",
    },
    {
      id: "2",
      type: "weather",
      title: "Weather Alert",
      message: "Light rain expected at Hundru Falls. Consider carrying rain gear for your visit",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
      priority: "medium",
    },
    {
      id: "3",
      type: "promotion",
      title: "Special Offer",
      message: "20% off on tribal handicrafts this weekend. Limited time offer!",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: true,
      priority: "low",
      actionUrl: "/marketplace",
    },
    {
      id: "4",
      type: "system",
      title: "Platform Update",
      message: "New AR features are now available for destination previews",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      priority: "medium",
    },
  ])

  const [isOpen, setIsOpen] = useState(false)

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: ["booking", "weather", "promotion", "system", "alert"][Math.floor(Math.random() * 5)] as any,
        title: "New Update",
        message: "This is a simulated real-time notification",
        timestamp: new Date(),
        read: false,
        priority: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as any,
      }

      setNotifications((prev) => [newNotification, ...prev.slice(0, 9)])
    }, 30000) // New notification every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "booking":
        return CheckCircle
      case "weather":
        return AlertCircle
      case "promotion":
        return Info
      case "system":
        return Info
      case "alert":
        return AlertCircle
      default:
        return Bell
    }
  }

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === "high") return "text-red-600"
    if (priority === "medium") return "text-yellow-600"

    switch (type) {
      case "booking":
        return "text-green-600"
      case "weather":
        return "text-blue-600"
      case "promotion":
        return "text-purple-600"
      default:
        return "text-gray-600"
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative bg-transparent">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="h-96">
          <div className="p-2">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No notifications</p>
              </div>
            ) : (
              <div className="space-y-2">
                {notifications.map((notification) => {
                  const IconComponent = getNotificationIcon(notification.type)
                  return (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border transition-colors ${
                        notification.read ? "bg-muted/30" : "bg-background"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <IconComponent
                          className={`h-4 w-4 mt-0.5 ${getNotificationColor(notification.type, notification.priority)}`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium truncate">{notification.title}</p>
                            <div className="flex items-center gap-1">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <Check className="h-3 w-3" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => removeNotification(notification.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{notification.message}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatTime(notification.timestamp)}
                            </span>
                            {notification.priority === "high" && (
                              <Badge variant="destructive" className="text-xs">
                                Urgent
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

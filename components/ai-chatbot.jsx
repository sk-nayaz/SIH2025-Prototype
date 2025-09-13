"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  MessageCircle,
  Send,
  Bot,
  User,
  X,
  Minimize2,
  Maximize2,
  Sparkles,
  TreePine,
  Loader2,
  RefreshCw,
  AlertCircle,
} from "lucide-react"

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content:
        "🙏 Namaste! I'm your Jharkhand Tourism AI assistant. I can help you discover amazing destinations, plan your journey, find cultural experiences, and answer any questions about exploring the beautiful state of Jharkhand. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [suggestedQuestions] = useState([
    "Best waterfalls to visit in Jharkhand",
    "Plan a 3-day cultural itinerary",
    "Tribal cultural experiences and festivals",
    "Wildlife sanctuaries and safari options",
    "Temple destinations and pilgrimage sites",
    "Adventure activities and trekking spots",
    "Best time to visit different regions",
    "Local cuisine and food recommendations",
  ])
  const scrollAreaRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: "smooth",
        })
      }
    }
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 150)
    }
  }, [isOpen, isMinimized])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message || "I'm sorry, I couldn't process your request.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)
      setError(error.message)

      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date(),
        isError: true,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedQuestion = (question) => {
    setInput(question)
    setError(null)
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "🙏 Namaste! I'm your Jharkhand Tourism AI assistant. How can I help you explore Jharkhand today?",
        timestamp: new Date(),
      },
    ])
    setError(null)
  }

  const toggleChat = () => {
    console.log("[v0] Chatbot button clicked, current isOpen:", isOpen)
    setIsOpen(!isOpen)
    setIsMinimized(false)
    console.log("[v0] Setting isOpen to:", !isOpen)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const closeChat = () => {
    setIsOpen(false)
    setIsMinimized(false)
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <Button
            onClick={toggleChat}
            className="h-16 w-16 rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group relative overflow-hidden border-2 border-white/20"
            size="icon"
          >
            <MessageCircle className="h-7 w-7 text-white group-hover:scale-110 transition-transform relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
          <div className="absolute -top-1 -right-1">
            <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
          </div>
          <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping"></div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[9999]">
          <div
            className={`bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${
              isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bot className="h-6 w-6" />
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Jharkhand Tourism AI</h3>
                  {!isMinimized && (
                    <p className="text-xs opacity-90 flex items-center gap-1">
                      <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                      Online & Ready to Help
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!isMinimized && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearChat}
                    className="h-8 w-8 text-white hover:bg-white/20"
                    title="Clear Chat"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMinimize}
                  className="h-8 w-8 text-white hover:bg-white/20"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeChat}
                  className="h-8 w-8 text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <div
                className="flex flex-col bg-gradient-to-b from-gray-50 to-white"
                style={{ height: "calc(600px - 80px)" }}
              >
                {/* Messages Area */}
                <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.role === "assistant" && (
                          <div className="flex-shrink-0">
                            <div
                              className={`h-9 w-9 rounded-full flex items-center justify-center shadow-lg ${
                                message.isError
                                  ? "bg-gradient-to-br from-red-500 to-red-600"
                                  : "bg-gradient-to-br from-blue-500 to-purple-600"
                              }`}
                            >
                              {message.isError ? (
                                <AlertCircle className="h-5 w-5 text-white" />
                              ) : (
                                <Bot className="h-5 w-5 text-white" />
                              )}
                            </div>
                          </div>
                        )}

                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                            message.role === "user"
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white ml-auto rounded-br-md"
                              : message.isError
                                ? "bg-red-50 border border-red-200 rounded-bl-md"
                                : "bg-white border border-gray-200 rounded-bl-md"
                          }`}
                        >
                          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                          <div className="text-xs opacity-70 mt-2">
                            {message.timestamp?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </div>

                        {message.role === "user" && (
                          <div className="flex-shrink-0">
                            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center shadow-lg">
                              <User className="h-5 w-5 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex gap-3 justify-start">
                        <div className="flex-shrink-0">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                            <Loader2 className="h-5 w-5 text-white animate-spin" />
                          </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 text-sm shadow-sm">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
                              <div
                                className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              ></div>
                              <div
                                className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                            </div>
                            <span className="text-gray-500 text-xs">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Suggested Questions */}
                {messages.length === 1 && !isLoading && (
                  <div className="px-4 pb-2">
                    <div className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      Quick questions to get started:
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {suggestedQuestions.slice(0, 4).map((question, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors text-xs py-2 px-3 justify-start text-left"
                          onClick={() => handleSuggestedQuestion(question)}
                        >
                          {question}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="border-t bg-white p-4">
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="relative">
                      <Textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about destinations, planning, culture, or anything about Jharkhand..."
                        disabled={isLoading}
                        className="min-h-[60px] max-h-[120px] resize-none bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors pr-16"
                        rows={2}
                      />
                      <div className="absolute right-3 bottom-3 flex items-center gap-1">
                        <span className="text-xs text-gray-400">{input.length}/1000</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TreePine className="h-3 w-3 text-gray-400" />
                        <p className="text-xs text-gray-500">
                          AI responses may vary. Verify important travel information.
                        </p>
                      </div>
                      <Button
                        type="submit"
                        size="sm"
                        disabled={isLoading || !input.trim()}
                        className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <Send className="h-4 w-4 mr-2" />
                        )}
                        Send
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export async function POST(req) {
  try {
    const { messages } = await req.json()

    console.log("[v0] Received messages:", JSON.stringify(messages, null, 2))

    const systemPrompt = `You are a knowledgeable and friendly AI assistant for Jharkhand Tourism Platform. You are an expert on Jharkhand tourism and help visitors with comprehensive information about:

🏛️ DESTINATIONS & ATTRACTIONS:
- Baidyanath Dham (Deoghar) - Sacred Jyotirlinga temple, one of 12 Jyotirlingas in India
- Betla National Park - Tiger reserve with elephants, leopards, and 200+ bird species
- Hundru Falls - 98-meter spectacular waterfall, best during monsoon (July-September)
- Netarhat Hill Station - "Queen of Chotanagpur" with sunrise/sunset points
- Palamau Fort - 16th-century historical fort ruins with Mughal architecture
- Ranchi - Capital city with Rock Garden, Tagore Hill, and Kanke Dam
- Dassam Falls - 144-foot waterfall perfect for adventure activities
- Parasnath Hill - Highest peak (4,479 ft) and sacred Jain pilgrimage site
- Hazaribagh Wildlife Sanctuary - Leopards, sambars, and migratory birds
- Rajrappa Temple - Ancient temple dedicated to Goddess Chhinnamasta

🎭 CULTURAL EXPERIENCES:
- Tribal villages with authentic Santhal, Munda, and Oraon cultures
- Traditional dance forms: Jhumar, Domkach, Lahasua
- Handicrafts: Dokra metal craft, bamboo work, stone carving
- Festivals: Sarhul (spring festival), Karma Puja, Tusu Parab

🍽️ CUISINE & FOOD:
- Litti Chokha, Dhuska, Pittha, Rugra
- Tribal delicacies and organic forest produce
- Local markets and authentic restaurants

🏨 ACCOMMODATION & LOGISTICS:
- Government guest houses, eco-resorts, and hotels
- Transportation options and connectivity
- Best routes and travel times between destinations

🌿 ADVENTURE & NATURE:
- Trekking, rock climbing, rappelling opportunities
- Wildlife safaris and bird watching
- River rafting and water sports

📅 TRAVEL PLANNING:
- Best times to visit (October-March for most places, July-September for waterfalls)
- Seasonal considerations and weather patterns
- Itinerary suggestions for different durations (1-7 days)
- Budget planning and cost estimates

Always provide:
- Practical, actionable advice
- Current and accurate information
- Safety considerations
- Sustainable tourism practices
- Local cultural sensitivity tips
- Specific recommendations based on user interests

Keep responses helpful, informative, and encouraging. If asked about topics outside Jharkhand tourism, politely redirect while offering related tourism information.`

    const formattedMessages = [
      {
        role: "system",
        content: systemPrompt,
      },
      ...messages
        .filter((msg) => msg.role === "user" || msg.role === "assistant")
        .slice(-10) // Keep last 10 messages for context
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
    ]

    console.log("[v0] Formatted messages for AI:", JSON.stringify(formattedMessages, null, 2))

    let response
    let aiMessage

    try {
      // Primary: Try Groq API
      response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: formattedMessages,
          temperature: 0.7,
          max_tokens: 800,
          top_p: 0.9,
          frequency_penalty: 0.1,
          presence_penalty: 0.1,
        }),
      })

      console.log("[v0] Groq API response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.log("[v0] Groq API error response:", errorText)
        throw new Error(`Groq API error: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      console.log("[v0] Groq API response data:", JSON.stringify(data, null, 2))

      aiMessage = data.choices[0]?.message?.content

      if (!aiMessage) {
        throw new Error("No message content received from Groq API")
      }
    } catch (groqError) {
      console.error("[v0] Groq API failed:", groqError)

      const userQuery = messages[messages.length - 1]?.content?.toLowerCase() || ""

      if (userQuery.includes("waterfall")) {
        aiMessage = `I'd be happy to help you with waterfall information! 🏞️

**Top Waterfalls in Jharkhand:**

🌊 **Hundru Falls** - 98m high, best during monsoon (July-September)
🌊 **Dassam Falls** - 144 feet, great for adventure activities  
🌊 **Jonha Falls** - Hidden gem, perfect for trekking
🌊 **Hirni Falls** - Scenic beauty with natural pools

**Best Time to Visit:** July to September (monsoon season)
**What to Bring:** Comfortable trekking shoes, raincoat, camera

Would you like specific directions to any of these waterfalls or information about nearby accommodations?`
      } else if (userQuery.includes("temple") || userQuery.includes("spiritual")) {
        aiMessage = `Let me help you explore Jharkhand's spiritual destinations! 🙏

**Major Temples:**

🏛️ **Baidyanath Dham (Deoghar)** - One of 12 sacred Jyotirlingas
🏛️ **Parasnath Hill** - Highest peak, Jain pilgrimage site
🏛️ **Rajrappa Temple** - Dedicated to Goddess Chhinnamasta
🏛️ **Jagannath Temple (Ranchi)** - Replica of Puri temple

**Best Time:** October to March for comfortable weather
**Special Events:** Shravan month (July-August) for Baidyanath Dham

Would you like detailed information about any specific temple or pilgrimage route?`
      } else {
        aiMessage = `I apologize, but I'm experiencing some technical difficulties right now. However, I can still help you with Jharkhand tourism! 

**Popular Destinations:**
• Baidyanath Dham - Sacred Jyotirlinga temple
• Betla National Park - Tiger reserve & wildlife
• Hundru Falls - Spectacular 98m waterfall
• Netarhat - Hill station with amazing views
• Ranchi - Capital city with multiple attractions

**What would you like to know about?**
- Destination details and directions
- Travel planning and itineraries  
- Cultural experiences and festivals
- Adventure activities and nature spots
- Accommodation and dining options

Please try asking your question again, and I'll do my best to help!`
      }
    }

    return new Response(JSON.stringify({ message: aiMessage }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
  } catch (error) {
    console.error("[v0] Chat API Error:", error)

    const fallbackMessage = `I'm currently experiencing technical difficulties, but I'm still here to help with your Jharkhand travel questions! 

**I can help you with:**
🏞️ Destination recommendations and details
🗺️ Travel routes and planning
🎭 Cultural experiences and festivals  
🏨 Accommodation suggestions
🍽️ Local cuisine and dining
⛰️ Adventure activities and nature spots

**Popular Quick Answers:**
• **Best time to visit:** October to March (pleasant weather)
• **Must-see places:** Baidyanath Dham, Betla National Park, Hundru Falls
• **Getting around:** Ranchi is the main hub with good connectivity

Please try rephrasing your question, and I'll provide you with helpful information about exploring beautiful Jharkhand!`

    return new Response(
      JSON.stringify({
        message: fallbackMessage,
        error: "Service temporarily unavailable",
      }),
      {
        status: 200, // Return 200 to show fallback message instead of error
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      },
    )
  }
}

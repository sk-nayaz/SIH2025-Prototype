import { NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(request) {
  try {
    const { preferences, language } = await request.json()

    const systemPrompt = `You are an expert travel planner for Jharkhand tourism. Generate a detailed itinerary based on the user's preferences.

User preferences: ${JSON.stringify(preferences)}

Create a realistic itinerary that includes:
- Specific destinations in Jharkhand
- Cultural experiences with tribal communities
- Nature and wildlife activities
- Local cuisine recommendations
- Sustainable tourism practices
- Realistic timing and costs in Indian Rupees
- Transportation between locations

Format your response as a JSON array of itinerary items with this structure:
{
  "id": "unique_id",
  "day": number,
  "time": "HH:MM AM/PM",
  "activity": "Activity name",
  "location": "Specific location",
  "duration": "X hours",
  "cost": "₹amount",
  "description": "Detailed description",
  "category": "nature|culture|adventure|food"
}

Focus on authentic Jharkhand experiences including tribal villages, national parks, waterfalls, and cultural sites.`

    const { text } = await generateText({
      model: groq("llama-3.1-8b-instant"),
      system: systemPrompt,
      prompt: `Generate a ${preferences.duration || "3-5"} day itinerary for Jharkhand with budget ${preferences.budget || "mid"} and interests in ${preferences.interests?.join(", ") || "nature and culture"}.`,
      maxTokens: 1000,
    })

    // Try to parse the response as JSON, fallback to sample data if parsing fails
    let itinerary
    try {
      itinerary = JSON.parse(text)
    } catch {
      // Fallback sample itinerary
      itinerary = [
        {
          id: "1",
          day: 1,
          time: "09:00 AM",
          activity: "Arrival & Check-in",
          location: "Ranchi",
          duration: "2 hours",
          cost: "₹2,000",
          description: "Arrive in Ranchi, check into eco-friendly accommodation",
          category: "culture",
        },
        {
          id: "2",
          day: 1,
          time: "02:00 PM",
          activity: "Tribal Museum Visit",
          location: "Ranchi Tribal Museum",
          duration: "3 hours",
          cost: "₹200",
          description: "Explore rich tribal heritage and traditional artifacts",
          category: "culture",
        },
        {
          id: "3",
          day: 2,
          time: "06:00 AM",
          activity: "Wildlife Safari",
          location: "Betla National Park",
          duration: "6 hours",
          cost: "₹1,500",
          description: "Early morning safari to spot tigers, elephants, and exotic birds",
          category: "nature",
        },
      ]
    }

    return NextResponse.json({ itinerary })
  } catch (error) {
    console.error("Error generating itinerary:", error)
    return NextResponse.json({ error: "Failed to generate itinerary" }, { status: 500 })
  }
}

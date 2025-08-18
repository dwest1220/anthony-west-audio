"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getAllServices } from "@/data/service"
import ServiceCard from "@/components/services/ServiceCard"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ServicePage() {
  const { id } = useParams()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  useEffect(() => {
    async function fetchService() {
      try {
        const allServices = await getAllServices()
        const found = allServices.find((s) => String(s.id) === id)
        
        if (!found) {
          setError("Service not found")
        } else {
          setService(found)
        }
      } catch (err) {
        console.error("Error fetching services:", err)
        setError("Failed to load service")
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchService()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500 text-lg">Loading service...</p>
        </div>
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
          <Link 
            href="/" 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <ServiceCard service={service} variant="full" />
    </>
  )
}

// Example enhanced service data structure
// const exampleEnhancedService = {
//   id: 1,
//   name: "Live Audio Engineering",
//   icon: "mic",
//   description: "Front of House (FOH) and Monitor Engineering for tours and large-scale events. Expertise with high-end systems and industry-leading consoles.",
//   details: [
//     "Touring support for artists and events",
//     "Meyer Sound, EAW, Dante networks",
//     "Shure Wireless Workbench",
//     "DiGiCo, Yamaha Rivage, A&H dLive, Avid S6L"
//   ],
//   approach: "With over two decades of live sound experience, I bring a meticulous approach to every show. My focus is on creating pristine audio experiences that serve both the artist's vision and audience expectations, while maintaining the technical precision that high-stakes events demand.",
//   keyPoints: [
//     "System optimization for venue acoustics",
//     "Seamless artist-engineer communication", 
//     "Proactive problem-solving approach",
//     "Detailed show documentation"
//   ],
//   projects: [
//     {
//       name: "Winter Jam Tour",
//       description: "Multi-artist touring production with complex monitor requirements",
//       role: "Monitor Engineer"
//     },
//     {
//       name: "Stellar Awards", 
//       description: "Live broadcast event with critical audio timing",
//       role: "FOH Engineer"
//     }
//   ],
//   equipment: {
//     "Digital Consoles": ["DiGiCo SD12/SD10", "Yamaha Rivage PM10", "Allen & Heath dLive", "Avid S6L"],
//     "Systems": ["Meyer Sound LEO Family", "EAW Anya", "Dante Audio Networks", "Shure Axient Digital"],
//     "Software": ["Shure Wireless Workbench", "Meyer Sound Compass", "Dante Controller"]
//   },
//   pricing: {
//     rate: "$800-1200",
//     unit: "per day",
//     description: "Day rate for live audio engineering services",
//     note: "Travel expenses and extended tour rates quoted separately. Multi-day events may qualify for package pricing."
//   }
// }
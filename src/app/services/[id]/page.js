"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getAllServices } from "@/data/service"
import ServiceCard from "@/components/services/ServiceCard"

export default function ServicePage() {
  const { id } = useParams()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchService() {
      try {
        const allServices = await getAllServices()
        const found = allServices.find((s) => String(s.id) === id)
        setService(found)
      } catch (err) {
        console.error("Error fetching services:", err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchService()
  }, [id])

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading service...
      </p>
    )
  }

  return <ServiceCard service={service} />
}

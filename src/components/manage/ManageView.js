'use client'

import { getAllInquiries, editInquiry, deleteInquiry } from "@/data/inquiry"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const ManageView = () => {
    // const router = useRouter()

    const [inquiries, setInquiries] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAllInquiries()
            .then(data => {
                setInquiries(data)
                setLoading(false)
            })
            .catch(err => {
                console.error("Error fetching inquiries:", err)
                setLoading(false)
            })
    }, [])

    const handleStatusChange = (id, newStatus) => {
        const updatedInquiries = inquiries.map(inquiry =>
            inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry
        )
        setInquiries(updatedInquiries)

        const inquiryToUpdate = updatedInquiries.find(i => i.id === id)
        editInquiry(inquiryToUpdate)
            .catch(err => {
                console.error("Error updating inquiry:", err)
            })
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-600">Loading inquiries...</p>
            </div>
        )
    }

    const handleDelete = async ({inquiryId}) => {
        if (confirm("Are you sure you want to delete this inquiry?")) {
            await deleteInquiry(inquiryId)
            router.refresh()
        }
    }

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">
            <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Manage Inquiries
            </h1>

            <div className="grid gap-6 max-w-5xl mx-auto">
                {inquiries.map(inquiry => (
                    <div
                        key={inquiry.id}
                        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                    >
                        <h2 className="text-black font-semibold">{inquiry.event_name}</h2>
                        <p className="text-gray-600">Phone: {inquiry.phone}</p>
                        <p className="text-gray-600">Email: {inquiry.email}</p>
                        <p className="text-gray-500">User: {inquiry.user}</p>

                        <div className="mt-4 flex items-center gap-4">
                            <span
                                className={`inline-block px-4 py-2 rounded-lg text-white font-semibold ${inquiry.status === "TENTATIVE"
                                        ? "bg-yellow-500"
                                        : inquiry.status === "DEFINITE"
                                            ? "bg-green-500"
                                            : inquiry.status === "CANCELLED"
                                                ? "bg-red-500"
                                                : "bg-blue-500"
                                    }`}
                            >
                                {inquiry.status}
                            </span>

                            <select
                                value={inquiry.status}
                                onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                                className="bg-gray-100 text-gray-800 border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="TENTATIVE">Tentative</option>
                                <option value="DEFINITE">Definite</option>
                                <option value="CANCELLED">Cancelled</option>
                                <option value="SIGNING">Signing</option>
                            </select>
                            <button
                            onClick={() => handleDelete(inquiry.id)}
                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

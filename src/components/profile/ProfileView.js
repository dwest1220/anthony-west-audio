'use client'

import { useAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react"
import { getInquiriesById } from "@/data/inquiry"

export const ProfileView = () => {
    const { user } = useAuth()
    const [userInquiries, setUserInquiries] = useState([])

    useEffect(() => {
        if (user?.id) {
            getInquiriesById(user.id).then(setUserInquiries)
        }
    }, [user])

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-100 to-indigo-100 p-8">
            <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                My Inquiries
            </h1>

            {userInquiries.length === 0 ? (
                <p className="text-center text-lg text-gray-600">No inquiries found.</p>
            ) : (
                <div className="grid gap-6 max-w-4xl mx-auto">
                    {userInquiries.map(inquiry => (
                        <div
                            key={inquiry.id}
                            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                        >
                            <h2 className="text-black font-semibold">{inquiry.event_name}</h2>
                            <p className="text-gray-600">Event Date: {inquiry.event_date}</p>
                            <span
                                className={`inline-block mt-4 px-4 py-2 rounded-lg text-white font-semibold ${inquiry.status === "TENTATIVE" ? "bg-yellow-500" :
                                        inquiry.status === "DEFINITE" ? "bg-green-500" :
                                            inquiry.status === "CANCELLED" ? "bg-red-500" :
                                                "bg-blue-500"
                                    }`}
                            >
                                {inquiry.status}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}
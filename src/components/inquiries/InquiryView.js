'use client'

import { createInquiry } from "@/data/inquiry"
import { useState } from "react"


// const createInquiry = async (inquiry) => {
//   // Simulate API call
//   await new Promise(resolve => setTimeout(resolve, 1000))
//   return inquiry
// }

export default function InquiryView() {
    const [inquiry, setInquiry] = useState({
        event_name: '',
        event_date: '',
        location: '',
        email: '',
        phone: '',
        message: '',
    })

    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setInquiry({...inquiry, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await createInquiry(inquiry)
            setSubmitted(true)
        } catch (err) {
            setError('There was an issue submitting your inquiry.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6">
                <div className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-2xl rounded-2xl p-12 text-center max-w-md mx-auto">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                        Inquiry Submitted!
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-6">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
                        Let's Connect
                    </h1>
                    <p className="text-xl text-gray-600 max-w-lg mx-auto leading-relaxed">
                        Tell us about your event and we'll help bring your vision to life
                    </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-2xl rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8">
                        <h2 className="text-2xl font-bold text-white mb-2">Event Inquiry</h2>
                        <p className="text-gray-300">Share your event details with us</p>
                    </div>

                    <div className="p-8 space-y-8">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                                <p className="text-red-700 font-medium">{error}</p>
                            </div>
                        )}

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-3">
                                    Event Name
                                </label>
                                <input
                                    type="text"
                                    name="event_name"
                                    value={inquiry.event_name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                                    placeholder="Live Production, System Install, Consultation, etc..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-3">
                                    Event Date
                                </label>
                                <input
                                    type="date"
                                    name="event_date"
                                    value={inquiry.event_date}
                                    onChange={handleChange}
                                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                                />
                                <p className="text-xs text-gray-500 mt-2">For multi-day events, please enter the start date and include duration details below.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-3">
                                    Event Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={inquiry.location}
                                    onChange={handleChange}
                                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                                    placeholder="City, venue, or address..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={inquiry.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={inquiry.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                                        placeholder="(555) 123-4567"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-3">
                                    Tell us about your event
                                </label>
                                <textarea
                                    name="message"
                                    value={inquiry.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 resize-none"
                                    placeholder="Tell us about your vision, guest count, special requirements, budget range, or any other details that would help us understand your needs..."
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-gray-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Submitting...</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center space-x-2">
                                    <span>Submit Inquiry</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </div>
                            )}
                        </button>

                        <p className="text-center text-sm text-gray-500 pt-4">
                            We typically respond within 24 hours during business days
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
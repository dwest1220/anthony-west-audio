'use client'

import { getAllInquiries, editInquiry, deleteInquiry } from "@/data/inquiry"
import { getAllBookings } from "@/data/booking"
import { getAllStaff } from "@/data/staff"
import { getAllBookingStaff, createBookingStaff } from "@/data/bookingstaff"
import { useEffect, useState } from "react"
import BookingModal from "./BookingModal"

export const ManageView = () => {
    const [inquiries, setInquiries] = useState([])
    const [bookings, setBookings] = useState([])
    const [staff, setStaff] = useState([])
    const [bookingStaff, setBookingStaff] = useState([])
    const [loading, setLoading] = useState(true)
    const [showBookingModal, setShowBookingModal] = useState(null)
    const [showStaffModal, setShowStaffModal] = useState(null)
    const [selectedStaff, setSelectedStaff] = useState([])

    useEffect(() => {
        Promise.all([
            getAllInquiries(),
            getAllBookings(),
            getAllStaff(),
            getAllBookingStaff()
        ])
            .then(([inquiriesData, bookingsData, staffData, bookingStaffData]) => {
                setInquiries(inquiriesData)
                setBookings(bookingsData)
                setStaff(staffData)
                setBookingStaff(bookingStaffData)
                setLoading(false)
            })
            .catch(err => {
                console.error("Error fetching data:", err)
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

    const handleDelete = async (inquiryId) => {
        if (confirm("Are you sure you want to delete this inquiry?")) {
            try {
                await deleteInquiry(inquiryId)
                setInquiries(prevInquiries =>
                    prevInquiries.filter(inquiry => inquiry.id !== inquiryId)
                )
            } catch (err) {
                console.error("Error deleting inquiry:", err)
            }
        }
    }

    const openBookingModal = (inquiry) => {
        setShowBookingModal(inquiry)
    }

    const closeBookingModal = () => {
        setShowBookingModal(null)
    }

    const handleBookingCreated = async () => {
        try {
            const updatedBookings = await getAllBookings()
            const updatedBookingStaff = await getAllBookingStaff()
            setBookings(updatedBookings)
            setBookingStaff(updatedBookingStaff)
        } catch (err) {
            console.error('Error refreshing data:', err)
        }
    }

    const openStaffModal = (bookingId) => {
        setShowStaffModal(bookingId)
        // Get currently assigned staff for this booking
        const currentAssignments = bookingStaff
            .filter(bs => bs.booking === bookingId)
            .map(bs => bs.staff)
        setSelectedStaff(currentAssignments)
    }

    const closeStaffModal = () => {
        setShowStaffModal(null)
        setSelectedStaff([])
    }

    const handleStaffToggle = (staffId) => {
        setSelectedStaff(prev => 
            prev.includes(staffId)
                ? prev.filter(id => id !== staffId)
                : [...prev, staffId]
        )
    }

    const saveStaffAssignments = async () => {
        try {
            // Get current assignments for this booking
            const currentAssignments = bookingStaff
                .filter(bs => bs.booking === showStaffModal)
                .map(bs => bs.staff)

            // Add new staff assignments
            const toAdd = selectedStaff.filter(staffId => !currentAssignments.includes(staffId))
            
            for (const staffId of toAdd) {
                await createBookingStaff({
                    booking: showStaffModal,
                    staff: staffId
                })
            }

            // Refresh booking staff data
            const updatedBookingStaff = await getAllBookingStaff()
            setBookingStaff(updatedBookingStaff)
            
            closeStaffModal()
            alert("Staff assignments updated!")
        } catch (err) {
            console.error("Error updating staff assignments:", err)
            alert("Error updating staff assignments")
        }
    }

    const getBookingForInquiry = (inquiryId) => {
        return bookings.find(booking => booking.inquiry_id === inquiryId)
    }

    const getStaffForBooking = (bookingId) => {
        return bookingStaff
            .filter(bs => bs.booking === bookingId)
            .map(bs => staff.find(s => s.id === bs.staff))
            .filter(Boolean)
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-600">Loading inquiries...</p>
            </div>
        )
    }

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">
            <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Manage Inquiries
            </h1>

            <div className="grid gap-6 max-w-5xl mx-auto">
                {inquiries.map(inquiry => {
                    const relatedBooking = getBookingForInquiry(inquiry.id)
                    const assignedStaff = relatedBooking ? getStaffForBooking(relatedBooking.id) : []
                    
                    return (
                        <div
                            key={inquiry.id}
                            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                        >
                            <h2 className="text-black font-semibold">{inquiry.event_name}</h2>
                            <p className="text-gray-600">Date: {inquiry.event_date}</p>
                            <p className="text-gray-600">Phone: {inquiry.phone}</p>
                            <p className="text-gray-600">Email: {inquiry.email}</p>
                            <p className="text-gray-500">User: {inquiry.user}</p>

                            {relatedBooking && (
                                <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                    <p className="text-green-800 font-semibold">✓ Booking Created</p>
                                    <p className="text-green-700">Status: {relatedBooking.status}</p>
                                    {assignedStaff.length > 0 && (
                                        <p className="text-green-700">
                                            Staff: {assignedStaff.map(s => s.name || s.id).join(', ')}
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="mt-4 flex items-center gap-4 flex-wrap">
                                <span
                                    className={`inline-block px-4 py-2 rounded-lg text-white font-semibold ${
                                        inquiry.status === "TENTATIVE"
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

                                {inquiry.status === "DEFINITE" && !relatedBooking && (
                                    <button
                                        onClick={() => openBookingModal(inquiry)}
                                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Create Booking
                                    </button>
                                )}

                                {relatedBooking && (
                                    <button
                                        onClick={() => openStaffModal(relatedBooking.id)}
                                        className="px-3 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600"
                                    >
                                        Manage Staff
                                    </button>
                                )}

                                <button
                                    onClick={() => handleDelete(inquiry.id)}
                                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Booking Creation Modal */}
            <BookingModal
                isOpen={showBookingModal !== null}
                onClose={closeBookingModal}
                inquiry={showBookingModal}
                staff={staff}
                onBookingCreated={handleBookingCreated}
            />

            {/* Staff Assignment Modal */}
            {showStaffModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full mx-4">
                        <h3 className="text-xl font-bold mb-4">Assign Staff to Booking</h3>
                        
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                            {staff.map(staffMember => (
                                <label key={staffMember.id} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedStaff.includes(staffMember.id)}
                                        onChange={() => handleStaffToggle(staffMember.id)}
                                        className="rounded"
                                    />
                                    <span className="text-gray-700">
                                        {staffMember.name || staffMember.id}
                                    </span>
                                </label>
                            ))}
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={saveStaffAssignments}
                                className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
                            >
                                Save
                            </button>
                            <button
                                onClick={closeStaffModal}
                                className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
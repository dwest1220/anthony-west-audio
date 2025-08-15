'use client'

import { getAllInquiries, editInquiry, deleteInquiry } from "@/data/inquiry"
import { getAllBookings } from "@/data/booking"
import { getAllStaff } from "@/data/staff"
import { getAllBookingStaff, createBookingStaff } from "@/data/bookingstaff"
import { useEffect, useState } from "react"
import BookingModal from "./BookingModal"
import { Calendar, Users, Mail, Phone, Clock, Settings, Trash2, Plus, X, Check } from "lucide-react"

export const ManageView = () => {
    const [inquiries, setInquiries] = useState([])
    const [bookings, setBookings] = useState([])
    const [staff, setStaff] = useState([])
    const [bookingStaff, setBookingStaff] = useState([])
    const [loading, setLoading] = useState(true)
    const [showBookingModal, setShowBookingModal] = useState(null)
    const [showStaffModal, setShowStaffModal] = useState(null)
    const [selectedStaff, setSelectedStaff] = useState([])
    const [deleteConfirm, setDeleteConfirm] = useState(null)

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
        try {
            await deleteInquiry(inquiryId)
            setInquiries(prevInquiries =>
                prevInquiries.filter(inquiry => inquiry.id !== inquiryId)
            )
            setDeleteConfirm(null)
        } catch (err) {
            console.error("Error deleting inquiry:", err)
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
            const currentAssignments = bookingStaff
                .filter(bs => bs.booking === showStaffModal)
                .map(bs => bs.staff)

            const toAdd = selectedStaff.filter(staffId => !currentAssignments.includes(staffId))
            
            for (const staffId of toAdd) {
                await createBookingStaff({
                    booking_id: showStaffModal,
                    staff_id: staffId
                })
            }

            const updatedBookingStaff = await getAllBookingStaff()
            setBookingStaff(updatedBookingStaff)
            
            closeStaffModal()
        } catch (err) {
            console.error("Error updating staff assignments:", err)
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

    const getStatusColor = (status) => {
        const colors = {
            TENTATIVE: 'bg-amber-100 text-amber-800 border-amber-200',
            DEFINITE: 'bg-emerald-100 text-emerald-800 border-emerald-200',
            CANCELLED: 'bg-red-100 text-red-800 border-red-200',
            SIGNING: 'bg-blue-100 text-blue-800 border-blue-200'
        }
        return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200'
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600 font-medium">Loading inquiries...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Inquiry Management</h1>
                            <p className="text-sm text-gray-500">Manage event inquiries and bookings</p>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span className="bg-gray-100 px-3 py-1 rounded-full">{inquiries.length} inquiries</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {inquiries.length === 0 ? (
                    <div className="text-center py-12">
                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries found</h3>
                        <p className="text-gray-500">There are currently no inquiries to manage.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {inquiries.map(inquiry => {
                            const relatedBooking = getBookingForInquiry(inquiry.id)
                            const assignedStaff = relatedBooking ? getStaffForBooking(relatedBooking.id) : []
                            
                            return (
                                <div
                                    key={inquiry.id}
                                    className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                                >
                                    {/* Card Header */}
                                    <div className="p-6 border-b border-gray-100">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                    {inquiry.event_name}
                                                </h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                                                    <div className="flex items-center space-x-2">
                                                        <Calendar className="w-4 h-4 text-gray-400" />
                                                        <span>{inquiry.event_date}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Phone className="w-4 h-4 text-gray-400" />
                                                        <span>{inquiry.phone}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Mail className="w-4 h-4 text-gray-400" />
                                                        <span>{inquiry.email}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-xs text-gray-500">User: {inquiry.user}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(inquiry.status)}`}>
                                                    {inquiry.status.toLowerCase().replace('_', ' ')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Booking Info */}
                                    {relatedBooking && (
                                        <div className="px-6 py-4 bg-green-50 border-b border-green-100">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex items-center space-x-2">
                                                        <Check className="w-4 h-4 text-green-600" />
                                                        <span className="text-green-800 font-medium">Booking Created</span>
                                                    </div>
                                                    <span className="text-green-700">Status: {relatedBooking.status}</span>
                                                </div>
                                                {assignedStaff.length > 0 && (
                                                    <div className="flex items-center space-x-2">
                                                        <Users className="w-4 h-4 text-green-600" />
                                                        <span className="text-green-700 text-sm">
                                                            {assignedStaff.map(s => 
                                                                s.first_name && s.last_name 
                                                                    ? `${s.first_name} ${s.last_name}` 
                                                                    : s.full_name || s.user?.username || `Staff ${s.id}`
                                                            ).join(', ')}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="p-6">
                                        <div className="flex items-center justify-between flex-wrap gap-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center space-x-2">
                                                    <label className="text-sm font-medium text-gray-700">Status:</label>
                                                    <select
                                                        value={inquiry.status}
                                                        onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                                                        className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                                                    >
                                                        <option value="TENTATIVE">Tentative</option>
                                                        <option value="DEFINITE">Definite</option>
                                                        <option value="CANCELLED">Cancelled</option>
                                                        <option value="SIGNING">Signing</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-3">
                                                {inquiry.status === "DEFINITE" && !relatedBooking && (
                                                    <button
                                                        onClick={() => openBookingModal(inquiry)}
                                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                                    >
                                                        <Plus className="w-4 h-4 mr-2" />
                                                        Create Booking
                                                    </button>
                                                )}

                                                {relatedBooking && (
                                                    <button
                                                        onClick={() => openStaffModal(relatedBooking.id)}
                                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                                                    >
                                                        <Settings className="w-4 h-4 mr-2" />
                                                        Manage Staff
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => setDeleteConfirm(inquiry.id)}
                                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-200 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                                                >
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Assign Staff</h3>
                            <button
                                onClick={closeStaffModal}
                                className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="p-6">
                            <div className="space-y-3 max-h-60 overflow-y-auto">
                                {staff.map(staffMember => (
                                    <label key={staffMember.id} className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-gray-50">
                                        <input
                                            type="checkbox"
                                            checked={selectedStaff.includes(staffMember.id)}
                                            onChange={() => handleStaffToggle(staffMember.id)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-gray-700 font-medium">
                                            {staffMember.first_name && staffMember.last_name 
                                                ? `${staffMember.first_name} ${staffMember.last_name}` 
                                                : staffMember.full_name || staffMember.user?.username || `Staff ${staffMember.id}`}
                                        </span>
                                    </label>
                                ))}
                                {staff.length === 0 && (
                                    <p className="text-gray-500 text-center py-4">No staff members available</p>
                                )}
                            </div>

                            <div className="flex space-x-3 mt-6">
                                <button
                                    onClick={saveStaffAssignments}
                                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 font-medium transition-colors duration-200"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={closeStaffModal}
                                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 font-medium transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-sm w-full">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Deletion</h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete this inquiry? This action cannot be undone.
                            </p>
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => handleDelete(deleteConfirm)}
                                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-medium transition-colors duration-200"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 font-medium transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
'use client'

import { getAllBookings, editBooking, deleteBooking } from "@/data/booking"
import { getAllStaff } from "@/data/staff"
import { getAllBookingStaff, createBookingStaff, deleteBookingStaff } from "@/data/bookingstaff"
import { useEffect, useState } from "react"
import EditBookingModal from "./EditBookingModal"
import { Calendar, Users, Mail, Phone, Clock, Settings, Trash2, Edit, DollarSign, FileText, X, Check, AlertCircle } from "lucide-react"

export const BookingManageView = () => {
    const [bookings, setBookings] = useState([])
    const [staff, setStaff] = useState([])
    const [bookingStaff, setBookingStaff] = useState([])
    const [loading, setLoading] = useState(true)
    const [showEditModal, setShowEditModal] = useState(null)
    const [showStaffModal, setShowStaffModal] = useState(null)
    const [selectedStaff, setSelectedStaff] = useState([])
    const [deleteConfirm, setDeleteConfirm] = useState(null)
    const [statusFilter, setStatusFilter] = useState('all')
    const [staffAssignmentLoading, setStaffAssignmentLoading] = useState(false)

    useEffect(() => {
        Promise.all([
            getAllBookings(),
            getAllStaff(),
            getAllBookingStaff()
        ])
            .then(([bookingsData, staffData, bookingStaffData]) => {
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
        const updatedBookings = bookings.map(booking =>
            booking.id === id ? { ...booking, status: newStatus } : booking
        )
        setBookings(updatedBookings)

        const bookingToUpdate = updatedBookings.find(b => b.id === id)
        editBooking(bookingToUpdate)
            .catch(err => {
                console.error("Error updating booking:", err)
                // Revert the change if update fails
                setBookings(bookings)
            })
    }

    const handleDelete = async (bookingId) => {
        try {
            await deleteBooking(bookingId)
            setBookings(prevBookings =>
                prevBookings.filter(booking => booking.id !== bookingId)
            )
            // Also remove associated booking staff records from local state
            setBookingStaff(prevBookingStaff =>
                prevBookingStaff.filter(bs => bs.booking !== bookingId)
            )
            setDeleteConfirm(null)
        } catch (err) {
            console.error("Error deleting booking:", err)
        }
    }

    const openEditModal = (booking) => {
        setShowEditModal(booking)
    }

    const closeEditModal = () => {
        setShowEditModal(null)
    }

    const handleBookingUpdated = async () => {
        try {
            const updatedBookings = await getAllBookings()
            setBookings(updatedBookings)
        } catch (err) {
            console.error('Error refreshing bookings:', err)
        }
    }

    const openStaffModal = (bookingId) => {
        setShowStaffModal(bookingId)
        const currentAssignments = bookingStaff
            .filter(bs => bs.booking === bookingId)
            .map(bs => typeof bs.staff === 'object' ? bs.staff.id : bs.staff)
        setSelectedStaff(currentAssignments)
    }

    const closeStaffModal = () => {
        setShowStaffModal(null)
        setSelectedStaff([])
        setStaffAssignmentLoading(false)
    }

    const handleStaffToggle = (staffId) => {
        setSelectedStaff(prev => 
            prev.includes(staffId)
                ? prev.filter(id => id !== staffId)
                : [...prev, staffId]
        )
    }

    const saveStaffAssignments = async () => {
        setStaffAssignmentLoading(true)
        try {
            // Get current assignments from DB
            const currentAssignments = bookingStaff
                .filter(bs => bs.booking === showStaffModal)
                .map(bs => typeof bs.staff === 'object' ? bs.staff.id : bs.staff)

            // Staff that need to be added
            const toAdd = selectedStaff.filter(staffId => !currentAssignments.includes(staffId))

            // Staff that need to be removed
            const toRemove = currentAssignments.filter(staffId => !selectedStaff.includes(staffId))

            // Add new staff assignments
            for (const staffId of toAdd) {
                await createBookingStaff({ 
                    booking_id: showStaffModal, 
                    staff_id: staffId 
                })
            }

            // Remove old staff assignments
            for (const staffId of toRemove) {
                const assignment = bookingStaff.find(
                    bs => bs.booking === showStaffModal && 
                         (typeof bs.staff === 'object' ? bs.staff.id === staffId : bs.staff === staffId)
                )
                if (assignment) {
                    await deleteBookingStaff(assignment.id)
                }
            }

            // Refresh booking staff data to reflect changes
            const updatedBookingStaff = await getAllBookingStaff()
            setBookingStaff(updatedBookingStaff)

            closeStaffModal()
        } catch (err) {
            console.error("Error updating staff assignments:", err)
            // You might want to show an error message to the user here
        } finally {
            setStaffAssignmentLoading(false)
        }
    }

    const getStaffForBooking = (bookingId) => {
        return bookingStaff
            .filter(bs => bs.booking === bookingId)
            .map(bs => {
                // Handle nested staff object or staff ID
                if (typeof bs.staff === 'object') {
                    return bs.staff
                } else {
                    return staff.find(s => s.id === bs.staff)
                }
            })
            .filter(Boolean)
    }

    const getStaffDisplayName = (staffMember) => {
        if (!staffMember) return 'Unknown Staff'
        
        if (staffMember.first_name && staffMember.last_name) {
            return `${staffMember.first_name} ${staffMember.last_name}`
        }
        if (staffMember.full_name && staffMember.full_name !== staffMember.user?.username) {
            return staffMember.full_name
        }
        if (staffMember.user?.first_name && staffMember.user?.last_name) {
            return `${staffMember.user.first_name} ${staffMember.user.last_name}`
        }
        if (staffMember.user?.username) {
            return staffMember.user.username
        }
        return `Staff ${staffMember.id}`
    }

    const getStatusColor = (status) => {
        const colors = {
            CONFIRMED: 'bg-emerald-100 text-emerald-800 border-emerald-200',
            IN_PROGRESS: 'bg-blue-100 text-blue-800 border-blue-200',
            COMPLETED: 'bg-green-100 text-green-800 border-green-200',
            CANCELLED: 'bg-red-100 text-red-800 border-red-200'
        }
        return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200'
    }

    const formatDateTime = (dateString) => {
        if (!dateString) return 'Not set'
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'UTC'
        })
    }

    const formatCurrency = (amount) => {
        if (!amount) return '$0.00'
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    const filteredBookings = bookings.filter(booking => {
        if (statusFilter === 'all') return true
        return booking.status === statusFilter
    })

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600 font-medium">Loading bookings...</p>
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
                            <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
                            <p className="text-sm text-gray-500">Manage confirmed bookings and assignments</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <label className="text-sm font-medium text-gray-700">Status:</label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                                >
                                    <option value="all">All Statuses</option>
                                    <option value="CONFIRMED">Confirmed</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="COMPLETED">Completed</option>
                                    <option value="CANCELLED">Cancelled</option>
                                </select>
                            </div>
                            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">{filteredBookings.length} bookings</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {filteredBookings.length === 0 ? (
                    <div className="text-center py-12">
                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {statusFilter === 'all' ? 'No bookings found' : `No ${statusFilter.toLowerCase()} bookings found`}
                        </h3>
                        <p className="text-gray-500">
                            {statusFilter === 'all' 
                                ? 'There are currently no bookings to manage.' 
                                : 'Try selecting a different status filter.'
                            }
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredBookings.map(booking => {
                            const assignedStaff = getStaffForBooking(booking.id)
                            
                            return (
                                <div
                                    key={booking.id}
                                    className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                                >
                                    {/* Card Header */}
                                    <div className="p-6 border-b border-gray-100">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-3">
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {booking.inquiry?.event_name || `Booking #${booking.id}`}
                                                    </h3>
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                                                        {booking.status.toLowerCase().replace('_', ' ')}
                                                    </span>
                                                </div>
                                                
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                                                    <div className="flex items-center space-x-2">
                                                        <Calendar className="w-4 h-4 text-gray-400" />
                                                        <span>{formatDateTime(booking.booking_date)}</span>
                                                    </div>
                                                    {booking.end_date && (
                                                        <div className="flex items-center space-x-2">
                                                            <Clock className="w-4 h-4 text-gray-400" />
                                                            <span>Ends: {formatDateTime(booking.end_date)}</span>
                                                        </div>
                                                    )}
                                                    {booking.total_estimated_cost && (
                                                        <div className="flex items-center space-x-2">
                                                            <DollarSign className="w-4 h-4 text-gray-400" />
                                                            <span>{formatCurrency(booking.total_estimated_cost)}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {booking.inquiry && (
                                                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                                                        <div className="flex items-center space-x-2">
                                                            <Phone className="w-4 h-4 text-gray-400" />
                                                            <span>{booking.inquiry.phone}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Mail className="w-4 h-4 text-gray-400" />
                                                            <span>{booking.inquiry.email}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Staff Assignment Info */}
                                    <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="flex items-center space-x-2">
                                                    <Users className="w-4 h-4 text-blue-600" />
                                                    <span className="text-blue-800 font-medium">Assigned Staff:</span>
                                                </div>
                                                {assignedStaff.length > 0 ? (
                                                    <span className="text-blue-700">
                                                        {assignedStaff.map(s => getStaffDisplayName(s)).join(', ')}
                                                    </span>
                                                ) : (
                                                    <span className="text-blue-600 italic">No staff assigned</span>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => openStaffModal(booking.id)}
                                                className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
                                            >
                                                Edit Assignments
                                            </button>
                                        </div>
                                    </div>

                                    {/* Notes */}
                                    {booking.notes && (
                                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                                            <div className="flex items-start space-x-2">
                                                <FileText className="w-4 h-4 text-gray-500 mt-0.5" />
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">Notes:</span>
                                                    <p className="text-sm text-gray-600 mt-1">{booking.notes}</p>
                                                </div>
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
                                                        value={booking.status}
                                                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                                                        className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                                                    >
                                                        <option value="CONFIRMED">Confirmed</option>
                                                        <option value="IN_PROGRESS">In Progress</option>
                                                        <option value="COMPLETED">Completed</option>
                                                        <option value="CANCELLED">Cancelled</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={() => openEditModal(booking)}
                                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                                                >
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Edit Details
                                                </button>

                                                <button
                                                    onClick={() => openStaffModal(booking.id)}
                                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                                                >
                                                    <Settings className="w-4 h-4 mr-2" />
                                                    Manage Staff
                                                </button>

                                                <button
                                                    onClick={() => setDeleteConfirm(booking.id)}
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

            {/* Edit Booking Modal */}
            <EditBookingModal
                isOpen={showEditModal !== null}
                onClose={closeEditModal}
                booking={showEditModal}
                onBookingUpdated={handleBookingUpdated}
            />

            {/* Staff Assignment Modal */}
            {showStaffModal && (
                <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center overflow-y-auto z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Manage Staff Assignments</h3>
                            <button
                                onClick={closeStaffModal}
                                disabled={staffAssignmentLoading}
                                className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md disabled:opacity-50"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="p-6">
                            <p className="text-sm text-gray-600 mb-4">
                                Select staff members to assign to this booking:
                            </p>
                            <div className="space-y-3 max-h-60 overflow-y-auto">
                                {staff.map(staffMember => (
                                    <label key={staffMember.id} className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-gray-50">
                                        <input
                                            type="checkbox"
                                            checked={selectedStaff.includes(staffMember.id)}
                                            onChange={() => handleStaffToggle(staffMember.id)}
                                            disabled={staffAssignmentLoading}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                                        />
                                        <span className="text-gray-700 font-medium">
                                            {getStaffDisplayName(staffMember)}
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
                                    disabled={staffAssignmentLoading}
                                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {staffAssignmentLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        'Save Changes'
                                    )}
                                </button>
                                <button
                                    onClick={closeStaffModal}
                                    disabled={staffAssignmentLoading}
                                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                            <div className="flex items-center space-x-3 mb-4">
                                <AlertCircle className="w-6 h-6 text-red-600" />
                                <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete this booking? This action cannot be undone and will also remove all staff assignments.
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
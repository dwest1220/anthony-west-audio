import { useState, useEffect } from 'react'
import { editBooking } from "@/data/booking"
import { X, Calendar, Clock, DollarSign, FileText, Info, AlertCircle } from 'lucide-react'

const EditBookingModal = ({ isOpen, onClose, booking, onBookingUpdated }) => {
    const [formData, setFormData] = useState({
        booking_date: '',
        end_date: '',
        status: 'CONFIRMED',
        total_estimated_cost: '',
        notes: ''
    })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (booking) {
            setFormData({
                booking_date: booking.booking_date ? formatDateTimeForInput(booking.booking_date) : '',
                end_date: booking.end_date ? formatDateTimeForInput(booking.end_date) : '',
                status: booking.status || 'CONFIRMED',
                total_estimated_cost: booking.total_estimated_cost || '',
                notes: booking.notes || ''
            })
            setErrors({})
        }
    }, [booking])

    const formatDateTimeForInput = (dateString) => {
        if (!dateString) return ''
        // Convert to local datetime-local format (YYYY-MM-DDTHH:mm)
        const date = new Date(dateString)
        return date.toISOString().slice(0, 16)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const validateForm = () => {
        const newErrors = {}
        
        if (!formData.booking_date) {
            newErrors.booking_date = 'Booking date is required'
        }
        
        if (formData.end_date && formData.booking_date && 
            new Date(formData.end_date) <= new Date(formData.booking_date)) {
            newErrors.end_date = 'End date must be after start date'
        }
        
        if (formData.total_estimated_cost && formData.total_estimated_cost < 0) {
            newErrors.total_estimated_cost = 'Cost cannot be negative'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async () => {
        if (!validateForm()) {
            return
        }

        setLoading(true)

        try {
            const updatedBooking = {
                ...booking,
                booking_date: formData.booking_date,
                end_date: formData.end_date || null,
                status: formData.status,
                total_estimated_cost: formData.total_estimated_cost || null,
                notes: formData.notes
            }

            await editBooking(updatedBooking)
            onBookingUpdated()
            onClose()
        } catch (err) {
            console.error('Error updating booking:', err)
            setErrors({ submit: 'Error updating booking. Please try again.' })
        } finally {
            setLoading(false)
        }
    }

    const formatDateTime = (dateString) => {
        if (!dateString) return 'Not set'
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 backdrop-blur-md overflow-y-auto z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl mx-auto my-8">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">Edit Booking</h2>
                        <p className="text-sm text-gray-500 mt-1">Update booking details and information</p>
                    </div>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition-colors duration-200"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="overflow-y-auto max-h-[calc(95vh-120px)]">
                    {/* Booking Summary */}
                    {booking && (
                        <div className="p-6 bg-green-50 border-b border-green-100">
                            <div className="flex items-start space-x-3">
                                <Info className="w-5 h-5 text-green-600 mt-0.5" />
                                <div>
                                    <h3 className="font-medium text-green-900 mb-2">Booking Information</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <span className="text-green-700 font-medium">Event:</span>
                                            <p className="text-green-800">{booking.inquiry?.event_name || `Booking #${booking.id}`}</p>
                                        </div>
                                        <div>
                                            <span className="text-green-700 font-medium">Current Status:</span>
                                            <p className="text-green-800">{booking.status}</p>
                                        </div>
                                        <div>
                                            <span className="text-green-700 font-medium">Current Start:</span>
                                            <p className="text-green-800">{formatDateTime(booking.booking_date)}</p>
                                        </div>
                                        {booking.end_date && (
                                            <div>
                                                <span className="text-green-700 font-medium">Current End:</span>
                                                <p className="text-green-800">{formatDateTime(booking.end_date)}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Form Fields */}
                    <div className="p-6 space-y-6">
                        {/* Error Message */}
                        {errors.submit && (
                            <div className="bg-red-50 border border-red-200 rounded-md p-4">
                                <div className="flex items-center space-x-2">
                                    <AlertCircle className="w-5 h-5 text-red-600" />
                                    <span className="text-red-800 text-sm font-medium">{errors.submit}</span>
                                </div>
                            </div>
                        )}

                        {/* Date and Time Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                                    Start Date & Time *
                                </label>
                                <input
                                    type="datetime-local"
                                    name="booking_date"
                                    value={formData.booking_date}
                                    onChange={handleInputChange}
                                    required
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white text-gray-900 ${
                                        errors.booking_date ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                />
                                {errors.booking_date && (
                                    <p className="text-red-600 text-xs mt-1">{errors.booking_date}</p>
                                )}
                            </div>

                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                                    End Date & Time
                                </label>
                                <input
                                    type="datetime-local"
                                    name="end_date"
                                    value={formData.end_date}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white text-gray-900 ${
                                        errors.end_date ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                />
                                {errors.end_date ? (
                                    <p className="text-red-600 text-xs mt-1">{errors.end_date}</p>
                                ) : (
                                    <p className="text-xs text-gray-500 mt-1">Leave empty if single-day event</p>
                                )}
                            </div>
                        </div>

                        {/* Status and Cost Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Booking Status
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white text-gray-900"
                                >
                                    <option value="CONFIRMED">Confirmed</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="COMPLETED">Completed</option>
                                    <option value="CANCELLED">Cancelled</option>
                                </select>
                            </div>

                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                                    Estimated Cost
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2 text-gray-500">$</span>
                                    <input
                                        type="number"
                                        name="total_estimated_cost"
                                        value={formData.total_estimated_cost}
                                        onChange={handleInputChange}
                                        step="0.01"
                                        min="0"
                                        placeholder="0.00"
                                        className={`w-full pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white text-gray-900 ${
                                            errors.total_estimated_cost ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    />
                                </div>
                                {errors.total_estimated_cost && (
                                    <p className="text-red-600 text-xs mt-1">{errors.total_estimated_cost}</p>
                                )}
                            </div>
                        </div>

                        {/* Notes Section */}
                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <FileText className="w-4 h-4 mr-2 text-gray-500" />
                                Additional Notes
                            </label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleInputChange}
                                rows={4}
                                placeholder="Add any special requirements, instructions, or additional details for this booking..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-none bg-white text-gray-900"
                            />
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading || !formData.booking_date}
                        className="px-6 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
                    >
                        {loading && (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        )}
                        <span>{loading ? 'Updating...' : 'Update Booking'}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditBookingModal
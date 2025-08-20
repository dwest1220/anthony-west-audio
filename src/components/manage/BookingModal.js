import { useState } from 'react'
import { createBooking } from "@/data/booking"
import { createBookingStaff } from '@/data/bookingstaff'
import { X, Calendar, Clock, DollarSign, FileText, Users, Info, Phone, Mail } from 'lucide-react'

const BookingModal = ({ isOpen, onClose, inquiry, staff, onBookingCreated }) => {
    const [formData, setFormData] = useState({
        booking_date: '',
        end_date: '',
        status: 'CONFIRMED',
        total_estimated_cost: '',
        notes: '',
        contact_phone: '',
        contact_email: '',
        selectedStaff: []
    })
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleStaffToggle = (staffId) => {
        setFormData(prev => ({
            ...prev,
            selectedStaff: prev.selectedStaff.includes(staffId)
                ? prev.selectedStaff.filter(id => id !== staffId)
                : [...prev.selectedStaff, staffId]
        }))
    }

    const handleSubmit = async () => {
        if (!formData.booking_date) {
            alert('Please select a booking date and time')
            return
        }

        setLoading(true)

        try {
            const bookingData = {
                inquiry_id: inquiry.id, 
                booking_date: formData.booking_date,
                end_date: formData.end_date || null,
                status: formData.status,
                total_estimated_cost: formData.total_estimated_cost || null,
                notes: formData.notes,
                contact_phone: formData.contact_phone,
                contact_email: formData.contact_email
            }

            const newBooking = await createBooking(bookingData)

            for (const staffId of formData.selectedStaff) {
                const staffAssignment = {
                    booking_id: newBooking.id,
                    staff_id: staffId
                }
                await createBookingStaff(staffAssignment)
            }

            onBookingCreated()
            onClose()
            
            setFormData({
                booking_date: '',
                end_date: '',
                status: 'CONFIRMED',
                total_estimated_cost: '',
                notes: '',
                contact_phone: '',
                contact_email: '',
                selectedStaff: []
            })

        } catch (err) {
            console.error('Error creating booking:', err)
            alert('Error creating booking. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 backdrop-blur-md overflow-y-auto z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl mx-auto my-8">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">Create New Booking</h2>
                        <p className="text-sm text-gray-500 mt-1">Convert inquiry to confirmed booking</p>
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
                    {/* Inquiry Summary */}
                    <div className="p-6 bg-blue-50 border-b border-blue-100">
                        <div className="flex items-start space-x-3">
                            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                                <h3 className="font-medium text-blue-900 mb-2">Inquiry Details</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <span className="text-blue-700 font-medium">Event:</span>
                                        <p className="text-blue-800">{inquiry?.event_name}</p>
                                    </div>
                                    <div>
                                        <span className="text-blue-700 font-medium">Original Date:</span>
                                        <p className="text-blue-800">{inquiry?.event_date}</p>
                                    </div>
                                    <div>
                                        <span className="text-blue-700 font-medium">Contact:</span>
                                        <p className="text-blue-800">{inquiry?.email}</p>
                                    </div>
                                    <div>
                                        <span className="text-blue-700 font-medium">Phone:</span>
                                        <p className="text-blue-800">{inquiry?.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="p-6 space-y-6">
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white text-gray-900"
                                />
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white text-gray-900"
                                />
                                <p className="text-xs text-gray-500 mt-1">Leave empty if single-day event</p>
                            </div>
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <Phone className='w-4 h-4 mr-2 text-gray-500' />
                                    Contact Phone Number
                                </label>
                                <input
                                    type='tel'
                                    name='contact_phone'
                                    value={formData.contact_phone}
                                    onChange={handleInputChange}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white text-gray-900'
                                    placeholder='(123) 123-4567'
                                />
                            </div>
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <Mail className='w-4 h-4 mr-2 text-gray-500' />
                                    Contact Email
                                </label>
                                <input
                                    type='email'
                                    name='contact_email'
                                    value={formData.contact_email}
                                    onChange={handleInputChange}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white text-gray-900'
                                    placeholder='your@email.com'
                                />
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
                                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white text-gray-900"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Staff Assignment */}
                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                                <Users className="w-4 h-4 mr-2 text-gray-500" />
                                Assign Staff Members
                            </label>
                            <div className="border border-gray-200 rounded-md max-h-48 overflow-y-auto">
                                {staff.length === 0 ? (
                                    <div className="p-4 text-center text-gray-500">
                                        <Users className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                        <p>No staff members available</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-gray-100">
                                        {staff.map(staffMember => (
                                            <label key={staffMember.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.selectedStaff.includes(staffMember.id)}
                                                    onChange={() => handleStaffToggle(staffMember.id)}
                                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <div className="flex-1">
                                                    <span className="font-medium text-gray-900">
                                                        {staffMember.first_name && staffMember.last_name 
                                                            ? `${staffMember.first_name} ${staffMember.last_name}` 
                                                            : staffMember.full_name || staffMember.user?.username || `Staff ${staffMember.id}`}
                                                    </span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {formData.selectedStaff.length > 0 && (
                                <p className="text-xs text-green-600 mt-2">
                                    {formData.selectedStaff.length} staff member{formData.selectedStaff.length !== 1 ? 's' : ''} selected
                                </p>
                            )}
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
                        className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
                    >
                        {loading && (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        )}
                        <span>{loading ? 'Creating...' : 'Create Booking'}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookingModal
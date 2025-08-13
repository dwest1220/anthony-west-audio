import { useState } from 'react'
import { createBooking } from "@/data/booking"
import { createBookingStaff } from '@/data/bookingstaff'

const BookingModal = ({ isOpen, onClose, inquiry, staff, onBookingCreated }) => {
    const [formData, setFormData] = useState({
        booking_date: '',
        end_date: '',
        status: 'CONFIRMED',
        total_estimated_cost: '',
        notes: '',
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
        setLoading(true)

        try {
            // Create booking data
            const bookingData = {
                inquiry_id: inquiry.id, 
                booking_date: formData.booking_date,
                end_date: formData.end_date || null,
                status: formData.status,
                total_estimated_cost: formData.total_estimated_cost || null,
                notes: formData.notes
            }

            // Call createBooking function
            const newBooking = await createBooking(bookingData)
            console.log('Created booking:', newBooking) // Debug log

            // Assign staff to the booking
            for (const staffId of formData.selectedStaff) {
                const staffAssignment = {
                    booking_id: newBooking.id,  // Changed from 'booking' to 'booking_id'
                    staff_id: staffId
                }
                console.log('Creating staff assignment:', staffAssignment) // Debug log
                await createBookingStaff(staffAssignment)
            }

            onBookingCreated()
            onClose()
            
            // Reset form
            setFormData({
                booking_date: '',
                end_date: '',
                status: 'CONFIRMED',
                total_estimated_cost: '',
                notes: '',
                selectedStaff: []
            })

            alert('Booking created successfully!')
        } catch (err) {
            console.error('Error creating booking:', err)
            alert('Error creating booking. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/20 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    Create Booking for: {inquiry?.event_name}
                </h3>
                
                {/* Inquiry Details */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Inquiry Details</h4>
                    <p className="text-sm text-gray-600">Event: {inquiry?.event_name}</p>
                    <p className="text-sm text-gray-600">Original Date: {inquiry?.event_date}</p>
                    <p className="text-sm text-gray-600">Contact: {inquiry?.email} | {inquiry?.phone}</p>
                </div>

                <div className="space-y-4">
                    {/* Booking Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Booking Date & Time *
                        </label>
                        <input
                            type="datetime-local"
                            name="booking_date"
                            value={formData.booking_date}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                    </div>

                    {/* End Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            End Date & Time (Optional)
                        </label>
                        <input
                            type="datetime-local"
                            name="end_date"
                            value={formData.end_date}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        >
                            <option value="CONFIRMED">Confirmed</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="CANCELLED">Cancelled</option>
                        </select>
                    </div>

                    {/* Estimated Cost */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Total Estimated Cost ($)
                        </label>
                        <input
                            type="number"
                            name="total_estimated_cost"
                            value={formData.total_estimated_cost}
                            onChange={handleInputChange}
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                    </div>

                    {/* Staff Assignment */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Assign Staff Members
                        </label>
                        <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-md p-3">
                            {staff.map(staffMember => (
                                <label key={staffMember.id} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.selectedStaff.includes(staffMember.id)}
                                        onChange={() => handleStaffToggle(staffMember.id)}
                                        className="rounded text-blue-500"
                                    />
                                    <span className="text-gray-700">
                                        {staffMember.first_name && staffMember.last_name 
                                            ? `${staffMember.first_name} ${staffMember.last_name}` 
                                            : staffMember.full_name || staffMember.user?.username || `Staff ${staffMember.id}`}
                                    </span>
                                </label>
                            ))}
                            {staff.length === 0 && (
                                <p className="text-gray-500 text-sm">No staff members available</p>
                            )}
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Notes
                        </label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            rows={3}
                            placeholder="Add any additional notes or details..."
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating...' : 'Create Booking'}
                        </button>
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 disabled:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingModal
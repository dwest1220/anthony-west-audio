import { fetchWithResponse, fetchWithoutResponse } from './fetcher'

export function getAllBookingStaff() {
    return fetchWithResponse('booking-staff', {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}

export function getBookingStaffById(id) {
    return fetchWithResponse(`booking-staff/${id}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}

export function createBookingStaff(bookingStaff) {
    return fetchWithoutResponse(`booking-staff`, {
        method: 'POST',
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingStaff)
    })
}

export function editBookingStaff(bookingStaff) {
    return fetchWithoutResponse(`booking-staff/${bookingStaff.id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingStaff)
    })
}

export function deleteBookingStaff(id) {
    return fetchWithoutResponse(`booking-staff/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}
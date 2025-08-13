import { fetchWithResponse, fetchWithoutResponse } from './fetcher'

export function getAllBookings() {
    return fetchWithResponse('bookings', {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}

export function getBookingById(id) {
    return fetchWithResponse(`bookings/${id}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}

export function createBooking(booking) {
    return fetchWithoutResponse(`bookings`, {
        method: 'POST',
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
    })
}

export function editBooking(booking) {
    return fetchWithoutResponse(`bookings/${booking.id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
    })
}

export function deleteBooking(id) {
    return fetchWithoutResponse(`bookings/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}
import { fetchWithResponse, fetchWithoutResponse } from './fetcher'

export function getAllInquiries() {
    return fetchWithResponse('inquiries', {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}

export function getInquiriesById(id) {
    return fetchWithResponse(`inquiries?userId=${id}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}

export function createInquiry(inquiry) {
    return fetchWithoutResponse(`inquiries`, {
        method: 'POST',
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inquiry)
    })
}

export function editInquiry(inquiry) {
    return fetchWithoutResponse(`inquiries/${inquiry.id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inquiry)
    })
}

export function deleteInquiry() {
    return fetchWithoutResponse('inquiries', {
        method: 'DELETE',
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}

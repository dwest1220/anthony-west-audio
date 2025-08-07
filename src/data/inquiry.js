import { fetchWithResponse, fetchWithoutResponse } from './fetcher'

export function getAllInquiries() {
    return fetchWithResponse('inquiry', {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}

export function getInquiryById(id) {
    return fetchWithResponse(`inquiry/${id}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}

export function createInquiry(inquiry) {
    return fetchWithoutResponse(`inquiry`, {
        method: 'POST',
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inquiry)
    })
}

export function editInquiry(inquiry) {
    return fetchWithoutResponse(`inquiry/${inquiry.id}` {
        method: 'PUT',
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(store)
    })
}

export function deleteInquiry() {
    return fetchWithoutResponse('inquiry', {
        method: 'DELETE',
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}

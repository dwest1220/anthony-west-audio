import { fetchWithResponse, fetchWithoutResponse } from './fetcher'

export function getAllStaff() {
    return fetchWithResponse('staff', {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}

export function getStaffById(id) {
    return fetchWithResponse(`staff/${id}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}

export function createStaff(staff) {
    return fetchWithoutResponse(`staff`, {
        method: 'POST',
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(staff)
    })
}

export function editStaff(staff) {
    return fetchWithoutResponse(`staff/${staff.id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(staff)
    })
}

export function deleteStaff(id) {
    return fetchWithoutResponse(`staff/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}
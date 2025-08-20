import { fetchWithResponse, fetchWithoutResponse } from './fetcher'

export function getAllServices() {
    return fetchWithResponse('services', {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}
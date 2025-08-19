'use client'
import { useState } from 'react'
import { ManageView } from '@/components/manage/ManageView'
import { BookingManageView } from '@/components/manage/BookingManageView'

const AdminManagement = () => {
    const [activeTab, setActiveTab] = useState('inquiries')

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Tab Navigation */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex space-x-8" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab('inquiries')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'inquiries'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Inquiries
                        </button>
                        <button
                            onClick={() => setActiveTab('bookings')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'bookings'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Bookings
                        </button>
                    </nav>
                </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'inquiries' && <ManageView />}
            {activeTab === 'bookings' && <BookingManageView />}
        </div>
    )
}

export default AdminManagement
import Link from "next/link"

export const InquiryButton = ({onInquiryClick}) => {
    return (
        <Link href="/inquiry" passHref>
          <button
            onClick={onInquiryClick}
            className="group bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 text-lg"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>Work With Us</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
          </Link>
    )
}
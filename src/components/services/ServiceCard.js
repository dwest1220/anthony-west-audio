"use client"

export default function ServiceCard({ service }) {
  if (!service) {
    return (
      <p className="text-center mt-10 text-red-500">
        Service not found.
      </p>
    )
  }

  return (
    <div className="flex justify-center p-6">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{service.name}</h1>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          {service.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-800">
            Price:
          </span>
          <span className="text-2xl font-bold text-blue-600">
            ${service.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}

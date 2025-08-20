"use client"

import { useEffect, useState } from "react"
import { getAllServices } from "@/data/service"
import Image from "next/image"
import Link from "next/link"
import { 
  ArrowRight, 
  Mic, 
  SlidersHorizontal, 
  Headphones, 
  Video, 
  PenTool, 
  MessageCircle,
  Star,
  Users,
  Clock
} from "lucide-react"

export default function ServicesPage() {
  const [services, setServices] = useState([])

  useEffect(() => {
    getAllServices().then((data) => {
      setServices(data)
    })
  }, [])

  const iconMap = {
    mic: Mic,
    sliders: SlidersHorizontal,
    headphones: Headphones,
    video: Video,
    pen: PenTool,
    message: MessageCircle,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-screen overflow-hidden">
        <Image
          src="/images/AnthonySoundboardClose.jpg" 
          alt="Anthony at the soundboard"
          fill
          className="object-cover"
          priority
        />
        
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-current stroke-current text-yellow-400" />
                <span className="text-lg">Expert Level</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 stroke-current" />
                <span className="text-lg">Proven Results</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 stroke-current" />
                <span className="text-lg">Reliable Delivery</span>
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              Professional Audio
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Services
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-200 mb-12 leading-relaxed max-w-3xl mx-auto">
              From live audio engineering to full production management—discover world-class solutions 
              backed by over two decades of industry experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/inquiry"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a 
                href="#services"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('services')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  })
                }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Each service is crafted with precision and backed by years of experience 
              in high-stakes live events and productions.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {services.length > 0 ? (
              services.map((service) => {
                const Icon = iconMap[service.icon] || Mic
                
                return (
                  <Link 
                    key={service.id}
                    href={`/services/${service.slug || service.id}`}
                    className="group"
                  >
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2 h-full relative overflow-hidden">
                      {/* Subtle gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative z-10">
                        {/* Icon */}
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
                          <Icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                        </div>

                        {/* Service Title - Now Clickable */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                          {service.name || service.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed mb-6">
                          {service.description}
                        </p>
                        
                        {/* Key Details Preview */}
                        {service.details && (
                          <div className="space-y-2 mb-6">
                            {service.details.split("\n").slice(0, 2).map((detail, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-600 text-sm">{detail.trim()}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Call to Action */}
                        <div className="flex items-center text-blue-600 font-semibold group-hover:text-indigo-600 transition-colors duration-300">
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })
            ) : (
              <div className="col-span-full flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg">Loading services...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">20+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-gray-300">Shows Engineered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">100%</div>
              <div className="text-gray-300">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Elevate Your Event?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
            Let's discuss how our professional audio services can make your next 
            project or event an unforgettable success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/inquiry"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Project Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/contact"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
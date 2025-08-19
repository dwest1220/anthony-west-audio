"use client"

import Image from "next/image"
import Link from "next/link"
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  MessageSquare,
  Clock,
  MapPin,
  Star,
  Users
} from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Split Layout */}
      <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Content */}
              <div className="text-white">
                <div className="flex items-center gap-8 mb-8 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-current stroke-current text-yellow-400" />
                    <span className="text-lg">Available 24/7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 stroke-current" />
                    <span className="text-lg">Quick Response</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 stroke-current" />
                    <span className="text-lg">Fast Quotes</span>
                  </div>
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                  Let's Work
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                    Together
                  </span>
                </h1>
                
                <p className="text-xl text-blue-100 mb-12 leading-relaxed">
                  Ready to bring your vision to life? Get in touch and let's discuss 
                  how we can make your next project extraordinary. Professional audio 
                  engineering with over two decades of experience.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/inquiry"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Start Project Inquiry
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <a 
                    href="#contact-info"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById('contact-info')?.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      })
                    }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Contact Info
                  </a>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="relative">
                <div className="relative w-full h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/AnthonySoundboard.jpg" 
                    alt="Anthony at the soundboard"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Subtle overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
                
                {/* Floating Contact Cards */}
                <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 max-w-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Email Response</p>
                      <p className="text-gray-600 text-sm">Within 24 hours</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-8 -right-8 bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 max-w-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Call Response</p>
                      <p className="text-gray-600 text-sm">Same day return</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div id="contact-info" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Whether you need a quote, have questions, or want to discuss your project, 
              I'm here to help make your audio vision a reality.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Methods */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Methods</h3>
              {/* Project Inquiry */}
              <div className="group">
                <Link 
                  href="/inquiry"
                  className="flex items-center gap-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl hover:from-blue-100 hover:to-indigo-100 hover:shadow-lg transition-all duration-300 border border-blue-200"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 mb-1">Project Inquiry</h4>
                    <p className="text-blue-600 font-medium">Complete project form</p>
                    <p className="text-gray-600 text-sm">Detailed quotes & project planning</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
              
              {/* Email */}
              <div className="group">
                <a 
                  href="mailto:anthony@anthonywestaudio.com"
                  className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl hover:bg-blue-50 hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-200"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
                    <Mail className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-blue-600 font-medium text-lg group-hover:text-indigo-600 transition-colors duration-300">
                      anthony@anthonywestaudio.com
                    </p>
                    <p className="text-gray-600 text-sm">Best for detailed project discussions</p>
                  </div>
                </a>
              </div>

              {/* Phone */}
              <div className="group">
                <a 
                  href="tel:704-657-9070"
                  className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl hover:bg-blue-50 hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-200"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
                    <Phone className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-1">Phone</h4>
                    <p className="text-blue-600 font-medium text-lg group-hover:text-indigo-600 transition-colors duration-300">
                      (704) 657-9070
                    </p>
                    <p className="text-gray-600 text-sm">Quick questions & urgent requests</p>
                  </div>
                </a>
              </div>

            </div>

            {/* Response Times & Info */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What to Expect</h3>
              
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Quick Response</h4>
                      <p className="text-gray-600">Email responses within 24 hours, phone calls returned same day</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Detailed Consultation</h4>
                      <p className="text-gray-600">Thorough discussion of your needs, timeline, and budget</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Custom Solutions</h4>
                      <p className="text-gray-600">Tailored recommendations based on your specific requirements</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Transparent Pricing</h4>
                      <p className="text-gray-600">Clear, detailed quotes with no hidden fees or surprises</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
                <div className="flex items-center gap-4 mb-4">
                  <MapPin className="w-6 h-6 text-blue-600" strokeWidth={2} />
                  <h4 className="text-xl font-semibold text-gray-900">Service Area</h4>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Based in Nashville, TN, serving the nationwide and available 
                  for global touring productions. Remote consultation available worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
            Don't wait—let's discuss your vision and create something amazing together. 
            Professional audio engineering is just one conversation away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/inquiry"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Project Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="mailto:anthony@anthonywestaudio.com"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              Send Email
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
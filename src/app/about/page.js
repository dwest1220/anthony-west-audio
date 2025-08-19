"use client"

import { 
  Star,
  Users,
  Clock,
  Award,
  MapPin,
  Calendar,
  Music,
  Headphones,
  Mic,
  Video,
  ArrowRight
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  const stats = [
    { label: "Years of Experience", value: "24+", icon: Calendar },
    { label: "Major Tours & Events", value: "100+", icon: Music },
    { label: "Churches Served", value: "20+", icon: Users },
    { label: "AV Integrations", value: "50+", icon: Award },
  ]

  const expertise = [
    {
      title: "Live Audio Engineering",
      description: "FOH and Monitor engineering for major artists like CeCe Winans and Charity Gayle",
      icon: Mic,
    },
    {
      title: "Production Management", 
      description: "Tour management for Winter Jam, Stellar Awards, NASCAR Championship, and more",
      icon: Headphones,
    },
    {
      title: "Church AV Integration",
      description: "13+ years designing and implementing worship facility upgrades and multisite systems",
      icon: Video,
    }
  ]

  const milestones = [
    {
      year: "1999",
      title: "Music Industry Start",
      description: "Front of House Engineer and Production Manager for CCM Artist Solomon's Wish"
    },
    {
      year: "2001",
      title: "Nashville Audio Scene",
      description: "Audio System Technician at Spectrum Sound and Creative Audio & Lights"
    },
    {
      year: "2004",
      title: "Church Media Leadership",
      description: "Media Director at Montgomery Community Church, beginning 13 years in church production"
    },
    {
      year: "2018",
      title: "Blackhawk Audio Inc.",
      description: "System Tech, FOH/Monitor Engineer, and Integrations Manager for major events"
    },
    {
      year: "2024",
      title: "Current Leadership Roles",
      description: "Monitor Engineer for CeCe Winans and FOH Engineer for Charity Gayle"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Meet Anthony West
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
                From Nashville's music scene to Grammy-winning tours—24 years of audio excellence
              </p>
              <div className="flex items-center gap-8 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Nashville, Tennessee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-current" />
                  <span>NC State Graduate</span>
                </div>
              </div>
              <Link 
                href="/inquiry"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Profile Image */}
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-3xl transform rotate-3"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-purple-600/10 to-pink-600/10 rounded-3xl transform -rotate-2"></div>
                
                {/* Main image container */}
                <div className="relative bg-white p-2 rounded-3xl shadow-2xl">
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-200">
                    {/* Anthony's Profile Image */}
                    <Image
                      src="/images/AnthonyTinyDesk.jpg"
                      alt="Anthony West - Audio Engineer at work"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
            The Story Behind the Sound
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                With over two decades spanning live touring, church production, and AV integration, 
                Anthony West brings a unique blend of technical expertise and creative vision to every project. 
                His career began in Nashville's competitive audio scene and has evolved into leadership roles 
                with Grammy-winning artists and major industry events.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Currently serving as Monitor Engineer for CeCe Winans and Front of House Engineer for 
                Charity Gayle, Anthony has worked on prestigious events including Winter Jam Tour, 
                NASCAR Championship Awards, Black Music Honors, and Stellar Awards. His expertise with 
                industry-leading systems—from Meyer Sound and EAW speaker systems to DiGiCo and Yamaha consoles—
                ensures pristine audio quality in any environment.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Anthony's 13-year tenure as Media and Creative Director across multiple churches provided 
                invaluable experience in multisite expansion, volunteer team management, and worship production. 
                At Blackhawk Audio Inc., he expanded into system integration and project management, helping 
                churches and venues optimize their AV capabilities for maximum impact.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, Anthony West Productions combines this diverse experience into comprehensive services 
                that bridge the gap between technical excellence and creative vision. Whether managing 
                complex touring requirements or designing worship environments, Anthony's approach prioritizes 
                both artistic integrity and flawless execution.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Expertise Areas */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
            Areas of Expertise
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {expertise.map((area, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <area.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {area.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline/Milestones */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
            Career Milestones
          </h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200 hidden lg:block"></div>
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-start gap-6 lg:gap-8">
                  {/* Timeline dot */}
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 relative z-10">
                    <span className="text-white font-bold text-sm">
                      {milestone.year}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="bg-white rounded-xl p-6 shadow-lg flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Whether you need live audio engineering, production management, or technical consulting, 
            let's discuss how we can make your next project exceptional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link 
              href="/inquiry"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Start a Project
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/services"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              View Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
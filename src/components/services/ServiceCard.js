"use client"

import { 
  Mic, 
  SlidersHorizontal, 
  Headphones, 
  Video, 
  PenTool, 
  MessageCircle,
  Check,
  ArrowRight,
  Star,
  Users,
  Clock,
} from "lucide-react"
import Link from "next/link"

export default function ServiceCard({ service, variant = "full" }) {
  if (!service) {
    return (
      <p className="text-center mt-10 text-red-500">
        Service not found.
      </p>
    )
  }

  // Convert newline string to array
  const detailsArray = service.details
    ? service.details.split("\n").map(d => d.trim()).filter(Boolean)
    : []

  // Icon map
  const iconMap = {
    mic: Mic,
    sliders: SlidersHorizontal,
    headphones: Headphones,
    video: Video,
    pen: PenTool,
    message: MessageCircle,
  }
  const Icon = iconMap[service.icon] || Mic

  // 🔹 Temporary placeholders (until DB provides real data)
  const approach = "With over two decades of live sound experience, I bring a meticulous approach to every show. My focus is on creating pristine audio experiences that serve both the artist's vision and audience expectations, while maintaining the technical precision that high-stakes events demand."

  const keyPoints = [
    "System optimization for venue acoustics",
    "Seamless artist-engineer communication", 
    "Proactive problem-solving approach",
    "Detailed show documentation"
  ]

  const projects = [
    {
      name: "CeCe Winans World Tour ",
      description: "Touring production with complex monitor requirements",
      role: "Monitor Engineer"
    },
    {
      name: "Stand Up To Cancer - Jelly Roll, Jonas Brothers, Cece Winans, Dan + Shay, and More", 
      description: "Live broadcast event with critical audio timing",
      role: "Monitor Engineer"
    }
  ]

  const equipment = {
    "Digital Consoles": ["DiGiCo SD12/SD10", "Yamaha Rivage PM10", "Allen & Heath dLive", "Avid S6L"],
    "Systems": ["Meyer Sound LEO Family", "EAW Anya", "Dante Audio Networks", "Shure Axient Digital"],
    "Software": ["Shure Wireless Workbench", "Meyer Sound Compass", "Dante Controller"]
  }

  // 🔹 Use placeholders if DB fields are missing
  const finalApproach = service.approach || approach
  const finalKeyPoints = service.keyPoints || keyPoints
  const finalProjects = service.projects || projects
  const finalEquipment = service.equipment || equipment

  // Compact version
  if (variant === "compact") {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer hover:-translate-y-1">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        </div>
        
        {detailsArray.slice(0, 2).map((detail, idx) => (
          <div key={idx} className="flex items-start gap-2 mb-2">
            <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 text-sm">{detail}</span>
          </div>
        ))}
        
        {detailsArray.length > 2 && (
          <p className="text-blue-500 text-sm font-medium mt-3">
            +{detailsArray.length - 2} more capabilities...
          </p>
        )}
      </div>
    )
  }

  // Full detailed version
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
              <Icon className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{service.name}</h1>
              <p className="text-xl text-blue-100 leading-relaxed max-w-3xl">
                {service.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-current" />
              <span>Expert Level</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Proven Results</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Reliable Delivery</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Core Services */}
        {detailsArray.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Included</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {detailsArray.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <Check className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{detail}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Approach/Methodology */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">My Approach</h2>
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              {finalApproach}
            </p>
            {finalKeyPoints && (
              <div className="grid md:grid-cols-2 gap-4">
                {finalKeyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">{point}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Recent Projects */}
        {finalProjects?.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {finalProjects.map((project, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                  <p className="text-gray-600 mb-3">{project.description}</p>
                  {project.role && (
                    <p className="text-blue-600 font-medium text-sm">Role: {project.role}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Equipment/Tools */}
        {finalEquipment && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Equipment & Tools</h2>
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(finalEquipment).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="font-bold text-gray-900 mb-4 text-lg capitalize">{category}</h3>
                    <ul className="space-y-2">
                      {items.map((item, idx) => (
                        <li key={idx} className="text-gray-600 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="text-center bg-white rounded-xl p-8 shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss how I can support your next project with world-class {service.name.toLowerCase()} services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link 
              href="/inquiry" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Get Project Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/inquiry" 
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Schedule Call
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

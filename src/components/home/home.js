'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  Star,
  Users,
  Award,
  Mic,
  Volume2,
  Music
} from "lucide-react";

const HomeView = ({ onInquiryClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
 
  const slides = [
    {
      image: "/images/AnthonyTinyDesk.jpg",
      title: "Live Audio Engineering",
      subtitle: "Grammy Award winning artists and world-class venues"
    },
    {
      image: "/images/AnthonySoundboardClose.jpg",
      title: "Production Management", 
      subtitle: "Large-scale events and touring productions"
    },
    {
      image: "/images/AnthonySoundboard.jpg", 
      title: "Technical Consulting",
      subtitle: "System design and optimization expertise"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Image Slider Background */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
        ))}
      </div>

      {/* Slider Navigation */}
      <div className="absolute top-1/2 left-6 transform -translate-y-1/2 z-20">
        <button
          onClick={prevSlide}
          className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      
      <div className="absolute top-1/2 right-6 transform -translate-y-1/2 z-20">
        <button
          onClick={nextSlide}
          className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto text-white">
        {/* Badge/Credentials */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium">20+ Years Experience</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">Grammy Award Artists</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">World-Class Events</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          Anthony West
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-4xl md:text-6xl lg:text-7xl mt-2">
            Audio
          </span>
        </h1>

        {/* Dynamic Subtitle based on current slide */}
        <div className="mb-8 min-h-[120px] flex items-center justify-center">
          <div className="max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-blue-200">
              {slides[currentSlide].title}
            </h2>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              {slides[currentSlide].subtitle} — Professional live audio engineering, 
              production management, and technical consulting with decades of experience.
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
              <Volume2 className="w-8 h-8" />
            </div>
            <div className="text-3xl font-bold mb-2">500+</div>
            <div className="text-gray-300">Live Shows</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
              <Music className="w-8 h-8" />
            </div>
            <div className="text-3xl font-bold mb-2">50+</div>
            <div className="text-gray-300">Major Artists</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
              <Award className="w-8 h-8" />
            </div>
            <div className="text-3xl font-bold mb-2">20+</div>
            <div className="text-gray-300">Years Pro</div>
          </div>
        </div>
      </div>

      {/* Floating Elements for Visual Interest */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
    </section>

    {/* Services Overview Section */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What I Do Best
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From intimate venues to stadium productions, I deliver world-class audio engineering 
            with the precision and reliability that artists and venues demand.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="group bg-gray-50 rounded-2xl p-8 hover:bg-blue-50 hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
              <Mic className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" strokeWidth={2} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
              Live Audio Engineering
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Monitor engineering for Grammy Award-winning artists, major touring productions, 
              and high-profile broadcast events. Expertise with digital consoles and in-ear systems.
            </p>
            <div className="text-blue-600 font-medium text-sm">
              Featured Artists: CeCe Winans, Charity Gayle
            </div>
          </div>

          <div className="group bg-gray-50 rounded-2xl p-8 hover:bg-blue-50 hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
              <Users className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" strokeWidth={2} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
              Production Management
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Complete production oversight for tours, festivals, and corporate events. 
              Coordinating technical teams, managing schedules, and ensuring flawless execution.
            </p>
            <div className="text-blue-600 font-medium text-sm">
              Specializing in: Tours, Festivals, Corporate Events
            </div>
          </div>

          <div className="group bg-gray-50 rounded-2xl p-8 hover:bg-blue-50 hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
              <Volume2 className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" strokeWidth={2} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
              Technical Consulting
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              System design, equipment procurement, and venue optimization. 
              Strategic guidance for audio infrastructure and workflow improvements.
            </p>
            <div className="text-blue-600 font-medium text-sm">
              Systems: DiGiCo, Yamaha, Meyer Sound, Shure Axient
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/services"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View All Services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>

    {/* Experience/Testimonial Section */}
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              Two Decades of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Excellence
              </span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              From small club gigs to arena tours, from studio sessions to live broadcasts, 
              I've built a reputation for delivering exceptional audio experiences under any conditions. 
              My commitment to technical precision and artist satisfaction has made me a trusted partner 
              for industry professionals worldwide.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-300">Monitor engineer for Grammy Award-winning artists</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-300">Technical expertise across all major console platforms</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-300">Proven track record with high-pressure live events</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Quote/Testimonial Card */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <blockquote className="text-lg text-gray-200 leading-relaxed mb-6">
                "Anthony's technical expertise and professional approach made our tour seamless. 
                His attention to detail and ability to handle complex monitor mixes under pressure 
                is exactly what we need for our productions."
              </blockquote>
              <div className="text-blue-400 font-medium">— Industry Professional</div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
                <div className="text-gray-400">Show Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
                <div className="text-gray-400">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Call-to-Action Section */}
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Elevate Your Sound?
        </h2>
        <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
          Whether you're planning a tour, producing an event, or need technical consulting, 
          let's discuss how my expertise can bring your vision to life.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/inquiry"
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={onInquiryClick}
          >
            Start Your Project
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/contact"
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 inline-flex items-center justify-center gap-2"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </section>
    </div>
  );
};

export default HomeView;
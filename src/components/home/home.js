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
  
  // Image slider data - replace with your actual images
  const slides = [
    {
      image: "/images/AnthonyTinyDesk.jpg",
      title: "Live Audio Engineering",
      subtitle: "Grammy Award winning artists and world-class venues"
    },
    {
      image: "/images/AnthonySoundboard.jpg", // Replace with different images
      title: "Production Management", 
      subtitle: "Large-scale events and touring productions"
    },
    {
      image: "/images/AnthonySoundboardClose.jpg", // Replace with different images
      title: "Technical Consulting",
      subtitle: "System design and optimization expertise"
    }
  ];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

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

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <Link href="/inquiry" passHref>
            <button
              onClick={onInquiryClick}
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </Link>
          
          <Link href="/services" passHref>
            <button className="group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg">
              <span className="flex items-center justify-center space-x-2">
                <Mic className="w-5 h-5" />
                <span>View Services</span>
              </span>
            </button>
          </Link>
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
  );
};

export default HomeView;
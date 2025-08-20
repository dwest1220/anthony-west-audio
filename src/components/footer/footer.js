const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="text-2xl font-bold mb-4">Anthony West Audio LLC</div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-lg">
              Professional live audio engineering, production management, and technical consulting 
              with over two decades of experience serving Grammy winning artists, venues, and major events.
            </p>
            <div className="flex space-x-4">
              {/* Social media links can be added here */}
              <div className="text-gray-400">
                <p className="font-medium">Call for immediate consultation:</p>
                <a href="tel:7046579070" className="text-blue-400 hover:text-blue-300 text-lg font-semibold">
                  (704) 657-9070
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-lg">Services</h3>
            <div className="space-y-2 text-gray-400">
              <p>Live Audio Engineering</p>
              <p>Production Management</p>
              <p>Venue AV Integration</p>
              <p>Media & Creative Direction</p>
              <p>Technical Consulting</p>
              <p>Live Streaming Solutions</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-lg">Specialties</h3>
            <div className="space-y-2 text-gray-400">
              <p>Artists & Tours</p>
              <p>Venue Productions</p>
              <p>Large-Scale Events</p>
              <p>System Design & Integration</p>
              <p>Team Training & Development</p>
              <p>Remote Consulting</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; 2025 Anthony West Audio LLC. All rights reserved.
            </p>
            <div className="flex space-x-6 text-gray-400">
              <p>Based in Nashville, TN</p>
              <span>•</span>
              <p>Serving nationwide</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
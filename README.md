# Anthony West Audio

A modern, full-stack web application built for Anthony West Audio - a professional audio engineering and production company. This React/Next.js frontend provides a comprehensive platform for showcasing services, managing client inquiries, and streamlining business operations.

## 📋 Project Overview

**NSS Full-Stack Capstone Project** - This application was developed as my final project for Nashville Software School's Full-Stack Engineering program, demonstrating proficiency in modern web development technologies and real-world application deployment.

Anthony West Audio specializes in:
- Audio Engineering
- Tour Production
- Venue AV Installations
- Media and Creative Direction
- Creative and Post-Production
- Technical Consulting and Training

The platform serves both public users seeking audio services and administrative users managing business operations.

## 🚀 Features

### Public Features
- **Service Portfolio**: Comprehensive showcase of audio engineering services and capabilities
- **Project Gallery**: Visual portfolio of completed work and installations
- **Contact System**: Multi-step inquiry forms for different service types
- **Responsive Design**: Optimized experience across all devices
- **Call-to-Action Integration**: Strategic placement to drive client engagement

### Administrative Features
- **Inquiry Management**: Sort, filter, and manage client inquiries
- **Booking System**: Convert inquiries into scheduled projects
- **Staff Scheduling**: Coordinate team availability and assignments
- **Cost Estimation Tools**: Generate project quotes and estimates
- **Dashboard Analytics**: Overview of business metrics and activity

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Library**: React
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI, Lucide React, Heroicons
- **Development**: JavaScript/JSX

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/anthony-west-audio.git
   cd anthony-west-audio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔗 Backend Integration

This frontend connects to the Anthony West Audio API backend. Make sure to have the backend running for full functionality.

**Backend Repository**: [AnthonyWestAudio-api](https://github.com/dwest1220/AnthonyWestAudio-api)

## 📱 Application Structure

```
anthony-west-audio/
├── src/
│   └── app/                    # Next.js App Router pages
│       ├── page.js            # Home page
│       ├── about/             # About page
│       ├── services/          # Services showcase
│       ├── contact/           # Contact forms
│       ├── inquiry/           # Client inquiry system
│       ├── login/             # Authentication
│       ├── register/          # User registration
│       ├── profile/           # User profiles
│       └── manage/            # Administrative dashboard
├── components/                # Reusable React components
├── data/                      # Utility functions and API calls
├── public/                   # Static assets (images, icons)
├── jsconfig.json            # JavaScript configuration
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json             # Dependencies and scripts
```

## 🎨 Key Components

- **ServiceCard**: Displays individual service offerings
- **InputForm**: Multi-step inquiry submission
- **ManageView**: Business management interface
- **BookingManage**: Scheduling interface


### Build for Production

```bash
npm run build
npm start
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- ESLint configuration for code quality
- Prettier for code formatting
- Tailwind CSS for consistent styling

## 🌟 Project Goals

This project represents the modernization of a real-world business, moving from an outdated web presence to a comprehensive business management platform. The goal is to:

1. **Streamline Client Acquisition**: Professional presentation of services and easy inquiry submission
2. **Improve Operational Efficiency**: Administrative tools for managing bookings and client relationships
3. **Support Business Growth**: Scalable platform that can evolve with business needs
4. **Demonstrate Technical Skills**: Showcase modern full-stack development capabilities

## 🤝 Future Enhancements

- Real-time notifications
- Advanced analytics dashboard
- Enhanced Client portal for project tracking

## 👨‍💻 Developer

Built by David West as a final capstone project for Nashville Software School's Full-Stack Engineering program.

**LinkedIn**: https://www.linkedin.com/in/david-west-a205a8274/
**GitHub**: https://github.com/dwest1220

---

*This project demonstrates proficiency in React, Next.js, modern JavaScript, responsive design, API integration, and full-stack application architecture.*
'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {
  ChevronDownIcon,
  PhoneIcon,
  EnvelopeIcon,
  CogIcon
} from '@heroicons/react/20/solid'
import {
  SpeakerWaveIcon,
  Cog6ToothIcon,
  BuildingOfficeIcon,
  VideoCameraIcon,
  WrenchScrewdriverIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '@/context/AuthContext'

const services = [
  { name: 'Live Audio Engineering', description: 'FOH & Monitor Engineering for concerts, tours, and events.', href: '/services/live-audio', icon: SpeakerWaveIcon },
  { name: 'Production Management', description: 'Tour & event management, logistics, and team coordination.', href: '/services/production-management', icon: Cog6ToothIcon },
  { name: 'Church AV Integration', description: 'Design & install audio, video, and lighting systems.', href: '/services/church-av', icon: BuildingOfficeIcon },
  { name: 'Media & Creative Direction', description: 'Service production, video, graphic design, and set design.', href: '/services/media', icon: VideoCameraIcon },
  { name: 'Creative & Post-Production', description: 'Video editing, audio post, and worship media.', href: '/services/post-production', icon: WrenchScrewdriverIcon },
  { name: 'Technical Consulting & Training', description: 'System evaluations, workflow optimization, team training.', href: '/services/consulting', icon: LightBulbIcon },
]

const callsToAction = [
  { name: 'Email', href: 'mailto:anthony@example.com', icon: EnvelopeIcon },
  { name: 'Call Now', href: 'tel:17046579070', icon: PhoneIcon },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isAdmin, loading, user, isAuthenticated } = useAuth()
  
  return (
    <header className="bg-gray-900">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <span className="sr-only">Anthony West Audio</span>
            <img
              alt=""
              src="/logo.png"
              className="h-8 w-auto"
            />
            <span className="text-white font-bold text-lg">Anthony West Audio</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-white">
              Services
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-500" />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute left-1/2 z-50 mt-3 w-screen max-w-md -translate-x-1/2 overflow-hidden rounded-3xl bg-gray-800 outline-1 -outline-offset-1 outline-white/10"
            >
              <div className="p-4">
                {services.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-white/5"
                  >
                    <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-700/50 group-hover:bg-gray-700">
                      <item.icon aria-hidden="true" className="size-6 text-gray-400 group-hover:text-white" />
                    </div>
                    <div className="flex-auto">
                      <Link href={item.href} className="block font-semibold text-white">
                        {item.name}
                        <span className="absolute inset-0" />
                      </Link>
                      <p className="mt-1 text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-white/10 bg-gray-700/50">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-white hover:bg-gray-700/50"
                  >
                    <item.icon aria-hidden="true" className="size-5 flex-none text-gray-500" />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <Link href="/about" className="text-sm/6 font-semibold text-white">
            Experience
          </Link>
          <Link href="/inquiry" className="text-sm/6 font-semibold text-white">
            Contact Us
          </Link>
          <Link href="/profile" className="text-sm/6 font-semibold text-white">
            Profile
          </Link>
          
          {/* Admin-only Manage tab */}
          {!loading && isAdmin && (
            <Link 
              href="/admin/dashboard" 
              className="text-sm/6 font-semibold text-white flex items-center gap-1 hover:text-gray-300 transition-colors"
            >
              <CogIcon className="size-4" />
              Manage
            </Link>
          )}
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="tel:17046579070" className="text-sm/6 font-semibold text-white">
            (704) 657-9070 <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <img
                alt=""
                src="/logo.png"
                className="h-8 w-auto"
              />
              <span className="text-white font-bold">Anthony West Productions</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-white/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-white hover:bg-white/5">
                    Services
                    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...services, ...callsToAction].map((item) =>
                      item.href.startsWith('/') ? (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-white hover:bg-white/5"
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-white hover:bg-white/5"
                        >
                          {item.name}
                        </a>
                      )
                    )}
                  </DisclosurePanel>
                </Disclosure>
                <Link
                  href="/experience"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                >
                  Experience
                </Link>
                <Link
                  href="/gear"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                >
                  Contact Us
                </Link>
                <Link
                  href="/contact"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                >
                  Profile
                </Link>
                
                {/* Admin-only Manage tab in mobile menu */}
                {!loading && isAdmin && (
                  <Link
                    href="/admin/dashboard"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5 flex items-center gap-2"
                  >
                    <CogIcon className="size-5" />
                    Manage
                  </Link>
                )}
              </div>
              <div className="py-6">
                <a
                  href="tel:17046579070"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5"
                >
                  (704) 657-9070
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
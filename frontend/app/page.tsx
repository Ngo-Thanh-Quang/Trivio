
"use client"
import Link from "next/link";
import React, { useState } from "react";

const PlaneIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M10.5 7.5 3 3l3.5 7L3 17l7.5-4.5L21 21l-4.5-10.5L21 6 10.5 7.5Z" />
  </svg>
);
const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3zm8 8l.8 1.8L23 14l-2.2.9L20 17l-.8-2.1L17 14l2.2-1.2L20 11zM3 13l.8 1.8L6 16l-2.2.9L3 19l-.8-2.1L0 16l2.2-1.2L3 13z" />
  </svg>
);

// Reusable section wrapper
const Section: React.FC<{ id?: string; title: string; caption?: string; children: React.ReactNode }>= ({ id, title, caption, children }) => (
  <section id={id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <header className="mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
      {caption && <p className="text-muted-foreground text-gray-600 mt-2">{caption}</p>}
    </header>
    {children}
  </section>
);

// Card for destinations / itineraries
const Card: React.FC<{ title: string; subtitle?: string; img?: string; href?: string }>= ({ title, subtitle, img, href }) => (
  <a href={href || "#"} className="group rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-400">
    <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden rounded-xl">
      {img ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      ) : (
        <div className="w-full h-full grid place-items-center text-gray-400">Image</div>
      )}
    </div>
    <div className="p-2">
      <h4 className="font-semibold text-lg">{title}</h4>
      {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
    </div>
  </a>
);

// Simple testimonial bubble
const Testimonial: React.FC<{ quote: string; author: string; role?: string }>= ({ quote, author, role }) => (
  <figure className="rounded-2xl border bg-white p-6 shadow-sm">
    <blockquote className="text-gray-800 leading-relaxed">“{quote}”</blockquote>
    <figcaption className="mt-4 text-sm text-gray-600">
      <span className="font-medium text-gray-900">{author}</span>
      {role ? <span className="text-gray-500"> · {role}</span> : null}
    </figcaption>
  </figure>
);

export default function TravelHomepage() {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelers, setTravelers] = useState(1);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    // Hook this up to your planner route, e.g., /plan?dest=...&start=...&end=...&pax=...
    const params = new URLSearchParams({
      dest: destination,
      start: startDate,
      end: endDate,
      pax: String(travelers),
    });
    window.location.href = `/plan?${params.toString()}`;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F6FAFF] via-white to-white text-gray-900">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_circle_at_70%_-10%,#D3E8FF_0%,transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 lg:pb-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                <SparklesIcon className="w-4 h-4" />
                Plan less. Travel more.
              </span>
              <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Plan your trip <span className="text-blue-600">in just a few minutes</span>
              </h1>
              <p className="mt-4 text-lg text-gray-700 max-w-prose">
                The homepage focuses on inspiration & action: discover hot destinations, view suggested itineraries, or start planning right away with smart scheduling.
              </p>

              {/* Search / planner entry */}
              <form onSubmit={handleSearch} className="mt-6 grid md:grid-cols-5 gap-3 bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-3 shadow-sm">
                <div className="md:col-span-2 flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200">
                  <PlaneIcon className="w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Where to?"
                    className="w-full bg-transparent outline-none placeholder:text-gray-400"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                  />
                </div>
                <input
                  className="px-3 py-2 rounded-xl border border-gray-200"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  aria-label="Start date"
                />
                <input
                  className="px-3 py-2 rounded-xl border border-gray-200"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  aria-label="End date"
                />
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200">
                  <span className="text-gray-500">👥</span>
                  <input
                    className="w-full bg-transparent outline-none"
                    type="number"
                    min={1}
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    aria-label="Number of travelers"
                  />
                </div>
                <button type="submit" className="md:col-span-5 md:justify-self-end bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-xl transition-colors">
                  Start planning
                </button>
              </form>

              {/* Quick links */}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                <Link href="/trips" className="text-blue-700 hover:underline">My trips</Link>
                <span className="text-gray-300">•</span>
                <a href="/globe" className="text-blue-700 hover:underline">Globe</a>
                <span className="text-gray-300">•</span>
                <a href="#ai" className="text-blue-700 hover:underline">AI Planner</a>
              </div>
            </div>

            {/* Right visual */}
            <div className="relative">
              <div className="absolute -inset-6 -z-10 bg-gradient-to-tr from-blue-100 via-transparent to-blue-100 rounded-[2rem]" />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Card title="DaNang" subtitle="3 days · Food, beach" img="/danang.jpeg" />
                  <Card title="Paris" subtitle="2 days · Cafe, chill" img="/paris.jpg" />
                </div>
                <div className="pt-8 space-y-4">
                  <Card title="Tokyo" subtitle="5 days · City vibes" img="/tokyo.jpg" />
                  <Card title="London" subtitle="4 days · Relax" img="/london.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Destinations / Inspiration */}
      <Section title="Hot spots this month" caption="Find Your Next Adventure: Community-Voted Itineraries.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card title="Hanoi" subtitle="Food · Ancient town" img="/hanoi.jpeg" />
          <Card title="Whiteheaven Beach" subtitle="Beach · Resort" img="/whitehaven.jpg" />
          <Card title="Seoul" subtitle="Shopping · Street food" img="/seoul.jpg" />
          <Card title="Bangkok" subtitle="Nightlife · Market" img="/bangkok.jpg" />
        </div>
      </Section>

      {/* How it works */}
      <Section title="How it works?" caption="3 easy steps to your perfect trip.">
        <ol className="grid md:grid-cols-3 gap-6">
          <li className="rounded-2xl p-6 bg-white border shadow-sm">
            <h3 className="font-semibold">1. Choose your destination & travel dates</h3>
            <p className="text-gray-600 mt-2">Fill out the form on the hero or select a suggestion below.</p>
          </li>
          <li className="rounded-2xl p-6 bg-white border shadow-sm">
            <h3 className="font-semibold">2. Get your itinerary</h3>
            <p className="text-gray-600 mt-2">AI suggests activities, restaurants, and a travel map.</p>
          </li>
          <li className="rounded-2xl p-6 bg-white border shadow-sm">
            <h3 className="font-semibold">3. Customize & share</h3>
            <p className="text-gray-600 mt-2">Drag and drop, edit, and invite friends to collaborate.</p>
          </li>
        </ol>
      </Section>

      {/* AI Planner teaser */}
      <Section id="ai" title="AI-Powered Planning" caption="Describe your trip, get a ready-made itinerary.">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="rounded-2xl border bg-white p-4 sm:p-6 shadow-sm">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">Describe your trip</label>
            <textarea id="prompt" rows={5} className="mt-2 w-full rounded-xl border border-gray-400 focus:border-blue-400 p-4" placeholder="E.g., 4 days in Da Nang for 2 people, seafood lovers, want to go to Ba Na Hills..." />
            <div className="mt-4 flex gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-xl">Create a Draft Itinerary</button>
              <button className="border border-gray-300 hover:bg-gray-50 font-medium px-5 py-3 rounded-xl">View Example</button>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="font-semibold">Example Result</h3>
            <ul className="mt-3 space-y-3 text-gray-700">
              <li>• Day 1: City tour, Fish noodle soup – check-in Dragon Bridge</li>
              <li>• Day 2: Ba Na Hills – French Village – Lunch buffet</li>
              <li>• Day 3: Hoi An Ancient Town – Lantern releasing</li>
              <li>• Day 4: My Khe Beach – Sunset coffee</li>
            </ul>
            <a href="/plan/sample" className="mt-4 inline-flex items-center gap-2 text-blue-700 hover:underline">
              View Sample Itinerary
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </Section>

      {/* Globe teaser */}
      <Section title="Explore on the Map" caption="Browse destinations by season, budget, or weather.">
        <div className="rounded-2xl border bg-white p-6 shadow-sm grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 aspect-video rounded-xl bg-[conic-gradient(at_20%_20%,#E5F1FF,#ffffff_30%,#E5F1FF)] grid place-items-center text-gray-500">
            Map / Globe preview
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-lg">Find Your Destination</h3>
              <p className="text-gray-600 mt-2">Filter by flight time, estimated cost, crowd level, and favorite activities.</p>
            </div>
            <a href="/globe" className="mt-4 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-xl">Open Globe</a>
          </div>
        </div>
      </Section>

      {/* Social proof */}
      <Section title="What Users Say?" caption="A little motivation before you hit the road.">
        <div className="grid md:grid-cols-3 gap-6">
          <Testimonial quote="Creating an itinerary is super fast, my friends just need to take a look and give feedback!" author="Lan Anh" role="Solo traveler" />
          <Testimonial quote="The Globe suggests destinations that match the weather – a wonderful trip!" author="Hai Nam" role="Couple" />
          <Testimonial quote="My trips keep all my old journeys, I love revisiting the memories." author="Quoc Huy" role="Photographer" />
        </div>
      </Section>

      {/* CTA */}
      <Section title="Let's Begin?">
        <div className="rounded-2xl border bg-gradient-to-br from-blue-600 to-blue-500 p-8 sm:p-10 text-white text-center shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-bold">Create Your First Trip Today</h3>
          <p className="opacity-90 mt-2">Free · No credit card required</p>
          <Link href="/trips" className="inline-flex items-center justify-center bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl mt-6 hover:bg-blue-100 duration-300">Go to My Trips</Link>
        </div>
      </Section>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-sm text-gray-500">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Trivio – Plan less. Travel more.</p>
          <nav className="flex gap-4">
            <a href="/privacy" className="hover:underline">Privacy</a>
            <a href="/terms" className="hover:underline">Terms</a>
            <a href="/contact" className="hover:underline">Contact</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}

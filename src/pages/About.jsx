import React from "react";
import me from "/me.jpg";
import { Link } from "react-router-dom";

import {
  FaSearch, FaUtensils, FaBookOpen, FaGithub, FaLinkedin, FaGlobe, FaArrowLeft, FaConciergeBell,
} from "react-icons/fa";


const FEATURES = [
  {
    icon: FaSearch,
    title: "Search by name",
    desc: "Look up any dish and pull full ingredients and steps straight from TheMealDB.",
  },
  {
    icon: FaUtensils,
    title: "Browse by cuisine",
    desc: "Scroll through categories — from Italian to Vegan — without knowing what you want yet.",
  },
  {
    icon: FaBookOpen,
    title: "Cook mode",
    desc: "Step-by-step walkthrough with a progress ribbon, so you're not scrolling mid-stir.",
  },
];

const STACK = ["React", "Tailwind CSS", "React Router", "TheMealDB API"];

export default function About() {

  return (
    <div className="min-h-screen bg-[#F3ECDD] rounded-2xl border border-[#22291F]/10 pt-36 pb-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* ── Mission ───────────────────────────────────── */}
        <section className="mb-16">
          <p className="font-['IBM_Plex_Mono'] text-[11px] tracking-[0.25em] uppercase text-[#7C8B6F] mb-3">
            About the project
          </p>
          <h1 className="font-['Fraunces'] text-4xl md:text-5xl font-semibold leading-[1.05] text-[#22291F] mb-5">
            A place to figure out what to cook tonight.
          </h1>
          <p className="text-[#22291F]/65 leading-relaxed max-w-2xl">
            FlavorVerse is a small recipe app built for browsing by craving, not just by name —
            scroll through cuisines, search for something specific, or let a random pick decide
            dinner for you. No sign-ups, no clutter, just recipes.
          </p>
        </section>

        {/* ── Features ────────────────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="font-['Fraunces'] text-2xl font-semibold text-[#22291F] mb-6">
            What it does
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white/50 border border-[#22291F]/10 rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E7DCC2] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#7C8B6F]" />
                </div>
                <h3 className="font-['Fraunces'] text-lg font-semibold text-[#22291F] mb-1.5">
                  {title}
                </h3>
                <p className="text-sm text-[#22291F]/60 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Powered by TheMealDB ────────────────────────────────── */}
        <section className="mb-16">
          <div className="bg-[#E7DCC2]/60 border border-[#22291F]/10 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#F3ECDD] flex items-center justify-center shrink-0">
              <FaConciergeBell className="w-5 h-5 text-[#7C8B6F]" />
            </div>
            <div>
              <h3 className="font-['Fraunces'] text-lg font-semibold text-[#22291F] mb-1">
                Powered by TheMealDB
              </h3>
              <p className="text-sm text-[#22291F]/60 leading-relaxed">
                Every recipe, ingredient list, and photo comes from{" "}
                <a
                  href="https://www.themealdb.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-[#7C8B6F] underline-offset-2 hover:text-[#22291F]"
                >
                  TheMealDB
                </a>
                's free, open API. Calorie counts and prep times shown alongside them are estimated for now.
              </p>
            </div>
          </div>
        </section>

        {/* ── Tech stack ──────────────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="font-['Fraunces'] text-2xl font-semibold text-[#22291F] mb-5">
            Built with
          </h2>
          <div className="flex flex-wrap gap-3">
            {STACK.map((tech) => (
              <span
                key={tech}
                className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider bg-white/50 border border-[#22291F]/10 rounded-full px-4 py-2 text-[#22291F]/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* ── Developer card ──────────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="font-['Fraunces'] text-2xl font-semibold text-[#22291F] mb-5">
            Who built this
          </h2>
          <div className="bg-white/50 border border-[#22291F]/10 rounded-2xl p-7 flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-[#E1573C]/15 flex items-center justify-center font-['Fraunces'] text-xl font-semibold text-[#22291F] shrink-0">
              <img src={me} alt="BD" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="flex-1">
              <p className="font-['Fraunces'] text-lg font-semibold text-[#22291F]">
                Bandita Das
              </p>
              <p className="text-sm text-[#22291F]/60 leading-relaxed mt-1">
                Frontend developer based in Kolkata. FlavorVerse started as a way to practice
                working with real API data and interaction design — everything from the layout
                to the animations was built from scratch.
              </p>
              <div className="flex items-center gap-4 mt-4">
                <a href="https://github.com/BanditaDas" target="_blank" rel="noopener noreferrer" className="text-[#22291F]/70 hover:text-[#22291F] transition-colors">
                  <FaGithub className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/banditadas-dev/" target="_blank" rel="noopener noreferrer" className="text-[#22291F]/70 hover:text-[#22291F] transition-colors">
                  <FaLinkedin className="w-5 h-5" />
                </a>
                <a href="https://portfolio-six-theta-37.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[#22291F]/70 hover:text-[#22291F] transition-colors">
                  <FaGlobe className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Back to home ────────────────────────────────────────── */}
        <Link
          to="/"
          className="group inline-flex items-center gap-2 font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider text-[#22291F]/60 hover:text-[#22291F] transition-colors"
        >
          <FaArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
          Back to browsing
        </Link>
      </div>
    </div>
  );
}
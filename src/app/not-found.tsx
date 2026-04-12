"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex-1 dot-pattern flex items-center justify-center px-4">
      <div className="w-full max-w-xl text-center relative">
        {/* Minimal decorative elements */}
        <motion.div
          className="hidden md:block bg-yellow-400 rounded-full absolute -top-6 -left-6 w-6 h-6 border-2 border-black shadow-[2px_2px_0_#111]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.6 }}
        />

        <motion.div
          className="hidden md:block bg-pink-400 rotate-45 absolute -bottom-6 -right-6 w-5 h-5 border-2 border-black shadow-[2px_2px_0_#111]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.6 }}
        />

        {/* Content */}
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-[#202538]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          404
        </motion.h1>

        <motion.p
          className="mt-3 text-base md:text-lg text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Page not found
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link href="/">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#975ff1] text-white font-semibold rounded-lg border-2 border-black shadow-[3px_3px_0_#111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition">
              <Home className="w-4 h-4" />
              Back to Home
            </button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

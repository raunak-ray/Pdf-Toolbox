"use client";

import { FileText, Star } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
      className="w-full bg-white border-b-2 border-[#e1e7ef] shadow-2xs"
    >
      <div className="max-w-lg md:max-w-2xl lg:max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center p-2 bg-purple-400 border-2 border-black rounded-lg shadow-pop transition-transform hover:-rotate-3">
            <FileText className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>

          <h1 className="text-lg md:text-xl font-bold tracking-tight text-[#1a293c]">
            PDF Toolbox
          </h1>
        </div>

        {/* RIGHT */}
        <motion.div
          whileHover={{
            boxShadow: "5px 5px 0 #111",
            rotate: -3,
            scale: 1.01,
          }}
          whileTap={{
            scale: 0.95,
          }}
          transition={{ duration: 0.2 }}
          className="rounded-xl"
        >
          <Link
            href="/"
            aria-label="GitHub Repository"
            className="flex items-center gap-2 px-3 py-2 bg-[#1a293c] text-white border-2 border-black rounded-xl"
          >
            <Star className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base font-medium sm:inline">
              GitHub
            </span>
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default Navbar;

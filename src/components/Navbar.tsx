"use client";

import { Star } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full bg-white border-b-2 border-black"
    >
      <div className="max-w-lg md:max-w-2xl lg:max-w-5xl mx-auto flex items-center justify-between px-4 py-2">
        {/* LEFT SIDE (LOGO + NAME) */}
        <motion.div
          whileHover={{ rotate: -2, scale: 1.03 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-3 cursor-pointer"
        >
          {/* Logo Container (Neo-brutalist style) */}
          <div className="flex items-center justify-center p-0.5 bg-white border-2 border-black rounded-lg shadow-[4px_4px_0_#000]">
            <Image
              src="/logo.png" // or "/logo.svg"
              width={32}
              height={32}
              quality={100}
              priority
              alt="PDFkit logo"
              className="object-contain rounded-md"
            />
          </div>

          {/* Brand Name */}
          <h1 className="text-lg md:text-xl font-extrabold tracking-tight text-[#1a293c] leading-none">
            PDFkit
          </h1>
        </motion.div>

        {/* RIGHT SIDE (BUTTON) */}
        <motion.div
          whileHover={{
            boxShadow: "4px 4px 0 #000",
            rotate: -2,
            scale: 1.03,
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl"
        >
          <Link
            href="https://github.com/raunak-ray"
            target="_blank"
            aria-label="GitHub Repository"
            className="flex items-center gap-2 px-4 py-2 bg-[#1a293c] text-white border-2 border-black rounded-xl"
          >
            <Star className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base font-semibold">GitHub</span>
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
}

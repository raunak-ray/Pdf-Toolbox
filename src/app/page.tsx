"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { categories, faqData } from "@/lib/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function page() {
  const scrollToTools = () => {
    const section = document.getElementById("tools");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <main className="flex-1 dot-pattern">
      <div className="max-w-lg md:max-w-2xl lg:max-w-5xl mx-auto px-4 py-6 md:py-10 relative">
        {/* left circle */}
        <motion.div
          className="hidden md:block bg-emerald-400 rounded-full absolute left-5 top-20 w-8 h-8 shadow-[2px_2px_0px_#111] border-2 border-[#111] opacity-60"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.8 }}
        />

        {/* right circle */}
        <motion.div
          className="hidden md:block bg-yellow-400 rounded-full absolute right-5 w-15 h-15 shadow-[3px_3px_0px_#111] border-2 border-[#111] opacity-90"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.8 }}
        />

        {/* rhombus */}
        <motion.div
          className="hidden md:block bg-pink-400 rotate-45 absolute right-1 w-6 h-6 top-1/3 shadow-[1px_1px_0px_#111] opacity-60 border-2 border-[#111]"
          initial={{ opacity: 0, y: -20, rotate: 45 }}
          animate={{ opacity: 0.6, y: 0, rotate: 0 }}
          transition={{ duration: 0.8 }}
        />

        <div className="flex flex-col items-center justify-center gap-4 md:gap-6 lg:gap-8 mt-8 md:mt-12 relative">
          {/* Badge */}
          <motion.div
            className="flex items-center gap-2 px-4 py-2 bg-yellow-600/90 text-white rounded-full border-2 border-black shadow-pop"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base font-bold">
              100% Secure & Free
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-center font-bold text-[#202538] leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Your All-in-One
            <span className="block text-[#975ff1]">PDF Toolbox</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-sm sm:text-base md:text-lg text-center text-gray-500 max-w-md md:max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            All the tools you need to work with PDFs — right in your browser.
            Nothing uploaded, nothing stored.
          </motion.p>

          <motion.button
            onClick={scrollToTools}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            whileHover={{
              x: 2,
              y: 2,
              boxShadow: "2px 2px 0 #111",
            }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-6 py-3 bg-[#975ff1] text-white font-bold rounded-xl border-2 border-black shadow-[4px_4px_0_#111] cursor-pointer text-sm md:text-lg"
          >
            Explore Tools ↓
          </motion.button>
        </div>

        <motion.svg
          className="hidden md:block mx-auto mt-6 w-48 h-6"
          viewBox="0 0 200 24"
          fill="none"
        >
          <motion.path
            d="M5 12 Q 25 2 45 12 Q 65 22 85 12 Q 105 2 125 12 Q 145 22 165 12 Q 185 2 195 12"
            stroke="#ad5ff1"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </motion.svg>
      </div>

      <div
        className="mt-5 max-w-lg md:max-w-2xl lg:max-w-5xl mx-auto px-4 py-6 md:py-10 relative"
        id="tools"
      >
        {categories.map((category) => (
          <div key={category.name} className="mb-10">
            {/* Category Header */}
            <motion.div className="flex gap-4 flex-wrap items-center justify-start">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`rounded-full w-4 h-4 ${category.tools[0].colorClass} border-2 border-black opacity-80`}
              />
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.12, duration: 0.8 }}
                className="text-lg md:text-xl text-[#1a293c] font-bold"
              >
                {category.name}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.12, duration: 0.8 }}
                className="text-[#40526b] text-sm md:text-md w-full md:w-auto"
              >
                - {category.description}
              </motion.p>
            </motion.div>

            {/* Tools Grid */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
              className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {category.tools.map((tool) => {
                const Icon = tool.icon; // dynamic icon

                return (
                  <Link href={tool.path} key={tool.id}>
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 40 },
                        show: { opacity: 1, y: 0 },
                      }}
                      whileHover={{
                        rotate: -3,
                        boxShadow: "8px 8px 0 #111",
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 10,
                      }}
                      className="rounded-xl"
                    >
                      <Card className="border-black border-2 shadow-[5px_5px_0_#111]">
                        <CardHeader>
                          <div
                            className={`${tool.colorClass} w-fit p-2 rounded-lg shadow-[3px_3px_0_#111] border-2 border-black`}
                          >
                            <Icon
                              className="text-white h-5 w-5"
                              strokeWidth={2.5}
                            />
                          </div>
                        </CardHeader>

                        <CardContent>
                          <h1 className="text-black font-bold text-md md:text-lg">
                            {tool.name}
                          </h1>
                          <p className="text-gray-600 text-xs md:text-sm font-normal">
                            {tool.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Link>
                );
              })}
            </motion.div>
          </div>
        ))}
      </div>

      <div className="mt-5 max-w-lg md:max-w-2xl lg:max-w-5xl mx-auto px-4 py-6 md:py-10 relative">
        <div className="flex flex-col gap-4 items-center justify-center">
          <h2 className="text-md md:text-xl lg:text-3xl font-bold text-[#131f27]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm md:tex-md lg:text-lg text-[#252729bd]">
            Quick answers about PDFkit, security, and how it works.
          </p>
        </div>
        <div className="mt-5 flex flex-col items-center justify-center gap-4 max-w-lg md:max-w-xl mx-auto">
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqData.map((faq, index) => (
              <AccordionItem
                key={`faq-${index}`}
                value={`item-${index}`}
                className="bg-white mb-4 px-4 py-1 border-black border-2 shadow-[4px_4px_0_#111] rounded-xl"
              >
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </main>
  );
}

export default page;

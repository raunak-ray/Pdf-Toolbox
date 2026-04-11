"use client";

import { categories } from "@/lib/constants";
import { motion } from "framer-motion";
import Link from "next/link";

function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-white border-t-2 border-[#e1e7ef] shadow-2xs"
    >
      <motion.div
        className="max-w-lg md:max-w-2xl lg:max-w-5xl mx-auto px-4 py-3 grid grid-cols-2 md:grid-cols-4 gap-6"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15, // 👈 categories stagger
            },
          },
        }}
      >
        {categories.map((category) => (
          <motion.div
            key={category.name}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            {/* Category Title */}
            <h4 className="text-md md:text-lg font-bold">{category.name}</h4>

            {/* Links */}
            <motion.div
              className="mt-3 flex flex-col gap-2"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.08, // 👈 links stagger
                  },
                },
              }}
            >
              {category.tools.map((tool) => (
                <motion.div
                  key={tool.id}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    show: { opacity: 1, x: 0 },
                  }}
                  whileHover={{
                    x: 5,
                    color: "#2563eb", // blue-600
                  }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Link href={tool.path}
                  className="text-sm md:text-md">{tool.name}</Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Footer;

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const PdfPreview = dynamic(() => import("@/components/PdfPreview"), {
  ssr: false,
});

export default function LazyPage({ url, page }: { url: string; page: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="">
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
          }}
        >
          <PdfPreview url={url} page={page} />
        </motion.div>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-400 text-sm">
          Loading page {page}...
        </div>
      )}
    </div>
  );
}

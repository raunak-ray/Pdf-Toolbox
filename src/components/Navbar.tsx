import { FileText, Star } from "lucide-react"
import Link from "next/link"

function Navbar() {
  return (
    <nav className="w-full bg-white border-b-2 border-black">
      <div className="max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto flex items-center justify-between px-4 py-3">

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
        <Link
          href="/"
          aria-label="GitHub Repository"
          className="flex items-center gap-2 px-3 py-2 bg-[#1a293c] text-white border-2 border-black rounded-xl shadow-pop transition-transform hover:-rotate-2 active:scale-95"
        >
          <Star className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-sm md:text-base font-medium sm:inline">
            GitHub
          </span>
        </Link>

      </div>
    </nav>
  )
}

export default Navbar
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-base-blue/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <div className="absolute -top-2 -left-2 text-ochre font-bold text-xl">+</div>
              <div className="bg-base-blue px-2 py-0.5 rounded-sm flex items-center justify-center">
                <span className="font-bold text-white text-xl tracking-tighter">GMMA</span>
              </div>
            </motion.div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
              <span className="text-base-blue font-bold tracking-[0.2em] text-[11px] uppercase">Global Medical Missions Alliance</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-[0.3em] text-base-blue">
            <Link to="/" className="hover:border-b-2 hover:border-ochre pb-1 transition-all">Merch Hub</Link>
            <Link to="/chapters" className="hover:border-b-2 hover:border-ochre pb-1 transition-all">Chapters</Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-base-blue">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-base-blue/10 p-6 space-y-6 text-sm font-bold uppercase tracking-[0.3em] text-base-blue"
        >
          <Link to="/" onClick={() => setIsOpen(false)} className="block hover:text-ochre">Merch Hub</Link>
          <Link to="/chapters" onClick={() => setIsOpen(false)} className="block hover:text-ochre">Chapters</Link>
        </motion.div>
      )}
    </nav>
  );
}

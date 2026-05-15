
import Navbar from '../components/Navbar';
import USAInteractiveMap from '../components/USAInteractiveMap';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Users, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

const merchImages = [
  '/merch_img/uf_merch_2026.png',
  '/merch_img/example_usf_merch.png'
];

function MerchShuffle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % merchImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.img
          key={merchImages[index]}
          src={merchImages[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="w-full h-full object-cover"
          alt="Merchandise"
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-base-blue">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-ochre/10 border border-ochre/20 text-ochre text-xs font-bold tracking-[0.5em] uppercase transition-all mb-8">
                    Healing through Missions
                  </div>
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-base-blue leading-[1.1] tracking-tight italic">
                    <span className="block text-mask-nature">Global Medical</span>
                    <span className="font-bold">Missions Alliance</span>
                  </h1>
                  <p className="mt-8 text-xl text-brown max-w-2xl mx-auto lg:mx-0 leading-relaxed font-scripture italic">
                    "And he sent them out to proclaim the kingdom of God and to heal." - Luke 9:2 (ESV)
                  </p>
                  <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                    <button
                      onClick={() => document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' })}
                      className="px-10 py-4 bg-base-blue text-white rounded-sm font-bold text-sm tracking-[0.3em] uppercase transition-all hover:bg-ochre active:scale-95"
                    >
                      Explore Chapters
                    </button>
                    <a 
                      href="https://www.gmma7.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-10 py-4 bg-transparent text-base-blue border border-base-blue/20 rounded-sm font-bold text-sm tracking-[0.3em] uppercase hover:bg-salmon/10 transition-all active:scale-95 text-center"
                    >
                      Learn More
                    </a>
                  </div>
                </motion.div>
              </div>

              <div className="flex-1 relative">
                 <motion.div
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 1 }}
                   className="relative z-10 w-full aspect-[4/5] rounded-tl-[100px] rounded-br-[100px] overflow-hidden shadow-2xl"
                 >
                   <MerchShuffle />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex flex-col justify-end p-10">
                     <p className="text-white text-4xl font-scripture italic">Transforming lives, one Christ-centered mission at a time</p>
                   </div>
                 </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section id="map-section" className="scroll-mt-20">
          <USAInteractiveMap />
        </section>

        {/* Feature Highlights */}
        <section className="py-20 bg-white border-y border-base-blue/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-t border-base-blue/10">
                {[
                  { icon: Globe, title: "Global Network", desc: "Access to mission trips in over 40 countries." },
                  { icon: Users, title: "Collegiate Chapters", desc: "Find a community at your university." },
                  { icon: ShoppingCart, title: "Premium Merch", desc: "Apparel that equips students." }
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-10 border-r border-b border-base-blue/10"
                  >
                    <div className="w-12 h-12 bg-salmon/10 rounded-full flex items-center justify-center mb-8">
                      <feature.icon className="text-salmon w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-base-blue mb-4 uppercase tracking-[0.2em] font-heading">{feature.title}</h3>
                    <p className="text-brown leading-relaxed font-scripture text-lg italic">{feature.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </section>
      </main>
    </div>
  );
}

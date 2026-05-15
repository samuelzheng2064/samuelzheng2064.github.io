import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FLORIDA_DATA } from '../constants';
import { Chapter } from '../types';
import { MapPin, ShoppingBag, ArrowLeft, ExternalLink, Globe, Instagram } from 'lucide-react';
import { cn } from '../lib/utils';

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

export default function USAInteractiveMap() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [viewedMerchLink, setViewedMerchLink] = useState<string | null>(null);

  const handleStateClick = (geo: any) => {
    const stateName = geo.properties.name;
    if (stateName === "Florida") {
      setSelectedState("Florida");
    } else {
      // For now, only Florida is functional
      alert(`${stateName} chapter information coming soon! Currently only Florida is available.`);
    }
  };

  const resetView = () => {
    setSelectedState(null);
    setSelectedChapter(null);
    setViewedMerchLink(null);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-0 px-4 min-h-[800px] flex flex-col items-center">
      <div className="text-center mb-16">
        <span className="text-ochre text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Chapter Directory</span>
        <h2 className="text-4xl font-light text-base-blue sm:text-5xl italic leading-tight">Find Your <span className="not-italic font-black text-ochre tracking-tighter uppercase">Community</span></h2>
        <div className="mt-6 text-brown max-w-3xl mx-auto font-scripture text-xl italic leading-relaxed">
          <p>
            Discover what God is doing through our national network of GMMA chapters. Select a state below to explore local chapters, and partner with our teams. By picking up some chapter exclusive apparel, you directly support and equip our students for their upcoming medical missions.
          </p>
        </div>
      </div>

      <div className="relative w-full aspect-[16/9] bg-white rounded-3xl border border-base-blue/10 shadow-lg overflow-hidden">
        <AnimatePresence mode="wait">
          {!selectedState ? (
            <motion.div
              key="usa-map"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="w-full h-full relative"
            >
              {/* Background Map Grid */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <pattern id="map-grid" width="4" height="4" patternUnits="userSpaceOnUse">
                    <path d="M 4 0 L 0 0 0 4" fill="none" stroke="#1F4E79" strokeWidth="0.1"/>
                  </pattern>
                  <rect width="100" height="100" fill="url(#map-grid)" />
                </svg>
              </div>

              <ComposableMap projection="geoAlbersUsa" className="w-full h-full">
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => handleStateClick(geo)}
                        style={{
                          default: {
                            fill: geo.properties.name === "Florida" ? "#1F4E79" : "#F1F5F9",
                            outline: "none",
                            stroke: "#1F4E79",
                            strokeWidth: 0.5,
                            transition: "all 300ms",
                          },
                          hover: {
                            fill: geo.properties.name === "Florida" ? "#C68255" : "#E2E8F0",
                            outline: "none",
                            cursor: "pointer",
                            stroke: "#1F4E79",
                            strokeWidth: 1,
                          },
                          pressed: {
                            fill: "#6B3F31",
                            outline: "none",
                            stroke: "#1F4E79",
                          },
                        }}
                      />
                    ))
                  }
                </Geographies>
              </ComposableMap>
              
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-base-blue font-bold uppercase tracking-[0.5em] flex items-center gap-4">
                <span className="w-12 h-[1px] bg-base-blue/20" />
                Select a state to zoom
                <span className="w-12 h-[1px] bg-base-blue/20" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="state-detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col md:flex-row relative"
            >
              <button
                onClick={resetView}
                className="absolute top-6 left-6 z-20 flex items-center gap-3 px-4 py-3 bg-white rounded-sm shadow-md border border-base-blue/20 text-base-blue hover:text-ochre hover:border-ochre/20 transition-all uppercase text-[10px] font-bold tracking-widest"
                id="back-to-usa"
              >
                <ArrowLeft size={14} />
                Back to National View
              </button>

              {/* Left Column: List of Chapters */}
              <div className="flex-[0.8] p-10 pt-20 flex flex-col max-h-full overflow-hidden bg-white">
                <div className="mb-10">
                  <div className="flex items-center gap-2 text-ochre text-xs font-bold uppercase tracking-[0.3em] mb-3">
                    <span className="w-8 h-[1px] bg-ochre"></span>
                    Regional View: {selectedState}
                  </div>
                  <h3 className="text-4xl font-light text-base-blue italic leading-tight">Chapter <span className="not-italic font-bold">Hubs</span></h3>
                </div>

                <div className="flex-1 overflow-y-auto pr-4 space-y-6 custom-scrollbar pb-10">
                  {FLORIDA_DATA.chapters.map((chapter) => (
                    <div
                      key={chapter.id}
                      onClick={() => { setSelectedChapter(chapter); setViewedMerchLink(null); }}
                      onKeyDown={(e) => { if (e.key === 'Enter') { setSelectedChapter(chapter); setViewedMerchLink((prev: string | null) => prev ? chapter.merchFormUrl : null); } }}
                      role="button"
                      tabIndex={0}
                      className={cn(
                        "w-full text-left p-8 rounded-xl border transition-all duration-500 group relative overflow-hidden cursor-pointer outline-none focus:ring-2 focus:ring-ochre/50",
                        selectedChapter?.id === chapter.id
                          ? "bg-white border-ochre/50 shadow-2xl shadow-base-blue/10"
                          : "bg-stone-50 border-base-blue/5 hover:border-base-blue/20"
                      )}
                    >
                      {selectedChapter?.id === chapter.id && (
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 blur-3xl rounded-full -mr-12 -mt-12" />
                      )}
                      
                      <div className="flex justify-between items-start relative z-10">
                        <div className="flex gap-6">
                          <div className={cn(
                            "w-14 h-14 rounded-lg flex items-center justify-center shrink-0 transition-all duration-500 border overflow-hidden p-2",
                            selectedChapter?.id === chapter.id ? "bg-white border-ochre rotate-3" : "bg-base-blue/10 border-base-blue/20 opacity-40 group-hover:opacity-80"
                          )}>
                             <img 
                               src={chapter.logoUrl} 
                               alt={chapter.name} 
                               className="w-full h-full object-contain" 
                               referrerPolicy="no-referrer"
                               onError={(e) => {
                                 (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${chapter.shortName}&background=1F4E79&color=fff&length=3&bold=true`;
                               }}
                             />
                          </div>
                          <div>
                            <h4 className={cn(
                              "font-bold text-xl leading-tight transition-colors duration-300",
                              selectedChapter?.id === chapter.id ? "text-base-blue" : "text-base-blue/60 group-hover:text-base-blue"
                            )}>
                              {chapter.name}
                            </h4>
                            <div className="flex items-center gap-3 mt-2">
                               <span className="text-[10px] font-bold uppercase tracking-widest text-brown">
                                University Hub
                              </span>
                              <div className="w-1 h-1 rounded-full bg-base-blue/20" />
                              <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">
                                Active Store
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {selectedChapter?.id === chapter.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          className="mt-8 pt-8 border-t border-white/5"
                        >
                             <div className="flex gap-4">
                             <button
                               onClick={(e) => {
                                 e.stopPropagation();
                                 setViewedMerchLink(chapter.merchFormUrl);
                               }}
                               className="flex-[2] flex items-center justify-center gap-3 bg-base-blue text-white py-4 rounded-lg text-[11px] font-bold uppercase tracking-widest hover:bg-base-blue/90 transition-all shadow-lg shadow-base-blue/20 active:scale-95"
                             >
                               <ShoppingBag size={14} />
                               Open Chapter Store
                             </button>
                             <a 
                               href={chapter.instagramUrl}
                               target="_blank"
                               rel="noopener noreferrer"
                               onClick={(e) => e.stopPropagation()}
                               className="flex-1 flex items-center justify-center gap-2 bg-[#FD1D1D]/10 text-[#FD1D1D] border border-[#FD1D1D]/20 py-4 rounded-lg text-[11px] font-bold uppercase tracking-widest hover:bg-[#FD1D1D]/20 transition-all"
                             >
                               <Instagram size={14} />
                               IG
                             </a>
                           </div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                  
                  <div className="p-8 rounded-xl border border-dashed border-base-blue/10 bg-stone-50">
                    <p className="text-[10px] text-brown font-bold uppercase tracking-[0.3em] text-center">More chapters coming soon</p>
                  </div>
                </div>
                
                {/* Footer Stats for the State */}
                <div className="mt-auto pt-8 border-t border-base-blue/10 flex flex-col items-center justify-center bg-stone-50 relative z-10">
                   <div className="flex items-center gap-3 text-brown mb-2">
                      <div className="w-1 h-1 bg-base-blue/20 rounded-full" />
                      <span className="text-[9px] font-bold uppercase tracking-[0.4em]">Regional Mission Activity</span>
                      <div className="w-1 h-1 bg-base-blue/20 rounded-full" />
                   </div>
                   <p className="text-[10px] text-brown font-medium italic">Empowering {selectedState} chapters to serve locally and globally.</p>
                </div>
              </div>

              {/* Right Column: Dynamic Preview / Merch */}
              <div className="flex-1 bg-stone-50 border-l border-base-blue/10 flex items-center justify-center p-12 relative overflow-hidden">
                {!selectedChapter ? (
                  <div className="text-center max-w-sm relative z-10">
                    <div className="w-24 h-24 bg-ochre/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-ochre/10">
                      <Globe className="text-ochre w-10 h-10 animate-pulse" />
                    </div>
                    <h4 className="text-xl font-bold text-base-blue uppercase tracking-widest mb-3">Initialize Connection</h4>
                    <p className="text-brown font-light leading-relaxed text-sm">Select a regional chapter from the directory to begin exploring their local mission and merchandise.</p>
                  </div>
                ) : viewedMerchLink ? (
                  <div className="w-full h-full flex flex-col relative z-20">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-base-blue rounded flex items-center justify-center text-white text-xs font-bold">G</div>
                        <div>
                          <h4 className="font-bold text-base-blue text-sm uppercase tracking-widest">Store Gateway</h4>
                          <p className="text-[10px] text-brown uppercase tracking-widest">{selectedChapter.shortName} Chapter</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setViewedMerchLink(null)}
                        className="px-4 py-2 border border-base-blue/10 rounded text-[10px] font-bold text-brown hover:text-base-blue uppercase tracking-widest transition-colors"
                      >
                        Exit Store
                      </button>
                    </div>
                    <div className="flex-1 bg-white rounded-xl overflow-hidden border border-base-blue/10 shadow-2xl relative">
                      <iframe
                        src={viewedMerchLink}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        marginHeight={0}
                        marginWidth={0}
                        title="Chapter Merch Order Form"
                      >
                        Loading…
                      </iframe>
                    </div>
                  </div>
                ) : (
                  <div className="w-full max-w-lg relative z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-10 rounded-2xl shadow-lg border border-base-blue/10 space-y-10"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                           <h4 className="text-3xl font-light text-base-blue italic">{selectedChapter.shortName} <span className="not-italic font-bold">Chapter</span></h4>
                           <p className="text-ochre text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Certified GMMA Affiliate</p>
                        </div>
                        <div className="w-12 h-12 bg-ochre/5 rounded-full border border-ochre/10 flex items-center justify-center">
                           <ShoppingBag size={20} className="text-brown" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        {selectedChapter.merchItems.map(item => (
                          <div 
                            key={item.id} 
                            className="text-left group cursor-pointer bg-stone-50 p-4 rounded-xl border border-base-blue/10 hover:border-ochre/30 transition-all" 
                            onClick={() => setViewedMerchLink(selectedChapter.merchFormUrl)}
                          >
                            <div className="aspect-square bg-white rounded-lg overflow-hidden mb-4 border border-base-blue/5">
                               <img
                                  src={item.imageUrl || `https://picsum.photos/seed/${item.id}/400/400`}
                                  alt={item.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500 opacity-90 group-hover:opacity-100"
                                  referrerPolicy="no-referrer"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${item.id}/400/400`;
                                  }}
                               />
                            </div>
                            <p className="text-[11px] font-bold text-base-blue uppercase tracking-widest truncate">{item.name}</p>
                            <p className="text-[10px] text-ochre font-bold uppercase tracking-[0.2em] mt-1">{item.price}</p>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => setViewedMerchLink(selectedChapter.merchFormUrl)}
                        className="w-full bg-transparent hover:bg-stone-50 text-base-blue py-5 rounded-lg font-bold text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 border border-base-blue/10 transition-all shadow-md active:scale-[0.98]"
                      >
                        Enter Chapter Merchandise Portal
                        <ExternalLink size={12} />
                      </button>
                    </motion.div>
                  </div>
                )}
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-base-blue/5 blur-3xl rounded-full" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-ochre/10 blur-3xl rounded-full" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

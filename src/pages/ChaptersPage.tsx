
import Navbar from '../components/Navbar';

export default function ChaptersPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-base-blue">
      <Navbar />
      <main className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-light text-base-blue italic mb-12">All Chapters</h1>
        {/* Placeholder for list of chapters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-8 bg-white border border-base-blue/10 rounded-2xl shadow-sm">
                <h3 className="font-bold text-base-blue mb-2">University of Florida (UF)</h3>
                <p className="text-brown">Gainesville, FL</p>
            </div>
            <div className="p-8 bg-white border border-base-blue/10 rounded-2xl shadow-sm">
                <h3 className="font-bold text-base-blue mb-2">University of South Florida (USF)</h3>
                <p className="text-brown">Tampa, FL</p>
            </div>
        </div>
      </main>
    </div>
  );
}

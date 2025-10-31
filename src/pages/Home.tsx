import { Navbar } from '@/components/Navbar';
import { WorkshopCard } from '@/components/WorkshopCard';
import { mockWorkshops } from '@/data/mockData';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWorkshops = mockWorkshops.filter(workshop =>
    workshop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workshop.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary-glow text-primary-foreground py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Find Your Perfect Mechanic Shop
            </h1>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Connect with trusted local mechanics and book appointments instantly
            </p>
            
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search by shop name or location..."
                className="pl-12 h-14 text-lg bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Workshops Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Workshops</h2>
          
          {filteredWorkshops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredWorkshops.map(workshop => (
                <WorkshopCard key={workshop.id} workshop={workshop} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No workshops found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

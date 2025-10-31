import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockWorkshops, mockServices } from '@/data/mockData';
import { ArrowLeft, Clock, DollarSign, MapPin, Phone, Star } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const WorkshopDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const workshop = mockWorkshops.find(w => w.id === id);
  const services = mockServices.filter(s => s.workshop_id === id);

  if (!workshop) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Workshop not found</h1>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Workshops
        </Button>

        {/* Workshop Header */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="relative h-96 rounded-xl overflow-hidden">
            <img 
              src={workshop.image} 
              alt={workshop.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 fill-secondary text-secondary" />
              <span className="text-xl font-semibold">{workshop.rating}</span>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">{workshop.name}</h1>
            <p className="text-lg text-muted-foreground mb-6">{workshop.description}</p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{workshop.location}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary" />
                <span>{workshop.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Available Services</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(service => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <span>Price</span>
                      </div>
                      <span className="font-semibold text-lg">
                        ${service.price.toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>Duration</span>
                      </div>
                      <span className="font-semibold">{service.duration}</span>
                    </div>
                    
                    <Button 
                      className="w-full mt-4"
                      onClick={() => navigate(`/book/${workshop.id}/${service.id}`)}
                    >
                      Book Appointment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopDetail;

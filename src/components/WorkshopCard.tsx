import { Workshop } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WorkshopCardProps {
  workshop: Workshop;
}

export const WorkshopCard = ({ workshop }: WorkshopCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      onClick={() => navigate(`/workshop/${workshop.id}`)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={workshop.image} 
          alt={workshop.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
          <Star className="w-4 h-4 fill-secondary text-secondary" />
          <span className="font-semibold">{workshop.rating}</span>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {workshop.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {workshop.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{workshop.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="w-4 h-4 text-primary" />
            <span>{workshop.phone}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockWorkshops, mockServices } from '@/data/mockData';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

const BookAppointment = () => {
  const { workshopId, serviceId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const workshop = mockWorkshops.find(w => w.id === workshopId);
  const service = mockServices.find(s => s.id === serviceId);
  
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      if (!supabase) return;
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: 'Authentication Required',
          description: 'Please sign in to book an appointment.',
          variant: 'destructive',
        });
        navigate('/auth');
      } else {
        setUserId(user.id);
      }
    };
    checkUser();
  }, [navigate, toast]);

  if (!workshop || !service) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Service not found</h1>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const isValidUUID = (id: string | undefined) => {
    if (!id) return false;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!supabase || !userId) {
      toast({
        title: 'Error',
        description: 'Please sign in to book an appointment.',
        variant: 'destructive',
      });
      navigate('/auth');
      return;
    }

    // Check if using mock data and handle accordingly
    if (!isValidUUID(workshopId) || !isValidUUID(serviceId)) {
      toast({
        title: 'Demo Mode',
        description: 'Using mock data. In a real app, this would save to your database.',
        variant: 'default',
      });
      setTimeout(() => {
        navigate('/');
      }, 2000);
      return;
    }

    setLoading(true);

    try {
      // Check if we can connect to Supabase first
      const { error: connectionError } = await supabase.from('appointments').select('id', { count: 'exact', head: true });
      
      if (connectionError) {
        throw new Error('Failed to fetch data from the server. Please check your connection and try again.');
      }
      
      const { error } = await supabase
        .from('appointments')
        .insert({
          user_id: userId,
          workshop_id: workshopId,
          service_id: serviceId,
          appointment_date: appointmentDate,
          appointment_time: appointmentTime,
          notes: notes || null,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: 'Appointment Booked!',
        description: `Your appointment at ${workshop.name} has been scheduled.`,
      });
      navigate('/');
    } catch (error: any) {
      console.error('Booking error:', error);
      toast({
        title: 'Booking Failed',
        description: error.message || 'Failed to connect to the database. Please check your connection and try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/workshop/${workshopId}`)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Workshop
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Book Appointment</CardTitle>
            <CardDescription>
              Schedule your service at {workshop.name}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Service Summary */}
            <div className="bg-muted p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">{service.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Price:</span>
                <span className="font-semibold text-lg">${service.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-semibold">{service.duration}</span>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Appointment Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  min={minDate}
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Appointment Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  min="08:00"
                  max="18:00"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Available hours: 8:00 AM - 6:00 PM
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any specific concerns or requirements..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="pt-4 space-y-3">
                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? 'Booking...' : 'Confirm Appointment'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => navigate(`/workshop/${workshopId}`)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookAppointment;

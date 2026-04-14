import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  Smartphone, 
  Building,
  CheckCircle2,
  Upload,
  Play
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

const SPOTS_DATA: Record<string, any> = {
  "1": {
    id: "1",
    name: "Cox's Bazar",
    location: "Chittagong, Bangladesh",
    price: 5000,
    rating: 4.8,
    reviewsCount: 124,
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=2074&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Cox's Bazar is a city, fishing port, tourism centre and district headquarters in southeastern Bangladesh. It is famous for its very long, sandy beachfront, stretching 120 km (75 mi) in length.",
    category: "Beach"
  },
};

export default function SpotDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const spot = SPOTS_DATA[id || "1"] || SPOTS_DATA["1"];

  const [passengers, setPassengers] = useState(1);
  const [date, setDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  const handleBooking = async () => {
    if (!user) {
      toast.error("Please login to book a trip");
      navigate("/login");
      return;
    }

    if (!date || !paymentMethod || !transactionId) {
      toast.error("Please fill all booking and payment details");
      return;
    }
    
    setIsBooking(true);
    try {
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        userName: user.displayName,
        spotId: spot.id,
        spotName: spot.name,
        date,
        passengers,
        totalPrice: spot.price * passengers,
        paymentMethod,
        transactionId,
        status: "pending",
        paymentStatus: "paid",
        createdAt: new Date().toISOString()
      });

      toast.success("Booking request submitted successfully!");
      navigate("/bookings");
    } catch (error: any) {
      toast.error("Failed to submit booking: " + error.message);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src={spot.image} 
              alt={spot.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <Badge className="absolute top-6 left-6 text-lg px-4 py-1">{spot.category}</Badge>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h1 className="text-4xl font-bold tracking-tight">{spot.name}</h1>
              <div className="flex items-center bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                <Star className="h-5 w-5 fill-current" />
                <span className="ml-1 font-bold">{spot.rating}</span>
                <span className="ml-1 text-sm opacity-80">({spot.reviewsCount} reviews)</span>
              </div>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-5 w-5 mr-2" />
              {spot.location}
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-xl">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="video">Video Tour</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6 space-y-4">
              <p className="text-lg leading-relaxed text-muted-foreground italic">
                {spot.description}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <div className="p-4 bg-muted/50 rounded-2xl text-center space-y-1">
                  <CheckCircle2 className="h-6 w-6 mx-auto text-primary" />
                  <span className="text-xs font-semibold uppercase">Guided Tour</span>
                </div>
                <div className="p-4 bg-muted/50 rounded-2xl text-center space-y-1">
                  <CheckCircle2 className="h-6 w-6 mx-auto text-primary" />
                  <span className="text-xs font-semibold uppercase">Transport</span>
                </div>
                <div className="p-4 bg-muted/50 rounded-2xl text-center space-y-1">
                  <CheckCircle2 className="h-6 w-6 mx-auto text-primary" />
                  <span className="text-xs font-semibold uppercase">Meals</span>
                </div>
                <div className="p-4 bg-muted/50 rounded-2xl text-center space-y-1">
                  <CheckCircle2 className="h-6 w-6 mx-auto text-primary" />
                  <span className="text-xs font-semibold uppercase">Insurance</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="video" className="mt-6">
              <div className="aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Play className="h-12 w-12 text-white mx-auto opacity-50" />
                  <p className="text-white/70">Video tour placeholder</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {[1, 2].map((i) => (
                  <div key={i} className="border-b pb-6 last:border-0">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold">U</div>
                      <div>
                        <p className="font-semibold">User {i}</p>
                        <div className="flex text-yellow-500">
                          {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-3 w-3 fill-current" />)}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">Amazing experience! The view was breathtaking and the service was excellent.</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column: Booking Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-none shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground p-6">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">Book Now</CardTitle>
                <div className="text-right">
                  <span className="text-3xl font-bold">৳{spot.price}</span>
                  <p className="text-xs opacity-80">per person</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="flex items-center"><Calendar className="h-4 w-4 mr-2" /> Select Date</Label>
                  <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center"><Users className="h-4 w-4 mr-2" /> Passengers</Label>
                  <Input 
                    type="number" 
                    min="1" 
                    value={passengers} 
                    onChange={(e) => setPassengers(parseInt(e.target.value))} 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center"><Upload className="h-4 w-4 mr-2" /> Upload ID Card</Label>
                  <Input type="file" />
                </div>
              </div>

              <div className="pt-4 border-t space-y-4">
                <Label>Payment Method</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant={paymentMethod === 'bkash' ? 'default' : 'outline'} 
                    className="flex-col h-16 text-[10px]"
                    onClick={() => setPaymentMethod('bkash')}
                  >
                    <Smartphone className="h-5 w-5 mb-1" /> bKash
                  </Button>
                  <Button 
                    variant={paymentMethod === 'rocket' ? 'default' : 'outline'} 
                    className="flex-col h-16 text-[10px]"
                    onClick={() => setPaymentMethod('rocket')}
                  >
                    <Smartphone className="h-5 w-5 mb-1" /> Rocket
                  </Button>
                  <Button 
                    variant={paymentMethod === 'bank' ? 'default' : 'outline'} 
                    className="flex-col h-16 text-[10px]"
                    onClick={() => setPaymentMethod('bank')}
                  >
                    <Building className="h-5 w-5 mb-1" /> Bank
                  </Button>
                </div>

                {paymentMethod && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                    <Label className="text-xs">Transaction ID</Label>
                    <p className="text-[10px] text-muted-foreground leading-tight">
                      Please send <strong>৳{spot.price * passengers}</strong> to:<br/>
                      <span className="text-primary font-bold">bKash/Rocket: 017XXXXXXXX</span> (Personal)<br/>
                      Then enter the 10-character Transaction ID (TrxID) below.
                    </p>
                    <Input 
                      placeholder="e.g. 8N7A6D5C4B" 
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className="uppercase"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="font-semibold">Total Price:</span>
                <span className="text-2xl font-bold text-primary">৳{spot.price * passengers}</span>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button 
                className="w-full h-12 text-lg rounded-xl" 
                disabled={isBooking}
                onClick={handleBooking}
              >
                {isBooking ? "Processing..." : "Confirm Booking"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

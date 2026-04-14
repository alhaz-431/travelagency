import { useEffect, useState } from "react";
import { 
  Card, 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Ticket, 
  Calendar, 
  Download,
  AlertCircle,
  Loader2
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { Booking } from "@/types";

export default function UserBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "bookings"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Booking[];
      setBookings(bookingsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching bookings:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
          <p className="text-muted-foreground">Manage your travel history and upcoming trips.</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export History
        </Button>
      </div>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {bookings.map((booking) => (
            <Card key={booking.id} className="border-none shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="bg-primary/5 p-6 flex items-center justify-center md:w-48">
                  <Ticket className="h-12 w-12 text-primary opacity-20" />
                </div>
                <div className="flex-1 p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{booking.spotName}</h3>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="h-3 w-3 mr-1" /> {booking.date}
                      </p>
                    </div>
                    <Badge variant={
                      booking.status === 'confirmed' ? 'default' : 
                      booking.status === 'pending' ? 'secondary' : 'destructive'
                    }>
                      {booking.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Booking ID</p>
                      <p className="font-semibold truncate">{booking.id}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Passengers</p>
                      <p className="font-semibold">{booking.passengers}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Payment</p>
                      <p className="font-semibold uppercase">{booking.paymentMethod}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Total Amount</p>
                      <p className="font-semibold text-primary">৳{booking.totalPrice}</p>
                    </div>
                  </div>

                  {booking.status === 'pending' && (
                    <div className="flex items-center p-3 bg-yellow-50 text-yellow-800 rounded-xl text-xs">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Your payment is being verified by our team. This usually takes 2-4 hours.
                    </div>
                  )}
                </div>
                <div className="p-6 border-t md:border-t-0 md:border-l flex flex-col justify-center gap-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  {booking.status === 'confirmed' && (
                    <Button size="sm">Download Ticket</Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed">
          <Ticket className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-20" />
          <p className="text-xl text-muted-foreground font-medium">No bookings found.</p>
          <Button variant="link" asChild>
            <Link to="/spots">Explore destinations to book your first trip</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

import { Link } from "react-router-dom";

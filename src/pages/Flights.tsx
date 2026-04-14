import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plane, Search, Calendar, MapPin } from "lucide-react";

export default function Flights() {
  const flights = [
    { id: 1, from: "Dhaka", to: "Cox's Bazar", price: 4500, time: "10:30 AM", airline: "Biman Bangladesh" },
    { id: 2, from: "Dhaka", to: "Sylhet", price: 3200, time: "02:15 PM", airline: "US-Bangla" },
    { id: 3, from: "Dhaka", to: "Chittagong", price: 3800, time: "09:00 AM", airline: "Novoair" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Search Flights</h1>
          <p className="text-muted-foreground">Find the best deals on domestic and international flights.</p>
        </div>

        <Card className="p-6 shadow-xl border-none bg-primary/5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9" placeholder="Departure City" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9" placeholder="Destination City" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9" type="date" />
              </div>
            </div>
            <div className="flex items-end">
              <Button className="w-full h-10">
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Available Flights</h2>
          {flights.map((flight) => (
            <Card key={flight.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Plane className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{flight.airline}</h3>
                    <p className="text-sm text-muted-foreground">{flight.from} to {flight.to}</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">৳{flight.price}</p>
                  <p className="text-sm text-muted-foreground">{flight.time}</p>
                </div>
                <Button variant="outline">Book Flight</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

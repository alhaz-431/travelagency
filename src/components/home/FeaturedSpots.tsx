import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const FEATURED_SPOTS = [
  {
    id: "1",
    name: "Cox's Bazar",
    location: "Chittagong, Bangladesh",
    price: 5000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=2074&auto=format&fit=crop",
    category: "Beach"
  },
  {
    id: "2",
    name: "Sajek Valley",
    location: "Rangamati, Bangladesh",
    price: 7500,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1623492701902-47dc207df5dc?q=80&w=2070&auto=format&fit=crop",
    category: "Mountain"
  },
  {
    id: "3",
    name: "Sylhet Tea Gardens",
    location: "Sylhet, Bangladesh",
    price: 4500,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=2070&auto=format&fit=crop",
    category: "Nature"
  }
];

export default function FeaturedSpots() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Featured Destinations</h2>
            <p className="text-muted-foreground">Handpicked spots for your next unforgettable journey.</p>
          </div>
          <Button variant="ghost" asChild>
            <Link to="/spots" className="flex items-center">
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_SPOTS.map((spot, index) => (
            <motion.div
              key={spot.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden group cursor-pointer border-none shadow-lg hover:shadow-xl transition-all">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={spot.image} 
                    alt={spot.name} 
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <Badge className="absolute top-4 left-4 bg-white/90 text-black hover:bg-white">
                    {spot.category}
                  </Badge>
                </div>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold">{spot.name}</CardTitle>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm font-semibold">{spot.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <MapPin className="h-3 w-3 mr-1" />
                    {spot.location}
                  </div>
                </CardHeader>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <div>
                    <span className="text-lg font-bold text-primary">৳{spot.price}</span>
                    <span className="text-xs text-muted-foreground ml-1">/ person</span>
                  </div>
                  <Button size="sm" asChild>
                    <Link to={`/spots/${spot.id}`}>Book Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

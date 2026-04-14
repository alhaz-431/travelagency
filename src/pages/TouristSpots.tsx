import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Filter, SlidersHorizontal } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Link } from "react-router-dom";

const ALL_SPOTS = [
  {
    id: "1",
    name: "Cox's Bazar",
    location: "Chittagong",
    price: 5000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=2074&auto=format&fit=crop",
    category: "Beach"
  },
  {
    id: "2",
    name: "Sajek Valley",
    location: "Rangamati",
    price: 7500,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1623492701902-47dc207df5dc?q=80&w=2070&auto=format&fit=crop",
    category: "Mountain"
  },
  {
    id: "3",
    name: "Sylhet Tea Gardens",
    location: "Sylhet",
    price: 4500,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=2070&auto=format&fit=crop",
    category: "Nature"
  },
  {
    id: "4",
    name: "Sundarbans",
    location: "Khulna",
    price: 12000,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1621849400072-f554417f7051?q=80&w=2070&auto=format&fit=crop",
    category: "Nature"
  },
  {
    id: "5",
    name: "Saint Martin's Island",
    location: "Cox's Bazar",
    price: 8000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2070&auto=format&fit=crop",
    category: "Beach"
  },
  {
    id: "6",
    name: "Lalbagh Fort",
    location: "Dhaka",
    price: 1500,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?q=80&w=2070&auto=format&fit=crop",
    category: "Historical"
  }
];

export default function TouristSpots() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filteredSpots = ALL_SPOTS.filter(spot => {
    const matchesSearch = spot.name.toLowerCase().includes(search.toLowerCase()) || 
                         spot.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || spot.category.toLowerCase() === category.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Explore Destinations</h1>
          <p className="text-muted-foreground">Find the perfect spot for your next getaway.</p>
        </div>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search destinations..." 
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="beach">Beach</SelectItem>
              <SelectItem value="mountain">Mountain</SelectItem>
              <SelectItem value="nature">Nature</SelectItem>
              <SelectItem value="historical">Historical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredSpots.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSpots.map((spot) => (
            <Card key={spot.id} className="overflow-hidden group border-none shadow-md hover:shadow-xl transition-all">
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
                  <Link to={`/spots/${spot.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">No destinations found matching your criteria.</p>
          <Button variant="link" onClick={() => { setSearch(""); setCategory("all"); }}>
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}

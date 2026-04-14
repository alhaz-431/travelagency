import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-referrer"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')",
          referrerPolicy: "no-referrer"
        } as any}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto h-full flex flex-col justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            Discover Your Next <span className="text-primary italic">Adventure</span>
          </h1>
          <p className="text-xl text-white/90 max-w-xl">
            Book flights, hotels, and explore the most beautiful tourist spots in Bangladesh and beyond.
          </p>

          {/* Search Bar */}
          <div className="bg-white p-4 rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center">
                <MapPin className="h-3 w-3 mr-1" /> Destination
              </label>
              <Input placeholder="Where to?" className="border-none bg-muted/50 focus-visible:ring-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center">
                <Calendar className="h-3 w-3 mr-1" /> Date
              </label>
              <Input type="date" className="border-none bg-muted/50 focus-visible:ring-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center">
                <Users className="h-3 w-3 mr-1" /> Travelers
              </label>
              <Input type="number" placeholder="1" min="1" className="border-none bg-muted/50 focus-visible:ring-primary" />
            </div>
            <Button className="w-full h-10 rounded-xl">
              <Search className="h-4 w-4 mr-2" /> Search
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

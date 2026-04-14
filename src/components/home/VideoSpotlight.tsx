import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

const VIDEOS = [
  {
    id: "1",
    title: "The Beauty of Saint Martin",
    thumbnail: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2070&auto=format&fit=crop",
    duration: "2:45"
  },
  {
    id: "2",
    title: "Sundarbans Expedition",
    thumbnail: "https://images.unsplash.com/photo-1621849400072-f554417f7051?q=80&w=2070&auto=format&fit=crop",
    duration: "3:12"
  }
];

export default function VideoSpotlight() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Experience Before You Go</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Take a virtual tour of some of the most breathtaking locations in Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VIDEOS.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group rounded-3xl overflow-hidden shadow-xl aspect-video"
            >
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex flex-col items-center justify-center">
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/40 transition-all scale-100 group-hover:scale-110"
                >
                  <Play className="h-8 w-8 text-white fill-current" />
                </Button>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold">{video.title}</h3>
                  <span className="text-sm opacity-80">{video.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

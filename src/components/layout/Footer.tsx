import { Plane, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Plane className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">TravelEase</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted partner for seamless travel experiences. Explore the world with confidence and ease.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/spots" className="hover:text-primary">Tourist Spots</Link></li>
              <li><Link to="/flights" className="hover:text-primary">Flight Bookings</Link></li>
              <li><Link to="/hotels" className="hover:text-primary">Hotel Reservations</Link></li>
              <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/contact" className="hover:text-primary">Contact Support</Link></li>
              <li><Link to="/faq" className="hover:text-primary">FAQs</Link></li>
              <li><Link to="/terms" className="hover:text-primary">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@travelease.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+880 1234 567890</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} TravelEase Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

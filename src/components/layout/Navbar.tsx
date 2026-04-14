import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Plane, 
  User, 
  LogOut, 
  Menu, 
  X,
  History,
  LayoutDashboard,
  Download
} from "lucide-react";
import { useState } from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <Plane className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight font-serif">TravelEase</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/spots" className="text-sm font-medium transition-colors hover:text-primary">
            Explore
          </Link>
          <Link to="/flights" className="text-sm font-medium transition-colors hover:text-primary">
            Flights
          </Link>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="hidden lg:flex rounded-xl border-primary text-primary hover:bg-primary/5">
                <Download className="mr-2 h-4 w-4" /> Download App
              </Button>
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-offset-background transition-all hover:ring-2 hover:ring-primary/20">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.photoURL} alt={user.displayName} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {user.displayName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium">{user.displayName}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuItem asChild className="rounded-lg">
                  <Link to="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg">
                  <Link to="/bookings" className="flex items-center">
                    <History className="mr-2 h-4 w-4" />
                    My Bookings
                  </Link>
                </DropdownMenuItem>
                {user.role === 'admin' && (
                  <DropdownMenuItem asChild className="rounded-lg">
                    <Link to="/admin" className="flex items-center">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Admin Panel
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem 
                  className="text-destructive rounded-lg focus:bg-destructive/10 focus:text-destructive"
                  onClick={() => logout()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Button variant="ghost" asChild className="rounded-xl">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="rounded-xl px-6">
                <Link to="/register">Join Now</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t p-4 space-y-4 bg-background">
          <Link to="/spots" className="block text-sm font-medium" onClick={() => setIsOpen(false)}>
            Tourist Spots
          </Link>
          <Link to="/flights" className="block text-sm font-medium" onClick={() => setIsOpen(false)}>
            Flights
          </Link>
          <Link to="/hotels" className="block text-sm font-medium" onClick={() => setIsOpen(false)}>
            Hotels
          </Link>
          {user ? (
            <>
              <Link to="/bookings" className="block text-sm font-medium" onClick={() => setIsOpen(false)}>
                My Bookings
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="block text-sm font-medium" onClick={() => setIsOpen(false)}>
                  Admin Dashboard
                </Link>
              )}
              <Button variant="destructive" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </>
          ) : (
            <div className="flex flex-col space-y-2">
              <Button variant="outline" asChild onClick={() => setIsOpen(false)}>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild onClick={() => setIsOpen(false)}>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

import { 
  LayoutDashboard, 
  Users, 
  MapPin, 
  Ticket, 
  Settings, 
  LogOut,
  MessageSquare
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Overview", path: "/admin" },
  { icon: Ticket, label: "Bookings", path: "/admin/bookings" },
  { icon: MapPin, label: "Destinations", path: "/admin/spots" },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: MessageSquare, label: "Support", path: "/admin/support" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

export default function AdminSidebar() {
  const location = useLocation();

  return (
    <div className="w-64 border-r bg-muted/30 h-[calc(100vh-4rem)] flex flex-col">
      <div className="p-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Admin Panel</h2>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors",
              location.pathname === item.path 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
        <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-destructive rounded-xl hover:bg-destructive/10 transition-colors">
          <LogOut className="mr-3 h-5 w-5" />
          Log out
        </button>
      </div>
    </div>
  );
}

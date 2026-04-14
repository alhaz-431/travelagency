import { useEffect, useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Ticket, 
  TrendingUp, 
  DollarSign,
  MoreHorizontal,
  Check,
  X,
  Loader2
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { Booking } from "@/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Booking[];
      setBookings(bookingsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, "bookings", id), { status });
      toast.success(`Booking ${status} successfully`);
    } catch (error: any) {
      toast.error("Failed to update booking: " + error.message);
    }
  };

  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const STATS = [
    { label: "Total Revenue", value: `৳${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-green-600" },
    { label: "Active Bookings", value: bookings.length.toString(), icon: Ticket, color: "text-blue-600" },
    { label: "Pending Verification", value: bookings.filter(b => b.status === 'pending').length.toString(), icon: Users, color: "text-orange-600" },
    { label: "Confirmed Trips", value: bookings.filter(b => b.status === 'confirmed').length.toString(), icon: TrendingUp, color: "text-purple-600" },
  ];

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-8 space-y-8 overflow-y-auto h-[calc(100vh-4rem)]">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <Button variant="outline">Download Reports</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <Card key={stat.label} className="border-none shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <stat.icon className={cn("h-4 w-4", stat.color)} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Manage and verify passenger bookings and payments.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>TrxID</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium truncate max-w-[100px]">{booking.id}</TableCell>
                    <TableCell>{booking.spotName}</TableCell>
                    <TableCell>৳{booking.totalPrice}</TableCell>
                    <TableCell>
                      <Badge variant={
                        booking.status === 'confirmed' ? 'default' : 
                        booking.status === 'pending' ? 'secondary' : 'destructive'
                      }>
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{booking.transactionId}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            className="text-green-600"
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          >
                            <Check className="mr-2 h-4 w-4" /> Confirm
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                          >
                            <X className="mr-2 h-4 w-4" /> Cancel
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

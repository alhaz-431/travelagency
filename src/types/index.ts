export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'admin' | 'manager' | 'passenger';
  createdAt: string;
}

export interface TouristSpot {
  id: string;
  name: string;
  description: string;
  location: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  videoUrl?: string;
  category: 'adventure' | 'beach' | 'mountain' | 'city' | 'historical';
}

export interface Booking {
  id: string;
  userId: string;
  spotId: string;
  spotName: string;
  date: string;
  passengers: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid';
  paymentMethod?: 'bkash' | 'rocket' | 'bank';
  transactionId?: string;
  idCardImage?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  spotId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

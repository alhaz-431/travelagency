import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Github, Mail } from "lucide-react";
import { toast } from "sonner";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      
      // Create user document in Firestore
      const isAdmin = email.toLowerCase() === "mohammadalhaz431@gmail.com";
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: name,
        role: isAdmin ? "admin" : "passenger",
        createdAt: new Date().toISOString()
      });

      toast.success("Account created successfully!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container relative min-h-[calc(100vh-4rem)] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Plane className="mr-2 h-6 w-6" />
          TravelEase
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Join thousands of travelers who trust TravelEase for their adventures. Get exclusive deals and personalized recommendations.&rdquo;
            </p>
            <footer className="text-sm">The TravelEase Team</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to create your account
            </p>
          </div>
          <Card className="border-none shadow-none">
            <form onSubmit={handleRegister}>
              <CardContent className="grid gap-4 p-0">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="m@example.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button className="w-full" type="submit" disabled={loading}>
                  {loading ? "Creating account..." : "Register"}
                </Button>
              </CardContent>
            </form>
          </Card>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" type="button" disabled={loading}>
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline" type="button" disabled={loading}>
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="underline underline-offset-4 hover:text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

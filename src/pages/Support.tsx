import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

export default function Support() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! Our support team will contact you soon.");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Customer Support</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions or need help with your booking? Our team is here for you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-none shadow-md text-center p-6 space-y-4">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold">Email Us</h3>
            <p className="text-sm text-muted-foreground">support@travelease.com</p>
          </Card>
          <Card className="border-none shadow-md text-center p-6 space-y-4">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold">Call Us</h3>
            <p className="text-sm text-muted-foreground">+880 1234 567890</p>
          </Card>
          <Card className="border-none shadow-md text-center p-6 space-y-4">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold">Live Chat</h3>
            <p className="text-sm text-muted-foreground">Available 24/7</p>
          </Card>
        </div>

        <Card className="border-none shadow-xl max-w-2xl mx-auto overflow-hidden">
          <CardHeader className="bg-primary text-primary-foreground p-8">
            <CardTitle>Send us a message</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Fill out the form below and we'll get back to you within 2 hours.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your Name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your Email" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Describe your issue..." className="min-h-[150px]" required />
              </div>
              <Button type="submit" className="w-full h-12 text-lg rounded-xl">
                <Send className="mr-2 h-5 w-5" /> Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

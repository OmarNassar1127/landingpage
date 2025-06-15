"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Send, Building, Users, Clock } from "lucide-react";
import { Icon } from "@/components/ui/icon";

export default function WorkshopContact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    teamSize: "",
    workshopType: "",
    timeline: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formspree.io/f/xldjpybw", {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: new FormData(e.target as HTMLFormElement)
      });
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error state here if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className="mt-8">
        <Card className="text-center p-8 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
          <CardContent className="space-y-4">
            <Icon icon={CheckCircle} className="h-16 w-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-bold text-green-700 dark:text-green-300">
              Workshop Inquiry Received!
            </h2>
            <p className="text-green-600 dark:text-green-400">
              Thank you for your interest in our AI workshop. We'll contact you within 24 hours to discuss your requirements and schedule your first meeting or consultation.
            </p>
            <Button 
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: "",
                  email: "",
                  company: "",
                  role: "",
                  teamSize: "",
                  workshopType: "",
                  timeline: "",
                  message: "",
                });
              }}
              variant="outline"
              className="mt-4"
            >
              Submit Another Inquiry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-4">
          Request Your Custom Workshop Proposal
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Tell us about your team and objectives, and we'll contact you within 24 hours to discuss your requirements and schedule your first meeting.
        </p>
      </div>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon icon={Building} className="h-5 w-5 text-primary" />
            Workshop Information Request
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            {/* Company Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  Company/Organization *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  placeholder="Acme Corp"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium mb-2">
                  Your Role *
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  placeholder="CTO, Manager, etc."
                />
              </div>
            </div>

            {/* Workshop Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="teamSize" className="block text-sm font-medium mb-2">
                  Expected Participants *
                </label>
                <select
                  id="teamSize"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                >
                  <option value="">Select team size</option>
                  <option value="5-10">5-10 people</option>
                  <option value="10-20">10-20 people</option>
                  <option value="20-50">20-50 people</option>
                  <option value="50+">50+ people</option>
                </select>
              </div>

              <div>
                <label htmlFor="workshopType" className="block text-sm font-medium mb-2">
                  Preferred Workshop Format *
                </label>
                <select
                  id="workshopType"
                  name="workshopType"
                  value={formData.workshopType}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                >
                  <option value="">Select format</option>
                  <option value="half-day">Half-day Introduction (4 hours)</option>
                  <option value="full-day">Full Day Intensive (8 hours)</option>
                  <option value="multi-day">Multi-day Program (2-5 days)</option>
                  <option value="custom">Custom Format</option>
                </select>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <label htmlFor="timeline" className="block text-sm font-medium mb-2">
                Preferred Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              >
                <option value="">Select timeline</option>
                <option value="asap">As soon as possible</option>
                <option value="1-month">Within 1 month</option>
                <option value="2-3-months">2-3 months</option>
                <option value="6-months">Within 6 months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Specific Requirements & Goals
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                placeholder="Tell us about your specific AI challenges, goals, and what you hope to achieve with the workshop..."
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white dark:text-black"
            >
              {isSubmitting ? (
                <>
                  <Icon icon={Clock} className="h-4 w-4 mr-2 animate-spin" />
                  Sending Request...
                </>
              ) : (
                <>
                  <Icon icon={Send} className="h-4 w-4 mr-2" />
                  Request Workshop Proposal
                </>
              )}
            </Button>
          </form>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold mb-2">What happens next?</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• <strong>Within 24 hours:</strong> We'll contact you to discuss your needs</li>
              <li>• <strong>First meeting:</strong> We'll understand your goals and team requirements</li>
              <li>• <strong>Custom proposal:</strong> You'll receive a tailored workshop plan</li>
              <li>• <strong>Workshop scheduling:</strong> Dates confirmed based on your availability</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
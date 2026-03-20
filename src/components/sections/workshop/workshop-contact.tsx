"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Send, Building, Clock } from "lucide-react";
import { Icon } from "@/components/ui/icon";

export default function WorkshopContact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    teamSize: "",
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
          Accept: "application/json",
        },
        body: new FormData(e.target as HTMLFormElement),
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
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
            <Icon
              icon={CheckCircle}
              className="h-16 w-16 text-green-500 mx-auto"
            />
            <h2 className="text-2xl font-bold text-green-700 dark:text-green-300">
              {t.workshop.contactForm.successTitle}
            </h2>
            <p className="text-green-600 dark:text-green-400">
              {t.workshop.contactForm.successMessage}
            </p>
            <Button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: "",
                  email: "",
                  company: "",
                  teamSize: "",
                });
              }}
              variant="outline"
              className="mt-4"
            >
              {t.workshop.contactForm.submitAnother}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-8 max-w-lg mx-auto">
      {/* Logo + title */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <img src="/favicon-96x96.png" alt="Virelio logo" className="h-12 w-12 rounded-lg" />
        </div>
        <h3 className="text-2xl font-bold mb-2">
          {t.workshop.contactForm.title}
        </h3>
        <p className="text-muted-foreground text-sm">
          {t.workshop.contactForm.subtitle}
        </p>
      </div>

      <Card className="border-primary/20">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2"
              >
                {t.workshop.contactForm.name} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                placeholder={t.workshop.contactForm.namePlaceholder}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2"
              >
                {t.workshop.contactForm.email} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                placeholder={t.workshop.contactForm.emailPlaceholder}
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium mb-2"
              >
                {t.workshop.contactForm.company} *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                placeholder={t.workshop.contactForm.companyPlaceholder}
              />
            </div>

            <div>
              <label
                htmlFor="teamSize"
                className="block text-sm font-medium mb-2"
              >
                {t.workshop.contactForm.teamSize} *
              </label>
              <select
                id="teamSize"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              >
                <option value="">
                  {t.workshop.contactForm.selectTeamSize}
                </option>
                <option value="5-10">
                  {t.workshop.contactForm.teamSizeOptions.small}
                </option>
                <option value="10-20">
                  {t.workshop.contactForm.teamSizeOptions.medium}
                </option>
                <option value="20-50">
                  {t.workshop.contactForm.teamSizeOptions.large}
                </option>
                <option value="50+">
                  {t.workshop.contactForm.teamSizeOptions.xlarge}
                </option>
              </select>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white dark:text-black text-sm sm:text-base px-3 py-2"
            >
              {isSubmitting ? (
                <>
                  <Icon
                    icon={Clock}
                    className="h-4 w-4 mr-1 sm:mr-2 animate-spin"
                  />
                  <span className="text-sm sm:text-base">
                    {t.workshop.contactForm.submittingButton}
                  </span>
                </>
              ) : (
                <>
                  <Icon icon={Send} className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="text-sm sm:text-base">
                    {t.workshop.contactForm.submitButton}
                  </span>
                </>
              )}
            </Button>
          </form>


        </CardContent>
      </Card>
    </div>
  );
}

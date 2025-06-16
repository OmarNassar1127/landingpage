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
              {t.workshop.contactForm.submitAnother}
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
          {t.workshop.contactForm.title}
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t.workshop.contactForm.subtitle}
        </p>
      </div>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon icon={Building} className="h-5 w-5 text-primary" />
            {t.workshop.contactForm.formTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            {/* Company Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  htmlFor="role"
                  className="block text-sm font-medium mb-2"
                >
                  {t.workshop.contactForm.role} *
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  placeholder={t.workshop.contactForm.rolePlaceholder}
                />
              </div>
            </div>

            {/* Workshop Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div>
                <label
                  htmlFor="workshopType"
                  className="block text-sm font-medium mb-2"
                >
                  {t.workshop.contactForm.workshopType} *
                </label>
                <select
                  id="workshopType"
                  name="workshopType"
                  value={formData.workshopType}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                >
                  <option value="">
                    {t.workshop.contactForm.selectFormat}
                  </option>
                  <option value="half-day">
                    {t.workshop.contactForm.formatOptions.halfDay}
                  </option>
                  <option value="full-day">
                    {t.workshop.contactForm.formatOptions.fullDay}
                  </option>
                  <option value="multi-day">
                    {t.workshop.contactForm.formatOptions.multiDay}
                  </option>
                  <option value="custom">
                    {t.workshop.contactForm.formatOptions.custom}
                  </option>
                </select>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <label
                htmlFor="timeline"
                className="block text-sm font-medium mb-2"
              >
                {t.workshop.contactForm.timeline}
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              >
                <option value="">
                  {t.workshop.contactForm.selectTimeline}
                </option>
                <option value="asap">
                  {t.workshop.contactForm.timelineOptions.asap}
                </option>
                <option value="1-month">
                  {t.workshop.contactForm.timelineOptions.oneMonth}
                </option>
                <option value="2-3-months">
                  {t.workshop.contactForm.timelineOptions.twoThreeMonths}
                </option>
                <option value="6-months">
                  {t.workshop.contactForm.timelineOptions.sixMonths}
                </option>
                <option value="flexible">
                  {t.workshop.contactForm.timelineOptions.flexible}
                </option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                {t.workshop.contactForm.message}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                placeholder={t.workshop.contactForm.messagePlaceholder}
              />
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

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold mb-2">
              {t.workshop.contactForm.whatNext}
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-none">
              <li className="flex">
                <span className="mr-2">•</span>
                <strong>{t.workshop.contactForm.nextSteps.contact}</strong>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <strong>{t.workshop.contactForm.nextSteps.meeting}</strong>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <strong>{t.workshop.contactForm.nextSteps.proposal}</strong>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <strong>{t.workshop.contactForm.nextSteps.scheduling}</strong>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

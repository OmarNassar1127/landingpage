"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { Icon } from "@/components/ui/icon";

export default function WorkshopTestimonials() {
  const { t } = useLanguage();

  const TestimonialCard = ({
    text,
    author,
    role,
  }: {
    text: string;
    author: string;
    role: string;
  }) => {
    return (
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 border-primary/10">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4">
            <Icon icon={Quote} className="h-8 w-8 text-primary" />
            <blockquote className="text-muted-foreground font-normal italic leading-relaxed">
              "{text}"
            </blockquote>
            <div className="border-t border-primary/10 pt-4">
              <div className="font-semibold">{author}</div>
              <div className="text-sm text-muted-foreground">{role}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
          {t.workshop.testimonials.sectionTitle}
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-normal">
          {t.workshop.testimonials.sectionSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TestimonialCard
          text={t.workshop.testimonials.testimonial1.text}
          author={t.workshop.testimonials.testimonial1.author}
          role={t.workshop.testimonials.testimonial1.role}
        />

        <TestimonialCard
          text={t.workshop.testimonials.testimonial2.text}
          author={t.workshop.testimonials.testimonial2.author}
          role={t.workshop.testimonials.testimonial2.role}
        />

        <TestimonialCard
          text={t.workshop.testimonials.testimonial3.text}
          author={t.workshop.testimonials.testimonial3.author}
          role={t.workshop.testimonials.testimonial3.role}
        />
      </div>
    </section>
  );
}
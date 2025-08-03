"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LinkedinIcon, MapPin, Calendar, Mail, Download } from "lucide-react";

interface ZzpProfilesProps {
  isEnglish?: boolean;
}

export default function ZzpProfiles({ isEnglish = false }: ZzpProfilesProps) {
  const content = isEnglish ? {
    sectionTitle: "Meet Our Team",
    sectionSubtitle: "Experienced freelance developers ready to tackle your next project",
    linkedinButton: "View LinkedIn Profile",
    contactButton: "Contact",
    age: "years old",
    location: "Amsterdam, Netherlands",
    omar: {
      name: "Omar Nassar",
      role: "Backend Developer & AI Specialist",
      experience: "5+ years experience",
      bio: "Results-driven Software Developer with expertise in full-stack development, AI integration, and financial technology. Proven ability to architect scalable platforms and implement AI-powered solutions that drive operational efficiency.",
      highlights: [
        "Medical device automation & healthcare systems",
        "Machine learning algorithms for enterprise applications",
        "Advanced scraping algorithms for large companies",
        "Mobile app development with React Native",
        "E-commerce automation solutions",
        "KYC integration systems for fintech",
        "AI-driven optimization systems"
      ],
      skills: {
        backend: ["PHP", "Laravel", "Python", "C++"],
        frontend: ["ReactJS", "React Native", "TypeScript", "Next.js"],
        databases: ["MySQL", "PostgreSQL", "Supabase", "MongoDB"],
        specialties: ["AI/ML", "Machine Learning", "API Integration", "Automation"]
      },
      companies: [
        "Vloto B.V. - Backend Developer (2023-present)",
        "Quotum Consultancy - Founder (2023-present)", 
        "Freelance/ZZP - Software Developer (2021-present)",
        "CS Digital Media - Frontend Developer (2020-2021)"
      ]
    },
    robin: {
      name: "Robin Bril",
      role: "Business Analyst & Data Specialist",
      experience: "5+ years experience",
      bio: "Cum Laude Business Administration graduate with strong background in data analysis, project management, and process optimization. Experience with SQL, Python, machine learning, and BI dashboard development.",
      highlights: [
        "Business Intelligence dashboards (Looker, SQL, BigQuery)",
        "Data analysis and machine learning projects",
        "Process optimization with €40,000+ cost savings", 
        "SQL, Python and data visualization expertise",
        "Lean Six Sigma Green Belt certification",
        "Project management and stakeholder communication",
        "Winner national ROI competition Netherlands"
      ],
      skills: {
        backend: ["SQL", "Python", "BigQuery", "Database Management"],
        frontend: ["Tableau", "Power BI", "Looker", "Dashboard Development"],
        databases: ["SQL Server", "MySQL", "PostgreSQL", "MongoDB"],
        specialties: ["Business Intelligence", "Data Analysis", "Process Optimization"]
      },
      companies: [
        "Capgemini - Business Analyst (2024-present)",
        "Road - Business Analyst (2023-2024)",
        "Road - Traineeship Process Management (2022-2023)",
        "SBB - Traineeship Process Management (2021-2022)"
      ]
    }
  } : {
    sectionTitle: "Ontmoet Ons Team",
    sectionSubtitle: "Ervaren freelance ontwikkelaars klaar om jouw volgende project aan te pakken",
    linkedinButton: "Bekijk LinkedIn Profiel",
    contactButton: "Contact",
    age: "jaar oud",
    location: "Amsterdam, Nederland",
    omar: {
      name: "Omar Nassar",
      role: "Backend Developer & AI Specialist",
      experience: "5+ jaar ervaring",
      bio: "Results-driven Software Developer met expertise in full-stack development, AI-integratie en financial technology. Bewezen vermogen om schaalbare platforms te architecteren en AI-oplossingen te implementeren die operationele efficiëntie verbeteren.",
      highlights: [
        "Medical device automatisation & healthcare systems",
        "Machine learning algoritmes voor enterprise toepassingen",
        "Advanced scraping algoritmes voor grote bedrijven",
        "Mobile app ontwikkeling met React Native",
        "E-commerce automatiseringsoplossingen",
        "KYC integratiesystemen voor fintech",
        "AI-gestuurde optimalisatiesystemen"
      ],
      skills: {
        backend: ["PHP", "Laravel", "Python", "C++"],
        frontend: ["ReactJS", "React Native", "TypeScript", "Next.js"],
        databases: ["MySQL", "PostgreSQL", "Supabase", "MongoDB"],
        specialties: ["AI/ML", "Machine Learning", "API Integratie", "Automatisering"]
      },
      companies: [
        "Vloto B.V. - Backend Developer (2023-heden)",
        "Quotum Consultancy - Oprichter (2023-heden)",
        "Freelance/ZZP - Software Developer (2021-heden)", 
        "CS Digital Media - Frontend Developer (2020-2021)"
      ]
    },
    robin: {
      name: "Robin Bril",
      role: "Business Analyst & Data Specialist",
      experience: "5+ jaar ervaring",
      bio: "Cum Laude Business Administration afgestudeerd met sterke achtergrond in data-analyse, projectmanagement en procesoptimalisatie. Ervaring met SQL, Python, machine learning en BI dashboard ontwikkeling.",
      highlights: [
        "Business Intelligence dashboards (Looker, SQL, BigQuery)",
        "Data-analyse en machine learning projecten",
        "Procesoptimalisatie met €40.000+ kostenbesparingen", 
        "SQL, Python en data visualization expertise",
        "Lean Six Sigma Green Belt certificering",
        "Projectmanagement en stakeholder communicatie",
        "Winnaar nationale ROI competitie Nederland"
      ],
      skills: {
        backend: ["SQL", "Python", "BigQuery", "Database Management"],
        frontend: ["Tableau", "Power BI", "Looker", "Dashboard Development"],
        databases: ["SQL Server", "MySQL", "PostgreSQL", "MongoDB"],
        specialties: ["Business Intelligence", "Data Analysis", "Process Optimization"]
      },
      companies: [
        "Capgemini - Business Analyst (2024-heden)",
        "Road - Business Analyst (2023-2024)",
        "Road - Traineeship Process Management (2022-2023)",
        "SBB - Traineeship Process Management (2021-2022)"
      ]
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="profiles" className="py-24 px-4 md:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {content.sectionTitle}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {content.sectionSubtitle}
          </p>
        </motion.div>

        {/* Profiles Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12"
        >
          {/* Omar's Profile */}
          <motion.div variants={cardVariants}>
            <Card className="h-full border-white/20 bg-white/90 backdrop-blur-xl shadow-2xl hover:shadow-3xl hover:bg-white/95 transition-all duration-500 ease-out">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
                  {/* Mobile: Image centered at top */}
                  <div className="flex flex-col items-center sm:items-start gap-3 sm:gap-0">
                    <div className="relative">
                      <img
                        src="/images/contact/omar_linkedin.jpeg"
                        alt="Omar Nassar - Backend Developer & AI Specialist"
                        className="w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover object-center shadow-lg border-2 sm:border-4 border-white"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    {/* Mobile: Name and role below image */}
                    <div className="text-center sm:hidden">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 tracking-tight">{content.omar.name}</h3>
                      <p className="text-sm text-gray-700 font-medium">{content.omar.role}</p>
                    </div>
                  </div>

                  <div className="flex-1">
                    {/* Desktop: Name and role with LinkedIn button */}
                    <div className="hidden sm:flex sm:items-start sm:justify-between gap-3 mb-2">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">{content.omar.name}</h3>
                        <p className="text-lg text-gray-700 font-medium">{content.omar.role}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-500 bg-gray-50 self-start"
                        asChild
                      >
                        <a 
                          href="https://www.linkedin.com/in/omar-nassar-93a176155/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <LinkedinIcon className="h-4 w-4" />
                          <span>LinkedIn</span>
                        </a>
                      </Button>
                    </div>

                    {/* Age, location and mobile LinkedIn */}
                    <div className="flex items-start justify-center sm:justify-start gap-3">
                      <div className="flex flex-col gap-1 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 flex-shrink-0 text-gray-500" />
                          <span>26 {content.age}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 flex-shrink-0 text-gray-500" />
                          <span className="truncate">{content.location}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-500 bg-gray-50 sm:hidden"
                        asChild
                      >
                        <a 
                          href="https://www.linkedin.com/in/omar-nassar-93a176155/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <LinkedinIcon className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Experience Badge */}
                <Badge variant="outline" className="mb-6 text-xs border-gray-300 text-gray-700">
                  {content.omar.experience}
                </Badge>

                {/* Bio */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {content.omar.bio}
                </p>

                {/* Key Highlights */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">{isEnglish ? "Key Projects & Achievements" : "Belangrijkste Projecten & Prestaties"}</h4>
                  <ul className="space-y-2">
                    {content.omar.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4">{isEnglish ? "Technical Skills" : "Technische Vaardigheden"}</h4>
                  <div className="space-y-3">
                    {Object.entries(content.omar.skills).map(([category, skills]) => (
                      <div key={category}>
                        <p className="text-sm font-medium text-gray-800 mb-2 capitalize">{category}:</p>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-gray-300 text-gray-700">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-3">{isEnglish ? "Experience" : "Ervaring"}</h4>
                  <ul className="space-y-2">
                    {content.omar.companies.map((company, index) => (
                      <li key={index} className="text-sm text-gray-700">
                        {company}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-3">
                  <Button
                    size="sm"
                    onClick={scrollToContact}
                    className="bg-gray-900 hover:bg-gray-800 text-white px-8 font-medium"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    {content.contactButton}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-300 text-gray-500 bg-gray-50"
                    asChild
                  >
                    <a 
                      href="/founders/Omar Nassar Resume NL.pdf" 
                      download="Omar_Nassar_CV.pdf"
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Download CV</span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Robin's Profile */}
          <motion.div variants={cardVariants}>
            <Card className="h-full border-white/20 bg-white/90 backdrop-blur-xl shadow-2xl hover:shadow-3xl hover:bg-white/95 transition-all duration-500 ease-out">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
                  {/* Mobile: Image centered at top */}
                  <div className="flex flex-col items-center sm:items-start gap-3 sm:gap-0">
                    <div className="relative">
                      <img
                        src="/images/contact/robin.jpeg"
                        alt="Robin Bril - Business Analyst & Data Specialist"
                        className="w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover object-center shadow-lg border-2 sm:border-4 border-white"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    {/* Mobile: Name and role below image */}
                    <div className="text-center sm:hidden">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 tracking-tight">{content.robin.name}</h3>
                      <p className="text-sm text-gray-700 font-medium">{content.robin.role}</p>
                    </div>
                  </div>

                  <div className="flex-1">
                    {/* Desktop: Name and role with LinkedIn button */}
                    <div className="hidden sm:flex sm:items-start sm:justify-between gap-3 mb-2">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">{content.robin.name}</h3>
                        <p className="text-lg text-gray-700 font-medium">{content.robin.role}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-500 bg-gray-50 self-start"
                        asChild
                      >
                        <a 
                          href="https://www.linkedin.com/in/robin-bril" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <LinkedinIcon className="h-4 w-4" />
                          <span>LinkedIn</span>
                        </a>
                      </Button>
                    </div>

                    {/* Age, location and mobile LinkedIn */}
                    <div className="flex items-start justify-center sm:justify-start gap-3">
                      <div className="flex flex-col gap-1 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 flex-shrink-0 text-gray-500" />
                          <span>25 {content.age}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 flex-shrink-0 text-gray-500" />
                          <span className="truncate">{content.location}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-500 bg-gray-50 sm:hidden"
                        asChild
                      >
                        <a 
                          href="https://www.linkedin.com/in/robin-bril" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <LinkedinIcon className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Experience Badge */}
                <Badge variant="outline" className="mb-6 text-xs border-gray-300 text-gray-700">
                  {content.robin.experience}
                </Badge>

                {/* Bio */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {content.robin.bio}
                </p>

                {/* Key Highlights */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">{isEnglish ? "Key Projects & Achievements" : "Belangrijkste Projecten & Prestaties"}</h4>
                  <ul className="space-y-2">
                    {content.robin.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4">{isEnglish ? "Technical Skills" : "Technische Vaardigheden"}</h4>
                  <div className="space-y-3">
                    {Object.entries(content.robin.skills).map(([category, skills]) => (
                      <div key={category}>
                        <p className="text-sm font-medium text-gray-800 mb-2 capitalize">{category}:</p>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-gray-300 text-gray-700">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-3">{isEnglish ? "Experience" : "Ervaring"}</h4>
                  <ul className="space-y-2">
                    {content.robin.companies.map((company, index) => (
                      <li key={index} className="text-sm text-gray-700">
                        {company}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-3">
                  <Button
                    size="sm"
                    onClick={scrollToContact}
                    className="bg-gray-900 hover:bg-gray-800 text-white px-8 font-medium"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    {content.contactButton}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-300 text-gray-500 bg-gray-50"
                    asChild
                  >
                    <a 
                      href="/founders/CV_Robin_Bril.pdf" 
                      download="Robin_Bril_CV.pdf"
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Download CV</span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
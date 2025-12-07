"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { Button } from "@/components/ui/button";
import { X, Sparkles, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DemoRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DemoRequestModal({ isOpen, onClose }: DemoRequestModalProps) {
    const { language } = useLanguage();
    const [formData, setFormData] = useState({
        currentState: "",
        challenges: "",
        goals: "",
        email: "",
        company: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Create mailto link with form data
        const subject = encodeURIComponent("Demo Request - Virelio");
        const body = encodeURIComponent(`
Nieuwe Demo Aanvraag:

Bedrijf: ${formData.company}
Email: ${formData.email}

1. Waar staan jullie nu met AI?
${formData.currentState}

2. Waar lopen jullie tegenaan?
${formData.challenges}

3. Waar willen jullie heengaan?
${formData.goals}
    `);

        // Open mailto
        window.location.href = `mailto:robin.bril@gmail.com?subject=${subject}&body=${body}`;

        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setTimeout(() => {
                onClose();
                setIsSubmitted(false);
                setFormData({ currentState: "", challenges: "", goals: "", email: "", company: "" });
            }, 2000);
        }, 1000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-card border border-border rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            {/* Header */}
                            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground">
                                        {language === 'nl' ? 'Vraag je gratis demo aan' : 'Request your free demo'}
                                    </h2>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {language === 'nl'
                                            ? 'Vertel ons over je AI-ambities'
                                            : 'Tell us about your AI ambitions'}
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {!isSubmitted ? (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {/* Company */}
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                {language === 'nl' ? 'Bedrijfsnaam' : 'Company name'}
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.company}
                                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                                placeholder={language === 'nl' ? 'Jouw bedrijf' : 'Your company'}
                                            />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                                placeholder="naam@bedrijf.nl"
                                            />
                                        </div>

                                        {/* Question 1 */}
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                {language === 'nl' ? '1. Waar staan jullie nu met AI?' : '1. Where are you now with AI?'}
                                            </label>
                                            <textarea
                                                required
                                                value={formData.currentState}
                                                onChange={(e) => setFormData({ ...formData, currentState: e.target.value })}
                                                rows={3}
                                                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                                                placeholder={language === 'nl' ? 'Bijv. "Nog niet begonnen" of "Al enkele tools"' : 'E.g. "Not started yet" or "Already using some tools"'}
                                            />
                                        </div>

                                        {/* Question 2 */}
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                {language === 'nl' ? '2. Waar lopen jullie tegenaan?' : '2. What challenges are you facing?'}
                                            </label>
                                            <textarea
                                                required
                                                value={formData.challenges}
                                                onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                                                rows={3}
                                                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                                                placeholder={language === 'nl' ? 'Bijv. "Te veel handmatig werk" of "Geen kennis"' : 'E.g. "Too much manual work" or "No expertise"'}
                                            />
                                        </div>

                                        {/* Question 3 */}
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                {language === 'nl' ? '3. Waar willen jullie heengaan?' : '3. Where do you want to go?'}
                                            </label>
                                            <textarea
                                                required
                                                value={formData.goals}
                                                onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                                                rows={3}
                                                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                                                placeholder={language === 'nl' ? 'Bijv. "Processen automatiseren" of "AI assistenten"' : 'E.g. "Automate processes" or "AI assistants"'}
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <div className="pt-4">
                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                                            >
                                                {isSubmitting ? (
                                                    <span className="flex items-center gap-3">
                                                        <Sparkles className="h-5 w-5 animate-spin" />
                                                        {language === 'nl' ? 'Versturen...' : 'Sending...'}
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-3">
                                                        <Send className="h-5 w-5" />
                                                        {language === 'nl' ? 'Verstuur aanvraag' : 'Send request'}
                                                    </span>
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Sparkles className="h-8 w-8 text-green-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground mb-2">
                                            {language === 'nl' ? 'Verzonden!' : 'Sent!'}
                                        </h3>
                                        <p className="text-muted-foreground">
                                            {language === 'nl'
                                                ? 'We nemen binnen 4u contact op 🤖'
                                                : "We'll contact you within 4h 🤖"}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

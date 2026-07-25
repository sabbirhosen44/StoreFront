"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormSchema } from "@/schemas/contact";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { MapPin, Phone, Clock, Mail, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormSchema) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast("Thank you! Your message has been sent successfully. Our team will get back to you shortly.", "success", "Message Sent");
      form.reset();
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* HERO BANNER */}
      <div className="w-full h-72 sm:h-80 relative flex items-center justify-center overflow-hidden border-b border-border">
        <Image
          src="/images/checkout-bg.jpg"
          alt="Contact Us banner background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10 backdrop-blur-xs" />
        <div className="relative flex flex-col items-center justify-center text-center p-4">
          <div className="relative size-10 mb-2">
            <Image
              src="/images/logo.png"
              alt="Logo"
              fill
              sizes="40px"
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-medium font-heading tracking-wide">
            Contact
          </h1>
          <div className="flex items-center gap-2 mt-3 text-sm font-medium">
            <Link
              href="/"
              className="hover:text-furniro-gold transition-colors duration-200"
            >
              Home
            </Link>
            <span className="text-muted-foreground/60 select-none">&gt;</span>
            <span className="text-muted-foreground font-light">Contact</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container-center py-16 lg:py-24 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading tracking-tight">
            Get In Touch With Us
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            For More Information About Our Products & Services. Please Feel Free To Drop Us
            An Email. Our Staff Always Here To Help You Out. Do Not Hesitate!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* CONTACT INFO CARDS */}
          <div className="lg:col-span-5 space-y-8 bg-card/40 border border-border p-8 rounded-3xl backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-furniro-gold/10 text-furniro-gold shrink-0">
                <MapPin className="size-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold font-heading mb-1">Address</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  236 5th SE Avenue, New York NY10000, United States
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-furniro-gold/10 text-furniro-gold shrink-0">
                <Phone className="size-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold font-heading mb-1">Phone</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Mobile: +(84) 546-6789<br />
                  Hotline: +(84) 456-6789
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-furniro-gold/10 text-furniro-gold shrink-0">
                <Clock className="size-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold font-heading mb-1">Working Time</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Monday–Friday: 9:00 - 22:00<br />
                  Saturday–Sunday: 9:00 - 21:00
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-furniro-gold/10 text-furniro-gold shrink-0">
                <Mail className="size-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold font-heading mb-1">Email Support</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  support@storefront.com<br />
                  info@storefront.com
                </p>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="lg:col-span-7 bg-card p-8 sm:p-10 rounded-3xl border border-border shadow-xs">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Field>
                <FieldLabel className="font-heading">Your Name</FieldLabel>
                <Input
                  {...form.register("name")}
                  placeholder="Abc Dev"
                  className="rounded-xl border-muted-foreground/30 p-6 bg-transparent focus-visible:ring-1 focus-visible:ring-furniro-gold"
                />
                <FieldError errors={[form.formState.errors.name]} />
              </Field>

              <Field>
                <FieldLabel className="font-heading">Email Address</FieldLabel>
                <Input
                  type="email"
                  {...form.register("email")}
                  placeholder="Abc@def.com"
                  className="rounded-xl border-muted-foreground/30 p-6 bg-transparent focus-visible:ring-1 focus-visible:ring-furniro-gold"
                />
                <FieldError errors={[form.formState.errors.email]} />
              </Field>

              <Field>
                <FieldLabel className="font-heading">Subject</FieldLabel>
                <Input
                  {...form.register("subject")}
                  placeholder="This is an optional subject"
                  className="rounded-xl border-muted-foreground/30 p-6 bg-transparent focus-visible:ring-1 focus-visible:ring-furniro-gold"
                />
                <FieldError errors={[form.formState.errors.subject]} />
              </Field>

              <Field>
                <FieldLabel className="font-heading">Message</FieldLabel>
                <textarea
                  {...form.register("message")}
                  rows={5}
                  placeholder="Hi! I'd like to ask about..."
                  className="w-full rounded-xl border border-muted-foreground/30 p-4 bg-transparent resize-none outline-none focus:border-furniro-gold focus:ring-1 focus:ring-furniro-gold text-sm transition-all"
                />
                <FieldError errors={[form.formState.errors.message]} />
              </Field>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-10 py-6 rounded-xl bg-furniro-gold hover:bg-furniro-gold/90 text-white font-medium shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="size-4" />
                    <span>Submit Message</span>
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

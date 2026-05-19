"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BILLING_FIELDS } from "@/constants/checkout";
import { CheckoutFormSchema, checkoutSchema } from "@/schemas/checkout";
import { useAppDispatch, useAppSelector } from "@/store";
import { clearCart } from "@/store/slices/cartSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { items } = useAppSelector((state) => state.cart);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const form = useForm<CheckoutFormSchema>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      country: "Bangladesh",
      streetAddress: "",
      townCity: "",
      province: "Dhaka Division",
      zipCode: "",
      phone: "",
      email: "",
      additionalInfo: "",
      paymentMethod: "bank-transfer",
    },
  });

  const selectedPaymentMethod = form.watch("paymentMethod");

  const onSubmit = (data: CheckoutFormSchema) => {
    if (items.length === 0) return;
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      alert(
        "🎉 Order tracking finalized successfully! Payment verification complete."
      );
      dispatch(clearCart());
      router.push("/");
    }, 2500);
  };

  const renderLabel = (label: string, required?: boolean) => (
    <FieldLabel className="flex items-center gap-0.5 font-heading">
      {label}
      {required && (
        <span className="text-destructive font-medium select-none">*</span>
      )}
    </FieldLabel>
  );

  return (
    <div className="w-full min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* HERO */}
      <div className="w-full h-72 sm:h-80 relative flex items-center justify-center overflow-hidden border-b border-border">
        <Image
          src="/images/checkout-bg.jpg"
          alt="Checkout banner background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/5 backdrop-blur-xs" />
        <div className="relative flex flex-col items-center justify-center text-center p-4">
          <div className="relative size-10 mb-2">
            <Image
              src="/images/logo.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-medium font-heading tracking-wide">
            Checkout
          </h1>
          <div className="flex items-center gap-2 mt-3 text-sm font-medium">
            <Link
              href="/"
              className="hover:text-furniro-gold transition-colors duration-200"
            >
              Home
            </Link>
            <span className="text-muted-foreground/60 select-none">&gt;</span>
            <span className="text-muted-foreground font-light">Checkout</span>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="container-center py-12 lg:py-20">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start"
        >
          {/* LEFT PANEL */}
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold font-heading tracking-wide mb-8">
              Billing details
            </h2>

            {/* FIRST & LAST NAME */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(["firstName", "lastName"] as const).map((name) => (
                <Field key={name}>
                  {renderLabel(
                    name === "firstName" ? "First Name" : "Last Name",
                    true
                  )}
                  <Input
                    {...form.register(name)}
                    className=" rounded-xl border border-muted-foreground/40 p-6 bg-transparent focus-visible:ring-1 focus-visible:ring-furniro-gold transition-all duration-200"
                  />
                  <FieldError errors={[form.formState.errors[name]]} />
                </Field>
              ))}
            </div>

            {/* COUNTRY */}
            <Field>
              {renderLabel("Country / Region", true)}
              <Select
                defaultValue={form.getValues("country")}
                onValueChange={(value) => form.setValue("country", value)}
              >
                <SelectTrigger className=" rounded-xl border border-muted-foreground/40 p-6 bg-transparent focus:ring-1 focus:ring-furniro-gold transition-all">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                  <SelectItem value="Sri Lanka">United Kingdom</SelectItem>
                  <SelectItem value="United States">United States</SelectItem>
                </SelectContent>
              </Select>
              <FieldError errors={[form.formState.errors.country]} />
            </Field>

            {/* CORE METADATA LOOP */}
            {BILLING_FIELDS.map(({ name, label, type = "text", required }) => (
              <Field key={name}>
                {renderLabel(label, required)}
                <Input
                  type={type}
                  {...form.register(name)}
                  className=" rounded-xl border border-muted-foreground/40 p-6 bg-transparent focus-visible:ring-1 focus-visible:ring-furniro-gold transition-all duration-200"
                />
                <FieldError errors={[form.formState.errors[name]]} />
              </Field>
            ))}

            {/* PROVINCE */}
            <Field>
              {renderLabel("Province", true)}
              <Select
                defaultValue={form.getValues("province")}
                onValueChange={(value) => form.setValue("province", value)}
              >
                <SelectTrigger className=" rounded-xl border border-muted-foreground/40 p-6 bg-transparent focus:ring-1 focus:ring-furniro-gold transition-all">
                  <SelectValue placeholder="Select Province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dhaka Division">Dhaka Division</SelectItem>
                  <SelectItem value="Western Province">
                    Western Province
                  </SelectItem>
                  <SelectItem value="Central Province">
                    Central Province
                  </SelectItem>
                </SelectContent>
              </Select>
              <FieldError errors={[form.formState.errors.province]} />
            </Field>

            {/* TEXTAREA */}
            <Field>
              {renderLabel("Additional Information", false)}
              <textarea
                {...form.register("additionalInfo")}
                rows={4}
                placeholder="Additional information"
                className="w-full rounded-xl border border-muted-foreground/40 p-4 bg-transparent resize-none outline-none focus:border-furniro-gold focus:ring-1 focus:ring-furniro-gold transition-all duration-200 text-sm"
              />
              <FieldError errors={[form.formState.errors.additionalInfo]} />
            </Field>
          </div>

          {/* RIGHT PANEL */}
          <div className="pt-4 lg:pt-14">
            <div className="w-full space-y-4 border-b border-border/20 pb-6 mb-6">
              <div className="flex justify-between font-medium font-heading text-lg sm:text-xl">
                <span>Product</span>
                <span>Subtotal</span>
              </div>

              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between text-sm sm:text-base text-muted-foreground"
                >
                  <span className="truncate max-w-[220px]">
                    {item.product.title}
                    <strong className="text-foreground text-xs ml-1 font-sans">
                      x {item.quantity}
                    </strong>
                  </span>
                  <span className="text-foreground">
                    $
                    {(item.product.price * item.quantity).toLocaleString(
                      undefined,
                      { minimumFractionDigits: 2 }
                    )}
                  </span>
                </div>
              ))}

              <div className="flex justify-between pt-2">
                <span>Subtotal</span>
                <span>
                  $
                  {subtotal.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className="flex justify-between pt-2">
                <span className="text-lg font-medium font-heading">Total</span>
                <span className="text-2xl font-bold text-furniro-gold transition-colors duration-300">
                  $
                  {subtotal.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            {/* PAYMENT CONTEXT AND ACCORDIONS */}
            <Field>
              <RadioGroup
                defaultValue={form.getValues("paymentMethod")}
                onValueChange={(value) =>
                  form.setValue(
                    "paymentMethod",
                    value as "bank-transfer" | "cod"
                  )
                }
                className="space-y-4"
              >
                <div className="space-y-1">
                  <label className="flex items-center gap-3 cursor-pointer select-none font-medium text-sm">
                    <RadioGroupItem
                      value="bank-transfer"
                      className="transition-all duration-200 border-muted-foreground/40 data-[state=checked]:border-furniro-gold data-[state=checked]:text-furniro-gold"
                    />
                    <span
                      className={
                        selectedPaymentMethod === "bank-transfer"
                          ? "text-foreground font-semibold"
                          : "text-muted-foreground"
                      }
                    >
                      Direct Bank Transfer
                    </span>
                  </label>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      selectedPaymentMethod === "bank-transfer"
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm text-muted-foreground pl-7 pb-2 pt-1 leading-relaxed text-justify font-light">
                        Make your payment directly into our bank account. Please
                        use your Order ID as the payment reference. Your order
                        will not be shipped until the funds have cleared in our
                        account.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="flex items-center gap-3 cursor-pointer select-none font-medium text-sm">
                    <RadioGroupItem
                      value="cod"
                      className="transition-all duration-200 border-muted-foreground/40 data-[state=checked]:border-furniro-gold data-[state=checked]:text-furniro-gold"
                    />
                    <span
                      className={
                        selectedPaymentMethod === "cod"
                          ? "text-foreground font-semibold"
                          : "text-muted-foreground"
                      }
                    >
                      Cash On Delivery
                    </span>
                  </label>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      selectedPaymentMethod === "cod"
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm text-muted-foreground pl-7 pb-2 pt-1 leading-relaxed text-justify font-light">
                        Pay with cash directly upon delivery straight to your
                        doorstep address destination safely.
                      </p>
                    </div>
                  </div>
                </div>
              </RadioGroup>
              <FieldError errors={[form.formState.errors.paymentMethod]} />
            </Field>

            <p className="text-sm leading-relaxed mt-8 mb-10 text-muted-foreground text-justify font-light">
              Your personal data will be used to support your experience
              throughout this website and for other purposes described in our{" "}
              <span className="font-semibold text-foreground cursor-pointer hover:underline">
                privacy policy
              </span>
              .
            </p>

            <div className="flex justify-center items-center">
              <Button
                type="submit"
                disabled={isProcessing || items.length === 0}
                className="w-full p-6 rounded-xl border border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background transition-all duration-300 shadow-sm cursor-pointer active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed font-heading"
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

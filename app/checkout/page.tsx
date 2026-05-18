"use client";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store";
import { clearCart } from "@/store/slices/cartSlice";
import { CheckoutFormValues } from "@/types/cart";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { items } = useAppSelector((state) => state.cart);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const [formValues, setFormValues] = useState<Partial<CheckoutFormValues>>({
    country: "Bangladesh",
    province: "Western Province",
    paymentMethod: "bank-transfer",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof CheckoutFormValues, string>>
  >({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CheckoutFormValues]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const tempErrors: Partial<Record<keyof CheckoutFormValues, string>> = {};
    const requiredFields: (keyof CheckoutFormValues)[] = [
      "firstName",
      "lastName",
      "country",
      "streetAddress",
      "townCity",
      "province",
      "zipCode",
      "phone",
      "email",
    ];

    requiredFields.forEach((field) => {
      if (!formValues[field]?.toString().trim()) {
        tempErrors[field] = "This field is explicitly required";
      }
    });

    if (formValues.email && !/\S+@\S+\.\S+/.test(formValues.email)) {
      tempErrors.email = "Please input a valid email layout";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || items.length === 0) return;

    setIsProcessing(true);

    // Mock API Payment Flow Engine Timing Pipeline
    setTimeout(() => {
      setIsProcessing(false);
      alert(
        "🎉 Order tracking finalized successfully! Payment verification complete.",
      );
      dispatch(clearCart());
      router.push("/");
    }, 2500);
  };

  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      {/* Page Header Banner */}
      <div className="w-full bg-[url('/images/checkout-bg.jpg')] bg-cover bg-center py-20 border-b border-border/10 relative">
        <div className="absolute inset-0 bg-black/5 backdrop-blur-xs" />
        <div className="relative flex flex-col items-center justify-center text-center">
          <img
            src="/images/logo.png"
            alt=""
            className="size-10 mb-2 object-contain"
          />
          <h1 className="text-4xl sm:text-5xl font-medium font-heading tracking-wide">
            Checkout
          </h1>
          <div className="flex items-center gap-2 mt-3 text-sm font-medium">
            <Link
              href="/"
              className="hover:text-furniro-gold transition-colors"
            >
              Home
            </Link>
            <span className="text-muted-foreground/60">&gt;</span>
            <span className="text-muted-foreground font-light">Checkout</span>
          </div>
        </div>
      </div>

      <div className="container-center py-12 lg:py-20">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start"
        >
          {/* Form Processing Fields Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold font-heading tracking-wide mb-8">
              Billing details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formValues.firstName || ""}
                  onChange={handleInputChange}
                  className="h-14 border border-muted-foreground/40 rounded-xl px-4 focus-visible:outline-furniro-gold bg-transparent"
                />
                {errors.firstName && (
                  <span className="text-xs text-destructive font-medium">
                    {errors.firstName}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formValues.lastName || ""}
                  onChange={handleInputChange}
                  className="h-14 border border-muted-foreground/40 rounded-xl px-4 focus-visible:outline-furniro-gold bg-transparent"
                />
                {errors.lastName && (
                  <span className="text-xs text-destructive font-medium">
                    {errors.lastName}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                Company Name (Optional)
              </label>
              <input
                type="text"
                name="companyName"
                value={formValues.companyName || ""}
                onChange={handleInputChange}
                className="h-14 border border-muted-foreground/40 rounded-xl px-4 focus-visible:outline-furniro-gold bg-transparent"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Country / Region</label>
              <select
                name="country"
                value={formValues.country || ""}
                onChange={handleInputChange}
                className="h-14 border border-muted-foreground/40 rounded-xl px-4 focus-visible:outline-furniro-gold bg-transparent cursor-pointer"
              >
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="United States">United States</option>
                <option value="Bangladesh">Bangladesh</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Street address</label>
              <input
                type="text"
                name="streetAddress"
                value={formValues.streetAddress || ""}
                onChange={handleInputChange}
                className="h-14 border border-muted-foreground/40 rounded-xl px-4 focus-visible:outline-furniro-gold bg-transparent"
              />
              {errors.streetAddress && (
                <span className="text-xs text-destructive font-medium">
                  {errors.streetAddress}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Town / City</label>
              <input
                type="text"
                name="townCity"
                value={formValues.townCity || ""}
                onChange={handleInputChange}
                className="h-14 border border-muted-foreground/40 rounded-xl px-4 focus-visible:outline-furniro-gold bg-transparent"
              />
              {errors.townCity && (
                <span className="text-xs text-destructive font-medium">
                  {errors.townCity}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Province</label>
              <select
                name="province"
                value={formValues.province || ""}
                onChange={handleInputChange}
                className="h-14 border border-muted-foreground/40 rounded-xl px-4 focus-visible:outline-furniro-gold bg-transparent cursor-pointer"
              >
                <option value="Western Province">Western Province</option>
                <option value="Central Province">Central Province</option>
                <option value="Dhaka Division">Dhaka Division</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">ZIP code</label>
              <input
                type="text"
                name="zipCode"
                value={formValues.zipCode || ""}
                onChange={handleInputChange}
                className="h-14 border border-muted-foreground/40 rounded-xl px-4 focus-visible:outline-furniro-gold bg-transparent"
              />
              {errors.zipCode && (
                <span className="text-xs text-destructive font-medium">
                  {errors.zipCode}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formValues.phone || ""}
                onChange={handleInputChange}
                className="h-14 border border-muted-foreground/40 rounded-xl px-4 focus-visible:outline-furniro-gold bg-transparent"
              />
              {errors.phone && (
                <span className="text-xs text-destructive font-medium">
                  {errors.phone}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Email address</label>
              <input
                type="email"
                name="email"
                value={formValues.email || ""}
                onChange={handleInputChange}
                className="h-14 border border-muted-foreground/40 rounded-xl px-4 focus-visible:outline-furniro-gold bg-transparent"
              />
              {errors.email && (
                <span className="text-xs text-destructive font-medium">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 pt-4">
              <textarea
                name="additionalInfo"
                placeholder="Additional information"
                value={formValues.additionalInfo || ""}
                onChange={handleInputChange}
                rows={4}
                className="border border-muted-foreground/40 rounded-xl p-4 focus-visible:outline-furniro-gold bg-transparent resize-none"
              />
            </div>
          </div>

          {/* Checkout Review Metrics Frame Summary */}
          <div className="pt-4 lg:pt-14">
            <div className="w-full space-y-4 border-b border-border/20 pb-6 mb-6">
              <div className="flex justify-between font-medium text-lg sm:text-xl">
                <span>Product</span>
                <span>Subtotal</span>
              </div>
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between text-sm sm:text-base text-muted-foreground"
                >
                  <span className="truncate max-w-[200px] sm:max-w-xs">
                    {item.product.title}{" "}
                    <strong className="text-foreground font-medium text-xs">
                      X {item.quantity}
                    </strong>
                  </span>
                  <span className="text-foreground font-light">
                    $
                    {(item.product.price * item.quantity).toLocaleString(
                      undefined,
                      { minimumFractionDigits: 2 },
                    )}
                  </span>
                </div>
              ))}
              <div className="flex justify-between text-sm sm:text-base pt-2">
                <span className="font-normal">Subtotal</span>
                <span className="font-light">
                  $
                  {subtotal.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="font-normal text-base">Total</span>
                <span className="text-furniro-gold font-bold text-xl sm:text-2xl">
                  $
                  {subtotal.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            {/* Payment Systems Routing Elements */}
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-3 font-medium text-base text-foreground cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank-transfer"
                    checked={formValues.paymentMethod === "bank-transfer"}
                    onChange={handleInputChange}
                    className="accent-foreground size-4"
                  />
                  Direct Bank Transfer
                </label>
                {formValues.paymentMethod === "bank-transfer" && (
                  <p className="text-muted-foreground text-sm font-light leading-relaxed pl-7 text-justify">
                    Make your payment directly into our bank account. Please use
                    your Order ID as the payment reference. Your order will not
                    be shipped until the funds have cleared in our account.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <label className="flex items-center gap-3 font-medium text-base text-muted-foreground/80 checked:text-foreground cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formValues.paymentMethod === "cod"}
                    onChange={handleInputChange}
                    className="accent-foreground size-4"
                  />
                  Cash On Delivery
                </label>
                {formValues.paymentMethod === "cod" && (
                  <p className="text-muted-foreground text-sm font-light leading-relaxed pl-7 text-justify">
                    Pay with cash directly upon structural package delivery
                    straight to your doorstep address destination.
                  </p>
                )}
              </div>
            </div>

            <p className="text-sm font-light text-foreground text-justify leading-relaxed mt-8 mb-10">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our{" "}
              <span className="font-semibold cursor-pointer">
                privacy policy.
              </span>
            </p>

            <button
              type="submit"
              disabled={isProcessing || items.length === 0}
              className="w-full sm:w-auto mx-auto block px-24 h-14 border border-foreground rounded-xl text-base font-normal hover:bg-foreground hover:text-background transition-colors cursor-pointer bg-transparent disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
            >
              {isProcessing ? "Processing..." : "Place order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RegisterFormValues, registerSchema } from "@/schemas/auth";
import { useAppDispatch, useAppSelector } from "@/store";
import { registerUser } from "@/store/slices/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      avatar: "https://picsum.photos/800",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    const result = await dispatch(registerUser(data));
    if (registerUser.fulfilled.match(result)) {
      alert("🎉 Account created successfully! Please log in.");
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md p-8 rounded-2xl border border-border bg-card shadow-xs animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-3xl font-heading font-semibold text-center mb-2">
          Create Account
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-8">
          Join us to manage shopping lists and checkouts
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Field>
            <FieldLabel className="font-heading">Full Name</FieldLabel>
            <Input
              type="text"
              {...register("name")}
              className="h-12 rounded-xl border border-muted-foreground/40 px-4 bg-transparent focus-visible:ring-1 focus-visible:ring-furniro-gold"
            />
            <FieldError errors={[errors.name]} />
          </Field>

          <Field>
            <FieldLabel className="font-heading">Email Address</FieldLabel>
            <Input
              type="email"
              {...register("email")}
              className="h-12 rounded-xl border border-muted-foreground/40 px-4 bg-transparent focus-visible:ring-1 focus-visible:ring-furniro-gold"
            />
            <FieldError errors={[errors.email]} />
          </Field>

          <Field>
            <FieldLabel className="font-heading">Password</FieldLabel>
            <Input
              type="password"
              {...register("password")}
              className="h-12 rounded-xl border border-muted-foreground/40 px-4 bg-transparent focus-visible:ring-1 focus-visible:ring-furniro-gold"
            />
            <FieldError errors={[errors.password]} />
          </Field>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-all font-heading font-medium mt-2"
          >
            {isLoading ? "Creating Account..." : "Register"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-furniro-gold hover:underline font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

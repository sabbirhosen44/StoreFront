"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/schemas/auth";
import { useAppDispatch, useAppSelector } from "@/store";
import { loginUser } from "@/store/slices/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import Link from "next/link";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const callbackUrl = searchParams.get("callbackUrl");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      const user = result.payload.user;

      if (user?.role === "admin") {
        router.push("/admin");
      } else {
        router.push(callbackUrl || "/profile");
      }

      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md p-8 rounded-2xl border border-border bg-card shadow-xs animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-3xl font-heading font-semibold text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-8">
          Login to manage your profile and orders
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          New to Furniro?{" "}
          <Link
            href="/register"
            className="text-furniro-gold hover:underline font-medium"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";
import { Separator } from "../ui/separator";

export function AuthPage() {
  return (
    <Card className="w-full max-w-4xl overflow-hidden">
      <CardContent className="p-0 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-6 sm:p-8">
          <LoginForm />
        </div>
        <Separator orientation="vertical" className="hidden md:block h-auto my-8" />
        <Separator orientation="horizontal" className="md:hidden" />
        <div className="w-full md:w-1/2 p-6 sm:p-8 bg-muted/50">
          <SignupForm />
        </div>
      </CardContent>
    </Card>
  );
}

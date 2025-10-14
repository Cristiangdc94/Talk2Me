"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";
import { Separator } from "../ui/separator";
import { AppLogo } from "../icons";

export function AuthPage() {
  return (
    <Card className="w-full max-w-4xl overflow-hidden">
      <CardContent className="p-0 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
          <LoginForm />
        </div>
        
        {/* Separator with Logo */}
        <div className="relative flex-shrink-0 flex items-center justify-center px-4 md:px-0">
          <Separator orientation="vertical" className="hidden md:block h-auto" />
          <div className="absolute z-10 bg-background p-2 rounded-full">
            <AppLogo className="w-10 h-10 text-primary" />
          </div>
          <Separator orientation="horizontal" className="md:hidden" />
        </div>

        <div className="w-full md:w-1/2 p-6 sm:p-8 bg-muted/50 flex flex-col justify-center">
          <SignupForm />
        </div>
      </CardContent>
    </Card>
  );
}

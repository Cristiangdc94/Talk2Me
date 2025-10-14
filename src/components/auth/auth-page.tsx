
"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";
import { Separator } from "../ui/separator";
import { AppLogo } from "../icons";

export function AuthPage() {
  return (
    <Card className="w-full max-w-4xl overflow-hidden">
      <CardHeader className="text-center p-4 bg-muted/30">
        <div className="flex justify-center items-center gap-4">
          <AppLogo className="w-12 h-12 text-primary" />
          <CardTitle className="text-4xl font-logo tracking-wider">
            Talk2Me
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
          <LoginForm />
        </div>

        <div className="flex-shrink-0 flex items-center justify-center px-4 md:px-0">
          <Separator orientation="vertical" className="hidden md:block h-auto" />
          <Separator orientation="horizontal" className="md:hidden" />
        </div>

        <div className="w-full md:w-1/2 p-6 sm:p-8 bg-muted/30 flex flex-col justify-center">
          <SignupForm />
        </div>
      </CardContent>
      <CardFooter className="p-2 bg-muted/30 justify-center">
        <p className="text-xs text-muted-foreground">
          Tu nueva aplicación de chat moderna.
        </p>
      </CardFooter>
    </Card>
  );
}

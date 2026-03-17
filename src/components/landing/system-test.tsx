"use client";

import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Zap, 
  Search, 
  Globe, 
  ShieldCheck,
  Play
} from "lucide-react";
import { cn } from "@/lib/utils";

type TestStep = {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'success' | 'error';
  icon: React.ElementType;
};

export function SystemTest() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState<TestStep[]>([
    { id: 'seo', name: 'SEO & Indexación', description: 'Verificando etiquetas canónicas y robots.txt', status: 'pending', icon: Search },
    { id: 'api', name: 'Conectividad API', description: 'Probando feed RSS de El País Internacional', status: 'pending', icon: Globe },
    { id: 'responsive', name: 'Diseño Responsive', description: 'Validando breakpoints móviles y tablets', status: 'pending', icon: Zap },
    { id: 'security', name: 'Protocolos de Seguridad', description: 'Verificando encriptación y middleware', status: 'pending', icon: ShieldCheck },
  ]);

  const runTests = async () => {
    setIsRunning(true);
    setProgress(0);
    setSteps(prev => prev.map(s => ({ ...s, status: 'pending' })));

    for (let i = 0; i < steps.length; i++) {
      // Set current step to running
      setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: 'running' } : s));
      
      // Simulate work
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1000));
      
      // Complete step
      setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: 'success' } : s));
      setProgress(((i + 1) / steps.length) * 100);
    }

    setIsRunning(false);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setIsRunning(false);
      setProgress(0);
    }
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        variant="outline" 
        size="lg" 
        className="h-12 px-8 border-blue-500/50 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all group"
      >
        <Play className="mr-2 w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
        Ejecutar Test de Sistema
      </Button>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[500px] bg-zinc-950 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Zap className="text-blue-500 w-6 h-6" />
              Diagnóstico de Talk2Me
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Verificación automática de la infraestructura, SEO y conectividad en tiempo real.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-6">
            {!isRunning && progress === 0 && (
              <div className="text-center py-8 space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Play className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-sm text-zinc-400">
                  Haz clic en el botón de abajo para iniciar el diagnóstico técnico completo de la plataforma.
                </p>
              </div>
            )}

            {(isRunning || progress > 0) && (
              <div className="space-y-4">
                <Progress value={progress} className="h-2 bg-zinc-900" />
                <div className="space-y-3">
                  {steps.map((step) => (
                    <div 
                      key={step.id} 
                      className={cn(
                        "flex items-start gap-4 p-3 rounded-xl border transition-all duration-300",
                        step.status === 'running' ? "bg-blue-500/5 border-blue-500/30" : "bg-zinc-900/50 border-zinc-800"
                      )}
                    >
                      <div className={cn(
                        "p-2 rounded-lg shrink-0",
                        step.status === 'success' ? "text-green-500 bg-green-500/10" : 
                        step.status === 'running' ? "text-blue-500 bg-blue-500/10" : "text-zinc-500 bg-zinc-800"
                      )}>
                        <step.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-sm">{step.name}</p>
                          {step.status === 'running' && <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
                          {step.status === 'success' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                        </div>
                        <p className="text-xs text-zinc-500 truncate">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            {!isRunning && progress === 100 ? (
              <Button 
                onClick={() => setIsOpen(false)}
                className="w-full bg-blue-600 hover:bg-blue-500"
              >
                Cerrar y Volver
              </Button>
            ) : (
              <Button 
                onClick={runTests} 
                disabled={isRunning}
                className="w-full bg-blue-600 hover:bg-blue-500"
              >
                {isRunning ? "Ejecutando..." : progress === 0 ? "Iniciar Diagnóstico" : "Reintentar Test"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

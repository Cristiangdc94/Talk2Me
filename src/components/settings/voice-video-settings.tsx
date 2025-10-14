
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import React from "react";
import { useToast } from "@/hooks/use-toast";

const inputDevices = [
  { id: "default", name: "Predeterminado - Micrófono (Realtek Audio)" },
  { id: "mic2", name: "Micrófono de Webcam (HD Pro Webcam C920)" },
  { id: "mic3", name: "Micrófono USB (Blue Yeti)" },
];

const outputDevices = [
  { id: "default", name: "Predeterminado - Altavoces (Realtek Audio)" },
  { id: "headphones", name: "Auriculares (WH-1000XM4)" },
  { id: "monitor", name: "Monitor (DELL U2721DE)" },
];

export function VoiceVideoSettings() {
  const [inputVolume, setInputVolume] = React.useState(80);
  const [outputVolume, setOutputVolume] = React.useState(100);
  const [micTestLevel, setMicTestLevel] = React.useState(0);
  const [isTesting, setIsTesting] = React.useState(false);
  const { toast } = useToast();

  const handleMicTest = () => {
    setIsTesting(true);
    toast({ title: "Prueba de micrófono iniciada", description: "Habla en tu micrófono para ver los niveles de entrada."});

    let i = 0;
    const interval = setInterval(() => {
        setMicTestLevel(Math.random() * 80 + 10 * Math.sin(i / 10));
        i++;
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setMicTestLevel(0);
      setIsTesting(false);
       toast({ title: "Prueba de micrófono finalizada"});
    }, 5000);
  };


  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Voz y Video</CardTitle>
        <CardDescription>
          Gestiona tu configuración de audio y video.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <Label htmlFor="input-device">Dispositivo de Entrada</Label>
          <Select defaultValue="default">
            <SelectTrigger id="input-device">
              <SelectValue placeholder="Selecciona un dispositivo" />
            </SelectTrigger>
            <SelectContent>
              {inputDevices.map((device) => (
                <SelectItem key={device.id} value={device.id}>
                  {device.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Volumen de Entrada</Label>
          <div className="flex items-center gap-4">
            <Slider
              value={[inputVolume]}
              onValueChange={(value) => setInputVolume(value[0])}
              max={100}
              step={1}
            />
             <span className="text-sm text-muted-foreground w-12 text-right">{inputVolume}%</span>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output-device">Dispositivo de Salida</Label>
          <Select defaultValue="default">
            <SelectTrigger id="output-device">
              <SelectValue placeholder="Selecciona un dispositivo" />
            </SelectTrigger>
            <SelectContent>
              {outputDevices.map((device) => (
                <SelectItem key={device.id} value={device.id}>
                  {device.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Volumen de Salida</Label>
           <div className="flex items-center gap-4">
            <Slider
              value={[outputVolume]}
              onValueChange={(value) => setOutputVolume(value[0])}
              max={100}
              step={1}
            />
            <span className="text-sm text-muted-foreground w-12 text-right">{outputVolume}%</span>
          </div>
        </div>

        <div className="space-y-4">
            <Label>Modo de Entrada</Label>
            <RadioGroup defaultValue="voice-activity" className="flex gap-4">
                <Label className="flex-1 border rounded-md p-4 flex flex-col items-start gap-2 cursor-pointer hover:bg-accent hover:text-accent-foreground has-[:checked]:border-primary">
                    <RadioGroupItem value="voice-activity" id="voice-activity" />
                    <span className="font-semibold">Actividad de Voz</span>
                    <span className="text-sm text-muted-foreground">Usa la detección de voz para transmitir automáticamente.</span>
                </Label>
                <Label className="flex-1 border rounded-md p-4 flex flex-col items-start gap-2 cursor-pointer hover:bg-accent hover:text-accent-foreground has-[:checked]:border-primary">
                    <RadioGroupItem value="push-to-talk" id="push-to-talk" />
                     <span className="font-semibold">Pulsar para Hablar</span>
                    <span className="text-sm text-muted-foreground">Solo transmite audio cuando mantienes presionada una tecla.</span>
                </Label>
            </RadioGroup>
        </div>
        
        <div className="space-y-4">
            <Label>Prueba de Micrófono</Label>
            <div className="flex items-center gap-4">
                <Button variant="outline" onClick={handleMicTest} disabled={isTesting}>
                    <Mic className="mr-2 h-4 w-4" />
                    {isTesting ? "Probando..." : "Probar Micrófono"}
                </Button>
                <Progress value={micTestLevel} className="w-full" />
            </div>
        </div>
        
        <div className="space-y-2">
            <Label>Sensibilidad de Entrada (para Actividad de Voz)</Label>
            <Slider defaultValue={[50]} max={100} step={1} />
        </div>

      </CardContent>
    </Card>
  );
}

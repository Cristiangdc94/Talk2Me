
import type { SVGProps } from "react";
import { Zap } from "lucide-react";

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center justify-center bg-blue-600 rounded-xl p-2 w-10 h-10 shadow-lg shadow-blue-500/20">
      <Zap className="text-white w-6 h-6" />
    </div>
  );
}

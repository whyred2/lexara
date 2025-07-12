"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "group relative h-[38px] w-[76px] rounded-full bg-white/2.5",
      "overflow-hidden border-white/5 transition-all duration-300 ease-in-out",
      "data-[state=checked]:shadow-[0px_0_20px_-5px_rgba(0,153,102,0.2)]",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "block h-[30px] w-[30px] rounded-full border border-white/10 bg-white/20 data-[state=checked]:bg-emerald-600",
        "translate-x-[4px] data-[state=checked]:translate-x-[42px] data-[state=checked]:shadow-[0_0_40px_20px_rgba(0,153,102,1)]",
        "data-[state=unchecked]:group-active:w-[38px] data-[state=unchecked]:group-active:bg-emerald-600/80 data-[state=unchecked]:group-active:shadow-[0_0_20px_4px_rgba(0,153,102,0.4)]",
        "flex items-center justify-center transition-all duration-300 ease-in-out",
        "before:h-0 before:w-[10px] before:rounded-full before:border-2 before:border-white/30 before:bg-transparent before:transition-[width,height] before:duration-300 before:ease-in-out data-[state=checked]:before:h-[10px] data-[state=checked]:before:w-0",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };

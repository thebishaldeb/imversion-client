import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[48px] rounded-md border focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-0 border-foreground focus:border-accent text-base placeholder:text-white/60 outline-none mt-1 px-3 py-2 shadow-sm focus:outline-none sm:text-sm bg-form w-full text-foreground",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

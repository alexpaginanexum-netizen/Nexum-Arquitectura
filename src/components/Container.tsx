import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

export function Container({ children, as: Tag = "div", className }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16", className)}>
      {children}
    </Tag>
  );
}

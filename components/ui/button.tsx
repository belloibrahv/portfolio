import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-12 cursor-pointer items-center justify-center gap-2.5 rounded-md border px-3.5 py-3 text-[15px] leading-5 font-bold whitespace-nowrap no-underline sm:px-5.5 transition-[transform,background-color] duration-200 hover:-translate-y-0.5 active:translate-y-px",
  {
    variants: {
      variant: {
        solid: "border-indigo bg-indigo text-raised hover:bg-indigo-deep",
        outline: "border-indigo text-indigo",
        paper: "border-raised bg-raised text-indigo",
        onIndigo: "border-raised/50 text-raised hover:bg-raised/10",
      },
    },
    defaultVariants: { variant: "solid" },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant }), className)} {...props} />;
}

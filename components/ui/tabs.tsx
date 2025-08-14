"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, children, ...props }, ref) => {
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const composedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      listRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref],
  );

  const [indicatorStyle, setIndicatorStyle] =
    React.useState<React.CSSProperties>({
      transform: "translateX(0px)",
      width: 0,
    });
  const [ready, setReady] = React.useState<boolean>(false);

  const updateIndicator = React.useCallback(() => {
    const listEl = listRef.current;
    if (!listEl) return;

    const active = listEl.querySelector<HTMLElement>('[data-state="active"]');
    if (!active) return;

    const listRect = listEl.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();

    const left = activeRect.left - listRect.left + listEl.scrollLeft;
    const width = activeRect.width;

    setIndicatorStyle({
      transform: `translateX(${left}px)`,
      width,
    });
    setReady(true);
  }, []);

  React.useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  React.useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;

    const mo = new MutationObserver(updateIndicator);
    mo.observe(listEl, {
      attributes: true,
      attributeFilter: ["data-state", "class", "style"],
      subtree: true,
      childList: true,
    });

    // Ресайзы/изменения шрифтов
    const ro = new ResizeObserver(updateIndicator);
    ro.observe(listEl);
    const active = listEl.querySelector<HTMLElement>('[data-state="active"]');
    if (active) ro.observe(active);

    window.addEventListener("resize", updateIndicator);

    return () => {
      mo.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator]);

  return (
    <TabsPrimitive.List
      ref={composedRef}
      className={cn(
        "relative inline-flex h-10 items-center justify-center rounded-full bg-white/5 px-1",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-1 left-0 z-0 h-8 rounded-full bg-white/10",
          "transition-[transform,width] duration-300 ease-in-out",
          ready ? "opacity-100" : "opacity-0",
        )}
        style={indicatorStyle}
      />
      {children}
    </TabsPrimitive.List>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative z-10 inline-flex items-center justify-center rounded-full px-4 whitespace-nowrap",
      "text-sm font-medium text-white/70 transition-colors",
      "hover:text-white data-[state=active]:text-white",
      "focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:outline-none",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("mt-4 focus-visible:outline-none", className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };

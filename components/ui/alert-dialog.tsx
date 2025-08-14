"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type DialogContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
  titleId?: string;
  descriptionId?: string;
  setTitleId: (id?: string) => void;
  setDescriptionId: (id?: string) => void;
};

const AlertDialogContext = React.createContext<DialogContextValue | null>(null);

type AlertDialogRootProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};

const AlertDialog = ({
  open: openProp,
  defaultOpen,
  onOpenChange,
  children,
}: AlertDialogRootProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(!!defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? !!openProp : uncontrolledOpen;

  const setOpen = React.useCallback(
    (v: boolean) => {
      if (!isControlled) setUncontrolledOpen(v);
      onOpenChange?.(v);
    },
    [isControlled, onOpenChange],
  );

  const [titleId, setTitleId] = React.useState<string | undefined>();
  const [descriptionId, setDescriptionId] = React.useState<
    string | undefined
  >();

  // Body scroll lock
  React.useEffect(() => {
    if (!open) return;
    const { overflow, paddingRight } = document.body.style;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [open]);

  const ctx = React.useMemo<DialogContextValue>(
    () => ({
      open,
      setOpen,
      titleId,
      descriptionId,
      setTitleId,
      setDescriptionId,
    }),
    [open, setOpen, titleId, descriptionId],
  );

  return (
    <AlertDialogContext.Provider value={ctx}>
      {children}
    </AlertDialogContext.Provider>
  );
};

const useAlertDialog = () => {
  const ctx = React.useContext(AlertDialogContext);
  if (!ctx)
    throw new Error("AlertDialog components must be used within <AlertDialog>");
  return ctx;
};

type AsChildProps = {
  asChild?: boolean;
  children?: React.ReactNode;
};

const AlertDialogTrigger = ({
  asChild,
  children,
  ...rest
}: AsChildProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { setOpen } = useAlertDialog();

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      onClick?: React.MouseEventHandler<HTMLElement>;
    }>;
    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        child.props.onClick?.(e);
        setOpen(true);
      },
      ...{ "data-alert-dialog-trigger": true },
    });
  }

  return (
    <button {...rest} onClick={() => setOpen(true)}>
      {children}
    </button>
  );
};

const usePortalContainer = () => {
  const [node, setNode] = React.useState<HTMLElement | null>(null);
  React.useEffect(() => {
    const el = document.createElement("div");
    document.body.appendChild(el);
    setNode(el);
    return () => {
      document.body.removeChild(el);
    };
  }, []);
  return node;
};

// Focus trap helpers
const focusableSelector =
  'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, summary, [tabindex]:not([tabindex="-1"])';

function trapTabKey(e: KeyboardEvent, container: HTMLElement) {
  if (e.key !== "Tab") return;
  const nodes = Array.from(
    container.querySelectorAll<HTMLElement>(focusableSelector),
  ).filter((el) => el.offsetParent !== null || el === document.activeElement);
  if (nodes.length === 0) return;
  const first = nodes[0];
  const last = nodes[nodes.length - 1];
  const active = document.activeElement as HTMLElement | null;

  if (!e.shiftKey && active === last) {
    e.preventDefault();
    first.focus();
  } else if (e.shiftKey && active === first) {
    e.preventDefault();
    last.focus();
  }
}

const AlertDialogOverlay = ({ className }: { className?: string }) => (
  <motion.div
    initial={{
      opacity: 0,
      backdropFilter: "blur(0px)",
    }}
    animate={{
      opacity: 1,
      backdropFilter: "blur(10px)",
    }}
    exit={{
      opacity: 0,
      backdropFilter: "blur(0px)",
    }}
    transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
    className={cn("fixed inset-0 z-40 bg-black/50", className)}
  />
);

type AlertDialogContentProps = React.HTMLAttributes<HTMLDivElement>;

const AlertDialogContent = React.forwardRef<
  HTMLDivElement,
  AlertDialogContentProps
>(({ className, children, ...props }, ref) => {
  const { open, titleId, descriptionId } = useAlertDialog();
  const portalNode = usePortalContainer();

  const contentRef = React.useRef<HTMLDivElement | null>(null);
  React.useImperativeHandle(ref, () => contentRef.current as HTMLDivElement);

  // Focus trap + prevent ESC close
  React.useEffect(() => {
    if (!open || !contentRef.current) return;

    const prevActive = document.activeElement as HTMLElement | null;
    const container = contentRef.current;

    const focusables =
      container.querySelectorAll<HTMLElement>(focusableSelector);
    (focusables[0] ?? container).focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // AlertDialog: do not close on ESC
        e.stopPropagation();
        e.preventDefault();
      } else {
        trapTabKey(e, container);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      prevActive?.focus?.();
    };
  }, [open]);

  if (!portalNode) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          className={cn(
            "fixed inset-0 z-50 flex items-end justify-center sm:items-center",
          )}
          aria-hidden={!open}
          // AlertDialog: do not close on overlay click
        >
          <AlertDialogOverlay className="-z-10" />
          <motion.div
            key="alert-dialog"
            style={{
              transformOrigin: "top center",
              perspective: "1600px",
              willChange: "transform, opacity, filter",
            }}
            initial={{
              opacity: 0,
              y: -56,
              rotateX: -35,
              scale: 0.96,
              filter: "blur(16px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
              filter: "blur(0px)",
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            }}
            exit={{
              opacity: 0,
              y: -32,
              rotateX: -18,
              scale: 0.985,
              filter: "blur(10px)",
              transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
            }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div
              ref={contentRef}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              tabIndex={-1}
              className={cn(
                "sm:max-w-xxl bg-background/80 relative grid w-full max-w-xl gap-4 rounded-3xl p-6 shadow-xl",
                className,
              )}
              {...props}
            >
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    portalNode,
  );
});
AlertDialogContent.displayName = "AlertDialogContent";

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, id, ...props }, ref) => {
  const autoId = React.useId();
  const finalId = id ?? `alert-dialog-title-${autoId}`;
  const { setTitleId } = useAlertDialog();
  React.useEffect(() => {
    setTitleId(finalId);
    return () => setTitleId(undefined);
  }, [finalId, setTitleId]);

  return (
    <h2
      ref={ref}
      id={finalId}
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
});
AlertDialogTitle.displayName = "AlertDialogTitle";

const AlertDialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, id, ...props }, ref) => {
  const autoId = React.useId();
  const finalId = id ?? `alert-dialog-desc-${autoId}`;
  const { setDescriptionId } = useAlertDialog();
  React.useEffect(() => {
    setDescriptionId(finalId);
    return () => setDescriptionId(undefined);
  }, [finalId, setDescriptionId]);

  return (
    <p
      ref={ref}
      id={finalId}
      className={cn("text-sm text-white/80", className)}
      {...props}
    />
  );
});
AlertDialogDescription.displayName = "AlertDialogDescription";

const makeButton = (variant: "action" | "cancel") => {
  const ButtonComponent = React.forwardRef<
    HTMLButtonElement,
    AsChildProps & React.ButtonHTMLAttributes<HTMLButtonElement>
  >(({ asChild, className, children, onClick, ...rest }, ref) => {
    const { setOpen } = useAlertDialog();
    const handle = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      setOpen(false);
    };

    if (asChild && React.isValidElement(children)) {
      type ButtonChildProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
        React.RefAttributes<HTMLButtonElement>;

      const child = children as React.ReactElement<ButtonChildProps>;

      return React.cloneElement(child, {
        ref,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          child.props.onClick?.(e);
          handle(e);
        },
        className: cn(
          buttonVariants(
            variant === "cancel" ? { variant: "outline" } : undefined,
          ),
          "mt-2 h-10 sm:mt-0",
          child.props.className,
          className,
        ),
        ...{ "data-alert-dialog-trigger": variant },
      });
    }

    return (
      <button
        ref={ref}
        {...rest}
        onClick={handle}
        className={cn(
          buttonVariants(
            variant === "cancel" ? { variant: "secondary" } : undefined,
          ),
          variant === "cancel" ? "mt-2 h-10 sm:mt-0" : undefined,
          className,
        )}
      >
        {children}
      </button>
    );
  });

  ButtonComponent.displayName = `AlertDialog${variant === "action" ? "Action" : "Cancel"}`;
  return ButtonComponent;
};

const AlertDialogAction = makeButton("action");
const AlertDialogCancel = makeButton("cancel");

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};

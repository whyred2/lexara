"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

type DialogContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
  titleId?: string;
  descriptionId?: string;
  setTitleId: (id?: string) => void;
  setDescriptionId: (id?: string) => void;
};

const DialogContext = React.createContext<DialogContextValue | null>(null);

type DialogRootProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};

const Dialog = ({
  open: openProp,
  defaultOpen,
  onOpenChange,
  children,
}: DialogRootProps) => {
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

  const ctx: DialogContextValue = React.useMemo(
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
    <DialogContext.Provider value={ctx}>{children}</DialogContext.Provider>
  );
};

const useDialog = () => {
  const ctx = React.useContext(DialogContext);
  if (!ctx) throw new Error("Dialog components must be used within <Dialog>");
  return ctx;
};

type AsChildProps = {
  asChild?: boolean;
  children?: React.ReactNode;
};

const DialogTrigger = ({
  asChild,
  children,
  ...rest
}: AsChildProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { setOpen } = useDialog();

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      onClick?: React.MouseEventHandler<HTMLElement>;
    }>;
    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        child.props.onClick?.(e);
        setOpen(true);
      },
      ...{ "data-dialog-trigger": true },
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

const DialogOverlay = ({ className }: { className?: string }) => {
  // Rendered inside AnimatePresence by Content
  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
      className={cn("fixed inset-0 z-40 bg-black/50", className)}
    />
  );
};

type DialogContentProps = React.HTMLAttributes<HTMLDivElement>;

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen, titleId, descriptionId } = useDialog();
    const portalNode = usePortalContainer();

    const contentRef = React.useRef<HTMLDivElement | null>(null);
    React.useImperativeHandle(ref, () => contentRef.current as HTMLDivElement);

    // Close on ESC + focus trap
    React.useEffect(() => {
      if (!open || !contentRef.current) return;

      const prevActive = document.activeElement as HTMLElement | null;

      const container = contentRef.current;
      // Focus first focusable or container
      const focusables =
        container.querySelectorAll<HTMLElement>(focusableSelector);
      (focusables[0] ?? container).focus();

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.stopPropagation();
          setOpen(false);
        } else {
          trapTabKey(e, container);
        }
      };
      document.addEventListener("keydown", onKeyDown);

      return () => {
        document.removeEventListener("keydown", onKeyDown);
        prevActive?.focus?.();
      };
    }, [open, setOpen]);

    if (!portalNode) return null;

    return createPortal(
      <AnimatePresence>
        {open && (
          <div
            className={cn(
              "fixed inset-0 z-50 flex items-start justify-center sm:items-center",
            )}
            aria-hidden={!open}
            onMouseDown={() => setOpen(false)} // click on overlay closes
          >
            <DialogOverlay className="-z-10" />
            <motion.div
              key="dialog"
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
              // Stop overlay close when clicking content
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div
                ref={contentRef}
                role="dialog"
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
                <DialogClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
                  <X className="size-4" />
                  <span className="sr-only">Close</span>
                </DialogClose>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      portalNode,
    );
  },
);
DialogContent.displayName = "DialogContent";

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
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
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, id, ...props }, ref) => {
  const autoId = React.useId();
  const finalId = id ?? `dialog-title-${autoId}`;
  const { setTitleId } = useDialog();
  React.useEffect(() => {
    setTitleId(finalId);
    return () => setTitleId(undefined);
  }, [finalId, setTitleId]);

  return (
    <h2
      ref={ref}
      id={finalId}
      className={cn(
        "text-lg leading-none font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
});
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, id, ...props }, ref) => {
  const autoId = React.useId();
  const finalId = id ?? `dialog-desc-${autoId}`;
  const { setDescriptionId } = useDialog();
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
DialogDescription.displayName = "DialogDescription";

const DialogClose = ({
  children,
  ...rest
}: Omit<AsChildProps, "asChild"> &
  React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { setOpen } = useDialog();

  // Если передан React-элемент — клонируем его, чтобы не вкладывать button в button.
  if (React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      onClick?: React.MouseEventHandler<HTMLElement>;
    }>;
    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        child.props.onClick?.(e);
        setOpen(false);
      },
      ...{ "data-dialog-trigger": true },
    });
  }

  // Фолбэк: собственная кнопка (когда children — текст/узлы).
  return (
    <button {...rest} onClick={() => setOpen(false)}>
      {children ?? "Close"}
    </button>
  );
};

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};

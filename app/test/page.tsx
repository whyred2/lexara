"use client";

import { toast } from "react-toastify";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { cn } from "@/lib/utils";

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center space-y-2 rounded-xl border border-white/5 bg-white/2.5 p-4">
      {children}
    </div>
  );
};

export default function TestPage() {
  return (
    <div className="mx-auto min-h-screen max-w-6xl gap-4 py-10">
      <h1 className="mb-8 text-center text-3xl font-bold">Playground Page</h1>
      <div className="grid grid-cols-3 gap-4">
        {/* Toasts */}
        <Card>
          <h1>Toasts</h1>
          <button
            onClick={() => toast("Hello, World!")}
            className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
          >
            Show Toast
          </button>
          <button
            type="button"
            onClick={() => toast.info("This is a test toast!")}
            className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
          >
            Info Toast
          </button>
          <button
            type="button"
            onClick={() => toast.error("This is an error toast!")}
            className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
          >
            Error Toast
          </button>
          <button
            type="button"
            onClick={() => toast.success("This is a success toast!")}
            className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
          >
            Success Toast
          </button>
          <button
            type="button"
            onClick={() => toast.warning("This is a warning toast!")}
            className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
          >
            Warning Toast
          </button>
        </Card>
        {/* Button Variants */}
        <Card>
          <h1>Button Variants</h1>
          <button
            type="button"
            className={cn(buttonVariants({ variant: "default" }), "w-full")}
          >
            Default Button
          </button>
          <button
            type="button"
            className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
          >
            Secondary Button
          </button>
          <button
            type="button"
            className={cn(buttonVariants({ variant: "outline" }), "w-full")}
          >
            Outline Button
          </button>
          <button
            type="button"
            className={cn(buttonVariants({ variant: "ghost" }), "w-full")}
          >
            Ghost Button
          </button>
          <button
            type="button"
            className={cn(buttonVariants({ variant: "link" }), "w-full")}
          >
            Link Button
          </button>
        </Card>
        {/* Modals */}

        <Card>
          <h1>Modals Variants</h1>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogDescription>
                  This is a description for the dialog.
                </DialogDescription>
              </DialogHeader>
              <form className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" className="border" placeholder="John" />
                </div>
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="surname">Surname</Label>
                  <Input id="surname" className="border" placeholder="Doe" />
                </div>
                <div className="col-span-2 flex flex-col space-y-1">
                  <Label htmlFor="cardNumber">Card number</Label>
                  <Input
                    id="cardNumber"
                    className="border"
                    placeholder="1234 1234 1234 1234"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    className="border"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="cvc">Security code</Label>
                  <Input id="cvc" className="border" placeholder="CVC" />
                </div>
              </form>
              <DialogFooter className="pt-2">
                <DialogClose className="w-full">
                  <Button type="button" variant="secondary" className="w-full">
                    Cancel
                  </Button>
                </DialogClose>
                <Button className="w-full">Add Card</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-full">Open Alert Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Alert Dialog Title</AlertDialogTitle>
                <AlertDialogDescription>
                  This is a description for the alert dialog.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Confirm</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Card>
      </div>
    </div>
  );
}

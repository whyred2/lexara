"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { toast } from "react-toastify";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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

type Method = {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
  name?: string | null;
  createdAt: string;
};

export const PaymentMethods = () => {
  const [loading, setLoading] = React.useState(true);
  const [methods, setMethods] = React.useState<Method[]>([]);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/billing/payment-methods", {
        cache: "no-store",
      });
      const data = await res.json();
      setMethods(data.methods ?? []);
    } catch {
      toast.error("Failed to load payment methods");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const setDefault = async (id: string) => {
    try {
      const res = await fetch(`/api/billing/payment-methods/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDefault: true }),
      });
      if (!res.ok) throw new Error();
      await load();
      toast.success("Default card updated");
    } catch {
      toast.error("Failed to set default");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Remove this card?")) return;
    try {
      const res = await fetch(`/api/billing/payment-methods/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      await load();
      toast.success("Card removed");
    } catch {
      toast.error("Failed to remove card");
    }
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-6">
        <Icons.creditCard className="h-12 w-12" />
      </div>
      <p className="text-white/80">No payment methods</p>
      <p className="text-sm text-white/50">Add a card to upgrade your plan</p>
      <Dialog>
        <DialogTrigger>
          <Button className="mt-4 bg-emerald-600! hover:bg-emerald-700!">
            <Icons.plus className="size-5" />
            Add Card
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>
              Your card will be stored securely.
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
              <Input id="expiryDate" className="border" placeholder="MM/YY" />
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
    </div>
  );

  if (loading) {
    return (
      <Card className="flex h-64 items-center justify-center rounded-3xl bg-white/5">
        <Icons.loaderCircle className="size-8 animate-spin text-white/70" />
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
      </CardHeader>
      <CardContent>
        {methods.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-2">
            {methods.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    <Icons.creditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-white">
                      {m.brand.toUpperCase()} •••• {m.last4}
                      {m.name ? (
                        <span className="text-white/60"> · {m.name}</span>
                      ) : null}
                    </p>
                    <p className="text-sm text-white/60">
                      Expires {String(m.expMonth).padStart(2, "0")}/{m.expYear}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {m.isDefault ? (
                    <Badge variant="outline" className="text-xs">
                      Default
                    </Badge>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setDefault(m.id)}
                    >
                      Make default
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(m.id)}
                  >
                    <Icons.trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

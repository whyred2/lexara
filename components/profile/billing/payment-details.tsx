"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { billingProfileSchema } from "@/lib/validation/billing";
import type { z } from "zod";

type Profile = z.infer<typeof billingProfileSchema>;

const EMPTY_PROFILE: Profile = {
  name: "",
  surname: "",
  country: "",
  city: "",
  addressLine1: "",
  addressLine2: "",
  postalCode: "",
  receiptEmail: "",
};

export const PaymentDetails = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [saving, setSaving] = React.useState<boolean>(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Profile>({
    resolver: zodResolver(billingProfileSchema),
    defaultValues: EMPTY_PROFILE,
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const normalizeFromDb = (data: Profile): Profile => ({
    name: data?.name ?? "",
    surname: data?.surname ?? "",
    country: data?.country ?? "",
    city: data?.city ?? "",
    addressLine1: data?.addressLine1 ?? "",
    addressLine2: data?.addressLine2 ?? "",
    postalCode: data?.postalCode ?? "",
    receiptEmail: data?.receiptEmail ?? "",
  });

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/billing/profile", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load billing profile");
        const data = await res.json();
        reset(normalizeFromDb(data?.profile));
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to load billing details",
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [reset]);

  // Показать ошибки формы через toast
  const showFormErrors = (formErrors: typeof errors) => {
    const msgs = Object.values(formErrors)
      .map((e) => (Array.isArray(e) ? e[0]?.message : e?.message))
      .filter(Boolean) as string[];
    if (msgs.length) {
      msgs.slice(0, 3).forEach((m) => toast.error(m));
      if (msgs.length > 3) toast.error(`+${msgs.length - 3} more errors`);
    }
  };

  const onSubmit = async (values: Profile) => {
    setSaving(true);
    try {
      const res = await fetch("/api/billing/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        let message = "Failed to save billing details";
        try {
          const data = await res.json();
          if (data?.error) message = String(data.error);
        } catch {}
        throw new Error(message);
      }

      toast.success("Billing details saved");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save billing details",
      );
    } finally {
      setSaving(false);
    }
  };

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
        <CardTitle>Billing Details</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit, (e) => showFormErrors(e))}
          className="grid gap-4 md:grid-cols-2"
        >
          <div>
            <Label htmlFor="name" className="text-sm text-white/60">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter name"
              className="w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 text-base text-white outline-none focus:border-emerald-500"
              {...register("name")}
            />
          </div>

          <div>
            <Label htmlFor="surname" className="text-sm text-white/60">
              Surname
            </Label>
            <Input
              id="surname"
              placeholder="Enter surname"
              className="w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 text-base text-white outline-none focus:border-emerald-500"
              {...register("surname")}
            />
          </div>

          <div>
            <Label htmlFor="country" className="text-sm text-white/60">
              Country
            </Label>
            <Input
              id="country"
              placeholder="Enter country"
              className="w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 text-base text-white outline-none focus:border-emerald-500"
              {...register("country")}
            />
          </div>

          <div>
            <Label htmlFor="city" className="text-sm text-white/60">
              City
            </Label>
            <Input
              id="city"
              placeholder="Enter city"
              className="w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 text-base text-white outline-none focus:border-emerald-500"
              {...register("city")}
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="addressLine1" className="text-sm text-white/60">
              Address line 1
            </Label>
            <Input
              id="addressLine1"
              placeholder="Enter address line 1"
              className="w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 text-base text-white outline-none focus:border-emerald-500"
              {...register("addressLine1")}
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="addressLine2" className="text-sm text-white/60">
              Address line 2
            </Label>
            <Input
              id="addressLine2"
              placeholder="Enter address line 2"
              className="w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 text-base text-white outline-none focus:border-emerald-500"
              {...register("addressLine2")}
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="postalCode" className="text-sm text-white/60">
              Postal code
            </Label>
            <Input
              id="postalCode"
              placeholder="Enter postal code"
              className="w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 text-base text-white outline-none focus:border-emerald-500"
              {...register("postalCode")}
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="receiptEmail" className="text-sm text-white/60">
              Receipts email
            </Label>
            <Input
              id="receiptEmail"
              type="email"
              placeholder="Enter email for receipts"
              className="w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 text-base text-white outline-none focus:border-emerald-500"
              {...register("receiptEmail")}
            />
          </div>

          <Button
            type="button"
            variant="outline"
            disabled={saving}
            className="w-full rounded-xl border border-white/20"
            onClick={() => reset(EMPTY_PROFILE)}
          >
            Clear
          </Button>

          <Button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700"
          >
            {saving ? (
              <Icons.loaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Save
          </Button>
        </form>

        <div className="col-span-2 mt-4 text-center">
          <p className="text-xs text-white/60">
            We store your address as required by law and our privacy policy.
            This address will be used on receipts for your payments.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

"use client";

import * as React from "react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";

interface EditProfileDialogProps {
  isEditingProfile: boolean;
  setIsEditingProfile: (value: boolean) => void;
  handleEditProfile: () => void;
  editName: string;
  setEditName: (value: string) => void;
  editNickname: string;
  setEditNickname: (value: string) => void;
  isSavingProfile: boolean;
  handleSaveProfile: () => void;
}

interface ProfileUnlinkDialogProps {
  isLoading: boolean;
  provider: {
    id: string;
    name: string;
    connected: boolean;
  };
  isUnlinking: string | null;
  onUnlink: (providerId: string) => void;
}

interface ProfileSetEmailPasswordDialogProps {
  isLoading: boolean;
  isConnecting: string | null;
  provider: {
    id: string;
    name: string;
  };
  newPassword: string;
  setNewPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  isSettingPassword: boolean;
  handleSetPassword: () => void;
}

export const EditProfileDialog = ({
  isEditingProfile,
  setIsEditingProfile,
  handleEditProfile,
  editName,
  setEditName,
  editNickname,
  setEditNickname,
  isSavingProfile,
  handleSaveProfile,
}: EditProfileDialogProps) => {
  return (
    <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={handleEditProfile}>
          <Icons.edit />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Enter your name"
            className="mt-1 w-full"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="nickname">Nickname</Label>
          <Input
            id="nickname"
            value={editNickname}
            onChange={(e) => setEditNickname(e.target.value)}
            placeholder="Enter your nickname"
            className="mt-1 w-full"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveProfile} disabled={isSavingProfile}>
            {isSavingProfile ? (
              <Icons.loaderCircle className="mr-2 size-4 animate-spin" />
            ) : null}
            {isSavingProfile ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const UnlinkAccountDialog = ({
  isLoading,
  provider,
  isUnlinking,
  onUnlink: handleUnlinkAccount,
}: ProfileUnlinkDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="secondary"
          className="text-red-500 hover:bg-red-600! hover:text-white"
          disabled={isLoading}
        >
          {isUnlinking === provider.id ? (
            <div className="flex items-center gap-2">
              <Icons.loaderCircle className="size-5 animate-spin" />
              Unlinking...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Icons.x className="size-5" /> Unlink
            </div>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unlink {provider.name} Account</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to unlink this account? You won&apos;t be able
            to sign in with {provider.name} until you connect it again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleUnlinkAccount(provider.id)}>
            Unlink Account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const SetEmailPasswordDialog = ({
  isLoading,
  isConnecting,
  provider,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  isSettingPassword,
  handleSetPassword,
}: ProfileSetEmailPasswordDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="size-10 p-0"
          disabled={isLoading}
        >
          {isConnecting === provider.id ? (
            <Icons.loaderCircle className="size-5 animate-spin" />
          ) : (
            <Icons.plus className="size-5" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Email Password</DialogTitle>
          <DialogDescription>
            Create a password to enable email login.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-1">
          <Label htmlFor="new-password">New Password</Label>
          <Input
            id="new-password"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 w-full"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 w-full"
          />
        </div>
        <DialogFooter>
          <button
            className={cn(buttonVariants({ variant: "default" }), "h-10")}
            onClick={handleSetPassword}
            disabled={isSettingPassword}
          >
            {isSettingPassword ? (
              <Icons.loaderCircle className="size-5 animate-spin" />
            ) : (
              "Set Password"
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

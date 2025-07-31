"use client";

import * as React from "react";
import { User, Account } from "@prisma/client";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import {
  EditProfileDialog,
  SetEmailPasswordDialog,
  UnlinkAccountDialog,
} from "@/components/profile/profile-alerts";

import { cn } from "@/lib/utils";

interface ProfileCardProps {
  user: User & {
    accounts: Pick<Account, "provider">[];
    subscriptions: Array<{
      plan: {
        name: string;
        displayName: string;
      };
      status: string;
      currentPeriodEnd: Date;
    }>;
  };
}

export function ProfileCard({ user }: ProfileCardProps) {
  const [isUnlinking, setIsUnlinking] = React.useState<string | null>(null);
  const [isConnecting, setIsConnecting] = React.useState<string | null>(null);
  const [newPassword, setNewPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [isSettingPassword, setIsSettingPassword] =
    React.useState<boolean>(false);
  const [isSendingVerification, setIsSendingVerification] =
    React.useState<boolean>(false);

  // Состояния для модального окна редактирования профиля
  const [isEditingProfile, setIsEditingProfile] =
    React.useState<boolean>(false);
  const [editName, setEditName] = React.useState<string>(user.name || "");
  const [editNickname, setEditNickname] = React.useState<string>(
    user.nickname || "",
  );
  const [isSavingProfile, setIsSavingProfile] = React.useState<boolean>(false);

  const currentPlan = user.subscriptions[0]?.plan || {
    name: "personal",
    displayName: "Personal",
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  const handleSendVerificationEmail = async () => {
    setIsSendingVerification(true);
    try {
      const response = await fetch("/api/auth/send-verification", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Verification email sent! Check your inbox.");
      } else {
        toast.error(data.error || "Failed to send verification email");
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      toast.error("Failed to send verification email");
    } finally {
      setIsSendingVerification(false);
    }
  };

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    try {
      // Обновляем имя
      const nameResponse = await fetch("/api/profile/update-name", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: editName }),
      });

      // Обновляем никнейм
      const nicknameResponse = await fetch("/api/profile/update-nickname", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname: editNickname }),
      });

      const nameData = await nameResponse.json();
      const nicknameData = await nicknameResponse.json();

      if (nameResponse.ok && nicknameResponse.ok) {
        toast.success("Profile updated successfully!");
        setIsEditingProfile(false);
        setTimeout(() => window.location.reload(), 1000);
      } else {
        if (!nameResponse.ok) {
          toast.error(nameData.error || "Failed to update name");
        }
        if (!nicknameResponse.ok) {
          toast.error(nicknameData.error || "Failed to update nickname");
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleEditProfile = () => {
    setEditName(user.name || "");
    setEditNickname(user.nickname || "");
    setIsEditingProfile(true);
    console.log(user);
  };

  // Проверяем какие аккаунты уже подключены
  const connectedProviders = user.accounts.map((account) => account.provider);

  // Все доступные провайдеры
  const allProviders = [
    {
      id: "google",
      name: "Google",
      icon: Icons.google,
      connected: connectedProviders.includes("google"),
    },
    {
      id: "github",
      name: "GitHub",
      icon: Icons.githubLight,
      connected: connectedProviders.includes("github"),
    },
    {
      id: "credentials",
      name: "Email",
      icon: Icons.mail,
      connected: connectedProviders.includes("credentials"),
    },
  ];

  // Функция для подключения аккаунта
  const handleConnectAccount = async (provider: string) => {
    setIsConnecting(provider);
    try {
      toast.info(`Connecting ${provider} account...`);
      const result = await signIn(provider, {
        redirect: false,
        callbackUrl: "/profile",
      });
      if (result?.error) {
        toast.error(`Failed to connect ${provider} account`);
      } else if (result?.ok) {
        toast.success(`${provider} account connected successfully!`);
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (error) {
      console.error(`Error connecting ${provider}:`, error);
      toast.error(`Failed to connect ${provider} account`);
    } finally {
      setIsConnecting(null);
    }
  };

  // Функция для отвязки аккаунта
  const handleUnlinkAccount = async (provider: string) => {
    if (user.accounts.length <= 1) {
      toast.error("Cannot unlink the only connected account");
      return;
    }
    setIsUnlinking(provider);
    try {
      const response = await fetch("/api/profile/unlink-account", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ provider }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(`${provider} account unlinked successfully!`);
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error(data.error || "Failed to unlink account");
      }
    } catch (error) {
      console.error(`Error unlinking ${provider}:`, error);
      toast.error("Failed to unlink account");
    } finally {
      setIsUnlinking(null);
    }
  };

  // Функция для установки пароля
  const handleSetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setIsSettingPassword(true);
    try {
      const response = await fetch("/api/profile/setup-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword, confirmPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Password set successfully!");
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error(data.error || "Failed to set password");
      }
    } catch (error) {
      console.error("Error setting password:", error);
      toast.error("Failed to set password");
    } finally {
      setIsSettingPassword(false);
    }
  };

  const canUnlinkAccount = (provider: string) => {
    if (user.accounts.length <= 1) return false;
    if (provider === "credentials") {
      const hasOAuthAccounts = user.accounts.some(
        (acc) => acc.provider !== "credentials",
      );
      return hasOAuthAccounts;
    }
    return true;
  };

  const connectedCount = allProviders.filter((p) => p.connected).length;

  return (
    <>
      {!user.emailVerified && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-900/20 p-1">
          <div className="flex items-center justify-between text-sm text-amber-500">
            <div className="ml-2 flex items-center">
              <Icons.triangleAlert className="mr-2 size-5" />
              Confirm your email to enable all features.
            </div>
            <button
              type="submit"
              onClick={handleSendVerificationEmail}
              disabled={isSendingVerification}
              className="flex items-center rounded-lg border px-4 py-2 hover:bg-amber-500/20"
            >
              {isSendingVerification ? (
                <Icons.loaderCircle className="mr-2 size-4 animate-spin" />
              ) : (
                <Icons.mail className="mr-2 size-4" />
              )}
              {isSendingVerification ? "Sending..." : "Resend Email"}
            </button>
          </div>
        </div>
      )}

      <Card className="border-white/5 bg-white/2.5 backdrop-blur-md">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="size-20">
                <AvatarImage src={user.image || ""} alt={user.name || ""} />
                <AvatarFallback className="bg-emerald-600 text-xl text-white">
                  {getInitials(user.name || "U")}
                </AvatarFallback>
              </Avatar>
              <div className="flex h-20 flex-col justify-center space-y-1">
                <h2 className="text-2xl font-bold text-white">
                  {user.name || "No name"}
                </h2>
                <span className="text-sm text-white/80">
                  {user.nickname ? `@${user.nickname}` : "No nickname"}
                </span>
                <p className="flex items-center text-sm">
                  <Icons.mail className="mr-2 size-4" />
                  {user.email}
                </p>
              </div>
            </div>

            {/* Кнопка Edit Profile */}
            <EditProfileDialog
              isEditingProfile={isEditingProfile}
              setIsEditingProfile={setIsEditingProfile}
              handleEditProfile={handleEditProfile}
              editName={editName}
              setEditName={setEditName}
              editNickname={editNickname}
              setEditNickname={setEditNickname}
              isSavingProfile={isSavingProfile}
              handleSaveProfile={handleSaveProfile}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Account Info */}
          <div>
            <h3 className="mb-3 flex items-center text-lg font-semibold text-white">
              <Icons.shield className="mr-2 size-6 text-emerald-500" />
              Account Information
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/5 bg-white/2.5 p-4">
                <label className="text-sm text-white/80">Member Since</label>
                <p className="mt-1 flex items-center font-medium text-white">
                  <Icons.calendar className="mr-2 size-5 text-emerald-500" />
                  {formatDate(user.createdAt)}
                </p>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/2.5 p-4">
                <label className="text-sm text-white/80">Account Status</label>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant="default" className="bg-emerald-600">
                    Active
                  </Badge>
                  {user.emailVerified ? (
                    <Badge variant="default" className="bg-emerald-600">
                      Email Verified
                      <span className="ml-1 text-xs text-white/60">
                        {formatDate(user.emailVerified)}
                      </span>
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="bg-amber-600">
                      Not Verified
                    </Badge>
                  )}
                  <Badge
                    variant="default"
                    className={cn(
                      currentPlan.name === "personal" && "bg-blue-400",
                      currentPlan.name === "pro" && "bg-emerald-400",
                      currentPlan.name === "team" && "bg-violet-400",
                    )}
                  >
                    Plan: {currentPlan.displayName}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Connected Accounts */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Account Connections
              </h3>
              <Badge variant="outline">
                {connectedCount} of {allProviders.length} connected
              </Badge>
            </div>
            {user.accounts.length === 1 && (
              <div className="mb-2 rounded-xl border border-amber-500/30 bg-amber-900/20 p-3">
                <div className="flex items-center text-sm text-amber-500">
                  <Icons.triangleAlert className="mr-2 size-5" />
                  This is your only connected account. Add another account
                  before unlinking.
                </div>
              </div>
            )}
            <div className="space-y-2">
              {allProviders.map((provider) => {
                const Icon = provider.icon;
                const isLoading =
                  isConnecting === provider.id || isUnlinking === provider.id;

                return (
                  <div
                    key={provider.id}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/2.5 p-4"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex gap-3">
                        <p className="font-medium text-white">
                          {provider.name}
                        </p>
                        <Badge
                          variant="outline"
                          className={
                            provider.connected
                              ? "border-emerald-500 text-emerald-500"
                              : "border-slate-500 text-slate-400"
                          }
                        >
                          {provider.connected ? "Connected" : "Not Connected"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {provider.connected ? (
                        canUnlinkAccount(provider.id) ? (
                          <UnlinkAccountDialog
                            isLoading={isLoading}
                            provider={provider}
                            isUnlinking={isUnlinking}
                            onUnlink={() => handleUnlinkAccount(provider.id)}
                          />
                        ) : (
                          <Button
                            variant="secondary"
                            className="size-10 p-0"
                            disabled
                          >
                            <Icons.lock className="size-5" />
                          </Button>
                        )
                      ) : provider.id === "credentials" ? (
                        <SetEmailPasswordDialog
                          isLoading={isSettingPassword}
                          isConnecting={isConnecting}
                          provider={provider}
                          newPassword={newPassword}
                          setNewPassword={setNewPassword}
                          confirmPassword={confirmPassword}
                          setConfirmPassword={setConfirmPassword}
                          isSettingPassword={isSettingPassword}
                          handleSetPassword={handleSetPassword}
                        />
                      ) : (
                        <Button
                          variant="secondary"
                          className="size-10 p-0 text-emerald-500 hover:text-emerald-600"
                          onClick={() => handleConnectAccount(provider.id)}
                          disabled={isLoading}
                        >
                          {isConnecting === provider.id ? (
                            <Icons.loaderCircle className="size-5 animate-spin" />
                          ) : (
                            <Icons.plus className="size-5" />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import { User, Shield, Settings, Clock, Key } from "lucide-react";
import api from "../../services/api";
import useAuthStore from "../../store/authStore";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import InputField from "../common/InputField";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";

const UserProfile = () => {
  // Zustand store se currentUser aur token ko access karte hain
  const currentUser = useAuthStore((state) => state.currentUser);
  const token = useAuthStore((state) => state.token);

  // Login session state - token se login time nikaalte hain
  const [loginSession, setLoginSession] = useState(null);
  const [credentialExpireDate, setCredentialExpireDate] = useState(null);
  const [pageError, setPageError] = useState(false);

  // Account status states - user account ki saari settings yahan manage hoti hain
  const [accountExpired, setAccountExpired] = useState();
  const [accountLocked, setAccountLock] = useState();
  const [accountEnabled, setAccountEnabled] = useState();
  const [credentialExpired, setCredentialExpired] = useState();

  // 2FA states - two factor authentication ke liye
  const [is2faEnabled, setIs2faEnabled] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enable, Step 2: Verify

  // Loading states - different operations ke liye loading indicators
  const [loading, setLoading] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);
  const [disabledLoader, setDisbledLoader] = useState(false);
  const [twofaCodeLoader, settwofaCodeLoader] = useState(false);

  // React Hook Form setup - form validation ke liye
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: currentUser?.username,
      email: currentUser?.email,
      password: "",
    },
    mode: "onTouched",
  });

  // CurrentUser change hone par form values update karo
  useEffect(() => {
    if (currentUser) {
      setValue("username", currentUser.username);
      setValue("email", currentUser.email);
    }
  }, [currentUser, setValue]);

  // Token se login time aur credential expiry date fetch karo
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const loginTime = decodedToken.iat
          ? moment.unix(decodedToken.iat).format("MMMM Do YYYY, h:mm:ss a")
          : "N/A";
        const credExpire = decodedToken.credentialExpiryDate
          ? moment(decodedToken.credentialExpiryDate).format("MMMM Do YYYY")
          : "N/A";

        setLoginSession(loginTime);
        setCredentialExpireDate(credExpire);
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, [token]);

  // 2FA status fetch karna - reusable function
  const fetch2FAStatus = async () => {
    try {
      const response = await api.get(`/auth/user/2fa-status`);
      // Backend returns "twoFactorEnabled" not "is2faEnabled"
      const status =
        response.data.twoFactorEnabled || response.data.is2faEnabled || false;
      setIs2faEnabled(status);
      return status;
    } catch (error) {
      console.error("Error fetching 2FA status:", error);
      return false;
    }
  };

  // 2FA status fetch karna - component mount hone par
  useEffect(() => {
    setPageLoader(true);

    const init2FAStatus = async () => {
      try {
        await fetch2FAStatus();
      } catch (error) {
        setPageError(error?.response?.data?.message);
        toast.error("Error fetching 2FA status");
      } finally {
        setPageLoader(false);
      }
    };
    init2FAStatus();
  }, []);

  // 2FA enable karne ka function - QR code generate hota hai
  const enable2FA = async () => {
    setDisbledLoader(true);
    try {
      const response = await api.post(`/auth/enable-2fa`);
      setQrCodeUrl(response.data);
      setStep(2); // QR code verification step par jaate hain
      toast.success("Scan the QR code with your authenticator app");
    } catch {
      toast.error("Error enabling 2FA");
    } finally {
      setDisbledLoader(false);
    }
  };

  // 2FA disable karne ka function
  const disable2FA = async () => {
    setDisbledLoader(true);
    try {
      await api.post(`/auth/disable-2fa`);
      // Re-fetch status from backend to ensure sync
      const actualStatus = await fetch2FAStatus();
      setIs2faEnabled(actualStatus);
      setQrCodeUrl("");
      setStep(1);
      toast.success("2FA disabled successfully");
    } catch {
      toast.error("Error disabling 2FA");
    } finally {
      setDisbledLoader(false);
    }
  };

  // 2FA code verify karne ka function - authenticator app se code daalke verify karte hain
  const verify2FA = async () => {
    if (!code || code.trim().length === 0) {
      return toast.error("Please Enter The Code To Verify");
    }

    settwofaCodeLoader(true);

    try {
      const formData = new URLSearchParams();
      formData.append("code", code);

      await api.post(`/auth/verify-2fa`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      toast.success("2FA verified successfully");

      // Re-fetch status from backend to ensure sync
      const actualStatus = await fetch2FAStatus();
      setIs2faEnabled(actualStatus);
      setStep(1);
      setCode("");
    } catch {
      toast.error("Invalid 2FA Code");
    } finally {
      settwofaCodeLoader(false);
    }
  };

  // User credentials update karne ka function - username aur password change karte hain
  const handleUpdateCredential = async (data) => {
    const newUsername = data.username;
    const newPassword = data.password;

    try {
      setLoading(true);
      const formData = new URLSearchParams();
      formData.append("token", token);
      formData.append("newUsername", newUsername);
      formData.append("newPassword", newPassword);

      await api.post("/auth/update-credentials", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      toast.success("Credentials updated successfully");
    } catch {
      toast.error("Update Credential failed");
    } finally {
      setLoading(false);
    }
  };

  // Current user ki saari details set karte hain
  useEffect(() => {
    if (currentUser?.id) {
      setValue("username", currentUser.username);
      setValue("email", currentUser.email);
      setAccountExpired(!currentUser.accountNonExpired);
      setAccountLock(!currentUser.accountNonLocked);
      setAccountEnabled(currentUser.enabled);
      setCredentialExpired(!currentUser.credentialsNonExpired);

      // Moment package se date format karte hain
      const expiredFormatDate = moment(
        currentUser?.credentialsExpiryDate
      ).format("D MMMM YYYY");
      setCredentialExpireDate(expiredFormatDate);
    }
  }, [currentUser, setValue]);

  // Token se login session time nikaalte hain
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const lastLoginSession = moment
        .unix(decodedToken.iat)
        .format("dddd, D MMMM YYYY, h:mm A");
      setLoginSession(lastLoginSession);
    }
  }, [token]);

  // Account expiry status toggle karne ka function
  const handleAccountExpiryStatus = async (checked) => {
    setAccountExpired(checked);

    try {
      const formData = new URLSearchParams();
      formData.append("token", token);
      formData.append("expire", checked);

      await api.put("/auth/update-expiry-status", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      toast.success("Account Expiry Status Updated");
    } catch {
      toast.error("Update expiry status failed");
    }
  };

  // Account lock status toggle karne ka function
  const handleAccountLockStatus = async (checked) => {
    setAccountLock(checked);

    try {
      const formData = new URLSearchParams();
      formData.append("token", token);
      formData.append("lock", checked);

      await api.put("/auth/update-lock-status", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      toast.success("Account Lock Status Updated");
    } catch {
      toast.error("Update Account Lock status failed");
    }
  };

  // Account enabled status toggle karne ka function
  const handleAccountEnabledStatus = async (checked) => {
    setAccountEnabled(checked);

    try {
      const formData = new URLSearchParams();
      formData.append("token", token);
      formData.append("enabled", checked);

      await api.put("/auth/update-enabled-status", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      toast.success("Account Enabled Status Updated");
    } catch {
      toast.error("Update Account Enabled status failed");
    }
  };

  // Credential expiry status toggle karne ka function
  const handleCredentialExpiredStatus = async (checked) => {
    setCredentialExpired(checked);

    try {
      const formData = new URLSearchParams();
      formData.append("token", token);
      formData.append("expire", checked);

      await api.put("/auth/update-credentials-expiry-status", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      toast.success("Credentials Expiry Status Updated");
    } catch {
      toast.error("Credentials Expiry Status Failed");
    }
  };

  // Error display karte hain agar page load mein problem aaye
  if (pageError) {
    return <ErrorMessage message={pageError} />;
  }

  // Page loading state dikhate hain
  if (pageLoader) {
    return (
      <div className="min-h-[calc(100vh-74px)] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-74px)] bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-10 px-4 transition-colors">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">
        {/* Left Side - User Info & Settings */}
        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-800/50 dark:border-gray-700">
          <CardHeader className="text-center pb-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-24 h-24 border-4 border-blue-200 dark:border-blue-800">
                <AvatarFallback className="text-3xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                  {currentUser?.username?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-playfair">
                  {currentUser?.username}
                </CardTitle>
                <CardDescription className="text-lg mt-1 dark:text-gray-400">
                  {currentUser?.roles?.[0]}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* User Basic Info */}
            <div className="space-y-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold">Username:</span>
                <span>{currentUser?.username}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="font-semibold">Role:</span>
                <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm">
                  {currentUser?.roles?.[0]}
                </span>
              </div>
            </div>

            {/* Update Credentials Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem
                value="credentials"
                className="border-gray-200 dark:border-gray-700"
              >
                <AccordionTrigger className="text-lg font-semibold hover:no-underline dark:text-gray-200">
                  <div className="flex items-center gap-2">
                    <Key className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Update User Credentials
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <form
                    onSubmit={handleSubmit(handleUpdateCredential)}
                    className="space-y-4 p-4"
                  >
                    <InputField
                      label="Username"
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      register={register}
                      errors={errors}
                      required
                      message="Username is required"
                    />
                    <InputField
                      label="Email"
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      register={register}
                      errors={errors}
                      required
                      readOnly
                    />
                    <InputField
                      label="New Password"
                      id="password"
                      type="password"
                      placeholder="Enter new password"
                      register={register}
                      errors={errors}
                      min={6}
                    />
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      {loading ? "Updating..." : "Update Credentials"}
                    </Button>
                  </form>
                </AccordionContent>
              </AccordionItem>

              {/* Account Settings Accordion */}
              <AccordionItem
                value="settings"
                className="border-gray-200 dark:border-gray-700"
              >
                <AccordionTrigger className="text-lg font-semibold hover:no-underline dark:text-gray-200">
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    Account Settings
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 p-4">
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                      <Label
                        htmlFor="account-expired"
                        className="text-gray-700 dark:text-gray-300 font-medium"
                      >
                        Account Expired
                      </Label>
                      <Switch
                        id="account-expired"
                        checked={accountExpired}
                        onCheckedChange={handleAccountExpiryStatus}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                      <Label
                        htmlFor="account-locked"
                        className="text-gray-700 dark:text-gray-300 font-medium"
                      >
                        Account Locked
                      </Label>
                      <Switch
                        id="account-locked"
                        checked={accountLocked}
                        onCheckedChange={handleAccountLockStatus}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                      <Label
                        htmlFor="account-enabled"
                        className="text-gray-700 dark:text-gray-300 font-medium"
                      >
                        Account Enabled
                      </Label>
                      <Switch
                        id="account-enabled"
                        checked={accountEnabled}
                        onCheckedChange={handleAccountEnabledStatus}
                      />
                    </div>

                    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
                      <CardContent className="pt-6">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          Credential Expiry
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Your credentials will expire on{" "}
                          <span className="font-semibold text-blue-600 dark:text-blue-400">
                            {credentialExpireDate}
                          </span>
                        </p>
                      </CardContent>
                    </Card>

                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                      <Label
                        htmlFor="credential-expired"
                        className="text-gray-700 dark:text-gray-300 font-medium"
                      >
                        Credential Expired
                      </Label>
                      <Switch
                        id="credential-expired"
                        checked={credentialExpired}
                        onCheckedChange={handleCredentialExpiredStatus}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Last Login Session */}
            <Card className="bg-white dark:bg-gray-800 shadow-sm dark:border-gray-700">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      Last Login Session
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {loginSession}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Right Side - 2FA Settings */}
        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-800/50 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2 dark:text-gray-100 font-playfair">
                  <Shield className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                  Two-Factor Authentication
                </CardTitle>
                <CardDescription className="text-base mt-2 dark:text-gray-400">
                  Add an additional layer of security to your account
                </CardDescription>
              </div>
              <div
                className={`px-4 py-2 rounded-full text-white font-semibold ${
                  is2faEnabled
                    ? "bg-gradient-to-r from-green-500 to-emerald-500"
                    : "bg-gradient-to-r from-red-500 to-pink-500"
                }`}
              >
                {is2faEnabled ? "Active" : "Inactive"}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <Button
              onClick={is2faEnabled ? disable2FA : enable2FA}
              disabled={disabledLoader}
              className={`w-full ${
                is2faEnabled
                  ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              }`}
            >
              {disabledLoader
                ? "Loading..."
                : is2faEnabled
                ? "Disable Two-Factor Authentication"
                : "Enable Two-Factor Authentication"}
            </Button>

            {step === 2 && (
              <Card className="bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <CardTitle className="text-lg dark:text-gray-100">
                    Scan QR Code
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Use your authenticator app (Google Authenticator, Authy,
                    etc.) to scan this QR code
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center p-4 bg-white dark:bg-gray-900 rounded-lg">
                    <img
                      src={qrCodeUrl}
                      alt="QR Code"
                      className="max-w-full h-auto"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="2fa-code" className="dark:text-gray-300">
                      Enter Verification Code
                    </Label>
                    <Input
                      id="2fa-code"
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="text-center text-2xl tracking-widest dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                      maxLength={6}
                    />
                    <Button
                      onClick={verify2FA}
                      disabled={twofaCodeLoader}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    >
                      {twofaCodeLoader ? "Verifying..." : "Verify 2FA Code"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { User, Mail, Lock, Shield, Settings } from "lucide-react";
import api from "../../services/api";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import InputField from "../common/InputField";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";

const UserDetails = () => {
  // React Hook Form setup - form validation ke liye
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  // Loading states - different operations ke liye
  const [loading, setLoading] = useState(false);
  const [updateRoleLoader, setUpdateRoleLoader] = useState(false);
  const [passwordLoader, setPasswordLoader] = useState(false);

  // URL se userId nikaalte hain
  const { userId } = useParams();

  // Component states
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [error, setError] = useState(null);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // User details fetch karne ka function
  const fetchUserDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`/admin/user/${userId}`);
      setUser(response.data);
      setSelectedRole(response.data.role?.roleName || "");
    } catch (err) {
      setError(err?.response?.data?.message);
      console.error("Error fetching user details", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // User ki details ko form mein set karte hain
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setValue("username", user.userName);
      setValue("email", user.email);
    }
  }, [user, setValue]);

  // Available roles fetch karne ka function
  const fetchRoles = useCallback(async () => {
    try {
      const response = await api.get("/admin/roles");
      setRoles(response.data);
    } catch (err) {
      setError(err?.response?.data?.message);
      console.error("Error fetching roles", err);
    }
  }, []);

  // Component mount hone par user details aur roles fetch karte hain
  useEffect(() => {
    fetchUserDetails();
    fetchRoles();
  }, [fetchUserDetails, fetchRoles]);

  // Role change handler - dropdown se role select karne par
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  // User ka role update karne ka function
  const handleUpdateRole = async () => {
    setUpdateRoleLoader(true);
    try {
      const formData = new URLSearchParams();
      formData.append("userId", userId);
      formData.append("roleName", selectedRole);

      await api.put(`/admin/update-role`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      fetchUserDetails(); // Fresh data fetch karte hain
      toast.success("Role updated successfully");
    } catch {
      toast.error("Update Role Failed");
    } finally {
      setUpdateRoleLoader(false);
    }
  };

  // User password update karne ka function
  const handleSavePassword = async (data) => {
    setPasswordLoader(true);
    const newPassword = data.password;

    try {
      const formData = new URLSearchParams();
      formData.append("userId", userId);
      formData.append("password", newPassword);

      await api.put(`/admin/update-password`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      setIsEditingPassword(false);
      setValue("password", "");
      toast.success("Password updated successfully");
    } catch {
      toast.error("Error updating password");
    } finally {
      setPasswordLoader(false);
    }
  };

  // Account settings (lock, expire, enabled) toggle karne ka function
  const handleCheckboxChange = async (checked, field, updateUrl) => {
    let message = "";
    switch (field) {
      case "lock":
        message = "Account Lock status updated";
        break;
      case "expire":
        message = "Account Expiry status updated";
        break;
      case "enabled":
        message = "Account Enabled status updated";
        break;
      case "credentialsExpire":
        message = "Credentials Expiry status updated";
        break;
      default:
        message = "Status updated";
    }

    try {
      const formData = new URLSearchParams();
      formData.append("userId", userId);
      formData.append(field, checked);

      await api.put(updateUrl, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      fetchUserDetails(); // Fresh data fetch karte hain
      toast.success(message);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  // Error handle karte hain
  if (error) {
    return <ErrorMessage message={error} />;
  }

  // Loading state dikhate hain
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-74px)]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Profile Information Card */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-800/50 dark:border-gray-700">
        <CardHeader className="border-b dark:border-gray-700">
          <CardTitle className="text-2xl flex items-center gap-2 dark:text-gray-100">
            <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form
            onSubmit={handleSubmit(handleSavePassword)}
            className="space-y-4"
          >
            <InputField
              label="Username"
              id="username"
              type="text"
              placeholder="Enter username"
              register={register}
              errors={errors}
              required
              readOnly
              icon={<User className="w-4 h-4" />}
            />
            <InputField
              label="Email"
              id="email"
              type="email"
              placeholder="Enter email"
              register={register}
              errors={errors}
              required
              readOnly
              icon={<Mail className="w-4 h-4" />}
            />
            <InputField
              label="Password"
              id="password"
              type="password"
              placeholder="Enter new password"
              register={register}
              errors={errors}
              required={isEditingPassword}
              readOnly={!isEditingPassword}
              min={6}
              icon={<Lock className="w-4 h-4" />}
            />

            <div className="flex gap-3">
              {!isEditingPassword ? (
                <Button
                  type="button"
                  onClick={() => setIsEditingPassword(true)}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                >
                  Edit Password
                </Button>
              ) : (
                <>
                  <Button
                    type="submit"
                    disabled={passwordLoader}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    {passwordLoader ? "Saving..." : "Save Password"}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setIsEditingPassword(false);
                      setValue("password", "");
                    }}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Admin Actions Card */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-800/50 dark:border-gray-700">
        <CardHeader className="border-b dark:border-gray-700">
          <CardTitle className="text-2xl flex items-center gap-2 dark:text-gray-100">
            <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            Admin Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Role Update Section */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold flex items-center gap-2 dark:text-gray-200">
              <Shield className="w-5 h-5" />
              User Role
            </Label>
            <div className="flex gap-3 items-center">
              <select
                value={selectedRole}
                onChange={handleRoleChange}
                className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-100 uppercase font-semibold"
              >
                {roles.map((role) => (
                  <option key={role.roleId} value={role.roleName}>
                    {role.roleName}
                  </option>
                ))}
              </select>
              <Button
                onClick={handleUpdateRole}
                disabled={updateRoleLoader}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {updateRoleLoader ? "Updating..." : "Update Role"}
              </Button>
            </div>
          </div>

          {/* Account Settings Section */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold flex items-center gap-2 dark:text-gray-200">
              <Settings className="w-5 h-5" />
              Account Settings
            </Label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                <Label
                  htmlFor="lock"
                  className="font-medium dark:text-gray-200"
                >
                  Lock Account
                </Label>
                <input
                  id="lock"
                  type="checkbox"
                  checked={!user?.accountNonLocked}
                  onChange={(e) =>
                    handleCheckboxChange(
                      e.target.checked,
                      "lock",
                      "/admin/update-lock-status"
                    )
                  }
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                <Label
                  htmlFor="expire"
                  className="font-medium dark:text-gray-200"
                >
                  Account Expired
                </Label>
                <input
                  id="expire"
                  type="checkbox"
                  checked={!user?.accountNonExpired}
                  onChange={(e) =>
                    handleCheckboxChange(
                      e.target.checked,
                      "expire",
                      "/admin/update-expiry-status"
                    )
                  }
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                <Label
                  htmlFor="enabled"
                  className="font-medium dark:text-gray-200"
                >
                  Account Enabled
                </Label>
                <input
                  id="enabled"
                  type="checkbox"
                  checked={user?.enabled}
                  onChange={(e) =>
                    handleCheckboxChange(
                      e.target.checked,
                      "enabled",
                      "/admin/update-enabled-status"
                    )
                  }
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                <Label
                  htmlFor="credExpire"
                  className="font-medium dark:text-gray-200"
                >
                  Credentials Expired
                </Label>
                <input
                  id="credExpire"
                  type="checkbox"
                  checked={!user?.credentialsNonExpired}
                  onChange={(e) =>
                    handleCheckboxChange(
                      e.target.checked,
                      "credentialsExpire",
                      "/admin/update-credentials-expiry-status"
                    )
                  }
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetails;

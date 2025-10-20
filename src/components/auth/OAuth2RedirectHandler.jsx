import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Loader2 } from "lucide-react";
import useAuthStore from "@/store/authStore";

// OAuth2 redirect handler - Google/GitHub login ke baad redirect handle karega
const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Zustand store se token aur admin status set karne ke functions
  const { setToken, setIsAdmin, fetchUser } = useAuthStore();

  useEffect(() => {
    // URL query params se token extract karenge
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    console.log("OAuth2RedirectHandler: Params:", params.toString());
    console.log("OAuth2RedirectHandler: Token:", token);

    if (token) {
      try {
        // JWT token ko decode karke user details nikalenge
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);

        // LocalStorage me token store karo
        localStorage.setItem("JWT_TOKEN", token);

        // User object banao with username aur roles
        const user = {
          username: decodedToken.sub,
          roles: decodedToken.roles.split(","),
        };
        console.log("User Object:", user);
        localStorage.setItem("USER", JSON.stringify(user));

        // Zustand store update karo - global state me user info available ho jayegi
        setToken(token);
        setIsAdmin(user.roles.includes("ADMIN"));

        // User data fetch karo - current user state update hogi
        fetchUser();

        // Thoda delay deke navigation karo - localStorage operations complete hone ke liye
        setTimeout(() => {
          console.log("Navigating to /notes");
          navigate("/notes", { replace: true });
        }, 100); // 100ms delay
      } catch (error) {
        console.error("Token decoding failed:", error);
        navigate("/login", { replace: true });
      }
    } else {
      // Token nahi mila toh login page par bhej do
      console.log("Token not found in URL, redirecting to login");
      navigate("/login", { replace: true });
    }
  }, [location, navigate, setToken, setIsAdmin, fetchUser]);

  return (
    <div className="min-h-[calc(100vh-74px)] flex flex-col items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-lg text-muted-foreground">Redirecting...</p>
    </div>
  );
};

export default OAuth2RedirectHandler;

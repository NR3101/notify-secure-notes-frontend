import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../services/api";
import toast from "react-hot-toast";

// Zustand store - Context API ka replacement
// Yaha par hum application ki saari global state manage karenge
const useAuthStore = create(
  persist(
    (set, _get) => ({
      // State variables
      token: localStorage.getItem("JWT_TOKEN") || null,
      currentUser: null,
      isAdmin: JSON.parse(localStorage.getItem("IS_ADMIN") || "false"),
      openSidebar: true, // Admin panel sidebar ke liye

      // Token set karne ka function
      setToken: (token) => {
        if (token) {
          localStorage.setItem("JWT_TOKEN", token);
        } else {
          localStorage.removeItem("JWT_TOKEN");
        }
        set({ token });
      },

      // Current user set karne ka function
      setCurrentUser: (user) => {
        set({ currentUser: user });
      },

      // Admin status set karne ka function
      setIsAdmin: (isAdmin) => {
        if (isAdmin) {
          localStorage.setItem("IS_ADMIN", JSON.stringify(isAdmin));
        } else {
          localStorage.removeItem("IS_ADMIN");
        }
        set({ isAdmin });
      },

      // Sidebar toggle karne ka function - admin panel me use hoga
      setOpenSidebar: (openSidebar) => {
        set({ openSidebar });
      },

      // Current logged in user ko fetch karne ka function
      // Backend se user ki details aur roles check karenge
      fetchUser: async () => {
        const user = JSON.parse(localStorage.getItem("USER") || "null");

        if (user?.username) {
          try {
            const { data } = await api.get("/auth/user");
            const roles = data.roles;

            // Check karo ki user admin hai ya nahi
            if (roles.includes("ROLE_ADMIN")) {
              localStorage.setItem("IS_ADMIN", JSON.stringify(true));
              set({ isAdmin: true });
            } else {
              localStorage.removeItem("IS_ADMIN");
              set({ isAdmin: false });
            }

            set({ currentUser: data });
          } catch (error) {
            console.error("Error fetching current user", error);
            toast.error("Error fetching current user");
          }
        }
      },

      // Logout function - saari state clear kar dega
      logout: () => {
        localStorage.removeItem("JWT_TOKEN");
        localStorage.removeItem("USER");
        localStorage.removeItem("IS_ADMIN");
        localStorage.removeItem("CSRF_TOKEN");
        set({
          token: null,
          currentUser: null,
          isAdmin: false,
        });
      },
    }),
    {
      name: "auth-storage", // LocalStorage me store hoga
      partialize: (state) => ({
        token: state.token,
        isAdmin: state.isAdmin,
      }),
    }
  )
);

export default useAuthStore;

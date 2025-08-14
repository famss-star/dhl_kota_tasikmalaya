"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, rememberMe: boolean) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await response.json();

      if (data.success && data.user) {
        const user = data.user;
        console.log('🔐 Login success, user role:', user.role); // Debug log
        const authData = {
          isLoggedIn: true,
          user: user,
          role: user.role, // This should be 'ADMIN' from database
          timestamp: Date.now()
        };
        
        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("auth", JSON.stringify(authData));
        } else {
          sessionStorage.setItem("user", JSON.stringify(user));
          sessionStorage.setItem("auth", JSON.stringify(authData));
        }
        setUser(user);
        // Set cookie 'user' agar bisa dibaca middleware (expires 7 hari jika rememberMe, session jika tidak)
        document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; path=/;${rememberMe ? " max-age=604800;" : ""}`;
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("auth");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("auth");
    // Hapus cookie 'user' dengan set expired ke masa lalu
    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

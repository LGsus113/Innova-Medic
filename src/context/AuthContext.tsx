import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "@src/api/implements/api-hook";
import { ENDPOINTS } from "@src/api/endpoints";
import type { UsuarioValidado, AuthContextType } from "@src/types/type";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UsuarioValidado | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { fetchData } = useApi();

  useEffect(() => {
    const stored = localStorage.getItem("session");
    if (stored) {
      try {
        const session = JSON.parse(stored);
        setUser(session.user);
      } catch {
        localStorage.removeItem("session");
      }
    }
    setLoading(false);
  }, []);

  const updateUser = (newUser: UsuarioValidado, token: string) => {
    const session = { user: newUser, token };
    setUser(newUser);
    localStorage.setItem("session", JSON.stringify(session));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("session");
    navigate("/");
  };

  const login = async (
    email: string,
    password: string
  ): Promise<{ token: string; usuario: UsuarioValidado }> => {
    const user = await fetchData(ENDPOINTS.USUARIO.VALIDATION(), {
      method: "POST",
      body: { email, contrasenia: password },
    });

    const { token, usuario } = user;

    updateUser(usuario, token);
    return { token, usuario };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        updateUser,
        logout,
        login,
        isAuthenticated: !!user,
        userId: user?.idUsuario || 0,
        fullName:
          user?.nombre && user?.apellido
            ? `${user.nombre} ${user.apellido}`
            : null,
        role: user?.rol || null,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};

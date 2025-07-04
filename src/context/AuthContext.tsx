import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUsuario } from "@src/api/api-T/method/login-usuario";
import { usePerfilUsuario } from "@src/api/api-T/method/perfil-usuario";
import type {
  UsuarioValidado,
  PerfilUsuario,
  SessionData,
  AuthContextType,
} from "@src/types/type";

const AuthContext = createContext<AuthContextType | null>(null);

const DEFAULT_SESSION: SessionData = {
  user: null,
  token: "",
  perfil: undefined,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UsuarioValidado | null>(null);
  const [perfil, setPerfil] = useState<PerfilUsuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { loginUsuario } = useLoginUsuario();
  const { fetchPerfil: fetchPerfilApi } = usePerfilUsuario(user?.idUsuario);

  const updateSession = (updates: Partial<SessionData>) => {
    const currentSession = JSON.parse(
      localStorage.getItem("session") || JSON.stringify(DEFAULT_SESSION)
    );
    const newSession: SessionData = { ...currentSession, ...updates };

    localStorage.setItem("session", JSON.stringify(newSession));

    if (updates.user !== undefined) setUser(updates.user);
    if (updates.perfil !== undefined) setPerfil(updates.perfil || null);
  };

  useEffect(() => {
    const initializeAuth = () => {
      const stored = localStorage.getItem("session");
      if (stored) {
        try {
          const session: SessionData = JSON.parse(stored);
          if (!session.token || !session.user) {
            throw new Error("Sesión inválida");
          }

          setUser(session.user);
          setPerfil(session.perfil || null);
        } catch (err) {
          localStorage.removeItem("session");
          setError("Error al cargar la sesión");
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const logout = () => {
    updateSession({ user: null, perfil: null, token: "" });
    navigate("/");
  };

  const login = async (
    email: string,
    password: string
  ): Promise<{ token: string; usuario: UsuarioValidado }> => {
    setLoading(true);
    try {
      const result = await loginUsuario(email, password);

      if (!result.success) {
        throw new Error(result.errorMsg || "Credenciales inválidas");
      }

      const { token, refreshToken, usuario } = result;
      updateSession({ user: usuario, token, refreshToken });

      return { token, usuario };
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchPerfil = async (forceUpdate = false): Promise<PerfilUsuario> => {
    try {
      if (!user?.idUsuario) throw new Error("Usuario no autenticado");

      if (perfil && !forceUpdate) {
        return perfil;
      }

      const perfilData = await fetchPerfilApi();
      updateSession({ perfil: perfilData });
      return perfilData;
    } catch (error) {
      setError("Error al cargar el perfil");
      throw error;
    }
  };

  const refreshPerfil = async (): Promise<PerfilUsuario> => {
    return fetchPerfil(true);
  };

  const updateUser = (newUser: UsuarioValidado, token: string) => {
    updateSession({ user: newUser, token });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        perfil,
        error,
        loading,
        updateUser,
        logout,
        login,
        fetchPerfil,
        refreshPerfil,
        isAuthenticated: !!user,
        userId: user?.idUsuario || 0,
        fullName: user ? `${user.nombre} ${user.apellido}` : null,
        role: user?.rol || null,
        clearError: () => setError(null),
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

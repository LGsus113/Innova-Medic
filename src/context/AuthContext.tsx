import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "@src/api/implements/api-hook";
import { ENDPOINTS } from "@src/api/endpoints";
import type {
  UsuarioValidado,
  PerfilUsuario,
  SessionData,
  PerfilMedico,
  PerfilPaciente,
  ApiResponse,
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
  const { fetchData } = useApi();

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
    const initializeAuth = async () => {
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
    try {
      setLoading(true);
      const response = await fetchData(ENDPOINTS.USUARIO.VALIDATION(), {
        method: "POST",
        body: { email, contrasenia: password },
      });

      const { token, usuario } = response;
      updateSession({ user: usuario, token });

      return { token, usuario };
    } catch (error) {
      setError("Error al iniciar sesión");
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

      const response = await fetchData<ApiResponse<PerfilUsuario>>(
        ENDPOINTS.USUARIO.PERFIL(user.idUsuario)
      );

      if (user.rol === "Medico") {
        const perfilMedico = response.user as PerfilMedico;
        if (!perfilMedico.especialidad || !perfilMedico.numeroColegiado) {
          throw new Error("Perfil de médico incompleto");
        }
      } else if (user.rol === "Paciente") {
        const perfilPaciente = response.user as PerfilPaciente;
        if (!perfilPaciente.fechaNacimiento || !perfilPaciente.talla) {
          throw new Error("Perfil de paciente incompleto");
        }
      }

      updateSession({ perfil: response.user });
      return response.user;
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

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import authService from '../services/authService'

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>
  register: (
    email: string,
    password: string,
    name: string,
    category: string
  ) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = authService.getAccessToken()
    setIsAuthenticated(!!token)
    setIsLoading(false)
  }, [])

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    setIsLoading(true)
    try {
      await authService.login({ email, password, rememberMe })
      setIsAuthenticated(true)
    } catch (error) {
      setIsAuthenticated(false)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (
    email: string,
    password: string,
    name: string
  ) => {
    setIsLoading(true)
    try {
      await authService.register({ email, password, name })
      setIsAuthenticated(false)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    authService.logout()
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

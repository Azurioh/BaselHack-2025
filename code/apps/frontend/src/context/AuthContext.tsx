import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import authService from '../services/authService'
import { getMyUser } from '../api/user'

interface UserInformation {
  id: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  userInformation: UserInformation | null
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
  const [userInformation, setUserInformation] = useState<UserInformation | null>(null)

  const getUserInformation = async () => {
    const response = await getMyUser();

    setUserInformation({
      id: response.data._id,
      name: response.data.name,
      email: response.data.email,
      role: response.data.role,
    })
  }

  useEffect(() => {
    const token = authService.getAccessToken()
    setIsAuthenticated(!!token)
    setIsLoading(false)
    getUserInformation();
  }, [])

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    setIsLoading(true)
    try {
      await authService.login({ email, password, rememberMe })
      await getUserInformation();
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
        userInformation,
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

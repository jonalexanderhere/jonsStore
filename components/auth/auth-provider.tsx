'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, getCurrentUser } from '@/lib/auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshUser = async () => {
    try {
      setLoading(true)
      setError(null)
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    } catch (error) {
      console.error('Error refreshing user:', error)
      setError(error instanceof Error ? error.message : 'Unknown error')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Add a small delay to prevent hydration issues
    const timer = setTimeout(() => {
      refreshUser()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Show error state if there's a critical error
  if (error && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Authentication Error
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={refreshUser}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser }}>
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

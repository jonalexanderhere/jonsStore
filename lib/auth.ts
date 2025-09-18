import { createClient } from './supabase'

export interface User {
  id: string
  email: string
  full_name: string
  role: 'customer' | 'admin'
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return null
    }

    // Get user data from users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, email, full_name, role')
      .eq('id', user.id)
      .single()

    if (userError) {
      // If user doesn't exist in users table, create it
      if (userError.code === 'PGRST116') {
        const { data: newUserData, error: createError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            email: user.email!,
            full_name: user.user_metadata?.full_name || user.email!.split('@')[0],
            role: user.user_metadata?.role || 'customer'
          })
          .select('id, email, full_name, role')
          .single()

        if (createError || !newUserData) {
          console.error('Error creating user profile:', createError)
          return null
        }

        return newUserData as User
      }
      return null
    }

    if (!userData) {
      return null
    }

    return userData as User
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export async function signOut() {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      throw error
    }
    
    return { success: true }
  } catch (error) {
    console.error('Error signing out:', error)
    return { success: false, error }
  }
}

export function isAdmin(user: User | null): boolean {
  return user?.role === 'admin'
}

export function requireAuth(redirectTo: string = '/auth/login') {
  return {
    redirect: {
      destination: redirectTo,
      permanent: false,
    },
  }
}

export function requireAdmin(redirectTo: string = '/') {
  return {
    redirect: {
      destination: redirectTo,
      permanent: false,
    },
  }
}

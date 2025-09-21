import { createBrowserClient } from '@supabase/ssr'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export const createServerSupabaseClient = () => {
  const cookieStore = cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}

// Real-time subscription helper
export const subscribeToRealtime = (table: string, callback: (payload: any) => void) => {
  const supabase = createClient()
  
  return supabase
    .channel(`${table}_changes`)
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: table 
      }, 
      callback
    )
    .subscribe()
}

// Real-time product updates
export const subscribeToProducts = (callback: (payload: any) => void) => {
  return subscribeToRealtime('products', callback)
}

// Real-time cart updates
export const subscribeToCart = (userId: string, callback: (payload: any) => void) => {
  const supabase = createClient()
  
  return supabase
    .channel(`cart_${userId}`)
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'cart_items',
        filter: `user_id=eq.${userId}`
      }, 
      callback
    )
    .subscribe()
}

// Real-time order updates
export const subscribeToOrders = (userId: string, callback: (payload: any) => void) => {
  const supabase = createClient()
  
  return supabase
    .channel(`orders_${userId}`)
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'orders',
        filter: `user_id=eq.${userId}`
      }, 
      callback
    )
    .subscribe()
}

// Real-time notifications
export const subscribeToNotifications = (userId: string, callback: (payload: any) => void) => {
  const supabase = createClient()
  
  return supabase
    .channel(`notifications_${userId}`)
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'notifications',
        filter: `user_id=eq.${userId}`
      }, 
      callback
    )
    .subscribe()
}

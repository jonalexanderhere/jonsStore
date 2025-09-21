import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Real-time subscription types
interface RealtimePayload {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE'
  new: Record<string, unknown>
  old: Record<string, unknown>
}


// Real-time subscription helper
export const subscribeToRealtime = (table: string, callback: (payload: RealtimePayload) => void) => {
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
export const subscribeToProducts = (callback: (payload: RealtimePayload) => void) => {
  return subscribeToRealtime('products', callback)
}

// Real-time cart updates
export const subscribeToCart = (userId: string, callback: (payload: RealtimePayload) => void) => {
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
export const subscribeToOrders = (userId: string, callback: (payload: RealtimePayload) => void) => {
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
export const subscribeToNotifications = (userId: string, callback: (payload: RealtimePayload) => void) => {
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

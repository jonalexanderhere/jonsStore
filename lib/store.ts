import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from './types'
import { createClient } from './supabase'

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
  syncCartFromDB: () => Promise<void>
  syncCartToDB: (userId: string) => Promise<void>
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product, quantity = 1) => {
        const items = get().items
        const existingItem = items.find(item => item.product_id === product.id)
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.product_id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          })
        } else {
          set({
            items: [...items, {
              id: `${product.id}-${Date.now()}`,
              product_id: product.id,
              product,
              quantity,
              user_id: '',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }]
          })
        }
      },
      
      removeItem: (productId: string) => {
        set({
          items: get().items.filter(item => item.product_id !== productId)
        })
      },
      
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        
        set({
          items: get().items.map(item =>
            item.product_id === productId
              ? { ...item, quantity }
              : item
          )
        })
      },
      
      clearCart: () => {
        set({ items: [] })
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          return total + (item.product.price * item.quantity)
        }, 0)
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      syncCartFromDB: async () => {
        try {
          const supabase = createClient()
          const { data: { user } } = await supabase.auth.getUser()
          
          if (!user) return

          const { data: cartItems, error } = await supabase
            .from('cart_items')
            .select(`
              *,
              product:products(*)
            `)
            .eq('user_id', user.id)

          if (error) {
            console.error('Error syncing cart from DB:', error)
            return
          }

          if (cartItems) {
            const transformedItems = cartItems.map(item => ({
              id: item.id,
              product_id: item.product_id,
              product: item.product,
              quantity: item.quantity,
              user_id: item.user_id,
              created_at: item.created_at,
              updated_at: item.updated_at
            }))
            
            set({ items: transformedItems })
          }
        } catch (error) {
          console.error('Error syncing cart from DB:', error)
        }
      },

      syncCartToDB: async (userId: string) => {
        try {
          const supabase = createClient()
          const items = get().items

          // Clear existing cart items
          await supabase
            .from('cart_items')
            .delete()
            .eq('user_id', userId)

          // Insert new cart items
          if (items.length > 0) {
            const cartItems = items.map(item => ({
              user_id: userId,
              product_id: item.product_id,
              quantity: item.quantity
            }))

            const { error } = await supabase
              .from('cart_items')
              .insert(cartItems)

            if (error) {
              console.error('Error syncing cart to DB:', error)
            }
          }
        } catch (error) {
          console.error('Error syncing cart to DB:', error)
        }
      }
    }),
    {
      name: 'cart-storage',
    }
  )
)


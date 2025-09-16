export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  original_price?: number
  images: string[]
  category_id: string
  category: Category
  stock: number
  is_active: boolean
  is_featured: boolean
  tags: string[]
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  description?: string
  image?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  product_id: string
  product: Product
  quantity: number
  user_id: string
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  user: User
  total_amount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  shipping_address: Address
  order_items: OrderItem[]
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product: Product
  quantity: number
  price: number
  created_at: string
}

export interface Address {
  id: string
  user_id: string
  full_name: string
  phone: string
  address: string
  city: string
  postal_code: string
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  order_id: string
  amount: number
  currency: string
  status: 'pending' | 'succeeded' | 'failed' | 'cancelled'
  payment_method: string
  stripe_payment_intent_id?: string
  created_at: string
  updated_at: string
}

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Data kategori
const categories = [
  {
    id: '1',
    name: 'Elektronik',
    description: 'Produk elektronik dan gadget terbaru dengan teknologi canggih',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Fashion',
    description: 'Pakaian dan aksesoris fashion terkini untuk gaya modern',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Rumah & Taman',
    description: 'Furnitur dan dekorasi rumah untuk hunian yang nyaman',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Olahraga',
    description: 'Perlengkapan olahraga dan fitness untuk gaya hidup sehat',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

// Data produk dengan gambar yang sebenarnya
const products = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    description: 'Smartphone terbaru dengan teknologi canggih, kamera 48MP, dan chip A17 Pro yang powerful',
    price: 19999000,
    original_price: 22999000,
    images: [
      'https://images.unsplash.com/photo-1592899677977-9c10b588e3a9?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop'
    ],
    category_id: '1',
    stock: 50,
    is_active: true,
    is_featured: true,
    tags: ['smartphone', 'apple', 'premium', '5g'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'MacBook Air M2',
    description: 'Laptop ringan dengan performa tinggi, chip M2, dan baterai tahan lama',
    price: 15999000,
    original_price: 17999000,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop'
    ],
    category_id: '1',
    stock: 30,
    is_active: true,
    is_featured: true,
    tags: ['laptop', 'apple', 'work', 'm2'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    description: 'Headphone noise cancelling premium dengan kualitas audio terbaik',
    price: 3999000,
    original_price: 4999000,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop'
    ],
    category_id: '1',
    stock: 100,
    is_active: true,
    is_featured: false,
    tags: ['headphone', 'audio', 'sony', 'wireless'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Nike Air Max 270',
    description: 'Sepatu olahraga dengan teknologi terbaru dan desain yang stylish',
    price: 1999000,
    original_price: 2499000,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop'
    ],
    category_id: '4',
    stock: 75,
    is_active: true,
    is_featured: false,
    tags: ['sepatu', 'nike', 'olahraga', 'running'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Smartphone Android premium dengan kamera 200MP dan S Pen',
    price: 18999000,
    original_price: 21999000,
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop'
    ],
    category_id: '1',
    stock: 40,
    is_active: true,
    is_featured: true,
    tags: ['smartphone', 'samsung', 'android', 'premium'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Adidas Ultraboost 22',
    description: 'Sepatu lari dengan teknologi Boost untuk kenyamanan maksimal',
    price: 2299000,
    original_price: 2799000,
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop'
    ],
    category_id: '4',
    stock: 60,
    is_active: true,
    is_featured: false,
    tags: ['sepatu', 'adidas', 'running', 'boost'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Dell XPS 13',
    description: 'Laptop ultrabook dengan layar InfinityEdge dan performa tinggi',
    price: 17999000,
    original_price: 19999000,
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=500&h=500&fit=crop'
    ],
    category_id: '1',
    stock: 25,
    is_active: true,
    is_featured: false,
    tags: ['laptop', 'dell', 'ultrabook', 'business'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '8',
    name: 'AirPods Pro 2',
    description: 'Earbuds wireless dengan noise cancellation dan spatial audio',
    price: 2999000,
    original_price: 3499000,
    images: [
      'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=500&fit=crop'
    ],
    category_id: '1',
    stock: 80,
    is_active: true,
    is_featured: false,
    tags: ['earbuds', 'apple', 'wireless', 'noise-cancellation'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

async function setupDatabase() {
  try {
    console.log('🚀 Setting up database...')

    // Setup categories
    console.log('📁 Creating categories...')
    for (const category of categories) {
      const { error } = await supabase
        .from('categories')
        .upsert(category, { onConflict: 'id' })
      
      if (error) {
        console.error('Error creating category:', error)
      } else {
        console.log(`✅ Category created: ${category.name}`)
      }
    }

    // Setup products
    console.log('📦 Creating products...')
    for (const product of products) {
      const { error } = await supabase
        .from('products')
        .upsert(product, { onConflict: 'id' })
      
      if (error) {
        console.error('Error creating product:', error)
      } else {
        console.log(`✅ Product created: ${product.name}`)
      }
    }

    console.log('🎉 Database setup completed successfully!')
    console.log(`📊 Created ${categories.length} categories and ${products.length} products`)

  } catch (error) {
    console.error('❌ Error setting up database:', error)
  }
}

setupDatabase()

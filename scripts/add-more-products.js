const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Data kategori tambahan
const additionalCategories = [
  {
    id: '5',
    name: 'Kecantikan',
    description: 'Produk kecantikan dan perawatan tubuh untuk penampilan optimal',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Buku',
    description: 'Buku dan literatur berbagai genre untuk menambah wawasan',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Makanan & Minuman',
    description: 'Makanan dan minuman berkualitas untuk kebutuhan sehari-hari',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Mainan & Hobi',
    description: 'Mainan anak-anak dan perlengkapan hobi untuk semua usia',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

// Data produk tambahan dengan gambar yang sebenarnya
const additionalProducts = [
  // Elektronik
  {
    id: '9',
    name: 'iPad Pro 12.9"',
    description: 'Tablet profesional dengan chip M2 dan layar Liquid Retina XDR',
    price: 12999000,
    original_price: 14999000,
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1561154464-82ee9adf2394?w=500&h=500&fit=crop'
    ],
    category_id: '1',
    stock: 35,
    is_active: true,
    is_featured: true,
    tags: ['tablet', 'apple', 'ipad', 'pro'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '10',
    name: 'Samsung 55" QLED TV',
    description: 'Smart TV 4K dengan teknologi QLED dan HDR10+',
    price: 8999000,
    original_price: 10999000,
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=500&fit=crop'
    ],
    category_id: '1',
    stock: 20,
    is_active: true,
    is_featured: false,
    tags: ['tv', 'samsung', '4k', 'smart'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '11',
    name: 'Canon EOS R5',
    description: 'Kamera mirrorless profesional dengan sensor 45MP dan video 8K',
    price: 45999000,
    original_price: 49999000,
    images: [
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop'
    ],
    category_id: '1',
    stock: 15,
    is_active: true,
    is_featured: true,
    tags: ['kamera', 'canon', 'mirrorless', 'profesional'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '12',
    name: 'PlayStation 5',
    description: 'Konsol game generasi terbaru dengan grafis 4K dan ray tracing',
    price: 7999000,
    original_price: 8999000,
    images: [
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e4?w=500&h=500&fit=crop'
    ],
    category_id: '1',
    stock: 25,
    is_active: true,
    is_featured: false,
    tags: ['gaming', 'playstation', 'console', '4k'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // Fashion
  {
    id: '13',
    name: 'Levi\'s 501 Original Jeans',
    description: 'Jeans klasik dengan potongan straight fit yang timeless',
    price: 899000,
    original_price: 1199000,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c385553b7?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=500&fit=crop'
    ],
    category_id: '2',
    stock: 100,
    is_active: true,
    is_featured: false,
    tags: ['jeans', 'levis', 'denim', 'classic'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '14',
    name: 'Zara Blazer Premium',
    description: 'Blazer formal dengan potongan slim fit dan bahan berkualitas tinggi',
    price: 1299000,
    original_price: 1599000,
    images: [
      'https://images.unsplash.com/photo-1594938298605-cd64d1906916?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop'
    ],
    category_id: '2',
    stock: 50,
    is_active: true,
    is_featured: true,
    tags: ['blazer', 'zara', 'formal', 'business'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '15',
    name: 'Nike Air Jordan 1',
    description: 'Sepatu basket legendaris dengan desain klasik dan kualitas premium',
    price: 2299000,
    original_price: 2799000,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop'
    ],
    category_id: '2',
    stock: 40,
    is_active: true,
    is_featured: true,
    tags: ['sneakers', 'nike', 'jordan', 'basketball'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // Rumah & Taman
  {
    id: '16',
    name: 'IKEA Hemnes Bed Frame',
    description: 'Rangka tempat tidur kayu solid dengan desain minimalis dan fungsional',
    price: 2999000,
    original_price: 3499000,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=500&fit=crop'
    ],
    category_id: '3',
    stock: 15,
    is_active: true,
    is_featured: false,
    tags: ['furniture', 'bed', 'ikea', 'wood'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '17',
    name: 'Dyson V15 Detect Vacuum',
    description: 'Vacuum cleaner tanpa kabel dengan teknologi laser dan penyedot debu canggih',
    price: 5999000,
    original_price: 6999000,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop'
    ],
    category_id: '3',
    stock: 30,
    is_active: true,
    is_featured: true,
    tags: ['vacuum', 'dyson', 'cleaning', 'cordless'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // Olahraga
  {
    id: '18',
    name: 'Peloton Bike+',
    description: 'Sepeda statis premium dengan layar 22" dan kelas virtual interaktif',
    price: 24999000,
    original_price: 27999000,
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop'
    ],
    category_id: '4',
    stock: 10,
    is_active: true,
    is_featured: true,
    tags: ['fitness', 'bike', 'peloton', 'cardio'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '19',
    name: 'Lululemon Yoga Mat',
    description: 'Mat yoga premium dengan teknologi anti-slip dan bahan ramah lingkungan',
    price: 899000,
    original_price: 1099000,
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop'
    ],
    category_id: '4',
    stock: 80,
    is_active: true,
    is_featured: false,
    tags: ['yoga', 'mat', 'lululemon', 'fitness'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // Kecantikan
  {
    id: '20',
    name: 'SK-II Facial Treatment Essence',
    description: 'Essence perawatan wajah premium dengan Pitera untuk kulit yang bercahaya',
    price: 2999000,
    original_price: 3499000,
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop'
    ],
    category_id: '5',
    stock: 25,
    is_active: true,
    is_featured: true,
    tags: ['skincare', 'essence', 'sk-ii', 'premium'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // Buku
  {
    id: '21',
    name: 'Atomic Habits - James Clear',
    description: 'Buku bestseller tentang membangun kebiasaan baik dan menghilangkan kebiasaan buruk',
    price: 199000,
    original_price: 249000,
    images: [
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop'
    ],
    category_id: '6',
    stock: 150,
    is_active: true,
    is_featured: false,
    tags: ['buku', 'self-help', 'habits', 'motivation'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

async function addMoreProducts() {
  try {
    console.log('🚀 Adding more products and categories...')

    // Add additional categories
    console.log('📁 Adding categories...')
    for (const category of additionalCategories) {
      const { error } = await supabase
        .from('categories')
        .upsert(category, { onConflict: 'id' })
      
      if (error) {
        console.error('Error creating category:', error)
      } else {
        console.log(`✅ Category created: ${category.name}`)
      }
    }

    // Add additional products
    console.log('📦 Adding products...')
    for (const product of additionalProducts) {
      const { error } = await supabase
        .from('products')
        .upsert(product, { onConflict: 'id' })
      
      if (error) {
        console.error('Error creating product:', error)
      } else {
        console.log(`✅ Product created: ${product.name}`)
      }
    }

    console.log('🎉 All products and categories added successfully!')
    console.log(`📊 Added ${additionalCategories.length} categories and ${additionalProducts.length} products`)

  } catch (error) {
    console.error('❌ Error adding products:', error)
  }
}

addMoreProducts()

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Data lengkap untuk database
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
  },
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

const products = [
  // Elektronik
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
    id: '5',
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
    id: '6',
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
  },
  {
    id: '7',
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
    id: '8',
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
    id: '9',
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
    id: '10',
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
    id: '11',
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
    id: '12',
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
    id: '13',
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

  // Olahraga
  {
    id: '14',
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
    id: '15',
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
    id: '16',
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
    id: '17',
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

  // Rumah & Taman
  {
    id: '18',
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
    id: '19',
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

async function setupDatabase() {
  try {
    console.log('🚀 Setting up complete e-commerce database...')
    console.log('📊 This will create categories, products, and admin user')

    // Step 1: Create categories
    console.log('\n📁 Creating categories...')
    for (const category of categories) {
      const { error } = await supabase
        .from('categories')
        .upsert(category, { onConflict: 'id' })
      
      if (error) {
        console.error(`❌ Error creating category ${category.name}:`, error.message)
      } else {
        console.log(`✅ Category created: ${category.name}`)
      }
    }

    // Step 2: Create products
    console.log('\n📦 Creating products...')
    for (const product of products) {
      const { error } = await supabase
        .from('products')
        .upsert(product, { onConflict: 'id' })
      
      if (error) {
        console.error(`❌ Error creating product ${product.name}:`, error.message)
      } else {
        console.log(`✅ Product created: ${product.name}`)
      }
    }

    // Step 3: Create admin user
    console.log('\n👤 Creating admin user...')
    const adminEmail = 'admin@ecommerce.com'
    const adminPassword = 'Admin123!'
    const adminFullName = 'Administrator'

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        full_name: adminFullName,
        role: 'admin'
      }
    })

    if (authError) {
      console.error('❌ Error creating auth user:', authError.message)
    } else {
      console.log('✅ Auth user created successfully')

      // Create user record in users table
      const { error: userError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email: adminEmail,
          full_name: adminFullName,
          role: 'admin'
        })

      if (userError) {
        console.error('❌ Error creating user record:', userError.message)
      } else {
        console.log('✅ User record created successfully')
      }
    }

    // Step 4: Verify data
    console.log('\n🔍 Verifying data...')
    
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name')
      .eq('is_active', true)

    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select('id, name, is_featured')
      .eq('is_active', true)

    if (categoriesError) {
      console.error('❌ Error verifying categories:', categoriesError.message)
    } else {
      console.log(`✅ Found ${categoriesData.length} active categories`)
    }

    if (productsError) {
      console.error('❌ Error verifying products:', productsError.message)
    } else {
      const featuredCount = productsData.filter(p => p.is_featured).length
      console.log(`✅ Found ${productsData.length} active products (${featuredCount} featured)`)
    }

    console.log('\n🎉 Database setup completed successfully!')
    console.log('\n📋 Summary:')
    console.log(`📁 Categories: ${categories.length}`)
    console.log(`📦 Products: ${products.length}`)
    console.log(`⭐ Featured Products: ${products.filter(p => p.is_featured).length}`)
    console.log('\n🔐 Admin Credentials:')
    console.log(`📧 Email: ${adminEmail}`)
    console.log(`🔑 Password: ${adminPassword}`)
    console.log('\n🌐 Access URLs:')
    console.log('🏠 Home: http://localhost:3000')
    console.log('🔐 Login: http://localhost:3000/auth/login')
    console.log('⚙️ Admin: http://localhost:3000/admin')

  } catch (error) {
    console.error('❌ Error setting up database:', error)
  }
}

setupDatabase()

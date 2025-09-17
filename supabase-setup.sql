-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  images TEXT[],
  category_id TEXT REFERENCES categories(id),
  stock INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  shipping_address JSONB,
  payment_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT REFERENCES orders(id),
  product_id TEXT REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert categories
INSERT INTO categories (id, name, description, image, is_active) VALUES
('1', 'Elektronik', 'Produk elektronik dan gadget terbaru dengan teknologi canggih', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop', true),
('2', 'Fashion', 'Pakaian dan aksesoris fashion terkini untuk gaya modern', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop', true),
('3', 'Rumah & Taman', 'Furnitur dan dekorasi rumah untuk hunian yang nyaman', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop', true),
('4', 'Olahraga', 'Perlengkapan olahraga dan fitness untuk gaya hidup sehat', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', true);

-- Insert additional categories
INSERT INTO categories (id, name, description, image, is_active) VALUES
('5', 'Kecantikan', 'Produk kecantikan dan perawatan tubuh untuk penampilan optimal', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop', true),
('6', 'Buku', 'Buku dan literatur berbagai genre untuk menambah wawasan', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop', true),
('7', 'Makanan & Minuman', 'Makanan dan minuman berkualitas untuk kebutuhan sehari-hari', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', true),
('8', 'Mainan & Hobi', 'Mainan anak-anak dan perlengkapan hobi untuk semua usia', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', true);

-- Insert products
INSERT INTO products (id, name, description, price, original_price, images, category_id, stock, is_active, is_featured, tags) VALUES
-- Elektronik
('1', 'iPhone 15 Pro Max', 'Smartphone terbaru dengan teknologi canggih, kamera 48MP, dan chip A17 Pro yang powerful', 19999000, 22999000, ARRAY['https://images.unsplash.com/photo-1592899677977-9c10b588e3a9?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop'], '1', 50, true, true, ARRAY['smartphone', 'apple', 'premium', '5g']),
('2', 'MacBook Air M2', 'Laptop ringan dengan performa tinggi, chip M2, dan baterai tahan lama', 15999000, 17999000, ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop'], '1', 30, true, true, ARRAY['laptop', 'apple', 'work', 'm2']),
('3', 'Sony WH-1000XM5', 'Headphone noise cancelling premium dengan kualitas audio terbaik', 3999000, 4999000, ARRAY['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop'], '1', 100, true, false, ARRAY['headphone', 'audio', 'sony', 'wireless']),
('5', 'Samsung Galaxy S24 Ultra', 'Smartphone Android premium dengan kamera 200MP dan S Pen', 18999000, 21999000, ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop'], '1', 40, true, true, ARRAY['smartphone', 'samsung', 'android', 'premium']),
('7', 'Dell XPS 13', 'Laptop ultrabook dengan layar InfinityEdge dan performa tinggi', 17999000, 19999000, ARRAY['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=500&h=500&fit=crop'], '1', 25, true, false, ARRAY['laptop', 'dell', 'ultrabook', 'business']),
('8', 'AirPods Pro 2', 'Earbuds wireless dengan noise cancellation dan spatial audio', 2999000, 3499000, ARRAY['https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=500&fit=crop'], '1', 80, true, false, ARRAY['earbuds', 'apple', 'wireless', 'noise-cancellation']),
('9', 'iPad Pro 12.9"', 'Tablet profesional dengan chip M2 dan layar Liquid Retina XDR', 12999000, 14999000, ARRAY['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1561154464-82ee9adf2394?w=500&h=500&fit=crop'], '1', 35, true, true, ARRAY['tablet', 'apple', 'ipad', 'pro']),
('10', 'Samsung 55" QLED TV', 'Smart TV 4K dengan teknologi QLED dan HDR10+', 8999000, 10999000, ARRAY['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=500&fit=crop'], '1', 20, true, false, ARRAY['tv', 'samsung', '4k', 'smart']),
('11', 'Canon EOS R5', 'Kamera mirrorless profesional dengan sensor 45MP dan video 8K', 45999000, 49999000, ARRAY['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop'], '1', 15, true, true, ARRAY['kamera', 'canon', 'mirrorless', 'profesional']),
('12', 'PlayStation 5', 'Konsol game generasi terbaru dengan grafis 4K dan ray tracing', 7999000, 8999000, ARRAY['https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e4?w=500&h=500&fit=crop'], '1', 25, true, false, ARRAY['gaming', 'playstation', 'console', '4k']),

-- Fashion
('13', 'Levi''s 501 Original Jeans', 'Jeans klasik dengan potongan straight fit yang timeless', 899000, 1199000, ARRAY['https://images.unsplash.com/photo-1542272604-787c385553b7?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=500&fit=crop'], '2', 100, true, false, ARRAY['jeans', 'levis', 'denim', 'classic']),
('14', 'Zara Blazer Premium', 'Blazer formal dengan potongan slim fit dan bahan berkualitas tinggi', 1299000, 1599000, ARRAY['https://images.unsplash.com/photo-1594938298605-cd64d1906916?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop'], '2', 50, true, true, ARRAY['blazer', 'zara', 'formal', 'business']),
('15', 'Nike Air Jordan 1', 'Sepatu basket legendaris dengan desain klasik dan kualitas premium', 2299000, 2799000, ARRAY['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop'], '2', 40, true, true, ARRAY['sneakers', 'nike', 'jordan', 'basketball']),

-- Olahraga
('4', 'Nike Air Max 270', 'Sepatu olahraga dengan teknologi terbaru dan desain yang stylish', 1999000, 2499000, ARRAY['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop'], '4', 75, true, false, ARRAY['sepatu', 'nike', 'olahraga', 'running']),
('6', 'Adidas Ultraboost 22', 'Sepatu lari dengan teknologi Boost untuk kenyamanan maksimal', 2299000, 2799000, ARRAY['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop'], '4', 60, true, false, ARRAY['sepatu', 'adidas', 'running', 'boost']),
('18', 'Peloton Bike+', 'Sepeda statis premium dengan layar 22" dan kelas virtual interaktif', 24999000, 27999000, ARRAY['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop'], '4', 10, true, true, ARRAY['fitness', 'bike', 'peloton', 'cardio']),
('19', 'Lululemon Yoga Mat', 'Mat yoga premium dengan teknologi anti-slip dan bahan ramah lingkungan', 899000, 1099000, ARRAY['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop'], '4', 80, true, false, ARRAY['yoga', 'mat', 'lululemon', 'fitness']),

-- Rumah & Taman
('16', 'IKEA Hemnes Bed Frame', 'Rangka tempat tidur kayu solid dengan desain minimalis dan fungsional', 2999000, 3499000, ARRAY['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=500&fit=crop'], '3', 15, true, false, ARRAY['furniture', 'bed', 'ikea', 'wood']),
('17', 'Dyson V15 Detect Vacuum', 'Vacuum cleaner tanpa kabel dengan teknologi laser dan penyedot debu canggih', 5999000, 6999000, ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop'], '3', 30, true, true, ARRAY['vacuum', 'dyson', 'cleaning', 'cordless']),

-- Kecantikan
('20', 'SK-II Facial Treatment Essence', 'Essence perawatan wajah premium dengan Pitera untuk kulit yang bercahaya', 2999000, 3499000, ARRAY['https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop'], '5', 25, true, true, ARRAY['skincare', 'essence', 'sk-ii', 'premium']),

-- Buku
('21', 'Atomic Habits - James Clear', 'Buku bestseller tentang membangun kebiasaan baik dan menghilangkan kebiasaan buruk', 199000, 249000, ARRAY['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop'], '6', 150, true, false, ARRAY['buku', 'self-help', 'habits', 'motivation']);

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Enable read access for all users" ON categories FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON products FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON users FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON orders FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON order_items FOR SELECT USING (true);

-- Create policies for authenticated users
CREATE POLICY "Enable insert for authenticated users only" ON users FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for users based on email" ON users FOR UPDATE USING (auth.jwt() ->> 'email' = email);
CREATE POLICY "Enable insert for authenticated users only" ON orders FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable insert for authenticated users only" ON order_items FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create admin user (you need to run this manually in Supabase Auth)
-- Email: admin@ecommerce.com
-- Password: Admin123!
-- Role: admin

-- Insert admin user record (run this after creating the auth user)
-- INSERT INTO users (id, email, full_name, role) VALUES 
-- ('[ADMIN_USER_ID_FROM_AUTH]', 'admin@ecommerce.com', 'Administrator', 'admin');

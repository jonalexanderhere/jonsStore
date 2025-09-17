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

-- Insert products
INSERT INTO products (id, name, description, price, original_price, images, category_id, stock, is_active, is_featured, tags) VALUES
('1', 'iPhone 15 Pro Max', 'Smartphone terbaru dengan teknologi canggih, kamera 48MP, dan chip A17 Pro yang powerful', 19999000, 22999000, ARRAY['https://images.unsplash.com/photo-1592899677977-9c10b588e3a9?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop'], '1', 50, true, true, ARRAY['smartphone', 'apple', 'premium', '5g']),
('2', 'MacBook Air M2', 'Laptop ringan dengan performa tinggi, chip M2, dan baterai tahan lama', 15999000, 17999000, ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop'], '1', 30, true, true, ARRAY['laptop', 'apple', 'work', 'm2']),
('3', 'Sony WH-1000XM5', 'Headphone noise cancelling premium dengan kualitas audio terbaik', 3999000, 4999000, ARRAY['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop'], '1', 100, true, false, ARRAY['headphone', 'audio', 'sony', 'wireless']),
('4', 'Nike Air Max 270', 'Sepatu olahraga dengan teknologi terbaru dan desain yang stylish', 1999000, 2499000, ARRAY['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop'], '4', 75, true, false, ARRAY['sepatu', 'nike', 'olahraga', 'running']),
('5', 'Samsung Galaxy S24 Ultra', 'Smartphone Android premium dengan kamera 200MP dan S Pen', 18999000, 21999000, ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop'], '1', 40, true, true, ARRAY['smartphone', 'samsung', 'android', 'premium']),
('6', 'Adidas Ultraboost 22', 'Sepatu lari dengan teknologi Boost untuk kenyamanan maksimal', 2299000, 2799000, ARRAY['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop'], '4', 60, true, false, ARRAY['sepatu', 'adidas', 'running', 'boost']),
('7', 'Dell XPS 13', 'Laptop ultrabook dengan layar InfinityEdge dan performa tinggi', 17999000, 19999000, ARRAY['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=500&h=500&fit=crop'], '1', 25, true, false, ARRAY['laptop', 'dell', 'ultrabook', 'business']),
('8', 'AirPods Pro 2', 'Earbuds wireless dengan noise cancellation dan spatial audio', 2999000, 3499000, ARRAY['https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=500&fit=crop'], '1', 80, true, false, ARRAY['earbuds', 'apple', 'wireless', 'noise-cancellation']);

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

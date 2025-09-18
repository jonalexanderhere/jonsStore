-- =====================================================
-- COMPLETE SUPABASE DATABASE SETUP FOR E-COMMERCE
-- =====================================================
-- Run this script in your Supabase SQL Editor
-- This will create all necessary tables, functions, and sample data

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. DROP EXISTING TABLES (if they exist)
-- =====================================================

DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- =====================================================
-- 2. CREATE TABLES
-- =====================================================

-- Categories table
CREATE TABLE categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    images TEXT[] DEFAULT '{}',
    category_id UUID REFERENCES categories(id),
    stock INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    shipping_address JSONB,
    billing_address JSONB,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 3. CREATE INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- =====================================================
-- 4. INSERT SAMPLE CATEGORIES
-- =====================================================

INSERT INTO categories (id, name, description, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Elektronik', 'Gadget dan peralatan elektronik terbaru', true),
('550e8400-e29b-41d4-a716-446655440002', 'Fashion', 'Pakaian dan aksesoris fashion terkini', true),
('550e8400-e29b-41d4-a716-446655440003', 'Rumah & Taman', 'Furnitur dan dekorasi rumah', true),
('550e8400-e29b-41d4-a716-446655440004', 'Olahraga', 'Peralatan dan pakaian olahraga', true),
('550e8400-e29b-41d4-a716-446655440005', 'Kecantikan', 'Produk kecantikan dan perawatan diri', true),
('550e8400-e29b-41d4-a716-446655440006', 'Buku', 'Buku dan literatur', true),
('550e8400-e29b-41d4-a716-446655440007', 'Makanan & Minuman', 'Makanan dan minuman', true),
('550e8400-e29b-41d4-a716-446655440008', 'Mainan & Hobi', 'Mainan dan produk hobi', true);

-- =====================================================
-- 5. INSERT SAMPLE PRODUCTS
-- =====================================================

INSERT INTO products (id, name, description, price, original_price, images, category_id, stock, is_active, is_featured, tags) VALUES
('650e8400-e29b-41d4-a716-446655440001', 'iPhone 15 Pro Max', 'iPhone 15 Pro Max dengan chip A17 Pro dan kamera 48MP', 19999000, 21999000, ARRAY['https://images.unsplash.com/photo-1592899677977-9c10df588f31?w=500', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500'], '550e8400-e29b-41d4-a716-446655440001', 50, true, true, ARRAY['smartphone', 'apple', 'premium']),
('650e8400-e29b-41d4-a716-446655440002', 'Samsung Galaxy S24 Ultra', 'Samsung Galaxy S24 Ultra dengan S Pen dan kamera 200MP', 18999000, 20999000, ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'], '550e8400-e29b-41d4-a716-446655440001', 30, true, true, ARRAY['smartphone', 'samsung', 'android']),
('650e8400-e29b-41d4-a716-446655440003', 'MacBook Pro M3', 'MacBook Pro 14" dengan chip M3 Pro', 25999000, 27999000, ARRAY['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500'], '550e8400-e29b-41d4-a716-446655440001', 25, true, true, ARRAY['laptop', 'apple', 'macbook']),
('650e8400-e29b-41d4-a716-446655440004', 'AirPods Pro 2', 'AirPods Pro generasi kedua dengan ANC', 3999000, 4499000, ARRAY['https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500', 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500'], '550e8400-e29b-41d4-a716-446655440001', 100, true, false, ARRAY['earbuds', 'apple', 'wireless']),
('650e8400-e29b-41d4-a716-446655440005', 'Nike Air Max 270', 'Sepatu Nike Air Max 270 untuk olahraga', 1999000, 2299000, ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'], '550e8400-e29b-41d4-a716-446655440004', 75, true, false, ARRAY['sepatu', 'nike', 'olahraga']),
('650e8400-e29b-41d4-a716-446655440006', 'Sofa 3 Seater', 'Sofa 3 seater modern untuk ruang tamu', 4999000, 5999000, ARRAY['https://images.unsplash.com/photo-1586023492125-27b2c0450d6b?w=500', 'https://images.unsplash.com/photo-1586023492125-27b2c0450d6b?w=500'], '550e8400-e29b-41d4-a716-446655440003', 15, true, false, ARRAY['furniture', 'sofa', 'ruang-tamu']),
('650e8400-e29b-41d4-a716-446655440007', 'Skincare Set', 'Set perawatan kulit lengkap', 899000, 1199000, ARRAY['https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=500', 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=500'], '550e8400-e29b-41d4-a716-446655440005', 200, true, false, ARRAY['skincare', 'kecantikan', 'perawatan']),
('650e8400-e29b-41d4-a716-446655440008', 'Buku Programming', 'Buku panduan programming untuk pemula', 299000, 399000, ARRAY['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500'], '550e8400-e29b-41d4-a716-446655440006', 500, true, false, ARRAY['buku', 'programming', 'teknologi']),
('650e8400-e29b-41d4-a716-446655440009', 'Kopi Premium', 'Kopi arabika premium dari Jawa', 149000, 199000, ARRAY['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500', 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500'], '550e8400-e29b-41d4-a716-446655440007', 1000, true, false, ARRAY['kopi', 'minuman', 'premium']),
('650e8400-e29b-41d4-a716-446655440010', 'Lego Creator', 'Set Lego Creator untuk hobi', 1299000, 1599000, ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'], '550e8400-e29b-41d4-a716-446655440008', 80, true, false, ARRAY['lego', 'mainan', 'hobi']);

-- =====================================================
-- 6. CREATE FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to handle user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        COALESCE(NEW.raw_user_meta_data->>'role', 'customer')
    );
    RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- =====================================================
-- 7. CREATE TRIGGERS
-- =====================================================

-- Create triggers for updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger to automatically create user profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =====================================================
-- 8. CREATE ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Categories policies (public read access)
CREATE POLICY "Categories are viewable by everyone" ON categories
    FOR SELECT USING (true);

-- Products policies (public read access)
CREATE POLICY "Products are viewable by everyone" ON products
    FOR SELECT USING (true);

-- Users policies
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Orders policies
CREATE POLICY "Users can view their own orders" ON orders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" ON orders
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" ON orders
    FOR UPDATE USING (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "Users can view order items for their orders" ON order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create order items for their orders" ON order_items
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()
        )
    );

-- =====================================================
-- 9. CREATE VIEWS FOR ANALYTICS
-- =====================================================

-- View for product analytics
CREATE OR REPLACE VIEW product_analytics AS
SELECT 
    p.id,
    p.name,
    p.price,
    p.stock,
    c.name as category_name,
    COUNT(oi.id) as total_orders,
    COALESCE(SUM(oi.quantity), 0) as total_quantity_sold,
    COALESCE(SUM(oi.quantity * oi.price), 0) as total_revenue
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id, p.name, p.price, p.stock, c.name;

-- View for order analytics
CREATE OR REPLACE VIEW order_analytics AS
SELECT 
    DATE_TRUNC('day', o.created_at) as order_date,
    COUNT(*) as total_orders,
    SUM(o.total_amount) as total_revenue,
    AVG(o.total_amount) as avg_order_value
FROM orders o
GROUP BY DATE_TRUNC('day', o.created_at)
ORDER BY order_date DESC;

-- =====================================================
-- 10. INSERT ADMIN USER
-- =====================================================

-- Insert admin user into auth.users (this will be handled by the application)
-- The admin user will be created with email: admin@jonsstore.com
-- Password: admin123456

-- Insert admin profile into users table
INSERT INTO users (id, email, full_name, role) VALUES
('ae0c03c8-5ec7-4736-80e3-11cf918b5be1', 'admin@jonsstore.com', 'Admin JonsStore', 'admin')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

-- This script has been completed successfully!
-- Your Supabase database is now ready for the e-commerce application.
-- 
-- Features included:
-- ✅ Complete table structure
-- ✅ Sample data (categories, products)
-- ✅ User registration handling
-- ✅ RLS security policies
-- ✅ Performance indexes
-- ✅ Analytics views
-- ✅ Admin user setup
-- 
-- Next steps:
-- 1. Run this script in your Supabase SQL Editor
-- 2. Create an admin user using the application
-- 3. Deploy your application to Vercel
-- 4. Update your environment variables in Vercel

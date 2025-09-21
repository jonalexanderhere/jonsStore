-- =====================================================
-- JONSSTORE COMPLETE DATABASE SETUP
-- Modern E-commerce Platform
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- CREATE TABLES
-- =====================================================

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    phone VARCHAR(20),
    avatar_url TEXT,
    role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    image TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    short_description TEXT,
    price DECIMAL(12,2) NOT NULL,
    original_price DECIMAL(12,2),
    images TEXT[] DEFAULT '{}',
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    stock INTEGER DEFAULT 0,
    sku VARCHAR(100) UNIQUE,
    weight DECIMAL(8,2),
    dimensions JSONB,
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    is_digital BOOLEAN DEFAULT false,
    tags TEXT[] DEFAULT '{}',
    specifications JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cart items table
CREATE TABLE IF NOT EXISTS cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Addresses table
CREATE TABLE IF NOT EXISTS addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    province VARCHAR(100) NOT NULL,
    country VARCHAR(100) DEFAULT 'Indonesia',
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    total_amount DECIMAL(12,2) NOT NULL,
    shipping_cost DECIMAL(12,2) DEFAULT 0,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    shipping_address JSONB NOT NULL,
    billing_address JSONB,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    product_name VARCHAR(255) NOT NULL,
    product_price DECIMAL(12,2) NOT NULL,
    quantity INTEGER NOT NULL,
    total_price DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'IDR',
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'succeeded', 'failed', 'cancelled')),
    payment_method VARCHAR(50) NOT NULL,
    payment_reference VARCHAR(255),
    stripe_payment_intent_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id, order_id)
);

-- Wishlist table
CREATE TABLE IF NOT EXISTS wishlist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Coupons table
CREATE TABLE IF NOT EXISTS coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(20) DEFAULT 'percentage' CHECK (type IN ('percentage', 'fixed')),
    value DECIMAL(10,2) NOT NULL,
    minimum_amount DECIMAL(12,2) DEFAULT 0,
    maximum_discount DECIMAL(12,2),
    usage_limit INTEGER,
    used_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    starts_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- CREATE INDEXES
-- =====================================================

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_created ON products(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_cart_items_user ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_user ON wishlist(user_id);

-- =====================================================
-- CREATE TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON addresses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON coupons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.order_number = 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(nextval('order_number_seq')::text, 4, '0');
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create sequence for order numbers
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;

-- Apply order number trigger
CREATE TRIGGER generate_order_number_trigger BEFORE INSERT ON orders FOR EACH ROW EXECUTE FUNCTION generate_order_number();

-- Function to handle user creation from auth
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO users (id, email, full_name, role)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email), 'customer');
    RETURN NEW;
END;
$$ language 'plpgsql';

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admin can view all users" ON users FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Categories policies (public read)
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Admin can manage categories" ON categories FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Products policies (public read)
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Admin can manage products" ON products FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Cart items policies
CREATE POLICY "Users can manage own cart" ON cart_items FOR ALL USING (auth.uid() = user_id);

-- Addresses policies
CREATE POLICY "Users can manage own addresses" ON addresses FOR ALL USING (auth.uid() = user_id);

-- Orders policies
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admin can view all orders" ON orders FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Users can create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE id = order_id AND user_id = auth.uid())
);
CREATE POLICY "Admin can view all order items" ON order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Payments policies
CREATE POLICY "Users can view own payments" ON payments FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE id = order_id AND user_id = auth.uid())
);
CREATE POLICY "Admin can view all payments" ON payments FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews for own orders" ON reviews FOR INSERT WITH CHECK (
    auth.uid() = user_id AND 
    EXISTS (SELECT 1 FROM orders WHERE id = order_id AND user_id = auth.uid())
);
CREATE POLICY "Users can update own reviews" ON reviews FOR UPDATE USING (auth.uid() = user_id);

-- Wishlist policies
CREATE POLICY "Users can manage own wishlist" ON wishlist FOR ALL USING (auth.uid() = user_id);

-- Coupons policies (public read)
CREATE POLICY "Active coupons are viewable by everyone" ON coupons FOR SELECT USING (is_active = true);
CREATE POLICY "Admin can manage coupons" ON coupons FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- =====================================================
-- INSERT SAMPLE DATA
-- =====================================================

-- Insert categories
INSERT INTO categories (name, slug, description, image, sort_order) VALUES
('Elektronik', 'elektronik', 'Gadget dan peralatan elektronik terbaru', '/images/categories/electronics.jpg', 1),
('Fashion', 'fashion', 'Pakaian dan aksesoris fashion terkini', '/images/categories/fashion.jpg', 2),
('Rumah & Taman', 'rumah-taman', 'Peralatan rumah tangga dan dekorasi', '/images/categories/home.jpg', 3),
('Olahraga', 'olahraga', 'Peralatan dan pakaian olahraga', '/images/categories/sports.jpg', 4),
('Kecantikan', 'kecantikan', 'Produk kecantikan dan perawatan tubuh', '/images/categories/beauty.jpg', 5),
('Buku', 'buku', 'Buku dan literatur berbagai genre', '/images/categories/books.jpg', 6)
ON CONFLICT (slug) DO NOTHING;

-- Get category IDs for product insertion
DO $$
DECLARE
    elektronik_id UUID;
    fashion_id UUID;
    rumah_id UUID;
    olahraga_id UUID;
    kecantikan_id UUID;
    buku_id UUID;
BEGIN
    SELECT id INTO elektronik_id FROM categories WHERE slug = 'elektronik';
    SELECT id INTO fashion_id FROM categories WHERE slug = 'fashion';
    SELECT id INTO rumah_id FROM categories WHERE slug = 'rumah-taman';
    SELECT id INTO olahraga_id FROM categories WHERE slug = 'olahraga';
    SELECT id INTO kecantikan_id FROM categories WHERE slug = 'kecantikan';
    SELECT id INTO buku_id FROM categories WHERE slug = 'buku';

    -- Insert products
    INSERT INTO products (name, slug, description, short_description, price, original_price, images, category_id, stock, sku, is_active, is_featured, tags) VALUES
    -- Electronics
    ('iPhone 15 Pro Max', 'iphone-15-pro-max', 'iPhone terbaru dengan chip A17 Pro dan kamera 48MP', 'iPhone 15 Pro Max dengan performa terbaik', 15999000, 17999000, ARRAY['/images/products/iphone15.jpg'], elektronik_id, 25, 'IPH15PM-256', true, true, ARRAY['smartphone', 'apple', 'premium']),
    ('Samsung Galaxy S24 Ultra', 'samsung-galaxy-s24-ultra', 'Samsung Galaxy S24 Ultra dengan S Pen dan kamera 200MP', 'Samsung Galaxy S24 Ultra flagship terbaru', 14999000, 16999000, ARRAY['/images/products/galaxy-s24.jpg'], elektronik_id, 30, 'SGS24U-512', true, true, ARRAY['smartphone', 'samsung', 'flagship']),
    ('MacBook Air M3', 'macbook-air-m3', 'MacBook Air dengan chip M3 untuk produktivitas maksimal', 'MacBook Air M3 13 inch', 12999000, 14999000, ARRAY['/images/products/macbook-air.jpg'], elektronik_id, 15, 'MBA-M3-256', true, true, ARRAY['laptop', 'apple', 'm3']),
    ('Sony WH-1000XM5', 'sony-wh1000xm5', 'Headphone noise-cancelling premium dari Sony', 'Sony WH-1000XM5 wireless headphone', 4999000, 5999000, ARRAY['/images/products/sony-headphone.jpg'], elektronik_id, 40, 'SONY-WH1000XM5', true, false, ARRAY['headphone', 'wireless', 'noise-cancelling']),
    ('iPad Pro 12.9"', 'ipad-pro-12-9', 'iPad Pro dengan chip M2 dan layar Liquid Retina XDR', 'iPad Pro 12.9 inch M2', 9999000, 11999000, ARRAY['/images/products/ipad-pro.jpg'], elektronik_id, 20, 'IPP-129-M2', true, false, ARRAY['tablet', 'apple', 'm2']),

    -- Fashion
    ('Kaos Polo Ralph Lauren', 'kaos-polo-ralph-lauren', 'Kaos polo klasik dari Ralph Lauren dengan kualitas premium', 'Kaos polo Ralph Lauren original', 899000, 1199000, ARRAY['/images/products/polo-ralph.jpg'], fashion_id, 50, 'PRL-POLO-001', true, true, ARRAY['polo', 'ralph-lauren', 'premium']),
    ('Celana Jeans Levi\'s 501', 'celana-jeans-levis-501', 'Celana jeans klasik Levi\'s 501 dengan potongan original', 'Levi\'s 501 Original Fit', 1299000, 1599000, ARRAY['/images/products/levis-501.jpg'], fashion_id, 35, 'LEV-501-001', true, false, ARRAY['jeans', 'levis', 'classic']),
    ('Sepatu Nike Air Max 270', 'sepatu-nike-air-max-270', 'Sepatu Nike Air Max 270 dengan teknologi Air Max terbaru', 'Nike Air Max 270 sneakers', 1899000, 2199000, ARRAY['/images/products/nike-airmax.jpg'], fashion_id, 60, 'NIKE-AM270', true, true, ARRAY['sneakers', 'nike', 'air-max']),
    ('Jaket Hoodie Supreme', 'jaket-hoodie-supreme', 'Jaket hoodie dari Supreme dengan desain streetwear', 'Supreme Hoodie Streetwear', 2999000, 3499000, ARRAY['/images/products/supreme-hoodie.jpg'], fashion_id, 25, 'SUP-HOODIE-001', true, false, ARRAY['hoodie', 'supreme', 'streetwear']),

    -- Home & Garden
    ('Robot Vacuum Xiaomi Mi', 'robot-vacuum-xiaomi-mi', 'Robot vacuum cleaner otomatis dari Xiaomi', 'Xiaomi Mi Robot Vacuum', 2999000, 3999000, ARRAY['/images/products/xiaomi-vacuum.jpg'], rumah_id, 20, 'XIA-RV-001', true, true, ARRAY['robot', 'vacuum', 'smart-home']),
    ('Smart Speaker Google Nest', 'smart-speaker-google-nest', 'Smart speaker dengan Google Assistant terintegrasi', 'Google Nest Mini Smart Speaker', 899000, 1199000, ARRAY['/images/products/google-nest.jpg'], rumah_id, 45, 'GOO-NEST-MINI', true, false, ARRAY['smart-speaker', 'google', 'assistant']),
    ('Air Fryer Philips', 'air-fryer-philips', 'Air fryer Philips untuk memasak sehat tanpa minyak', 'Philips Air Fryer XXL', 1999000, 2499000, ARRAY['/images/products/philips-airfryer.jpg'], rumah_id, 30, 'PHI-AF-XXL', true, false, ARRAY['air-fryer', 'philips', 'healthy-cooking']),

    -- Sports
    ('Sepatu Running Adidas Ultraboost', 'sepatu-running-adidas-ultraboost', 'Sepatu running Adidas Ultraboost dengan teknologi Boost', 'Adidas Ultraboost 22 Running', 2499000, 2899000, ARRAY['/images/products/adidas-ultraboost.jpg'], olahraga_id, 40, 'ADI-UB22', true, true, ARRAY['running', 'adidas', 'ultraboost']),
    ('Yoga Mat Lululemon', 'yoga-mat-lululemon', 'Yoga mat premium dari Lululemon dengan grip terbaik', 'Lululemon Yoga Mat 5mm', 1299000, 1599000, ARRAY['/images/products/lululemon-yoga.jpg'], olahraga_id, 25, 'LUL-YM-5MM', true, false, ARRAY['yoga', 'mat', 'lululemon']),
    ('Dumbell Set 20kg', 'dumbell-set-20kg', 'Set dumbell 20kg untuk latihan beban di rumah', 'Dumbell Set 2x10kg', 899000, 1099000, ARRAY['/images/products/dumbell-set.jpg'], olahraga_id, 15, 'DB-SET-20KG', true, false, ARRAY['dumbell', 'weight', 'home-gym']),

    -- Beauty
    ('Serum Vitamin C The Ordinary', 'serum-vitamin-c-ordinary', 'Serum Vitamin C dari The Ordinary untuk kulit cerah', 'The Ordinary Vitamin C Suspension', 299000, 399000, ARRAY['/images/products/ordinary-vitc.jpg'], kecantikan_id, 100, 'TO-VITC-30ML', true, true, ARRAY['serum', 'vitamin-c', 'skincare']),
    ('Lipstick MAC Ruby Woo', 'lipstick-mac-ruby-woo', 'Lipstick matte klasik MAC Ruby Woo', 'MAC Lipstick Ruby Woo', 425000, 475000, ARRAY['/images/products/mac-ruby-woo.jpg'], kecantikan_id, 80, 'MAC-RW-001', true, false, ARRAY['lipstick', 'mac', 'matte']),

    -- Books
    ('Atomic Habits - James Clear', 'atomic-habits-james-clear', 'Buku self-improvement tentang membangun kebiasaan baik', 'Atomic Habits by James Clear', 199000, 249000, ARRAY['/images/products/atomic-habits.jpg'], buku_id, 75, 'BOOK-AH-001', true, true, ARRAY['self-help', 'habits', 'productivity']),
    ('The Psychology of Money', 'psychology-of-money', 'Buku tentang psikologi dan perilaku dalam keuangan', 'The Psychology of Money by Morgan Housel', 225000, 275000, ARRAY['/images/products/psychology-money.jpg'], buku_id, 60, 'BOOK-POM-001', true, false, ARRAY['finance', 'psychology', 'money'])
    ON CONFLICT (slug) DO NOTHING;

END $$;

-- Insert sample coupons
INSERT INTO coupons (code, name, description, type, value, minimum_amount, maximum_discount, usage_limit, is_active, expires_at) VALUES
('WELCOME10', 'Welcome Discount 10%', 'Diskon 10% untuk pembelian pertama', 'percentage', 10, 500000, 100000, 1000, true, NOW() + INTERVAL '1 year'),
('SAVE20', 'Flash Sale 20%', 'Diskon 20% untuk semua produk', 'percentage', 20, 1000000, 200000, 500, true, NOW() + INTERVAL '30 days'),
('NEWUSER', 'New User 15%', 'Diskon 15% untuk pengguna baru', 'percentage', 15, 300000, 150000, 2000, true, NOW() + INTERVAL '6 months'),
('FIXED50K', 'Fixed Discount 50K', 'Potongan langsung Rp 50.000', 'fixed', 50000, 500000, 50000, 1000, true, NOW() + INTERVAL '3 months')
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- CREATE VIEWS
-- =====================================================

-- Product summary view
CREATE OR REPLACE VIEW product_summary AS
SELECT 
    p.id,
    p.name,
    p.slug,
    p.short_description,
    p.price,
    p.original_price,
    p.images,
    p.stock,
    p.is_active,
    p.is_featured,
    p.tags,
    p.created_at,
    c.name as category_name,
    c.slug as category_slug,
    CASE 
        WHEN p.original_price > p.price THEN 
            ROUND(((p.original_price - p.price) / p.original_price) * 100)
        ELSE 0 
    END as discount_percentage
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
WHERE p.is_active = true;

-- Order summary view
CREATE OR REPLACE VIEW order_summary AS
SELECT 
    o.id,
    o.order_number,
    o.user_id,
    o.status,
    o.payment_status,
    o.total_amount,
    o.shipping_cost,
    o.discount_amount,
    o.created_at,
    u.full_name as customer_name,
    u.email as customer_email,
    COUNT(oi.id) as item_count
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id, u.full_name, u.email;

-- =====================================================
-- CREATE FUNCTIONS
-- =====================================================

-- Function to calculate cart total
CREATE OR REPLACE FUNCTION calculate_cart_total(user_uuid UUID)
RETURNS TABLE(
    total_items INTEGER,
    total_amount DECIMAL(12,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COALESCE(SUM(ci.quantity), 0)::INTEGER as total_items,
        COALESCE(SUM(ci.quantity * p.price), 0) as total_amount
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.user_id = user_uuid AND p.is_active = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get product recommendations
CREATE OR REPLACE FUNCTION get_product_recommendations(product_uuid UUID, limit_count INTEGER DEFAULT 4)
RETURNS TABLE(
    id UUID,
    name VARCHAR(255),
    slug VARCHAR(255),
    price DECIMAL(12,2),
    images TEXT[],
    category_name VARCHAR(100)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.name,
        p.slug,
        p.price,
        p.images,
        c.name as category_name
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE p.is_active = true 
    AND p.id != product_uuid
    AND p.category_id = (SELECT category_id FROM products WHERE id = product_uuid)
    ORDER BY p.is_featured DESC, p.created_at DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================

-- Grant permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT INSERT, UPDATE, DELETE ON cart_items TO authenticated;
GRANT INSERT, UPDATE, DELETE ON addresses TO authenticated;
GRANT INSERT ON orders TO authenticated;
GRANT INSERT ON order_items TO authenticated;
GRANT INSERT ON payments TO authenticated;
GRANT INSERT, UPDATE ON reviews TO authenticated;
GRANT INSERT, DELETE ON wishlist TO authenticated;

-- Grant permissions to service role
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- =====================================================
-- FINAL NOTES
-- =====================================================

-- This setup includes:
-- 1. Complete table structure with proper relationships
-- 2. Row Level Security (RLS) policies for data protection
-- 3. Indexes for optimal performance
-- 4. Triggers for automatic timestamp updates
-- 5. Sample data for testing
-- 6. Views for common queries
-- 7. Utility functions for cart and recommendations
-- 8. Proper permissions for different user roles

-- To use this setup:
-- 1. Run this script in your Supabase SQL editor
-- 2. Enable RLS in your Supabase dashboard
-- 3. Set up authentication in your Supabase project
-- 4. Configure your environment variables
-- 5. Test the application with the sample data

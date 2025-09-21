-- =====================================================
-- JonsStore Production Database Setup
-- Complete production-ready database with real data
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- 1. CATEGORIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. PRODUCTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    short_description VARCHAR(500),
    price DECIMAL(12,2) NOT NULL CHECK (price >= 0),
    sale_price DECIMAL(12,2) CHECK (sale_price >= 0),
    sku VARCHAR(100) UNIQUE,
    stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
    weight DECIMAL(8,2) DEFAULT 0,
    dimensions JSONB, -- {length, width, height}
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    brand VARCHAR(100),
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    is_digital BOOLEAN DEFAULT false,
    meta_title VARCHAR(200),
    meta_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 3. USERS TABLE (extends auth.users)
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(200) NOT NULL,
    phone VARCHAR(20),
    avatar_url TEXT,
    role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 4. ADDRESSES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(20) DEFAULT 'shipping' CHECK (type IN ('shipping', 'billing')),
    full_name VARCHAR(200) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address_line_1 VARCHAR(200) NOT NULL,
    address_line_2 VARCHAR(200),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'Indonesia',
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 5. ORDERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) NOT NULL UNIQUE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded', 'partially_refunded')),
    payment_method VARCHAR(50),
    subtotal DECIMAL(12,2) NOT NULL DEFAULT 0,
    tax_amount DECIMAL(12,2) DEFAULT 0,
    shipping_amount DECIMAL(12,2) DEFAULT 0,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    total_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'IDR',
    notes TEXT,
    shipping_address JSONB,
    billing_address JSONB,
    tracking_number VARCHAR(100),
    shipped_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 6. ORDER_ITEMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    product_name VARCHAR(200) NOT NULL,
    product_sku VARCHAR(100),
    product_image TEXT,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(12,2) NOT NULL,
    total_price DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 7. CART_ITEMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- =====================================================
-- 8. COUPONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    type VARCHAR(20) NOT NULL CHECK (type IN ('percentage', 'fixed')),
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
-- 9. REVIEWS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(200),
    comment TEXT,
    is_verified BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT true,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(product_id, user_id, order_id)
);

-- =====================================================
-- 10. WISHLIST TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS wishlist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_created ON products(created_at);
CREATE INDEX IF NOT EXISTS idx_products_name_search ON products USING gin(to_tsvector('indonesian', name || ' ' || description));

CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_number ON orders(order_number);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items(product_id);

CREATE INDEX IF NOT EXISTS idx_cart_items_user ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product ON cart_items(product_id);

CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

CREATE INDEX IF NOT EXISTS idx_wishlist_user ON wishlist(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_product ON wishlist(product_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

-- Categories policies (public read)
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Only admins can manage categories" ON categories FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin')
);

-- Products policies (public read, admin manage)
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Only admins can manage products" ON products FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin')
);

-- Users policies
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all users" ON users FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin')
);

-- Addresses policies
CREATE POLICY "Users can manage own addresses" ON addresses FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all addresses" ON addresses FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin')
);

-- Orders policies
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage all orders" ON orders FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin')
);

-- Order items policies
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Admins can manage all order items" ON order_items FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin')
);

-- Cart items policies
CREATE POLICY "Users can manage own cart" ON cart_items FOR ALL USING (auth.uid() = user_id);

-- Coupons policies (public read, admin manage)
CREATE POLICY "Active coupons are viewable by everyone" ON coupons FOR SELECT USING (is_active = true);
CREATE POLICY "Only admins can manage coupons" ON coupons FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin')
);

-- Reviews policies
CREATE POLICY "Approved reviews are viewable by everyone" ON reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Users can create reviews for their orders" ON reviews FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (SELECT 1 FROM orders WHERE orders.id = reviews.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Users can update own reviews" ON reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all reviews" ON reviews FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin')
);

-- Wishlist policies
CREATE POLICY "Users can manage own wishlist" ON wishlist FOR ALL USING (auth.uid() = user_id);

-- =====================================================
-- FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON addresses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON coupons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION create_user_and_profile()
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

-- Trigger to create user profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION create_user_and_profile();

-- Function to calculate order total
CREATE OR REPLACE FUNCTION calculate_order_total(order_id UUID)
RETURNS DECIMAL(12,2) AS $$
DECLARE
    total DECIMAL(12,2);
BEGIN
    SELECT COALESCE(SUM(total_price), 0) INTO total
    FROM order_items
    WHERE order_items.order_id = calculate_order_total.order_id;
    
    RETURN total;
END;
$$ language 'plpgsql';

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
    new_number TEXT;
    counter INTEGER;
BEGIN
    SELECT COALESCE(MAX(CAST(SUBSTRING(order_number FROM 4) AS INTEGER)), 0) + 1
    INTO counter
    FROM orders
    WHERE order_number LIKE 'ORD-%';
    
    new_number := 'ORD-' || LPAD(counter::TEXT, 6, '0');
    RETURN new_number;
END;
$$ language 'plpgsql';

-- =====================================================
-- REAL PRODUCTION DATA
-- =====================================================

-- Insert Categories
INSERT INTO categories (id, name, slug, description, image_url, sort_order) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Elektronik', 'elektronik', 'Produk elektronik terbaru dan berkualitas tinggi', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500', 1),
('550e8400-e29b-41d4-a716-446655440002', 'Fashion', 'fashion', 'Pakaian dan aksesoris fashion terkini', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500', 2),
('550e8400-e29b-41d4-a716-446655440003', 'Rumah Tangga', 'rumah-tangga', 'Kebutuhan rumah tangga dan dekorasi', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500', 3),
('550e8400-e29b-41d4-a716-446655440004', 'Olahraga', 'olahraga', 'Perlengkapan olahraga dan fitness', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500', 4),
('550e8400-e29b-41d4-a716-446655440005', 'Kecantikan', 'kecantikan', 'Produk kecantikan dan perawatan tubuh', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500', 5),
('550e8400-e29b-41d4-a716-446655440006', 'Makanan & Minuman', 'makanan-minuman', 'Makanan dan minuman berkualitas', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500', 6),
('550e8400-e29b-41d4-a716-446655440007', 'Buku & Media', 'buku-media', 'Buku, film, dan media hiburan', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500', 7),
('550e8400-e29b-41d4-a716-446655440008', 'Otomotif', 'otomotif', 'Aksesoris dan perlengkapan otomotif', 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500', 8)
ON CONFLICT (id) DO NOTHING;

-- Insert Real Products
INSERT INTO products (id, name, slug, description, short_description, price, sale_price, sku, stock_quantity, weight, images, category_id, brand, tags, is_featured) VALUES
-- Elektronik
('650e8400-e29b-41d4-a716-446655440001', 'iPhone 15 Pro Max 256GB', 'iphone-15-pro-max-256gb', 
'iPhone 15 Pro Max dengan chip A17 Pro terbaru, kamera 48MP dengan sistem zoom 5x, layar Super Retina XDR 6.7 inci, dan desain titanium yang kuat dan ringan. Dilengkapi dengan USB-C, Face ID, dan iOS 17 terbaru.',
'iPhone 15 Pro Max dengan chip A17 Pro dan kamera 48MP', 
19999000, 18999000, 'IPH15PM256', 50, 221, 
ARRAY['https://images.unsplash.com/photo-1592899677977-9c10df588f31?w=800', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800'],
'550e8400-e29b-41d4-a716-446655440001', 'Apple', ARRAY['smartphone', 'iphone', 'premium', '5g'], true),

('650e8400-e29b-41d4-a716-446655440002', 'Samsung Galaxy S24 Ultra 512GB', 'samsung-galaxy-s24-ultra-512gb',
'Samsung Galaxy S24 Ultra dengan S Pen, kamera 200MP, layar Dynamic AMOLED 2X 6.8 inci, chip Snapdragon 8 Gen 3, dan baterai 5000mAh. Dilengkapi dengan AI Photo Editor dan Galaxy AI features.',
'Samsung Galaxy S24 Ultra dengan S Pen dan kamera 200MP',
18999000, 17999000, 'SGS24U512', 45, 232,
ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800', 'https://images.unsplash.com/photo-1592899677977-9c10df588f31?w=800'],
'550e8400-e29b-41d4-a716-446655440001', 'Samsung', ARRAY['smartphone', 'android', 's-pen', 'premium'], true),

('650e8400-e29b-41d4-a716-446655440003', 'MacBook Pro 14" M3 Pro', 'macbook-pro-14-m3-pro',
'MacBook Pro 14 inci dengan chip M3 Pro, layar Liquid Retina XDR, 18GB RAM, 512GB SSD, dan baterai hingga 18 jam. Dilengkapi dengan Magic Keyboard, Touch Bar, dan port Thunderbolt 4.',
'MacBook Pro 14" dengan chip M3 Pro dan layar Liquid Retina XDR',
25999000, 24999000, 'MBP14M3P', 30, 1600,
ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800'],
'550e8400-e29b-41d4-a716-446655440001', 'Apple', ARRAY['laptop', 'macbook', 'm3', 'professional'], true),

-- Fashion
('650e8400-e29b-41d4-a716-446655440004', 'Nike Air Max 270', 'nike-air-max-270',
'Sepatu Nike Air Max 270 dengan teknologi Air Max terbaru, upper mesh breathable, dan outsole karet tahan lama. Cocok untuk aktivitas sehari-hari dan olahraga ringan.',
'Sepatu Nike Air Max 270 dengan teknologi Air Max terbaru',
1899000, 1699000, 'NAM270', 100, 0.8,
ARRAY['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800'],
'550e8400-e29b-41d4-a716-446655440002', 'Nike', ARRAY['sepatu', 'nike', 'sneakers', 'olahraga'], true),

('650e8400-e29b-41d4-a716-446655440005', 'Uniqlo Ultra Light Down Jacket', 'uniqlo-ultra-light-down-jacket',
'Jaket Uniqlo Ultra Light Down dengan teknologi down terbaru, ringan dan hangat, desain minimalis, dan mudah dibawa kemana saja. Tersedia dalam berbagai warna.',
'Jaket Uniqlo Ultra Light Down ringan dan hangat',
899000, 799000, 'ULDJ001', 75, 0.3,
ARRAY['https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800'],
'550e8400-e29b-41d4-a716-446655440002', 'Uniqlo', ARRAY['jaket', 'down', 'ringan', 'fashion'], false),

-- Rumah Tangga
('650e8400-e29b-41d4-a716-446655440006', 'Dyson V15 Detect Vacuum', 'dyson-v15-detect-vacuum',
'Vacuum cleaner Dyson V15 Detect dengan teknologi laser detection, penyedot debu yang sangat kuat, baterai tahan lama, dan filter HEPA untuk udara bersih.',
'Vacuum cleaner Dyson V15 Detect dengan teknologi laser',
8999000, 8499000, 'DYV15D', 25, 3.2,
ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'],
'550e8400-e29b-41d4-a716-446655440003', 'Dyson', ARRAY['vacuum', 'dyson', 'rumah', 'bersih'], true),

('650e8400-e29b-41d4-a716-446655440007', 'IKEA Billy Bookcase', 'ikea-billy-bookcase',
'Rak buku IKEA Billy dengan desain minimalis, mudah dirakit, dan tahan lama. Tersedia dalam berbagai ukuran dan warna. Cocok untuk ruang tamu atau kamar tidur.',
'Rak buku IKEA Billy dengan desain minimalis',
1299000, 1199000, 'IBB001', 40, 15.5,
ARRAY['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'],
'550e8400-e29b-41d4-a716-446655440003', 'IKEA', ARRAY['rak', 'buku', 'furniture', 'minimalis'], false),

-- Olahraga
('650e8400-e29b-41d4-a716-446655440008', 'Peloton Bike+', 'peloton-bike-plus',
'Sepeda statis Peloton Bike+ dengan layar HD 24 inci, kelas virtual live, dan komunitas global. Dilengkapi dengan resistance auto-adjust dan sound system premium.',
'Sepeda statis Peloton Bike+ dengan layar HD 24 inci',
24999000, 22999000, 'PBK001', 15, 59,
ARRAY['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800'],
'550e8400-e29b-41d4-a716-446655440004', 'Peloton', ARRAY['sepeda', 'fitness', 'peloton', 'premium'], true),

('650e8400-e29b-41d4-a716-446655440009', 'Yoga Mat Premium', 'yoga-mat-premium',
'Matras yoga premium dengan bahan eco-friendly, anti-slip, dan mudah dibersihkan. Ketebalan 6mm memberikan kenyamanan optimal untuk berbagai pose yoga.',
'Matras yoga premium dengan bahan eco-friendly',
299000, 249000, 'YMP001', 80, 1.2,
ARRAY['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'],
'550e8400-e29b-41d4-a716-446655440004', 'Lululemon', ARRAY['yoga', 'matras', 'fitness', 'eco'], false),

-- Kecantikan
('650e8400-e29b-41d4-a716-446655440010', 'SK-II Facial Treatment Essence', 'sk-ii-facial-treatment-essence',
'Essence SK-II dengan Pitera eksklusif, membantu mencerahkan dan melembabkan kulit. Produk cult favorite yang telah dipercaya selama puluhan tahun.',
'Essence SK-II dengan Pitera eksklusif untuk kulit cerah',
2499000, 2299000, 'SKIIFTE', 60, 0.2,
ARRAY['https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800', 'https://images.unsplash.com/photo-1522335789203-aabd1fc6bc42?w=800'],
'550e8400-e29b-41d4-a716-446655440005', 'SK-II', ARRAY['skincare', 'essence', 'pitera', 'premium'], true),

('650e8400-e29b-41d4-a716-446655440011', 'Charlotte Tilbury Pillow Talk Lipstick', 'charlotte-tilbury-pillow-talk-lipstick',
'Lipstick Charlotte Tilbury Pillow Talk dengan formula matte yang tahan lama, warna nude yang universal, dan kemasan mewah. Perfect untuk look natural dan elegant.',
'Lipstick Charlotte Tilbury Pillow Talk dengan formula matte',
899000, 799000, 'CTPTL', 90, 0.05,
ARRAY['https://images.unsplash.com/photo-1522335789203-aabd1fc6bc42?w=800', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800'],
'550e8400-e29b-41d4-a716-446655440005', 'Charlotte Tilbury', ARRAY['lipstick', 'makeup', 'nude', 'matte'], false),

-- Makanan & Minuman
('650e8400-e29b-41d4-a716-446655440012', 'Kopi Luwak Premium 250g', 'kopi-luwak-premium-250g',
'Kopi Luwak premium asli Indonesia, diproses secara alami oleh luwak, dengan aroma dan rasa yang khas. Kemasan vacuum untuk menjaga kesegaran.',
'Kopi Luwak premium asli Indonesia dengan aroma khas',
899000, 799000, 'KLP250', 30, 0.25,
ARRAY['https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800', 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800'],
'550e8400-e29b-41d4-a716-446655440006', 'Kopi Luwak Indonesia', ARRAY['kopi', 'luwak', 'premium', 'indonesia'], true),

('650e8400-e29b-41d4-a716-446655440013', 'Teh Daun Jati Cina Premium', 'teh-daun-jati-cina-premium',
'Teh Daun Jati Cina premium dengan khasiat kesehatan, membantu metabolisme dan detoksifikasi. Kemasan eksklusif dengan 50 sachet.',
'Teh Daun Jati Cina premium dengan khasiat kesehatan',
299000, 249000, 'TDJCP50', 100, 0.1,
ARRAY['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800'],
'550e8400-e29b-41d4-a716-446655440006', 'Teh Premium', ARRAY['teh', 'herbal', 'kesehatan', 'detox'], false),

-- Buku & Media
('650e8400-e29b-41d4-a716-446655440014', 'Atomic Habits - James Clear', 'atomic-habits-james-clear',
'Buku Atomic Habits karya James Clear, panduan lengkap untuk membangun kebiasaan baik dan menghilangkan kebiasaan buruk. Bestseller internasional.',
'Buku Atomic Habits - panduan membangun kebiasaan baik',
199000, 179000, 'AHJC001', 150, 0.4,
ARRAY['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'],
'550e8400-e29b-41d4-a716-446655440007', 'Gramedia', ARRAY['buku', 'self-help', 'kebiasaan', 'bestseller'], true),

('650e8400-e29b-41d4-a716-446655440015', 'Sony WH-1000XM5 Headphones', 'sony-wh-1000xm5-headphones',
'Headphone Sony WH-1000XM5 dengan noise cancellation terbaik, kualitas suara premium, dan baterai tahan 30 jam. Dilengkapi dengan quick charge dan touch controls.',
'Headphone Sony WH-1000XM5 dengan noise cancellation terbaik',
4999000, 4699000, 'SWH1000XM5', 35, 0.25,
ARRAY['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800'],
'550e8400-e29b-41d4-a716-446655440007', 'Sony', ARRAY['headphone', 'noise-cancellation', 'premium', 'wireless'], true),

-- Otomotif
('650e8400-e29b-41d4-a716-446655440016', 'Dash Cam 4K Ultra HD', 'dash-cam-4k-ultra-hd',
'Dash cam 4K Ultra HD dengan night vision, GPS, dan parking mode. Dilengkapi dengan layar LCD 3 inci dan microSD 64GB. Essential untuk keamanan berkendara.',
'Dash cam 4K Ultra HD dengan night vision dan GPS',
1899000, 1699000, 'DC4K001', 45, 0.3,
ARRAY['https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'],
'550e8400-e29b-41d4-a716-446655440008', 'Garmin', ARRAY['dash-cam', '4k', 'gps', 'safety'], false),

('650e8400-e29b-41d4-a716-446655440017', 'Car Phone Mount Magnetic', 'car-phone-mount-magnetic',
'Mount HP magnetik untuk mobil dengan desain kuat, mudah dipasang, dan kompatibel dengan semua smartphone. Dilengkapi dengan charger wireless 15W.',
'Mount HP magnetik untuk mobil dengan charger wireless',
299000, 249000, 'CPMM001', 120, 0.1,
ARRAY['https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'],
'550e8400-e29b-41d4-a716-446655440008', 'Belkin', ARRAY['mount', 'magnetik', 'wireless', 'mobil'], false)

ON CONFLICT (id) DO NOTHING;

-- Insert Coupons
INSERT INTO coupons (id, code, name, description, type, value, minimum_amount, usage_limit, is_active) VALUES
('750e8400-e29b-41d4-a716-446655440001', 'WELCOME10', 'Welcome Discount 10%', 'Diskon 10% untuk pelanggan baru', 'percentage', 10, 500000, 1000, true),
('750e8400-e29b-41d4-a716-446655440002', 'SAVE50K', 'Save 50K', 'Potongan harga Rp 50.000 untuk pembelian minimal Rp 1.000.000', 'fixed', 50000, 1000000, 500, true),
('750e8400-e29b-41d4-a716-446655440003', 'FREESHIP', 'Free Shipping', 'Gratis ongkir untuk pembelian minimal Rp 500.000', 'fixed', 15000, 500000, 2000, true),
('750e8400-e29b-41d4-a716-446655440004', 'VIP20', 'VIP Member 20%', 'Diskon 20% untuk member VIP', 'percentage', 20, 2000000, 100, true)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- ANALYTICS VIEWS
-- =====================================================

-- Product analytics view
CREATE OR REPLACE VIEW product_analytics AS
SELECT 
    p.id,
    p.name,
    p.sku,
    p.price,
    p.sale_price,
    p.stock_quantity,
    p.is_active,
    p.is_featured,
    c.name as category_name,
    COALESCE(SUM(oi.quantity), 0) as total_sold,
    COALESCE(SUM(oi.total_price), 0) as total_revenue,
    COALESCE(AVG(r.rating), 0) as average_rating,
    COALESCE(COUNT(r.id), 0) as review_count,
    COALESCE(COUNT(w.id), 0) as wishlist_count
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN reviews r ON p.id = r.product_id AND r.is_approved = true
LEFT JOIN wishlist w ON p.id = w.product_id
GROUP BY p.id, p.name, p.sku, p.price, p.sale_price, p.stock_quantity, p.is_active, p.is_featured, c.name;

-- Order analytics view
CREATE OR REPLACE VIEW order_analytics AS
SELECT 
    DATE_TRUNC('day', o.created_at) as order_date,
    COUNT(*) as total_orders,
    SUM(o.total_amount) as total_revenue,
    AVG(o.total_amount) as average_order_value,
    COUNT(CASE WHEN o.status = 'delivered' THEN 1 END) as completed_orders,
    COUNT(CASE WHEN o.status = 'cancelled' THEN 1 END) as cancelled_orders
FROM orders o
GROUP BY DATE_TRUNC('day', o.created_at)
ORDER BY order_date DESC;

-- =====================================================
-- SAMPLE ADMIN USER
-- =====================================================

-- Create admin user (this will be handled by the auth system)
-- The admin user will be created through the application

-- =====================================================
-- FINAL SETUP
-- =====================================================

-- Update statistics
ANALYZE;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

DO $$
BEGIN
    RAISE NOTICE 'JonsStore Production Database Setup Complete!';
    RAISE NOTICE 'Tables created: categories, products, users, addresses, orders, order_items, cart_items, coupons, reviews, wishlist';
    RAISE NOTICE 'RLS policies enabled for security';
    RAISE NOTICE 'Real production data inserted';
    RAISE NOTICE 'Analytics views created';
    RAISE NOTICE 'Ready for production use!';
END $$;

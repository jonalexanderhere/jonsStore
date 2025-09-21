const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function createTables() {
  try {
    console.log('🚀 Creating database tables...')

    // SQL untuk membuat tabel
    const createTablesSQL = `
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
    `

    // Execute SQL
    const { error } = await supabase.rpc('exec_sql', { sql: createTablesSQL })
    
    if (error) {
      console.error('❌ Error creating tables:', error.message)
      
      // Try alternative method - execute each statement separately
      console.log('🔄 Trying alternative method...')
      
      const statements = createTablesSQL.split(';').filter(stmt => stmt.trim())
      
      for (const statement of statements) {
        if (statement.trim()) {
          const { error: stmtError } = await supabase.rpc('exec_sql', { sql: statement.trim() })
          if (stmtError) {
            console.error('❌ Error executing statement:', stmtError.message)
            console.log('Statement:', statement.trim().substring(0, 100) + '...')
          } else {
            console.log('✅ Statement executed successfully')
          }
        }
      }
    } else {
      console.log('✅ Tables created successfully!')
    }

    // Verify tables exist
    console.log('\n🔍 Verifying tables...')
    
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .in('table_name', ['categories', 'products', 'users', 'orders', 'order_items'])

    if (tablesError) {
      console.error('❌ Error verifying tables:', tablesError.message)
    } else {
      console.log(`✅ Found ${tables.length} tables:`)
      tables.forEach(table => console.log(`  - ${table.table_name}`))
    }

    console.log('\n🎉 Table creation completed!')
    console.log('\n📋 Next steps:')
    console.log('1. Run: node scripts/setup-database-complete.js')
    console.log('2. Or manually run the SQL in supabase-setup.sql')

  } catch (error) {
    console.error('❌ Error creating tables:', error)
  }
}

createTables()
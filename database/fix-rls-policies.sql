-- Fix RLS policies for JonsStore
-- Run this in Supabase SQL Editor

-- Drop existing policies
DROP POLICY IF EXISTS "Users can create their own orders" ON orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON orders;

-- Create new policies with proper authentication checks
CREATE POLICY "Users can view their own orders" ON orders
    FOR SELECT USING (
        auth.uid() IS NOT NULL AND 
        (auth.uid() = user_id OR 
         EXISTS (
             SELECT 1 FROM users 
             WHERE users.id = auth.uid() AND users.role = 'admin'
         ))
    );

CREATE POLICY "Users can create their own orders" ON orders
    FOR INSERT WITH CHECK (
        auth.uid() IS NOT NULL AND 
        (auth.uid() = user_id OR 
         EXISTS (
             SELECT 1 FROM users 
             WHERE users.id = auth.uid() AND users.role = 'admin'
         ))
    );

CREATE POLICY "Users can update their own orders" ON orders
    FOR UPDATE USING (
        auth.uid() IS NOT NULL AND 
        (auth.uid() = user_id OR 
         EXISTS (
             SELECT 1 FROM users 
             WHERE users.id = auth.uid() AND users.role = 'admin'
         ))
    );

-- Also fix order_items policies
DROP POLICY IF EXISTS "Users can create order items for their orders" ON order_items;
DROP POLICY IF EXISTS "Users can view order items for their orders" ON order_items;

CREATE POLICY "Users can view order items for their orders" ON order_items
    FOR SELECT USING (
        auth.uid() IS NOT NULL AND 
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = order_items.order_id 
            AND (orders.user_id = auth.uid() OR 
                 EXISTS (
                     SELECT 1 FROM users 
                     WHERE users.id = auth.uid() AND users.role = 'admin'
                 ))
        )
    );

CREATE POLICY "Users can create order items for their orders" ON order_items
    FOR INSERT WITH CHECK (
        auth.uid() IS NOT NULL AND 
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = order_items.order_id 
            AND (orders.user_id = auth.uid() OR 
                 EXISTS (
                     SELECT 1 FROM users 
                     WHERE users.id = auth.uid() AND users.role = 'admin'
                 ))
        )
    );

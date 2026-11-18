export interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
}

const jsonResponse = (data: any, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle preflight OPTIONS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
    }

    // Only intercept /api/ routes
    if (url.pathname.startsWith('/api/')) {
      try {
        const path = url.pathname.replace(/^\/api\/?/, '');
        const method = request.method;

        // --- 1. PRODUCTS API ---
        if (path === 'products' || path.startsWith('products/')) {
          const parts = path.split('/');
          const productId = parts[1];

          // GET /api/products
          if (method === 'GET' && !productId) {
            const { results } = await env.DB.prepare(
              'SELECT * FROM products ORDER BY created_at DESC'
            ).all();

            const mapped = (results || []).map((row: any) => ({
              id: row.id,
              title: row.title,
              subtitle: row.subtitle || '',
              sku: row.sku,
              category: row.category,
              subCategory: row.sub_category || undefined,
              price: Number(row.price),
              originalPrice: row.original_price ? Number(row.original_price) : undefined,
              fabric: row.fabric || '',
              craftTechnique: row.craft_technique || '',
              knotCount: row.knot_count || undefined,
              availability: row.availability || 'in_stock',
              leadTime: row.lead_time || undefined,
              isFeatured: Boolean(row.is_featured),
              isNewDrop: Boolean(row.is_new_drop),
              images: row.images ? JSON.parse(row.images) : [],
              colors: row.colors ? JSON.parse(row.colors) : [],
              description: row.description || '',
              features: row.features ? JSON.parse(row.features) : [],
              washCare: row.wash_care || '',
              dimensions: row.dimensions || undefined,
              views: Number(row.views || 0),
              enquiriesCount: Number(row.enquiries_count || 0),
              createdAt: row.created_at
            }));

            return jsonResponse({ success: true, data: mapped });
          }

          // POST /api/products (Create Product)
          if (method === 'POST') {
            const body: any = await request.json();
            const id = body.id || `prod-${Date.now()}`;
            const createdAt = body.createdAt || new Date().toISOString().split('T')[0];

            await env.DB.prepare(`
              INSERT OR REPLACE INTO products (
                id, title, subtitle, sku, category, sub_category, price, original_price,
                fabric, craft_technique, knot_count, availability, lead_time,
                is_featured, is_new_drop, images, colors, description, features,
                wash_care, dimensions, views, enquiries_count, created_at
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `).bind(
              id,
              body.title || '',
              body.subtitle || '',
              body.sku || '',
              body.category || 'sarees',
              body.subCategory || null,
              Number(body.price) || 0,
              body.originalPrice ? Number(body.originalPrice) : null,
              body.fabric || '',
              body.craftTechnique || '',
              body.knotCount || null,
              body.availability || 'in_stock',
              body.leadTime || null,
              body.isFeatured ? 1 : 0,
              body.isNewDrop ? 1 : 0,
              JSON.stringify(body.images || []),
              JSON.stringify(body.colors || []),
              body.description || '',
              JSON.stringify(body.features || []),
              body.washCare || '',
              body.dimensions || null,
              Number(body.views) || 0,
              Number(body.enquiriesCount) || 0,
              createdAt
            ).run();

            return jsonResponse({ success: true, id, message: 'Product published to Cloudflare D1' });
          }

          // PUT /api/products/:id
          if (method === 'PUT' && productId) {
            const body: any = await request.json();
            
            // Build dynamic update query
            const fields: string[] = [];
            const values: any[] = [];

            if (body.title !== undefined) { fields.push('title = ?'); values.push(body.title); }
            if (body.subtitle !== undefined) { fields.push('subtitle = ?'); values.push(body.subtitle); }
            if (body.sku !== undefined) { fields.push('sku = ?'); values.push(body.sku); }
            if (body.category !== undefined) { fields.push('category = ?'); values.push(body.category); }
            if (body.subCategory !== undefined) { fields.push('sub_category = ?'); values.push(body.subCategory); }
            if (body.price !== undefined) { fields.push('price = ?'); values.push(Number(body.price)); }
            if (body.originalPrice !== undefined) { fields.push('original_price = ?'); values.push(body.originalPrice ? Number(body.originalPrice) : null); }
            if (body.fabric !== undefined) { fields.push('fabric = ?'); values.push(body.fabric); }
            if (body.craftTechnique !== undefined) { fields.push('craft_technique = ?'); values.push(body.craftTechnique); }
            if (body.knotCount !== undefined) { fields.push('knot_count = ?'); values.push(body.knotCount); }
            if (body.availability !== undefined) { fields.push('availability = ?'); values.push(body.availability); }
            if (body.leadTime !== undefined) { fields.push('lead_time = ?'); values.push(body.leadTime); }
            if (body.isFeatured !== undefined) { fields.push('is_featured = ?'); values.push(body.isFeatured ? 1 : 0); }
            if (body.isNewDrop !== undefined) { fields.push('is_new_drop = ?'); values.push(body.isNewDrop ? 1 : 0); }
            if (body.images !== undefined) { fields.push('images = ?'); values.push(JSON.stringify(body.images)); }
            if (body.colors !== undefined) { fields.push('colors = ?'); values.push(JSON.stringify(body.colors)); }
            if (body.description !== undefined) { fields.push('description = ?'); values.push(body.description); }
            if (body.features !== undefined) { fields.push('features = ?'); values.push(JSON.stringify(body.features)); }
            if (body.washCare !== undefined) { fields.push('wash_care = ?'); values.push(body.washCare); }
            if (body.dimensions !== undefined) { fields.push('dimensions = ?'); values.push(body.dimensions); }
            if (body.views !== undefined) { fields.push('views = ?'); values.push(Number(body.views)); }
            if (body.enquiriesCount !== undefined) { fields.push('enquiries_count = ?'); values.push(Number(body.enquiriesCount)); }

            if (fields.length > 0) {
              values.push(productId);
              await env.DB.prepare(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`).bind(...values).run();
            }

            return jsonResponse({ success: true, message: 'Product updated in Cloudflare D1' });
          }

          // DELETE /api/products/:id
          if (method === 'DELETE' && productId) {
            await env.DB.prepare('DELETE FROM products WHERE id = ?').bind(productId).run();
            return jsonResponse({ success: true, message: 'Product removed from Cloudflare D1' });
          }
        }

        // --- 2. CATEGORIES API ---
        if (path === 'categories' || path.startsWith('categories/')) {
          const parts = path.split('/');
          const catId = parts[1];

          if (method === 'GET') {
            const { results } = await env.DB.prepare('SELECT * FROM categories').all();
            const mapped = (results || []).map((row: any) => ({
              id: row.id,
              name: row.name,
              slug: row.slug,
              description: row.description || '',
              image: row.image || '',
              badge: row.badge || undefined,
              isActive: Boolean(row.is_active),
              subCategories: row.sub_categories ? JSON.parse(row.sub_categories) : []
            }));
            return jsonResponse({ success: true, data: mapped });
          }

          if (method === 'POST') {
            const body: any = await request.json();
            const id = body.id || `cat-${Date.now()}`;
            await env.DB.prepare(`
              INSERT OR REPLACE INTO categories (id, name, slug, description, image, badge, is_active, sub_categories)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `).bind(
              id,
              body.name || '',
              body.slug || '',
              body.description || '',
              body.image || '',
              body.badge || null,
              body.isActive !== false ? 1 : 0,
              JSON.stringify(body.subCategories || [])
            ).run();
            return jsonResponse({ success: true, id });
          }

          if (method === 'DELETE' && catId) {
            await env.DB.prepare('DELETE FROM categories WHERE id = ?').bind(catId).run();
            return jsonResponse({ success: true });
          }
        }

        // --- 3. PROFILE API ---
        if (path === 'profile') {
          if (method === 'GET') {
            const row: any = await env.DB.prepare(
              'SELECT data FROM business_profile WHERE id = ?'
            ).bind('primary').first();
            return jsonResponse({ success: true, data: row?.data ? JSON.parse(row.data) : null });
          }

          if (method === 'PUT' || method === 'POST') {
            const body: any = await request.json();
            await env.DB.prepare(
              'INSERT OR REPLACE INTO business_profile (id, data) VALUES (?, ?)'
            ).bind('primary', JSON.stringify(body)).run();
            return jsonResponse({ success: true, message: 'Profile updated in Cloudflare D1' });
          }
        }

        // --- 4. SITE CONTENT & THEME API ---
        if (path === 'site-content') {
          if (method === 'GET') {
            const { results } = await env.DB.prepare('SELECT key, value FROM site_content').all();
            const mapped: Record<string, any> = {};
            (results || []).forEach((row: any) => {
              try {
                mapped[row.key] = JSON.parse(row.value);
              } catch {
                mapped[row.key] = row.value;
              }
            });
            return jsonResponse({ success: true, data: mapped });
          }

          if (method === 'PUT' || method === 'POST') {
            const body: any = await request.json();
            for (const [key, val] of Object.entries(body)) {
              await env.DB.prepare(
                'INSERT OR REPLACE INTO site_content (key, value) VALUES (?, ?)'
              ).bind(key, JSON.stringify(val)).run();
            }
            return jsonResponse({ success: true });
          }
        }

        // --- 5. ENQUIRIES LOG API ---
        if (path === 'enquiries') {
          if (method === 'GET') {
            const { results } = await env.DB.prepare('SELECT * FROM enquiries ORDER BY timestamp DESC').all();
            return jsonResponse({ success: true, data: results || [] });
          }

          if (method === 'POST') {
            const body: any = await request.json();
            const id = body.id || `enq-${Date.now()}`;
            await env.DB.prepare(`
              INSERT INTO enquiries (id, product_id, product_title, sku, price, color, timestamp, status)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `).bind(
              id,
              body.productId || '',
              body.productTitle || '',
              body.sku || '',
              Number(body.price) || 0,
              body.color || '',
              body.timestamp || new Date().toISOString(),
              body.status || 'new'
            ).run();
            return jsonResponse({ success: true, id });
          }
        }

        return jsonResponse({ error: 'Endpoint not found' }, 404);
      } catch (err: any) {
        return jsonResponse({ error: err.message || 'Internal error' }, 500);
      }
    }

    // Fallback: Serve static assets (HTML/JS/CSS)
    return env.ASSETS.fetch(request);
  }
};

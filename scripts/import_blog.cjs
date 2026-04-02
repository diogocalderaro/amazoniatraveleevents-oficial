const { createClient } = require('@supabase/supabase-js');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const db = new sqlite3.Database('server/db/amazonia.db');

async function uploadImage(srcPath) {
  if (!srcPath) return null;
  
  // Normalize path
  const fileName = path.basename(srcPath);
  const filePath = path.resolve('server/uploads', fileName);
  
  if (!fs.existsSync(filePath)) {
    // Check if it's in assets
    const altPath = path.resolve('src/assets', srcPath.startsWith('assets/') ? srcPath.replace('assets/','') : srcPath);
    if (fs.existsSync(altPath)) {
      return uploadFileToStorage(altPath, fileName);
    }
    console.warn(`File not found: ${filePath}`);
    return null;
  }

  return uploadFileToStorage(filePath, fileName);
}

async function uploadFileToStorage(filePath, fileName) {
  const fileExt = path.extname(fileName).substring(1);
  const storagePath = `blog/${Date.now()}_${fileName}`;
  const fileBuffer = fs.readFileSync(filePath);

  const { data, error } = await supabase.storage
    .from('images')
    .upload(storagePath, fileBuffer, {
      contentType: `image/${fileExt === 'jpg' ? 'jpeg' : fileExt}`,
      upsert: true
    });

  if (error) {
    console.error(`Error uploading ${fileName}:`, error.message);
    return null;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(storagePath);

  return publicUrl;
}

async function processContent(content) {
  if (!content) return content;
  
  // Find all img src="/uploads/..."
  const regex = /\/uploads\/([^"'\s>]+)/g;
  let match;
  let newContent = content;
  
  const matches = [...content.matchAll(regex)];
  for (const match of matches) {
      const oldSrc = match[0];
      const fileName = match[1];
      const publicUrl = await uploadImage(fileName);
      if (publicUrl) {
          newContent = newContent.replace(oldSrc, publicUrl);
      }
  }
  
  return newContent;
}

async function runImport() {
  console.log('Starting Blog Import to Supabase...');

  // 1. Import Categories
  console.log('Importing Blog Categories...');
  const categories = await new Promise((resolve, reject) => {
    db.all("SELECT * FROM blog_categories", (err, rows) => err ? reject(err) : resolve(rows));
  });

  for (const cat of categories) {
    const { error } = await supabase
      .from('blog_categories')
      .upsert({ name: cat.name, slug: cat.slug || cat.name.toLowerCase().replace(/ /g, '-') }, { onConflict: 'name' });
    if (error) console.error(`Error importing category ${cat.name}:`, error.message);
  }

  // 2. Import Posts
  console.log('Importing Blog Posts...');
  const posts = await new Promise((resolve, reject) => {
    db.all("SELECT * FROM blog_posts", (err, rows) => err ? reject(err) : resolve(rows));
  });

  for (const post of posts) {
    console.log(`Processing Post: ${post.title}`);
    
    // Upload main image if exists
    let mainImageUrl = post.image_url;
    if (mainImageUrl && (mainImageUrl.startsWith('/uploads') || !mainImageUrl.startsWith('http'))) {
        mainImageUrl = await uploadImage(mainImageUrl);
    }
    
    // Process content for embedded images
    const newContent = await processContent(post.content);

    const postData = {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: newContent,
      image_url: mainImageUrl || post.image_url,
      author: post.author || 'Admin',
      category: post.category || 'Geral',
      is_published: post.is_published === 1,
      created_at: post.created_at,
      updated_at: post.updated_at
    };

    const { error } = await supabase
      .from('blog_posts')
      .upsert(postData, { onConflict: 'slug' });

    if (error) {
        console.error(`Error importing post ${post.title}:`, error.message);
    } else {
        console.log(`Successfully imported: ${post.title}`);
    }
  }

  console.log('Blog Import Finished!');
  db.close();
}

runImport();

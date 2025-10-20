import { createClient } from '@supabase/supabase-js';

const bucketName = import.meta.env.VITE_SUPABASE_BUCKET || 'fotos-inmobiliaria';

let supabaseClient = null;
function getSupabase() {
  if (supabaseClient) return supabaseClient;
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase no configurado: define VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY');
    return null;
  }
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseClient;
}

export async function uploadPropertyPhotos(files, propertyId) {
  if (!files || files.length === 0) return [];
  if (!propertyId) throw new Error('propertyId es requerido para subir imágenes');
  const supabase = getSupabase();
  if (!supabase) return [];
  const results = [];
  for (const file of files) {
    const objectPath = `${propertyId}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(objectPath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type || 'application/octet-stream'
      });
    if (uploadError) {
      console.error('Error subiendo imagen', uploadError);
      continue;
    }
    const { data: publicData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(objectPath);
    results.push({ path: objectPath, publicUrl: publicData.publicUrl });
  }
  return results;
}
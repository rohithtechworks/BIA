import { supabase, isSupabaseConfigured } from "./supabase/client";

export const MEDIA_BUCKET = "media";

export async function uploadMedia(file: File, pathFolder = "avatars"): Promise<string | null> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase is not configured. Returning object URL for local preview.");
    return URL.createObjectURL(file);
  }

  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${pathFolder}/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    const { error } = await supabase.storage
      .from(MEDIA_BUCKET)
      .upload(fileName, file, { upsert: true });

    if (error) {
      console.error("Storage upload error:", error);
      return null;
    }

    const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(fileName);
    return data.publicUrl;
  } catch (err) {
    console.error("Failed to upload file:", err);
    return null;
  }
}

export function getPublicMediaUrl(path: string): string {
  if (!isSupabaseConfigured() || path.startsWith("http") || path.startsWith("/")) {
    return path;
  }
  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

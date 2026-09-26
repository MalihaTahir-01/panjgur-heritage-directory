import { supabase } from "./supabase";

export type Category = "dates" | "crafts";
export type ListingStatus = "pending" | "approved" | "rejected";

// Shape of a row in the `listings` table (see supabase/schema.sql).
export type Listing = {
  id: string;
  owner_id: string;
  category: Category;
  name: string;
  location: string;
  phone: string;
  products: string;
  description: string;
  availability: string;
  photos: string[];
  status: ListingStatus;
  created_at: string;
  updated_at: string;
};

export type ListingFormValues = {
  category: Category;
  name: string;
  location: string;
  phone: string;
  products: string;
  description: string;
  availability: string;
};

// Kept for the "what a profile looks like" preview cards shown before any
// real listings have been approved yet.
export const profileSamples = {
  dates: {
    title: "Date producer profile",
    location: "Panjgur, Balochistan",
    type: "Grower / processor",
    products: "Muzafati · Begum Jangi · Sabzo",
    description:
      "This is a profile-format preview. A producer’s name, orchard story, varieties and contact details will appear here after verification.",
    availability: "Seasonal availability supplied by producer",
  },
  crafts: {
    title: "Craft producer profile",
    location: "Panjgur, Balochistan",
    type: "Traditional artisan",
    products: "Embroidery · Palm & natural-fiber crafts · Woodwork",
    description:
      "This is a profile-format preview. An artisan’s name, techniques, work and contact details will appear here after verification.",
    availability: "Availability supplied by artisan",
  },
};

// Producers type their products/techniques as one line, often separated by
// commas, middle dots or slashes — split that into a clean bullet list.
export function splitProducts(value: string): string[] {
  return value
    .split(/[·,/\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

// ---- Read helpers -------------------------------------------------------

export async function fetchApprovedListings(category: Category): Promise<Listing[]> {
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("category", category)
    .eq("status", "approved")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as Listing[];
}

export async function fetchListingById(id: string): Promise<Listing | null> {
  const { data, error } = await supabase.from("listings").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data as Listing | null;
}

export async function fetchMyListings(ownerId: string): Promise<Listing[]> {
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("owner_id", ownerId)
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data as Listing[];
}

export async function fetchListingsForAdmin(): Promise<Listing[]> {
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as Listing[];
}

// ---- Write helpers -------------------------------------------------------

export async function createListing(ownerId: string, values: ListingFormValues, photos: string[]) {
  const { data, error } = await supabase
    .from("listings")
    .insert({ ...values, owner_id: ownerId, photos, status: "approved" })
    .select("*")
    .single();
  if (error) throw error;
  return data as Listing;
}

export async function updateListing(id: string, values: ListingFormValues, photos: string[]) {
  const { data, error } = await supabase
    .from("listings")
    .update({ ...values, photos, status: "approved", updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return data as Listing;
}

export async function setListingStatus(id: string, status: ListingStatus) {
  const { error } = await supabase.from("listings").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function deleteListing(id: string) {
  const { error } = await supabase.from("listings").delete().eq("id", id);
  if (error) throw error;
}

// ---- Photo upload ---------------------------------------------------------

const PHOTO_BUCKET = "listing-photos";

export async function uploadListingPhotos(ownerId: string, files: File[]): Promise<string[]> {
  const urls: string[] = [];
  for (const file of files) {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const path = `${ownerId}/${Date.now()}-${safeName}`;
    const { error } = await supabase.storage.from(PHOTO_BUCKET).upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) throw error;
    const { data } = supabase.storage.from(PHOTO_BUCKET).getPublicUrl(path);
    urls.push(data.publicUrl);
  }
  return urls;
}

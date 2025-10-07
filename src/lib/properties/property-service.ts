import { supabase } from '@/lib/supabase';

export interface Property {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    prefecture: string;
    city: string;
  };
  images: string[];
  builtYear: number;
  views: number;
  likes: number;
  type: 'akiya' | 'commercial' | 'land' | 'renovation';
  size: number; // in sqm
  bedrooms?: number;
  bathrooms?: number;
  isSponsored?: boolean;
  isFeatured?: boolean;
  status: 'available' | 'under_contract' | 'sold';
  features: string[];
  jniId?: string; // JNI Properties reference
  commissionRate?: number;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilters {
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  minSize?: number;
  maxSize?: number;
  prefecture?: string;
  status?: string;
  isFeatured?: boolean;
  isSponsored?: boolean;
}

export interface PropertySearchParams {
  search?: string;
  filters?: PropertyFilters;
  sortBy?: 'price_low' | 'price_high' | 'newest' | 'popular' | 'size_low' | 'size_high';
  page?: number;
  limit?: number;
}

// Get all properties with filters and pagination
export async function getProperties(params: PropertySearchParams = {}): Promise<{
  properties: Property[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
  const {
    search = '',
    filters = {},
    sortBy = 'newest',
    page = 1,
    limit = 20
  } = params;

  let query = supabase
    .from('properties')
    .select('*', { count: 'exact' });

  // Apply search filter
  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,location->>address.ilike.%${search}%`);
  }

  // Apply filters
  if (filters.type) {
    query = query.eq('type', filters.type);
  }
  if (filters.minPrice) {
    query = query.gte('price', filters.minPrice);
  }
  if (filters.maxPrice) {
    query = query.lte('price', filters.maxPrice);
  }
  if (filters.minSize) {
    query = query.gte('size', filters.minSize);
  }
  if (filters.maxSize) {
    query = query.lte('size', filters.maxSize);
  }
  if (filters.prefecture) {
    query = query.eq('location->>prefecture', filters.prefecture);
  }
  if (filters.status) {
    query = query.eq('status', filters.status);
  }
  if (filters.isFeatured !== undefined) {
    query = query.eq('is_featured', filters.isFeatured);
  }
  if (filters.isSponsored !== undefined) {
    query = query.eq('is_sponsored', filters.isSponsored);
  }

  // Apply sorting
  switch (sortBy) {
    case 'price_low':
      query = query.order('price', { ascending: true });
      break;
    case 'price_high':
      query = query.order('price', { ascending: false });
      break;
    case 'newest':
      query = query.order('created_at', { ascending: false });
      break;
    case 'popular':
      query = query.order('views', { ascending: false });
      break;
    case 'size_low':
      query = query.order('size', { ascending: true });
      break;
    case 'size_high':
      query = query.order('size', { ascending: false });
      break;
    default:
      query = query.order('created_at', { ascending: false });
  }

  // Apply pagination
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching properties:', error);
    throw new Error('Failed to fetch properties');
  }

  const total = count || 0;
  const totalPages = Math.ceil(total / limit);

  return {
    properties: data as Property[] || [],
    total,
    page,
    limit,
    totalPages
  };
}

// Get property by ID
export async function getPropertyById(id: string): Promise<Property | null> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching property:', error);
    return null;
  }

  return data as Property;
}

// Increment property views
export async function incrementPropertyViews(id: string): Promise<void> {
  const { error } = await supabase
    .from('properties')
    .update({ views: supabase.raw('views + 1') })
    .eq('id', id);

  if (error) {
    console.error('Error incrementing views:', error);
  }
}

// Toggle property like
export async function togglePropertyLike(id: string, userId: string): Promise<{
  liked: boolean;
  likesCount: number;
}> {
  // First, check if user already liked this property
  const { data: existingLike, error: checkError } = await supabase
    .from('property_likes')
    .select('id')
    .eq('property_id', id)
    .eq('user_id', userId)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking like:', checkError);
    throw new Error('Failed to check like status');
  }

  const isLiked = !!existingLike;

  if (isLiked) {
    // Remove like
    const { error: deleteError } = await supabase
      .from('property_likes')
      .delete()
      .eq('property_id', id)
      .eq('user_id', userId);

    if (deleteError) {
      console.error('Error removing like:', deleteError);
      throw new Error('Failed to remove like');
    }

    // Decrement likes count
    const { error: updateError } = await supabase
      .from('properties')
      .update({ likes: supabase.raw('likes - 1') })
      .eq('id', id);

    if (updateError) {
      console.error('Error decrementing likes:', updateError);
    }

    // Get updated likes count
    const { data: property } = await supabase
      .from('properties')
      .select('likes')
      .eq('id', id)
      .single();

    return {
      liked: false,
      likesCount: property?.likes || 0
    };
  } else {
    // Add like
    const { error: insertError } = await supabase
      .from('property_likes')
      .insert({
        property_id: id,
        user_id: userId,
        created_at: new Date().toISOString()
      });

    if (insertError) {
      console.error('Error adding like:', insertError);
      throw new Error('Failed to add like');
    }

    // Increment likes count
    const { error: updateError } = await supabase
      .from('properties')
      .update({ likes: supabase.raw('likes + 1') })
      .eq('id', id);

    if (updateError) {
      console.error('Error incrementing likes:', updateError);
    }

    // Get updated likes count
    const { data: property } = await supabase
      .from('properties')
      .select('likes')
      .eq('id', id)
      .single();

    return {
      liked: true,
      likesCount: property?.likes || 0
    };
  }
}

// Get user's liked properties
export async function getUserLikedProperties(userId: string): Promise<Property[]> {
  const { data, error } = await supabase
    .from('property_likes')
    .select(`
      property_id,
      properties (*)
    `)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching liked properties:', error);
    return [];
  }

  return data?.map(item => item.properties).filter(Boolean) as Property[] || [];
}

// Get property statistics
export async function getPropertyStats(): Promise<{
  total: number;
  totalValue: number;
  avgPrice: number;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
  featured: number;
  sponsored: number;
}> {
  const { data, error } = await supabase
    .from('properties')
    .select('price, type, status, is_featured, is_sponsored');

  if (error) {
    console.error('Error fetching property stats:', error);
    return {
      total: 0,
      totalValue: 0,
      avgPrice: 0,
      byType: {},
      byStatus: {},
      featured: 0,
      sponsored: 0
    };
  }

  const properties = data || [];
  const total = properties.length;
  const totalValue = properties.reduce((sum, prop) => sum + (prop.price || 0), 0);
  const avgPrice = total > 0 ? totalValue / total : 0;

  const byType = properties.reduce((acc, prop) => {
    acc[prop.type] = (acc[prop.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const byStatus = properties.reduce((acc, prop) => {
    acc[prop.status] = (acc[prop.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const featured = properties.filter(prop => prop.is_featured).length;
  const sponsored = properties.filter(prop => prop.is_sponsored).length;

  return {
    total,
    totalValue,
    avgPrice,
    byType,
    byStatus,
    featured,
    sponsored
  };
}

// Create property (admin only)
export async function createProperty(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property> {
  const { data, error } = await supabase
    .from('properties')
    .insert({
      ...property,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating property:', error);
    throw new Error('Failed to create property');
  }

  return data as Property;
}

// Update property (admin only)
export async function updateProperty(id: string, updates: Partial<Property>): Promise<Property> {
  const { data, error } = await supabase
    .from('properties')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating property:', error);
    throw new Error('Failed to update property');
  }

  return data as Property;
}

// Delete property (admin only)
export async function deleteProperty(id: string): Promise<void> {
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting property:', error);
    throw new Error('Failed to delete property');
  }
}


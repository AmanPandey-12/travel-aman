// API utility functions for TravelAman

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

interface APIResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
}

// Generic fetch function
export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<APIResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API Error');
    }

    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Failed to fetch data',
    };
  }
}

// Destinations API
export const destinationsAPI = {
  getAll: (filters?: { category?: string; state?: string }) => {
    const params = new URLSearchParams(filters as any).toString();
    return fetchAPI(`/destinations?${params}`);
  },
  getById: (id: number) => fetchAPI(`/destinations?id=${id}`),
  create: (data: any) =>
    fetchAPI('/destinations', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Cities API
export const citiesAPI = {
  getAll: (filters?: { state?: string; id?: number }) => {
    const params = new URLSearchParams(filters as any).toString();
    return fetchAPI(`/cities?${params}`);
  },
  getById: (id: number) => fetchAPI(`/cities?id=${id}`),
  create: (data: any) =>
    fetchAPI('/cities', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Packages API
export const packagesAPI = {
  getAll: (filters?: { destination?: string; maxPrice?: number }) => {
    const params = new URLSearchParams(filters as any).toString();
    return fetchAPI(`/packages?${params}`);
  },
  getById: (id: number) => fetchAPI(`/packages?id=${id}`),
  create: (data: any) =>
    fetchAPI('/packages', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Bookings API
export const bookingsAPI = {
  getAll: (filters?: { userId?: string; id?: number }) => {
    const params = new URLSearchParams(filters as any).toString();
    return fetchAPI(`/bookings?${params}`);
  },
  getById: (id: number) => fetchAPI(`/bookings?id=${id}`),
  create: (data: any) =>
    fetchAPI('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: number, data: any) =>
    fetchAPI('/bookings', {
      method: 'PUT',
      body: JSON.stringify({ id, ...data }),
    }),
  delete: (id: number) =>
    fetchAPI(`/bookings?id=${id}`, {
      method: 'DELETE',
    }),
};

// Health check
export const healthAPI = {
  check: () => fetchAPI('/health'),
};

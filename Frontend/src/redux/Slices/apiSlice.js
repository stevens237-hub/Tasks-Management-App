import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:5000/api";

const baseQuery = fetchBaseQuery({ 
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    // Récupérer le token depuis Redux state ou localStorage
    const token = getState()?.auth?.token || localStorage.getItem('token');
    
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Task', 'User'],
  endpoints: (builder) => ({}),
});
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'; 
import { getPopularMovies, getTrendingMovies } from '../utils/api'; 

interface MovieState { 
  popularMovies: any[]; 
  trendingMovies: any[];
  loading: boolean; 
  error: string | null;
} 

const initialState: MovieState = { 
  popularMovies: [], 
  trendingMovies: [], 
  loading: false, 
  error: null, 
}; 

export const fetchPopularMovies = createAsyncThunk( 
  'movies/fetchPopularMovies', 
  async () => { 
    const response = await getPopularMovies(); 
    return response.data.results; 
  }
); 

export const fetchTrendingMovies = createAsyncThunk( 
  'movies/fetchTrendingMovies', 
  async () => { 
    const response = await getTrendingMovies(); 
    return response.data.results; 
  } 
);

const movieSlice = createSlice({ 
  name: 'movies', 
  initialState, 
  reducers: {}, 
  extraReducers: (builder) => {
    builder 
      .addCase(fetchPopularMovies.pending, (state) => { 
        state.loading = true; 
      }) 
      .addCase(fetchPopularMovies.fulfilled, (state, action: PayloadAction<any[]>) => { 
        state.loading = false; 
        state.popularMovies = action.payload; 
      }) 
      .addCase(fetchPopularMovies.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.error.message || 'Failed to fetch popular movies'; 
      }) 
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.loading = true; 
      }) 
      .addCase(fetchTrendingMovies.fulfilled, (state, action: PayloadAction<any[]>) => { 
        state.loading = false;
        state.trendingMovies = action.payload;
      }) 
      .addCase(fetchTrendingMovies.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.error.message || 'Failed to fetch trending movies'; 
      }); 
  }, 
}); 

export default movieSlice.reducer; 
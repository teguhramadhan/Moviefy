import axios from 'axios';

const apiKey = 'd7f7614bae7621f27f375218705f5fd5';  // Ganti dengan API key yang kamu dapat dari TMDB
const baseUrl = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: baseUrl,
  params: {
    api_key: apiKey,
    language: 'en-US',
  },
});

// Fetch film animasi
export const getAnimatedMovies = async () => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        with_genres: '16', // Genre ID untuk Animation
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching animated movies:', error);
    return [];
  }
};

// Fetch film trending berdasarkan genre animasi
export const getTrendingMovies = async (genreId) => {
  try {
    const response = await tmdbApi.get('/trending/movie/week');
    // Filter hanya film dengan genre animasi (ID 16)
    const filteredMovies = response.data.results.filter(movie =>
      movie.genre_ids.includes(parseInt(genreId))
    );
    return filteredMovies;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

// Fetch film terbaru berdasarkan genre animasi
export const getLatestMovies = async (genreId) => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        with_genres: genreId, // Genre ID untuk Animation
        sort_by: 'release_date.desc', // Mengurutkan berdasarkan tanggal rilis terbaru
        page: 1, // Ambil halaman pertama
      },
    });

    return response.data.results; // Kembalikan daftar film terbaru yang sesuai dengan genre animasi
  } catch (error) {
    console.error('Error fetching latest movie:', error);
    return [];
  }
};


export const getMovieDetail = async (id) => {
  try {
    const response = await tmdbApi.get(`/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie detail:', error);
    return null;
  }
};

export const getSuggestions = async (movieId) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=d7f7614bae7621f27f375218705f5fd5`);
  const data = await response.json();
  return data;
};



export default tmdbApi;

import { useState, useEffect } from 'react';
import {
  getAnimatedMovies,
  getTrendingMovies,
  getLatestMovies,
} from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import { motion, AnimatePresence } from 'framer-motion';

const API_KEY = 'd7f7614bae7621f27f375218705f5fd5'; // ← Ganti ini!

const Home = () => {
  const [selectedTab, setSelectedTab] = useState('animated');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    document.title = 'Home - Moviefy';
    return () => {
      document.title = 'Moviefy';
    };
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    let movieData = [];

    if (selectedTab === 'animated') {
      movieData = await getAnimatedMovies();
    } else if (selectedTab === 'trending') {
      movieData = await getTrendingMovies('16');
    } else if (selectedTab === 'latest') {
      movieData = await getLatestMovies('16');
    }

    setMovies(movieData);
    setLoading(false);
  };

  const searchMovies = async (query) => {
    if (!query) {
      setIsSearching(false);
      fetchMovies();
      return;
    }
  
    setLoading(true);
    setIsSearching(true);
  
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();
  
      // 🔥 Filter hanya yang punya genre 16 (Animation)
      const animationOnly = (data.results || []).filter((movie) =>
        movie.genre_ids?.includes(16)
      );
  
      setMovies(animationOnly);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  
    setLoading(false);
  };

  useEffect(() => {
    if (!isSearching) {
      fetchMovies();
    }
  }, [selectedTab]);

  // Optional: Tambahkan debounce jika mau performa lebih baik
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchMovies(searchQuery);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="mt-[100px] pt-[12px] px-4 sm:px-[32px] md:px-[72px] lg:px-[120px]">
      {/* Tab Navigation - versi cantik */}
      <div className="mt-6 mb-12 flex justify-between flex-col sm:flex-row gap-4">
        <div className="inline-flex bg-gray-900 rounded-lg p-1 shadow-md self-start">
          {[
            { id: 'animated', label: 'All' },
            { id: 'latest', label: 'Latest' },
            { id: 'trending', label: 'Trending' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedTab(tab.id);
                setSearchQuery('');
              }}
              className={`relative px-6 py-2 rounded-full transition-all duration-300 ease-in-out text-sm sm:text-base font-medium ${
                selectedTab === tab.id
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="inline-flex w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search movies..."
            className="bg-transparent w-full border border-gray-400 dark:border-gray-600 rounded-full pl-[18px] py-[12px] focus:outline-none text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-24 w-24 border-b-4 border-orange-500"></div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab + searchQuery}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"
          >
            {movies.length > 0 ? (
              movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-400 dark:text-gray-500">
                No movies found.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Home;

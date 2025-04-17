import { useState, useEffect } from 'react';
import { getAnimatedMovies, getTrendingMovies, getLatestMovies } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const [selectedTab, setSelectedTab] = useState('animated');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchMovies();
  }, [selectedTab]);

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="mt-[90px] px-4 sm:px-[32px] md:px-[72px] lg:px-[120px]">
      {/* Tab Navigation - versi cantik */}
      <div className="mt-6 mb-12 flex justify-center">
        <div className="inline-flex bg-gray-900 rounded-full p-1 shadow-md">
          {[
            { id: 'animated', label: 'All' },
            { id: 'latest', label: 'Latest' },
            { id: 'trending', label: 'Trending' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
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
      </div>
  
      {/* Animasi Loading */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-24 w-24 border-b-4 border-orange-500"></div>
        </div>
      ) : (
        // Movie Cards with animation
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"
          >
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );  
};

export default Home;

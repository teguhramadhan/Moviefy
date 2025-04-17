import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetail } from '../api/tmdb';
import { getSuggestions } from '../api/tmdb'; // pastikan import ini ada
 // pastikan kamu punya fungsi ini di tmdb.js

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);


  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetail(id);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    
    const fetchMovieAndSuggestions = async () => {
      try {
        // Mendapatkan detail film
        const movieData = await getMovieDetail(id);
        setMovie(movieData);
  
        // Mendapatkan film saran
        const suggestionsData = await getSuggestions(id); // buat fungsi ini di API Anda
        setSuggestions(suggestionsData.results);
      } catch (error) {
        console.error('Error fetching movie and suggestions:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchMovieAndSuggestions();
  }, [id]);
  

  useEffect(() => {
    if (movie?.title) {
      document.title = `Moviefy - ${movie.title} `;
    }
  
    return () => {
      document.title = 'Moviefy';
    };
  }, [movie]);

  if (loading) return <div className="text-white text-center mt-8">Loading...</div>;
  if (!movie) return <div className="text-red-500 text-center mt-8">Movie not found.</div>;

  // Gambar default (pastikan file ini ada di public/assets/images/)
  const defaultImageUrl = '/assets/images/default-movie-cover.png';
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : defaultImageUrl;

  return (
    
  <div className="max-w-full mt-[90px] lg:mx-[90px] px-4 text-white">
    <div className="flex py-[32px]">
    <a href="/" className="flex hover:text-orange-500 hover:transition hover:duration-300">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
      </svg>
      <span className="ml-[12px]">Back to Movie List</span> 
    </a>

    </div>
    <div className="md:flex gap-6 items-center"> {/* Sejajarkan vertikal tengah */}
      
      {/* Gambar Poster */}
      <img
        src={imageUrl}
        alt={movie.title}
        className="
        w-full h-[250px] sm:w-full md:w-[140px] lg:w-[160px]
        aspect-square sm:aspect-square md:aspect-auto lg:aspect-auto
        object-contain 
        rounded-lg shadow-lg"
      />
      
      {/* Detail Film */}
      <div className="flex-1 mt-6 md:mt-0"> {/* Margin atas hanya muncul di mobile */}
        <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
        <p className="text-gray-300 mb-4 text-justify">{movie.overview || 'Tidak ada deskripsi.'}</p>
        
        <div className="mb-2">
          <span className="font-semibold">Release Date:</span> {movie.release_date}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Rating:</span> {movie.vote_average} / 10
        </div>
        <div className="mb-4">
          <span className="font-semibold">Genres:</span>{' '}
          {movie.genres?.map((g) => g.name).join(', ') || '-'}
        </div>
        
        <button className="w-full py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-300">
          Watch Now
        </button>
      </div>
    </div>
      {/* Movie Suggestions */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Similar Movies</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {suggestions.map((suggestedMovie) => (
            <div key={suggestedMovie.id} className="bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={suggestedMovie.poster_path ? `https://image.tmdb.org/t/p/w500${suggestedMovie.poster_path}` : defaultImageUrl}
                alt={suggestedMovie.title}
                className="w-full h-[250px] object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold">{suggestedMovie.title}</h4>
                <p className="text-gray-400 text-sm">{suggestedMovie.release_date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetail } from '../api/tmdb'; // pastikan kamu punya fungsi ini di tmdb.js

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

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
    
  <div className="max-w-7xl mt-[90px] lg:ml-[90px] px-4 text-white">
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
        className="w-full sm:w-[250px] md:w-[300px] lg:w-[350px] h-auto aspect-auto rounded-lg shadow-lg"
      />
      
      {/* Detail Film */}
      <div className="flex-1 mt-6 md:mt-0"> {/* Margin atas hanya muncul di mobile */}
        <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
        <p className="text-gray-300 mb-4">{movie.overview || 'Tidak ada deskripsi.'}</p>
        
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
  </div>

  );
};

export default MovieDetail;

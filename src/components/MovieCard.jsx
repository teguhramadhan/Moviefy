import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  // Gambar default (lokasi gambar default milik kamu)
  const defaultImageUrl = '/assets/images/default-movie-cover.png';  // Ganti dengan path gambar default yang kamu punya

  // Jika poster_path ada, gunakan URL dari TMDB, jika tidak, gunakan gambar default
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : defaultImageUrl;

  return (
    <div className="bg-gray-800 hover:bg-orange-500 hover:transition hover:duration-300 rounded-lg">
      <Link to={`/movie/${movie.id}`}>
        <img
          className="w-full h-60 object-cover rounded-s-lg rounded-se-lg"
          src={imageUrl}  // Gunakan imageUrl yang sudah diperbaiki
          alt={movie.title}
        />
        <h3 className="text-lg text-white mt-2 ml-4 py-4 font-bold">{movie.title}</h3>
        <div className="flex items-center ml-4 pb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
        </svg>

        <h3 className="text-lg text-white font-light ml-4">{movie.vote_average}</h3>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;

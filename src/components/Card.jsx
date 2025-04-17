const Card = () => {
    return (
      <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
        {/* Image */}
        <img
          className="w-full h-48 object-cover"
          src="https://via.placeholder.com/400x250"
          alt="Movie Poster"
        />
  
        {/* Card Content */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800">Movie Title</h2>
          <p className="text-gray-600 text-sm mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
          </p>
  
          {/* Tags */}
          <div className="flex space-x-2 mt-4">
            <span className="px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">Action</span>
            <span className="px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">Adventure</span>
          </div>
  
          {/* Button */}
          <button className="mt-6 w-full py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-300">
            View Details
          </button>
        </div>
      </div>
    );
  };
  
  export default Card;
  
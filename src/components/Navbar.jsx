import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State untuk toggle menu di mobile

  // Deteksi scroll untuk menambahkan shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle menu mobile
  const toggleMenu = () => setIsOpen(!isOpen);

  // Function untuk menutup menu saat tombol close diklik
  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`fixed top-0 w-full h-[100px] z-50 transition-shadow duration-300 ${
        scrolled ? 'shadow-md bg-gray-900/95' : 'bg-slate-900'
      }`}
    >
      <nav className="w-full h-full mx-auto px-4 sm:px-[32px] md:px-[72px] lg:px-[120px] py-4 flex items-center justify-center lg:justify-start">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-orange-500 tracking-tight">
          Moviefy<span className="text-white">.</span>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;

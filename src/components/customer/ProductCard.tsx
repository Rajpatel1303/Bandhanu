import React from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    isWishlisted,
    toggleWishlist,
    navigateToProduct,
    addToCart
  } = useStore();

  const wishlisted = isWishlisted(product.id);
  const primaryImage = product.images[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c';

  const handleCardClick = () => {
    navigateToProduct(product.id);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer flex flex-col justify-between transition-all duration-300"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F5EFE6] border border-[#E2D7C7]/50">
        <img
          src={primaryImage}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Minimalist Heart Wishlist Button in Top-Right matching Image 2 */}
        <button
          onClick={handleWishlistClick}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all duration-200 ${
            wishlisted
              ? 'bg-[#4A121A] text-white shadow-md'
              : 'bg-white/80 hover:bg-white text-[#241E1C] opacity-80 group-hover:opacity-100 shadow-xs'
          }`}
        >
          <Heart
            className={`w-3.5 h-3.5 ${
              wishlisted ? 'fill-current text-white' : 'stroke-[1.8]'
            }`}
          />
        </button>
      </div>

      {/* Product Info below image */}
      <div className="pt-3 pb-1 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-serif text-sm sm:text-base text-[#241E1C] group-hover:text-[#4A121A] transition-colors truncate">
            {product.title}
          </h3>
          <p className="font-serif font-semibold text-xs sm:text-sm text-[#241E1C] mt-0.5">
            {formatCurrency(product.price)}
          </p>
        </div>

        {/* Minimal Arrow Link matching mockup */}
        <div className="mt-1 flex items-center justify-between text-xs text-[#6E6259] group-hover:text-[#4A121A] transition-colors">
          <span className="font-medium text-[11px] sm:text-xs">
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
};

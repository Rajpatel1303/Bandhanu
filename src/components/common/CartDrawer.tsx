import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { openWhatsAppDirect } from '../../utils/whatsapp';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    totalCartPrice,
    profile,
    setCurrentPage,
    setSelectedProductId
  } = useStore();

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    const itemsSummary = cart
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.title} (Qty: ${item.quantity}) - ${formatCurrency(item.product.price * item.quantity)}`
      )
      .join('\n');

    const brandName = profile.businessName || 'Bandhanu';
    const message = `Hello ${brandName} Concierge! 👋

I would like to place an order for the following handcrafted pieces:

${itemsSummary}

✦ Total Order Value: ${formatCurrency(totalCartPrice)}
✦ Delivery Address: [Please confirm pin code for courier]

Please confirm availability and dispatch timeline. Thank you!`;

    openWhatsAppDirect(profile.whatsappNumber, message);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF8F3] border-l border-[#E2D7C7] shadow-2xl flex flex-col justify-between animate-fade-in">
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#E2D7C7] flex items-center justify-between bg-white/60">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#4A121A]" />
              <h2 className="font-serif font-bold text-xl text-[#241E1C] tracking-wide">
                Your Bag ({cart.reduce((sum, i) => sum + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-[#6E6259] hover:text-[#241E1C] hover:bg-[#F5EFE6] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="p-6 overflow-y-auto flex-grow space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F5EFE6] text-[#4A121A] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#241E1C]">Your Bag is Empty</h3>
                <p className="text-xs text-[#6E6259] max-w-xs mx-auto">
                  Explore our handcrafted Bandhani sarees, dupattas, and stoles to add heirloom pieces to your collection.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentPage('catalogue');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#4A121A] text-white text-xs font-semibold hover:bg-[#380D13] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}`}
                  className="p-3.5 rounded-xl bg-white border border-[#E2D7C7] flex items-center gap-3.5 shadow-xs"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-18 h-22 object-cover rounded-lg bg-[#F5EFE6] shrink-0 cursor-pointer"
                    onClick={() => {
                      setSelectedProductId(item.product.id);
                      setIsCartOpen(false);
                      setCurrentPage('product');
                    }}
                  />
                  <div className="flex-grow min-w-0">
                    <h4
                      onClick={() => {
                        setSelectedProductId(item.product.id);
                        setIsCartOpen(false);
                        setCurrentPage('product');
                      }}
                      className="font-serif font-bold text-sm text-[#241E1C] truncate hover:text-[#4A121A] cursor-pointer"
                    >
                      {item.product.title}
                    </h4>
                    <p className="text-[11px] text-[#6E6259]">Color: {item.selectedColor}</p>
                    <p className="font-serif font-bold text-sm text-[#4A121A] mt-1">
                      {formatCurrency(item.product.price)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-[#E2D7C7] rounded-lg bg-[#FAF6F0]">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, -1)}
                          className="p-1 px-2 text-[#6E6259] hover:text-[#241E1C] text-xs font-bold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-2 text-[#241E1C]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, 1)}
                          className="p-1 px-2 text-[#6E6259] hover:text-[#241E1C] text-xs font-bold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 text-gray-400 hover:text-rose-600 transition-colors ml-auto"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E2D7C7] bg-white/70 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6E6259]">Subtotal</span>
                <span className="font-serif font-bold text-lg text-[#241E1C]">
                  {formatCurrency(totalCartPrice)}
                </span>
              </div>
              <p className="text-[11px] text-[#6E6259] leading-tight">
                Tax included. Express insured heritage shipping calculated at checkout.
              </p>
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 rounded-lg bg-[#4A121A] hover:bg-[#380D13] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order via WhatsApp Concierge</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

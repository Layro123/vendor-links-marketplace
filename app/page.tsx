'use client';

import { useState, useEffect } from 'react';
import { products, formatPrice, Product } from '@/lib/products';

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [currentPurchase, setCurrentPurchase] = useState(0);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [exitIntentShown, setExitIntentShown] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  const addToCart = (product: Product) => {
    if (!cart.find(item => item.id === product.id)) {
      setCart([...cart, product]);
      setAddedToCart(product.id);
      setTimeout(() => setAddedToCart(null), 1500);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setCheckoutLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productIds: cart.map(item => item.id) }),
      });

      const { url, error } = await response.json();
      if (error) {
        alert('Checkout failed. Please try again.');
        setCheckoutLoading(false);
        return;
      }

      window.location.href = url;
    } catch {
      alert('Checkout failed. Please try again.');
      setCheckoutLoading(false);
    }
  };

  const purchases = [
    "Blake Z. just purchased All Vendors Bundle!",
    "Sarah M. just purchased Cologne Vendor!",
    "Mike R. just purchased Designer Bag Supplier!",
    "Jessica K. just purchased Sneaker Vendor!",
    "Tyler B. just purchased Earphone Vendor!",
    "Alex P. just purchased Phone Vendor!",
    "Jordan L. just purchased All Vendors Bundle!",
    "Taylor H. just purchased Cologne Vendor!",
    "Morgan D. just purchased Phone Vendor!",
    "Casey R. just purchased Sneaker Vendor!",
    "Riley J. just purchased Designer Bag Supplier!",
    "Jamie W. just purchased Earphone Vendor!",
    "Skylar N. just purchased All Vendors Bundle!",
    "Dakota S. just purchased Sneaker Vendor!",
    "Parker M. just purchased Cologne Vendor!",
    "Avery K. just purchased Designer Bag Supplier!",
    "Quinn B. just purchased Phone Vendor!",
    "Reese T. just purchased Earphone Vendor!",
    "Sage L. just purchased All Vendors Bundle!",
    "Cameron H. just purchased Sneaker Vendor!",
    "Emerson P. just purchased All Vendors Bundle!",
    "Finley R. just purchased Cologne Vendor!",
    "Kai M. just purchased Designer Bag Supplier!",
    "River S. just purchased Phone Vendor!",
    "Rowan J. just purchased Earphone Vendor!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPopup(true);
      setCurrentPurchase((prev) => (prev + 1) % purchases.length);

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }, 15000);

    setTimeout(() => {
      setShowPopup(true);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentShown) {
        setShowExitIntent(true);
        setExitIntentShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [exitIntentShown]);

  return (
    <div id="top" className="min-h-screen bg-black text-white">
      {/* Purchase Popup Notification */}
      {showPopup && (
        <div className="fixed bottom-6 left-6 bg-white text-black p-4 rounded-lg shadow-2xl z-50 max-w-sm animate-slide-in border border-gray-200">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-lg">
              {purchases[currentPurchase].split(" ")[0][0]}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm mb-1">{purchases[currentPurchase]}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <span className="text-green-600">✓</span> Verified Purchase · Just now
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Exit Intent Popup */}
      {showExitIntent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-[#26FF00] rounded-2xl max-w-2xl w-full p-8 md:p-12 relative animate-slide-in shadow-2xl">
            <button
              onClick={() => setShowExitIntent(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl"
            >
              ×
            </button>

            <div className="text-center">
              <div className="inline-block mb-6">
                <span className="text-6xl">⏰</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                WAIT! DON'T MISS OUT
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Get an <span className="text-[#26FF00] font-bold">EXTRA 15% OFF</span> your first purchase
              </p>

              <div className="bg-black/50 border border-white/10 rounded-xl p-6 mb-8">
                <p className="text-gray-400 text-sm mb-4">Use code at checkout:</p>
                <div className="bg-[#26FF00] text-black font-black text-3xl py-4 px-6 rounded-lg inline-block tracking-wider">
                  STAYNOW15
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => {
                    setShowExitIntent(false);
                    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-8 py-4 bg-[#26FF00] text-black font-bold text-lg rounded-lg hover:bg-[#20dd00] transition-all duration-200 active:scale-95"
                >
                  Claim My 15% Discount →
                </button>
                <button
                  onClick={() => setShowExitIntent(false)}
                  className="text-gray-400 hover:text-white text-sm underline"
                >
                  No thanks, I don't want to save money
                </button>
              </div>

              <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="text-[#26FF00]">✓</span> 30-Day Money-Back Guarantee
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-[#FFD700]">★★★★★</span> 4.98/5 Rating
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Announcement Bar */}
      <div className="bg-black border-b border-white/10 py-2.5 overflow-hidden">
        <div className="whitespace-nowrap animate-scroll text-sm font-bold inline-flex">
          <span className="inline-flex items-center gap-1.5 mx-4"><span className="text-[#FFD700]">★★★★★</span> <span className="text-white">Rated 4.98/5</span></span>
          <span className="text-gray-500">|</span>
          <span className="inline-flex items-center gap-1.5 mx-4"><span className="text-[#26FF00]">✓</span> <span className="text-white">10,000+ happy customers</span></span>
          <span className="text-gray-500">|</span>
          <span className="inline-flex items-center gap-1.5 mx-4"><span className="text-[#FFD700]">★</span> <span className="text-white">Best vendors in the game</span></span>
          <span className="text-gray-500">|</span>
          <span className="inline-flex items-center gap-1.5 mx-4"><span className="text-[#26FF00]">👁</span> <span className="text-white">74 Shopping now</span></span>
          <span className="text-gray-500">|</span>
          <span className="inline-flex items-center gap-1.5 mx-4"><span className="text-[#FFD700]">★★★★★</span> <span className="text-white">Rated 4.98/5</span></span>
          <span className="text-gray-500">|</span>
          <span className="inline-flex items-center gap-1.5 mx-4"><span className="text-[#26FF00]">✓</span> <span className="text-white">10,000+ happy customers</span></span>
          <span className="text-gray-500">|</span>
          <span className="inline-flex items-center gap-1.5 mx-4"><span className="text-[#FFD700]">★</span> <span className="text-white">Best vendors in the game</span></span>
          <span className="text-gray-500">|</span>
          <span className="inline-flex items-center gap-1.5 mx-4"><span className="text-[#26FF00]">👁</span> <span className="text-white">74 Shopping now</span></span>
          <span className="text-gray-500">|</span>
          <span className="inline-flex items-center gap-1.5 mx-4"><span className="text-[#FFD700]">★★★★★</span> <span className="text-white">Rated 4.98/5</span></span>
          <span className="text-gray-500">|</span>
          <span className="inline-flex items-center gap-1.5 mx-4"><span className="text-[#26FF00]">✓</span> <span className="text-white">10,000+ happy customers</span></span>
          <span className="text-gray-500">|</span>
          <span className="inline-flex items-center gap-1.5 mx-4"><span className="text-[#FFD700]">★</span> <span className="text-white">Best vendors in the game</span></span>
          <span className="text-gray-500">|</span>
          <span className="inline-flex items-center gap-1.5 mx-4"><span className="text-[#26FF00]">👁</span> <span className="text-white">74 Shopping now</span></span>
          <span className="text-gray-500">|</span>
          <span className="inline-flex items-center gap-1.5 mx-4"><span className="text-[#FFD700]">★★★★★</span> <span className="text-white">Rated 4.98/5</span></span>
          <span className="text-gray-500">|</span>
          <span className="inline-flex items-center gap-1.5 mx-4"><span className="text-[#26FF00]">✓</span> <span className="text-white">10,000+ happy customers</span></span>
          <span className="text-gray-500">|</span>
          <span className="inline-flex items-center gap-1.5 mx-4"><span className="text-[#FFD700]">★</span> <span className="text-white">Best vendors in the game</span></span>
          <span className="text-gray-500">|</span>
          <span className="inline-flex items-center gap-1.5 mx-4"><span className="text-[#26FF00]">👁</span> <span className="text-white">74 Shopping now</span></span>
          <span className="text-gray-500">|</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 bg-black/95 backdrop-blur-sm border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <div className="text-2xl font-bold tracking-tight">AJResells</div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#top" className="hover:text-gray-300 transition-colors">Home</a>
            <a href="#products" className="hover:text-gray-300 transition-colors">Catalog</a>
            <a href="#products" className="hover:text-gray-300 transition-colors">All Suppliers</a>
          </div>
          <button
            onClick={() => setShowCart(true)}
            className="relative hover:text-gray-300 transition-colors flex items-center gap-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#26FF00] text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCart(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-xl font-bold">Your Cart ({cart.length})</h2>
                <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-white text-2xl">
                  &times;
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center text-gray-400 py-12">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p>Your cart is empty</p>
                    <button onClick={() => setShowCart(false)} className="mt-4 text-[#26FF00] hover:underline">
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 bg-black/50 p-4 rounded-lg border border-white/5">
                        <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{item.name}</h3>
                          <p className="text-[#26FF00] font-bold">{formatPrice(item.price)}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10">
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-400">Total</span>
                    <span className="text-2xl font-bold">{formatPrice(cartTotal)}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                    className="w-full py-4 bg-[#26FF00] text-black font-bold text-lg rounded-lg hover:bg-[#20dd00] transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {checkoutLoading ? 'Processing...' : 'Checkout'}
                  </button>
                  <p className="text-center text-gray-500 text-xs mt-3">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 uppercase tracking-tight leading-tight">
          Start Your Reselling<br />Journey Today
        </h1>
        <p className="text-gray-400 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
          Get instant access to verified suppliers and start making money with our premium vendor network
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group bg-black border border-white/10 hover:border-white/20 rounded-xl p-4 relative transition-all duration-300 hover:-translate-y-1" style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)' }}>
                <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2.5 py-1 font-bold uppercase tracking-wider rounded-md z-10">Sale</span>
                <div className="aspect-square mb-4 overflow-hidden rounded-xl bg-gray-900">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-semibold mb-2 text-sm">{product.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold tracking-tight">{formatPrice(product.price)}</span>
                  <span className="text-gray-500 line-through text-sm">{formatPrice(product.originalPrice)}</span>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  disabled={cart.some(item => item.id === product.id)}
                  className="w-full py-3 bg-white text-black font-semibold text-sm hover:bg-gray-100 transition-all duration-200 active:scale-95 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {addedToCart === product.id ? 'Added!' : cart.some(item => item.id === product.id) ? 'In Cart' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-black via-[#0a0a0a] to-black border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="group">
              <div className="text-5xl font-bold mb-3 tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">10,000+</div>
              <div className="text-gray-400 text-sm font-medium">Happy Customers</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold mb-3 tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">4.9/5</div>
              <div className="text-gray-400 text-sm font-medium">Average Rating</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold mb-3 tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">98%</div>
              <div className="text-gray-400 text-sm font-medium">Satisfaction Rate</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold mb-3 tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">24/7</div>
              <div className="text-gray-400 text-sm font-medium">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 tracking-tight">What Our Customers Say</h2>
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-6 w-max">
              {[
                { name: "Sarah M.", initials: "SM", color: "from-blue-500 to-purple-600", review: "bro these vendors are fire ngl. started selling last week and already made my first sale 🔥", time: "2 weeks ago" },
                { name: "Mike R.", initials: "MR", color: "from-green-500 to-teal-600", review: "best thing i ever bought for my side hustle fr. quality is good and shipping fast af", time: "1 month ago" },
                { name: "Jessica K.", initials: "JK", color: "from-pink-500 to-rose-600", review: "made 50k off these vendors no cap. if ur serious bout this just cop it", time: "3 weeks ago" },
                { name: "Alex P.", initials: "AP", color: "from-orange-500 to-red-600", review: "the sneaker plugs go crazy!! made 3k first month and my depop is blowing up rn", time: "1 week ago" },
                { name: "Jordan L.", initials: "JL", color: "from-cyan-500 to-blue-600", review: "shipping crazy fast and the margins are insane. literally changed my life fr", time: "5 days ago" },
                { name: "Taylor H.", initials: "TH", color: "from-purple-500 to-indigo-600", review: "been using these for 6 months and literally zero complaints from customers. W vendors", time: "2 months ago" },
                { name: "Morgan D.", initials: "MD", color: "from-yellow-500 to-orange-600", review: "these lv plugs different fr. quality insane and profit margins go stupid", time: "3 days ago" },
                { name: "Casey R.", initials: "CR", color: "from-red-500 to-pink-600", review: "was sus at first but these legit. made my money back in 2 days lmao", time: "1 week ago" },
                { name: "Riley J.", initials: "RJ", color: "from-teal-500 to-green-600", review: "support team actually helps u out fr. found perfect vendors for my niche", time: "4 weeks ago" },
                { name: "Skylar N.", initials: "SN", color: "from-indigo-500 to-purple-600", review: "margins crazy good. everything selling out on my site rn cant keep up", time: "2 weeks ago" },
                { name: "Dakota S.", initials: "DS", color: "from-emerald-500 to-teal-600", review: "quit my job cuz of this. now making 6 figs. best decision ever no lie", time: "3 months ago" },
                { name: "Parker M.", initials: "PM", color: "from-rose-500 to-red-600", review: "quality unmatched fr. 85% of my customers come back and buy again", time: "1 month ago" },
                { name: "Avery K.", initials: "AK", color: "from-violet-500 to-purple-600", review: "shipping fast asf and communication on point. already ordered again", time: "1 week ago" },
                { name: "Quinn B.", initials: "QB", color: "from-fuchsia-500 to-pink-600", review: "yo my insta shop going crazy rn thanks to these vendors. actually fire", time: "2 weeks ago" },
                { name: "Reese T.", initials: "RT", color: "from-lime-500 to-green-600", review: "made 8k profit last month alone wtf. shoulda started way sooner", time: "3 days ago" },
                { name: "Sage L.", initials: "SL", color: "from-amber-500 to-orange-600", review: "so many vendors to choose from. found exactly what i needed for my brand", time: "5 weeks ago" },
                { name: "Cameron H.", initials: "CH", color: "from-sky-500 to-blue-600", review: "support helped me every step. super chill and responsive fr", time: "1 month ago" },
                { name: "Emerson P.", initials: "EP", color: "from-red-500 to-rose-600", review: "tried other lists before but these way better quality and price. no comparison", time: "2 weeks ago" },
                { name: "Finley R.", initials: "FR", color: "from-green-500 to-emerald-600", review: "doubled my sales in 3 weeks lol. quality stays good every time", time: "4 days ago" },
                { name: "Kai M.", initials: "KM", color: "from-blue-500 to-cyan-600", review: "all my orders came on time and packaging clean. super happy with it", time: "1 week ago" },
                { name: "River S.", initials: "RS", color: "from-purple-500 to-pink-600", review: "profit margins stupid good. told all my homies who resell bout this", time: "3 weeks ago" },
                { name: "Rowan J.", initials: "RJ", color: "from-orange-500 to-yellow-600", review: "best purchase for my business period. worth every dollar and more fr", time: "2 months ago" },
              ].map((testimonial, index) => (
                <div key={index} className="bg-[#0a0a0a] p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 rounded-xl w-[350px] flex-shrink-0" style={{ boxShadow: '0 8px 24px rgba(255, 255, 255, 0.1)' }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold text-xl`}>
                      {testimonial.initials}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="font-semibold text-base">{testimonial.name}</div>
                        <span className="text-[#26FF00] text-xs font-medium">✓ Verified</span>
                      </div>
                      <div className="text-[#FFD700] text-sm">
                        ★★★★★
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-3 leading-relaxed">
                    "{testimonial.review}"
                  </p>
                  <p className="text-gray-500 text-xs font-medium">{testimonial.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 bg-[#121212]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-white/10 pb-6">
              <h3 className="text-lg font-bold mb-2">What do I get with each vendor bundle?</h3>
              <p className="text-gray-400 leading-relaxed">
                Each bundle includes verified supplier contact information, pricing details, minimum order quantities, and shipping information. You get instant access after purchase.
              </p>
            </div>
            <div className="border-b border-white/10 pb-6">
              <h3 className="text-lg font-bold mb-2">Do vendors charge to work with me?</h3>
              <p className="text-gray-400 leading-relaxed">
                No! All vendors are free to work with. You only pay for the products you order from them.
              </p>
            </div>
            <div className="border-b border-white/10 pb-6">
              <h3 className="text-lg font-bold mb-2">Are these suppliers verified?</h3>
              <p className="text-gray-400 leading-relaxed">
                Yes! Every supplier in our bundles is personally tested and verified. We ensure they're legitimate, responsive, and reliable.
              </p>
            </div>
            <div className="border-b border-white/10 pb-6">
              <h3 className="text-lg font-bold mb-2">What if I have an issue with my order?</h3>
              <p className="text-gray-400 leading-relaxed">
                If you experience any issues with your order, please contact our support team and we'll work with you to resolve it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-black border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-gray-400 text-sm space-y-2">
            <div className="flex justify-center gap-6">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/refund" className="hover:text-white transition-colors">Refund Policy</a>
            </div>
            <p>&copy; 2025 AJResells. All rights reserved.</p>
            <p className="mt-2">Powered by <a href="https://webio-omega.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#26FF00] transition-colors underline">Webio</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

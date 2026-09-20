import React, { useState } from 'react';
import { CustomerReview } from '../types';
import { Star, CheckCircle2, MessageSquarePlus, ThumbsUp, Sparkles, X } from 'lucide-react';

interface ReviewsSectionProps {
  reviews: CustomerReview[];
  onAddReview: (review: Omit<CustomerReview, 'id' | 'date' | 'verified'>) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, onAddReview }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Odisha');
  const [productName, setProductName] = useState('Organic Black Rice');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    onAddReview({
      name: name.trim(),
      city: city.trim() || 'Odisha',
      state,
      productName,
      rating,
      comment: comment.trim(),
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setName('');
      setCity('');
      setComment('');
    }, 1500);
  };

  return (
    <section className="py-16 lg:py-24 bg-[#F5EFEB] border-t border-[#E6D7BD]" id="reviews-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Rating Summary */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF5ED] text-[#1B4332] text-xs font-bold uppercase tracking-wider border border-[#CDE5D3]">
              <Sparkles className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span>Verified Farm Customer Feedback</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B4332]">
              Loved by Health-Conscious Homes Across India
            </h2>
            <p className="text-xs sm:text-sm text-[#526356] max-w-xl">
              Real families who have replaced chemically fertilized hybrid rice with Utkal Roots authentic Odisha harvests.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white p-3.5 px-5 rounded-2xl border border-[#E3D3BD] shadow-2xs text-left">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="ml-1 text-sm font-bold text-[#1B4332]">4.95 / 5.0</span>
              </div>
              <span className="text-[11px] text-[#697A6F] block mt-0.5">Based on 400+ verified orders</span>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              id="write-review-btn"
              className="px-5 py-3 rounded-2xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-[#E6D7BD] shadow-2xs hover:shadow-md transition-shadow text-left flex flex-col justify-between space-y-4"
              id={`review-card-${rev.id}`}
            >
              <div className="space-y-3">
                {/* Rating stars and date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#7E8E83]">{rev.date}</span>
                </div>

                {/* Tagged Product */}
                <span className="inline-block text-[11px] font-semibold text-[#8C411E] bg-[#FAF3EA] px-2.5 py-0.5 rounded-full border border-[#EADAC6]">
                  {rev.productName}
                </span>

                <p className="text-xs sm:text-sm text-[#38463D] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-3 border-t border-[#EFE4D3] flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#1B4332]">
                    {rev.name}
                  </h4>
                  <span className="text-[11px] text-[#69796E]">
                    {rev.city}, {rev.state}
                  </span>
                </div>

                {rev.verified && (
                  <div className="flex items-center gap-1 text-[11px] text-[#2D6A4F] font-medium bg-[#EBF5ED] px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Farm Buyer</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Write Review Modal */}
        {modalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
            id="write-review-modal"
          >
            <div
              className="bg-[#FBF8F3] w-full max-w-lg rounded-3xl p-6 sm:p-7 border border-[#E6D7BD] shadow-2xl text-left space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[#E6D7BD] pb-3">
                <h3 className="font-serif font-bold text-lg text-[#1B4332]">
                  Share Your Utkal Roots Experience
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 rounded-full hover:bg-stone-200 text-[#1B4332] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-2 text-[#2D6A4F]">
                  <CheckCircle2 className="w-12 h-12 mx-auto" />
                  <h4 className="font-serif font-bold text-lg">Thank You for Your Feedback!</h4>
                  <p className="text-xs text-[#526356]">Your review has been posted for our Odisha farmers.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-[#1B4332] block mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Lipika Mohanty"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#D5C2A5] text-xs focus:outline-hidden focus:border-[#2D6A4F]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#1B4332] block mb-1">City / Town</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Bhubaneswar"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#D5C2A5] text-xs focus:outline-hidden focus:border-[#2D6A4F]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-[#1B4332] block mb-1">Harvest Product</label>
                      <select
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#D5C2A5] text-xs focus:outline-hidden focus:border-[#2D6A4F]"
                      >
                        <option value="Organic Black Rice">Organic Black Rice</option>
                        <option value="Odisha Indrayani-Style Rice">Odisha Indrayani-Style Rice</option>
                        <option value="Utkal Roots Heritage Duo Pack">Utkal Roots Heritage Duo Pack</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-[#1B4332] block mb-1">Rating</label>
                      <div className="flex items-center gap-1 pt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="p-1 text-amber-500 cursor-pointer"
                          >
                            <Star className={`w-5 h-5 ${rating >= star ? 'fill-current' : 'text-stone-300'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-[#1B4332] block mb-1">Your Review *</label>
                    <textarea
                      required
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Tell us about the aroma, texture, cooking experience, or health changes..."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D5C2A5] text-xs focus:outline-hidden focus:border-[#2D6A4F]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Submit Verified Review
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

import React from 'react';
import { REVIEWS } from '../../data/mockData';
import { reviewsCheckin } from '../../assets/images';
import { Star, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-[#0B0B0D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[1px] bg-[#D4A03A]" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4A03A]">
              Testimonials
            </span>
            <span className="w-5 h-[1px] bg-[#D4A03A]" />
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#F6F6F6] tracking-tight mb-4">
            Praise From Gentlemen
          </h2>
          <p className="text-sm sm:text-base text-[#B8B4AA] font-light">
            Read what our clients say about their grooming experience in our Soho studio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border border-[#222228] bg-[#121216] p-8 flex flex-col justify-between relative group hover:border-[#D4A03A]/50 transition-all duration-300 shadow-lg"
            >
              <div className="absolute top-6 right-6 text-[#D4A03A]/20 group-hover:text-[#D4A03A]/40 transition-colors">
                <Quote className="w-8 h-8" />
              </div>

              <div>
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4A03A] text-[#D4A03A]" />
                  ))}
                </div>

                <p className="text-sm text-[#E2DFD8] font-light leading-relaxed mb-6 italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-6 border-t border-[#1E1E24] flex items-center justify-between">
                <div>
                  <div className="font-display font-bold text-sm text-[#F6F6F6]">
                    {review.clientName}
                  </div>
                  <div className="font-mono text-xs text-[#D4A03A] mt-0.5">
                    {review.serviceName}
                  </div>
                </div>
                <div className="font-mono text-[10px] text-[#777]">
                  {review.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Banner with Review Checkin Image */}
        <div className="rounded-2xl border border-[#222228] overflow-hidden relative bg-[#121216] shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 p-8 sm:p-12">
              <div className="font-mono text-xs uppercase tracking-widest text-[#D4A03A] mb-2">
                Uncompromising Standards
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#F6F6F6] mb-4">
                Experience the gold standard in men's grooming.
              </h3>
              <p className="text-sm text-[#B8B4AA] font-light mb-6">
                Every appointment includes a consultation with your barber, hot lather neck shave, bespoke styling finish, and complimentary beverage from our bar.
              </p>
              <div className="flex items-center gap-6">
                <div>
                  <div className="font-display font-bold text-2xl text-[#D4A03A]">4.98</div>
                  <div className="text-xs text-[#999] font-mono">Average Rating (1,400+ reviews)</div>
                </div>
                <div className="w-[1px] h-10 bg-[#222228]" />
                <div>
                  <div className="font-display font-bold text-2xl text-[#F6F6F6]">100%</div>
                  <div className="text-xs text-[#999] font-mono">Precision Japanese Steel</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 aspect-[16/10] lg:aspect-auto h-full relative">
              <img
                src={reviewsCheckin}
                alt="Client in barber chair checking haircut"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#121216] via-transparent to-transparent hidden lg:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

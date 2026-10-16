import React, { useState } from 'react';
import { contactCloseup } from '../../assets/images';
import { SHOP_INFO } from '../../data/mockData';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#0E0E12] relative border-t border-[#1F1F24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Info & Contact details */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-[1px] bg-[#D4A03A]" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4A03A]">
                Get In Touch
              </span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#F6F6F6] tracking-tight mb-6">
              Inquiries & Private Bookings
            </h2>

            <p className="text-sm sm:text-base text-[#B8B4AA] mb-8 font-light leading-relaxed">
              Have questions regarding private buyouts, wedding parties, or memberships? Send us a note or call our Soho studio directly.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4 p-4 rounded-xl border border-[#222228] bg-[#121216]">
                <div className="w-10 h-10 rounded-lg bg-[#D4A03A]/10 border border-[#D4A03A]/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#D4A03A]" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#999]">Location</div>
                  <div className="text-sm text-[#F6F6F6] font-medium mt-0.5">
                    {SHOP_INFO.address}, {SHOP_INFO.city}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl border border-[#222228] bg-[#121216]">
                <div className="w-10 h-10 rounded-lg bg-[#D4A03A]/10 border border-[#D4A03A]/20 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#D4A03A]" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#999]">Direct Phone</div>
                  <div className="text-sm text-[#F6F6F6] font-medium mt-0.5">
                    {SHOP_INFO.phone}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl border border-[#222228] bg-[#121216]">
                <div className="w-10 h-10 rounded-lg bg-[#D4A03A]/10 border border-[#D4A03A]/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#D4A03A]" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#999]">Email</div>
                  <div className="text-sm text-[#F6F6F6] font-medium mt-0.5">
                    {SHOP_INFO.email}
                  </div>
                </div>
              </div>
            </div>

            {/* Artisanal image thumbnail */}
            <div className="rounded-xl overflow-hidden border border-[#222228] aspect-[16/9] relative">
              <img
                src={contactCloseup}
                alt="Antique brass scissors and grooming tools"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent" />
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#222228] bg-[#121216] p-8 sm:p-10 shadow-2xl relative">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F6F6F6] mb-2">
                Send a Message
              </h3>
              <p className="text-sm text-[#999] mb-8 font-light">
                We typically respond within 2 business hours.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#D4A03A]/20 border border-[#D4A03A]/40 flex items-center justify-center mx-auto text-[#D4A03A]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-bold text-xl text-[#F6F6F6]">
                    Inquiry Received
                  </h4>
                  <p className="text-sm text-[#B8B4AA] max-w-md mx-auto font-light">
                    Thank you, {formData.name}. Our studio manager will reach out to your email ({formData.email}) shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', message: '' });
                    }}
                    className="mt-6 px-6 py-2.5 rounded-lg border border-[#333] hover:border-[#D4A03A] text-xs font-mono text-[#F6F6F6] transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#C5C1B6] mb-2">
                        Your Full Name <span className="text-[#D4A03A]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Marcus Sterling"
                        className="w-full bg-[#18181C] border border-[#2A2A32] rounded-xl px-4 py-3 text-sm text-[#F6F6F6] focus:outline-none focus:border-[#D4A03A] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#C5C1B6] mb-2">
                        Email Address <span className="text-[#D4A03A]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="marcus@example.com"
                        className="w-full bg-[#18181C] border border-[#2A2A32] rounded-xl px-4 py-3 text-sm text-[#F6F6F6] focus:outline-none focus:border-[#D4A03A] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#C5C1B6] mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-[#18181C] border border-[#2A2A32] rounded-xl px-4 py-3 text-sm text-[#F6F6F6] focus:outline-none focus:border-[#D4A03A] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#C5C1B6] mb-2">
                      Your Message / Inquiry <span className="text-[#D4A03A]">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please inquire about group bookings, wedding parties, or private grooming sessions..."
                      className="w-full bg-[#18181C] border border-[#2A2A32] rounded-xl px-4 py-3 text-sm text-[#F6F6F6] focus:outline-none focus:border-[#D4A03A] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#D4A03A] hover:bg-[#E5B14B] text-[#0B0B0D] font-display font-bold text-sm tracking-wider uppercase rounded-xl transition-all shadow-[0_4px_20px_rgba(212,160,58,0.25)] flex items-center justify-center gap-2"
                  >
                    <span>Transmit Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 3000);
  };

  return (
    <section className="py-16 lg:py-24 bg-[#FBF8F3] relative" id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF5ED] text-[#1B4332] text-xs font-bold uppercase tracking-wider border border-[#CDE5D3]">
            <Phone className="w-3.5 h-3.5 text-[#2D6A4F]" />
            <span>Connect with Utkal Roots</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B4332]">
            Talk Directly with Our Farm Team
          </h2>
          <p className="text-[#516155] text-sm sm:text-base leading-relaxed">
            Have questions about grain varieties, bulk farm orders, or our neem & compost methods? We are always happy to speak with you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-5 text-left">
            {/* Phone & WhatsApp Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#E6D7BD] shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EBF5ED] flex items-center justify-center text-[#2D6A4F]">
                <Phone className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#1B4332]">
                Farm Phone & Helpline
              </h4>
              <p className="text-xs text-[#5C6D61]">
                Call or WhatsApp our Odisha team for instant assistance:
              </p>
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <a
                  href="tel:+918390155321"
                  className="px-4 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-bold transition-colors inline-flex items-center gap-2 justify-center"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+91 8390155321</span>
                </a>
                <a
                  href="https://wa.me/918390155321?text=Hello%20Utkal%20Roots,%20I%20would%20like%20to%20know%20more%20about%20your%20organic%20rice%20harvest."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold transition-colors inline-flex items-center gap-2 justify-center"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#E6D7BD] shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#F6EDE1] flex items-center justify-center text-[#B85D34]">
                <Mail className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#1B4332]">
                Direct Farm Email
              </h4>
              <p className="text-xs text-[#5C6D61]">
                For orders, institutional partnerships, or organic farming workshops:
              </p>
              <a
                href="mailto:utkalroots@gmail.com"
                className="text-sm font-bold text-[#2D6A4F] hover:underline block pt-1"
              >
                utkalroots@gmail.com
              </a>
            </div>

            {/* Farm Locations */}
            <div className="bg-white rounded-3xl p-6 border border-[#E6D7BD] shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EBF5ED] flex items-center justify-center text-[#2D6A4F]">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#1B4332]">
                Our Farm & Dispatch Hubs
              </h4>
              <div className="space-y-2 text-xs text-[#4F5F53]">
                <div>
                  <strong className="text-[#1B4332] block">Organic Farm Fields:</strong>
                  <span>Bargarh, Sambalpur & Mayurbhanj Districts, Odisha 768028</span>
                </div>
                <div>
                  <strong className="text-[#1B4332] block">Courier & Packaging Hub:</strong>
                  <span>Utkal Roots Dispatch, Patia, Bhubaneswar, Odisha 751024</span>
                </div>
              </div>
              <div className="pt-2 border-t border-[#EFE5D4] flex items-center gap-2 text-[11px] text-[#637568]">
                <Clock className="w-3.5 h-3.5 text-[#2D6A4F]" />
                <span>Farm hours: Monday – Saturday (8:00 AM – 7:00 PM IST)</span>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E6D7BD] shadow-sm text-left">
            <h3 className="font-serif font-bold text-2xl text-[#1B4332] mb-2">
              Send an Inquiry
            </h3>
            <p className="text-xs sm:text-sm text-[#5C6D61] mb-6">
              Fill out this form and one of our farm coordinators will get back to you within 4 hours.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-3 bg-[#EAF5ED] rounded-2xl border border-[#C5E3CB] p-6 text-[#1B4332]">
                <CheckCircle2 className="w-12 h-12 text-[#2D6A4F] mx-auto" />
                <h4 className="font-serif font-bold text-xl">Inquiry Received!</h4>
                <p className="text-xs sm:text-sm text-[#4E5E52] max-w-sm mx-auto">
                  Thank you, {name}. Our team from Odisha will contact you at <strong>{email || phone}</strong> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-[#1B4332] block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Subhashree Mishra"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6EE] border border-[#D5C2A5] focus:outline-hidden focus:border-[#2D6A4F]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#1B4332] block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 8390155321"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6EE] border border-[#D5C2A5] focus:outline-hidden focus:border-[#2D6A4F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#1B4332] block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6EE] border border-[#D5C2A5] focus:outline-hidden focus:border-[#2D6A4F]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#1B4332] block mb-1">
                    Your Message / Order Requirement *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you'd like to ask or if you need custom bulk quantities for family ceremonies..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6EE] border border-[#D5C2A5] focus:outline-hidden focus:border-[#2D6A4F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Farm Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

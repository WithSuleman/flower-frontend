import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import FloatingFlowers from '../components/FloatingFlowers.jsx';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 relative">
        <FloatingFlowers count={4} />
        <span className="text-xs uppercase font-bold tracking-widest text-rose-500">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-serif-floral text-stone-900">
          We’d Love to Hear From You 🌸
        </h1>
        <p className="text-stone-600 text-sm sm:text-base">
          Have a question about custom floral arrangements, corporate events, or your current order? Our florists are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-rose-100 shadow-xs space-y-4">
            <h2 className="text-xl font-bold font-serif-floral text-stone-900 border-b border-rose-100 pb-3">
              Flower Studio & Hours
            </h2>

            <div className="space-y-4 text-sm text-stone-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-800">Flagship Boutique:</strong>
                  <span>42 Blossom Way, Floral District, San Francisco, CA 94107</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-800">Phone Support:</strong>
                  <span>+1 (800) 555-BLOOM (Mon - Sat, 8am - 7pm PST)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-800">Direct Email:</strong>
                  <span>hello@bloomora-flowers.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-800">Same-Day Delivery Cutoff:</strong>
                  <span>Orders placed before 2:00 PM are delivered same day.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-100/60 to-pink-50/80 border border-rose-200/70 text-stone-800 space-y-2">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-rose-600" />
              <span>Custom Wedding & Event Inquiries</span>
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Planning a wedding, baby shower, or gala? Contact our lead botanical artist for personalized styling and consultation.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-sm">
          <h2 className="text-xl font-bold font-serif-floral text-stone-900 border-b border-rose-100 pb-3 mb-6">
            Send Us a Message
          </h2>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3"
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-900">Message Received! 🌸</h3>
              <p className="text-xs sm:text-sm text-emerald-700 max-w-sm mx-auto">
                Thank you for contacting Bloomora. One of our florists will get back to you within 2-4 business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-bold text-emerald-800 underline"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Rose Tyler"
                    className="w-full px-4 py-3 bg-rose-50/40 rounded-xl text-sm border border-rose-200 focus:outline-hidden focus:ring-2 focus:ring-rose-400 focus:bg-white text-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rose@example.com"
                    className="w-full px-4 py-3 bg-rose-50/40 rounded-xl text-sm border border-rose-200 focus:outline-hidden focus:ring-2 focus:ring-rose-400 focus:bg-white text-stone-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Order query, custom bouquet, etc."
                  className="w-full px-4 py-3 bg-rose-50/40 rounded-xl text-sm border border-rose-200 focus:outline-hidden focus:ring-2 focus:ring-rose-400 focus:bg-white text-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Message *
                </label>
                <textarea
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can our florists assist you today?"
                  className="w-full px-4 py-3 bg-rose-50/40 rounded-xl text-sm border border-rose-200 focus:outline-hidden focus:ring-2 focus:ring-rose-400 focus:bg-white text-stone-800"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

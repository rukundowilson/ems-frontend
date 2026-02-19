"use client";

import React, { useState } from "react";
import { HelpCircle, Phone, Mail, MessageCircle, ChevronDown, ChevronUp, Send } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "How do I book an appointment?",
    answer: "You can book an appointment by navigating to the 'Book Appointment' section, selecting your preferred doctor, date, and time. You'll receive a confirmation once your booking is approved.",
  },
  {
    id: 2,
    question: "Can I reschedule my appointment?",
    answer: "Yes, you can reschedule your appointment from the 'My Appointments' page. Click on the appointment and select 'Reschedule'. Please note that rescheduling is subject to availability.",
  },
  {
    id: 3,
    question: "How do I access my medical records?",
    answer: "Your medical records can be accessed from your Profile page. Click on 'Medical History' to view all your past appointments, prescriptions, and test results.",
  },
  {
    id: 4,
    question: "What payment methods are accepted?",
    answer: "We accept credit cards, debit cards, insurance, and online payment methods. You can select your preferred payment method during the booking process.",
  },
  {
    id: 5,
    question: "How do I contact my doctor?",
    answer: "You can message your doctor directly through the 'Messages' section. For urgent matters, please call the emergency number provided in your appointment details.",
  },
  {
    id: 6,
    question: "What should I do if I need to cancel?",
    answer: "To cancel an appointment, go to 'My Appointments', select the appointment you wish to cancel, and click 'Cancel'. Please cancel at least 24 hours in advance to avoid cancellation fees.",
  },
];

export default function PatientSupportPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [supportMessage, setSupportMessage] = useState("");
  const [supportSubject, setSupportSubject] = useState("");

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleSubmitSupport = () => {
    if (supportSubject.trim() && supportMessage.trim()) {
      alert("Support request submitted successfully! We'll get back to you soon.");
      setSupportSubject("");
      setSupportMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-8 py-4">
        <h1 className="text-2xl font-bold text-gray-800">Support Center</h1>
        <p className="text-gray-600 text-sm">Get help and find answers to your questions</p>
      </div>

      <div className="p-8">
        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-[#1a3fac] rounded-full flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Call Us</h3>
            <p className="text-gray-600 text-sm mb-3">Available 24/7 for emergencies</p>
            <a href="tel:1-800-HEALTH" className="text-[#1a3fac] font-semibold hover:underline">
              1-800-HEALTH
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Email Support</h3>
            <p className="text-gray-600 text-sm mb-3">Response within 24 hours</p>
            <a href="mailto:support@healthcare.com" className="text-teal-600 font-semibold hover:underline">
              support@healthcare.com
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Live Chat</h3>
            <p className="text-gray-600 text-sm mb-3">Chat with our support team</p>
            <button className="text-blue-600 font-semibold hover:underline">
              Start Chat
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FAQs */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-6 h-6 text-[#1a3fac]" />
              <h2 className="text-xl font-bold text-gray-800">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition"
                  >
                    <span className="font-semibold text-gray-800 text-left">{faq.question}</span>
                    {expandedFaq === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Submit a Request</h2>
            <p className="text-gray-600 text-sm mb-4">Can't find what you're looking for? Send us a message.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={supportSubject}
                  onChange={(e) => setSupportSubject(e.target.value)}
                  placeholder="Brief description of your issue"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3fac]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  placeholder="Describe your issue in detail..."
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3fac] resize-none"
                />
              </div>

              <button
                onClick={handleSubmitSupport}
                className="w-full bg-[#1a3fac] hover:bg-[#1a3fac] text-white py-2 rounded-lg flex items-center justify-center gap-2 transition"
              >
                <Send className="w-4 h-4" />
                Submit Request
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">Office Hours</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                <p>Saturday: 9:00 AM - 5:00 PM</p>
                <p>Sunday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-6 bg-gradient-to-r from-[#1a3fac] to-[#1a3fac] rounded-xl shadow-md p-6 text-white">
          <h2 className="text-xl font-bold mb-2">Need Immediate Assistance?</h2>
          <p className="mb-4">For medical emergencies, please call 911 or visit your nearest emergency room.</p>
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-white text-[#1a3fac] rounded-lg font-semibold hover:bg-gray-100 transition">
              Emergency Contacts
            </button>
            <button className="px-6 py-2 bg-[#1a3fac] text-white rounded-lg font-semibold hover:bg-purple-800 transition">
              Find Nearest Hospital
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

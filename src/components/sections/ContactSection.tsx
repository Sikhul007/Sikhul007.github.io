"use client";

import React, { useState } from "react";
import EndpointHeader from "@/components/ui/EndpointHeader";
import { contactInfo, socialLinks } from "@/data/site";

const ContactSection: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch(`https://formsubmit.co/ajax/${contactInfo.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          _subject: "New Portfolio Contact Message",
          _captcha: "false",
        }),
      });
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-raised border border-line rounded-md px-4 py-2.5 text-main placeholder:text-muted font-body text-sm focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple transition-colors";

  return (
    <section id="contact" className="py-16 md:py-24 border-b border-line bg-void">
      <div className="container mx-auto px-4 sm:px-6">
        <EndpointHeader
          method="POST"
          path="/api/contact"
          title="Get In Touch"
          sub="Have a project, a role, or just a question? Send a request — I respond fast."
        />

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Form */}
          <div className="w-full lg:w-3/5">
            <div className="bg-panel border border-line rounded-xl p-6 sm:p-8 h-full">
              <p className="font-mono text-sm text-muted mb-6">
                <span className="text-green">POST</span> /api/contact{" "}
                <span className="text-muted">— body:</span>
              </p>
              {status === "sent" ? (
                <div className="text-center py-12">
                  <p className="font-mono text-green text-lg mb-2">201 Created ✓</p>
                  <p className="text-muted">
                    Thank you for your message! I&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block font-mono text-xs text-purple mb-2">
                        &quot;name&quot;:
                      </label>
                      <input
                        type="text" id="name" name="name" required
                        value={form.name} onChange={handleChange}
                        className={inputClass} placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-mono text-xs text-purple mb-2">
                        &quot;email&quot;:
                      </label>
                      <input
                        type="email" id="email" name="email" required
                        value={form.email} onChange={handleChange}
                        className={inputClass} placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block font-mono text-xs text-purple mb-2">
                      &quot;subject&quot;:
                    </label>
                    <input
                      type="text" id="subject" name="subject" required
                      value={form.subject} onChange={handleChange}
                      className={inputClass} placeholder="What's this about?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block font-mono text-xs text-purple mb-2">
                      &quot;message&quot;:
                    </label>
                    <textarea
                      id="message" name="message" rows={5} required
                      value={form.message} onChange={handleChange}
                      className={inputClass} placeholder="Your message here..."
                    />
                  </div>
                  {status === "error" && (
                    <p className="font-mono text-xs text-amber">
                      500 — something went wrong. Try again or email me directly.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full font-mono text-sm font-semibold px-6 py-3 rounded-md bg-purple text-main hover:bg-raised disabled:opacity-60 transition-colors shadow-lg"
                  >
                    {status === "sending" ? "sending..." : "send_message()"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="w-full lg:w-2/5">
            <div className="bg-panel border border-line rounded-xl p-6 sm:p-8 h-full flex flex-col gap-6">
              <div>
                <div className="space-y-3 text-sm">
                  <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 text-muted hover:text-purple transition-colors">
                    <span className="text-amber font-mono">@</span> {contactInfo.email}
                  </a>
                  <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-3 text-muted hover:text-purple transition-colors">
                    <span className="text-amber font-mono">☎</span> {contactInfo.phoneDisplay}
                  </a>
                  <p className="flex items-center gap-3 text-muted">
                    <span className="text-amber font-mono">⌖</span> {contactInfo.location}
                  </p>
                </div>
              </div>
              <div className="border-t border-line pt-6">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {socialLinks.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-muted hover:text-purple transition-colors"
                    >
                      <span className="text-purple">→</span> {s.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-auto bg-raised border border-line rounded-lg p-4 font-mono text-xs">
                <p className="text-muted">
                  <span className="text-green">$</span> status --current
                </p>
                <p className="text-main mt-1">
                  <span className="text-green">●</span> Open to backend / .NET roles
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

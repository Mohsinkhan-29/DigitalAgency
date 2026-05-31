import React, { useEffect, useMemo, useState } from "react";

const serviceOptions = [
  "Web Development",
  "Mobile App",
  "UI/UX Design",
  "Digital Marketing",
  "Cloud / DevOps",
  "AI Integration",
];

const timelineOptions = [
  { label: "ASAP", emoji: "⚡" },
  { label: "1 Month", emoji: "📅" },
  { label: "1–3 Months", emoji: "⏱" },
  { label: "3–6 Months", emoji: "🌍" },
  { label: "Flexible", emoji: "😊" },
  { label: "Ongoing", emoji: "🔄" },
];

const howOptions = [
  "Google Search",
  "Social Media",
  "Referral",
  "LinkedIn",
  "Conference",
  "Other",
];

const contactCards = [
  {
    label: "EMAIL US",
    value: "hello@nexawave.io",
    sub: "We reply within 4 hours",
  },
  {
    label: "CALL US",
    value: "+1 (555) 020-7000",
    sub: "Mon – Fri, 9am – 6pm PST",
  },
  {
    label: "SAN FRANCISCO HQ",
    value: "340 Pine Street, Suite 800",
    sub: "San Francisco, CA 94104",
  },
  {
    label: "LONDON OFFICE",
    value: "1 Canada Square, Canary Wharf",
    sub: "London, E14 5AB",
  },
];

const ErrorAlert = ({ message }) => {
  if (!message) return null;

  return (
    <div
      className="mt-3 flex items-start gap-3 rounded-2xl border px-4 py-3"
      style={{ borderColor: "#FCA5A5", background: "#FEF2F2" }}
    >
      <div className="mt-[2px]" style={{ color: "#DC2626" }}>
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86l-7.5 13A2 2 0 004.5 20h15a2 2 0 001.71-3l-7.5-13a2 2 0 00-3.42 0z" />
        </svg>
      </div>
      <p className="text-sm font-medium" style={{ color: "#DC2626" }}>
        {message}
      </p>
    </div>
  );
};

export default function ContactPage() {
  const [selected, setSelected] = useState([]);
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState(5000);
  const [details, setDetails] = useState("");
  const [howFound, setHowFound] = useState("");
  const [agree, setAgree] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9+\-()\s]{7,20}$/.test(phone);

  const validations = useMemo(() => {
    return {
      services: selected.length > 0,
      timeline: timeline !== "",
      name: formData.name.trim().length >= 3,
      email: validateEmail(formData.email),
      phone: formData.phone.trim() === "" || validatePhone(formData.phone),
      details: details.trim().length >= 20,
      howFound: howFound !== "",
      agree,
    };
  }, [selected, timeline, formData, details, howFound, agree]);

  useEffect(() => {
    const total = Object.values(validations).filter(Boolean).length;
    const percent = Math.round((total / Object.keys(validations).length) * 100);
    setProgress(percent);
  }, [validations]);

  const handleInput = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const toggleService = (item) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  const formatBudget = (v) =>
    v >= 100000 ? "$100k+" : `$${v.toLocaleString()}`;

  const isFormValid = progress === 100;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!validations.services)  newErrors.services  = "Select at least one service";
    if (!validations.timeline)  newErrors.timeline  = "Select a timeline";
    if (!validations.name)      newErrors.name      = "Enter valid full name";
    if (!validations.email)     newErrors.email     = "Enter valid email address";
    if (!validations.phone)     newErrors.phone     = "Enter valid phone number";
    if (!validations.details)   newErrors.details   = "Project details must be at least 20 characters";
    if (!validations.howFound)  newErrors.howFound  = "Please select an option";
    if (!validations.agree)     newErrors.agree     = "You must accept terms";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitLoading(true);
    setSubmitError("");

    try {
      const res = await fetch("https://digitalagency-pmrq.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:     formData.name,
          email:    formData.email,
          company:  formData.company,
          phone:    formData.phone,
          services: selected,
          timeline,
          budget,
          details,
          howFound,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Submission failed. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "#F0FDF4" }}
      >
        <div
          className="rounded-3xl shadow-xl p-10 max-w-md w-full text-center"
          style={{ background: "#FFFFFF", border: "1px solid #BBF7D0" }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-6"
            style={{ background: "#16A34A", color: "#FFFFFF" }}
          >
            ✓
          </div>
          <h2 className="text-3xl font-bold mb-3" style={{ color: "#052E16" }}>
            Message Sent!
          </h2>
          <p style={{ color: "#166534" }}>
            Thanks for reaching out. Our team will contact you soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8" style={{ background: "#F0FDF4" }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[380px_1fr] gap-10">

        {/* LEFT */}
        <div className="lg:sticky top-8 h-fit self-start">
          <p
            className="uppercase tracking-[4px] text-sm font-bold mb-5 flex items-center gap-3"
            style={{ color: "#16A34A" }}
          >
            <span className="w-8 h-[2px]" style={{ background: "#16A34A" }}></span>
            Get In Touch
          </p>

          <h1
            className="text-5xl md:text-6xl font-black leading-tight"
            style={{ color: "#052E16" }}
          >
            We'd Love to <br />
            Hear <span style={{ color: "#16A34A" }}>From You</span>
          </h1>

          <p
            className="mt-6 leading-8 text-[17px] max-w-sm"
            style={{ color: "#166534" }}
          >
            Whether you have a project in mind, a question, or simply want to
            explore opportunities — our team is ready to help.
          </p>

          {/* AVAILABILITY BOX */}
          <div
            className="mt-8 rounded-2xl border px-5 py-4 flex items-center gap-3"
            style={{ background: "#ECFDF5", borderColor: "#BBF7D0" }}
          >
            <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: "#22C55E" }} />
            <p className="text-sm font-medium leading-6" style={{ color: "#166534" }}>
              Our team is currently available for new projects starting Q3 2025
            </p>
          </div>

          {/* CONTACT CARDS */}
          <div className="mt-6 space-y-4">
            {contactCards.map((card, i) => {
              const icons = ["✉️", "📞", "📍", "🏢"];
              return (
                <div
                  key={i}
                  className="rounded-2xl border p-5 flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ background: "#F8FAFC", borderColor: "#DCE7F5" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: "#E0ECFF" }}
                  >
                    {icons[i]}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "#64748B" }}>
                      {card.label}
                    </p>
                    <h3 className="mt-1 text-[15px] font-bold leading-6" style={{ color: "#0F172A" }}>
                      {card.value}
                    </h3>
                    <p className="text-sm mt-1" style={{ color: "#64748B" }}>
                      {card.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT FORM */}
        <form
          onSubmit={handleSubmit}
          className="rounded-[34px] border shadow-xl overflow-visible"
          style={{ background: "#FFFFFF", borderColor: "#BBF7D0" }}
        >

          {/* PROGRESS */}
          <div
            className="sticky top-0 md:top-20 z-30 px-6 md:px-10 py-5 border-b backdrop-blur-xl rounded-t-[34px]"
            style={{ background: "rgba(255,255,255,0.85)", borderColor: "#BBF7D0" }}
          >
            <div className="flex items-center gap-4">
              <div className="relative h-2 flex-1 overflow-hidden rounded-full" style={{ background: "#DCFCE7" }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%`, background: "#16A34A" }}
                />
              </div>
              <div
                className="min-w-[92px] rounded-full px-3 py-1.5 text-center text-xs font-bold"
                style={{ background: "#DCFCE7", color: "#166534" }}
              >
                {progress}% Complete
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <p style={{ color: "#4B5563" }}>Complete all required fields</p>
              {progress === 100 && (
                <div className="flex items-center gap-1 font-semibold" style={{ color: "#16A34A" }}>
                  <span className="h-2 w-2 rounded-full" style={{ background: "#4ADE80" }} />
                  Ready to Submit
                </div>
              )}
            </div>
          </div>

          <div className="p-6 md:p-10">

            {/* SERVICES */}
            <div>
              <label className="block text-xs font-bold uppercase mb-4" style={{ color: "#166534" }}>
                I Need Help With *
              </label>
              <div className="flex flex-wrap gap-3">
                {serviceOptions.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => toggleService(item)}
                    className="px-5 py-3 rounded-full border text-sm font-medium transition-all"
                    style={{
                      borderColor: selected.includes(item) ? "#16A34A" : "#BBF7D0",
                      background: selected.includes(item) ? "#16A34A" : "#FFFFFF",
                      color: selected.includes(item) ? "#FFFFFF" : "#052E16",
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <ErrorAlert message={errors.services} />
            </div>

            {/* INPUTS */}
            <div className="grid md:grid-cols-2 gap-6 mt-10">
              {[
                { label: "Full Name *",      field: "name",    type: "text",  placeholder: "Alex Johnson" },
                { label: "Email Address *",  field: "email",   type: "email", placeholder: "alex@company.com" },
                { label: "Company Name",     field: "company", type: "text",  placeholder: "Your Company Ltd." },
                { label: "Phone Number",     field: "phone",   type: "tel",   placeholder: "+1 (555) 000-0000" },
              ].map((input) => (
                <div key={input.field}>
                  <label className="block text-xs font-bold uppercase mb-3" style={{ color: "#166534" }}>
                    {input.label}
                  </label>
                  <input
                    type={input.type}
                    value={formData[input.field]}
                    onChange={(e) => handleInput(input.field, e.target.value)}
                    placeholder={input.placeholder}
                    className="w-full rounded-2xl border px-5 py-4 outline-none transition-all"
                    style={{
                      borderColor: errors[input.field] ? "#DC2626" : "#BBF7D0",
                      background: errors[input.field] ? "#FEF2F2" : "#FFFFFF",
                    }}
                  />
                  <ErrorAlert message={errors[input.field]} />
                </div>
              ))}
            </div>

            {/* TIMELINE */}
            <div className="mt-10">
              <label className="block text-xs font-bold uppercase mb-4" style={{ color: "#166534" }}>
                Project Timeline *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {timelineOptions.map((item) => (
                  <button
                    type="button"
                    key={item.label}
                    onClick={() => setTimeline(item.label)}
                    className="rounded-2xl border p-5 transition-all"
                    style={{
                      borderColor: timeline === item.label ? "#16A34A" : "#BBF7D0",
                      background: timeline === item.label ? "#DCFCE7" : "#FFFFFF",
                    }}
                  >
                    <div className="text-2xl">{item.emoji}</div>
                    <div className="mt-2 text-sm font-semibold" style={{ color: "#052E16" }}>
                      {item.label}
                    </div>
                  </button>
                ))}
              </div>
              <ErrorAlert message={errors.timeline} />
            </div>

            {/* BUDGET SLIDER */}
            <div className="mt-10">
              <label className="block text-xs font-bold uppercase mb-4" style={{ color: "#166534" }}>
                Budget Range
              </label>
              <div
                className="rounded-2xl border px-6 py-5"
                style={{ borderColor: "#BBF7D0", background: "#ECFDF5" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium" style={{ color: "#166534" }}>Estimated Budget</span>
                  <span className="text-lg font-black" style={{ color: "#16A34A" }}>
                    {formatBudget(budget)}
                  </span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={100000}
                  step={1000}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: "#16A34A" }}
                />
                <div className="flex justify-between mt-1 text-xs" style={{ color: "#64748B" }}>
                  <span>$1,000</span>
                  <span>$100k+</span>
                </div>
              </div>
            </div>

            {/* DETAILS */}
            <div className="mt-10">
              <label className="block text-xs font-bold uppercase mb-4" style={{ color: "#166534" }}>
                Project Details *
              </label>
              <textarea
                rows={6}
                value={details}
                onChange={(e) => setDetails(e.target.value.slice(0, 1000))}
                className="w-full rounded-2xl border px-5 py-4 outline-none resize-none"
                style={{
                  borderColor: errors.details ? "#DC2626" : "#BBF7D0",
                  background: errors.details ? "#FEF2F2" : "#FFFFFF",
                }}
              />
              <div className="flex justify-between mt-2">
                <ErrorAlert message={errors.details} />
                <p style={{ color: "#4B5563" }}>{details.length}/1000</p>
              </div>
            </div>

            {/* HOW FOUND */}
            <div className="mt-10">
              <label className="block text-xs font-bold uppercase mb-4" style={{ color: "#166534" }}>
                How Did You Find Us? *
              </label>
              <select
                value={howFound}
                onChange={(e) => setHowFound(e.target.value)}
                className="w-full rounded-2xl border px-5 py-4 outline-none"
                style={{
                  borderColor: errors.howFound ? "#DC2626" : "#BBF7D0",
                  background: "#FFFFFF",
                }}
              >
                <option value="">Select an option</option>
                {howOptions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <ErrorAlert message={errors.howFound} />
            </div>

            {/* CHECKBOX */}
            <div className="mt-8">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={() => setAgree(!agree)}
                  style={{ accentColor: "#16A34A" }}
                />
                <span style={{ color: "#166534" }} className="text-sm leading-7">
                  I have read and agree to the{" "}
                  <span style={{ color: "#16A34A", fontWeight: 600 }}>Privacy Policy</span>{" "}
                  and{" "}
                  <span style={{ color: "#16A34A", fontWeight: 600 }}>Terms of Service</span>
                </span>
              </label>
              <ErrorAlert message={errors.agree} />
            </div>

            {/* API ERROR */}
            {submitError && <ErrorAlert message={submitError} />}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={!isFormValid || submitLoading}
              className="w-full mt-10 py-5 rounded-2xl font-bold text-lg transition-all"
              style={{
                background: isFormValid && !submitLoading ? "#16A34A" : "#BBF7D0",
                color: isFormValid && !submitLoading ? "#FFFFFF" : "#052E16",
                cursor: !isFormValid || submitLoading ? "not-allowed" : "pointer",
              }}
            >
              {submitLoading
                ? "Sending…"
                : isFormValid
                  ? "Send Message →"
                  : `Complete Form (${progress}%)`}
            </button>

          </div>
        </form>
      </div>
    </section>
  );
}
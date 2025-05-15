import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Animation Variant for sections
const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Section = ({ children }) => (
  <motion.section
    variants={sectionVariant}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    className="p-8 mb-20 bg-white/70 rounded-xl shadow-md"
  >
    {children}
  </motion.section>
);

const About = () => {
  return (
    <div className="min-h-screen text-gray-900 font-sans">
      <div className="max-w-6xl mx-auto py-20 px-6">
        {/* Hero */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-orange-600 text-sm font-bold uppercase tracking-widest animate-pulse">
            Welcome to
          </h2>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-800 mt-4">
            Castro Store
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Your destination for stylish and reliable online shopping in Egypt
            and beyond.
          </p>
        </motion.div>

        {/* Features */}
        <Section>
          <h2 className="text-2xl font-bold text-center mb-10">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature
              icon="🛍"
              title="Top-Quality Products"
              desc="Premium items crafted with care."
            />
            <Feature
              icon="💬"
              title="24/7 Support"
              desc="We’re always here to help you."
            />
            <Feature
              icon="🚚"
              title="Fast Delivery"
              desc="Speedy, safe delivery to your door."
            />
          </div>
        </Section>

        {/* Mission & Vision */}
        <Section>
          <h2 className="text-2xl font-bold text-center mb-4">
            Our Mission & Vision
          </h2>
          <p className="text-center text-gray-700 max-w-3xl mx-auto">
            At Castro Store, our mission is to redefine e-commerce in the Arab
            world through trust, convenience, and innovation.
          </p>
        </Section>

        {/* Values */}
        <Section>
          <h2 className="text-2xl font-bold text-center mb-6">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ValueCard
              title="Trust"
              desc="Your privacy and confidence come first."
            />
            <ValueCard
              title="Innovation"
              desc="Always improving your shopping journey."
            />
            <ValueCard
              title="Satisfaction"
              desc="If you're happy, we’re happy!"
            />
          </div>
        </Section>

        {/* Team */}
        <Section>
          <h2 className="text-2xl font-bold text-center mb-4">Meet Our Team</h2>
          <p className="text-center text-gray-600 mb-8">
            Driven by passion, committed to excellence.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
            {["Mohammed Abdulazeem", "Aya Elagamy", "Haneen Mahmoud"].map(
              (name, i) => (
                <TeamCard key={i} name={name} role="Team Member" />
              )
            )}
          </div>
        </Section>

        {/* Contact */}
        <Section>
          <h2 className="text-xl font-bold text-center mb-3">Let’s Talk</h2>
          <p className="text-center text-gray-600 mb-4">
            Need help or feedback?
          </p>
          <div className="text-center">
            <Link
              to="/contact"
              className="inline-block bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700 transition"
            >
              Contact Us
            </Link>
          </div>
        </Section>
        {/* CTA */}
        <motion.div whileHover={{ scale: 1.05 }} className="text-center mt-10">
          <a
            href="/"
            className="inline-block bg-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-700 transition"
          >
            Browse Our Collection
          </a>
        </motion.div>
      </div>
    </div>
  );
};

// Feature Card
const Feature = ({ icon, title, desc }) => (
  <div className="bg-white p-6 rounded-lg text-center shadow hover:shadow-orange-200 transition">
    <div className="text-3xl mb-2">{icon}</div>
    <h3 className="text-lg font-bold mb-1">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

// Value Card
const ValueCard = ({ title, desc }) => (
  <div className="bg-white p-5 rounded-lg shadow hover:shadow-orange-200 transition text-center">
    <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
    <p className="text-sm text-gray-600 mt-1">{desc}</p>
  </div>
);

// Team Card (without image)
const TeamCard = ({ name, role }) => (
  <div className="p-4 bg-white rounded-lg text-center shadow hover:shadow-orange-200 transition">
    <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-orange-600">
      {name.charAt(0)}
    </div>
    <h4 className="font-semibold text-gray-800">{name}</h4>
    <p className="text-sm text-gray-500">{role}</p>
  </div>
);

export default About;

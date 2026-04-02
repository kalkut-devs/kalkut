import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  ArrowRight, Mail, Github, Linkedin, 
  MapPin, Phone, MessageCircle, X, Hexagon,
  Triangle, Circle, Square, Globe, Shield
} from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import WhatsAppWidget from './WhatsAppWidget';
import './EditorialTheme.css'; // New styles

const KalKutEditorialPortfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { label: "Projects Delivered", value: 10, prefix: "+" },
    { label: "Happy Clients", value: 8, prefix: "+" },
    { label: "Years Experience", value: 2, prefix: "+" },
    { label: "Awards Won", value: 3, prefix: "" }
  ];

  const projects = [
    {
      id: 1,
      title: "FinFlow",
      category: "FinTech Platform",
      description: "Real-time payment orchestration platform processing millions seamlessly.",
      year: "2024",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
      challenge: "Building a highly reliable and fast payment gateway capable of handling 5,000 requests per second.",
      solution: "Implemented an event-driven architecture utilizing distributed caching (Redis) and Node.js microservices.",
      tech: ["React", "Node.js", "Redis", "PostgreSQL"],
      metric: "10k+ active users"
    },
    {
      id: 2,
      title: "Pulse AI",
      category: "Health & Wellness",
      description: "AI-driven wellness companion with advanced predictive mood tracking.",
      year: "2024",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=800&fit=crop",
      challenge: "Designing an intuitive tracking system that learns from user patterns securely.",
      solution: "On-device AI processing using TensorFlow Lite within a fluid React Native interface.",
      tech: ["React Native", "TensorFlow", "Firebase"],
      metric: "+25% retention growth"
    },
    {
      id: 3,
      title: "Nexus Hub",
      category: "Enterprise SaaS",
      description: "Enterprise team collaboration standard for remote-first companies.",
      year: "2023",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop",
      challenge: "Providing seamless low-latency video and data sync for thousands.",
      solution: "Engineered robust WebRTC pipelines paired with GraphQL subscriptions.",
      tech: ["Vue.js", "GraphQL", "WebRTC", "AWS"],
      metric: "40% time saved per team"
    },
    {
      id: 4,
      title: "Astra",
      category: "Next-gen E-commerce",
      description: "Next-gen shopping experience featuring AR try-on and 3D modeling.",
      year: "2023",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
      challenge: "Rendering heavy 3D assets quickly in the browser.",
      solution: "Custom Three.js optimizations inside Next.js pages with dynamic loading.",
      tech: ["Next.js", "Three.js", "Stripe", "MongoDB"],
      metric: "+65% conversion rate"
    }
  ];

  const services = [
    { title: "Digital Strategy & Consulting", desc: "Data-driven roadmaps to ensure your product aligns perfectly with market demands." },
    { title: "UI/UX & Brand Design", desc: "Crafting beautiful, intuitive interfaces that users love and completely trust." },
    { title: "Full-Stack Web Engineering", desc: "Building scalable, high-performance web applications using modern, reliable stacks." },
    { title: "Mobile App Development", desc: "Native-quality iOS and Android applications perfectly tailored for your audience." }
  ];

  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3, triggerOnce: true });

  const openModal = (p) => {
    setSelectedContent(p);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      {/* Top Reading Progress Bar */}
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="ed-nav">
        <a href="#" className="ed-logo">KALKUT</a>
        <a href="#contact" className="ed-btn ed-btn-primary">Let's Talk</a>
      </nav>

      {/* Hero Section */}
      <section className="ed-hero editorial-container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: '1000px' }}
        >
          <h1 className="text-hero" style={{ marginBottom: '2rem' }}>
            We engineer <span style={{ color: 'var(--accent-color)' }}>digital</span> master&shy;pieces.
          </h1>
          <p className="text-subtitle" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' }}>
            KalKut is a premium software agency. We partner with ambitious brands to design and build world-class web and mobile applications.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="ed-stats" ref={statsRef}>
        <div className="editorial-container ed-stats-grid">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              className="ed-stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.8 }}
            >
              <div className="ed-stat-value">
                {statsInView ? <CountUp end={stat.value} duration={2} /> : "0"}
                {stat.prefix}
              </div>
              <div className="ed-stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="ed-services editorial-container">
        <h2 className="text-section-title">Our Capabilities</h2>
        <div>
          {services.map((svc, i) => (
            <motion.div 
              key={i} className="ed-service-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div>
                <h3 className="ed-service-title">{svc.title}</h3>
                <p className="text-subtitle" style={{ marginTop: '0.5rem' }}>{svc.desc}</p>
              </div>
              <ArrowRight style={{ width: '32px', height: '32px', color: 'var(--text-muted)' }} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Showcase */}
      <section id="work" className="ed-projects">
        <div className="editorial-container">
          <h2 className="text-section-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>Selected Work</h2>
          <p className="text-subtitle" style={{ textAlign: 'center', margin: '0 auto' }}>
            A glimpse into the digital products we've brought to life.
          </p>

          <div className="ed-projects-grid">
            {projects.map((p, i) => (
              <motion.div 
                key={p.id} 
                className="ed-project-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: (i % 2) * 0.2, duration: 0.8 }}
                onClick={() => openModal(p)}
              >
                <div className="ed-project-image-wrapper">
                  <img src={p.image} alt={p.title} className="ed-project-image" />
                </div>
                <div className="ed-project-meta">
                  <span className="ed-project-category">{p.category}</span>
                  <span style={{ fontWeight: 500, color: 'var(--text-muted)' }}>{p.year}</span>
                </div>
                <h3 className="ed-project-title">{p.title}</h3>
                <p className="ed-project-description">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Marquee */}
      <div className="ed-client-marquee">
        <div className="ed-marquee-track">
          {[...Array(2)].map((_, j) => (
             <div key={j} style={{ display: 'contents' }}>
                <div className="ed-marquee-item"><Hexagon /> WIPRO</div>
                <div className="ed-marquee-item"><Triangle /> MANKIND PHARMA</div>
                <div className="ed-marquee-item"><Circle /> ARCADE</div>
                <div className="ed-marquee-item"><Square /> FINFLOW NETWORKS</div>
                <div className="ed-marquee-item"><Globe /> ASTRA CORP</div>
                <div className="ed-marquee-item"><Shield /> NEXUS GROUP</div>
             </div>
          ))}
        </div>
      </div>

      {/* Dark Footer CTA */}
      <footer id="contact" className="ed-footer">
        <div className="editorial-container ed-footer-grid">
          <div>
            <h2 className="ed-footer-title">Let's build<br/>something<br/>great.</h2>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', maxWidth: '400px', marginBottom: '3rem' }}>
              We're currently taking on new projects. Drop us a line to discuss your vision.
            </p>
            <div>
              <a href="mailto:contactkalkut@gmail.com" className="ed-contact-link">contactkalkut@gmail.com</a>
            </div>
            <div>
              <a href="https://wa.me/917340591251" className="ed-contact-link" style={{ color: '#4ade80', borderColor: 'rgba(74,222,128,0.3)' }}>
                WhatsApp Chat
              </a>
            </div>
          </div>
          <div style={{ padding: '2rem', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '2rem' }}>Send an Inquiry</h3>
            <form onSubmit={(e) => { e.preventDefault(); alert("Sent (Simulation)"); }}>
              <input type="text" className="ed-form-input" placeholder="Your Name" required />
              <input type="email" className="ed-form-input" placeholder="Email Address" required />
              <textarea className="ed-form-input" placeholder="Tell us about your project..." rows={3} required />
              <button type="submit" className="ed-btn ed-btn-primary" style={{ backgroundColor: '#fff', color: '#000', width: '100%', padding: '1.25rem' }}>
                Submit Request
              </button>
            </form>
          </div>
        </div>

        <div className="editorial-container ed-footer-bottom">
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-color)' }}>KALKUT</div>
          <div>© 2024 KalKut. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && selectedContent && (
          <div className="ed-modal-overlay" onClick={closeModal}>
            <motion.div 
              className="ed-modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="ed-modal-close" onClick={closeModal}><X /></div>
              
              <div className="ed-modal-header" style={{ backgroundImage: `url(${selectedContent.image})` }} />
              
              <div className="ed-modal-body">
                <h2 className="ed-modal-title">{selectedContent.title}</h2>
                <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '800px' }}>
                  {selectedContent.description}
                </p>

                <div className="ed-modal-grid">
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>The Challenge</h3>
                    <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
                      {selectedContent.challenge}
                    </p>

                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>The Solution</h3>
                    <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      {selectedContent.solution}
                    </p>
                  </div>
                  <div>
                    <div className="ed-modal-label">Platform</div>
                    <div className="ed-modal-value">{selectedContent.category}</div>

                    <div className="ed-modal-label">Key Metric</div>
                    <div className="ed-modal-value" style={{ color: 'var(--accent-color)' }}>{selectedContent.metric}</div>

                    <div className="ed-modal-label">Year</div>
                    <div className="ed-modal-value">{selectedContent.year}</div>

                    <div className="ed-modal-label">Tech Stack</div>
                    <div style={{ marginTop: '0.5rem' }}>
                      {selectedContent.tech.map((t, i) => (
                        <span key={i} className="ed-modal-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <WhatsAppWidget />
    </div>
  );
};

export default KalKutEditorialPortfolio;

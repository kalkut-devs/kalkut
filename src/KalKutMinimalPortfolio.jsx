import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  ArrowUpRight, Mail, Github, Linkedin, ChevronDown, 
  Code, Zap, Users, Award, Phone, Globe, Shield, 
  MessageCircle, X, Check, Instagram, Twitter
} from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import WhatsAppWidget from './WhatsAppWidget';
import './Portfolio.css';

const KalKutMinimalPortfolio = () => {
  // --- States ---
  const [isLoading, setIsLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [formStatus, setFormStatus] = useState(null);
  
  // --- Refs ---
  const contactForm = useRef();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // --- Effects ---
  useEffect(() => {
    // Initial Load
    const timer = setTimeout(() => setIsLoading(false), 2000);
    
    // Mouse Tracking
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // --- Animation Variants ---
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  // --- Components / Sections ---

  // 1. Loading Screen
  const LoadingScreen = () => (
    <motion.div 
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      <div className="loading-text">
        <TypeAnimation
          sequence={['KALKUT', 500, 'KΛLKUT', 500, 'KALKUT', 500]}
          repeat={Infinity}
          cursor={false}
        />
      </div>
      <div className="loading-bar-container">
        <div className="loading-bar-fill"></div>
      </div>
    </motion.div>
  );

  // Custom Cursor
  const CustomCursor = () => (
    <>
      <motion.div 
        className="cursor-dot" 
        animate={{ x: mousePos.x - 4, y: mousePos.y - 4 }}
        transition={{ type: 'spring', damping: 25, stiffness: 400, mass: 0.5 }}
      />
      <motion.div 
        className="cursor-circle"
        animate={{ 
          x: mousePos.x - 20, 
          y: mousePos.y - 20,
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 0.5 : 1
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.8 }}
      />
    </>
  );

  return (
    <div className="portfolio-container" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <CustomCursor />
      
      {/* Scroll Progress Bar */}
      <motion.div className="scan-line" style={{ scaleX, opacity: 1, top: 0, height: '4px', background: 'var(--accent-blue)', position: 'fixed' }} />

      {/* 2. Hero Section */}
      <section className="hero-section">
        <div className="hero-grid"></div>
        <div className="section-container">
          <motion.div className="hero-content" initial="hidden" animate="visible" variants={stagger}>
            <motion.div className="hero-brand" variants={fadeInUp}>
              <span>KALKUT</span>
              <div className="hero-brand-underline"></div>
            </motion.div>
            
            <motion.h1 className="hero-headline display-title" variants={fadeInUp}>
              <TypeAnimation
                sequence={['We craft digital\nexperiences that matter.', 1000]}
                speed={50}
                style={{ whiteSpace: 'pre-line' }}
                repeat={0}
              />
            </motion.h1>
            
            <motion.p className="hero-subheadline" variants={fadeInUp}>
              Building products for tomorrow. Fast, beautiful, unforgettable.
            </motion.p>
            
            <motion.div className="cta-group" variants={fadeInUp} style={{ display: 'flex', gap: '24px' }}>
              <a href="#contact" className="btn btn-primary" onMouseEnter={() => setIsHovered(true)}>
                Start a project <ArrowUpRight size={20} />
              </a>
              <a href="#work" className="btn btn-ghost" onMouseEnter={() => setIsHovered(true)}>
                View work
              </a>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div className="scroll-indicator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
          <span className="mono-tag" style={{ fontSize: '10px' }}>Scroll</span>
          <ChevronDown className="scroll-arrow" size={20} />
        </motion.div>
      </section>

      {/* 3. Stats Section */}
      <section className="stats-section">
        <div className="section-container">
          <div className="stats-grid">
            {[
              { icon: Code, label: "Projects Delivered", value: 10, color: "var(--accent-blue)" },
              { icon: Users, label: "Happy Clients", value: 8, color: "var(--accent-green)" },
              { icon: Zap, label: "Years Experience", value: 2, color: "var(--accent-violet)" },
              { icon: Award, label: "Awards Won", value: 3, color: "var(--accent-gold)" }
            ].map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Selected Work */}
      <section id="work" className="selected-work-section">
        <div className="section-container">
          <motion.div className="section-title-wrap" initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
            <span className="mono-tag" style={{ color: 'var(--accent-blue)' }}>Selected work</span>
            <h2 className="display-title" style={{ fontSize: '72px', marginTop: '24px' }}>Our Masterpieces</h2>
          </motion.div>

          <div className="projects-list">
            {[
              { id: "01", name: "FinFlow", brief: "Real-time payment orchestration platform.", tags: ["React", "Node.js", "Redis"], metrics: "10M+ Txns" },
              { id: "02", name: "Pulse", brief: "AI-driven wellness companion.", tags: ["React Native", "TensorFlow"], metrics: "85% Accuracy" },
              { id: "03", name: "Nexus", brief: "Team collaboration for remote teams.", tags: ["Vue.js", "WebRTC", "AWS"], metrics: "2ms Latency" },
              { id: "04", name: "Astra", brief: "Next-gen shopping with AR try-on.", tags: ["Next.js", "Three.js"], metrics: "40% Conv. Lift" }
            ].map((proj, i) => (
              <ProjectRow key={i} {...proj} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Skills Section */}
      <section className="skills-section">
        <div className="section-container">
          <div className="section-title-wrap">
            <h2 className="display-title" style={{ fontSize: '48px' }}>Technologies We Master</h2>
          </div>
          <div className="skills-grid">
            {[
              { name: "React", level: 85 },
              { name: "Next.js", level: 75 },
              { name: "TypeScript", level: 88 },
              { name: "Node.js", level: 92 },
              { name: "Python", level: 85 },
              { name: "AWS", level: 60 },
              { name: "Docker", level: 87 },
              { name: "Vector DB", level: 83 }
            ].map((skill, i) => (
              <SkillBar key={i} {...skill} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Process Section */}
      <section className="process-section">
        <div className="section-container">
          <h2 className="display-title" style={{ fontSize: '48px', marginBottom: '60px' }}>Our Process</h2>
          <div className="timeline">
            {[
              { step: "01", title: "Discovery", desc: "Understanding your vision, market, and users deeply.", duration: "1-2 Weeks" },
              { step: "02", title: "Design", desc: "Crafting wireframes and high-fidelity cinematic UI/UX.", duration: "2-3 Weeks" },
              { step: "03", title: "Development", desc: "Engineering pixel-perfect code with scalable architecture.", duration: "4-8 Weeks" },
              { step: "04", title: "Testing", desc: "Rigorous QA and performance optimization.", duration: "1 Week" },
              { step: "05", title: "Launch", desc: "Deployment and continuous support for growth.", duration: "Ongoing" }
            ].map((item, i) => (
              <TimelineItem key={i} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="stats-section" style={{ background: '#050505' }}>
        <div className="section-container">
          <h2 className="display-title" style={{ fontSize: '48px', marginBottom: '80px', textAlign: 'center' }}>What Clients Say</h2>
          <div className="stats-grid">
            {[
              { name: "Rahul Sharma", role: "CTO, Wipro", quote: "KALKUT delivered beyond our expectations. Their technical depth is unmatched." },
              { name: "Priya Patel", role: "Founder, Arcade", quote: "The design was cinematic. Our users love the fluidity of the application." },
              { name: "Arjun Mehta", role: "VP Eng, Mankind", quote: "Scalability was our main concern, and KALKUT handled it effortlessly." }
            ].map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Insights Section (Blog) */}
      <section className="skills-section">
        <div className="section-container">
          <h2 className="display-title" style={{ fontSize: '48px', marginBottom: '60px' }}>Latest Insights</h2>
          <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {[
              { title: "The Future of Web3", date: "Oct 24", cat: "Tech" },
              { title: "Design for Human Emotion", date: "Sep 12", cat: "Design" },
              { title: "Scaling for 1M Users", date: "Aug 30", cat: "Engineering" }
            ].map((blog, i) => (
              <div key={i} className="stat-card" style={{ cursor: 'pointer' }}>
                <span className="mono-tag" style={{ color: 'var(--accent-blue)', fontSize: '10px' }}>{blog.cat}</span>
                <h3 className="display-title" style={{ fontSize: '24px', marginTop: '16px' }}>{blog.title}</h3>
                <p style={{ marginTop: '24px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-dim)' }}>{blog.date} — 5 MIN READ</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section className="process-section">
        <div className="section-container">
          <h2 className="display-title" style={{ fontSize: '48px', textAlign: 'center' }}>Frequently Asked</h2>
          <div className="faq-wrap">
            {[
              { q: "What services do you offer?", a: "We provide end-to-end full-stack web, mobile, and AI solutions." },
              { q: "What is your typical project timeline?", a: "Small projects take 4-6 weeks, while complex systems take 3-6 months." },
              { q: "Do you offer post-launch support?", a: "Yes, we provide ongoing maintenance and growth strategy." }
            ].map((faq, i) => (
              <div key={i} className={`faq-item ${activeFaq === i ? 'active' : ''}`}>
                <button className="faq-question" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                  {faq.q} <ChevronDown className="faq-chevron" size={16} />
                </button>
                <div className="faq-answer">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Capabilities / What we do */}
      <section className="skills-section" style={{ background: '#050505' }}>
        <div className="section-container">
          <div className="contact-grid">
            <div>
              <h2 className="display-title" style={{ fontSize: '48px' }}>What We Do</h2>
              <p style={{ color: 'var(--text-muted)', marginTop: '24px', fontSize: '18px' }}>
                We bridge the gap between creative vision and technical execution.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              {[
                { t: "Product Design", d: "Research, wireframing, and premium high-end visual design." },
                { t: "Engineering", d: "Scalable backends, high-performance frontends, and cloud migration." },
                { t: "Growth", d: "SEO, performance marketing, and data-driven product iteration." }
              ].map((cap, i) => (
                <div key={i} style={{ paddingBottom: '32px', borderBottom: '1px solid var(--border-glass)' }}>
                  <h3 className="display-title" style={{ fontSize: '28px' }}>{cap.t}</h3>
                  <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>{cap.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. Contact Section */}
      <section id="contact" className="process-section">
        <div className="section-container">
          <h2 className="display-title" style={{ fontSize: '72px' }}>Let's work together.</h2>
          <div className="contact-grid">
            <div className="contact-details">
              <div className="contact-detail-item">
                <span className="contact-label">Email us</span>
                <a href="mailto:contactkalkut@gmail.com" className="contact-value">contactkalkut@gmail.com</a>
              </div>
              <div className="contact-detail-item">
                <span className="contact-label">Call us</span>
                <a href="tel:+919509058933" className="contact-value">+91 9509058933</a>
              </div>
              <div className="contact-detail-item" style={{ marginTop: '24px', display: 'flex', gap: '20px' }}>
                <Github size={24} style={{ color: 'var(--text-dim)' }} />
                <Instagram size={24} style={{ color: 'var(--text-dim)' }} />
                <Twitter size={24} style={{ color: 'var(--text-dim)' }} />
              </div>
            </div>
            
            <form className="contact-form" ref={contactForm} onSubmit={(e) => {
              e.preventDefault();
              setFormStatus('sending');
              // EmailJS integration would go here
              setTimeout(() => setFormStatus('success'), 1500);
            }}>
              <div className="form-group">
                <input type="text" name="name" placeholder="Name" className="form-input" required />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="Email" className="form-input" required />
              </div>
              <div className="form-group">
                <textarea name="message" placeholder="Project Description" className="form-input form-textarea" required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }} disabled={formStatus === 'sending'}>
                {formStatus === 'sending' ? 'Sending...' : 'Launch Project'}
              </button>
              {formStatus === 'success' && <p style={{ color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>Message sent successfully!</p>}
            </form>
          </div>
        </div>
      </section>

      {/* 12. Footer */}
      <footer className="footer">
        <div className="section-container">
          <div className="footer-brand">KALKUT</div>
          <p className="footer-tagline">"Where art meets vibe."</p>
          <div className="footer-bottom">
            <span>© 2024 KALKUT. ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </footer>

      {/* 13. Floating WhatsApp */}
      <WhatsAppWidget />
    </div>
  );
};

// --- Sub-components ---

const StatCard = ({ icon: Icon, label, value, color }) => {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  return (
    <motion.div 
      ref={ref}
      className="stat-card"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="stat-icon" style={{ background: `${color}15` }}>
        <Icon color={color} size={28} />
      </div>
      <div className="stat-value">
        {inView && <CountUp end={value} duration={2} />}+
      </div>
      <div className="stat-label">{label}</div>
    </motion.div>
  );
};

const ProjectRow = ({ id, name, brief, tags, metrics }) => (
  <motion.div 
    className="project-row"
    initial="initial"
    whileHover="hover"
  >
    <div className="project-info">
      <span className="project-num">{id}</span>
      <h3 className="project-name">{name}</h3>
    </div>
    <div className="project-meta">
      <p className="project-brief">{brief}</p>
      <div className="project-tags">
        {tags.map((t, i) => <span key={i} className="tag">{t}</span>)}
        <span className="tag" style={{ borderColor: 'var(--accent-blue)', color: 'white' }}>{metrics}</span>
      </div>
    </div>
    <div className="project-accent-bar"></div>
  </motion.div>
);

const SkillBar = ({ name, level }) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <div className="skill-item" ref={ref}>
      <div className="skill-header">
        <span className="skill-name">{name}</span>
        <span className="skill-percentage">{level}%</span>
      </div>
      <div className="skill-bar-bg">
        <motion.div 
          className="skill-bar-fill" 
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
};

const TimelineItem = ({ step, title, desc, duration }) => (
  <motion.div 
    className="timeline-item"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <div className="timeline-dot"></div>
    <div className="timeline-step">{step}</div>
    <h3 className="timeline-title">{title}</h3>
    <p className="timeline-desc">{desc}</p>
    <div className="timeline-duration">{duration}</div>
  </motion.div>
);

const TestimonialCard = ({ name, role, quote }) => (
  <div className="stat-card" style={{ padding: '32px' }}>
    <p style={{ fontSize: '18px', fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: '32px' }}>"{quote}"</p>
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div style={{ width: '40px', height: '40px', background: 'var(--accent-blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
        {name[0]}
      </div>
      <div>
        <h4 style={{ fontSize: '14px', fontWeight: 600 }}>{name}</h4>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{role}</p>
      </div>
    </div>
  </div>
);

export default KalKutMinimalPortfolio;

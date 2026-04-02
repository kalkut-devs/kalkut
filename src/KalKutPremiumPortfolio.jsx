import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useVelocity } from 'framer-motion';
import {
  Globe, Code, Layers,
  Smartphone, Mail, X, ArrowUpRight,
  Database, Cloud, Cpu, Hexagon,
  Triangle, Circle, Square, Shield,
  Phone, Github, Linkedin, Users,
  Calendar, TrendingUp, Award, ChevronDown, Check, MessageCircle
} from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import WhatsAppWidget from './WhatsAppWidget';
import Magnetic from './Magnetic';
import './PremiumTheme.css';

/* ─── SVG Liquid Filter ─── */
const LiquidFilter = () => (
  <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
    <defs>
      <filter id="liquid-filter">
        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" seed="2" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
      </filter>
    </defs>
  </svg>
);

/* ─── Custom Trailing Cursor ─── */
const CustomCursor = ({ label }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const trailConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  
  const mainX = useSpring(mouseX, springConfig);
  const mainY = useSpring(mouseY, springConfig);
  const trailX = useSpring(mouseX, trailConfig);
  const trailY = useSpring(mouseY, trailConfig);
  
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const t = e.target;
      setHovering(!!(t.closest('a') || t.closest('button') || t.closest('.project-card')));
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div 
        className="custom-cursor" 
        style={{ x: mainX, y: mainY, translateX: '-50%', translateY: '-50%' }} 
      />
      <motion.div 
        className={`custom-cursor-follower ${hovering ? 'hovering' : ''}`} 
        style={{ x: trailX, y: trailY, translateX: '-50%', translateY: '-50%' }}
        animate={{ 
          width: label ? 100 : hovering ? 60 : 40, 
          height: label ? 100 : hovering ? 60 : 40 
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      >
        {label && <div className="cursor-label" style={{ position: 'relative', width: '100%', height: '100%' }}>{label}</div>}
      </motion.div>
    </>
  );
};

/* ─── 3D Tilt Card ─── */
const TiltCard = ({ children, className, style }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
};

/* ─── Text Scramble Effect ─── */
const TextScramble = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let iteration = 0;
      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          setDisplayText(text.split("").map((char, index) => {
            if (index < iteration) return text[index];
            if (text[index] === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          }).join(""));
          
          if (iteration >= text.length) clearInterval(interval);
          iteration += 1 / 2.5;
        }, 30);
        return () => clearInterval(interval);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [inView, text, delay]);

  return (
    <span ref={ref} className="scramble-text">
      {displayText}
    </span>
  );
};

/* ─── Reveal Text ─── */
const RevealText = ({ children, delay = 0 }) => (
  <div style={{ overflow: 'hidden' }}>
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] }}
    >
      {children}
    </motion.div>
  </div>
);

/* ─── Perspective Grid ─── */
const PerspectiveGrid = () => (
  <div className="perspective-wrapper">
    <div className="tech-grid" />
  </div>
);

/* ─── Scroll Nerve ─── */
const ScrollNerve = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <div className="scroll-nerve-container">
      <div className="scroll-nerve-line" />
      <motion.div className="scroll-nerve-pulse" style={{ top: y }} />
    </div>
  );
};

/* ─── FAQ Item ─── */
const FAQItem = ({ q, a, open, onClick }) => (
  <div
    className="bento-card"
    style={{ padding: '1.75rem 2rem', marginBottom: '1rem', cursor: 'pointer' }}
    onClick={onClick}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{q}</h3>
      <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
        <ChevronDown size={20} style={{ color: 'var(--gold-accent)', flexShrink: 0 }} />
      </motion.div>
    </div>
    <AnimatePresence>
      {open && (
        <motion.p
          initial={{ height: 0, opacity: 0, marginTop: 0 }}
          animate={{ height: 'auto', opacity: 1, marginTop: '1rem' }}
          exit={{ height: 0, opacity: 0, marginTop: 0 }}
          style={{ color: 'var(--text-muted)', fontSize: '1rem', overflow: 'hidden' }}
        >
          {a}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

/* ─── Magnetic Sidebar ─── */
const MagneticSidebar = () => (
  <div className="magnetic-sidebar">
    <Magnetic><a href="https://github.com/kalkut-devs" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)' }}><Github size={20} /></a></Magnetic>
    <Magnetic><a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)' }}><Linkedin size={20} /></a></Magnetic>
    <div style={{ width: '1px', height: '60px', background: 'var(--border-light)', margin: '0 auto' }}></div>
  </div>
);

/* ─── Magnetic Logo ─── */
const MagneticLogo = ({ text }) => (
  <div style={{ display: 'flex', gap: '2px' }}>
    {text.split("").map((char, i) => (
      <Magnetic key={i}>
        <span style={{ display: 'inline-block', cursor: 'pointer' }}>{char}</span>
      </Magnetic>
    ))}
  </div>
);

/* ─── Floating Glass Orbs ─── */
const FloatingOrbs = () => (
  <div className="orbs-container" style={{ opacity: 0.8 }}>
    <motion.div className="orb orb-1" animate={{ x: [0, 50, 0], y: [0, 30, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} />
    <motion.div className="orb orb-2" animate={{ x: [0, -40, 0], y: [0, 60, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
    <motion.div className="orb orb-3" animate={{ x: [0, 30, 0], y: [0, -45, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} />
  </div>
);

/* ─── Section Wipe Transition ─── */
const SectionWipe = ({ trigger }) => {
  const { ref, inView } = useInView({ threshold: 0.25, triggerOnce: true });
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <AnimatePresence>
        {inView && (
          <motion.div 
            initial={{ x: "-100%" }} 
            animate={{ x: "200%" }} 
            exit={{ x: "200%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} 
            className="section-wipe"
            style={{ transform: 'translateZ(0)' }}
          />
        )}
      </AnimatePresence>
      {trigger}
    </div>
  );
};

/* ─── Service Schematic Previews (Technical Overlay) ─── */
const ServiceSchematic = ({ type }) => {
  const variants = {
    web: (
      <svg viewBox="0 0 200 200" className="tech-schematic-svg">
        <path d="M0,100 L200,100 M100,0 L100,200" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
        <rect x="50" y="50" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="0.2" />
        <path d="M100,50 L100,150 M50,100 L150,100" stroke="var(--gold-accent)" strokeWidth="1" />
      </svg>
    ),
    mobile: (
      <svg viewBox="0 0 200 200" className="tech-schematic-svg">
        <rect x="70" y="30" width="60" height="140" rx="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M70,50 L130,50 M70,150 L130,150" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="100" cy="40" r="2" fill="currentColor" />
        <circle cx="100" cy="160" r="5" fill="none" stroke="var(--gold-accent)" strokeWidth="1" />
      </svg>
    ),
    ai: (
      <svg viewBox="0 0 200 200" className="tech-schematic-svg">
        <path d="M40,40 L160,160 M160,40 L40,160" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        <rect x="80" y="80" width="40" height="40" fill="none" stroke="var(--gold-accent)" strokeWidth="1" />
        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.2" />
        <path d="M100,20 L100,180 M20,100 L180,100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
      </svg>
    )
  };
  return <div className="schematic-overlay">{variants[type] || variants.web}</div>;
};

/* ─── Project Flick-Stack ─── */
const ProjectStack = ({ projects, onOpen }) => {
  const [index, setIndex] = useState(0);
  const dragX = useMotionValue(0);
  const rotate = useTransform(dragX, [-200, 200], [-25, 25]);
  const opacity = useTransform(dragX, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  const onDragEnd = (event, info) => {
    if (Math.abs(info.offset.x) > 80) {
      setIndex((prev) => (prev + 1) % projects.length);
    }
  };

  return (
    <div className="stack-container" style={{ position: 'relative', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={index}
          className="stack-card"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={onDragEnd}
          initial={{ x: 300, opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: -300, opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          style={{ x: dragX, rotate, opacity, position: 'absolute', cursor: 'grab' }}
          whileTap={{ cursor: 'grabbing' }}
        >
          <TiltCard 
            className="bento-card" 
            style={{ width: 'min(90vw, 600px)', padding: 0, height: '400px', border: '1px solid var(--border-gold)' }}
            onClick={() => onOpen(projects[index])}
          >
            <div className="project-card" style={{ height: '100%' }}>
              <img src={projects[index].image} alt={projects[index].title} className="project-img" style={{ filter: 'grayscale(0.5) contrast(1.2)' }} />
              <div className="project-overlay" style={{ opacity: 1, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                <span style={{ color: 'var(--gold-accent)', fontSize: '0.8rem', textTransform: 'uppercase' }}>{projects[index].category}</span>
                <h3 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{projects[index].title}</h3>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </AnimatePresence>
      
      <div className="stack-hint">Flick to Explore · {index + 1}/{projects.length}</div>
    </div>
  );
};

/* ─── Interactive Gold Vortex (Magnetic Pull) ─── */
const MagneticVortex = ({ children, mouseX, mouseY }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 20, stiffness: 150 });
  const springY = useSpring(y, { damping: 20, stiffness: 150 });

  useEffect(() => {
    const handleUpdate = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.hypot(mouseX.get() - centerX, mouseY.get() - centerY);
      
      if (dist < 400) {
        const pull = (1 - dist / 400) * 40;
        x.set((mouseX.get() - centerX) * (pull / 100));
        y.set((mouseY.get() - centerY) * (pull / 100));
      } else {
        x.set(0);
        y.set(0);
      }
    };
    const unsubX = mouseX.onChange(handleUpdate);
    const unsubY = mouseY.onChange(handleUpdate);
    return () => { unsubX(); unsubY(); };
  }, [mouseX, mouseY, x, y]);

  return (
    <motion.div ref={ref} style={{ x: springX, y: springY, display: 'inline-block' }}>
      {children}
    </motion.div>
  );
};

/* ─── Floating Tech Aura ─── */
const FloatingTechAura = () => {
  const icons = [
    { Icon: Globe, top: '10%', left: '5%', delay: 0 },
    { Icon: Code, top: '60%', left: '15%', delay: 2 },
    { Icon: Layers, top: '20%', left: '80%', delay: 4 },
    { Icon: Smartphone, top: '70%', left: '85%', delay: 1 },
    { Icon: Shield, top: '40%', left: '45%', delay: 3 },
  ];
  return (
    <div className="tech-aura-container">
      {icons.map((item, i) => (
        <motion.div
          key={i}
          className="tech-aura-icon"
          style={{ top: item.top, left: item.left }}
          animate={{ 
            y: [0, -40, 0], 
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: item.delay
          }}
        >
          <item.Icon size={40} />
        </motion.div>
      ))}
    </div>
  );
};

/* ─── Project Builder: Scope Card ─── */
const ScopeCard = ({ title, icon, selected, onToggle }) => (
  <motion.div 
    className={`scope-card ${selected ? 'active' : ''}`}
    onClick={onToggle}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="scope-icon">{icon}</div>
    <div className="scope-title">{title}</div>
    {selected && <motion.div layoutId="selection-glow" className="selection-glow" />}
  </motion.div>
);

/* ─── Main Component ─── */
const KalKutPremiumPortfolio = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formStatus, setFormStatus] = useState('idle');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [openFAQ, setOpenFAQ] = useState(null);
  const [cursorLabel, setCursorLabel] = useState(null);
  const formRef = useRef();

  // Audio Haptics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [selectedScope, setSelectedScope] = useState([]);
  const clickSound = useRef(new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"));
  const hoverSound = useRef(new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"));
  
  const playClick = () => { 
    clickSound.current.volume = 0.1; 
    clickSound.current.currentTime = 0; 
    clickSound.current.play().catch(() => {}); 
  };
  const playHover = () => { 
    hoverSound.current.volume = 0.05; 
    hoverSound.current.currentTime = 0; 
    hoverSound.current.play().catch(() => {}); 
  };

  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { scrollYProgress, scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 100, stiffness: 500 });
  const grainOpacity = useTransform(smoothVelocity, [-3000, 0, 3000], [0.07, 0.04, 0.07]);
  
  const processRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Lenis Smooth Scroll Initialization
    let lenis;
    if (window.Lenis) {
      lenis = new window.Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
      });
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const onScroll = () => setScrolled(window.scrollY > 50);
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', onScroll);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', onScroll);
      if (lenis) lenis.destroy();
    };
  }, []);

  const toggleScope = (scope) => {
    if (selectedScope.includes(scope)) {
      setSelectedScope(selectedScope.filter(s => s !== scope));
    } else if (selectedScope.length < 3) {
      setSelectedScope([...selectedScope, scope]);
    }
  };

  const getTimeline = () => {
    if (selectedScope.length === 0) return "Ready when you are.";
    if (selectedScope.length === 1) return "~4 Weeks Construction";
    if (selectedScope.length === 2) return "~6-8 Weeks Engineering";
    return "Custom Enterprise Roadmap (~3 Months)";
  };


  const { scrollYProgress: processProgress } = useScroll({
    target: processRef,
    offset: ["start end", "end start"]
  });

  const parallaxText = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const roadmapScale = useTransform(processProgress, [0.1, 0.9], [0, 1]);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    for (const card of document.querySelectorAll('.bento-card')) {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
    }
  };

  const smoothScroll = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 90, behavior: 'smooth' });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    const SERVICE_ID = 'YOUR_SERVICE_ID';
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
    if (SERVICE_ID === 'YOUR_SERVICE_ID') {
      setTimeout(() => { setFormStatus('sent'); e.target.reset(); setTimeout(() => setFormStatus('idle'), 5000); }, 1500);
      return;
    }
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => { setFormStatus('sent'); e.target.reset(); setTimeout(() => setFormStatus('idle'), 5000); })
      .catch(() => { setFormStatus('error'); setTimeout(() => setFormStatus('idle'), 5000); });
  };

  /* ─── DATA ─── */
  const projects = [
    {
      id: 1,
      title: 'FinFlow',
      category: 'FinTech',
      tagline: 'Real-time payment orchestration platform',
      description: 'A monumental real-time payment architecture orchestrating millions of secure transactions. Engineered for 99.999% uptime in critical financial markets.',
      year: '2024', client: 'FinTech Startup', duration: '4 months', team: '5 developers', role: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      challenge: 'The client needed a robust payment processing system that could handle high transaction volumes with minimal latency. The existing system was slow and couldn\'t scale to meet growing demand.',
      solution: 'We built a microservices architecture using Node.js and Redis for caching. Implemented real-time transaction processing with WebSockets and optimized database queries. Used AWS Lambda for serverless functions to handle peak loads.',
      tech: ['React', 'Node.js', 'Redis', 'PostgreSQL', 'AWS', 'Docker'],
      metrics: { users: '10k+', uptime: '99.99%', speed: '< 100ms', reduction: '40%' },
      results: [
        { metric: 'Transaction Speed', value: '< 100ms', improvement: '85% faster' },
        { metric: 'Active Users', value: '10,000+', improvement: '300% growth' },
        { metric: 'System Uptime', value: '99.99%', improvement: 'From 95%' },
        { metric: 'Cost Reduction', value: '40%', improvement: 'Infrastructure' }
      ],
      features: ['Real-time payment processing', 'Multi-currency support', 'Fraud detection system', 'Admin dashboard with analytics', 'API integration with major banks', 'Automated reconciliation'],
      testimonial: { text: 'KalKut transformed our payment infrastructure. The new system is lightning fast and has scaled beautifully with our growth.', author: 'Rahul Sharma', role: 'CTO, FinFlow' }
    },
    {
      id: 2,
      title: 'Pulse AI',
      category: 'Health & AI',
      tagline: 'AI-driven wellness companion with mood tracking',
      description: 'AI-driven wellness companion with advanced predictive mood tracking and on-device NLP processing for mental health insights.',
      year: '2024', client: 'Healthcare Startup', duration: '5 months', team: '6 developers', role: 'Full Stack Developer',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=800&fit=crop',
      challenge: 'Mental health tracking apps lacked personalization and accurate mood prediction. Users needed an intelligent system that could provide actionable insights based on their daily patterns.',
      solution: 'Developed a mobile app using React Native with TensorFlow Lite for on-device AI predictions. Implemented mood tracking with NLP to analyze journal entries and created personalized wellness recommendations.',
      tech: ['React Native', 'TensorFlow', 'Firebase', 'Python', 'FastAPI'],
      metrics: { rating: '4.9/5', sessions: '30k+', growth: '+25%', retention: '78%' },
      results: [
        { metric: 'User Rating', value: '4.9/5', improvement: 'Top rated' },
        { metric: 'Daily Sessions', value: '30,000+', improvement: 'High engagement' },
        { metric: 'User Growth', value: '+25%', improvement: 'Monthly' },
        { metric: 'Retention Rate', value: '78%', improvement: 'Industry leading' }
      ],
      features: ['AI-powered mood prediction', 'Daily wellness check-ins', 'Personalized recommendations', 'Meditation & breathing exercises', 'Progress tracking & insights', 'Community support groups'],
      testimonial: { text: 'Pulse has helped thousands of users improve their mental wellness. The AI features are incredibly accurate and helpful.', author: 'Dr. Priya Patel', role: 'Founder, Pulse Health' }
    },
    {
      id: 3,
      title: 'Nexus Hub',
      category: 'Enterprise SaaS',
      tagline: 'Team collaboration for remote-first companies',
      description: 'The enterprise team collaboration standard for remote-first companies, featuring real-time collaborative canvas and HD video pipelines.',
      year: '2023', client: 'Enterprise SaaS', duration: '6 months', team: '8 developers', role: 'Tech Lead',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop',
      challenge: 'Remote teams struggled with fragmented communication tools. They needed an all-in-one platform for video calls, messaging, and project management that actually worked seamlessly.',
      solution: 'Built a comprehensive collaboration platform with real-time messaging using WebSockets, HD video conferencing with WebRTC, and integrated project management with GraphQL for efficient data fetching.',
      tech: ['Vue.js', 'GraphQL', 'WebRTC', 'AWS', 'MongoDB', 'Redis'],
      metrics: { teams: '500+', messages: '10,000+/day', savings: '40% time', nps: '92%' },
      results: [
        { metric: 'Active Teams', value: '500+', improvement: 'Enterprise clients' },
        { metric: 'Messages/Day', value: '10,000+', improvement: 'High activity' },
        { metric: 'Time Saved', value: '40%', improvement: 'Per team' },
        { metric: 'User Satisfaction', value: '92%', improvement: 'NPS Score' }
      ],
      features: ['HD video conferencing', 'Real-time messaging', 'Screen sharing & recording', 'Project management boards', 'File sharing & collaboration', 'Integration with 50+ tools'],
      testimonial: { text: 'Nexus has become the backbone of our remote operations. It\'s the only tool our team needs for collaboration.', author: 'Arjun Mehta', role: 'VP Engineering, TechCorp' }
    },
    {
      id: 4,
      title: 'Astra',
      category: 'E-Commerce',
      tagline: 'Next-gen shopping with AR try-on & 3D modeling',
      description: 'Next-gen immersive shopping experience featuring 3D AR modeling, virtual try-on, and seamless one-click checkout.',
      year: '2023', client: 'Fashion Retail', duration: '5 months', team: '7 developers', role: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
      challenge: 'Online fashion shopping had high return rates due to sizing issues. Customers couldn\'t visualize how products would look on them, leading to poor conversion rates.',
      solution: 'Developed an AR-powered e-commerce platform using Three.js for 3D product visualization. Implemented virtual try-on with computer vision. Integrated Stripe for seamless payments and built a recommendation engine using collaborative filtering.',
      tech: ['Next.js', 'Three.js', 'Stripe', 'MongoDB', 'AWS S3'],
      metrics: { conversion: '+65%', revenue: '₹50L+/mo', returns: '-45%', customers: '30k+' },
      results: [
        { metric: 'Conversion Rate', value: '+65%', improvement: 'Massive increase' },
        { metric: 'Monthly Revenue', value: '₹50L+', improvement: 'Growing fast' },
        { metric: 'Return Rate', value: '-45%', improvement: 'Significant drop' },
        { metric: 'Active Customers', value: '30,000+', improvement: 'Loyal base' }
      ],
      features: ['AR virtual try-on', '3D product visualization', 'Size recommendation AI', 'One-click checkout', 'Wishlist & favorites', 'Social sharing features'],
      testimonial: { text: 'Astra revolutionized our online sales. The AR feature is a game-changer that customers absolutely love.', author: 'Sneha Kapoor', role: 'CEO, Astra Fashion' }
    }
  ];

  const services = [
    { icon: <Globe size={32} />, title: 'Fullstack Web Engine', desc: 'Performance-obsessed distributed systems architecture using Next.js, Go, and AWS for global scale.', type: 'web' },
    { icon: <Smartphone size={32} />, title: 'Intuitive App Designing', desc: 'Crafting elite mobile experiences with Swift, Kotlin, and React Native that feel like native extensions of the user.', type: 'mobile' },
    { icon: <Cpu size={32} />, title: 'AI & Data Intelligence', desc: 'Integrating LLMs, neural networks, and automated workflows into existing pipelines to multiply productivity.', type: 'ai' },
    { icon: <Layers size={24} />, title: 'Product Strategy & UI/UX', desc: 'Data-driven architectures and flawless interface design for tomorrow\'s platforms.', type: 'web' },
    { icon: <Cloud size={24} />, title: 'Cloud & DevOps', desc: 'Zero-downtime CI/CD pipelines deployed on AWS, GCP, or Azure infrastructure.', type: 'ai' },
    { icon: <Database size={24} />, title: 'Backend & API Systems', desc: 'Scalable, secure microservices logic with Node.js, Python, and robust databases.', type: 'mobile' }
  ];

  const faqs = [
    { 
      q: 'How long does a typical project take?', 
      a: 'Precision takes time, but efficiency is our hallmark. A standard high-fidelity MVP typically spans 4–8 weeks. This includes a rigorous 1-week Discovery & Architecture phase, followed by 4-6 weeks of Agile Sprints, and a final week dedicated to Zero-Downtime Deployment and Security Audits. We provide a granular Gantt chart during onboarding so you can track every millisecond of progress.' 
    },
    { 
      q: 'What tech stacks do you specialize in?', 
      a: 'We are engineering purists. For high-scale web platforms, we dominate the Next.js, TypeScript, and Go ecosystem. For luxury mobile experiences, we utilize React Native and Swift to ensure native performance. Our infrastructure is exclusively built on AWS, GCP, and Azure using Terraform for infrastructure-as-code, ensuring your platform scales infinitely from day one.' 
    },
    { 
      q: 'Do you provide post-launch support?', 
      a: 'Launch is just the beginning of the lifecycle. Every KalKut masterpiece includes a 45-day "Hyper-Stability" support window where we monitor real-user metrics and optimize performance. Beyond that, we offer "Evolution Retainers" for continuous feature engineering, security updates, and server-side optimizations to keep your brand at the bleeding edge of technology.' 
    },
    { 
      q: 'How does pricing work?', 
      a: 'We operate on a "Value-First" model. Depending on your project\'s complexity, we offer Fixed-Scope Engineering for clearly defined products or Monthly Sprint Retainers for evolving R&D ventures. Our investments start at a premium level to ensure we can dedicate a specialized team of senior architects to your vision without compromise.' 
    }
  ];

  const openModal = (p) => { 
    setSelectedProject(p); 
    setIsModalOpen(true); 
    document.body.style.overflow = 'hidden'; 
  };
  const closeModal = () => { 
    setIsModalOpen(false); 
    document.body.style.overflow = 'auto'; 
  };

  const btnLabel = formStatus === 'sending' ? 'Sending Protocol...' : formStatus === 'sent' ? 'Message Received ✓' : formStatus === 'error' ? 'Transmission Failed ✕' : 'Initialize Connect';

  return (
    <div className="premium-wrapper" onMouseMove={handleMouseMove} onClick={playClick}>
      <motion.div className="grain-overlay" style={{ opacity: grainOpacity }} />
      <LiquidFilter />
      <FloatingOrbs />
      <CustomCursor label={cursorLabel} />
      <PerspectiveGrid />
      <ScrollNerve />
      
      {/* Background Parallax Text */}
      <motion.div 
        style={{ 
          position: 'fixed', 
          top: '20%', 
          left: '-5%', 
          fontSize: '25vw', 
          fontWeight: 900, 
          color: 'rgba(255,255,255,0.02)', 
          zIndex: -1,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          x: parallaxText
        }}
      >
        MASTERPIECE
      </motion.div>

      <div className="glow-orb glow-top-right" />
      <div className="glow-orb glow-bottom-left" />

      {/* ── Header ── */}
      <header className={`premium-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="premium-container header-content">
          <div className="logo-kalkut">
            <MagneticLogo text="KALKUT" />
          </div>
          <nav className="nav-links">
            {[['about', 'About'], ['work', 'Work'], ['process', 'Process'], ['faq', 'FAQ'], ['contact', 'Contact']].map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={(e) => smoothScroll(e, id)} className="nav-link">{label}</a>
            ))}
          </nav>
        </div>
      </header>

      <main className="premium-container" style={{ paddingBottom: '4rem' }}>

        {/* ── Hero ── */}
        <div className="hero-section">
          <div className="bento-grid" style={{ width: '100%' }}>

            <motion.div className="bento-card col-span-8 hero-title-card"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <RevealText delay={0.1}>
                <div style={{ fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-accent)', marginBottom: '1.5rem' }}>
                  Premium Software Agency · Est. 2022
                </div>
              </RevealText>
              <RevealText delay={0.2}>
                <h1 className="text-hero" style={{ marginBottom: '1.5rem' }}>
                  <TextScramble text="Digital brilliance" delay={0.5} /><br />
                  <span className="text-gradient"><TextScramble text="engineered for scale." delay={1.2} /></span>
                </h1>
              </RevealText>
              <RevealText delay={0.4}>
                <p className="text-subtitle" style={{ maxWidth: '80%' }}>
                  We design and build ultra-premium web and mobile applications that disrupt markets and captivate users.
                  <em style={{ color: 'var(--gold-accent)', fontStyle: 'normal' }}> Where art meets vibe.</em>
                </p>
              </RevealText>
              <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Magnetic>
                  <a href="#contact" onClick={(e) => smoothScroll(e, 'contact')} className="premium-btn premium-btn-gold" onMouseEnter={playHover}>
                    Start a Project <ArrowUpRight size={18} />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href="#work" onClick={(e) => smoothScroll(e, 'work')} className="premium-btn" onMouseEnter={playHover}>
                    View Our Work
                  </a>
                </Magnetic>
              </div>
            </motion.div>

            <TiltCard className="col-span-4" style={{ height: '100%' }}>
              <div className="bento-card"
                style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', backgroundColor: '#0a0a0a', textAlign: 'center' }}>
                <Globe size={48} style={{ margin: '0 auto 2rem auto', color: 'var(--gold-accent)', animation: 'float 6s ease-in-out infinite' }} />
                <RevealText delay={0.4}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 600, fontStyle: 'italic', color: 'var(--gold-accent)' }}>
                    "Precision.<br />Performance.<br />Perfection."
                  </div>
                </RevealText>
                <div style={{ marginTop: '2rem', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  KALKUT Agency
                </div>
              </div>
            </TiltCard>

            {/* Stats */}
            <div ref={statsRef} className="col-span-12 bento-grid" style={{ margin: 0, padding: 0 }}>
              {[
                { val: 10, label: 'Projects Developed', suffix: '+' },
                { val: 7, label: 'Happy Clients', suffix: '+' },
                { val: 2, label: 'Years Experience', suffix: '+' },
                { val: 3, label: 'Awards Won', suffix: '' },
              ].map((s, i) => (
                <motion.div key={i} className="bento-card col-span-3 stats-card"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
                  <div className="text-gradient stat-value">
                    {statsInView ? <CountUp end={s.val} duration={2.5} /> : '0'}{s.suffix}
                  </div>
                  <div className="stat-label">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Tagline card */}
            <motion.div className="bento-card col-span-12"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
              <p className="text-subtitle" style={{ maxWidth: '700px', margin: 0 }}>
                Our digital footprints span across fintech, healthtech, enterprise SaaS, and retail — modernizing legacy systems and architecting products designed to handle millions of users.
              </p>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <Magnetic><a href="https://github.com" target="_blank" rel="noreferrer" className="premium-btn"><Github size={18} /></a></Magnetic>
                <Magnetic><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="premium-btn"><Linkedin size={18} /></a></Magnetic>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Flick-Stack Showcase ── */}
        <SectionWipe trigger={
          <div id="work" style={{ marginTop: '8rem', marginBottom: '8rem' }}>
            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
               <RevealText>
                 <div style={{ fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-accent)', marginBottom: '0.75rem' }}>Engineered Cases</div>
               </RevealText>
               <RevealText delay={0.1}>
                 <h2 className="text-title">The <span className="text-gradient"><TextScramble text="Portfolio Deck" /></span></h2>
               </RevealText>
            </div>
            
            <ProjectStack projects={projects} onOpen={openModal} />
          </div>
        } />

        {/* ── Services ── */}
        <SectionWipe trigger={
          <div className="bento-grid" id="about" style={{ marginTop: '2rem', position: 'relative' }}>
            <FloatingTechAura />
            <div className="col-span-12" style={{ marginBottom: '0.5rem', position: 'relative', zIndex: 1 }}>
              <RevealText>
                <div style={{ fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-accent)', marginBottom: '0.75rem' }}>What We Do</div>
              </RevealText>
              <RevealText delay={0.1}>
                <h2 className="text-title">Digital <span className="text-gradient"><TextScramble text="Capabilities" /></span></h2>
              </RevealText>
            </div>
            {services.map((svc, i) => (
              <TiltCard 
                key={i} 
                className="col-span-4"
                onMouseEnter={() => setCursorLabel("EXPLORE")}
                onMouseLeave={() => setCursorLabel(null)}
              >
                <div className="bento-card capability-card" style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                  <ServiceSchematic type={svc.type} />
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ color: 'var(--gold-accent)', marginBottom: '1.5rem' }}>{svc.icon}</div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>{svc.title}</h3>
                    <p className="text-subtitle" style={{ fontSize: '0.95rem' }}>{svc.desc}</p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        } />

        {/* ── Process ── */}
        <div className="bento-grid" id="process" ref={processRef} style={{ marginTop: '6rem', position: 'relative' }}>
          {/* Animated Scroll Line */}
          {!isMobile && (
            <div style={{ position: 'absolute', left: '50%', top: '15%', bottom: '0', width: '2px', background: 'rgba(212,175,55,0.05)', zIndex: 0, transform: 'translateX(-50%)' }}>
              <motion.div 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  background: 'var(--gold-gradient)', 
                  scaleY: roadmapScale, 
                  originY: 0 
                }} 
              />
            </div>
          )}

          <div className="col-span-12" style={{ marginBottom: '0.5rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <RevealText>
              <div style={{ fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-accent)', marginBottom: '0.75rem' }}>How We Work</div>
            </RevealText>
            <RevealText delay={0.1}>
              <h2 className="text-title">The <span className="text-gradient"><TextScramble text="Workflow" /></span></h2>
            </RevealText>
          </div>
          {[
            { n: '01', title: 'Discovery & Architecture', desc: 'We reverse-engineer your business requirements into a robust technical specification, choosing the optimal tech stack for longevity and scale.' },
            { n: '02', title: 'Luxury UI/UX Design', desc: 'High-fidelity wireframes and interactive prototypes are crafted to ensure a flawless, premium user journey before a single line of code is written.' },
            { n: '03', title: 'Agile Engineering', desc: 'Sprints commence. We write clean, test-driven code utilizing CI/CD pipelines so you can monitor progress in real-time staging environments.' },
            { n: '04', title: 'Deployment & Scale', desc: 'Rigorous QA, security audits, and load testing precede the launch. Post-launch we ensure servers scale infinitely with your traffic demands.' },
          ].map((step, i) => (
            <motion.div key={i} className="bento-card col-span-6"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <div className="process-step" style={{ flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div className="process-number">{step.n}</div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--gold-accent)' }}>{step.title}</h3>
                </div>
                <p className="text-subtitle" style={{ fontSize: '0.95rem' }}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── FAQ ── */}
        <div className="bento-grid" id="faq" style={{ marginTop: '6rem' }}>
          <div className="col-span-12" style={{ marginBottom: '0.5rem' }}>
            <div style={{ fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-accent)', marginBottom: '0.75rem' }}>Common Questions</div>
            <h2 className="text-title">Quick <span className="text-gradient">Answers</span></h2>
          </div>
          <div className="col-span-12">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} open={openFAQ === i} onClick={() => setOpenFAQ(openFAQ === i ? null : i)} />
            ))}
          </div>
        </div>

      </main>

      {/* ── Client Marquee ── */}
      <div className="client-marquee">
        <div className="marquee-content">
          {[...Array(3)].map((_, j) => (
            <span key={j} style={{ display: 'contents' }}>
              <span className="marquee-item"><Hexagon size={24} /> WIPRO</span>
              <span className="marquee-item"><Triangle size={24} /> MANKIND PHARMA</span>
              <span className="marquee-item"><Circle size={24} /> ARCADE</span>
              <span className="marquee-item"><Square size={24} /> FINFLOW NETWORKS</span>
              <span className="marquee-item"><Globe size={24} /> ASTRA CORP</span>
              <span className="marquee-item"><Shield size={24} /> NEXUS GROUP</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Footer / Contact ── */}
      <footer className="premium-footer" id="contact">
        <div className="premium-container footer-grid">

          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <div style={{ fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-accent)', marginBottom: '1rem' }}>Let's Collaborate</div>
            <div style={{ position: 'relative' }}>
              <div className="vortex-glow" />
              <MagneticVortex mouseX={mouseX} mouseY={mouseY}>
                <h2 className="vortex-text" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1 }}>
                  Ready to build<br /><span className="text-gradient">the future?</span>
                </h2>
              </MagneticVortex>
            </div>
            <p className="text-subtitle" style={{ maxWidth: '380px', marginBottom: '3rem' }}>
              We're currently taking on new projects for 2nd phase 2026. Drop us an inquiry and let's craft something immaculate together.
            </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem', position: 'relative', zIndex: 100 }}>
                <a 
                  href="mailto:contactkalkut@gmail.com" 
                  className="premium-btn text-link" 
                  style={{ justifyContent: 'flex-start', border: 'none', padding: '0', pointerEvents: 'auto', zIndex: 1000, position: 'relative' }}
                  onMouseEnter={() => setCursorLabel("EMAIL")}
                  onMouseLeave={() => setCursorLabel(null)}
                  onClick={(e) => {
                    // Fail-safe trigger for mailto
                    window.location.href = 'mailto:contactkalkut@gmail.com';
                  }}
                >
                  <Mail size={18} style={{ color: 'var(--gold-accent)' }} /> contactkalkut@gmail.com
                </a>
                <a 
                  href="tel:+919509058933" 
                  className="premium-btn text-link" 
                  style={{ justifyContent: 'flex-start', border: 'none', padding: '0', pointerEvents: 'auto', zIndex: 1000, position: 'relative' }}
                  onMouseEnter={() => setCursorLabel("CALL")}
                  onMouseLeave={() => setCursorLabel(null)}
                >
                  <Phone size={18} style={{ color: 'var(--gold-accent)' }} /> +91 9509058933
                </a>
                <a 
                  href="https://wa.me/917340591251" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="premium-btn premium-btn-gold" 
                  style={{ justifyContent: 'flex-start', width: 'fit-content', pointerEvents: 'auto', zIndex: 1000, position: 'relative' }}
                  onMouseEnter={() => setCursorLabel("WHATSAPP")}
                  onMouseLeave={() => setCursorLabel(null)}
                >
                  <MessageCircle size={18} /> WhatsApp Direct Chat
                </a>
              </div>

            {/* Newsletter */}
            <div className="bento-card" style={{ padding: '1.75rem' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Subscribe to Insights</h4>
              <p className="text-subtitle" style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>Get premium development tips and UI/UX trends straight to your inbox.</p>
              <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); setNewsletterEmail(''); }} style={{ display: 'flex', gap: '0.75rem' }}>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="premium-input"
                  placeholder="you@company.com"
                  required
                  style={{ flex: 1 }}
                />
                <Magnetic>
                  <button type="submit" className="premium-btn premium-btn-gold" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>Subscribe</button>
                </Magnetic>
              </form>
            </div>
          </motion.div>

          {/* Right – Interactive Project Builder Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <div className="bento-card" style={{ padding: '3rem' }}>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Send an Inquiry</h3>
              <p className="text-subtitle" style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>Define your scope below (Select up to 3).</p>
              
              <form ref={formRef} onSubmit={sendEmail}>
                <input type="hidden" name="user_project" value={selectedScope.join(', ')} />
                
                <div className="project-builder-grid" style={{ marginBottom: '2.5rem' }}>
                  {[
                    { id: 'web', title: 'Web Masterpiece', icon: <Globe size={20} /> },
                    { id: 'mobile', title: 'Intuitive App Designing', icon: <Smartphone size={20} /> },
                    { id: 'ai', title: 'AI Integration', icon: <Cpu size={20} /> },
                    { id: 'branding', title: 'Corporate Identity', icon: <Layers size={20} /> },
                  ].map((scope) => (
                    <ScopeCard 
                      key={scope.id}
                      title={scope.title}
                      icon={scope.icon}
                      selected={selectedScope.includes(scope.title)}
                      onToggle={() => toggleScope(scope.title)}
                    />
                  ))}
                </div>

                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                  <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Estimated Delivery</span>
                  <motion.span 
                    key={getTimeline()}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ fontWeight: 800, color: 'var(--gold-accent)', fontSize: '1.1rem' }}
                  >
                    {getTimeline()}
                  </motion.span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <input type="text" name="user_name" className="premium-input" placeholder="Full Name" required />
                  <input type="email" name="user_email" className="premium-input" placeholder="Email Address" required />
                </div>
                <div style={{ marginBottom: '2rem' }}>
                  <textarea name="message" className="premium-input" placeholder="Tell us about your context, timeline, and goals..." rows={3} required />
                </div>
                <Magnetic>
                  <button 
                    type="submit" 
                    className="premium-btn premium-btn-full" 
                    style={{ backgroundColor: '#fff', color: '#000', borderColor: '#fff' }} 
                    disabled={formStatus === 'sending'}
                    onMouseEnter={() => { setCursorLabel("SAY HI"); playHover(); }}
                    onMouseLeave={() => setCursorLabel(null)}
                  >
                    {btnLabel}
                  </button>
                </Magnetic>
                {formStatus === 'sent' && (
                  <p style={{ color: '#4ade80', marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    ✓ We'll establish contact within 24 hours.
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="premium-container" style={{ marginTop: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '0.1em' }} className="text-gradient">KALKUT</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Where art meets vibe. Engineering beautiful software globally.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Magnetic><a href="https://github.com/kalkut-devs" target="_blank" rel="noreferrer" className="premium-btn" style={{ border: 'none', padding: '0.5rem', minWidth: 0 }}><Github size={20} /></a></Magnetic>
            <Magnetic><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="premium-btn" style={{ border: 'none', padding: '0.5rem', minWidth: 0 }}><Linkedin size={20} /></a></Magnetic>
          </div>
        </div>
        <div className="premium-container" style={{ paddingTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center' }}>
          © 2024-2026 KALKUT. All rights reserved.
        </div>
      </footer>

      {/* ── Project Modal ── */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <>
            {/* Transition Shutter */}
            <motion.div 
              style={{ position: 'fixed', inset: 0, zIndex: 10001, background: 'var(--gold-accent)' }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: [0, 1, 0], top: ['100%', '0%', '0%'] }}
              exit={{ scaleY: [0, 1, 0], bottom: ['100%', '0%', '0%'] }}
              transition={{ duration: 1, times: [0, 0.5, 1], ease: "easeInOut" }}
            />
            
            <motion.div
              style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(5,5,5,0.98)', overflowY: 'auto' }}
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
            <div className="premium-container" style={{ padding: '2rem 4vw 6rem' }}>

              {/* Close */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
                <button onClick={closeModal} className="premium-btn" style={{ borderColor: 'rgba(212,175,55,0.3)', color: 'var(--gold-accent)' }}>
                  Close <X size={16} />
                </button>
              </div>

              {/* Header */}
              <div style={{ marginBottom: '3rem' }}>
                <span style={{ color: 'var(--gold-accent)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  {selectedProject.category} / {selectedProject.year}
                </span>
                <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1.05, marginTop: '0.5rem' }}>{selectedProject.title}</h1>
                <p className="text-subtitle" style={{ fontSize: '1.3rem', maxWidth: '700px', marginTop: '1rem' }}>{selectedProject.tagline}</p>
              </div>

              {/* Hero Image */}
              <div style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: '3rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                <img src={selectedProject.image} alt={selectedProject.title} style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: '420px' }} />
              </div>

              {/* Metadata Row */}
              <div className="bento-grid" style={{ marginBottom: '3rem', marginTop: 0 }}>
                {[
                  { icon: <Calendar size={18} />, label: 'Year', val: selectedProject.year },
                  { icon: <Users size={18} />, label: 'Team', val: selectedProject.team },
                  { icon: <TrendingUp size={18} />, label: 'Duration', val: selectedProject.duration },
                  { icon: <Award size={18} />, label: 'Role', val: selectedProject.role },
                ].map((m, i) => (
                  <div key={i} className="bento-card col-span-3" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ color: 'var(--gold-accent)' }}>{m.icon}</div>
                    <div>
                      <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>{m.label}</div>
                      <div style={{ fontWeight: 600 }}>{m.val}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Challenge + Solution */}
              <div className="bento-grid" style={{ margin: '0 0 3rem 0' }}>
                <div className="bento-card col-span-6">
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--gold-accent)' }}>The Challenge</h3>
                  <p className="text-subtitle" style={{ fontSize: '1.05rem' }}>{selectedProject.challenge}</p>
                </div>
                <div className="bento-card col-span-6">
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--gold-accent)' }}>Our Solution</h3>
                  <p className="text-subtitle" style={{ fontSize: '1.05rem' }}>{selectedProject.solution}</p>
                </div>
              </div>

              {/* Results Grid */}
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Results & <span className="text-gradient">Impact</span></h3>
                <div className="bento-grid" style={{ marginTop: 0 }}>
                  {selectedProject.results.map((r, i) => (
                    <div key={i} className="bento-card col-span-3 stats-card">
                      <div className="text-gradient stat-value" style={{ fontSize: '2.5rem' }}>{r.value}</div>
                      <div className="stat-label" style={{ marginBottom: '0.25rem' }}>{r.metric}</div>
                      <div style={{ fontSize: '0.8rem', color: '#4ade80' }}>{r.improvement}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features + Tech */}
              <div className="bento-grid" style={{ margin: '0 0 3rem 0' }}>
                <div className="bento-card col-span-6">
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>Key Features</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {selectedProject.features.map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Check size={16} style={{ color: 'var(--gold-accent)', flexShrink: 0 }} />
                        <span style={{ color: 'var(--text-muted)' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bento-card col-span-6">
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>Technology Stack</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {selectedProject.tech.map(t => (
                      <span key={t} style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', color: 'var(--gold-accent)', padding: '0.4rem 1rem', borderRadius: '100px', fontSize: '0.9rem' }}>{t}</span>
                    ))}
                  </div>

                  {/* Testimonial */}
                  {selectedProject.testimonial && (
                    <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', borderLeft: '3px solid var(--gold-accent)' }}>
                      <p style={{ fontSize: '1rem', fontStyle: 'italic', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                        "{selectedProject.testimonial.text}"
                      </p>
                      <div style={{ fontWeight: 600 }}>{selectedProject.testimonial.author}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selectedProject.testimonial.role}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div style={{ textAlign: 'center' }}>
                <a href="#contact" onClick={(e) => { closeModal(); smoothScroll(e, 'contact'); }} className="premium-btn premium-btn-gold">
                  Start a Similar Project <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>

      <WhatsAppWidget />
      
      {!isMobile && <MagneticSidebar />}
    </div>
  );
};

export default KalKutPremiumPortfolio;

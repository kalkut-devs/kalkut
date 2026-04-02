import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import './ProjectDetail.css';

const projectsData = {
  "01": {
    name: "FinFlow",
    cat: "FinTech",
    desc: "Real-time payment orchestration platform designed for high-concurrency environments.",
    tech: ["React", "Node.js", "Redis", "PostgreSQL", "Docker"],
    metrics: ["10M+ Transactions", "99.9% Uptime", "<50ms Latency"],
    challenge: "Handling massive bursts of payment data while maintaining strict ACID compliance and zero data loss.",
    solution: "We implemented an event-driven microservices architecture using Redis as a high-speed buffer and Node.js for rapid processing.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
  },
  "02": {
    name: "Pulse",
    cat: "Health",
    desc: "AI-driven wellness companion that tracks mood and provides personalized insights.",
    tech: ["React Native", "TensorFlow", "Firebase", "Node.js"],
    metrics: ["500k+ Downloads", "85% AI Accuracy", "4.8 App Rating"],
    challenge: "Processing complex biometric data on-device to ensure user privacy and real-time feedback.",
    solution: "Used TensorFlow Lite for on-device machine learning models, coupled with a lightweight React Native frontend.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80"
  },
  "03": {
    name: "Nexus",
    cat: "SaaS",
    desc: "A collaboration hub for remote-first companies with real-time video and document sync.",
    tech: ["Vue.js", "GraphQL", "WebRTC", "AWS", "MongoDB"],
    metrics: ["10k+ Daily Users", "2ms Sync Latency", "50% Time Saved"],
    challenge: "Syncing large documents across thousands of users simultaneously without conflict or lag.",
    solution: "Leveraged WebRTC for direct peer-to-peer data channels and GraphQL subscriptions for backend signaling.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
  },
  "04": {
    name: "Astra",
    cat: "E-commerce",
    desc: "E-commerce platform with AR try-on and 3D product visualization.",
    tech: ["Next.js", "Three.js", "Stripe", "PostgreSQL"],
    metrics: ["40% Conv. Increase", "200k+ 3D Views", "$2M+ Revenue"],
    challenge: "Rendering high-fidelity 3D models smoothly on mobile browsers without slowing down the purchase flow.",
    solution: "Optimized Three.js shaders and implemented lazy-releasing for 3D textures, ensuring a high-speed shopping experience.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80"
  }
};

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData[id] || projectsData["01"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <motion.div
      className="project-detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="detail-header">
        <Link to="/" className="back-link"><ArrowLeft size={18} /> BACK TO WORK</Link>
      </header>

      <section className="detail-hero">
        <div className="section-container">
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <span className="mono-tag" style={{ color: 'var(--accent-blue)' }}>{project.cat}</span>
            <h1 className="display-title" style={{ fontSize: 'clamp(40px, 8vw, 100px)', marginTop: '20px' }}>{project.name}</h1>
            <p className="detail-desc">{project.desc}</p>
          </motion.div>
        </div>
        <motion.div
          className="detail-hero-image"
          style={{ backgroundImage: `url(${project.image})` }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </section>

      <section className="detail-content">
        <div className="section-container">
          <div className="detail-grid">
            <div className="detail-main">
              <div className="content-block">
                <h3 className="mono-tag">The Challenge</h3>
                <p>{project.challenge}</p>
              </div>
              <div className="content-block">
                <h3 className="mono-tag">Our Solution</h3>
                <p>{project.solution}</p>
              </div>
              <div className="content-block">
                <h3 className="mono-tag">Technology Stack</h3>
                <div className="detail-tech-list">
                  {project.tech.map((t, i) => <span key={i} className="tech-chip">{t}</span>)}
                </div>
              </div>
            </div>

            <aside className="detail-sidebar">
              <div className="sidebar-block">
                <h3 className="mono-tag">Impact Metrics</h3>
                <ul className="metrics-list">
                  {project.metrics.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
              <div className="sidebar-block">
                <h3 className="mono-tag">Project Links</h3>
                <div className="sidebar-links">
                  <button>
                    <Github size={20} /> Repository
                  </button>

                  <button>
                    <ExternalLink size={20} /> Live Demo
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <footer className="detail-footer">
        <div className="section-container">
          <Link to={`/project/${id === "04" ? "01" : "0" + (parseInt(id) + 1)}`} className="next-project-link">
            <span className="mono-tag">Next Project</span>
            <h2 className="display-title">Let's see more <ArrowUpRight size={32} /></h2>
          </Link>
        </div>
      </footer>
    </motion.div>
  );
};

export default ProjectDetail;

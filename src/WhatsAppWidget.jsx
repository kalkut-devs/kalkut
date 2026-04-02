import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './WhatsAppWidget.css';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = "7340591251";
  const message = "Hello KALKUT, I'd like to discuss a project.";

  return (
    <div className="whatsapp-widget-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="whatsapp-bubble-popup"
            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="bubble-header">
              <div className="avatar-status">
                <div className="status-dot"></div>
                <div className="avatar-letter">K</div>
              </div>
              <div className="header-info">
                <div className="header-title">Contact KalKut</div>
                <div className="header-subtitle">We reply within minutes.</div>
              </div>
              <button 
                className="bubble-close"
                onClick={() => setIsOpen(false)}
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="bubble-body">
              <div className="chat-msg">
                Hello! How can we help you today?
              </div>
              <a 
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-cta-btn"
                onClick={() => setIsOpen(false)}
              >
                Chat with us <Send size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        className={`whatsapp-float ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact on WhatsApp"
      >
        <div className="whatsapp-pulse"></div>
        {isOpen ? <X size={28} /> : <MessageCircle size={32} />}
        {!isOpen && <div className="whatsapp-tooltip">Chat with us</div>}
      </button>
    </div>
  );
};

export default WhatsAppWidget;

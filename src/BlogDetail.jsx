import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Clock, Calendar } from 'lucide-react';
import './BlogDetail.css';

const blogPosts = {
    "web3": {
        title: "The Future of Web3: Beyond the Hype",
        cat: "Tech",
        date: "Oct 24, 2024",
        read: "5 MIN READ",
        content: `Web3 is more than just cryptocurrencies and NFTs. It's a fundamental shift in how we interact with the digital world...`,
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80"
    }
};

const BlogDetail = () => {
    const { id } = useParams();
    const post = blogPosts[id] || blogPosts["web3"];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <motion.div 
            className="blog-detail-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="section-container">
                <header className="blog-head">
                    <Link to="/" className="back-link"><ArrowLeft size={18} /> ALL INSIGHTS</Link>
                </header>

                <article className="blog-article">
                    <motion.div className="blog-meta-top" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                        <span className="mono-tag" style={{ color: 'var(--accent-blue)' }}>{post.cat}</span>
                        <h1 className="display-title blog-main-title">{post.title}</h1>
                        <div className="blog-info-bar">
                            <div className="info-item"><Calendar size={14} /> {post.date}</div>
                            <div className="info-item"><Clock size={14} /> {post.read}</div>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="blog-featured-image"
                        style={{ backgroundImage: `url(${post.image})` }}
                        initial={{ scale: 1.05, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1 }}
                    />

                    <div className="blog-body">
                        <p className="blog-lead">
                            Exploring the decentralized landscape and what it means for digital creators and enterprise-level architecture.
                        </p>
                        <div className="blog-text">
                            <p>As we move towards a more decentralized internet, the core principles of ownership, transparency, and interoperability are redefining the user experience. KALKUT is at the forefront of this transformation, building bridges between traditional Web2 systems and the emerging Web3 stack.</p>
                            <h3>Decentralized Identity</h3>
                            <p>One of the most significant shifts is in how we handle identity. Moving away from siloed centralized providers towards self-sovereign identity (SSI) gives users control over their data like never before.</p>
                        </div>
                    </div>
                </article>

                <footer className="blog-foot">
                    <div className="share-box">
                        <span className="mono-tag">Share Insight</span>
                        <div className="share-links">
                            <Share2 size={24} />
                        </div>
                    </div>
                </footer>
            </div>
        </motion.div>
    );
};

export default BlogDetail;

import React, { useState, useEffect } from 'react';
import { Mail, ArrowRight, BookOpen, Send, CheckCircle2, AlertTriangle, ChevronRight } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [selectedTag, setSelectedTag] = useState('All');
  
  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState({ type: '', text: '' }); // 'success', 'error', 'loading'

  const backendUrl = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${backendUrl}/projects`);
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ type: 'loading', text: 'Sending message...' });

    try {
      const res = await fetch(`${backendUrl}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormStatus({ type: 'success', text: 'Thank you! Your message has been sent successfully.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorData = await res.json();
        setFormStatus({ type: 'error', text: errorData.message || 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      setFormStatus({ type: 'error', text: 'Error sending message. Please make sure the server is running.' });
    }
  };

  // Static Skill Category Data
  const skillCategories = [
    {
      title: 'Languages',
      skills: ['JavaScript', 'C++', 'C', 'HTML5', 'CSS3']
    },
    {
      title: 'Frontend',
      skills: ['React.js', 'Vite', 'Bootstrap', 'Tailwind CSS', 'Responsive Design']
    },
    {
      title: 'Backend',
      skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication']
    },
    {
      title: 'Database & Tools',
      skills: ['MongoDB', 'Mongoose', 'Git', 'GitHub', 'Postman', 'VS Code']
    }
  ];

  return (
    <div style={{ position: 'relative' }}>
      
      {/* Background Lights */}
      <div className="bg-glow" style={{ top: '10%', left: '10%' }}></div>
      <div className="bg-glow" style={{ top: '40%', right: '5%' }}></div>
      <div className="bg-glow" style={{ bottom: '15%', left: '15%' }}></div>

      {/* HERO SECTION */}
      <section className="section animate-fade-in" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
        <div className="container grid-2" style={{ alignItems: 'center' }}>
          <div>
            <h5 style={{ color: 'var(--primary)', fontFamily: 'var(--font-primary)', fontWeight: 600, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>
              Hi 👋, I'm
            </h5>
            <h1 style={{ fontFamily: 'var(--font-primary)', fontSize: '4rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-1.5px' }}>
              Jayesh Khatke
            </h1>
            <h2 className="gradient-text" style={{ fontFamily: 'var(--font-primary)', fontSize: '1.8rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              MERN Stack Developer | Full-Stack Web Developer | DSA Learner
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '500px' }}>
              Passionate about creating scalable, responsive, and user-friendly web applications. Specializing in Node.js, React, Express, and MongoDB.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#projects" className="btn btn-primary">
                View My Work <ArrowRight size={18} />
              </a>
              <a href="#contact" className="btn btn-secondary">
                Let's Talk
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '320px', height: '320px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', padding: '6px', boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)', overflow: 'hidden' }}>
              <img 
                src="/profile.jpg" 
                alt="Jayesh Khatke" 
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
              />
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
                <span style={{ fontSize: '3rem', marginBottom: '10px' }}>💻</span>
                <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: '1.4rem' }}>&lt;Code /&gt;</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '5px' }}>MERN & DSA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT ME SECTION */}
      <section id="about" className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <h2 className="section-title">About Me</h2>
          
          <div className="grid-2" style={{ gap: '3rem' }}>
            <div className="glass-card">
              <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.5rem', marginBottom: '1.2rem', color: 'var(--primary)' }}>My Journey</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                I am a passionate software developer focusing on building full-stack web applications using the MERN stack. My learning path includes advanced React development, Node.js RESTful service design, and database optimizations.
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Apart from application building, I spend code hours diving deep into Data Structures and Algorithms (DSA) to write clean, optimized, and scalable backend services.
              </p>
              
              <h4 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.1rem', marginTop: '1.5rem', marginBottom: '0.8rem', color: 'var(--text-main)' }}>Future Goals:</h4>
              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                {['Master Advanced Backend & System Design', 'Contribute to Open Source Projects', 'Build impactful Full-Stack applications', 'Become a Software Development Engineer (SDE)'].map((goal, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    <ChevronRight size={14} color="var(--primary)" /> {goal}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="glass-card" style={{ flex: 1 }}>
                <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <BookOpen size={20} color="var(--secondary)" /> What I am Learning
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['TypeScript', 'Next.js', 'Advanced Node.js', 'System Design', 'Docker', 'SDE Fundamentals'].map((learn, idx) => (
                    <span key={idx} style={{ padding: '6px 12px', background: 'rgba(236, 72, 153, 0.1)', border: '1px solid rgba(236, 72, 153, 0.2)', borderRadius: '50px', fontSize: '0.85rem', color: 'var(--secondary)' }}>
                      {learn}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.3rem', marginBottom: '1rem' }}>Let's Connect</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Feel free to reach out for collaboration, project inquiries, or just to chat about tech.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a href="https://github.com/jayesh722005" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                      <path d="M9 18c-4.51 2-5-2-7-2"></path>
                    </svg> GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/jayesh-khatke-2aaa50394/" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="section">
        <div className="container">
          <h2 className="section-title">My Tech Stack</h2>
          <div className="grid-2">
            {skillCategories.map((category, index) => (
              <div key={index} className="glass-card">
                <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--primary)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '0.5rem' }}>
                  {category.title}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {category.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '8px 16px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--card-border)',
                        borderRadius: '8px',
                        fontWeight: 500,
                        color: 'var(--text-main)',
                        transition: 'var(--transition-smooth)'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.borderColor = 'var(--primary)';
                        e.target.style.background = 'rgba(99, 102, 241, 0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.borderColor = 'var(--card-border)';
                        e.target.style.background = 'rgba(255, 255, 255, 0.03)';
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <h2 className="section-title">Projects</h2>

          {/* Project Filters */}
          {!loadingProjects && projects.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
              {['All', 'MERN', 'React', 'AI', 'JavaScript'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`btn ${selectedTag === tag ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '0.5rem 1.2rem', borderRadius: '50px', fontSize: '0.85rem' }}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {loadingProjects ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading projects from database...</p>
          ) : projects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>No projects available right now. Login as admin to add some!</p>
            </div>
          ) : (
            <div className="grid-3">
              {projects
                .filter(project => {
                  if (selectedTag === 'All') return true;
                  const techs = project.technologies.map(t => t.toLowerCase());
                  if (selectedTag === 'MERN') {
                    // Check if it has React, Node, Express or MongoDB
                    return (
                      techs.some(t => t.includes('react')) &&
                      (techs.some(t => t.includes('node')) ||
                       techs.some(t => t.includes('express')) ||
                       techs.some(t => t.includes('mongo') || t.includes('mongoose')))
                    );
                  }
                  return techs.some(tech => tech.includes(selectedTag.toLowerCase()));
                })
                .map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
            </div>
          )}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="section">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          
          <div className="grid-2" style={{ alignItems: 'start' }}>
            <div className="glass-card">
              <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.5rem', marginBottom: '1.2rem', color: 'var(--secondary)' }}>Drop me a message</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
                Use this contact form to send a message directly to my admin dashboard database. I look forward to hearing from you!
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <a href="mailto:jayeshkhatke43@gmail.com" 
                   style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--card-border)', transition: 'var(--transition-smooth)' }} 
                   onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.background = 'rgba(99, 102, 241, 0.05)'; }}
                   onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--card-border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', fontSize: '1.2rem' }}>
                    📧
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email</span>
                    <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>
                      jayeshkhatke43@gmail.com
                    </span>
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/jayesh-khatke-2aaa50394/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--card-border)', transition: 'var(--transition-smooth)' }} 
                   onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.background = 'rgba(99, 102, 241, 0.05)'; }}
                   onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--card-border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>LinkedIn</span>
                    <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>
                      Jayesh Khatke (SDE Profile)
                    </span>
                  </div>
                </a>
              </div>
            </div>

            <div className="glass-card">
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Your Name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="name@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Your Message..."
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <Send size={16} /> Send Message
                </button>

                {formStatus.text && (
                  <div style={{
                    marginTop: '1.2rem',
                    padding: '0.8rem 1rem',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.9rem',
                    background: formStatus.type === 'success' ? 'rgba(20, 184, 166, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    border: `1px solid ${formStatus.type === 'success' ? 'rgba(20, 184, 166, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                    color: formStatus.type === 'success' ? 'var(--tertiary)' : '#f87171'
                  }}>
                    {formStatus.type === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                    {formStatus.text}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;

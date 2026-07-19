import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const { title, description, imageUrl, githubLink, liveLink, technologies, featured } = project;

  // Modern SVG-based background dynamic placeholder for project images if not provided
  const fallbackImage = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%23121225"/><circle cx="300" cy="200" r="150" fill="%236366f1" opacity="0.08"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Outfit, sans-serif" font-size="24" font-weight="bold" fill="%236366f1">${encodeURIComponent(title)}</text></svg>`;

  return (
    <div className="project-card-3d">
      {featured && (
        <span style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)',
          color: '#fff',
          fontSize: '0.75rem',
          fontWeight: 700,
          padding: '4px 10px',
          borderRadius: '50px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          boxShadow: '0 4px 12px rgba(236, 72, 153, 0.4)',
          zIndex: 10
        }}>
          <Sparkles size={12} />
          Featured
        </span>
      )}
      
      <div style={{ height: '200px', overflow: 'hidden', background: '#121225', position: 'relative' }}>
        <img 
          src={imageUrl || fallbackImage} 
          alt={title}
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
        />
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1, transformStyle: 'preserve-3d' }}>
        <h3>
          {title}
        </h3>
        <p style={{ flexGrow: 1 }}>
          {description}
        </p>

        {/* Technologies List */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.5rem' }}>
          {technologies.map((tech, index) => (
            <span 
              key={index} 
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--primary)',
                background: 'rgba(99, 102, 241, 0.1)',
                padding: '3px 8px',
                borderRadius: '4px',
                border: '1px solid rgba(99, 102, 241, 0.15)'
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--card-border)', paddingTop: '1rem' }}>
          {githubLink ? (
            <a 
              href={githubLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
              style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', flex: 1, display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'center' }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
              Code
            </a>
          ) : (
            <button 
              disabled
              className="btn btn-secondary"
              style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', flex: 1, opacity: 0.5, cursor: 'not-allowed', display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'center' }}
            >
              No Code
            </button>
          )}
          
          {liveLink ? (
            <a 
              href={liveLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary"
              style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', flex: 1, display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'center' }}
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          ) : (
            <button 
              disabled
              className="btn btn-secondary"
              style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', flex: 1, opacity: 0.5, cursor: 'not-allowed', display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'center' }}
            >
              <ExternalLink size={16} /> Demo Offline
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

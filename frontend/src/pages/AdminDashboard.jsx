import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, LogOut, CheckCircle, Mail, Briefcase, PlusCircle, Save, X, Globe, Code } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' or 'messages'
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Project editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    githubLink: '',
    liveLink: '',
    technologies: '',
    featured: false
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const backendUrl = 'http://localhost:5000/api';

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [token]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch projects
      const projRes = await fetch(`${backendUrl}/projects`);
      if (projRes.ok) {
        const projData = await projRes.json();
        setProjects(projData);
      }

      // Fetch messages
      const msgRes = await fetch(`${backendUrl}/messages`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (msgRes.ok) {
        const msgData = await msgRes.json();
        setMessages(msgData);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const handleProjectInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProjectForm({
      ...projectForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    const endpoint = editingId ? `${backendUrl}/projects/${editingId}` : `${backendUrl}/projects`;
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(projectForm)
      });

      if (res.ok) {
        fetchData();
        resetProjectForm();
      } else {
        const data = await res.json();
        alert(data.message || 'Error saving project');
      }
    } catch (error) {
      alert('Failed to connect to backend server');
    }
  };

  const handleEditProjectClick = (project) => {
    setIsEditing(true);
    setEditingId(project._id);
    setProjectForm({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl || '',
      githubLink: project.githubLink || '',
      liveLink: project.liveLink || '',
      technologies: project.technologies.join(', '),
      featured: project.featured || false
    });
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`${backendUrl}/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        fetchData();
      } else {
        alert('Failed to delete project');
      }
    } catch (error) {
      alert('Connection error');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      const res = await fetch(`${backendUrl}/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        fetchData();
      } else {
        alert('Failed to delete message');
      }
    } catch (error) {
      alert('Connection error');
    }
  };

  const resetProjectForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setProjectForm({
      title: '',
      description: '',
      imageUrl: '',
      githubLink: '',
      liveLink: '',
      technologies: '',
      featured: false
    });
  };

  return (
    <div className="container" style={{ paddingTop: '8rem', minHeight: '85vh' }}>
      
      {/* Dashboard Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-primary)', fontSize: '2.5rem', fontWeight: 800 }}>Admin Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Welcome back, {localStorage.getItem('username') || 'Admin'}</p>
        </div>
        <button onClick={handleLogout} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--card-border)', marginBottom: '2rem' }}>
        <button
          onClick={() => setActiveTab('projects')}
          style={{
            background: 'none',
            border: 'none',
            color: activeTab === 'projects' ? 'var(--primary)' : 'var(--text-muted)',
            fontFamily: 'var(--font-primary)',
            fontSize: '1.1rem',
            fontWeight: 600,
            padding: '10px 20px',
            cursor: 'pointer',
            borderBottom: activeTab === 'projects' ? '2px solid var(--primary)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'var(--transition-smooth)'
          }}
        >
          <Briefcase size={18} /> Manage Projects
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          style={{
            background: 'none',
            border: 'none',
            color: activeTab === 'messages' ? 'var(--primary)' : 'var(--text-muted)',
            fontFamily: 'var(--font-primary)',
            fontSize: '1.1rem',
            fontWeight: 600,
            padding: '10px 20px',
            cursor: 'pointer',
            borderBottom: activeTab === 'messages' ? '2px solid var(--primary)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'var(--transition-smooth)'
          }}
        >
          <Mail size={18} /> Messages Inbox ({messages.length})
        </button>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading dashboard data...</p>
      ) : activeTab === 'projects' ? (
        
        /* PROJECTS TAB */
        <div className="grid-2" style={{ alignItems: 'start' }}>
          
          {/* Project Form */}
          <div className="glass-card">
            <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PlusCircle size={20} /> {isEditing ? 'Edit Project' : 'Add New Project'}
            </h3>
            
            <form onSubmit={handleSaveProject}>
              <div className="form-group">
                <label className="form-label">Project Title</label>
                <input
                  type="text"
                  name="title"
                  value={projectForm.title}
                  onChange={handleProjectInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  value={projectForm.description}
                  onChange={handleProjectInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Image URL (Optional)</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={projectForm.imageUrl}
                  onChange={handleProjectInputChange}
                  className="form-input"
                  placeholder="https://example.com/image.png"
                />
              </div>

              <div className="form-group">
                <label className="form-label">GitHub URL (Optional)</label>
                <input
                  type="text"
                  name="githubLink"
                  value={projectForm.githubLink}
                  onChange={handleProjectInputChange}
                  className="form-input"
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Live Site URL (Optional)</label>
                <input
                  type="text"
                  name="liveLink"
                  value={projectForm.liveLink}
                  onChange={handleProjectInputChange}
                  className="form-input"
                  placeholder="https://..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Technologies (Comma-separated)</label>
                <input
                  type="text"
                  name="technologies"
                  value={projectForm.technologies}
                  onChange={handleProjectInputChange}
                  className="form-input"
                  placeholder="React, Node.js, Express, MongoDB"
                  required
                />
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={projectForm.featured}
                  onChange={handleProjectInputChange}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="featured" style={{ cursor: 'pointer', fontWeight: 500, fontSize: '0.95rem' }}>Feature this project on main grid</label>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  <Save size={18} /> {isEditing ? 'Update Project' : 'Save Project'}
                </button>
                {isEditing && (
                  <button type="button" onClick={resetProjectForm} className="btn btn-secondary">
                    <X size={18} /> Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Project List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>Existing Projects ({projects.length})</h3>
            {projects.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No projects created yet.</p>
            ) : (
              projects.map((project) => (
                <div key={project._id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem' }}>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '1.1rem' }}>{project.title}</h4>
                    <span style={{ fontSize: '0.75rem', color: project.featured ? 'var(--secondary)' : 'var(--text-muted)', display: 'flex', gap: '5px', alignItems: 'center', marginTop: '4px' }}>
                      {project.featured && '★ Featured • '} {project.technologies.slice(0, 3).join(', ')}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleEditProjectClick(project)} className="btn btn-secondary" style={{ padding: '8px' }}>
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDeleteProject(project._id)} className="btn btn-danger" style={{ padding: '8px' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      ) : (
        
        /* MESSAGES TAB */
        <div>
          <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.4rem', marginBottom: '1.5rem' }}>Contact Inquiries</h3>
          {messages.length === 0 ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 0' }}>
              <p style={{ color: 'var(--text-muted)' }}>No messages received yet.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {messages.map((msg) => (
                <div key={msg._id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', position: 'relative' }}>
                  <button 
                    onClick={() => handleDeleteMessage(msg._id)} 
                    className="btn btn-danger" 
                    style={{ position: 'absolute', top: '20px', right: '20px', padding: '8px' }}
                  >
                    <Trash2 size={16} />
                  </button>
                  
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.8rem' }}>✉️</span>
                    <div>
                      <h4 style={{ fontWeight: 700, fontSize: '1.1rem' }}>{msg.name}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Email: <a href={`mailto:${msg.email}`} style={{ color: 'var(--primary)' }}>{msg.email}</a> • {new Date(msg.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: '3px solid var(--primary)', fontSize: '0.95rem', color: 'var(--text-main)', marginTop: '0.5rem' }}>
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

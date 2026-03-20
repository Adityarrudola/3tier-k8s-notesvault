import React, { useState } from 'react';
import axios from 'axios';

function NoteForm({ fetchNotes }) {
  const [form, setForm] = useState({ title: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation to prevent empty notes
    if (!form.title.trim() || !form.content.trim()) {
      alert("Please fill in both the title and content.");
      return;
    }

    setIsSubmitting(true);
    try {
      // FIX: Added 'form' as the second argument so data is actually sent to the backend
      await axios.post('http://localhost:8080/api/notes', form); 
      
      fetchNotes();
      setForm({ title: '', content: '' }); // Reset form after successful save
    } catch (err) { 
      console.error("Failed to save note:", err); 
      alert("Error saving note. Check if backend is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Styles
  const labelStyle = { 
    fontSize: '11px', 
    fontWeight: '800', 
    color: '#a0aec0', 
    textTransform: 'uppercase', 
    marginBottom: '8px', 
    display: 'block' 
  };
  
  const inputBase = {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: '2px solid #edf2f7',
    backgroundColor: '#f8fafc',
    fontSize: '15px',
    marginBottom: '20px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit'
  };

  const buttonStyle = {
    width: '100%',
    padding: '16px',
    backgroundColor: isSubmitting ? '#6ee7b7' : '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontWeight: '700',
    cursor: isSubmitting ? 'not-allowed' : 'pointer',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
    transition: 'transform 0.1s, background-color 0.2s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px'
  };

  return (
    <form onSubmit={handleSubmit}>
      <label style={labelStyle}>Note Title</label>
      <input
        style={inputBase}
        placeholder="Enter a topic..."
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
        onFocus={(e) => e.target.style.borderColor = '#10b981'}
        onBlur={(e) => e.target.style.borderColor = '#edf2f7'}
      />

      <label style={labelStyle}>Content</label>
      <textarea
        style={{ ...inputBase, height: '160px', resize: 'none' }}
        placeholder="Start typing..."
        value={form.content}
        onChange={e => setForm({ ...form, content: e.target.value })}
        onFocus={(e) => e.target.style.borderColor = '#10b981'}
        onBlur={(e) => e.target.style.borderColor = '#edf2f7'}
      />

      <button 
        type="submit" 
        disabled={isSubmitting}
        style={buttonStyle}
        onMouseDown={(e) => !isSubmitting && (e.currentTarget.style.transform = 'scale(0.98)')}
        onMouseUp={(e) => !isSubmitting && (e.currentTarget.style.transform = 'scale(1)')}
      >
        {isSubmitting ? 'Saving...' : 'Save Note'}
        {!isSubmitting && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        )}
      </button>
    </form>
  );
}

export default NoteForm;
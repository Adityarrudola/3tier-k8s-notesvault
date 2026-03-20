import React, { useState } from 'react';
import axios from 'axios';

function NoteForm({ fetchNotes }) {
  const [form, setForm] = useState({ title: '', content: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return;
    try {
      await axios.post('http://localhost:5001/api/notes', form);
      fetchNotes();
      setForm({ title: '', content: '' });
    } catch (err) { console.error(err); }
  };

  const labelStyle = { fontSize: '11px', fontWeight: '800', color: '#a0aec0', textTransform: 'uppercase', marginBottom: '8px', display: 'block' };
  
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
    transition: 'border-color 0.2s'
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
        style={{
          width: '100%',
          padding: '16px',
          backgroundColor: '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontWeight: '700',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
          transition: 'transform 0.1s'
        }}
        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        Save Note
      </button>
    </form>
  );
}

export default NoteForm;
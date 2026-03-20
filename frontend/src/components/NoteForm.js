import React, { useState } from 'react';
import axios from 'axios';

function NoteForm({ fetchNotes }) {
  const [form, setForm] = useState({ title: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.title.trim() || !form.content.trim()) {
      alert("Please fill in both the title and content.");
      return;
    }

    setIsSubmitting(true);
    try {
      // FIXED: Relative path for K8s and passing the 'form' data object
      await axios.post('/api/notes', form); 
      
      fetchNotes();
      setForm({ title: '', content: '' }); 
    } catch (err) { 
      console.error("Failed to save note:", err); 
    } finally {
      setIsSubmitting(false);
    }
  };

  const labelStyle = { fontSize: '11px', fontWeight: '800', color: '#a0aec0', textTransform: 'uppercase', marginBottom: '8px', display: 'block' };
  const inputBase = { width: '100%', padding: '14px', borderRadius: '12px', border: '2px solid #edf2f7', backgroundColor: '#f8fafc', fontSize: '15px', marginBottom: '20px', outline: 'none', boxSizing: 'border-box' };

  return (
    <form onSubmit={handleSubmit}>
      <label style={labelStyle}>Note Title</label>
      <input
        style={inputBase}
        placeholder="Enter a topic..."
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
      />
      <label style={labelStyle}>Content</label>
      <textarea
        style={{ ...inputBase, height: '160px', resize: 'none' }}
        placeholder="Start typing..."
        value={form.content}
        onChange={e => setForm({ ...form, content: e.target.value })}
      />
      <button 
        type="submit" 
        disabled={isSubmitting}
        style={{ width: '100%', padding: '16px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}
      >
        {isSubmitting ? 'Saving...' : 'Save Note'}
      </button>
    </form>
  );
}

export default NoteForm;
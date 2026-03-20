import React from 'react';
import axios from 'axios';

function NoteList({ notes, fetchNotes }) {
  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5001/api/notes/${id}`);
    fetchNotes();
  };

  const cardStyle = {
    background: '#ffffff',
    borderRadius: '20px',
    padding: '28px',
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
    cursor: 'default'
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
      {notes.map((note) => (
        <div 
          key={note._id} 
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#10b981';
            e.currentTarget.style.boxShadow = '0 12px 20px rgba(0,0,0,0.04)';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e2e8f0';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#059669', background: '#d1fae5', padding: '4px 10px', borderRadius: '12px', textTransform: 'uppercase' }}>
              Note
            </span>
            <button 
              onClick={() => deleteNote(note._id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#cbd5e1', fontSize: '18px', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.target.style.color = '#ef4444'}
              onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
            >
              ✕
            </button>
          </div>
          
          <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: '700', color: '#1a202c' }}>{note.title}</h3>
          <p style={{ color: '#4a5568', fontSize: '15px', lineHeight: '1.7', margin: 0, flex: 1 }}>{note.content}</p>
          
          <div style={{ marginTop: '24px', borderTop: '1px solid #f7fafc', paddingTop: '16px', fontSize: '12px', color: '#a0aec0', fontWeight: '500' }}>
            Created on {new Date().toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
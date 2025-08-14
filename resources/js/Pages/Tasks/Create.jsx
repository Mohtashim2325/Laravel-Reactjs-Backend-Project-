import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState(1);
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();

    const payload = {
      title,
      description,
      deadline: deadline || null,
      priority,
      tags: tags ? tags.split(',').map(s => s.trim()) : [],
    };

    try {
      await axios.post('/tasks', payload);
      navigate('/tasks');
    } catch (err) {
      alert('Failed: ' + (err.response?.data?.message || 'error'));
    }
  }

  return (
    <div style={{ maxWidth: 700 }}>
      <h2>New Task</h2>
      <form onSubmit={submit}>
        <div>
          <label>Title</label><br />
          <input value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description</label><br />
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Deadline</label><br />
          <input type="datetime-local" value={deadline} onChange={e => setDeadline(e.target.value)} />
        </div>
        <div>
          <label>Priority</label><br />
          <select value={priority} onChange={e => setPriority(parseInt(e.target.value))}>
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
          </select>
        </div>
        <div>
          <label>Tags (comma separated)</label><br />
          <input value={tags} onChange={e => setTags(e.target.value)} />
        </div>
        <div style={{ marginTop: 10 }}>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}


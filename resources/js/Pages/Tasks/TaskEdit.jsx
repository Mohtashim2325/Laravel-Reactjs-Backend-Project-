import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function TaskEdit() {
  const { id } = useParams(); // get task id from URL
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState(1);
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch existing task data from DB
  useEffect(() => {
    async function fetchTask() {
      try {
        const res = await axios.get(`/tasks/${id}`);
        const task = res.data;

        setTitle(task.title || "");
        setDescription(task.description || "");
        setDeadline(task.deadline || "");
        setPriority(task.priority || 1);
        setTags(task.tags ? task.tags.join(", ") : "");
        setLoading(false);
      } catch (err) {
        alert("Failed to fetch task: " + (err.response?.data?.message || "error"));
        navigate("/tasks");
      }
    }
    fetchTask();
  }, [id, navigate]);

  async function submit(e) {
    e.preventDefault();

    const payload = {
      title,
      description,
      deadline: deadline || null,
      priority,
      tags: tags ? tags.split(",").map((s) => s.trim()) : [],
    };

    try {
      await axios.put(`/tasks/${id}`, payload);
      navigate("/tasks"); // Go back to task list
    } catch (err) {
      alert("Failed to save changes: " + (err.response?.data?.message || "error"));
    }
  }

  if (loading) {
    return <p>Loading task...</p>;
  }

  return (
    <div style={{ maxWidth: 700 }}>
      <h2>Edit Task</h2>
      <form onSubmit={submit}>
        <div>
          <label>Title</label><br />
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description</label><br />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Deadline</label><br />
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <div>
          <label>Priority</label><br />
          <select value={priority} onChange={(e) => setPriority(parseInt(e.target.value))}>
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
          </select>
        </div>
        <div>
          <label>Tags (comma separated)</label><br />
          <input value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
        <div style={{ marginTop: 10 }}>
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
}

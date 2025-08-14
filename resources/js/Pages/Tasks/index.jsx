import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function TasksIndex() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [q, setQ] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    async function fetchTasks() {
        setLoading(true);
        const res = await axios.get("/tasks");
        setTasks(res.data.data || []);
        setLoading(false);
    }

    async function toggleComplete(task) {
        try {
            const res = await axios.post(`/tasks/${task.id}/complete`);
            setTasks(
                tasks.map((t) =>
                    t.id === task.id
                        ? { ...t, is_completed: res.data.is_completed }
                        : t
                )
            );
        } catch (err) {
            console.error(err);
        }
    }

    async function remove(task) {
        if (!confirm("Delete task?")) return;
        await axios.delete(`/tasks/${task.id}`);
        fetchTasks();
    }

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h2>Tasks</h2>
                <div>
                    <Link to="/tasks/new">+ New Task</Link>
                </div>
            </div>

            <div style={{ marginTop: 10 }}>
                <input
                    placeholder="Search"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                />
                <button
                    onClick={() => {
                        /* simple client-side filter */
                    }}
                >
                    Search
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ marginTop: 12 }}>
                    {tasks.length === 0 && <div>No tasks found.</div>}
                    {tasks.map((t) => (
                        <div
                            key={t.id}
                            style={{
                                border: "1px solid #ddd",
                                padding: 12,
                                marginBottom: 8,
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div>
                                    <strong>{t.title}</strong>
                                    <div
                                        style={{ fontSize: 12, color: "#666" }}
                                    >
                                        {t.description}
                                    </div>
                                </div>
                                <div>
                                    <div>{t.deadline || "-"}</div>
                                    <div style={{ marginTop: 8 }}>
                                        <button
                                            onClick={() => toggleComplete(t)}
                                        >
                                            {t.is_completed
                                                ? "Completed"
                                                : "Mark done"}
                                        </button>{" "}
                                        <Link to={`/tasks/${t.id}/edit`}>Edit</Link>{" "}
                                        <button onClick={() => remove(t)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

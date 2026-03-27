// ================================================================
// LAB 4 - TODO APP (CRUD using React State)
// Concepts: useState, rendering lists, add/edit/remove/mark done,
//           array operations, conditional UI, key usage
// ================================================================

import { useState } from "react";


// ============================================================
// TODO ITEM COMPONENT
// Handles: display, edit, toggle, delete
// ============================================================
function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const saveEdit = () => {
    if (!text.trim()) return;
    onEdit(todo.id, text.trim());
    setEditing(false);
  };

  return (
    <div
      style={{
        ...styles.todoItem,
        opacity: todo.completed ? 0.6 : 1,
        borderColor: todo.completed ? "#2a2a3d" : "#444466",
      }}
    >
      {/* Toggle checkbox */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        style={styles.checkbox}
      />

      {/* Show input if editing, otherwise text */}
      {editing ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && saveEdit()}
          style={styles.editInput}
          autoFocus
        />
      ) : (
        <span
          style={{
            ...styles.todoText,
            textDecoration: todo.completed ? "line-through" : "none",
            color: todo.completed ? "#666688" : "#e8e8f0",
          }}
        >
          {todo.text}
        </span>
      )}

      {/* Priority indicator */}
      <span
        style={{
          ...styles.badge,
          background:
            todo.priority === "high"
              ? "rgba(255,99,132,0.15)"
              : todo.priority === "medium"
              ? "rgba(255,193,7,0.15)"
              : "rgba(40,167,69,0.15)",
          color:
            todo.priority === "high"
              ? "#ff6384"
              : todo.priority === "medium"
              ? "#ffc107"
              : "#28a745",
        }}
      >
        {todo.priority}
      </span>

      {/* Buttons */}
      <div style={styles.actions}>
        {editing ? (
          <button style={styles.btnSave} onClick={saveEdit}>
            Save
          </button>
        ) : (
          <button style={styles.btnEdit} onClick={() => setEditing(true)}>
            Edit
          </button>
        )}
        <button style={styles.btnDelete} onClick={() => onDelete(todo.id)}>
          Remove
        </button>
      </div>
    </div>
  );
}


// ============================================================
// MAIN APP COMPONENT
// ============================================================
export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Finish LAB 1", completed: true, priority: "high" },
    { id: 2, text: "Study JS basics", completed: false, priority: "high" },
    { id: 3, text: "Upload project", completed: false, priority: "medium" },
    { id: 4, text: "Revise React", completed: false, priority: "low" },
  ]);

  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("medium");
  const [filter, setFilter] = useState("all");

  // CREATE
  const addTodo = () => {
    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      priority: priority,
    };

    setTodos((prev) => [newTodo, ...prev]);
    setInput("");
  };

  // DELETE
  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // TOGGLE
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // EDIT
  const updateTodo = (id, newText) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, text: newText } : t
      )
    );
  };

  // CLEAR COMPLETED
  const clearDone = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  // FILTER LOGIC
  const visibleTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  // STATS
  const total = todos.length;
  const done = todos.filter((t) => t.completed).length;
  const active = total - done;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Todo App</h1>
        <p style={styles.subtitle}>Lab 4 — CRUD Practice</p>

        {/* Stats */}
        <div style={styles.stats}>
          <span>{total} total</span>
          <span style={{ color: "#7c5cfc" }}>{active} active</span>
          <span style={{ color: "#81c784" }}>{done} completed</span>
        </div>

        {/* Input Section */}
        <div style={styles.addBar}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="Write a task..."
            style={styles.mainInput}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={styles.select}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button onClick={addTodo} style={styles.addBtn}>
            Add
          </button>
        </div>

        {/* Filters */}
        <div style={styles.filterBar}>
          {["all", "active", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...styles.filterBtn,
                background: filter === f ? "#7c5cfc" : "transparent",
                color: filter === f ? "#fff" : "#8888aa",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* List */}
        <div style={styles.list}>
          {visibleTodos.length === 0 ? (
            <p style={styles.emptyMsg}>No tasks found.</p>
          ) : (
            visibleTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={removeTodo}
                onToggle={toggleTodo}
                onEdit={updateTodo}
              />
            ))
          )}
        </div>

        {/* Clear completed */}
        {done > 0 && (
          <button onClick={clearDone} style={styles.clearBtn}>
            Clear completed ({done})
          </button>
        )}
      </div>
    </div>
  );
}


// ============================================================
// STYLES (unchanged mostly, minor tweaks)
// ============================================================
const styles = {
  page: {
    minHeight: "100vh",
    background: "#0a0a0f",
    display: "flex",
    justifyContent: "center",
    padding: "3rem 1rem",
    fontFamily: "'Space Mono', monospace",
  },
  container: {
    width: "100%",
    maxWidth: "600px",
  },
  title: {
    color: "#e8e8f0",
    fontSize: "2rem",
    fontWeight: "bold",
  },
  subtitle: {
    color: "#7c5cfc",
    fontSize: "0.8rem",
    marginBottom: "1.5rem",
  },
  stats: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1.2rem",
    color: "#8888aa",
  },
  addBar: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  mainInput: {
    flex: 1,
    padding: "0.7rem",
    background: "#13131a",
    border: "1px solid #2a2a3d",
    color: "#fff",
  },
  select: {
    background: "#13131a",
    color: "#fff",
  },
  addBtn: {
    background: "#7c5cfc",
    color: "#fff",
    border: "none",
    padding: "0.7rem",
    cursor: "pointer",
  },
  filterBar: {
    display: "flex",
    gap: "0.4rem",
    marginBottom: "1rem",
  },
  filterBtn: {
    border: "1px solid #2a2a3d",
    padding: "0.4rem 0.8rem",
    cursor: "pointer",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  todoItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    background: "#13131a",
    padding: "0.8rem",
  },
  checkbox: {
    cursor: "pointer",
  },
  todoText: {
    flex: 1,
  },
  editInput: {
    flex: 1,
    background: "#1c1c28",
    color: "#fff",
  },
  badge: {
    fontSize: "0.7rem",
    padding: "0.2rem 0.5rem",
  },
  actions: {
    display: "flex",
    gap: "0.3rem",
  },
  btnEdit: {
    cursor: "pointer",
  },
  btnSave: {
    cursor: "pointer",
  },
  btnDelete: {
    cursor: "pointer",
    color: "#ff6b81",
  },
  emptyMsg: {
    textAlign: "center",
    color: "#555",
  },
  clearBtn: {
    marginTop: "1rem",
    cursor: "pointer",
  },
};
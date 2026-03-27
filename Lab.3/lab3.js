import { useState } from "react";


// ============================================================
// REUSABLE INPUT COMPONENT
// ============================================================
function InputField({ label, type = "text", value, onChange, placeholder, error }) {
  return (
    <div style={styles.fieldWrapper}>
      {/* Field label */}
      <label style={styles.label}>{label}</label>

      {/* Input box */}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          ...styles.input,
          borderColor: error ? "#ff6b81" : "#2a2a3d", // highlight if error
        }}
      />

      {/* Error message */}
      {error && <p style={styles.errorText}>{error}</p>}
    </div>
  );
}


// ============================================================
// LOGIN COMPONENT
// ============================================================
function LoginForm({ onSwitch }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors]   = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Validation logic
  const validateForm = () => {
    const err = {};

    if (!email) {
      err.email = "Email cannot be empty.";
    } else if (!email.includes("@")) {
      err.email = "Invalid email format.";
    }

    if (!password) {
      err.password = "Password cannot be empty.";
    } else if (password.length < 6) {
      err.password = "Minimum 6 characters required.";
    }

    return err;
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const err = validateForm();

    if (Object.keys(err).length > 0) {
      setErrors(err);
      setIsSuccess(false);
    } else {
      setErrors({});
      setIsSuccess(true);
      console.log("Login Data:", { email, password });
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Welcome Back 👋</h2>
      <p style={styles.subtitle}>Sign in to continue</p>

      {isSuccess && (
        <div style={styles.successBox}>
          ✅ Successfully logged in (backend needed for real auth)
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@mail.com"
          error={errors.email}
        />

        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          error={errors.password}
        />

        <button type="submit" style={styles.button}>
          Sign In
        </button>
      </form>

      <p style={styles.switchText}>
        New here?{" "}
        <span style={styles.link} onClick={onSwitch}>
          Create account
        </span>
      </p>
    </div>
  );
}


// ============================================================
// REGISTRATION COMPONENT
// ============================================================
function RegisterForm({ onSwitch }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors]     = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle input updates dynamically
  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  // Validation
  const validateForm = () => {
    const err = {};

    if (!formData.fullName.trim()) {
      err.fullName = "Name is required.";
    }

    if (!formData.email) {
      err.email = "Email cannot be empty.";
    } else if (!formData.email.includes("@")) {
      err.email = "Invalid email.";
    }

    if (!formData.password) {
      err.password = "Password is required.";
    } else if (formData.password.length < 6) {
      err.password = "At least 6 characters required.";
    }

    if (!formData.confirmPassword) {
      err.confirmPassword = "Confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      err.confirmPassword = "Passwords must match.";
    }

    return err;
  };

  // Submit logic
  const handleSubmit = (e) => {
    e.preventDefault();

    const err = validateForm();

    if (Object.keys(err).length > 0) {
      setErrors(err);
      setIsSuccess(false);
    } else {
      setErrors({});
      setIsSuccess(true);
      console.log("Registration Data:", formData);
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Create Account ✨</h2>
      <p style={styles.subtitle}>Fill details to register</p>

      {isSuccess && (
        <div style={styles.successBox}>
          ✅ Registration successful! Please login.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <InputField
          label="Full Name"
          value={formData.fullName}
          onChange={handleChange("fullName")}
          placeholder="Your full name"
          error={errors.fullName}
        />

        <InputField
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange("email")}
          placeholder="example@mail.com"
          error={errors.email}
        />

        <InputField
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange("password")}
          placeholder="Minimum 6 characters"
          error={errors.password}
        />

        <InputField
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange("confirmPassword")}
          placeholder="Re-type password"
          error={errors.confirmPassword}
        />

        <button type="submit" style={styles.button}>
          Sign Up
        </button>
      </form>

      <p style={styles.switchText}>
        Already registered?{" "}
        <span style={styles.link} onClick={onSwitch}>
          Login
        </span>
      </p>
    </div>
  );
}


// ============================================================
// MAIN APP COMPONENT
// ============================================================
export default function App() {
  const [view, setView] = useState("login");

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.appTitle}>Authentication App</h1>
        <p style={styles.appSub}>Lab 3 — React State Demo</p>
      </div>

      {view === "login" ? (
        <LoginForm onSwitch={() => setView("register")} />
      ) : (
        <RegisterForm onSwitch={() => setView("login")} />
      )}
    </div>
  );
}


// ============================================================
// STYLES
// ============================================================
const styles = {
  page: {
    minHeight: "100vh",
    background: "#0a0a0f",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    fontFamily: "'Space Mono', monospace",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  appTitle: {
    color: "#7c5cfc",
    fontSize: "2rem",
    fontWeight: "bold",
  },
  appSub: {
    color: "#8888aa",
    fontSize: "0.85rem",
  },
  card: {
    background: "#13131a",
    border: "1px solid #2a2a3d",
    borderRadius: "12px",
    padding: "2rem",
    width: "100%",
    maxWidth: "420px",
  },
  title: {
    color: "#e8e8f0",
    fontSize: "1.4rem",
    fontWeight: 700,
  },
  subtitle: {
    color: "#8888aa",
    fontSize: "0.85rem",
    marginBottom: "1.5rem",
  },
  fieldWrapper: {
    marginBottom: "1rem",
  },
  label: {
    color: "#aaaacc",
    fontSize: "0.8rem",
  },
  input: {
    width: "100%",
    padding: "0.7rem",
    background: "#1c1c28",
    border: "1px solid #2a2a3d",
    borderRadius: "6px",
    color: "#fff",
  },
  errorText: {
    color: "#ff6b81",
    fontSize: "0.75rem",
  },
  button: {
    width: "100%",
    background: "#7c5cfc",
    color: "#fff",
    border: "none",
    padding: "0.8rem",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
  successBox: {
    background: "rgba(46,125,50,0.15)",
    border: "1px solid #2e7d32",
    color: "#81c784",
    padding: "0.7rem",
    borderRadius: "6px",
    marginBottom: "1rem",
  },
  switchText: {
    textAlign: "center",
    marginTop: "1rem",
    color: "#8888aa",
  },
  link: {
    color: "#7c5cfc",
    cursor: "pointer",
    textDecoration: "underline",
  },
};
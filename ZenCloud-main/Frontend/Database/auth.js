// DOM Elements
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const loginMessage = document.getElementById("login-message");
const registerMessage = document.getElementById("register-message");
const authStatus = document.getElementById("auth-status");

// ✅ Supabase credentials
const supabaseUrl = 'https://dydhzvpxtivejjobcygo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5ZGh6dnB4dGl2ZWpqb2JjeWdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNTEyOTYsImV4cCI6MjA2NjYyNzI5Nn0.3S18YbunafbZgqyHpTruyGzQmFZpImZeH6oc4g7cgUY';

// ✅ Initialize Supabase client
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Check authentication status on page load
document.addEventListener("DOMContentLoaded", () => {
  checkAuthStatus();
});

// Login function
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Use correct IDs for login form
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const { data, error } = await _supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      localStorage.setItem("authUser", JSON.stringify(data.user)); // Save user info
      showMessage(loginMessage, "Login successful! Redirecting...", "success");
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500);
    } catch (error) {
      showMessage(loginMessage, error.message, "error");
    }
  });
}

// Register function
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Use correct IDs for register form
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById("register-confirm-password").value;

    if (password !== confirmPassword) {
      showMessage(registerMessage, "Passwords do not match", "error");
      return;
    }

    try {
      const { data, error } = await _supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      showMessage(
        registerMessage,
        "Registration successful! Please check your email for verification.",
        "success"
      );
    } catch (error) {
      showMessage(registerMessage, error.message, "error");
    }
  });
}

// Check authentication status and update UI
async function checkAuthStatus() {
  const authLink = document.getElementById("auth-link");
  if (authLink) {
    const {
      data: { user },
    } = await _supabase.auth.getUser();

    if (user) {
      authLink.textContent = "Logout";
      authLink.href = "#";
      authLink.onclick = logout;
    } else {
      authLink.textContent = "Login";
      authLink.href = "login.html";
      authLink.onclick = null;
    }
  }
}

// Call checkAuthStatus whenever auth state changes
_supabase.auth.onAuthStateChange((event, session) => {
  checkAuthStatus();
});

// Logout function
async function logout() {
  try {
    const { error } = await _supabase.auth.signOut();
    if (error) throw error;
    localStorage.removeItem("authUser"); // Clear user info
    window.location.href = "login.html";
  } catch (error) {
    console.error("Logout error:", error);
  }
}

// Helper function to show messages
function showMessage(element, message, type) {
  element.textContent = message;
  element.className = type; // Only set 'success' or 'error'
}

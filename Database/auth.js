// DOM Elements
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const loginMessage = document.getElementById("login-message");
const registerMessage = document.getElementById("register-message");
const authStatus = document.getElementById("auth-status");

// Initialize Supabase client (moved after DOM elements)
const _supabase = supabase.createClient(
  "https://pieoyxjtsurrfoyqutih.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpZW95eGp0c3VycmZveXF1dGloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4Njg0MzgsImV4cCI6MjA1OTQ0NDQzOH0.l-5CRT6pAtWFTArooS6Kq172x_E1uB_58NseZCrp-Uw"
);

// Check authentication status on page load
document.addEventListener("DOMContentLoaded", () => {
  checkAuthStatus();
});

// Login function
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

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
        window.location.href = "index.html";
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

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

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
  const {
    data: { user },
  } = await _supabase.auth.getUser();
  const authLink = document.getElementById("auth-link");
  // Removed profile elements as requested

  if (user) {
    // User is logged in - show logout button
    if (authLink) {
      authLink.textContent = "Logout";
      authLink.href = "#";
      authLink.onclick = logout;
    }
  } else {
    // User is logged out - show login button
    if (authLink) {
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
  element.className = `message ${type}`;
}

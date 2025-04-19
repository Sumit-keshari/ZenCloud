// DOM Elements
const logOutput = document.getElementById("log-output");
const startHostingBtn = document.getElementById("start-hosting-btn");
const hostPrompt = document.getElementById("host-prompt");

// Dummy logs for hosting initialization
const logs = [
  "Initializing server...",
  "Allocating resources...",
  "Connecting to the network...",
  "Setting up environment variables...",
  "Deploying application...",
  "Starting services...",
  "Server hosted successfully! 🎉",
];

// Function to simulate auto-writing logs
function writeLogs() {
  let index = 0;
  hostPrompt.textContent = "Hosting in progress...";
  logOutput.textContent = ""; // Clear previous logs

  const interval = setInterval(() => {
    if (index < logs.length) {
      logOutput.textContent += logs[index] + "\n";
      logOutput.scrollTop = logOutput.scrollHeight; // Auto-scroll to the bottom
      index++;
    } else {
      clearInterval(interval);
      hostPrompt.textContent = "Your server is now live!";
      startHostingBtn.textContent = "Restart Hosting";

      // Redirect to dashboard after 5 seconds
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 5000);
    }
  }, 1000);
}

// Event listener for the start hosting button
startHostingBtn.addEventListener("click", writeLogs);

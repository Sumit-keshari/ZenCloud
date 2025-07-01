// DOM Elements
const logOutput = document.getElementById("log-output");

// Fake Logs for Server Initialization
const logs = [
  "Initializing server...",
  "Allocating resources...",
  "Connecting to the network...",
  "Setting up environment variables...",
  "Deploying application...",
  "Starting services...",
  "Server started successfully! 🎉",
];

// Function to Simulate Auto-Writing Logs
function writeLogs() {
  let index = 0;
  logOutput.textContent = ""; // Clear previous logs

  const interval = setInterval(() => {
    if (index < logs.length) {
      logOutput.textContent += logs[index] + "\n";
      logOutput.scrollTop = logOutput.scrollHeight; // Auto-scroll to the bottom
      index++;
    } else {
      clearInterval(interval);

      // Redirect to the provided link after 5 seconds
      setTimeout(() => {
        window.location.href = "https://win11.blueedge.me/";
      }, 3000);
    }
  }, 1000);
}

// Start Writing Logs on Page Load
document.addEventListener("DOMContentLoaded", writeLogs);

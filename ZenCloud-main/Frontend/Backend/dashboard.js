// Get plan details from localStorage
const plan = localStorage.getItem("paidPlan") || "beginner";
const price = localStorage.getItem("paidPrice") || "99";
const expiryDate = new Date();
expiryDate.setDate(expiryDate.getDate() + 30);

document.getElementById("dashboard-plan").textContent = `Plan: ${
  plan.charAt(0).toUpperCase() + plan.slice(1)
}`;
document.getElementById(
  "dashboard-price"
).textContent = `Amount Paid: ₹${price}`;
document.getElementById(
  "dashboard-expiry"
).textContent = `Expiry Date: ${expiryDate.toDateString()}`;

// Simulate usage statistics
const storageUsed = 25; // Example value
const totalStorage = 50; // Example value
const usagePercentage = (storageUsed / totalStorage) * 100;

document.getElementById("storage-used").textContent = `${storageUsed}GB`;
document.getElementById("storage-progress").style.width = `${usagePercentage}%`;

// Your Server Button Logic
const yourServerBtn = document.getElementById("your-server-btn");

// Define server links for each plan
const serverLinks = {
  beginner: "https://vivek9patel.github.io/",
  pro: "https://www.macos-web.app/",
  enterprise: "https://win11.blueedge.me/",
};

// Check if the user has an active plan
if (plan in serverLinks) {
  yourServerBtn.style.display = "block"; // Show the button
  yourServerBtn.addEventListener("click", () => {
    const link = serverLinks[plan];
    const win = window.open(link, "_blank");
    win.document.body.requestFullscreen(); // Open in fullscreen mode
  });
}

// Check if the user has an active plan or custom plan
const serverLink = localStorage.getItem("serverLink");
if (serverLink) {
  yourServerBtn.style.display = "block"; // Show the button
  yourServerBtn.addEventListener("click", () => {
    const win = window.open(serverLink, "_blank");
    win.document.body.requestFullscreen(); // Open in fullscreen mode
  });
}

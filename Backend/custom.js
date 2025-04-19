// DOM Elements
const ramSelect = document.getElementById("ram");
const storageSlider = document.getElementById("storage");
const storageValue = document.getElementById("storage-value");
const storagePrice = document.getElementById("storage-price");
const cpuSelect = document.getElementById("cpu");
const totalPriceElement = document.getElementById("total-price");
const orderButton = document.getElementById("order-btn");

// Pricing logic
const ramPrices = { 4: 200, 8: 400, 16: 800 };
const storagePricePerGB = 1; // ₹1 per GB
const cpuPrices = { 2: 300, 4: 600, 8: 1200 };

// Update storage value and price dynamically
storageSlider.addEventListener("input", () => {
  const storage = storageSlider.value;
  storageValue.textContent = `${storage}GB`;
  storagePrice.textContent = storage * storagePricePerGB;
  updateTotalPrice();
});

// Update total price dynamically
function updateTotalPrice() {
  const ramPrice = ramPrices[ramSelect.value];
  const storageCost = storageSlider.value * storagePricePerGB;
  const cpuPrice = cpuPrices[cpuSelect.value];
  const totalPrice = ramPrice + storageCost + cpuPrice;
  totalPriceElement.textContent = totalPrice;
}

// Add event listeners to update total price on changes
ramSelect.addEventListener("change", updateTotalPrice);
cpuSelect.addEventListener("change", updateTotalPrice);

// Define server links for each OS
const osLinks = {
  windows: "https://win11.blueedge.me/",
  mac: "https://www.macos-web.app/",
  linux: "https://vivek9patel.github.io/",
};

// Check if the user is logged in
function checkAuthentication() {
  const user = localStorage.getItem("authUser"); // Replace with your authentication logic
  if (!user) {
    alert("You must log in to purchase a plan.");
    window.location.href = "login.html"; // Redirect to login page
    return false;
  }
  return true;
}

// Handle order button click
orderButton.addEventListener("click", () => {
  if (!checkAuthentication()) return; // Ensure the user is logged in

  const selectedPlan = {
    ram: `${ramSelect.value}GB`,
    storage: `${storageSlider.value}GB`,
    cpu: `${cpuSelect.value} Cores`,
    os: document.getElementById("os").value,
    price: totalPriceElement.textContent,
  };

  // Save the custom plan and server link to localStorage
  localStorage.setItem("customPlan", JSON.stringify(selectedPlan));
  localStorage.setItem("serverLink", osLinks[selectedPlan.os]);

  // Redirect to payment page
  window.location.href = `payment.html?plan=custom&price=${selectedPlan.price}`;
});

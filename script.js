console.log("Dashboard Shell loaded.");
//step 2
const appName = "Dashboard Shell";
let userCount = 128;

function formatCurrency(amount) {
  return "Rp" + amount.toLocaleString("id-ID");
}
console.log(appName, " Total users: ", userCount);
console.log(formatCurrency(4210000));

//step 3
const statUsers = document.querySelector("#stat-users");
const statTransactions = document.querySelector("#stat-transactions");
const statAverage = document.querySelector("#stat-average");

console.log(statUsers, statTransactions, statAverage);

//step 4
function displayData() {
  statUsers.textContent = userCount;
  statTransactions.textContent = 45;
  statAverage.textContent = formatCurrency(4210000);
}
displayData();

//step 5 (toggle menu open when click on menu toggle button)
const menuToggle = document.querySelector("#menu-toggle");
const sidebar = document.querySelector("#sidebar");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("sidebar-open");
});

//toggle menu close when click outside
document.addEventListener("click", (event) => {
  const isClickInsideSidebar = sidebar.contains(event.target);
  const isClickOnToggle = menuToggle.contains(event.target);

  if (
    sidebar.classList.contains("sidebar-open") &&
    !isClickInsideSidebar &&
    !isClickOnToggle
  ) {
    sidebar.classList.remove("sidebar-open");
  }
});

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((navLink) => {
  navLink.addEventListener("click", (event) => {
    navLinks.forEach((l) => l.classList.remove("active"));
    event.currentTarget.classList.add("active");
  });
});

//step 6
const btnRefresh = document.querySelector("#btn-refresh");

btnRefresh.addEventListener("click", () => {
  userCount = Math.floor(Math.random() * 500);
  displayData();
});

//step 7
// Step 7
const visitorNameInput = document.querySelector("#visitor-name");
const greetingOutput = document.querySelector("#greeting-output");

// UNSAFE — innerHTML akan mengeksekusi tag/script apa pun yang ada di dalam input
document.querySelector("#btn-greet-unsafe").addEventListener("click", () => {
  greetingOutput.innerHTML = "Hello, " + visitorNameInput.value + "!";
});

// SAFE — textContent memperlakukan input sebagai teks biasa
document.querySelector("#btn-greet-safe").addEventListener("click", () => {
  greetingOutput.textContent = "Hello, " + visitorNameInput.value + "!";
});

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

//session 4
async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  console.log(users);
  return users;
}

const stateLoading = document.querySelector("#state-loading");
const stateEmpty = document.querySelector("#state-empty");
const stateError = document.querySelector("#state-error");
const userList = document.querySelector("#user-list");

function showState(state) {
  stateLoading.hidden = state !== "loading";
  stateEmpty.hidden = state !== "empty";
  stateError.hidden = state !== "error";
  userList.hidden = state !== "success";
}

function renderUsers(data) {
  userList.textContent = "";
  data.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = user.name + "_" + user.email;
    userList.appendChild(li);
  });
}
async function loadUsers(query = "") {
  showState("loading");
  try {
    const url =
      "https://jsonplaceholder.typicode.com/users" +
      (query ? "?username=" + encodeURIComponent(query) : "");
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("HTTP status: " + response.status);
    }
    const data = await response.json();
    if (data.length === 0) {
      showState("empty");
      return;
    }
    renderUsers(data);
    showState("success");
  } catch (error) {
    console.error("failed to load data:", error);
    showState("error");
  }
}

document.querySelector("#btn-load-users").addEventListener("click", () => {
  loadUsers();
});

document
  .querySelector("#search-username")
  .addEventListener("input", (event) => {
    loadUsers(event.target.value.trim());
  });

async function loadUserbroken() {
  showState("loading");
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/no-such-user",
    );
    if (!response.ok) {
      throw new Error("HTTP status: " + response.status);
    }
    const data = await response.json();
    renderUsers(data);
    showState("success");
  } catch (error) {
    console.error("failed to load data:", error);
    showState("error");
  }
}

document.querySelector("#btn-simulate-error").addEventListener("click", () => {
  loadUserbroken();
});

document.querySelector("#btn-cors-demo").addEventListener("click", async () => {
  showState("loading");
  try {
    const response = await fetch("https://www.google.com");
    constdata = await response.text();
    console.log(data);
    showState("success");
  } catch (error) {
    console.error("Failed (likely CORS)", error);
    showState("error");
  }
});

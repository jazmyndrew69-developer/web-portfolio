const toggleBtn = document.getElementById("toggle-btn");
const toggleWord = document.getElementById("toggle-word");

let isDeveloper = true;

toggleBtn.addEventListener("click", () => {
  isDeveloper = !isDeveloper;
  toggleWord.textContent = isDeveloper ? "Developer" : "Designer";
  toggleBtn.textContent = isDeveloper ? "Switch to Designer" : "Switch to Developer";
});



const toggleBtn = document.getElementById("toggle-btn");
const toggleWord = document.getElementById("toggle-word");

let showingDeveloper = true;

toggleBtn.addEventListener("click", () => {
  if (showingDeveloper) {
    toggleWord.textContent = "Designer";
    toggleBtn.textContent = "Switch to Developer";
  } else {
    toggleWord.textContent = "Developer";
    toggleBtn.textContent = "Switch to Designer";
  }
  showingDeveloper = !showingDeveloper;
});



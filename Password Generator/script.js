let inputSlider = document.getElementById("inputSlider");
let sliderValue = document.getElementById("sliderValue");
let passBox = document.getElementById("passBox");
let lowercase = document.getElementById("lowercase");
let uppercase = document.getElementById("uppercase");
let numbers = document.getElementById("numbers");
let symbols = document.getElementById("symbols");
let genBtn = document.getElementById("genBtn");
let copyBtn = document.getElementById("copyBtn");

// shows value initially set
sliderValue.textContent = inputSlider.value;

// shows value as slider value changes
inputSlider.addEventListener("input", () => {
  sliderValue.textContent = inputSlider.value;
});

genBtn.addEventListener("click", () => {
  passBox.value = generatePassword();
});

let allUpperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let allLowerChars = "abcdefghijklmnopqrstuvwxyz";
let allNumbers = "0123456789";
let allSymbols = "\\\"!#$%&'()*+,-./:;<=>?@[]^_{|}~";

function generatePassword() {
  let genPassword = "";

  let allChars = "";

  allChars += lowercase.checked ? allLowerChars : "";
  allChars += uppercase.checked ? allUpperChars : "";
  allChars += numbers.checked ? allNumbers : "";
  allChars += symbols.checked ? allSymbols : "";

  if (allChars == "" || allChars.length == 0) {
    return genPassword;
  }

  // Math.random() generates a decimal value between 0 & 1 only
  // Math.random() * allUpperChars.length generates a decimal value value between 1 & 26 only
  // Math.floor remove decimal
  // allUpperChars.charAt will show corresponding letter to that number

  for (let i = 1; i <= inputSlider.value; i++) {
    genPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }
  return genPassword;
}

copyBtn.addEventListener("click", () => {
  if (passBox.value != "" || passBox.value >= 1) {
    navigator.clipboard.writeText(passBox.value);

    copyBtn.innerText = "check"; // to tick
    copyBtn.title = "Password Copied";

    setTimeout(() => {
      copyBtn.innerText = "content_copy"; // back to icon
      copyBtn.title = "";
    }, 3000); // remove copyBtn after 3s
  }
});

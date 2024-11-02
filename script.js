// colourflipper
const body = document.getElementsByTagName("body")[0];

function setcolour(col) {
  body.style.backgroundColor = col;
}

function randGradient() {
  const color1 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  const color2 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  body.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
}

// stopwatch
let secondselapsed = 0;
let interval = null;
const time = document.getElementById("time");

function setTime() {
  const hours = Math.floor(secondselapsed / 3600);
  const minutes = Math.floor((secondselapsed % 3600) / 60);
  const seconds = secondselapsed % 60;
  time.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function timer() {
  secondselapsed++;
  setTime();
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function startclock() {
  if (interval) stopclock();
  interval = setInterval(timer, 1000);
}

function stopclock() {
  clearInterval(interval);
}

function resetclock() {
  stopclock();
  secondselapsed = 0;
  setTime();
}

//todo list
let items = [];
const itemsdiv = document.getElementById("items");
const input = document.getElementById("iteminput");
const storagek = "items";

function renderitems() {
  itemsdiv.innerHTML = null;
  
  for (const [idx, item] of Object.entries(items)) {
    const container = document.createElement("div");
    container.style.marginBottom = "10px";
    const text = document.createElement("p");
    text.style.display = "inline";
    text.textContent = item;
    text.style.marginRight = "10px";
    const button = document.createElement("button");
    button.textContent = "Delete";
    button.onclick = () => removeitem(idx);
    container.appendChild(text);
    container.appendChild(button);

    itemsdiv.appendChild(container);
  }
}

function loaditem() {
  const olditems = localStorage.getItem(storagek);
  if (olditems) {
    items = JSON.parse(olditems);
    renderitems();
  }
}

function additem() {
  const value = input.value;
  if (!value) {
    alert("you cannot add an empty item");
    return;
  }
  items.push(value);
  renderitems();
  input.value = "";
  saveitem();
}

function removeitem(idx) {
  items.splice(idx, 1);
  renderitems();
  saveitem();
}

function saveitem() {
  const stringi = JSON.stringify(items);
  localStorage.setItem(storagek, stringi);
}

// Random Quote Functionality
const quotes = [
  "The best way to predict the future is to create it.",
  "You miss 100% of the shots you don't take.",
  "Life is what happens when you're busy making other plans.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "The only way to do great work is to love what you do -Steve Jobs",
            "Believe you can and you're halfway there. – Theodore Roosevelt",
            "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. – Albert Schweitzer",
            "Your limitation—it's only your imagination.",
            "Push yourself, because no one else is going to do it for you.",
            "Great things never come from comfort zones.",
            "Dream it. Wish it. Do it.",
            "Success doesn’t just find you. You have to go out and get it.",
            "The harder you work for something, the greater you’ll feel when you achieve it.",
            "Don’t stop when you’re tired. Stop when you’re done."
];

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function displayQuote() {
  const quoteElement = document.getElementById('quote');
  quoteElement.innerText = getRandomQuote();
}

function setBackgroundImage(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    body.style.backgroundImage = `url(${e.target.result})`;
    body.style.backgroundSize = 'cover'; // Cover the entire background
    body.style.backgroundPosition = 'center'; // Center the image
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}

// Call displayQuote when the page loads
document.addEventListener("DOMContentLoaded", () => {
  loaditem();
  displayQuote(); // Display a random quote on load
});
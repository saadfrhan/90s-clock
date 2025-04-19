const MODES = {
  CLOCK: "clock",
  ABSURD: "absurd",
  MILITARY: "military",
};

const CLOCK_EMOJIS = [
  "🕛",
  "🕐",
  "🕑",
  "🕒",
  "🕓",
  "🕔",
  "🕕",
  "🕖",
  "🕗",
  "🕘",
  "🕙",
  "🕚",
];
const ABSURD_EMOJIS = [
  "🤪",
  "😜",
  "😝",
  "🤯",
  "🤬",
  "🤡",
  "👹",
  "👺",
  "👻",
  "💩",
];

let currentMode = MODES.CLOCK;
const switchButton = document.getElementById("switch");

const timeElement = document.querySelector("#time");
const messageElement = document.getElementById("message");

const padStart = (number) => number.toString().padStart(2, "0");

const getCurrentEmoji = (hour) => {
  const hourIndex = hour % 12;
  return currentMode === MODES.CLOCK
    ? CLOCK_EMOJIS[hourIndex]
    : ABSURD_EMOJIS[hourIndex % ABSURD_EMOJIS.length];
};

const getDynamicMessage = (hour) => {
  if (hour < 5) return "🌙 GO TO BED";
  if (hour < 12) return "☕ WAKE UP";
  if (hour === 12) return "🍔 EAT LUNCH";
  if (hour > 17) return "🍵 TEA TIME";
  return "⌛ WHY ARE YOU NOT CODING?";
};

const updateClock = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  let timeString = "";
  if (currentMode === MODES.MILITARY) {
    timeString = `${padStart(hours)}:${padStart(minutes)}`;
  } else {
    const displayHours = hours % 12 || 12;
    const amPm = hours >= 12 ? "PM" : "AM";
    timeString = `${padStart(displayHours)}:${padStart(
      minutes
    )} ${amPm} ${getCurrentEmoji(hours)}`;
  }

  timeElement.innerHTML = timeString;
  messageElement.textContent = getDynamicMessage(hours);
};

switchButton.addEventListener("click", () => {
  if (currentMode === MODES.CLOCK) {
    currentMode = MODES.ABSURD;
    switchButton.textContent = "Absurd Mode";
  } else if (currentMode === MODES.ABSURD) {
    currentMode = MODES.MILITARY;
    switchButton.textContent = "Military Time";
  } else {
    currentMode = MODES.CLOCK;
    switchButton.textContent = "Clock Emojis";
  }
});

setInterval(updateClock, 1000);
updateClock(); // Initial call

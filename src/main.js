setInterval(() => {
  const now = new Date();
  document.querySelector("#time").innerHTML = now.toLocaleTimeString();
}, 1000);

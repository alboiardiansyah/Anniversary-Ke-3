document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("sendBtn");
  const messageContainer = document.getElementById("messageContainer");
  const floatingLeaves = document.getElementById("floatingLeaves");

  // Fungsi mengirim pesan
  sendBtn.addEventListener("click", () => {
    let messageText = document.getElementById("loveMessage").value.trim();

    if (messageText !== "") {
      let messageBox = document.createElement("div");
      messageBox.classList.add("message-box");
      messageBox.innerText = messageText;
      messageContainer.appendChild(messageBox);
      document.getElementById("loveMessage").value = ""; // Reset textarea

      // Efek daun setelah mengirim pesan
      let leaf = document.createElement("div");
      leaf.classList.add("leaf");
      leaf.style.left = Math.random() * 100 + "vw";
      floatingLeaves.appendChild(leaf);
      setTimeout(() => leaf.remove(), 4000);
    }
  });

  // Efek daun terus-menerus
  setInterval(() => {
    let leaf = document.createElement("div");
    leaf.classList.add("leaf");
    leaf.style.left = Math.random() * 100 + "vw";
    floatingLeaves.appendChild(leaf);
    setTimeout(() => leaf.remove(), 4000);
  }, 500);
});

document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("sendBtn");
  const messageContainer = document.getElementById("messageContainer");
  const darkModeBtn = document.getElementById("darkModeBtn");
  const body = document.body;
  const bgMusic = document.getElementById("bgMusic");

  // Fungsi mengirim pesan
  sendBtn.addEventListener("click", () => {
    let messageText = document.getElementById("loveMessage").value.trim();

    if (messageText !== "") {
      let messageBox = document.createElement("div");
      messageBox.classList.add("message-box");
      messageBox.innerText = messageText;
      messageContainer.appendChild(messageBox);
      document.getElementById("loveMessage").value = ""; // Reset textarea
    }
  });

  // Mode Gelap & Terang
  darkModeBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    darkModeBtn.textContent = body.classList.contains("dark-mode") ? "☀️ Mode Terang" : "🌙 Mode Gelap";
  });

  // Otomatis mainkan musik saat halaman dimuat
  bgMusic.volume = 0.5;
  bgMusic.play();
});
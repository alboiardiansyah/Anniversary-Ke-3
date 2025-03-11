document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("nav-active");
        menuToggle.classList.toggle("active");
    });

    // Menutup menu saat link diklik (untuk pengalaman yang lebih baik di mobile)
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("nav-active");
            menuToggle.classList.remove("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const galleryGrid = document.getElementById("galleryGrid");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeLightbox = document.querySelector(".lightbox .close");
  const musicBtn = document.getElementById("musicBtn");
  const bgMusic = document.getElementById("bgMusic");
  const floatingHearts = document.getElementById("floatingHearts");


  // Data gambar dan kutipan romantis
  const images = [
    { src: "gasibu.jpg", quote: "Cinta sejati tak akan pernah pudar." },
    { src: "Malioboro.jpg", quote: "Bersamamu, setiap detik terasa abadi." },
    { src: "kobapo.jpg", quote: "Cinta adalah bunga yang harus dirawat." }
  ];

  // Tambahkan gambar ke galeri
  images.forEach(imgData => {
    let img = document.createElement("img");
    img.src = imgData.src;
    img.classList.add("lazy-loaded");
    img.addEventListener("click", () => openLightbox(imgData.src, imgData.quote));
    galleryGrid.appendChild(img);
  });

  // Fungsi buka lightbox
  function openLightbox(src, quote) {
    lightbox.style.display = "flex";
    lightboxImg.src = src;
    lightboxCaption.innerText = quote;
  }

  // Tutup lightbox
  closeLightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  // Fungsi Play/Pause Musik
  musicBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicBtn.innerText = "🔇 Pause Music";
    } else {
      bgMusic.pause();
      musicBtn.innerText = "🎵 Play Music";
    }
  });

  // Efek hati mengambang
  setInterval(() => {
    let heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * 100 + "vw";
    floatingHearts.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }, 500);
});
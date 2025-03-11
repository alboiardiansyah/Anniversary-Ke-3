document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi peta dan set view awal
  var map = L.map('map').setView([-6.200000, 106.816666], 13);

  // Tambahkan tile layer dari OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Data perjalanan: setiap objek memiliki koordinat, judul, deskripsi, dan gambar
  var journeyPoints = [
    { coords: [-6.208763, 106.845599], title: "Monas", description: "Monumen Nasional di Jakarta.", image: "assets/images/monas.jpg" },
    { coords: [-6.175392, 106.827153], title: "Kota Tua", description: "Kawasan bersejarah Jakarta.", image: "assets/images/kota_tua.jpg" },
    { coords: [-6.186486, 106.822746], title: "Ancol", description: "Pantai dan taman hiburan.", image: "assets/images/ancol.jpg" },
    { coords: [-6.227778, 106.808333], title: "Taman Mini", description: "Taman budaya Indonesia.", image: "assets/images/tmii.jpg" }
  ];

  // Tambahkan marker lokasi untuk setiap titik (marker ini tetap)
  journeyPoints.forEach(point => {
    L.marker(point.coords).addTo(map)
      .bindPopup(`<h3>${point.title}</h3><p>${point.description}</p>`);
  });

  // Buat marker motor dengan custom icon menggunakan divIcon
  var motorIcon = L.divIcon({
    className: 'custom-motor-icon',
    html: `<img src="assets/images/motorbike.png" style="width:40px; height:40px;">`,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });

  // Tambahkan marker motor di titik awal
  var motorMarker = L.marker(journeyPoints[0].coords, { icon: motorIcon }).addTo(map);

  // Variabel kontrol animasi
  let i = 0;
  let moving = false;
  let interval;

  // Fungsi animasi pergerakan motor dengan interpolasi (gerakan halus)
  function animateMotor() {
    if (!moving) return;
    if (i >= journeyPoints.length - 1) return;

    let start = journeyPoints[i].coords;
    let end = journeyPoints[i + 1].coords;
    let steps = 100; // Jumlah langkah untuk transisi yang lebih smooth
    let stepCount = 0;
    let latStep = (end[0] - start[0]) / steps;
    let lngStep = (end[1] - start[1]) / steps;

    interval = setInterval(() => {
      if (!moving) {
        clearInterval(interval);
        return;
      }

      let newLat = start[0] + (latStep * stepCount);
      let newLng = start[1] + (lngStep * stepCount);
      
      // Pindahkan marker motor ke koordinat baru
      motorMarker.setLatLng([newLat, newLng]);
      // Kamera mengikuti marker motor
      map.panTo([newLat, newLng], { animate: true });
      
      // Hitung dan terapkan rotasi pada marker motor saja
      let angle = Math.atan2(latStep, lngStep) * (180 / Math.PI);
      if (motorMarker.getElement()) {
        motorMarker.getElement().style.transform = `rotate(${angle}deg)`;
      }

      stepCount++;
      if (stepCount >= steps) {
        clearInterval(interval);
        // Tampilkan modal informasi lokasi untuk titik berikutnya
        showModal(journeyPoints[i + 1].title, journeyPoints[i + 1].description, journeyPoints[i + 1].image);
        i++;
        // Jangan lanjut animasi otomatis; tunggu aksi pengguna (misalnya klik Resume)
      }
    }, 50);
  }

  // Fungsi untuk menampilkan modal dengan efek fade
  function showModal(title, description, imageUrl) {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalDescription").innerText = description;
    document.getElementById("modalImage").src = imageUrl;
    document.getElementById("locationModal").classList.add("show");
  }

  // Fungsi untuk menutup modal
  function closeModal() {
    document.getElementById("locationModal").classList.remove("show");
  }

  // Event untuk tombol close modal (ikon "X")
  document.querySelector(".close").addEventListener("click", closeModal);
  // Tutup modal saat klik di luar modal
  window.addEventListener("click", (event) => {
    if (event.target == document.getElementById("locationModal")) {
      closeModal();
    }
  });

  // Tombol Start: mulai animasi dari awal
  document.getElementById("startBtn").addEventListener("click", () => {
    moving = true;
    i = 0;
    animateMotor();
  });

  // Tombol Pause: hentikan animasi
  document.getElementById("pauseBtn").addEventListener("click", () => {
    moving = false;
    clearInterval(interval);
  });

  // Tombol Resume: lanjutkan animasi
  document.getElementById("resumeBtn").addEventListener("click", () => {
    if (!moving) {
      moving = true;
      animateMotor();
    }
  });

  // Tombol Reset: kembalikan ke titik awal dan tutup modal
  document.getElementById("resetBtn").addEventListener("click", () => {
    i = 0;
    moving = false;
    clearInterval(interval);
    motorMarker.setLatLng(journeyPoints[0].coords);
    map.setView(journeyPoints[0].coords, 13);
    closeModal();
  });
});
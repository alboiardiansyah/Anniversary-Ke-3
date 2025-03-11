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
document.addEventListener('DOMContentLoaded', () => {
    // 1. Dinamis Copyright Tahun di Footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Navbar Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Hamburger Menu Toggle untuk Mobile
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburgerBtn.classList.toggle('open');
        });

        // Tutup menu saat link diklik
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburgerBtn.classList.remove('open');
            });
        });
    }

    // 4. Intersection Observer untuk Animasi Fade-Up
    const fadeElements = document.querySelectorAll('.fade-up');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // 5. Filter Kategori Galeri
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Hapus kelas active dari semua tombol
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });
});

// 6. Lightbox Galeri Interaktif
let currentImageIndex = 0;
const galleryData = [
    { src: 'images/pasus-pramuka.jpeg', caption: 'Seragam Pramuka: Ikatan Kebersamaan' },
    { src: 'images/pasus-kebersamaan.jpeg', caption: 'Kekompakan: Satu Lingkaran, Satu Keluarga' },
    { src: 'images/foto-lainnya.jpeg', caption: 'Aktivitas Lapangan: Langkah dan Perjuangan' },
    { src: 'images/pasus-putih-1.jpeg', caption: 'Seragam Putih: Kebersamaan dalam Putih' },
    { src: 'images/pasus-group-2.jpeg', caption: 'Kekompakan: Keluarga Besar' },
    { src: 'images/pasus-group-1.jpeg', caption: 'Aktivitas Lapangan: Solidaritas Tanpa Batas' }
];

function openLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');

    // Cari indeks gambar yang diklik
    currentImageIndex = galleryData.findIndex(item => item.src === src);
    if (currentImageIndex === -1) currentImageIndex = 0;

    lightboxImg.src = galleryData[currentImageIndex].src;
    lightboxCaption.textContent = galleryData[currentImageIndex].caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeSlide(direction) {
    currentImageIndex += direction;
    if (currentImageIndex >= galleryData.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryData.length - 1;
    }

    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    lightboxImg.src = galleryData[currentImageIndex].src;
    lightboxCaption.textContent = galleryData[currentImageIndex].caption;
}

// Navigasi Keyboard (Escape & Arrow Keys)
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        } else if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        }
    }
});

// 7. Tombol Kembali ke Atas
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
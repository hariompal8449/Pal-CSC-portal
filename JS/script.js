// 🌐 Global Functions (HTML ke onclick attributes ke liye zaroori hain)
function toggleSidebar() {
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    
    if (sideMenu) {
        sideMenu.classList.toggle('open');
    }
    if (menuOverlay) {
        menuOverlay.classList.toggle('active');
    }
}

function toggleSubMenu() {
    const subMenu = document.getElementById('subMenuList');
    const icon = document.getElementById('dropdownIcon');
    
    if (subMenu) {
        subMenu.classList.toggle('open');
        subMenu.classList.toggle('show'); // Dono classes support karega
        
        if (icon) {
            if (subMenu.classList.contains('open') || subMenu.classList.contains('show')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        }
    }
}

// 🔝 Smooth Scroll to Top Function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 🔝 Show / Hide Back to Top Button on Scroll
window.onscroll = function () {
    const topBtn = document.getElementById("backToTopBtn");
    if (topBtn) {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    }
};

// ⚡ DOM Content Loaded - Saare Event Listeners ke liye
document.addEventListener('DOMContentLoaded', function () {

    // 1. Sidebar & Overlay Click Events
    const menuToggleBtn = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');

    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleSidebar();
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', toggleSidebar);
    }

    // 2. Dark Mode & State Persistence Logic
    const themeToggleMenu = document.getElementById('themeToggleMenu');
    const themeMenuText = document.getElementById('themeMenuText');

    // Page load hote hi check karein ki pehle se dark mode on tha ya nahi
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeMenuText) {
            themeMenuText.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
        }
    }

    // Dark mode button click event
    if (themeToggleMenu) {
        themeToggleMenu.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark'); // Save state
                if (themeMenuText) {
                    themeMenuText.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
                }
            } else {
                localStorage.setItem('theme', 'light'); // Save state
                if (themeMenuText) {
                    themeMenuText.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode';
                }
            }
        });
    }

    // 3. Live Search Filter Logic
    const mainSearchInput = document.getElementById('searchInput') || document.getElementById('service-search');
    if (mainSearchInput) {
        mainSearchInput.addEventListener('keyup', function () {
            let value = this.value.toLowerCase();
            let cards = document.querySelectorAll('.card');

            cards.forEach(card => {
                let cardTitle = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
                if (cardTitle.includes(value)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

});
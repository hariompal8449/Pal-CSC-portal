// यह सुनिश्चित करता है कि HTML लोड होने के बाद ही कोड काम करे
document.addEventListener('DOMContentLoaded', function () {

    // 1. Sidebar Toggle Logic
    const menuToggleBtn = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    function toggleSidebar() {
        if (sideMenu && menuOverlay) {
            sideMenu.classList.toggle('open');
            menuOverlay.classList.toggle('active');
        }
    }

    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleSidebar();
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', toggleSidebar);
    }

 document.addEventListener('DOMContentLoaded', function () {
    const themeToggleMenu = document.getElementById('themeToggleMenu');
    const themeMenuText = document.getElementById('themeMenuText');

    // Page load par text aur icon set karna
    if (document.body.classList.contains('dark-theme')) {
        if (themeMenuText) {
            themeMenuText.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
        }
    }

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
});
    // 3. Live Search Filter
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

// Global Function for Submenu (More Accordion)
function toggleSubMenu() {
    const subMenu = document.getElementById('subMenuList');
    const icon = document.getElementById('dropdownIcon');
    if (subMenu) {
        subMenu.classList.toggle('show');
        if (icon) {
            if (subMenu.classList.contains('show')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        }
    }
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

// 🔝 Smooth Scroll to Top Function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

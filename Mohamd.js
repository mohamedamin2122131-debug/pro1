const headerElement = document.getElementById("header");

if (headerElement) {
    window.addEventListener("scroll", () => {
        // الحصول على قيمة التمرير من documentElement أو body في حال عدم وجود قيمة في documentElement
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        if (scrollTop >= 20) {
            headerElement.style.boxShadow = "0px 0px 20px #0000008a";
            headerElement.style.borderBottomRightRadius = "10px";
            headerElement.style.borderBottomLeftRadius = "10px";
            headerElement.style.backgroundColor = "var(--bg)";
        } else {
            headerElement.style.boxShadow = "none";
            headerElement.style.borderBottomRightRadius = "0px";
            headerElement.style.borderBottomLeftRadius = "0px";
            headerElement.style.backgroundColor = "transparent";
        }
    });
}



// =============================================================================================

document.addEventListener("DOMContentLoaded", function () {
    // تفعيل الفلترة الافتراضية
    document.querySelector(".filter-btn[data-filter='all']")?.click();

    // تجميع العناصر الرئيسية
    const searchInput = document.getElementById("search-input");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const navLinks = document.querySelector(".nav-links");
    const body = document.body;
    const contactForm = document.getElementById("contact-form");
    const contactMessage = document.getElementById("contact-message");
    const themeToggle = document.getElementById("theme-toggle");
    const mobileThemeToggle = document.querySelector(".mobile-menu .theme-toggle");
    const floatingElements = document.querySelectorAll(".floating");
    const modal = document.querySelector(".project-modal");
    const closeBtn = document.querySelector(".modal-close");

    // وظيفة البحث داخل بطاقات المشاريع
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const searchTerm = e.target.value.toLowerCase();
            projectCards.forEach(card => {
                const title = card.querySelector("h3")?.textContent.toLowerCase();
                card.style.display = title && title.includes(searchTerm) ? "block" : "none";
            });
        });
    }

    // فلترة المشاريع عبر الأزرار
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // إزالة النشاط من جميع الأزرار وإضافة النشاط للزر المختار
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.dataset.filter;
            projectCards.forEach(card => {
                const category = card.dataset.category;
                card.style.display = (filterValue === "all" || category === filterValue) ? "block" : "none";
            });
        });
    });

    // إدارة القائمة الجوالية
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle("active");
            body.classList.toggle("no-scroll");
        });

        document.addEventListener("click", (e) => {
            if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove("active");
                body.classList.remove("no-scroll");
            }
        });
    }

    // إغلاق القائمة عند النقر على أي رابط في القائمة الجوالية
    if (mobileMenu) {
        document.querySelectorAll(".mobile-menu a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("active");
                body.classList.remove("no-scroll");
            });
        });
    }

    // تفعيل الوضع المظلم
    const handleThemeToggle = () => {
        document.body.classList.toggle("dark-theme");
        const isDark = document.body.classList.contains("dark-theme");
        const logo1 = document.getElementById('LogoImg_1');
        const logo2 = document.getElementById('LogoImg_2');
        
        if (isDark) {
            logo1.style.display = 'none';
            logo2.style.display = 'block';
        } else {
            logo1.style.display = 'block';
            logo2.style.display = 'none';
        }
        
        floatingElements.forEach(el => {
            el.style.filter = isDark ? "none" : "invert(1)";
        });

        if (isDark) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            document.documentElement.style.setProperty("--primary", "#FFFFFF");
            document.documentElement.style.setProperty("--secondary", "#5b799c");
            document.documentElement.style.setProperty("--accent", "#FFE747");
            document.documentElement.style.setProperty("--text", "#E0E0E0");
            document.documentElement.style.setProperty("--bg", "#1A1D23");
            document.documentElement.style.setProperty("--card-bg", "#252A33");
            document.documentElement.style.setProperty("--mino-bg", "#252a3394");
            document.documentElement.style.setProperty("--footer-bg", "#252A33");
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            document.documentElement.style.setProperty("--primary", "#2D2D2D");
            document.documentElement.style.setProperty("--secondary", "#35465a");
            document.documentElement.style.setProperty("--accent", "#FFDD00");
            document.documentElement.style.setProperty("--text", "#2D2D2D");
            document.documentElement.style.setProperty("--bg", "#FFFFFF");
            document.documentElement.style.setProperty("--card-bg", "#F5F7FB");
            document.documentElement.style.setProperty("--mino-bg", "#f8f9faa8");
            document.documentElement.style.setProperty("--footer-bg", "#2B72FB");
        }

        localStorage.setItem("theme", isDark ? "dark" : "light");
    };

    if (themeToggle) themeToggle.addEventListener("click", handleThemeToggle);
    if (mobileThemeToggle) mobileThemeToggle.addEventListener("click", handleThemeToggle);

    // استعادة الإعدادات من التخزين المحلي للوضع المظلم
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        floatingElements.forEach(el => el.style.filter = "none");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // إدارة البوب أب لعرض تفاصيل المشروع
    if (projectCards.length > 0 && modal) {
        projectCards.forEach(card => {
            card.addEventListener("click", () => {
                modal.style.display = "flex";
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                modal.style.display = "none";
            });
        }

        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    // التمرير السلس للروابط الداخلية
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute("href"));
            if (targetElement) targetElement.scrollIntoView({ behavior: "smooth" });
        });
    });

    // نموذج التواصل
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const phoneInput = document.getElementById("phone");
            const messageInput = document.getElementById("message");

            if (!nameInput.value.trim() || !emailInput.value.trim() || !phoneInput.value.trim() || !messageInput.value.trim()) {
                alert("يرجى ملء جميع الحقول المطلوبة");
                return;
            }

            const phoneRegex = /^01[0125][0-9]{8}$/;
            if (!phoneRegex.test(phoneInput.value.trim())) {
                alert("يرجى إدخال رقم هاتف مصري صحيح");
                return;
            }

            if (typeof emailjs !== "undefined") {
                emailjs.sendForm("service_f05p0di", "template_9n77v7h", "#contact-form", "oqfNzxDxvm3nesJjx")
                    .then(() => {
                        contactMessage.textContent = "تم إرسال الرسالة بنجاح ✅";
                        contactMessage.style.color = "green";
                        setTimeout(() => { contactMessage.textContent = ""; }, 5000);
                        contactForm.reset();
                    })
                    .catch(() => {
                        contactMessage.textContent = "لم يتم إرسال الرسالة (خطأ في الخدمة) ❌";
                        contactMessage.style.color = "red";
                    });
            } else {
                alert("خطأ: مكتبة EmailJS غير متاحة");
            }
        });
    }
});

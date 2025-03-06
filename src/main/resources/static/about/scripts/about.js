document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".sub-nav-link");
    const sections = document.querySelectorAll(".content-section");
    const bg = document.querySelector(".about-bg");
    const title = document.querySelector(".about-title");
    const loading = document.getElementById("loading");

    const titles = {
        intro: "회사 소개",
        history: "연혁",
        organization: "조직도"
    };

    const bgImages = {
        intro: "/about/images/about_bg.jpg",
        history: "/about/images/history_bg.jpg",
        organization: "/about/images/organization_bg.jpg"
    };

    const activeTab = document.querySelector(".sub-nav-link.active");
    if (activeTab) {
        const sectionId = activeTab.getAttribute("data-section");
        title.textContent = titles[sectionId];

        const img = new Image();
        img.src = bgImages[sectionId];

        img.onload = function () {
            bg.style.backgroundImage = `url(${img.src})`;
            loading.classList.add("hidden");
        };

        img.onerror = function () {
            loading.classList.add("hidden");
        };
    }

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            loading.classList.remove("hidden");

            const sectionId = this.getAttribute("data-section");

            tabs.forEach(t => t.classList.remove("active"));
            this.classList.add("active");

            sections.forEach(sec => sec.classList.remove("active"));
            document.getElementById(sectionId).classList.add("active");

            title.textContent = titles[sectionId];

            const img = new Image();
            img.src = bgImages[sectionId];

            if (img.complete) {
                bg.style.backgroundImage = `url(${img.src})`;
                loading.classList.add("hidden");
                return;
            }

            img.onload = function () {
                bg.style.backgroundImage = `url(${img.src})`;
                loading.classList.add("hidden");
            };

            img.onerror = function () {
                loading.classList.add("hidden");
            };
        });
    });
});

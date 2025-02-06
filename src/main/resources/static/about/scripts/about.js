document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".sub-nav-link");
    const sections = document.querySelectorAll(".content-section");
    const bg = document.querySelector(".about-bg");
    const title = document.querySelector(".about-title");

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

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            const sectionId = this.getAttribute("data-section");

            // 탭 활성화 변경
            tabs.forEach(t => t.classList.remove("active"));
            this.classList.add("active");

            // 컨텐츠 변경
            sections.forEach(sec => sec.classList.remove("active"));
            document.getElementById(sectionId).classList.add("active");

            // 배경 이미지 변경
            bg.style.backgroundImage = `url(${bgImages[sectionId]})`;

            title.textContent = titles[sectionId];
        });
    });
});

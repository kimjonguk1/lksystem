document.addEventListener("DOMContentLoaded", function() {
    const constructionList = document.getElementById("construction-list");
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const closeBtn = document.querySelector(".close");

    modal.style.display = "none";

    fetch("/projects/data/projects-data.json")
        .then(response => response.json())
        .then(jsonData => {
            loadAllData(jsonData);
        })
        .catch(error => console.error("시공 사례 데이터를 불러오는 중 오류 발생:", error));

    function loadAllData(data) {
        data.forEach(construction => {
            const card = document.createElement("div");
            card.classList.add("construction-card");

            card.innerHTML = `
                <img src="${construction.image}" alt="${construction.region}" class="clickable-image">
                <div class="construction-info">
                    <p class="project-meta">No.${construction.id}</p>
                    <h3>${construction.company}</h3>
                    <p><span class="icon">⚡</span>설치장소: ${construction.region}</p>
                    <p><span class="icon">⚡</span>설치날짜: ${construction.date}</p>
                </div>
            `;

            constructionList.appendChild(card);
        });

        document.querySelectorAll(".clickable-image").forEach(img => {
            img.addEventListener("click", function() {
                modal.style.display = "flex";
                modalImage.src = this.src;
            });
        });
    }

    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

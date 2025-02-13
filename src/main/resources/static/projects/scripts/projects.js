document.addEventListener("DOMContentLoaded", function() {
    const constructionList = document.getElementById("construction-list");
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const closeBtn = document.querySelector(".close");
    const loading = document.getElementById("loading");

    modal.style.display = "none";
    loading.classList.remove("hidden");

    fetch("/projects/data/projects-data.json") // json 데이터 불러오기(데이터 수정 필요 시 data.json 파일 수정)
        .then(response => response.json())
        .then(jsonData => {
            return loadAllData(jsonData);
        })
        .then(() => {
            loading.classList.add("hidden"); //이미지가 다 로드되면 로딩창 제거
        })
        .catch(error => {
            loading.classList.add("hidden"); //오류가 떠도 로딩창 제거
        });

    function loadAllData(data) {
        const imageLoadPromises = [];

        data.forEach(construction => {
            const card = document.createElement("div");
            card.classList.add("construction-card");

            const img = document.createElement("img");
            img.src = construction.image;
            img.alt = construction.region;
            img.classList.add("clickable-image");
            img.loading = "lazy";

            const imgLoadPromise = new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve;
            });

            imageLoadPromises.push(imgLoadPromise);

            card.appendChild(img);

            card.innerHTML += `
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

        return Promise.all(imageLoadPromises);
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

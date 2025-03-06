document.addEventListener("DOMContentLoaded", function () {
    const privateList = document.getElementById("construction-list-private");
    const publicList = document.getElementById("construction-list-public");
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const closeBtn = document.querySelector(".close");
    const loading = document.getElementById("loading");
    const categoryTabs = document.querySelectorAll(".category-tab");

    modal.style.display = "none";
    loading.classList.remove("hidden");

    fetch("/projects/data/projects-data.json")
        .then(response => {
            if (!response.ok) throw new Error("네트워크 응답 실패");
            return response.json();
        })
        .then(jsonData => Promise.all([
            loadData(jsonData, "private"),
            loadData(jsonData, "public")
        ]))
        .then(() => loading.classList.add("hidden"))
        .catch(() => loading.classList.add("hidden"));

    function loadData(data, category) {
        const targetList = category === "private" ? privateList : publicList;
        targetList.innerHTML = ""; // 기존 내용 삭제

        const imageLoadPromises = [];
        const filteredData = data.filter(construction => construction.category === category);

        filteredData.forEach(construction => {
            if (!construction.image) return;

            const card = document.createElement("div");
            card.classList.add("construction-card");

            const img = document.createElement("img");
            img.src = construction.image;
            img.alt = construction.region;
            img.classList.add("clickable-image");

            const imgLoadPromise = new Promise((resolve) => {
                let timeout = setTimeout(resolve, 5000);
                img.onload = () => {
                    clearTimeout(timeout);
                    resolve();
                };
                img.onerror = () => {
                    clearTimeout(timeout);
                    resolve();
                };
                if (img.complete) {
                    clearTimeout(timeout);
                    resolve();
                }
            });

            imageLoadPromises.push(imgLoadPromise);
            card.appendChild(img);

            // 🚀 공용 사례일 경우, 기기 대수 정보 추가
            let chargerInfo = "";
            if (category === "public") {
                chargerInfo = `<p><span class="icon">⚡</span>충전기: ${construction.charger_count || "100kW 1대"}</p>`;
            }

            card.innerHTML += `
                <div class="construction-info">
                    <p class="project-meta">No.${construction.id}</p>
                    <h3>${
                construction.company
                    ? (construction.company.includes("고객님")
                        ? construction.company.replace(/^(.)(.*)( 고객님)$/, "$1** 고객님")
                        : construction.company)
                    : "개인고객"
            }</h3>
                    <p><span class="icon">⚡</span>지역: ${construction.region}</p>
                    <p><span class="icon">⚡</span>설치날짜: ${construction.date}</p>
                    ${chargerInfo}
                </div>
            `;

            targetList.appendChild(card);
        });

        return Promise.all(imageLoadPromises).then(() => {
            // ✅ 이미지 클릭 시 모달창이 뜨도록 이벤트 등록
            targetList.querySelectorAll(".clickable-image").forEach(img => {
                img.addEventListener("click", function () {
                    modal.style.display = "flex";
                    modalImage.src = this.src;
                });
            });
        });
    }

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // ✅ 탭 클릭 이벤트 추가
    categoryTabs.forEach(tab => {
        tab.addEventListener("click", function () {
            categoryTabs.forEach(t => t.classList.remove("active"));
            this.classList.add("active");

            if (this.dataset.category === "private") {
                privateList.classList.add("active");
                publicList.classList.remove("active");
            } else {
                publicList.classList.add("active");
                privateList.classList.remove("active");
            }
        });
    });
});

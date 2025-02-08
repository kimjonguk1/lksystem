document.addEventListener("DOMContentLoaded", function() {
    const constructionList = document.getElementById("construction-list");
    const loadMoreBtn = document.getElementById("load-more");
    let page = 1;  // 현재 페이지 번호
    const itemsPerPage = 6;  // 한 번에 로드할 개수
    let data = [];  // 전체 데이터를 저장할 배열

    // JSON 파일에서 전체 데이터 불러오기
    fetch("/projects/data/projects-data.json")
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData;
            loadMoreData();  // 초기 데이터 로드
        })
        .catch(error => console.error("시공 사례 데이터를 불러오는 중 오류 발생:", error));

    // 특정 페이지 데이터 로딩 함수
    function loadMoreData() {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const itemsToShow = data.slice(startIndex, endIndex);

        itemsToShow.forEach(construction => {
            const card = document.createElement("div");
            card.classList.add("construction-card");

            card.innerHTML = `
                <img src="${construction.image}" alt="${construction.region}">
                <div class="construction-info">
                    <h3>${construction.region} - ${construction.company} 😊</h3>
                    <p><span class="icon">📅</span> 날짜: ${construction.date}</p>
                </div>
            `;

            constructionList.appendChild(card);
        });

        page++;

        // 모든 데이터를 불러왔을 경우 "더보기" 버튼 숨기기
        if (endIndex >= data.length) {
            loadMoreBtn.style.display = "none";
        }
    }

    // "더보기" 버튼 클릭 시 다음 페이지 로드
    loadMoreBtn.addEventListener("click", loadMoreData);
});

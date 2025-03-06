document.addEventListener("DOMContentLoaded", function() {
    var user = "lktsj01"; // 이메일 아이디 부분
    var domain = "daum.net"; // 이메일 도메인 부분
    var email = user + "@" + domain; // 이메일 주소 조합

    var emailLink = document.createElement("a");
    emailLink.href = "mailto:" + email;
    emailLink.textContent = email;

    document.getElementById("email-link").appendChild(emailLink);
});
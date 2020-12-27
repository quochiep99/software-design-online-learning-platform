$("#change-password")[0].addEventListener("click", () => {

    $("#profile-bg > div > div > div:nth-child(2) > form > div.step > div:first-of-type").css("display", "none");
    $("#profile-bg > div > div > div:nth-child(2) > form > div.step > div:nth-child(n+2):nth-child(-n+5)").css("display", "block");
    $("#profile-bg > div > div > div:nth-child(2) > form > div.step > div:last-of-type").css("display", "none");
})
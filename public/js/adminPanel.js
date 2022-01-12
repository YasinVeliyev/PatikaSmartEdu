let dt = document.querySelectorAll(".dt");

function changeHeight(event) {
    event.currentTarget.nextElementSibling.style.display = "block";
    event.currentTarget.nextElementSibling.classList.toggle("open");
    event.currentTarget.nextElementSibling.classList.toggle("close0");
}

dt.forEach((elem) => {
    elem.addEventListener("click", changeHeight);
});

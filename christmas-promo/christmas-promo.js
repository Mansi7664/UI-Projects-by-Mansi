const modalEle = document.getElementById("modal-window");
const closeBtn = document.getElementById("modal-close");
const snowEle = document.getElementById("snow");
const giftBtn = document.getElementById("gift-button");
const mainContainer = document.getElementsByClassName("w-full h-full");

closeBtn.onclick = function (event) {
    modalEle.classList.add("hidden");
    setTimeout(function () {
        modalEle.classList.remove("hidden");
    }, 2000);
}

giftBtn.onclick = function () {
    for(let i=0; i<100; i++) {
        const snowfallinstance = document.createElement("div");
        snowfallinstance.classList.add("snow");

        snowfallinstance.style.left = Math.random() * window.innerWidth + 'px';
        snowfallinstance.style.animationDuration = 2 + Math.random() * 3 + 's'; // 2s to 5s

        document.body.appendChild(snowfallinstance);


        setTimeout(() => snowfallinstance.remove(), 6000);
    }
}
const template = document.getElementById('tpl-friend-item');
const friendList = document.getElementById('friends-list');

const friendsListArr = [{
    name: "Jason Graham",
    src: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
    status: ""
}, {
    name: "Ophelia Gaddy",
    src: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
    status: "followed"
}, {
    name: "Lillian Whitmire",
    src: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
    status: ""
}, {
    name: "Joseph Shepherd",
    src: "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
    status: ""
}, {
    name: "Jason Graham",
    src: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
    status: ""
    }];


function addFriend(name, src, status) {
    const template_clone = template.content.cloneNode(true);

    const nameEl = template_clone.querySelector("[data-friend-name]");
    nameEl.innerHTML = name;

    const imgEl = template_clone.querySelector("img");
    imgEl.src = src;
    imgEl.alt = `${name} profile picture"`;

    const btnEl = template_clone.querySelector("[data-follow-btn]");
    if (status == "followed") {
        btnEl.innerHTML = "Following";
        btnEl.classList.add("followed");
    } else {
        btnEl.innerHTML = "Follow";
        btnEl.setAttribute('aria-label', `Follow ${name}`);
    }

    friendList.appendChild(template_clone);
}

for (let i = 0; i < friendsListArr.length; i++) {
    addFriend(friendsListArr[i].name, friendsListArr[i].src, friendsListArr[i].status);
}

const searchEl = document.getElementById('searchbar');
const freindItemsEl = document.querySelectorAll('.friend-item');
const follow_btn = document.querySelectorAll('.follow-btn');

searchEl.addEventListener("input", function () {
    const searchValue = searchEl.value;

    freindItemsEl.forEach(function (item) {
        const friendName = item.querySelector(".friend-name");

        if (!(friendName.innerHTML.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))) {
            item.style.display = "none";
        } else {
            item.style.display = "flex";
        }
    })
});

follow_btn.forEach(function (ele) {
    ele.addEventListener("click", function () {
        if (ele.innerHTML == "Follow") {
            ele.innerHTML = "Following";
            ele.classList.add("followed");
        } else {
            ele.innerHTML = "Follow";
            ele.classList.remove("followed");
        }
    });

    ele.addEventListener("mouseenter", function () {
        if (ele.innerHTML == "Following") {
            ele.innerHTML = "Unfollow";
        }
    });

    ele.addEventListener("mouseleave", function () {
        if (ele.innerHTML == "Unfollow") {
            ele.innerHTML = "Following";
        }
    });
});


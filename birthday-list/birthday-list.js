const birthdaylist = [{
    id: "1",
    name: "Florin Pop",
    age: 35
},
{
    id: "2",
    name: "Andrew",
    age: 26
}, {
    id: "3",
    name: "Jade",
    age: 27
}, {
    id: "4",
    name: "Ashwini",
    age: 23
}, {
    id: "5",
    name: "Yasmin",
    age: 26
}, {
    id: "6",
    name: "Mansi",
    age: 25
}, {
    id: "7",
    name: "Manan",
    age: 21
}, {
    id: "8",
    name: "Jasmine",
    age: 26
}, {
    id: "9",
    name: "Ronaldo",
    age: 26
}];

let itemCount = 0;

document.getElementsByTagName("h2")[0].innerHTML = birthdaylist.length + " birthdays today";

const listEle = document.getElementsByClassName("list");
const loadMoreButton = document.getElementsByClassName("loadmore");

function createListItem(i) {
    const itemsEle = document.createElement("li");

    const imagediv = document.createElement("div");
    imagediv.classList.add("image");

    const imageEle = document.createElement("img");
    imageEle.src = "https://i.pravatar.cc/150?img="+i;
    imageEle.alt ="image"+i;
    imageEle.classList.add("image-item");
    imagediv.appendChild(imageEle);
    itemsEle.appendChild(imagediv)

    const divEle = document.createElement("div");
    divEle.classList.add("list-item");

    const nameEle = document.createElement("p");
    nameEle.innerHTML = birthdaylist[i].name;
    divEle.appendChild(nameEle);

    const ageEle = document.createElement("p");
    ageEle.innerHTML = birthdaylist[i].age + " years";
    divEle.appendChild(ageEle);

    itemsEle.append(divEle);

    listEle[0].appendChild(itemsEle);
}

while(itemCount < 5) {
    createListItem(itemCount);
    itemCount++;
}

loadMoreButton[0].addEventListener('click', (data, event) => {
    if(itemCount > birthdaylist.length) {
        return;
    }

    createListItem(itemCount);
    itemCount++;
});
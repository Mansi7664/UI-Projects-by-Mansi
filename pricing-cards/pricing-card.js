const cardSection = document.querySelectorAll('.card-section');
const successModal = document.querySelectorAll('.success-screen');
const closeModal = document.querySelectorAll('.modal-close');

document.querySelectorAll('.purchase').forEach(btn => {
    btn.addEventListener('click', (data, event) => {
        cardSection[0].classList.add('hide');
        document.getElementById("modal-text").innerText = `Your purchase for ${data.currentTarget.id.toUpperCase()} plan was successful.`;
        successModal[0].classList.remove('hide');
    });
});

closeModal[0].addEventListener('click', () => {
    successModal[0].classList.add('hide');
    cardSection[0].classList.remove('hide');
})


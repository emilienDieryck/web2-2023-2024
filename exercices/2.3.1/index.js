const formulaire = document.querySelector('.formulaire');
const text = document.querySelector('#text');
const btn = document.querySelector('.btn');

const message = document.querySelector('.message');
const btn2 = document.querySelector('.btn2')

const DEFAULT_MESSAGE = 'souhait vide !';

formulaire.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("btn formulaire event");
    if(text.value == 0){alert(DEFAULT_MESSAGE);};
    formulaire.style.display = "none";
    message.textContent = text.value;
    console.log(text);
    btn2.style.display = "block";
});

btn2.addEventListener('click', () => {
    formulaire.style.display = "contents";
    message.innerHTML = '';
    btn2.style.display = "none";
});
let cpmt = 0;
const counter = document.querySelector('.counter');
const message = document.querySelector('.message');

window.addEventListener('click', () => {
  cpmt++;
  counter.textContent = cpmt;
  if(cpmt == 5) message.textContent = 'Bravo, bel échauffement !';
  if(cpmt == 10) message.textContent = 'Vous êtes passé maître en l\'art du clic !';
});
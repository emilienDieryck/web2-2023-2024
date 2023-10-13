const divs = document.querySelectorAll('.color-div');

divs.forEach((div) => {
    div.addEventListener("click", () => {

      if(div.style.height === '100px'){
        div.innerHTML = '' ;
        div.style.width = '50px';
        div.style.height = '50px';
      }
      else{
        div.innerHTML = div.style.backgroundColor;
        div.style.width = '100px';
        div.style.height = '100px';
      };
    });
});

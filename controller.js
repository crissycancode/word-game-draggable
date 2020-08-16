// import { Child, Parent } from "./module.js";
import { JsonData} from "./jsondata.js"; import { Render } from "./render.js"; import { Shuffle } from "./shuffle.js"; import { HtmlElements } from "./element.js"; 
import { Drag } from "./drag.js";


const json = new JsonData("sentences.json");
const htmlElement = new HtmlElements();

let index = 0;
let length = 0;

const nextButton = document.getElementById('button');
nextButton.addEventListener('click', (event) =>{
  intro();
  document.getElementById('button').disabled = 'true';
  nextButton.innerHTML ='<h2>next</h2>';
  nextButton.style.border = '2px solid #000000';
  nextButton.classList.add("btn", "btn-success", "btn-lg");

  event.preventDefault();
  if(index !== length){
    renderWords();
  }else{
    console.log('end game');
    disableButton();
  }
});

//loads DOMContent
window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
  document.getElementById('button').style.border = '2px solid #000000';
  document.getElementById('button').classList.add("btn", "btn-success", "btn-lg");
  json.getFileLength();
  setTimeout(_=>{
    length += json.length;
  }, 300);
  // renderWords();
  document.getElementById('intro').innerHTML = 'arrange the words in correct order';
});

function renderWords(){
  json.getDataByIndex(index); //get the values from jasondata.js
  setTimeout(_=>{
    index += 1;
    const shuffle = new Shuffle(json.sentence);
    drawBoard(document.getElementById('draggableContainer'), shuffle.shuffleArray());
    drawBoard(document.getElementById('droppableContainer'), shuffle.stringToArray());
  }, 300);
} //end of renderWords() function

function drawBoard(element, words){
  let array = words;
  //get the longer word to get the box sizes
  element.innerHTML = '';
  for (let i = 0; i < array.length; i++){
    htmlElement.createCard(element);
    htmlElement.createCardBody(element.childNodes[i]);
    if(element.id === 'draggableContainer'){
      element.childNodes[i].classList.remove('card');
      element.childNodes[i].classList.add('card-removed');
      htmlElement.createCardTitle(array[i],(element.childNodes[i]).firstChild); //draggable
    }
    htmlElement.addNameAttribute((element.childNodes[i]).firstChild, array[i]);
    htmlElement.addId((element.childNodes[i]).firstChild, [i]);
    htmlElement.addDraggable((element.childNodes[i]).firstChild);
  }
  const drag = new Drag(document.querySelectorAll('.draggable'),document.querySelectorAll('.droppable'));
  drag.draggableDom(array.length);
}

function intro(){
  if(document.getElementById('intro').innerHTML !== ''){
    document.getElementById('intro').innerHTML = '';
  }
}

function disableButton(){
  // document.getElementById('button').disabled = 'true';
  document.getElementById('page-container').innerHTML = '';
  document.getElementById('page-container').innerHTML = '<h1>Thank you!</h1>';
}

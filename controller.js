// import { Child, Parent } from "./module.js";
import { JsonData} from "./jsondata.js"; 
import { Shuffle } from "./shuffle.js"; 
import { Elements } from "./element.js"; 
import { Drag } from "./drag.js";


const json = new JsonData("sentences.json");
const htmlElement = new Elements();

let index = 0;
let length = 0;

document.getElementById('reload').addEventListener('click', (e) =>{
  window.location.reload("Refresh");
});

const nextButton = document.getElementById('button');
nextButton.addEventListener('click', (event) =>{
  intro();
  document.getElementById('button').disabled = 'true';
  nextButton.innerHTML ='<h1>next</h1>';

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
  document.getElementById('intro').innerHTML = 'arrange the words in correct order';
});

function renderWords(){
  json.getDataByIndex(index);
  setTimeout(_=>{
    index += 1;
    const shuffle = new Shuffle(json.sentence);
    drawBoard(document.getElementById('draggableContainer'), shuffle.shuffleArray());
    drawBoard(document.getElementById('droppableContainer'), shuffle.stringToArray());
  }, 300);
}

function drawBoard(element, words){
  let array = words;
  element.innerHTML = '';
  for (let i = 0; i < array.length; i++){
    htmlElement.createCard(element);
    htmlElement.createCardBody(element.childNodes[i]);
    if(element.id === 'draggableContainer'){
      element.childNodes[i].classList.remove('card');
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
  document.getElementById('page-container').innerHTML = '';
  document.getElementById('page-container').innerHTML = '<h1>Thank you!</h1>';
}

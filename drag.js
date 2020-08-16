export class Drag {
  constructor(draggableElements, droppableElements){
    this.draggableElements = draggableElements;
    this.droppableElements = droppableElements;
  }

  draggableDom(length){
    let round = 0;

    this.draggableElements.forEach(element => {
      element.addEventListener('dragstart', dragStart);
    });

    this.droppableElements.forEach(element => {
      element.addEventListener('dragover', dragOver);
      element.addEventListener('drop', drop);
    });

    function dragStart(e) {
      e.dataTransfer.setData('text', e.target.id);
      e.target.classList.add('card');
    }
    
    function dragOver(e) {
      if(!e.target.classList.contains('dropped')){
        e.preventDefault();
      }
    }
    
    function drop(e) {
      e.preventDefault();
      const target = e.target;
      const draggableElementData = e.dataTransfer.getData('text');
      const draggableElement = document.getElementById(draggableElementData);

      if(draggableElement.firstChild.getAttribute('word') === this.getAttribute('word')){
        
        target.classList.add('dropped');
        draggableElement.classList.add('dragged');
        draggableElement.setAttribute('draggable', 'false');
        target.innerHTML = '';
        target.innerHTML += `<h2>${this.getAttribute('word')}</h2>`; 
        target.style.minWidth = 'fit-content';
        draggableElement.style.opacity = '0';
        round++;
      }else{
        draggableElement.classList.remove('card');
      }

      if(round === length){
        document.getElementById('button').removeAttribute('disabled');
        document.getElementById('draggableContainer').innerHTML = '';
      }
    }
  }
}

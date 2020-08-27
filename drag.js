export class Drag {
  constructor(draggableElements, droppableElements){
    this.draggableElements = draggableElements;
    this.droppableElements = droppableElements;
    this.word = '';
  }

  draggableDom(length){
    let round = 0;

    this.draggableElements.forEach(element => {
      element.addEventListener('dragstart', dragStart);
    }); // end of add event listener to draggable elements

    this.droppableElements.forEach(element => {
      element.addEventListener('dragover', dragOver);
      element.addEventListener('drop', drop);
    }); // end of add event listeners to droppables

    function dragStart(e) {
      e.dataTransfer.setData('text', e.target.id);
    } // end of dragstart function
    
    function dragOver(e) {
      if(!e.target.classList.contains('dropped')){
        e.preventDefault();
      }
    } //end of dragover function
    
    function drop(e) {
      e.preventDefault();
      const target = e.target;
      const draggableElementData = e.dataTransfer.getData('text');
      const draggableElement = document.getElementById(draggableElementData);
      if(draggableElement.firstChild.getAttribute('word') === this.getAttribute('word')){
        // actual code
        target.classList.add('dropped');
        draggableElement.classList.add('dragged');
        draggableElement.setAttribute('draggable', 'false');
        target.innerHTML = '';
        if(round === 0){
          target.innerHTML += `<h1>${(this.getAttribute('word')).charAt(0).toUpperCase() + (this.getAttribute('word')).slice(1)}</h1>`; 
        }else{
          target.innerHTML += `<h1>${this.getAttribute('word')}</h1>`; 
        }
        
        target.style.minWidth = 'fit-content';
        draggableElement.style.opacity = '0';
        this.parentElement.classList.remove('card');
        round++;

      }else{
        this.parentElement.classList.add('border-danger');
        draggableElement.firstChild.style.color = '#DC143C';
        setTimeout(_=>{
          this.parentElement.classList.remove('border-danger');
          draggableElement.firstChild.style.color = '#000000';
        },2300);
      }

      if(round === length){
        document.getElementById('draggableContainer').innerHTML ='';
        document.getElementById('button').removeAttribute('disabled');
      }
    } // end of drop function
  }
}

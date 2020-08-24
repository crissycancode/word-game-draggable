export class Touches {  
  constructor(touchElements, rectElements){
    this.touchElements = touchElements;
    this.rectElements = rectElements;
    this.lastMove = 0;
  }

  touchFunctions(){
    this.touchElements.forEach(element => {
      element.addEventListener('touchstart', this.process_touchstart,false);
      element.addEventListener('touchmove', this.process_touchmove, false);
      element.addEventListener('touchcancel', this.process_touchcancel, false);
      element.addEventListener("touchend", this.process_touchend, false);
    });
  }

  process_touchstart(){
    console.log('touch S T A R T');
    event.stopPropagation();
    this.word = event.target.getAttribute('word');
    this.lastMove = event;
    
  }

  process_touchmove(){
    event.target.style.opacity = '.5';
  }

  process_touchcancel(){
    event.preventDefault();
    event.stopPropagation();
    console.error();
  }
  process_touchend(){
    event.preventDefault();
    event.stopPropagation();

    const touch_element = document.elementFromPoint((event.changedTouches[event.changedTouches.length-1].pageX), (event.changedTouches[event.changedTouches.length-1].pageY));
    
    if (touch_element.getAttribute('word') === event.target.getAttribute('word')){
      
      event.target.style.opacity = '0';
      event.target.innerHTML = '';
      touch_element.innerHTML += `<h1>${event.target.getAttribute('word')}</h1>`; 

    }else {
      event.target.style.opacity = '1';
    }
  }
  
}
export class Touches {  
  constructor(touchElements, rectElements, length){
    this.touchElements = touchElements;
    this.rectElements = rectElements;
    this.length = length;
    this.round = 0;
    this.element = '';
    this.touchFunction();
  }

  touchFunction(){
    let that = this;
    this.touchElements.forEach(element => {
      // element.addEventListener('touchstart', function() {
      //   that.process_touchstart();
      // }, true);
      element.addEventListener('touchmove', this.process_touchmove, true);
      element.addEventListener('touchcancel', this.process_touchcancel, true);
      element.addEventListener('touchend', function() {
        that.process_touchend();
      }, true);
      
    });
  }

  process_touchstart(){
    console.log('touch start');
    event.stopPropagation();
    event.preventDefault();
    this.element = event.changedTouches[0];
    console.log(this.element);
    
  }

  process_touchmove(){
    event.preventDefault();
    this.element = event.changedTouches[0];
    event.target.style.opacity = '.5';
  }

  process_touchcancel(){
    console.log('touch cancelled');
    event.stopPropagation();
    event.preventDefault();
  }

  process_touchend(){
    event.stopPropagation();
    event.preventDefault();
    console.log('touch-end');

    const touch_rectangle = document.elementFromPoint((event.changedTouches[event.changedTouches.length-1].pageX), (event.changedTouches[event.changedTouches.length-1].pageY));
    const touch_word = this.element;

    if(event.changedTouches[event.changedTouches.length-1].pageX !== touch_word.pageX){
      console.log(event.changedTouches[event.changedTouches.length-1].pageX + " ; " + touch_word.pageX); //landing
      this.check_if_a_match(touch_rectangle, touch_word.target);
    }
  } 

  check_if_a_match(rectangle, word){
    if(rectangle.getAttribute('word') === word.getAttribute('word')){
      this.is_a_match(rectangle, word);
      this.round++;
      this.next_sentence();
    }else{
      if(rectangle.parentElement.classList.toString() === 'card'){
        this.is_not_a_match(rectangle, word);
      }
      word.style.opacity = '1';
    }
  }

  is_a_match(rectangle, word){  //check why there is an error here
    rectangle.innerHTML = '';
    rectangle.innerHTML = `<h1>${this.letter_case(rectangle,word)}</h1>`; 
    rectangle.parentElement.classList.remove('card');
    rectangle.style.minWidth = 'fit-content';
    word.innerHTML = '';  
    word.style.opacity = '0';
  }

  is_not_a_match(rectangle, word){
    word.style.opacity = '1';
    rectangle.parentElement.classList.add('border-danger');
    word.style.color = '#DC143C';
    setTimeout(_=>{
      rectangle.parentElement.classList.remove('border-danger');
      word.style.color = '#000000';
    },500);
  }
  
  letter_case(rectangle, word){
    let letter = word.getAttribute('word');
    if(rectangle.id === '0'){
      letter = (word.getAttribute('word')).charAt(0).toUpperCase() + (word.getAttribute('word')).slice(1);
    } 
    return letter;
  }

  next_sentence(){
    if(this.round === this.length){
      setTimeout(_=>{
        document.getElementById('droppableContainer').innerHTML = '';
        document.getElementById('droppableContainer').innerHTML = `<h1>correct!</h1>`; 
        document.getElementById('button').removeAttribute('disabled');
      },200);
    }
    
  }
}
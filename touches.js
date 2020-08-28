export class Touches {  
  constructor(touchElements, rectElements, length){
    this.touchElements = touchElements;
    this.rectElements = rectElements;
    this.length = length;
    this.round = 0;
    this.touchFunction();
  }

  touchFunction(){
    let that = this;
    this.touchElements.forEach(element => {
      element.addEventListener('touchmove', this.process_touchmove, true);
      element.addEventListener('touchcancel', this.process_touchcancel, true);
      element.addEventListener('touchend', function() {
        that.process_touchend();
      }, true);
    });
  }

  process_touchmove(){
    event.preventDefault();
    event.target.style.opacity = '.5';
  }

  process_touchcancel(){
    event.stopPropagation();
    event.preventDefault();
  }

  process_touchend(){
    event.stopPropagation();
    event.preventDefault();

    const touch_rectangle = document.elementFromPoint((event.changedTouches[event.changedTouches.length-1].pageX), (event.changedTouches[event.changedTouches.length-1].pageY));
    const touch_word = event.target;
    this.check_if_a_match(touch_rectangle, touch_word);
  } 

  check_if_a_match(rectangle, word){
  
    if(rectangle.getAttribute('word') === word.firstChild.getAttribute('word')){
      setTimeout(_=>{
        this.is_a_match(rectangle, word.firstChild);
        this.round++;
        this.next_sentence();
      },150);

    }else{
      if(rectangle.parentElement.classList.toString() === 'card'){
        this.is_not_a_match(rectangle, word.firstChild);
      }
    }
  }

  is_a_match(rectangle, word){  //check why there is an error here
    rectangle.innerHTML = '';
    rectangle.innerHTML = `<h1>${this.letter_case(rectangle,word)}</h1>`; 
    rectangle.parentElement.classList.remove('card');
    rectangle.style.minWidth = 'fit-content';
    word.innerHTML = '';
    word.style.opacity = '0';
    console.log(word);
  }

  is_not_a_match(rectangle, word){
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
      },300);
    }
    
  }
}
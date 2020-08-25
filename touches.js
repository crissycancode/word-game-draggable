export class Touches {  
  constructor(touchElements, rectElements, length){
    this.touchElements = touchElements;
    this.rectElements = rectElements;
    this.length = length;
    this.round = 0;
  }

  touchFunctions(){
    let that = this;
    this.touchElements.forEach(element => {
      element.addEventListener('touchstart', this.process_touchstart,{passive:true});
      element.addEventListener('touchmove', this.process_touchmove, {passive:true});
      element.addEventListener('touchcancel', this.process_touchcancel, {passive:true});
      element.addEventListener('touchend', function() {
        that.process_touchend();
      }, {passive:true});
    });
  }

  process_touchstart(){
    console.log('touch S T A R T');
    event.stopPropagation();
    
  }

  process_touchmove(){
    event.target.style.opacity = '.5';
  }

  process_touchcancel(){
    event.stopPropagation();
    console.error();
  }

  process_touchend(){
    event.stopPropagation();

    const touch_rectangle = document.elementFromPoint((event.changedTouches[event.changedTouches.length-1].pageX), (event.changedTouches[event.changedTouches.length-1].pageY));
    const touch_word = event.target;

    if(touch_rectangle.getAttribute('word') === touch_word.getAttribute('word')){

      this.is_a_match(touch_rectangle, touch_word);
      this.round++;
      
      if(this.round === this.length){
        document.getElementById('button').removeAttribute('disabled');
      }
    }else{
      this.is_not_a_match(touch_rectangle, touch_word);
    }

  } 

  is_a_match(rectangle, word){
    rectangle.innerHTML = '';
    rectangle.innerHTML += `<h1>${this.letter_case(rectangle,word)}</h1>`; 
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
  
}
export class Shuffle{
  constructor(string){
    this.string = string;
  }

  stringToArray(){
    let array = (this.string).split(' ');
    return array;
  }

  shuffleArray(){
    let array = this.stringToArray(this.string);
    return array.sort(_=>Math.random()-0.5);
  }

}
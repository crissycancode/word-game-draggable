export class JsonData{
  constructor(url){
    this.URL = url;
    this.sentence = '';
    this.length = '';
  }

  async fetchFile(){
    const  response = await fetch(this.URL);    // await response of fetch call
    const data = await response.json(); // only proceed once promise is resolved
    return data; // only proceed once second promise is resolved
  }

  async getDataByIndex(index){ //returns a sentence from index
    this.fetchFile().then(data => {
        this.sentence = data[index].sentence;
      }
    );
  }

  async getFileLength(){ // get the length of array in file
    this.fetchFile().then(data => {
        this.length = data.length;
      }
    );
  }

}


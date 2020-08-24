export class Elements{

  createCard(parentElement){
    const card = document.createElement('div');
    card.classList.add('card'); 
    parentElement.appendChild(card);
    
  }

  createCardBody(parentElement){
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    parentElement.appendChild(cardBody); 
  }

  createCardTitle(word,parentElement){
    const cardTitle = document.createElement('h1');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = word;
    parentElement.appendChild(cardTitle);
    
  }

  addNameAttribute(element,word){
    if(element.firstChild !== null){
      (element.firstChild).setAttribute('word', `${word.toLowerCase()}`);
    }else{
      element.setAttribute('word', `${word.toLowerCase()}`);
    }
  }

  addId(element,number){
    if(element.firstChild !== null){
      element.setAttribute('id', `draggable-index-${number}`);
    }else{
      element.setAttribute('id', `droppable-index-${number}`);
    }
  }

  addDraggable(element){
    if(element.firstChild !== null){
      element.classList.add('draggable');
      element.setAttribute('draggable', 'true');
    }else{
      element.classList.add('droppable');
    }
  }
}
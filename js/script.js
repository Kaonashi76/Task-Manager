let noteCounter = 3;
let columnCounter = 4;

const buttonAddColumn = document.querySelector('[data-action-addColumn]');

document
  .querySelectorAll('.column')
  .forEach(CreateColumnElement);

  buttonAddColumn.addEventListener('click', function (event){
    const newColumn = document.createElement('div');
    newColumn.classList.add('column');
    newColumn.setAttribute('draggable', 'true');
    newColumn.setAttribute('data-column-id', columnCounter);      
    columnCounter++;

    newColumn.innerHTML += `<p class="column-header" contenteditable="true">В плане</p>
                              <div data-notes></div>
                              <p class="column-footer">
                                <span data-action-addNote class="action">+ Добавить карточку</span>
                              </p>`
    document.querySelector('.columns').append(newColumn);  

    CreateColumnElement(newColumn);
  });
     
 function CreateColumnElement(columnElement){
  const buttonAddNote = columnElement.querySelector('[data-action-addNote]');
    
  buttonAddNote.addEventListener('click', function (event) {
    
    const newNote = document.createElement('div');
    newNote.classList.add('note');
    newNote.setAttribute('draggable', 'true');
    newNote.setAttribute('data-note-id', noteCounter);      
    noteCounter++;

    columnElement.querySelector('[data-notes]').append(newNote);      
  });
}
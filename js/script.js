let noteCounter = 3;
let columnCounter = 4;

const buttonAddColumn = document.querySelector('[data-action-addColumn]');
const headerElement   = document.querySelectorAll('.column-header');
const note            = document.querySelectorAll('.note');
const column          = document.querySelectorAll('.column');

note
  .forEach(ChangeNote);

headerElement
  .forEach(ChangeHeaderColumn);

column
  .forEach(CreateColumnElement);


  buttonAddColumn.addEventListener('click', function (event){
    const newColumn = document.createElement('div');
    newColumn.classList.add('column');
    newColumn.setAttribute('draggable', 'true');
    newColumn.setAttribute('data-column-id', columnCounter);      
    columnCounter++;

    newColumn.innerHTML += `<p class="column-header">В плане</p>
                              <div data-notes></div>
                              <p class="column-footer">
                                <span data-action-addNote class="action">+ Добавить карточку</span>
                              </p>`
    document.querySelector('.columns').append(newColumn);  

    CreateColumnElement(newColumn);
    ChangeHeaderColumn(newColumn.querySelector('.column-header'));
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
    ChangeNote(newNote);
  });
}

function ChangeNote(noteElement){
  noteElement.addEventListener('dblclick', function(event){
    noteElement.setAttribute('contenteditable','true');
    noteElement.focus();
  })
  noteElement.addEventListener('blur', function(event){
    noteElement.removeAttribute('contenteditable');
  }
  );
}

function ChangeHeaderColumn(headerElement){
  headerElement.addEventListener('dblclick', function(event){
    headerElement.setAttribute('contenteditable','true');
    headerElement.focus();
  })
  headerElement.addEventListener('blur', function(event){
    headerElement.removeAttribute('contenteditable');
  });
}
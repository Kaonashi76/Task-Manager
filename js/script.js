let noteCounter   = 1;
let columnCounter = 1;
let draggedNote   = null;

const buttonAddColumn = document.querySelector('[data-action-addColumn]');
const headerElement   = document.querySelectorAll('.column-header');
const note            = document.querySelectorAll('.note');
const column          = document.querySelectorAll('.column');

//Create a new column && add it to the DOM
function CreateColumn(){
  const newColumn = document.createElement('div');
  newColumn.classList.add('column');
  newColumn.setAttribute('data-column-id', columnCounter);      
  columnCounter++;

  newColumn.innerHTML += `<p class="column-header"> </p>
                            <div data-notes></div>
                          <p class="column-footer">
                            <button data-action-addNote class="action">Добавить карточку</button>
                          </p>`
    document.querySelector('.columns').append(newColumn);  
    return newColumn;
}

buttonAddColumn.addEventListener('click', function (event){

    newColumn = CreateColumn();

    //focus column heading
    newColumn.querySelector('.column-header').setAttribute('contenteditable','true');
    newColumn.querySelector('.column-header').focus();

    //add event create new note
    CreateColumnElement(newColumn);

    //column header handler
    ChangeHeaderColumn(newColumn.querySelector('.column-header'));

  });

//If you have notes, then add event change notes
note
  .forEach(ChangeNote);

//If you have columns, then add event rename column heading
headerElement
  .forEach(ChangeHeaderColumn);

// If you have notes, then add event create new note
column
  .forEach(CreateColumnElement);

 //create new note && add it to the DOM
 function createNote(columnElement){
  const newNote = document.createElement('div');
  newNote.classList.add('note');
  newNote.setAttribute('draggable', 'true');
  newNote.setAttribute('data-note-id', noteCounter); 
  newNote.setAttribute('contenteditable','true');     
  noteCounter++;

  columnElement.querySelector('[data-notes]').append(newNote); 

  return newNote
}

function CreateColumnElement(columnElement){
  const buttonAddNote = columnElement.querySelector('[data-action-addNote]');

  buttonAddNote.addEventListener('click', function (event) {
    
    //create new note && add it to the DOM
    newNote = createNote(columnElement);
   
    //autofocus new note
    newNote.focus();

    //note text change handler
    ChangeNote(newNote);
    DragNotes(noteElement);
    
  });
 
  //event handlers for dragging a note into an empty column
  DragNotesToEmptyColumn(columnElement);
  
}

function ChangeNote(noteElement){
  noteElement.addEventListener('dblclick', function(event){
    noteElement.setAttribute('contenteditable','true');
    noteElement.focus();
  });
  noteElement.addEventListener('blur', function(event){
    noteElement.removeAttribute('contenteditable');
    
    if (noteElement.innerText.trim() === ''){
      noteElement.remove();
    }

  });
 
  DragNotes(noteElement);
}

function ChangeHeaderColumn(headerElement){
  headerElement.addEventListener('dblclick', function(event){
    headerElement.setAttribute('contenteditable','true');
    headerElement.focus();
  })
  headerElement.addEventListener('blur', function(event){
    headerElement.removeAttribute('contenteditable');
    if (headerElement.innerText.trim() === ''){
     headerElement.parentElement.remove();
    }
  });
  
}

function DragNotesToEmptyColumn (columnElement){
  columnElement.addEventListener('dragover', function(event){
    event.preventDefault();
  })
  
  columnElement.addEventListener('drop', function(event){
    if (draggedNote){
      columnElement.querySelector('[data-notes]').append(draggedNote);
    }
  })
}
 
function DragNotes(noteElement){
  noteElement.addEventListener('dragstart', DragStartNoteHandler);
  noteElement.addEventListener('dragend',   DragEndNoteHandler);
  noteElement.addEventListener('dragenter', DragEnterNoteHandler);
  noteElement.addEventListener('dragover',  DragOverNoteHandler);
  noteElement.addEventListener('dragleave', DragLeaveNoteHandler);
  noteElement.addEventListener('drop',  DragDropNoteHandler);
}

function DragStartNoteHandler (event){
  draggedNote = this; 

  this.classList.add('dragged');
  event.stopPropagation();
}

function DragEndNoteHandler (event){
  draggedNote = null;
  this.classList.remove('dragged'); 
  
  document
    .querySelectorAll('.note')
    .forEach(element => element.classList.remove('under'));
}

function DragEnterNoteHandler (event){
  if (this === draggedNote){
    return
  }
  this.classList.add('under');
}

function DragOverNoteHandler (event){
  event.preventDefault();

  if (this === draggedNote){
    return
  }
}

function DragLeaveNoteHandler (event){
  if (this === draggedNote){
    return
  }
  this.classList.remove('under');
}

function DragDropNoteHandler (event){
  event.stopPropagation();
  if (this === draggedNote){
    return
  } 
  if(this.parentElement === draggedNote.parentElement){
    const notes = Array.from(this.parentElement.querySelectorAll('.note'));
    const indexA = notes.indexOf(this)
    const indexB = notes.indexOf(draggedNote)
    if (indexA < indexB){
      this.parentElement.insertBefore(draggedNote,this)
    }
    else{
      this.parentElement.insertBefore(draggedNote,this.nextElementSibling)
    }
    
  }else{
    this.parentElement.insertBefore(draggedNote,this)
  }
}
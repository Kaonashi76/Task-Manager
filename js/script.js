let noteCounter   = 3;
let columnCounter = 4;
let draggedNote  = null;

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

    newColumn.innerHTML += `<p class="column-header"> </p>
                              <div data-notes></div>
                              <p class="column-footer">
                                <span data-action-addNote class="action">+ Добавить карточку</span>
                              </p>`
    document.querySelector('.columns').append(newColumn);  
   
    newColumn.querySelector('.column-header').setAttribute('contenteditable','true');
    newColumn.querySelector('.column-header').focus();

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
    newNote.setAttribute('contenteditable','true');     
    noteCounter++;

    columnElement.querySelector('[data-notes]').append(newNote); 
    newNote.focus();
    ChangeNote(newNote);
    
    
  });
  columnElement.addEventListener('dragover', function(event){
    event.preventDefault();
  })
  columnElement.addEventListener('drop', function(event){
    if (draggedNote){
      columnElement.querySelector('[data-notes]').append(draggedNote);
    }
  })
  
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
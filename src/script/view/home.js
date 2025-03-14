import Utils from '../utils.js';
import Notes from '../data/local/notes.js';

const listElement = document.querySelector('note-list')
const notesTitleElement = document.querySelector('#notes-title')
const notesBodyElement = document.querySelector('#notes-body')
const formNotesElement = document.querySelector("#form-notes")

const home = () => {
  const result = Notes.getAll();
  displayResult(result)
  saveNotes()
};

const displayResult = (notes) => {
  const notesItemElements = notes.map((note) => {
    const notesItemElement = document.createElement('note-items')
    notesItemElement.note = note
    return notesItemElement
  });

  Utils.emptyElement(listElement)
  listElement.append(...notesItemElements)
}

const saveNotes = () => {

  const elements = [notesTitleElement, notesBodyElement]

  elements.forEach((element) => {
    let length = (element == notesTitleElement) ? 6 : 25
    element.addEventListener('invalid', (event) => Utils.validationHandler(event, length));
    element.addEventListener('input', (event) => Utils.validationHandler(event, length)); 
    element.addEventListener('focus', (event) => Utils.validationHandler(event, length)); 
    element.addEventListener('blur', Utils.displayValidationMessage);
  });

  // Event listener untuk submit form
  formNotesElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = notesTitleElement.value;
    const body = notesBodyElement.value;

    Notes.saveNotes(title, body);
    displayResult(Notes.getAll());

    notesTitleElement.value = '';
    notesBodyElement.value = '';
  });

}

export default home;
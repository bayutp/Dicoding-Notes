import Utils from "../utils.js";
import NotesApi from "../data/remote/notes-api.js";

const listElement = document.querySelector("note-list");
const notesTitleElement = document.querySelector("#notes-title");
const notesBodyElement = document.querySelector("#notes-body");
const formNotesElement = document.querySelector("#form-notes");

const home = () => {
  getNotes();
  saveNotes();
  deleteNotes();
};

const getNotes = () => {
  NotesApi.getNotes()
    .then((result) => displayResult(result))
    .catch((error) => console.log(error));
};

const displayResult = (notes) => {
  const notesItemElements = notes.map((note) => {
    const notesItemElement = document.createElement("note-items");
    notesItemElement.note = note;
    return notesItemElement;
  });

  Utils.emptyElement(listElement);
  listElement.append(...notesItemElements);
};

const saveNotes = () => {
  const elements = [notesTitleElement, notesBodyElement];

  elements.forEach((element) => {
    let length = element == notesTitleElement ? 6 : 25;
    element.addEventListener("invalid", (event) =>
      Utils.validationHandler(event, length),
    );
    element.addEventListener("input", (event) =>
      Utils.validationHandler(event, length),
    );
    element.addEventListener("focus", (event) =>
      Utils.validationHandler(event, length),
    );
    element.addEventListener("blur", Utils.displayValidationMessage);
  });

  // Event listener untuk submit form
  formNotesElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = {
      title: notesTitleElement.value,
      body: notesBodyElement.value,
    };

    NotesApi.addNotes(note)
      .then((result) => {
        showMessage(result);
        getNotes();
      })
      .catch((error) => console.log(error));

    notesTitleElement.value = "";
    notesBodyElement.value = "";
  });
};

const deleteNotes = () => {
  document.addEventListener("delete-note", (event) => {
    NotesApi.deleteNotes(event.detail.id)
      .then((result) => {
        showMessage(result);
        getNotes();
      })
      .catch((error) => console.log(error));
  });
};

const showMessage = (message = "Check your internet connection") => {
  alert(message);
};

export default home;

import Utils from "../utils.js";
import NotesApi from "../data/remote/notes-api.js";
import Swal from "sweetalert2";

const noteListContainer = document.querySelector("#notesContainer");
const listElement = document.querySelector("note-list");
const notesTitleElement = document.querySelector("#notes-title");
const notesBodyElement = document.querySelector("#notes-body");
const formNotesElement = document.querySelector("#form-notes");
const loadingElement = document.querySelector("indikator-loading");

const home = () => {
  getNotes();
  saveNotes();
  deleteNotes();
};

const getNotes = () => {
  showLoading();
  NotesApi.getNotes()
    .then((result) => {
      displayResult(result);
      showNoteList();
    })
    .catch((error) => showError(error));
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
      .catch((error) => showError(error));

    notesTitleElement.value = "";
    notesBodyElement.value = "";
  });
};

const deleteNotes = () => {
  document.addEventListener("delete-note", (event) => {
    Swal.fire({
      icon: "question",
      title: "Are you sure",
      text: "You want to delete this note",
      showCancelButton: true,
      footer: "<p>Dicoding notes &copy; 2025</p>",
    }).then((result) => {
      if (result.isConfirmed) {
        NotesApi.deleteNotes(event.detail.id)
          .then((result) => {
            showMessage(result);
            getNotes();
          })
          .catch((error) => showError(error));
      }
    });
  });
};

const showMessage = (message = "Check your internet connection") => {
  Swal.fire({
    title: message,
    icon: "success",
  });
};

const showError = (error) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: error.message,
    footer: "Dicoding notes &copy; 2025",
  });
};

const showLoading = () => {
  Array.from(noteListContainer.children).forEach((element) => {
    Utils.hideElement(element);
  });
  Utils.showElement(loadingElement);
};

const showNoteList = () => {
  Array.from(noteListContainer.children).forEach((element) => {
    Utils.hideElement(element);
  });
  Utils.showElement(listElement);
};

export default home;

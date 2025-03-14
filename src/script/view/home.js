import Utils from "../utils.js";
import NotesApi from "../data/remote/notes-api.js";
import Swal from "sweetalert2";

const noteListContainer = document.querySelector("#notesContainer");
const archiveNotesContainer = document.querySelector("#notesArchiveContainer");
const listElement = document.querySelector("note-list");
const archiveElement = document.querySelector(".archived");

const notesTitleElement = document.querySelector("#notes-title");
const notesBodyElement = document.querySelector("#notes-body");
const formNotesElement = document.querySelector("#form-notes");
const loadingElement = document.querySelector("indikator-loading");

const home = () => {
  getNotes();
  getArchives();
  saveNotes();
  deleteNotes();
  archiveNotes();
  tabsConfig();
};

const getNotes = () => {
  showLoading();
  NotesApi.getNotes()
    .then((result) => {
      displayResult(result, false);
      showNoteList();
    })
    .catch((error) => showError(error));
};

const getArchives = () => {
  showLoading();
  NotesApi.getNotesArchive()
    .then((result) => {
      displayResult(result, true);
      showArchiveList();
    })
    .catch((error) => showError(error));
};

const displayResult = (notes, archived) => {
  const notesItemElements = notes.map((note) => {
    const notesItemElement = document.createElement("note-items");
    notesItemElement.note = note;
    return notesItemElement;
  });

  if (archived) {
    Utils.emptyElement(archiveElement);
    archiveElement.append(...notesItemElements);
  } else {
    Utils.emptyElement(listElement);
    listElement.append(...notesItemElements);
  }
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
            getArchives();
          })
          .catch((error) => showError(error));
      }
    });
  });
};

const archiveNotes = () => {
  document.addEventListener("archive-note", (event) => {
    if (event.detail.archived) {
      Swal.fire({
        icon: "question",
        title: "Are you sure",
        text: "You want to restore this note",
        showCancelButton: true,
        footer: "<p>Dicoding &copy; 2025</p>",
      }).then((result) => {
        if (result.isConfirmed) {
          NotesApi.setUnarchive(event.detail.id)
            .then((result) => {
              showMessage(result);
              getNotes();
              getArchives();
            })
            .catch((error) => showError(error));
        }
      });
    } else {
      Swal.fire({
        icon: "question",
        title: "Are you sure",
        text: "You want to archive this note",
        showCancelButton: true,
        footer: "<p>Dicoding &copy; 2025</p>",
      }).then((result) => {
        if (result.isConfirmed) {
          NotesApi.setArchive(event.detail.id)
            .then((result) => {
              showMessage(result);
              getNotes();
              getArchives();
            })
            .catch((error) => showError(error));
        }
      });
    }
  });
};

const tabsConfig = () => {
  document.querySelectorAll(".tab-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      // Hapus class active dari semua tombol
      document
        .querySelectorAll(".tab-btn")
        .forEach((btn) => btn.classList.remove("active"));
      // Tambahkan class active ke tombol yang diklik
      event.target.classList.add("active");

      // Ambil tab yang dipilih
      const selectedTab = event.target.dataset.tab;

      // Sembunyikan semua tab-content
      document
        .querySelectorAll(".tab-content")
        .forEach((tab) => tab.classList.remove("active"));

      // Tampilkan tab-content yang sesuai
      document.getElementById(`${selectedTab}-notes`).classList.add("active");
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

const showArchiveList = () => {
  Array.from(archiveNotesContainer.children).forEach((element) => {
    Utils.hideElement(element);
  });
  Utils.showElement(archiveElement);
};

export default home;

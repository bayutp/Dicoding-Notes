const BASE_URL = "https://notes-api.dicoding.dev/v2";

class NotesApi {
  static async getNotes() {
    const response = await fetch(`${BASE_URL}/notes`);
    if (!(response.status >= 200 && response.status <= 300)) {
      throw new Error("Something went wrong!");
    }

    const responseJson = await response.json();
    const { data: notes } = responseJson;

    return notes;
  }

  static async addNotes(note) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    };

    const response = await fetch(`${BASE_URL}/notes`, options);
    if (!(response.status >= 200 && response.status <= 300)) {
      throw new Error("Something went wrong!");
    }

    const responseJson = await response.json();
    return responseJson.message;
  }

  static async deleteNotes(noteId) {
    const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
      method: "DELETE",
    });
    if (!(response.status >= 200 && response.status <= 300)) {
      throw new Error("Something went wrong!");
    }

    const responseJson = await response.json();
    return responseJson.message;
  }

  static async setArchive(noteId) {
    const response = await fetch(`${BASE_URL}/notes/${noteId}/archive`, {
      method: "POST",
    });
    if (!(response.status >= 200 && response.status <= 300)) {
      throw new Error("Something went wrong!");
    }

    const responseJson = await response.json();
    return responseJson.message;
  }

  static async setUnarchive(noteId) {
    const response = await fetch(`${BASE_URL}/notes/${noteId}/unarchive`, {
      method: "POST",
    });
    if (!(response.status >= 200 && response.status <= 300)) {
      throw new Error("Something went wrong!");
    }

    const responseJson = await response.json();
    return responseJson.message;
  }

  static async getNotesArchive() {
    const response = await fetch(`${BASE_URL}/notes/archived`);
    if (!(response.status >= 200 && response.status <= 300)) {
      throw new Error("Something went wrong!");
    }

    const responseJson = await response.json();
    const { data: notes } = responseJson;
    return notes;
  }
}

export default NotesApi;

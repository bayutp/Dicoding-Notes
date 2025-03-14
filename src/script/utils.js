class Utils {
  static emptyElement(element) {
    element.innerHTML = "";
  }

  static showElement(element) {
    element.style.display = "block";
    element.hidden = false;
  }

  static hideElement(element) {
    element.style.display = "none";
    element.hidden = true;
  }

  static isValidInteger(newValue) {
    return Number.isNaN(newValue) || Number.isFinite(newValue);
  }

  static validationHandler = (event, length) => {
    event.target.setCustomValidity("");

    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity("Wajib diisi");
    }

    if (event.target.validity.tooShort) {
      event.target.setCustomValidity(`Minimal ${length} karakter`);
    }

    Utils.displayValidationMessage(event);
  };

  static resetValidation = (event) => {
    event.target.setCustomValidity("");
    Utils.displayValidationMessage(event);
  };

  static displayValidationMessage = (event) => {
    const isValid = event.target.validity.valid;
    const errorMessage = event.target.validationMessage;
    const connectedValidationId = event.target.getAttribute("aria-describedby");
    const connectedValidationEl = connectedValidationId
      ? document.getElementById(connectedValidationId)
      : null;

    if (connectedValidationEl) {
      connectedValidationEl.innerText = !isValid ? errorMessage : "";
    }
  };
}

export default Utils;

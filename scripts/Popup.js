export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.style.display = "flex";
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.style.display = "none";
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector(".popup__close-button");

    closeButton.addEventListener("click", () => {
      this.close();
    });

    this._popup.addEventListener("click", (event) => {
      if (event.target === event.currentTarget) {
        this.close();
      }
    });
  }
}

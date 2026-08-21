export default class Card {
  constructor({ name, link }, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeClick() {
    this._likeIcon.src = this._likeIcon.src.includes("likeBTN.svg")
      ? "images/likeBTN_Active.svg"
      : "images/likeBTN.svg";
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleImageClick() {
    this._handleCardClick(this._name, this._link);
  }

  _setEventListeners() {
    this._image.addEventListener("click", () => {
      this._handleImageClick();
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector(".card__image");
    this._nameElement = this._element.querySelector(".card__name");
    this._likeButton = this._element.querySelector(".card__like-btn");
    this._likeIcon = this._element.querySelector(".card__like-icon");
    this._deleteButton = this._element.querySelector(".card__delete-btn");

    this._image.src = this._link;
    this._image.alt = this._name;
    this._nameElement.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
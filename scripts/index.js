import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import {
  openModal,
  closeModal,
  closePopupByOverlayClick
} from "./utils.js";

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
  }
];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector("#edit-popup");
const editProfileCloseButton = editProfilePopup.querySelector(".popup__close-button");
const editProfileForm = document.querySelector("#edit-form");
const nameInput = document.querySelector("#name-input");
const jobInput = document.querySelector("#job-input");
const profileName = document.querySelector(".profile__name");
const profileRole = document.querySelector(".profile__role");

const addCardButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector("#add-card-popup");
const addCardCloseButton = addCardPopup.querySelector(".popup__close-button");
const addCardForm = document.querySelector("#add-card-form");
const cardNameInput = document.querySelector("#card-name-input");
const cardLinkInput = document.querySelector("#card-link-input");

const popupList = [editProfilePopup, addCardPopup];

const editProfileValidator = new FormValidator(validationConfig, editProfileForm);
const addCardValidator = new FormValidator(validationConfig, addCardForm);

const imagePopupInstance = new PopupWithImage("#image-popup");
imagePopupInstance.setEventListeners();

function openEditProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileRole.textContent;
  openModal(editProfilePopup);
  editProfileValidator.resetValidation();
}

function closeEditProfilePopup() {
  closeModal(editProfilePopup);
  editProfileForm.reset();
  editProfileValidator.resetValidation();
}

function handleEditProfileSubmit(event) {
  event.preventDefault();

  if (!editProfileForm.checkValidity()) {
    return;
  }

  profileName.textContent = nameInput.value;
  profileRole.textContent = jobInput.value;
  closeEditProfilePopup();
}

function openAddCardPopup() {
  addCardForm.reset();
  openModal(addCardPopup);
  addCardValidator.resetValidation();
}

function closeAddCardPopup() {
  closeModal(addCardPopup);
  addCardForm.reset();
  addCardValidator.resetValidation();
}

function handleAddCardSubmit(event) {
  event.preventDefault();

  if (!addCardForm.checkValidity()) {
    return;
  }

  const newCard = createCard({
    name: cardNameInput.value,
    link: cardLinkInput.value
  });

  cardSection.addItem(newCard);
  closeAddCardPopup();
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    (name, link) => {
      imagePopupInstance.open(name, link);
    }
  );

  return card.generateCard();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    }
  },
  ".elements"
);

cardSection.renderItems();

editProfileValidator.setEventListeners();
addCardValidator.setEventListeners();

editProfileButton.addEventListener("click", openEditProfilePopup);
editProfileCloseButton.addEventListener("click", closeEditProfilePopup);
editProfileForm.addEventListener("submit", handleEditProfileSubmit);

addCardButton.addEventListener("click", openAddCardPopup);
addCardCloseButton.addEventListener("click", closeAddCardPopup);
addCardForm.addEventListener("submit", handleAddCardSubmit);

popupList.forEach((popupElement) => {
  popupElement.addEventListener("click", closePopupByOverlayClick);
});

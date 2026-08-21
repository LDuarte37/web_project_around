import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

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

const cardsContainer = document.querySelector(".elements");

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

const imagePopup = document.querySelector("#image-popup");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close-button");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

const popupList = [editProfilePopup, addCardPopup, imagePopup];

function openModal(popupElement) {
  popupElement.style.display = "flex";
  document.addEventListener("keydown", closePopupByEsc);
}

function closeModal(popupElement) {
  popupElement.style.display = "none";
  document.removeEventListener("keydown", closePopupByEsc);
}

function closePopupByElement(popupElement) {
  if (popupElement === editProfilePopup) {
    closeEditProfilePopup();
    return;
  }

  if (popupElement === addCardPopup) {
    closeAddCardPopup();
    return;
  }

  closeImagePopup();
}

function closePopupByOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closePopupByElement(event.currentTarget);
  }
}

function closePopupByEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = popupList.find((popupElement) => {
      return popupElement.style.display === "flex";
    });

    if (openedPopup) {
      closePopupByElement(openedPopup);
    }
  }
}

function openEditProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileRole.textContent;
  openModal(editProfilePopup);
  resetValidation(editProfileForm, validationConfig);
}

function closeEditProfilePopup() {
  closeModal(editProfilePopup);
  editProfileForm.reset();
  resetValidation(editProfileForm, validationConfig);
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
  resetValidation(addCardForm, validationConfig);
}

function closeAddCardPopup() {
  closeModal(addCardPopup);
  addCardForm.reset();
  resetValidation(addCardForm, validationConfig);
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

  cardsContainer.prepend(newCard); 
  closeAddCardPopup();
}

function openImagePopup(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imagePopup);
}

function closeImagePopup() {
  closeModal(imagePopup);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", openImagePopup);

  return card.generateCard();
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardsContainer.append(cardElement);
});

enableValidation(validationConfig);

editProfileButton.addEventListener("click", openEditProfilePopup);
editProfileCloseButton.addEventListener("click", closeEditProfilePopup);
editProfileForm.addEventListener("submit", handleEditProfileSubmit);

addCardButton.addEventListener("click", openAddCardPopup);
addCardCloseButton.addEventListener("click", closeAddCardPopup);
addCardForm.addEventListener("submit", handleAddCardSubmit);

imagePopupCloseButton.addEventListener("click", closeImagePopup);

popupList.forEach((popupElement) => {
  popupElement.addEventListener("click", closePopupByOverlayClick);
});

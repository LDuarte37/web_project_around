import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//Selectores
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const editProfileForm = document.querySelector("#edit-form");
const addCardForm = document.querySelector("#add-card-form");

const nameInput = document.querySelector("#name-input");
const jobInput = document.querySelector("#job-input");

//Instancias
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__role",
});  

const imagePopupInstance = new PopupWithImage("#image-popup");
imagePopupInstance.setEventListeners();

const editProfilePopupInstance = new PopupWithForm(
  "#edit-popup",
  ({ name, about }) => {
    userInfo.setUserInfo({
      name: name,
      job: about,
    });  

    editProfilePopupInstance.close();
  },  
);  
editProfilePopupInstance.setEventListeners();

const addCardPopupInstance = new PopupWithForm(
  "#add-card-popup",
  ({ name, link }) => {
    const card = new Card(
      { name, link },
      "#card-template",
      (name, link) => {
        imagePopupInstance.open(name, link);
      }
    );

    cardSection.addItem(card.generateCard());
    addCardPopupInstance.close();
  },
);
addCardPopupInstance.setEventListeners();

const editProfileValidator = new FormValidator(
  validationConfig,
  editProfileForm,
);  
const addCardValidator = new FormValidator(validationConfig, addCardForm);

//Cards + Section
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(
        cardData,
        "#card-template",
        (name, link) => {
          imagePopupInstance.open(name, link);
        }
      );

      cardSection.addItem(card.generateCard());
    },
  },
  ".elements"
);

cardSection.renderItems();

//Listeners
editProfileButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  
  nameInput.value = currentUserInfo.name;
  jobInput.value = currentUserInfo.job;
  
  editProfileValidator.resetValidation();
  editProfilePopupInstance.open();
});    

addCardButton.addEventListener("click", () => {
  addCardValidator.resetValidation();
  addCardPopupInstance.open();
});    

editProfileValidator.setEventListeners();
addCardValidator.setEventListeners();

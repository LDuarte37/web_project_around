//Cargar tarjetas iniciales
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

const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".elements");

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardName = cardElement.querySelector(".card__name");
  const likeButton = cardElement.querySelector(".card__like-btn");
  const likeIcon = cardElement.querySelector(".card__like-icon");
  const deleteButton = cardElement.querySelector(".card__delete-btn");

  cardImage.src = link;
  cardImage.alt = name;
  cardName.textContent = name;

  // Like
  likeButton.addEventListener("click", () => {
    likeIcon.src = likeIcon.src.includes("likeBTN.svg")
      ? "images/likeBTN_Active.svg"
      : "images/likeBTN.svg";
  });

  // Delete
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

initialCards.forEach((item) => {
  const card = createCard(item.name, item.link);
  cardsContainer.append(card);
});



// BOTÓN PARA ABRIR POPUP
const openPopupButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector("#edit-popup");
const closePopupButton = document.querySelector(".popup__close-button");

// INPUTS
let nameInput = document.querySelector("#name-input");
let jobInput = document.querySelector("#job-input");
let formElement = document.querySelector("#edit-form");

// BOTÓN GUARDAR
const submitButton = document.querySelector(".popup__submit-button");

// ELEMENTOS DEL PERFIL A MODIFICAR
const profileName = document.querySelector(".profile__name");
const profileRole = document.querySelector(".profile__role");

// ----- Función para abrir popup -----
function openPopup() {
  popup.style.display = "flex";

  // Rellenar inputs con nombre actual
  nameInput.value = profileName.textContent;
  jobInput.value = profileRole.textContent;

  checkInputs();
}

// ----- Función para cerrar popup -----
function closePopup() {
  popup.style.display = "none";

  nameInput.value = "";
  jobInput.value = "";
  checkInputs();
  closePopupButton.removeEventListener("click", closePopup);
}

// Eventos abrir/cerrar
openPopupButton.addEventListener("click", openPopup);
closePopupButton.addEventListener("click", closePopup);

// ----- HABILITAR/DESHABILITAR BOTÓN -----
function checkInputs() {
  if (nameInput.value.trim() !== "" && jobInput.value.trim() !== "") {
    submitButton.disabled = false;
    submitButton.classList.add("popup__submit-button_enabled");
    submitButton.classList.remove("popup__submit-button_disabled");
  } else {
    submitButton.disabled = true;
    submitButton.classList.remove("popup__submit-button_enabled");
    submitButton.classList.add("popup__submit-button_disabled");
  }
}

// Escucha cambios en ambos campos
nameInput.addEventListener("input", checkInputs);
jobInput.addEventListener("input", checkInputs);

// ----- GUARDAR NUEVOS DATOS EN EL PERFIL -----
formElement.addEventListener("submit", function (event) {
  event.preventDefault();

  // Cambiar el nombre y el rol en el perfil
  profileName.textContent = nameInput.value;
  profileRole.textContent = jobInput.value;

  // Cerrar popup
  closePopup();
});

// BOTÓN +
const addCardButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector("#add-card-popup");
const closeAddCardButton = addCardPopup.querySelector(".popup__close-button");

// FORM ADD CARD
const addCardForm = document.querySelector("#add-card-form");
const cardNameInput = document.querySelector("#card-name-input");
const cardLinkInput = document.querySelector("#card-link-input");
const addCardSubmitButton = addCardForm.querySelector(".popup__submit-button");

function openAddCardPopup() {
  addCardPopup.style.display = "flex";
  checkAddCardInputs();
}

function closeAddCardPopup() {
  addCardPopup.style.display = "none";
  addCardForm.reset();
  checkAddCardInputs();
}

function checkAddCardInputs() {
  if (
    cardNameInput.value.trim() !== "" &&
    cardLinkInput.value.trim() !== ""
  ) {
    addCardSubmitButton.disabled = false;
    addCardSubmitButton.classList.add("popup__submit-button_enabled");
    addCardSubmitButton.classList.remove("popup__submit-button_disabled");
  } else {
    addCardSubmitButton.disabled = true;
    addCardSubmitButton.classList.remove("popup__submit-button_enabled");
    addCardSubmitButton.classList.add("popup__submit-button_disabled");
  }
}

cardNameInput.addEventListener("input", checkAddCardInputs);
cardLinkInput.addEventListener("input", checkAddCardInputs);

addCardButton.addEventListener("click", openAddCardPopup);
closeAddCardButton.addEventListener("click", closeAddCardPopup);


addCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const newCard = createCard(
    cardNameInput.value,
    cardLinkInput.value
  );

  cardsContainer.prepend(newCard); // 👈 se agrega al inicio
  closeAddCardPopup();
});

// POPUP IMAGE
const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const closeImagePopupButton = imagePopup.querySelector(".popup__close-button");

function openImagePopup(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  imagePopup.style.display = "flex";
}

function closeImagePopup() {
  imagePopup.style.display = "none";
}

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardName = cardElement.querySelector(".card__name");
  const likeButton = cardElement.querySelector(".card__like-btn");
  const likeIcon = cardElement.querySelector(".card__like-icon");
  const deleteButton = cardElement.querySelector(".card__delete-btn");

  cardImage.src = link;
  cardImage.alt = name;
  cardName.textContent = name;

  // 🔍 Abrir imagen grande
  cardImage.addEventListener("click", () => {
    openImagePopup(name, link);
  });

  // ❤️ Like
  likeButton.addEventListener("click", () => {
    likeIcon.src = likeIcon.src.includes("likeBTN.svg")
      ? "images/likeBTN_Active.svg"
      : "images/likeBTN.svg";
  });

  // 🗑️ Delete
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

closeImagePopupButton.addEventListener("click", closeImagePopup);
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* Elements */
// Wrappers
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardModal = document.querySelector("#add-card-modal");
// more efficient way of accessing forms below. since code wasn't setup for it, the old code is still below at ln 35
// const addCardFormElement = addCardModal.forms["add-card-form"];
const addCardFormElement = addCardModal.querySelector(".modal__form");
// Buttons and other  DOM nodes
const profileEditButton = document.querySelector("#profile-edit-button");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
// find the button to close previewImageModal
const previewCloseButton = document.querySelector("#preview-close-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardButton = document.querySelector(".profile__add-button");
// find previewImageModal element
const previewModal = document.querySelector("#open-image-modal");
// find the element I want to have its src changed
const largeImage = previewModal.querySelector(".large-image");
// find the large-text element
const largeText = previewModal.querySelector(".large-text");

/* Functions */
function openModal(modal) {
  modal.classList.add("modal_open");
}
function closeModal(modal) {
  modal.classList.remove("modal_open");
}

function closePopup() {
  closeModal(profileEditModal);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".cards__image");
  const cardTitleEl = cardElement.querySelector(".cards__title");
  const likeButton = cardElement.querySelector(".cards__like-button");
  // find delete button
  const trashButton = cardElement.querySelector(".cards__trash-button");

  // add event listener to delete
  trashButton.addEventListener("click", () => {
    cardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("cards__like-button_active");
  });

  // add click listener to the cardImageEl element, with elements added inside forEach loop
  cardImageEl.addEventListener("click", () => {
    // change src to cardData.link
    largeImage.src = cardData.link;
    // change alt to cardData.name
    largeImage.setAttribute("alt", cardData.name);
    // change large-text to cards_title
    largeText.textContent = cardData.name;
    // openModal with previewImageModal
    openModal(previewModal);
  });
  cardImageEl.src = cardData.link;
  cardImageEl.setAttribute("alt", cardData.name);
  cardTitleEl.textContent = cardData.name;

  return cardElement;
} /* *** Close the getCardElement, which has all the cardData, 
to keep its dynamic functions responsive within */

// addCardModal
function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");

/* Event Handlers */
function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  evt.target.reset();
  closeModal(addCardModal);
}

/* Event Listeners */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

const profileCloseButton = document.querySelector("#profile-close-button");
profileCloseButton.addEventListener("click", closePopup);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

/* initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}); */
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

// add new card
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

// add click event listener to close previewImageModal, with the function to closeModal inside, so as to not create memory leaks in a visitor's browser
previewCloseButton.addEventListener("click", () => closeModal(previewModal));

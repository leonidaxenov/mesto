const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');

const popupEditProfile = document.querySelector('.popup_edit-profile');
const formEditName = popupEditProfile.querySelector('.popup__input_name');
const formEditDescription = popupEditProfile.querySelector('.popup__input_description');

const popupAddCard = document.querySelector('.popup_add-card');
const formAddCard = popupAddCard.querySelector('.popup__container');
const formAddName = popupAddCard.querySelector('.popup__input_name');
const formAddUrl = popupAddCard.querySelector('.popup__input_description');

const cardTemplate = document.querySelector('#card').content;

const popupViewCard = document.querySelector('.popup_view-card');
const formViewElementImage = popupViewCard.querySelector('.popup__element-image');
const formViewElementText = popupViewCard.querySelector('.popup__element-name');

const gridCards = document.querySelector('.elements');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
initialCards.forEach(card=>{
  const element = createCard(card.name,card.link);
  gridCards.append(element);
});


function closePopup(event, popup)
{
  popup.classList.remove('popup_visible');
}

function showPopup(event, popup)
{
  popup.classList.add('popup_visible');
}

function addCloseEventListener(popup)
{
  const closeButton = popup.querySelector('.popup__close-button');
  closeButton.addEventListener('click', event=>closePopup(event,popup));
}

function addSaveEventListener(popup, onSave)
{
  const form = popup.querySelector('.popup__container');
  form.addEventListener('submit', event=>{
    event.preventDefault();
    onSave(event);
    closePopup(event,popup);
  });
}

function handleLikeButton(event)
{
  event.currentTarget.classList.toggle('element__like_enabled');
}

function createCard(name,link)
{
  const element = cardTemplate.querySelector('.element').cloneNode(true);

  const imageElement = element.querySelector('.element__photo');
  imageElement.src = link;
  imageElement.alt = name;
  imageElement.addEventListener('click', (event)=> {
    formViewElementImage.src = link;
    formViewElementImage.alt = name;
    formViewElementText.textContent = name;
    showPopup(event,popupViewCard);
  });

  const textElement = element.querySelector('.element__description');
  textElement.textContent = name;

  const likeElement = element.querySelector('.element__like');
  likeElement.addEventListener('click', handleLikeButton);

  const deleteElement = element.querySelector('.element__delete');
  deleteElement.addEventListener('click', (event)=> {
    event.currentTarget.parentElement.remove();
  });
  return element;
}
/*
window.addEventListener('scroll',(event)=> {
   popup.style.top=`${window.pageYOffset}px`;
});
*/
editButton.addEventListener('click', event=>{
  formEditName.value = profileName.textContent;
  formEditDescription.value = profileDesc.textContent;
  showPopup(event,popupEditProfile);
});

addCloseEventListener(popupEditProfile);
addSaveEventListener(popupEditProfile, event=>{
  profileName.textContent = formEditName.value;
  profileDesc.textContent = formEditDescription.value;
});

addButton.addEventListener('click', event=>{
  formAddCard.reset();
  showPopup(event,popupAddCard);
});
addCloseEventListener(popupAddCard);
addSaveEventListener(popupAddCard, event=>{
  const element = createCard(formAddName.value,formAddUrl.value);
  gridCards.prepend(element);
});

addCloseEventListener(popupViewCard);

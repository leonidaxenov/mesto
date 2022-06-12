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


function closePopup(popup)
{
  popup.classList.remove('popup_visible');
}

function showPopup(popup)
{
  popup.classList.add('popup_visible');
}

function addCloseEventListener(popup)
{
  popup.addEventListener('click', (evt)=>{
    if(evt.target.classList.contains('popup__close-button') || evt.target===popup)
      closePopup(popup);
  }
  );
}

function addSaveEventListener(popup, onSave)
{
  const form = popup.querySelector('.popup__container');
  form.addEventListener('submit', event=>{
    event.preventDefault();
    onSave();
    closePopup(popup);
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
  imageElement.addEventListener('click', ()=> {
    formViewElementImage.src = link;
    formViewElementImage.alt = name;
    formViewElementText.textContent = name;
    showPopup(popupViewCard);
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

editButton.addEventListener('click', ()=>{
  formEditName.value = profileName.textContent;
  formEditDescription.value = profileDesc.textContent;
  showPopup(popupEditProfile);
});


addSaveEventListener(popupEditProfile, ()=>{
  profileName.textContent = formEditName.value;
  profileDesc.textContent = formEditDescription.value;
});

addButton.addEventListener('click', ()=>{
  formAddCard.reset();
  showPopup(popupAddCard);
});

addSaveEventListener(popupAddCard, ()=>{
  const element = createCard(formAddName.value,formAddUrl.value);
  gridCards.prepend(element);
});

Array.from(document.querySelectorAll('.popup')).forEach(addCloseEventListener);

document.addEventListener('keydown', (evt)=>{
  if(evt.key === 'Escape'){
    const popup = document.querySelector('.popup_visible');
    if(popup)
      closePopup(popup);
  }
});

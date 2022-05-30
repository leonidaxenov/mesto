const editButton=document.querySelector('.profile__edit-button');
const addButton=document.querySelector('.profile__add-button');
const profileName=document.querySelector('.profile__name');
const profileDesc=document.querySelector('.profile__description');

const popup=document.querySelector('.popup');

const popupEditContainerTemplate = document.querySelector('#popup_edit').content;
const formEdit=popupEditContainerTemplate.querySelector('.popup__container').cloneNode(true);
const formEditName=formEdit.querySelector('.popup__input_name');
const formEditDescription=formEdit.querySelector('.popup__input_description');

const popupAddContainerTemplate = document.querySelector('#popup_add').content;
const formAdd=popupAddContainerTemplate.querySelector('.popup__container').cloneNode(true);
const formAddName=formAdd.querySelector('.popup__input_name');
const formAddUrl=formAdd.querySelector('.popup__input_description');


const cardTemplate = document.querySelector('#card').content;

const popupViewElementTemplate = document.querySelector('#popup_view_element').content;
const formViewElement=popupViewElementTemplate.querySelector('.popup__element-container').cloneNode(true);
const formViewElementImage=formViewElement.querySelector('.popup__element-image');
const formViewElementText=formViewElement.querySelector('.popup__element-name');

const elements = document.querySelector('.elements');

function closePopup(event)
{
  popup.classList.remove('popup_visible');
  popup.classList.add('popup_hidden');
  if(popup.children.length)
    popup.children[0].remove();
}

function showPopup(event, form)
{
  popup.append(form);
  popup.classList.remove('popup_hidden');
  popup.classList.add('popup_visible');
}

function addCloseEventListener(form)
{
  const closeButton=form.querySelector('.popup__close-button');
  closeButton.addEventListener('click', closePopup);
}

function addSaveEventListener(form, onSave)
{
  form.addEventListener('submit', event=>{
    event.preventDefault();
    onSave(event);
    closePopup(event);
  });
}

function onLike(event)
{
  event.currentTarget.classList.toggle('element__like_disabled');
  event.currentTarget.classList.toggle('element__like_enabled');
}

function createCard(name,link)
{
  const element = cardTemplate.querySelector('.element').cloneNode(true);

  const imageElement = element.querySelector('.element__photo');
  imageElement.src = link;
  imageElement.addEventListener('click', (event)=> {
    formViewElementImage.src=link;
    formViewElementImage.alt=name;
    formViewElementText.textContent = name;
    showPopup(event,formViewElement);
  });

  const textElement = element.querySelector('.element__description');
  textElement.textContent = name;

  const likeElement = element.querySelector('.element__like');
  likeElement.addEventListener('click', onLike);

  const deleteElement = element.querySelector('.element__delete');
  deleteElement.addEventListener('click', (event)=> {
    event.currentTarget.parentElement.remove();
  });
  return element;
}

window.addEventListener('scroll',(event)=> {
   popup.style.top=`${window.pageYOffset}px`;
});

editButton.addEventListener('click', event=>{
  formEditName.value=profileName.textContent;
  formEditDescription.value=profileDesc.textContent;
  showPopup(event,formEdit);
});

addCloseEventListener(formEdit);
addSaveEventListener(formEdit, event=>{
  profileName.textContent=formEditName.value;
  profileDesc.textContent=formEditDescription.value;
});

addButton.addEventListener('click', event=>{
  formAdd.reset();
  showPopup(event,formAdd);
});
addCloseEventListener(formAdd);
addSaveEventListener(formAdd, event=>{
  const element=createCard(formAddName.value,formAddUrl.value);
  elements.prepend(element);
});

addCloseEventListener(formViewElement);

{
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
    const element=createCard(card.name,card.link);
    elements.append(element);
  });
}

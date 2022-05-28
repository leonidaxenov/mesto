const editButton=document.querySelector('.profile__edit-button');
const addButton=document.querySelector('.profile__add-button');
const popup=document.querySelector('.popup');
const popupAddEditContainerTemplate = document.querySelector('#popup_add_edit').content;
const popupViewElementTemplate = document.querySelector('#popup_view_element').content;
const cardTemplate = document.querySelector('#card').content;
const profileName=document.querySelector('.profile__name');
const profileDesc=document.querySelector('.profile__description');

function submitEdit(event)
{
  const name=document.querySelector('.profile__name');
  const inputName=document.querySelector('.popup__input_name');
  name.textContent=inputName.value;
  const desc=document.querySelector('.profile__description');
  const inputDesc=document.querySelector('.popup__input_description');
  desc.textContent=inputDesc.value;
}

function submitAdd(event)
{
  event.preventDefault();
  const inputName=document.querySelector('.popup__input_name');
  const inputDesc=document.querySelector('.popup__input_description');
  addCard(inputName.value,inputDesc.value);
  closePopup(event);
}

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

function createEditForm()
{
  const form=popupAddEditContainerTemplate.querySelector('.popup__container').cloneNode(true);
  const header=form.querySelector('.popup__header');
  header.textContent = "Редактировать профиль";
  const inputName=form.querySelector('.popup__input_name');
  inputName.value=profileName.textContent;
  const inputDesc=form.querySelector('.popup__input_description');
  inputDesc.type='text';
  inputDesc.value=profileDesc.textContent;
  addCloseEventListener(form);
  addSaveEventListener(form, submitEdit);
  return form;
}
/*
function showPopup(event)
{
  const header=document.querySelector('.popup__header');
  const inputName=document.querySelector('.popup__input_name');
  const inputDesc=document.querySelector('.popup__input_description');
  const replaceFontColor=(element, is_edit)=>{
    if(is_edit){
      element.classList.remove('popup__input_font_color-add');
      element.classList.add('popup__input_font_color-edit');
    }
    else {
      element.classList.add('popup__input_font_color-add');
      element.classList.remove('popup__input_font_color-edit');
    }
  };
  const replaceFontColorOnEdit=(event)=>replaceFontColor(event.currentTarget,true);
  const form=document.querySelector('.popup__container');
  if(event.currentTarget.classList.contains('profile__edit-button')){
    header.textContent = "Редактировать профиль";
    replaceFontColor(inputName,true);
    replaceFontColor(inputDesc,true);

    inputName.value=name.textContent;
    inputDesc.type='text';
    inputDesc.value=desc.textContent;
    inputName.removeEventListener('input',replaceFontColorOnEdit);
    inputDesc.removeEventListener('input',replaceFontColorOnEdit);
    form.addEventListener('submit', submitEdit);
    form.removeEventListener('submit', submitAdd);
  }
  else if(event.currentTarget.classList.contains('profile__add-button')){
    header.textContent = "Новое место";
    replaceFontColor(inputName,false);
    replaceFontColor(inputDesc,false);
    inputName.value="Название";
    inputName.addEventListener('input',replaceFontColorOnEdit);
    inputDesc.type='url';
    inputDesc.value="Ссылка на картинку";
    inputDesc.addEventListener('input',replaceFontColorOnEdit);
    form.removeEventListener('submit', submitEdit);
    form.addEventListener('submit', submitAdd);
 }
  let popup=document.querySelector('.popup');
  popup.classList.remove('popup_hidden');
  popup.classList.add('popup_visible');
}
*/
function addCard(name,link)
{
  const userTemplate = document.querySelector('#card').content;
  const element = userTemplate.querySelector('.element').cloneNode(true);

  const imageElement = element.querySelector('.element__photo');
  imageElement.src = link;
  imageElement.addEventListener('click', (event)=> {
    const popup=document.querySelector('.popup_view-element');
    popup.classList.remove('popup_hidden');
    popup.classList.add('popup_visible');

    const image=popup.querySelector('.popup__element-image');
    image.src=link;
    image.alt=name;

    const text=popup.querySelector('.popup__element-name');
    text.textContent=name;
  });
  imageElement.style.height=imageElement.style.width;

  const textElement = element.querySelector('.element__description');
  textElement.textContent = name;

  const likeElement = element.querySelector('.element__like');
  likeElement.addEventListener('click', (event)=> {
    if(event.currentTarget.classList.contains('element__like_disabled')) {
      event.currentTarget.classList.remove('element__like_disabled')
      event.currentTarget.classList.add('element__like_enabled')
    }
    else {
      event.currentTarget.classList.remove('element__like_enabled')
      event.currentTarget.classList.add('element__like_disabled')
    }
  });

  const deleteElement = element.querySelector('.element__delete');
  deleteElement.addEventListener('click', (event)=> {
    event.currentTarget.parentElement.remove();
  });

  const grid = document.querySelector('.elements');
  grid.prepend(element);
  console.log(imageElement.style);
}

window.addEventListener('scroll',(event)=> {
  const popups=document.querySelectorAll('.popup');
  popups.forEach(popup=>{
    popup.style.top=`${window.pageYOffset}px`;
  });
});

editButton.addEventListener('click', event=>{
  const form=createEditForm();
  showPopup(event,form);
});

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
  initialCards.forEach(card=>addCard(card.name,card.link));
}

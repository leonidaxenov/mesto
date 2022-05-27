function submitEdit(event)
{
  event.preventDefault();
  const name=document.querySelector('.profile__name');
  const input_name=document.querySelector('.popup__input_name');
  name.textContent=input_name.value;
  const desc=document.querySelector('.profile__description');
  const input_desc=document.querySelector('.popup__input_description');
  desc.textContent=input_desc.value;
  closePopup(event);
}

function submitAdd(event)
{
  event.preventDefault();
  const input_name=document.querySelector('.popup__input_name');
  const input_desc=document.querySelector('.popup__input_description');
  addCard(input_name.value,input_desc.value);
  closePopup(event);
}

function showPopup(event)
{
  const header=document.querySelector('.popup__header');
  const input_name=document.querySelector('.popup__input_name');
  const input_desc=document.querySelector('.popup__input_description');
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
    replaceFontColor(input_name,true);
    replaceFontColor(input_desc,true);
    const name=document.querySelector('.profile__name');
    const desc=document.querySelector('.profile__description');
    input_name.value=name.textContent;
    input_desc.type='text';
    input_desc.value=desc.textContent;
    input_name.removeEventListener('input',replaceFontColorOnEdit);
    input_desc.removeEventListener('input',replaceFontColorOnEdit);
    form.addEventListener('submit', submitEdit);
    form.removeEventListener('submit', submitAdd);
  }
  else if(event.currentTarget.classList.contains('profile__add-button')){
    header.textContent = "Новое место";
    replaceFontColor(input_name,false);
    replaceFontColor(input_desc,false);
    input_name.value="Название";
    input_name.addEventListener('input',replaceFontColorOnEdit);
    input_desc.type='url';
    input_desc.value="Ссылка на картинку";
    input_desc.addEventListener('input',replaceFontColorOnEdit);
    form.removeEventListener('submit', submitEdit);
    form.addEventListener('submit', submitAdd);
 }
  let popup=document.querySelector('.popup');
  popup.classList.remove('popup_hidden');
  popup.classList.add('popup_visible');
}

function closePopup(event)
{
  const popups=document.querySelectorAll('.popup');
  console.log(popups);
  popups.forEach(popup=>{
    popup.classList.remove('popup_visible');
    popup.classList.add('popup_hidden');
  });
}

window.addEventListener('scroll',(event)=> {
  const popups=document.querySelectorAll('.popup');
  popups.forEach(popup=>{
    popup.style.top=`${window.pageYOffset}px`;
  });
});

const editButton=document.querySelector('.profile__edit-button');
editButton.addEventListener('click', showPopup);

const addButton=document.querySelector('.profile__add-button');
addButton.addEventListener('click', showPopup);

const closeButtons=document.querySelectorAll('.popup__close-button');
closeButtons.forEach(closeButton=>closeButton.addEventListener('click', closePopup));

function addCard(name,link){
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
}

(()=>{
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
})();

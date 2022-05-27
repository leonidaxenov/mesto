function closePopup(event)
{
  let popup=document.querySelector('.popup');
  popup.classList.remove('popup_visible');
  popup.classList.add('popup_hidden');
}

window.addEventListener('scroll',(event)=> {
  let popup=document.querySelector('.popup');
  popup.style.top=`${window.pageYOffset}px`;
});

let editButton=document.querySelector('.profile__edit-button');
editButton.addEventListener('click', (event)=> {
  let name=document.querySelector('.profile__name');
  let input_name=document.querySelector('.popup__input_name');
  input_name.value=name.textContent;
  let desc=document.querySelector('.profile__description');
  let input_desc=document.querySelector('.popup__input_description');
  input_desc.value=desc.textContent;
  let popup=document.querySelector('.popup');
  popup.classList.remove('popup_hidden');
  popup.classList.add('popup_visible');
});

let closeButton=document.querySelector('.popup__close-button');
closeButton.addEventListener('click', closePopup);

let form=document.querySelector('.popup__container');
form.addEventListener('submit', (event)=> {
  event.preventDefault();
  let name=document.querySelector('.profile__name');
  let input_name=document.querySelector('.popup__input_name');
  name.textContent=input_name.value;
  let desc=document.querySelector('.profile__description');
  let input_desc=document.querySelector('.popup__input_description');
  desc.textContent=input_desc.value;
  closePopup(event);
});

function addCard(name,link){
  const userTemplate = document.querySelector('#card').content;
  const element = userTemplate.querySelector('.element').cloneNode(true);

  const imageElement = element.querySelector('.element__photo');
  imageElement.src = link;

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

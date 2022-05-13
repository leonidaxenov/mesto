function subrscribeOnLikeClick()
{
  let likes=document.querySelectorAll('.elements__like');
  for(let i=0;i<likes.length;i++) {
    likes[i].addEventListener('click', (event)=> {
      if(event.currentTarget.classList.contains('elements__like_disabled')) {
        event.currentTarget.classList.remove('elements__like_disabled')
        event.currentTarget.classList.add('elements__like_enabled')
      }
      else {
        event.currentTarget.classList.remove('elements__like_enabled')
        event.currentTarget.classList.add('elements__like_disabled')
      }
    });
  }
}

function closePopup(event)
{
  let popup=document.querySelector('.popup');
  popup.classList.remove('popup_visible');
  popup.classList.add('popup_hidden');
}

subrscribeOnLikeClick();
window.addEventListener('scroll',(event)=> {
  let popup=document.querySelector('.popup');
  popup.style.top=`${window.pageYOffset}px`;
});

let editButton=document.querySelector('.profile__edit-button');
editButton.addEventListener('click', (event)=> {
  let name=document.querySelector('.profile__name');
  let input_name=document.querySelector('.popup__name');
  input_name.value=name.textContent;
  let desc=document.querySelector('.profile__description');
  let input_desc=document.querySelector('.popup__description');
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
  let input_name=document.querySelector('.popup__name');
  name.textContent=input_name.value;
  let desc=document.querySelector('.profile__description');
  let input_desc=document.querySelector('.popup__description');
  desc.textContent=input_desc.value;
  closePopup(event);
});

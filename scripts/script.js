function subrscribeOnLikeClick()
{
  let likes=document.querySelectorAll('.elements__like');
  console.log(likes.length);
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

subrscribeOnLikeClick();

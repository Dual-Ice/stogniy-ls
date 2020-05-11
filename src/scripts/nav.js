const navItems = document.querySelectorAll(".nav__item");
const scrollDown = document.querySelector(".scroll-down");
const hamOpen = document.querySelector('.ham-menu__btn');
const hamMenu = document.querySelector('.header__ham-menu');
const hamClose = document.querySelector('.ham-menu__close')

hamOpen.addEventListener('click', (event) => {
  event.preventDefault()
  hamMenu.classList.add('header__ham-menu--openned')
  switchScroll()
})

hamClose.addEventListener('click', (event) => {
  event.preventDefault()
  hamMenu.classList.remove('header__ham-menu--openned') 
  switchScroll()
})

navItems.forEach(navItem => {
  const link = navItem.firstChild.hash;
  const target = getTarget(link);

  navItem.addEventListener('click', (e) => {
    e.preventDefault()
    const hamMenu = navItem.closest('.header__ham-menu--openned')
    if (hamMenu) {
      hamMenu.classList.remove('header__ham-menu--openned')
      switchScroll()
    }
    scrollTo(target)
  });
});

scrollDown.addEventListener('click', (e) => {
  e.preventDefault()
  const target = getTarget(scrollDown.hash)
  scrollTo(target)
})

function getTarget (link) {
  return document.querySelector(link);
}

function scrollTo (target) {
  target.scrollIntoView({block: "start", behavior: "smooth"});
}

function switchScroll () {
  document.body.classList.toggle('body--scroll-block')
}

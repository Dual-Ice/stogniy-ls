const submitBtn = document.querySelector("#contacts__form-submit")
const form = document.querySelector("#contacts__form")
let formInValid

( () => {
  Array.from(form.elements).forEach(elem => {
    if (elem.type === "submit") return
    elem.addEventListener("input", () => {
      if (formInValid) {
        validateElem(elem)
      }
    })
  })
})()

function switchScroll () {
  document.body.classList.toggle('body--scroll-block')
}


function formValidate (form) {
  formInValid = Array.from(form.elements).some(elem => !elem.checkValidity())
}
submitBtn.addEventListener("click", (e) => {
  e.preventDefault()
  formValidate(form)
  if (formInValid) {
    Array.from(form.elements).forEach(elem => {
      if (elem.type === "submit") return
      validateElem(elem)
    })
  } else {
    const template = document.querySelector("#modalTemplate").innerHTML;
    const modal = createModal(template);
    modal.open();
  }
})

function validateElem(elem) {
  if (!elem.checkValidity()) {
    showError(elem)
  } else {
    hideError(elem)
  }
}

function showError (elem) {
  let errorText = ''
  const parent = elem.closest('.form__block')
  const tooltip = parent.querySelector('.error-tooltip')
  parent.classList.add('error')
  if (elem.value.length === 0) {
    errorText = "Поле не должно быть пустым"
  } else {
    switch (elem.type) {
      case 'email':
        errorText = "Введите корректный e-mail"
        break
      case 'textarea':
        errorText = "Введите не менее 15 символов"
        break
    }
  }

  tooltip.innerText = errorText
  tooltip.classList.add("error-tooltip--showed")
}

function emptyForm (form) {
  form.reset()
}

function hideError (elem) {
  const parent = elem.closest('.form__block')
  const tooltip = parent.querySelector('.error-tooltip')
  parent.classList.remove('error')
  tooltip.innerText = ''
  tooltip.classList.remove("error-tooltip--showed")
}

function createModal(template) {
  const fragment = document.createElement('div');

  fragment.innerHTML = template;

  const modalElement = fragment.querySelector(".modal");
  const closeElement = fragment.querySelector("#modal__close");
  
  modalElement.addEventListener("click", e => {
    if (e.target === modalElement) {
      closeElement.click(e);

    }
  });

  closeElement.addEventListener("click", (e) => {
    e.preventDefault()
    document.querySelector('.contacts').removeChild(modalElement);
    switchScroll()
    emptyForm(form)
  });

  return {
    open() {
      document.querySelector('.contacts').appendChild(modalElement);
      switchScroll()
    },
    close() {
      closeElement.click();
    }
  };
}
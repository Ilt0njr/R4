const toCheck = {

  IsEmpty() {
    if (document.forms.length < 1) return false
    else return true
  },

  SomeoneIsEmpty() {
    const txts = document.getElementsByTagName("textarea")

    let bool = true
    for (let i = 0; i < txts.length; i++) {
      const id = txts[i].id
      const info = document.getElementById(id + "-info")

      if (txts[i].value != "") {
        txts[i].style.border = "2px solid #DDDDDD"
        txts[i].style.boxShadow = "none"
        info.innerHTML = ""
      } else {
        info.innerHTML = "Preencha todos os campos."
        info.style.color = "red"
        info.style.fontSize = "0.8rem"
        txts[i].style.border = "2px solid red"
        info.classList.toggle("error")
        bool = false
      }
    }
    return bool
  },

  AllObjectiveHasAnAnswer() {
    const forms = document.forms
    let bool = true
    for (let i = 0; i < forms.length; i++) {
      const id = forms[i].id
      const radio = document.querySelector(`input[name="${id}"]:checked`)
      if (radio) {
        document.querySelectorAll(`input[name="${id}"`).forEach(i => i.style.border = "1.8px solid black")
      }
      else {
        bool = false
        document.querySelectorAll(`input[name="${id}"`).forEach(i => {
          i.style.border = "1.8px solid red"
          i.classList.toggle("error")
        })
      }

    }
    return bool
  }
}



export default function check() {
  if (Object.values(toValidate).every(e => e() == true)) return true
  else {
    document.getElementById("getPDF").classList.toggle("error")
    return false
  }
}
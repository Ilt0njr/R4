const _TEXTAREA = (id, cl = "") => `
<div class="input-wrapper">
  <textarea id="${id}" class="${cl}" oninput="autoResize(this)"></textarea>
  <span id ="${id}-info" > </span>
</div>
`


const _QUESTION = (id) => `
<div class="top-wrapper">
  <a class="q-num">Questão.</a>
  <div class="icons-wrapper">
    <span class="material-symbols-outlined AddText">
      add_notes
    </span>
    <span>
      <span type="button" class="material-symbols-outlined AddImage">
        add_photo_alternate
        <input type="file" style="display: none;" accept="image/png, image/jpeg, image/jpg" />
      </span>
    </span>
    <span class="material-symbols-outlined Delete" style="color: red">
      delete
    </span>
  </div>
</div>
<span class="_GUIDE" />

<div class="input-wrapper">
  <label>Enunciado:</label>
  ${_TEXTAREA(`c${id}`, "Enunciado:")}
</div>

<div class="altBox">
  <div class="q-option">
    <span class="qA" >A</span>
    ${_TEXTAREA(`${id}-alt0`, "alt")}
    <input type="radio" name="${id}" value="0" />
  </div>
</div>
<div style="display:flex; justify-content: flex-end; margin-top: 50px">
  <button type="button" class="button AddAlternative">Adicionar Alternativa</button>
</div>
`

function createQuestion(id) {

  function createHTML() {
    const mod = _QUESTION(id)
    const form = document.createElement("form")
    form.setAttribute("id", id)
    form.innerHTML = mod
    return form
  }

  function countTexts() {
    const nTexts = HTML.getElementsByClassName("text-text").length + 1
    const nImgs = HTML.getElementsByClassName("image-text").length
    return nImgs + nTexts
  }

  function numerate() {
    const ns = document.getElementsByClassName("q-num")
    for (let i = 0; i < ns.length; i++) {
      ns[i].innerHTML = `Questão ${i + 1}`
    }
  }

  function setFunctions(HTML) {
    for (const [key, f] of Object.entries(Functions)) {
      HTML.getElementsByClassName(key)[0].onclick = f
    }
  }

  const Functions = {
    AddText() {
      const div = document.createElement("div")
      const ID = `${id}-text${countTexts()}`
      const _GUIDE = HTML.getElementsByClassName("_GUIDE")[0]
      const textHTML = _TEXTAREA(ID, "text-text")
      div.setAttribute("class", "input-wrapper")
      div.innerHTML = `<label>Texto ${countTexts()}</label>` + textHTML
      HTML.insertBefore(div, _GUIDE)
    },

    AddImage() {
      const span = HTML.getElementsByClassName("AddImage")[0]
      const picker = span.getElementsByTagName("input")[0]
      const _GUIDE = HTML.getElementsByClassName("_GUIDE")[0]
      picker.click()

      picker.onchange = () => {
        const file = picker.files[0]
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.addEventListener("load", () => {
            const img = document.createElement("img")
            const ID = `${id}-text${countTexts()}`
            img.setAttribute("src", reader.result)
            img.setAttribute("class", "image-text")
            img.setAttribute("id", ID)
            img.onload = () => {
              const width = (200*img.width/img.height)
              img.setAttribute("height", "200px")
              img.setAttribute("width", width + "px")
            }
            HTML.insertBefore(img, _GUIDE)
          });
        }
      }
    },

    Delete() {
      const check = confirm('Tem certeza que quer deletar essa questão?')
      if (check) {
        HTML.remove()
        numerate()
      }
    },

    AddAlternative() {
      const altBox = HTML.getElementsByClassName("altBox")[0]
      const addBtn = HTML.getElementsByClassName("AddAlternative")[0]
      const nAlt = HTML.getElementsByClassName("alt").length
      const ID = `${id}-alt${nAlt}`
      const A = ["A", "B", "C", "D", "E"]
      const div = document.createElement("div")
      div.setAttribute("class", "q-option")
      div.innerHTML = `
        <span class="qA">${A[nAlt]}</span>
        ${_TEXTAREA(ID, "alt")}
        <input type="radio" name="${id}" value="${nAlt}"/>
      `
      if (nAlt < 5) {
        altBox.appendChild(div)
      } else if (nAlt == 5) {
        addBtn.style.backgroundColor = "var(--light-gray)"
        addBtn.style.color = "var(--dark-gray)"
      } else {
        addBtn.classList.toggle("error")
      }
    }
  }



  const HTML = createHTML(id)
  numerate()
  setFunctions(HTML)
  return HTML
}

export function createObjectiveQuestion() {
  const exam = document.getElementById("exam")
  const createID = () => {
    const D = new Date()
    return "" + D.getHours() + D.getMinutes() + D.getSeconds() + parseInt(Math.random() * 100)
  }

  const id = createID()
  const question = createQuestion(id)
  exam.appendChild(question)
  
  return id
}
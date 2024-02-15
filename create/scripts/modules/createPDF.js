const { jsPDF } = window.jspdf;

export function createPDF(doc, test, QR, profName){
  doc.addPage()
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();
  const arrAlfabeto = ["A", "B", "C", "D", "E"]
  const centerH = width / 2
  const gabFirstPosH = centerH - 12
  const maxHeight = 285

  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text("Nome:", 10, 15)
  doc.line(25, 15, 130, 15, "S")
  doc.text("Turma:", 10, 22)
  doc.line(25, 22, 50, 22, "S")
  doc.text("Professor(a): ", 10, 29)
  doc.text("Data:", 10, 36)
  doc.setFont(undefined, 'normal');
  doc.text(profName, 37, 29)
  doc.line(23, 36, 56, 36, "S")
  doc.line(34, 36, 35, 33, "S")
  doc.line(45, 36, 46, 33, "S")
  doc.rect(170, 10, 30, 30);
  doc.addImage(QR, 140, 10, 30, 30)
  doc.rect(140, 10, 30, 30);
  doc.text("Nota:", 173, 15)

  //doc.rect(10, 10, 190, 275)

  const checkIfHasSpace = (size, posV) => posV + size > 295 ? false : true

  const checkIfAddPage = (state) => {
    if (state == "left") {
      return false
    }
    if (state == "right") {
      return true
    }
  }

  const pagePosH = (pos) => pos == "left" ? 10 : 105 + 10

  const posGiver = (doc, size, posV, state) => {
    const hasSpace = checkIfHasSpace(size, posV)

    if (hasSpace) {
      return [pagePosH(state), posV, state]
    } else {
      const addPage = checkIfAddPage(state)
      if (addPage) {
        doc.addPage()
        return [pagePosH("left"), 10, "left"]
      } else {
        let info = doc.internal.getCurrentPageInfo();
        pageNumber = info.pageNumber
        if (pageNumber == 1) {
          return [pagePosH("right"), gabLastPosV, "right"]
        }
        else {
          return [pagePosH("right"), 10, "right"]
        }
      }
    }
  }

  const textSizeGiver = (text) => text.length * 4

  let accV = 50
  let accH = gabFirstPosH
  const r = 2
  for (let i = 0; i < test.length; i++) {
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.text("" + (i + 1) + ":", gabFirstPosH - 15, accV + 1)
    doc.setFont(undefined, 'normal');
    for (let j = 0; j < 5; j++) {
      doc.circle(accH, accV, r);
      doc.setFontSize(6);
      doc.text(arrAlfabeto[j], accH - 0.75, accV + 0.75)
      accH += 6
    }
    accH = gabFirstPosH
    accV += 5
  }

  let state = "left"
  let posV = accV + 10
  let posH = 0
  let gabLastPosV = posV + 4.5
  doc.line(centerH, posV, centerH, maxHeight, "S")

  const guideH = gabFirstPosH - r
  const guideV = 50 - r

  const w = 6
  const h = 2.5

  doc.rect(guideH - w, guideV - w, w, h, "F")
  doc.rect(guideH - w, guideV - w, h, w, "F")

  doc.rect(guideH + 25.5 + w, guideV - w, h, w, "F")
  doc.rect(guideH + 25.5 + h, guideV - w, w, h, "F")


  doc.rect(guideH - w, accV - 5.5 + w, w, h, "F")
  doc.rect(guideH - w, accV - 5.5 + h, h, w, "F")


  doc.rect(guideH + 25.5 + h, accV - 5.5 + w, w, h, "F")
  doc.rect(guideH + 25.5 + w, accV - 5.5 + h, h, w, "F")



  doc.setFontSize(11);
  for (let i = 0; i < test.length; i++) {
    posV += 4.5
    let j = 1
    for (let text of test[i].texts) {
      if (text.type == "text") {
        const textF = doc.splitTextToSize(text.content, centerH - 15);
        [posH, posV, state] = posGiver(doc, textSizeGiver(textF), posV, state)
        doc.setFont(undefined, 'bold');
        doc.text(`Texto ${j}`, posH, posV)
        doc.setFont(undefined, 'normal');
        posV += 4.5
        doc.text(textF, posH, posV + 4.5)
        posV += (textSizeGiver(textF)) + 10
      } else if (text.type == "image") {
        [posH, posV, state] = posGiver(doc, 50, posV, state)
        doc.setFont(undefined, 'bold');
        doc.text(`Texto ${j}`, posH, posV)
        doc.setFont(undefined, 'normal');
        posV += 4.5
        doc.addImage(text.content, posH, posV, (50*text.content.width)/text.content.height,50)
        posV += 60
      }
      j += 1
    }


    const commandF = doc.splitTextToSize(test[i].command, centerH - 15);
    [posH, posV, state] = posGiver(doc, textSizeGiver(commandF), posV, state)

    doc.setFont(undefined, 'bold');
    doc.text(posH - 3, posV, (i + 1) + ".")
    doc.setFont(undefined, 'normal');
    doc.text(posH + 5, posV, commandF)

    posV += (textSizeGiver(commandF)) + 5

    const alternatives = test[i].alternatives
    for (let j = 0; j < alternatives.length; j++) {
      const alternativeF = doc.splitTextToSize(alternatives[j].content, centerH - 20);

       [posH, posV, state] = posGiver(doc, textSizeGiver(alternatives), posV, state)

      doc.setFont(undefined, 'bold');
      doc.text(arrAlfabeto[j], posH, posV)
      doc.setFont(undefined, 'normal');


      doc.text(alternativeF, posH + 5, posV)
      posV += (textSizeGiver(alternativeF)) + 5
    }
  }
}


/*
test = [{ command: "oi", alternatives: [], texts: [] },
  { command: "oi", alternatives: [], texts: [] },
  { command: "oi", alternatives: [], texts: [] },
  { command: "oi", alternatives: [], texts: [] }, { command: "oi", alternatives: [], texts: [] }, { command: "oi", alternatives: [], texts: [] }, { command: "oi", alternatives: [], texts: [] }, { command: "oi", alternatives: [], texts: [] }, { command: "oi", alternatives: [], texts: [] },
]

createExam(test, "Ilton Pfleger").save("a4oi.pdf")*/
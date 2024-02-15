const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}

export function shuffleExam(exam){
  shuffle(exam)
  for (let i = exam.length - 1; i > 0; i--) {
    shuffle(exam[i].alternatives)
  }
}
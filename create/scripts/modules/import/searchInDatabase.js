export default function search(term) {
  const value = document.getElementById("dialog-import-search").value.toLowerCase()
  const ul = document.getElementById("importQuestionDialog-renderList")
  const liList = ul.getElementsByTagName("li")
  for (let i = 0; i < liList.length; i++) {
    if (liList[i].innerHTML.toLowerCase().includes(value)) liList[i].style.display = "list-item"
    else liList[i].style.display = "none"
  }

}
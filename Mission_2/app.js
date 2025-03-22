// list-item 을 담을 container dom
const lists = document.querySelector(".list-container");
// list-item 요소
const newTodo = document.createElement("div");
newTodo.classList.add("list-item");
// completed 확인할 input-checkbox
const checkInput = document.createElement("input");
checkInput.type = "checkbox";
checkInput.classList = "checkbox";
checkInput.checked = false;
// 내용을 적을 p
const pElement = document.createElement("p");
pElement.innerText = "asd";
// 수정 버튼
const changeButton = document.createElement("button");
changeButton.classList.add("change-button");
changeButton.innerText = "수정";

newTodo.appendChild(checkInput);
newTodo.appendChild(pElement);
newTodo.appendChild(changeButton);

lists.appendChild(newTodo);

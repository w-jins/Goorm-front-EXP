let todos = [];

// list-item 을 담을 container dom
// btn, input 을 조작할 dom
const lists = document.querySelector(".list-container");
const btn = document.querySelector(".btn");
const input = document.querySelector(".input");

btn.addEventListener("click", createNewTodo);
// input 박스를 하나 만들어서 사용하기 때문에 생성하기 전 새롭게 text에 초기화 후
// 나중에 쓸 item 에 초기화 하여햐 한다.
let text = "";
input.addEventListener("input", () => {
  text = input.value;
});

function createNewTodo() {
  const item = { id: new Date().getTime(), text: text, complete: false };
  // 입력창에 아무것도 입력하지 않았을 때
  if (item.text === "") {
    alert("다시 입력해주세요");
    return;
  }

  todos.unshift(item);
  const { newTodo, inputElement } = createTodoElement(item);

  lists.prepend(newTodo);

  createLocalStorage();
  input.value = "";
  item.text = "";
}

function createTodoElement(item) {
  // list-item 요소
  const newTodo = document.createElement("div");
  newTodo.classList.add("list-item");
  // completed 확인할 input-checkbox
  const checkInput = document.createElement("input");
  checkInput.type = "checkbox";
  checkInput.classList = "checkbox";
  checkInput.checked = item.complete;

  // 내용을 적을 input
  const inputElement = document.createElement("input");
  inputElement.classList.add("content");
  inputElement.type = "text";
  inputElement.value = item.text;
  inputElement.setAttribute("disabled", "");
  // 수정 버튼
  const changeButton = document.createElement("button");
  changeButton.classList.add("change-button");
  changeButton.innerText = "수정";
  //삭제 버튼
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerText = "삭제";

  // 만일 item이 complete 되어있으면 class에 complete 를 추가
  // 추가 후 text-decoration도 변경
  if (item.complete) {
    newTodo.classList.add("complete");
    inputElement.style.textDecoration = "line-through";
  }
  // 수정 버튼을 눌렀을 때 input의 값을 저장
  inputElement.addEventListener("input", () => {
    item.text = inputElement.value;
    createLocalStorage();
  });
  // input 창 이외에 다른 곳을 클릭했을 때
  inputElement.addEventListener("blur", () => {
    inputElement.setAttribute("disabled", "");
    createLocalStorage();
  });

  checkInput.addEventListener("change", () => {
    item.complete = checkInput.checked;
    if (item.complete) {
      newTodo.classList.add("complete");
      inputElement.style.textDecoration = "line-through";
    } else {
      newTodo.classList.remove("complete");
      inputElement.style.textDecoration = "none";
    }
    createLocalStorage();
  });

  changeButton.addEventListener("click", () => {
    inputElement.removeAttribute("disabled");
    inputElement.focus();

    createLocalStorage();
  });
  deleteButton.addEventListener("click", () => {
    lists.removeChild(newTodo);
    todos = todos.filter((todo) => todo.id !== item.id);
    createLocalStorage();
  });

  newTodo.append(checkInput);
  newTodo.append(inputElement);
  newTodo.append(changeButton);
  newTodo.append(deleteButton);

  return { newTodo, inputElement };
}

// localStorage 에 저장, 저장 할 떄는 JSON 형태가 아닌 string 형태로 넣어야 오류가 덜 발생
function createLocalStorage() {
  const data = JSON.stringify(todos);

  localStorage.setItem("todos", data);
}

// 리로드 했을 시 localStorage에 todos 가 있다면 불러와서 JSON 형태로 만든 후
// todos 에 초기화
function loadFromLocalStorage() {
  const data = localStorage.getItem("todos");
  console.log(JSON.parse(data));
  if (data) {
    todos = JSON.parse(data);
  }
}
// 처음 로드 되었을 때 localStorage 를 확인 후 있다면 todo-list를 생성

function displayTodo() {
  loadFromLocalStorage();

  for (let i = 0; i < todos.length; i++) {
    const item = todos[i];
    const { newTodo } = createTodoElement(item);

    lists.prepend(newTodo);
  }
}

displayTodo();

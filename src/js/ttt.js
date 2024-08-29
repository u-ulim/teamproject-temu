// 1.사용자로부터 input를 통해서 입력값을 받느ㄴㄴ다.

// 2.입력값이 ㅂ확인되면, ul 태그 자식요소로 하나씩 추까해준다.

// 3. ul 태그자식요소 중 삭제 버튼을 클릭했을 때, 버튼을 포함하고 있는 부모요소를 확인 후 같이 삭제해준다.

// 4. locallstorage 사용자가 입력한 값이영구적으로 보관될 수 있도록  값을 저장시킨다.

// 5. 사용자가 값을 입력하면 다이렉트로 ui 화면에 출력되는 것이 아니라, 이제부터느 ㄴlocalstorage 안에 저장된 값ㅡㄹ 찾아ㅘ서 UI화면에 출력시키도록 한다.

// 6.삭제버튼을 클릭한다면, 직접적으로 UI화면 내 값을 삭제해주는 것이 ㅏ니라, llocalstorage값을 먼저 삭제 후 삭제가 ㅓㅂ데이트 된 값을 ui화면에 출력시켜준다.

const form = document.querySelector("form");
const input = document.querySelector("input[type='text']");
console.log(input.value);

const ul = document.querySelector("ul");

let todos = [];

const save = () => {
  // localStorage.setItem(`todos`, todos); => strigify로 변환
  localStorage.setItem("todos", JSON.stringify(todos));
};
// 오로지 세 가지의 형식만 입력가능 ,json은 모른다. 서로가 소통하는 언어가 다름, object Objec /object Object  => JSON의 형태로 언어로 변경해주어ㅇ야함 .

const delItem = (e) => {
  const target = e.target.parentElement;
  console.log(target);
  todos = todos.filter((todo) => todo.id != target.id);
  save();
  target.remove();
};

const addItem = (todo) => {
  if (todo.text !== "") {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");

    span.innerText = todo.text;
    button.innerText = `삭제`;
    button.addEventListener("click", delItem);

    ul.appendChild(li);
    li.appendChild(span);
    li.appendChild(button);
    ll.id = todo.id;
  }
};

const handler = (e) => {
  e.preventDefault();
  const todo = {
    id: Date.now(),
    text: input.value,
  };

  todos.push(todo);
  addItem(todo);
  save(); //로컬스토리지  저장
  input.value = ""; // input 값을 비웁니다.
};

// 각 li에 id 주고,
const init = () => {
  const userTodos = JSON.parse(localStorage.getItem("todos"));

  if (userTodos) {
    todos = userTodos;

    userTodos.forEach((todo) => {
      addItem(todo);
    });
  }
};

form.addEventListener("submit", handler);

// 로컬스토리 지: 반영구 //삭제가 되지 않는다면  //  무한정

// 세션스토리지 : 임시 // 웹브라우저가 작동, // 컴퓨터 실행

// 로컬스토리지를 저장하는 방법
// localStorage.setItem("Hello", "World");

// 로컬스토리지 데이터를 가져오는 방법
// const myData = localStorage.getItem("Hello");

// console.log(myData);

// 로컬스토리지를  삭제하는 방법

// const form = document.querySelector("form");
// const input = document.querySelector("input[type='text']");
// const ul = document.querySelector("ul");

// let todos = [];

// const save = () => {
//   localStorage.setItem('todos', JSON.stringify(todos));
// };

// const delItem = (e) => {
//   const target = e.target.parentElement;
//   todos = todos.filter((todo) => todo.id != target.id);
//   save();
//   target.remove();
// };

// const addItem = (todo) => {
//   if (todo.text !== "") {
//     const li = document.createElement("li");
//     const span = document.createElement("span");
//     const button = document.createElement("button");

//     span.innerText = todo.text;
//     button.innerText = "삭제";
//     button.addEventListener("click", delItem);

//     li.appendChild(span);
//     li.appendChild(button);
//     li.id = todo.id;

//     ul.appendChild(li);
//   }
// };

// const handler = (e) => {
//   e.preventDefault();

//   const todo = {
//     id: Date.now(),
//     text: input.value,
//   };

//   todos.push(todo);
//   addItem(todo);
//   save();
//   input.value = ""; // input 값을 비웁니다.
// };

// const init = () => {
//   const userTodos = JSON.parse(localStorage.getItem('todos'));

//   if (userTodos) {
//     todos = userTodos;
//     userTodos.forEach((todo) => {
//       addItem(todo);
//     });
//   }
// };

// init();

// form.addEventListener("submit", handler);

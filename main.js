let input = document.querySelector(".input");
let ul = document.querySelector("ul");
let randomNumber = Date.now();

function reducer(state = [], action) {
  switch (action.type) {
    case "add_todo":
      return state.concat({
        id: action.id,
        text: action.text,
        completed: false,
      });
    case "toggle_todo":

    default:
      return state;
  }
}

let store = Redux.createStore(reducer);

function render() {
  let nextState = store.getState();
  ul.innerHTML = "";
  nextState.map((data, id) => {
    var li = document.createElement("li");
    var div = `<div class="todo_li">
                      <input type="checkbox" />
                      <p data-id=${id}>${data.text}</p>
                      <span>x</span>
                    </div>`;

    li.innerHTML = div;
    ul.append(li);
  });
}

store.subscribe(render);

input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13 && event.target.value.trim()) {
    store.dispatch({
      type: "add_todo",
      text: event.target.value,
      id: randomNumber,
    });
    event.target.value = "";
  }
});

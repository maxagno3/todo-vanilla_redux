let input = document.querySelector(".input");
let complete = document.querySelector(".completed");
let clear = document.querySelector(".clear");
let all = document.querySelector(".all");

let active = document.querySelector(".active");
let ul = document.querySelector("ul");

function reducer(state = { todo: [], filter: "All" }, action) {
  let { todo, filter } = state;

  switch (action.type) {
    case "add_todo":
      return {
        todo: [
          ...state.todo,
          {
            id: Date.now(),
            text: action.text,
            completed: false,
          },
        ],
        filter: "All",
      };
    case "toggle_todo":
      return {
        todo: todo.map((toggle) => {
          if (toggle.id == action.id) {
            toggle.completed = !toggle.completed;
            return toggle;
          } else {
            return toggle;
          }
        }),
      };
    case "Delete":
      return {
        todo: todo.filter((todo) => todo.id !== action.id),
      };
    case "Clear":
      console.log(action);
      return {
        todo: todo.filter((todo) => !todo.completed),
      };
    case "All":
      state.filter = "All";
      return state;
    case "Active":
      state.filter = "Active";
      return state;
    case "Completed":
      state.filter = "Completed";
      return state;
    default:
      return state;
  }
}

let store = Redux.createStore(reducer);

function render(todo = []) {
  let filter = (store.getState() && store.getState().filter) || "All";
  switch (filter) {
    case "All":
      nextState = (store.getState() && store.getState().todo) || [];
      break;
    case "Active":
      nextState =
        store.getState() &&
        store.getState().todo.filter((task) => !task.completed);
      break;
    case "Completed":
      nextState =
        store.getState() &&
        store.getState().todo.filter((task) => task.completed);
      break;
    default:
      nextState = (store.getState() && store.getState().todo) || [];
  }

  console.log(nextState);

  ul.innerHTML = "";
  nextState.map((data) => {
    var li = document.createElement("li");
    var div = `<div class="todo_li">
                  <input type="checkbox" 
                    data-id=${data.id} 
                    onclick="handleClick(event)" 
                    ${data.completed ? "checked" : ""}
                  />
                  <p ondblclick="handleEdit(event, ${data.id})">${data.text}</p>
                  <span
                  onclick="handleDelete(event,${data.id})">x</span>
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
    });
    event.target.value = "";
  }
});

let handleClick = (e, id) => {
  store.dispatch({ type: "toggle_todo", id: e.target.dataset.id });
};

all.addEventListener("click", function () {
  store.dispatch({ type: "All" });
});

let handleDelete = (e, id) => {
  store.dispatch({ type: "Delete", id });
};

complete.addEventListener("click", function () {
  store.dispatch({ type: "Completed" });
});

active.addEventListener("click", function () {
  store.dispatch({ type: "Active" });
});

clear.addEventListener("click", function () {
  store.dispatch({ type: "Clear" });
});

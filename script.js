// !selectors
const todoInput = document.querySelector('.todo-input');

const todoButton = document.querySelector('.todo-btn');

const todoList = document.querySelector('.todo-list');

const filterOption = document.querySelector('.filter-todo');

// !event listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);

// !functions

function addTodo(event) {
  // stops form from submitting
  event.preventDefault();
  // create todo div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  // create li 
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  // add todo to local storage 
  saveLocalTodos(todoInput.value);
  //completed button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);
  
  //delete  button trash
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);
  //append or add to the todo list 
  todoList.appendChild(todoDiv);
  //clear input felled after submit the value
  todoInput.value = '';

}

function deleteCheck(e){
  const item = e.target;
  //delete todo
  if(item.classList[0]=== 'trash-btn') {
    const todo = item.parentElement;
    // Animation when delete todo item
    todo.classList.add('fall');
    // remove elements from local storage
    removeLocalTodos(todo);
    todo.addEventListener('transitionend',function(){
      todo.remove();
    })
    
  }
  //check mark for completed
  if(item.classList[0]=== 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}
// filter function 
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo){
    switch(e.target.value){
      case "all": 
        todo.style.display = 'flex';
        break;
      case 'completed':
        if(todo.classList.contains('completed')) {
          todo.style.display = "flex";
        } else 
        {
          todo.style.display = "none";
        }
        
          break;
        case 'uncompleted':
          if(!todo.classList.contains('completed')) {
            todo.style.display = "flex";
          } else 
          {
            todo.style.display = "none";
          }
          break;
      }
    });
}

function saveLocalTodos(todo) {
  // check if there anything in local storage
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  }
  else 
  {
    todos = JSON.parse(localStorage.getItem('todos'));
  } 

  todos.push(todo);
  localStorage.setItem('todos',JSON.stringify(todos));
}


function getTodos(todo) {
  // check if there anything in local storage
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  }
  else 
  {
    todos = JSON.parse(localStorage.getItem('todos'));
  } 
  todos.forEach(function(todo){
    // create todo div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  // create li 
  const newTodo = document.createElement('li');
  newTodo.innerText = todo;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  //completed button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);
  
  //delete  button trash
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);
  //append or add to the todo list 
  todoList.appendChild(todoDiv);
  //clear input felled after submit the value
  });

}

function removeLocalTodos(todo) {
  // check if there anything in local storage
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  }
  else 
  {
    todos = JSON.parse(localStorage.getItem('todos'));
  } 
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

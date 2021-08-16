'use strict';


const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');


const todoData = JSON.parse(localStorage.getItem('data')) || [];

const render = function () {

    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function (item, index) {

        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }
        const btntodoCompleted = li.querySelector('.todo-complete');
        btntodoCompleted.addEventListener('click', function () {
            item.completed = !item.completed;
            render();
        })

        const btntodoRemove = li.querySelector('.todo-remove');
        btntodoRemove.addEventListener('click', function () {
            console.log(index);
            todoData.splice(index,1);
            render();
        })
    })
    localStorage.data=JSON.stringify(todoData);
};

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();
   
   if (headerInput.value != '') {
        const newTodo = {
            value: headerInput.value,
            completed: false
        }

        todoData.push(newTodo);
        headerInput.value = '';
        render();
   }
});

render();

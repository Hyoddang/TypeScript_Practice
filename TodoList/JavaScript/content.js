var TodoEvent = /** @class */ (function () {
    function TodoEvent() {
    }
    TodoEvent.getInstance = function () {
        if (!this.instance) {
            this.instance = new TodoEvent();
        }
        return this.instance;
    };
    TodoEvent.prototype.addTodoButton = function () {
        var addTodoBtn = document.querySelector(".add-todo");
        if (addTodoBtn) {
            addTodoBtn.onclick = function () {
                TodoService.getInstance().addTodo();
            };
        }
    };
    TodoEvent.prototype.deleteTodoBtn = function () {
        var deleteButton = document.querySelectorAll(".content-wrap .delete-button");
        deleteButton.forEach(function (deleteButton, index) {
            deleteButton.onclick = function () {
                TodoService.getInstance().deleteBtn(index);
            };
        });
    };
    TodoEvent.instance = null;
    return TodoEvent;
}());
var TodoService = /** @class */ (function () {
    function TodoService() {
        // 로컬 스토리지에서 키값을 가져옴
        var storedTodos = localStorage.getItem("todoList");
        // 저장된 Todo가 있으면 Json 형식으로 파싱
        // 그렇지 않으면 [] 빈 배열 할당
        this.todoList = storedTodos ? JSON.parse(storedTodos) : [];
        // 생성 시 todoList를 로드해서 화면에 표시
        this.loadTodoList();
    }
    TodoService.getInstance = function () {
        if (!this.instance) {
            this.instance = new TodoService();
        }
        return this.instance;
    };
    TodoService.prototype.uploadTodoList = function () {
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
        this.loadTodoList();
    };
    // 새 Todo를 추가하는 메서드
    TodoService.prototype.addTodo = function () {
        var todoInput = document.querySelector(".input");
        // 입력값(todoInput)값이 없거나, 공백일 경우 - 함수 종료
        if (!todoInput || !todoInput.value.trim())
            return;
        var todo = {
            todoContent: todoInput.value,
            todoTitle: "",
            done: false,
        };
        this.todoList.push(todo);
        this.uploadTodoList();
        this.loadTodoList();
    };
    TodoService.prototype.deleteBtn = function (deleteIndex) {
        var deleteBtn = document.querySelector(".delete-todo");
        if (deleteBtn) {
            deleteBtn.onclick = function () {
                TodoService.getInstance().todoList.splice(deleteIndex, 1);
            };
        }
        this.uploadTodoList();
        this.loadTodoList();
    };
    // 화면에 TodoList를 표시하는 메서드
    TodoService.prototype.loadTodoList = function () {
        var todoContentList = document.querySelector(".todo-content");
        // 해당 엘리먼트가 없으면 함수 종료
        if (!todoContentList)
            return;
        todoContentList.innerHTML = "";
        this.todoList.forEach(function (todo) {
            todoContentList.innerHTML += "\n      <div class=\"content-wrap\">\n      <li class=\"content-list\">".concat(todo.todoContent, "</li>\n      <button class=\"delete-btn\">\n        <i class=\"fa-solid fa-xmark\"></i>\n      </button>\n    </div>");
        });
        TodoEvent.getInstance().addTodoButton();
        TodoEvent.getInstance().deleteTodoBtn();
    };
    TodoService.instance = null;
    return TodoService;
}());

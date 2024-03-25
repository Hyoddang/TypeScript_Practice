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
                TodoService.getInstance().addTodoBtn();
            };
        }
    };
    TodoEvent.prototype.deleteTodoButton = function () {
        var deleteTodoBtn = document.querySelector(".delete-todo");
        deleteTodoBtn.onclick = function () {
            TodoService.getInstance().deleteTodoBtn();
        };
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
        this.loadtodoList();
    }
    TodoService.getInstance = function () {
        if (!this.instance) {
            this.instance = new TodoService();
        }
        return this.instance;
    };
    TodoService.prototype.loadtodoList = function () {
        var todoContent = document.querySelector(".todo-content");
        // 해당 엘리먼트가 없으면 함수 종료
        if (!todoContent)
            return;
    };
    TodoService.prototype.addTodoBtn = function () {
        var todoInput = document.querySelector(".add-todo");
        // 입력값(todoInput)값이 없거나, 공백일 경우 - 함수 종료
        if (!todoInput || !todoInput.value.trim())
            return;
    };
    TodoService.prototype.deleteTodoBtn = function () {
        var deleteButton = document.querySelector(".delete-button");
        deleteButton.forEach(function (deleteBtn, index) {
            deleteBtn.onclick = function () {
            };
        });
    };
    TodoService.instance = null;
    return TodoService;
}());

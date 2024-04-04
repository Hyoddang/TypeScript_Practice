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
                //* input 입력 값 초기화
                var todoInput = document.querySelector(".input-content");
                if (todoInput) {
                    todoInput.value = '';
                }
            };
        }
    };
    //* keyboard 이벤트 리스너
    TodoEvent.prototype.addTodoKeyEvent = function () {
        var todoInput = document.querySelector('.input-content');
        if (todoInput) {
            todoInput.onkeyup = function (event) {
                if (event.key === 'Enter') {
                    var addTodoButton = document.querySelector('.add-todo');
                    addTodoButton === null || addTodoButton === void 0 ? void 0 : addTodoButton.click();
                }
            };
        }
    };
    TodoEvent.prototype.deleteTodoBtn = function () {
        var deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach(function (deleteButton, index) {
            deleteButton.onclick = function () {
                TodoService.getInstance().deleteBtn(index);
            };
        });
    };
    TodoEvent.prototype.checkBtn = function () {
        var checkButtons = document.querySelectorAll(".finish-btn");
        checkButtons.forEach(function (checnkButton, index) {
            checnkButton.onclick = function () {
                TodoService.getInstance().checkBtn(index);
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
    // 로컬 스토리지 업데이트, todoList 다시 로드하는 메서드
    TodoService.prototype.uploadTodoList = function () {
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
        this.loadTodoList();
    };
    // 새 Todo를 추가하는 메서드
    TodoService.prototype.addTodo = function () {
        var todoInput = document.querySelector(".input-content");
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
    // ! 수정 전 deleteBtn
    // public deleteBtn(index: number): void {
    //   const deleteBtn: HTMLElement | null =
    //     document.querySelector(".delete-btn");
    //   if (deleteBtn) {
    //     deleteBtn.onclick = () => {
    //       TodoService.getInstance().todoList.splice(index, 1);
    //     };
    //     this.uploadTodoList();
    //   }
    //   this.loadTodoList();
    // }
    //! 수정 후 deleteBtn
    TodoService.prototype.deleteBtn = function (index) {
        this.todoList.splice(index, 1);
        this.uploadTodoList();
    };
    TodoService.prototype.checkBtn = function (index) {
        var checkButtons = document.querySelectorAll(".fa-check");
        checkButtons.forEach(function (checkButton, i) {
            if (i === index) {
                var done_1 = false;
                checkButton.onclick = function () {
                    done_1 = !done_1;
                    if (done_1) {
                        checkButton.style.color = 'green';
                    }
                    else {
                        checkButton.style.color = 'black';
                    }
                };
            }
        });
    };
    // 화면에 TodoList를 표시하는 메서드
    TodoService.prototype.loadTodoList = function () {
        var todoContentList = document.querySelector(".todo-content");
        // 해당 엘리먼트가 없으면 함수 종료
        if (!todoContentList)
            return;
        todoContentList.innerHTML = "";
        this.todoList.forEach(function (todo) {
            todoContentList.innerHTML += "\n      <div class=\"content-wrap\">\n      <li class=\"content-list\">\n        ".concat(todo.todoContent, "\n      </li>\n      <div class=\"button-wrap\">\n        <button class=\"finish-btn\">\n          <i class=\"fa-solid fa-check\" id=\"checkBtn\"></i>\n        </button>\n        <button class=\"delete-btn\">\n          <i class=\"fa-solid fa-xmark\"></i>\n        </button>\n      </div>\n    </div>");
        });
        //? Todo 항목의 추가, 삭제 버튼에 이벤트 추가
        TodoEvent.getInstance().addTodoButton();
        TodoEvent.getInstance().deleteTodoBtn();
    };
    TodoService.instance = null;
    return TodoService;
}());

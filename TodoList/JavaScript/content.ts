interface TodoList {
  todoContent: string;
  todoTitle: string;
  done: boolean;
}

class TodoEvent {
  private static instance: TodoEvent | null = null;

  public static getInstance(): TodoEvent {
    if (!this.instance) {
      this.instance = new TodoEvent();
    }

    return this.instance;
  }

  public addTodoButton(): void {
    const addTodoBtn: HTMLElement | null = document.querySelector(".add-todo");
    if (addTodoBtn) {
      addTodoBtn.onclick = () => {
        TodoService.getInstance().addTodo();
      };
    }
  }

  public addTodoKeyEvent(): void {
    const todoInput: HTMLElement | null = document.querySelector('.input');

    if (todoInput) {
      todoInput.onkeyup = (event:KeyboardEvent) => {
        if (event.key === 'Enter') {
          const addTodoButton: HTMLElement | null = document.querySelector('.add-todo');
          addTodoButton?.click();
        }
      }
    }
  }

  public deleteTodoBtn(): void {
    const deleteButton: NodeListOf<HTMLElement> =
      document.querySelectorAll(".content-wrap .delete-button");

    deleteButton.forEach((deleteButton, index) => {
      deleteButton.onclick = () => {
        TodoService.getInstance().deleteBtn(index);
      };
    });
  }
}

class TodoService {
  private static instance: TodoService | null = null;

  public todoList: TodoList[];

  public static getInstance(): TodoService {
    if (!this.instance) {
      this.instance = new TodoService();
    }
    return this.instance;
  }

  constructor() {
    // 로컬 스토리지에서 키값을 가져옴
    const storedTodos: string | null = localStorage.getItem("todoList");

    // 저장된 Todo가 있으면 Json 형식으로 파싱
    // 그렇지 않으면 [] 빈 배열 할당
    this.todoList = storedTodos ? JSON.parse(storedTodos) : [];

    // 생성 시 todoList를 로드해서 화면에 표시
    this.loadTodoList();
  }

  public uploadTodoList(): void {
    localStorage.setItem("todoList", JSON.stringify(this.todoList));
    this.loadTodoList();
  }

  // 새 Todo를 추가하는 메서드
  public addTodo(): void {
    const todoInput: HTMLInputElement | null =
      document.querySelector(".input");

    // 입력값(todoInput)값이 없거나, 공백일 경우 - 함수 종료
    if (!todoInput || !todoInput.value.trim()) return;

    const todo: TodoList = {
      todoContent: todoInput.value,
      todoTitle: "",
      done: false,
    };

    this.todoList.push(todo);

    this.uploadTodoList();
    this.loadTodoList();
  }

  public deleteBtn(deleteIndex: number): void {
    const deleteBtn: HTMLElement | null =
      document.querySelector(".delete-todo");

    if (deleteBtn) {
      deleteBtn.onclick = () => {
        TodoService.getInstance().todoList.splice(deleteIndex, 1);
      };
    }
    this.uploadTodoList();
    this.loadTodoList();
  }

  // 화면에 TodoList를 표시하는 메서드
  public loadTodoList(): void {
    const todoContentList: HTMLElement | null =
      document.querySelector(".todo-content");

    // 해당 엘리먼트가 없으면 함수 종료
    if (!todoContentList) return;

    todoContentList.innerHTML = ``;

    this.todoList.forEach((todo) => {
      todoContentList.innerHTML += `
      <div class="content-wrap">
      <li class="content-list">${todo.todoContent}</li>
      <button class="delete-btn">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>`;
    });

    TodoEvent.getInstance().addTodoButton();
    TodoEvent.getInstance().deleteTodoBtn();
  }
}

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

  addTodoButton(): void {
    const addTodoBtn: HTMLElement | null = document.querySelector(".add-todo");
    if (addTodoBtn) {
      addTodoBtn.onclick = () => {
        TodoService.getInstance().addTodoBtn();
      };
    }
  }

  deleteTodoButton(): void {
    const deleteTodoBtn: HTMLElement | null =
      document.querySelector(".delete-todo");
    deleteTodoBtn.onclick = () => {
      TodoService.getInstance().deleteTodoBtn();
    };
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
    this.loadTodoList
  }

  public loadTodoList(): void {
    const todoContent: HTMLElement | null =
      document.querySelector(".todo-content");

    // 해당 엘리먼트가 없으면 함수 종료
    if (!todoContent) return;
  }

  public addTodoBtn(): void {
    const todoInput: HTMLInputElement | null =
      document.querySelector(".add-todo");

    // 입력값(todoInput)값이 없거나, 공백일 경우 - 함수 종료
    if (!todoInput || !todoInput.value.trim()) return;
  }

  public deleteTodoBtn(): void {
    const deleteButton: NodeListOf<HTMLElement> =
      document.querySelectorAll(".delete-button");

    deleteButton.forEach((deleteBtn, index) => {
      deleteBtn.onclick = () => {
        this.todoList.splice(index, 1);

        localStorage.setItem("todoList", JSON.stringify(this.todoList));
        this.loadTodoList();
      };
    });
  }
}

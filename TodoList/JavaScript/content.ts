interface TodoList {
  todoContent: string;
  todoTitle: string;
  done: boolean;
}

class TodoEvent {
  private static instance: TodoList | null = null;

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
}

class TodoService {
  private static instance: TodoService | null = null;

  public todoList: TodoList[];

  public static getInstance(): TodoService {
    if (!this.instance) {
      this.instance = new TodoService();
    }
    return TodoService;
  }

  constructor() {
    // 로컬 스토리지에서 키값을 가져옴
    const storedTodos: string | null = localStorage.getItem("todoList");

    // 저장된 Todo가 있으면 Json 형식으로 파싱
    // 그렇지 않으면 [] 빈 배열 할당
    this.todoList = storedTodos ? JSON.parse(storedTodos) : [];

    // 생성 시 todoList를 로드해서 화면에 표시
    this.loadtodoList();
  }

  public loadtodoList(): void {
    const todoContent: HTMLElement | null =
      document.querySelector(".todo-content");

    // 해당 엘리먼트가 없으면 함수 종료
    if (!todoContent) return;
  }
}

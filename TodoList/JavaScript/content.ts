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

        //* input 입력 값 초기화
        const todoInput: HTMLInputElement | null = document.querySelector(".input-content");
          if (todoInput) {
            todoInput.value = '';
        }
      };
    }
  }

  //* keyboard 이벤트 리스너
  public addTodoKeyEvent(): void {
    const todoInput: HTMLElement | null = document.querySelector('.input-content');

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
    const deleteButtons: NodeListOf<HTMLElement> =
      document.querySelectorAll(".delete-btn");

    deleteButtons.forEach((deleteButton, index) => {
      deleteButton.onclick = () => {
        TodoService.getInstance().deleteBtn(index);
      };
    });
  }

  public checkBtn(): void {
    const checkButtons: NodeListOf<HTMLElement> = document.querySelectorAll(".checkBtn")

    checkButtons.forEach((checnkButton, index) => {
      checnkButton.onclick = () => {
        TodoService.getInstance().checkBtn(index)
      }
    })
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

  // 로컬 스토리지 업데이트, todoList 다시 로드하는 메서드
  public uploadTodoList(): void {
    localStorage.setItem("todoList", JSON.stringify(this.todoList));
    this.loadTodoList();
  }

  // 새 Todo를 추가하는 메서드
  public addTodo(): void {
    const todoInput: HTMLInputElement | null =
      document.querySelector(".input-content");

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
  public deleteBtn(index: number): void {
    this.todoList.splice(index, 1);
    this.uploadTodoList();
  }

  // 체크버튼 클릭 시 초록색으로 전환하는 함수
  public checkBtn(index: number): void {
    const checkButtons: NodeListOf<HTMLElement> = document.querySelectorAll(".checkBtn")

    checkButtons.forEach((checkBtn, i) => {
      
    })
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
      <li class="content-list">
        ${todo.todoContent}
      </li>
      <div class="button-wrap">
        <button class="finish-btn">
          <i class="fa-solid fa-check checkBtn"></i>
        </button>
        <button class="delete-btn">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>`;
    });

    //? Todo 항목의 추가, 삭제 버튼에 이벤트 추가
    TodoEvent.getInstance().addTodoButton();
    TodoEvent.getInstance().deleteTodoBtn();
  }
}

interface TodoList {
  todoContent: string;
  todoTitle: string;
  done: boolean;
}

class TodoEvent {
  instance: TodoList | null = null;
}

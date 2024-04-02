window.onload = function () {
    //! 할 일 추가를 위한 버튼 이벤트
    TodoEvent.getInstance().addTodoButton();
    //! 할 일 추가를 위한 키보드 이벤트
    TodoEvent.getInstance().addTodoKeyEvent();
    //! 할 일 서비스 초기화
    TodoEvent.getInstance();
};

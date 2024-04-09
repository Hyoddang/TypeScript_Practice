interface Basket {
  itemNum: number;
}

//? 버튼 클릭 시 hidden 태그 on 메서드
//? 버튼 클릭 이벤트 설정 ( 누를 때마다 +1 ) O
//? 9개가 넘어가면 9+로 표시 O

class addEvent {
  private static instance: addEvent | null = null;

  public static getInstance(): addEvent {
    if (!this.instance) {
      this.instance = new addEvent();
    }
    return this.instance;
  }

  public addButton(): void {
    const addButtonClick: HTMLElement | null = document.querySelector(".add-item-btn");

    if (addButtonClick) {
      addButtonClick.onclick = () => {
        addService.getInstance().addBtnClick();
      }
    }
  }

  public hiddenRemove(): void {
    const removeHidden: HTMLElement | null = document.querySelector(".sum-container")

    if (removeHidden) {
      
    }
  }
}


class addService {
  private static instance: addService | null = null;

  public basketList: Basket[];

  public static getInstance(): addService {
    if (!this.instance) {
      this.instance = new addService();
    }
    return this.instance;
  }
  
  constructor() {
    const storedShopping: string | null = localStorage.getItem("basketList");

    this.basketList = storedShopping ? JSON.parse(storedShopping) : [];

    this.loadShoppingList();
  }

  public addBtnClick(): void {
    const addBtn: HTMLElement | null = document.querySelector(".add-item-btn");

    const basket: Basket = {
      itemNum: this.basketList.length
    }
    
    if (addBtn) {
      addBtn.onclick = () => {
        this.basketList.push(basket)
      }
    }
  }

  public uploadShoppingList(): void {
    localStorage.setItem("basketList", JSON.stringify(this.basketList))

    this.loadShoppingList();
  }

  public loadShoppingList(): void {
    const loadList: HTMLElement | null = document.querySelector(".sum-item")

    if (!loadList) {
      return;
    }

    if (this.basketList.length > 9) {
      loadList.innerHTML = '9+';
    } else {
      loadList.innerHTML = `${this.basketList.length + 1}`;
    }
  }
}

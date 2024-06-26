//? 버튼 클릭 시 hidden 태그 remove 메서드
//? 버튼 클릭 이벤트 설정 ( 누를 때마다 +1 ) O
//? 9개가 넘어가면 9+로 표시 O
var addEvent = /** @class */ (function () {
    function addEvent() {
    }
    addEvent.getInstance = function () {
        if (!this.instance) {
            this.instance = new addEvent();
        }
        return this.instance;
    };
    addEvent.prototype.addButton = function () {
        var addButtonClick = document.querySelector(".add-item-btn");
        if (addButtonClick) {
            addButtonClick.onclick = function () {
                addService.getInstance().addBtnClick();
            };
        }
    };
    addEvent.prototype.hiddenRemove = function () {
        var removeHidden = document.querySelector(".sum-container");
        if (removeHidden) {
            removeHidden.onclick = function () {
                addService.getInstance().hiddenRemove();
            };
        }
    };
    addEvent.instance = null;
    return addEvent;
}());
var addService = /** @class */ (function () {
    function addService() {
        var storedShopping = localStorage.getItem("basketList");
        this.basketList = storedShopping ? JSON.parse(storedShopping) : [];
        this.loadShoppingList();
    }
    addService.getInstance = function () {
        if (!this.instance) {
            this.instance = new addService();
        }
        return this.instance;
    };
    addService.prototype.addBtnClick = function () {
        var _this = this;
        var addBtn = document.querySelector(".add-item-btn");
        // const item: HTMLElement | null = document.querySelector(".item-name")
        var basket = {
            itemNum: this.basketList.length,
        };
        if (addBtn) {
            addBtn.onclick = function () {
                _this.basketList.push(basket);
            };
            this.uploadShoppingList();
        }
    };
    addService.prototype.hiddenRemove = function () {
        // const clickToRemove: HTMLElement | null = document.querySelector(".add-item-btn")
        var deleteRemove = document.querySelector(".sum-container");
        if (this.basketList.length >= 1) {
            deleteRemove === null || deleteRemove === void 0 ? void 0 : deleteRemove.classList.remove("sum-hidden");
        }
        else {
            deleteRemove === null || deleteRemove === void 0 ? void 0 : deleteRemove.classList.add("sum-hidden");
        }
    };
    addService.prototype.uploadShoppingList = function () {
        localStorage.setItem("basketList", JSON.stringify(this.basketList));
        this.loadShoppingList();
    };
    addService.prototype.loadShoppingList = function () {
        var loadList = document.querySelector(".sum-item");
        if (!loadList)
            return;
        if (this.basketList.length > 9) {
            loadList.innerHTML += "<p class=\"sum-item\">9+</p>";
        }
        else {
            loadList.innerHTML += "<p class=\"sum-item\">".concat(this.basketList.length, "</p>");
        }
        addEvent.getInstance().addButton();
        addEvent.getInstance().hiddenRemove();
    };
    addService.instance = null;
    return addService;
}());

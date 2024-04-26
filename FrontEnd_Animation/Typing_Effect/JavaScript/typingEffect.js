let textEffect = document.querySelector('.text-effect');

let stringArr = ["안녕하세요.", "프론트엔드 개발자를 꿈 꾸는", "Hyo 입니다."];

let selectStringArr = selectString.split("");

let currentIndex = 0;

function nextStr() {

}

// 타이핑효과 리셋
function resetTyping() {
  textEffect.textContent = '';
  strEffect(randomString());
}

// 한 글자씩 텍스트 출력하는 함수
function strEffect(randomArr) {
  if(randomArr.length > 0) {
    textEffect.textContent += randomArr.shift();
    setTimeout(function() {
      strEffect(randomArr);
    }, 80);
  } else {
    setTimeout(resetTyping, 1500);
  }
}

strEffect(randomString());

// 커서 깜빡임 효과
function blink() {
  textEffect.classList.toggle("active");
}
setInterval(blink, 500);
let textEffect = document.querySelector('.text-effect');

let stringArr = ["안녕하세요.", "프론트엔드 개발자를 꿈 꾸는", "Hyo 입니다."];

let currentIndex = 0;

let selectString = stringArr[currentIndex];

let selectStringArr = selectString.split("");

function nextStr() {
  let stringArr = ["안녕하세요.", "프론트엔드 개발자를 꿈 꾸는", "Hyo 입니다."];

  let currentIndex = 0;

  let selectString = stringArr[currentIndex];

  let selectStringArr = selectString.split("");

  if (currentIndex === stringArr.length) {
    currentIndex = 0;
  }
  return selectStringArr;
}

// 타이핑효과 리셋
function resetTyping() {
  textEffect.textContent = '';
  strEffect(nextStr());
}

// 한 글자씩 텍스트 출력하는 함수
function strEffect(strArr) {
  if(strArr.length > 0) {
    textEffect.textContent += strArr.shift();
    setTimeout(function() {
      strEffect(strArr);
    }, 80);
  } else {
    setTimeout(resetTyping, 1500);
  }
}

strEffect(nextStr());

// 커서 깜빡임 효과
function blink() {
  textEffect.classList.toggle("active");
}
setInterval(blink, 500);
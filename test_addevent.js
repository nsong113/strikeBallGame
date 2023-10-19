//trouble shooting: while문 + prompt
let attempt = document.querySelector(".attempt");
let result = document.querySelector(".result");
const final = document.querySelector(".final");
const inputText = document.querySelector("#inputText");
const submitButton = document.querySelector("#submitButton");
const maxCount = document.querySelector(".maxCount");
const form = document.querySelector("#form");

let maxCountC = 5;
maxCount.textContent = `"${maxCountC}번 시도 가능합니다"`;

let guess = [];
for (let i = 0; i < 3; i++) {
  const randomNumber = Math.floor(Math.random() * 10);
  if (guess.indexOf(randomNumber) === -1) {
    guess.push(randomNumber);
  } else {
    i--;
  }
}

console.log(`컴퓨터가 만든 숫자 ${guess}`);
let count = 0;
//trouble shooting : count를 밖으로 뺀 이유: count를 버튼 클릭 전에 0으로 초기화
let attemptsText = "";

// submitButton.addEventListener("keydown", function () {
//   maxCount.textContent = `"${maxCountC}번 시도 가능합니다"`;
// });
let submitButtonEvent = function () {
  let userInputValue = inputText.value;

  //유효성검사
  //trouble shotting: userInputValue.length는 내용을 비교하지 않고 길이를 비교함. -> test 메서드 사용해서 true, false 반환 && 4자리 숫자를 입력해도 alert가 안뜸 ㅠ -> 뒤에 $를 작성
  if (!/^\d{3,3}$/.test(userInputValue)) {
    alert("서로 다른 3자리 숫자를 입력해야 합니다.");
    return;
  }

  let userInputNumber = userInputValue.split("").map(Number);
  console.log(userInputNumber, typeof userInputNumber);
  console.log(guess, typeof guess);

  let B = 0;
  let S = 0;

  count++;

  for (let a = 0; a < 3; a++) {
    if (guess[a] === userInputNumber[a]) {
      S++;
    } else if (guess.includes(userInputNumber[a])) {
      B++;
    }
    console.log(`S: ${S}, B: ${B}`);
  }

  attemptsText += `${count}번째 시도 : ${userInputNumber}<br>${S}S ${B}B<br><br>`;

  attempt.innerHTML = attemptsText;

  if (S === 3) {
    final.textContent = `${count} 번만에 맞히셨습니다. 게임을 종료합니다.`;
  } else if (count >= maxCountC) {
    final.textContent = `${count} 번의 시도가 지났습니다. You LOSE. `;
  }
};

submitButton.addEventListener("click", submitButtonEvent);
window.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    return submitButtonEvent();
  }
});

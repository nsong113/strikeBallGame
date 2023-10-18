//trouble shooting: while문 + prompt
let attempt = document.querySelector(".attempt");
let result = document.querySelector(".result");
const final = document.querySelector(".final");
const inputText = document.querySelector("#inputText");
const submitButton = document.querySelector("#submitButton");
const maxCount = document.querySelector(".maxCount");

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

submitButton.addEventListener("click", function () {
  let userInputValue = inputText.value;

  //유효성검사
  //trouble shotting: userInputValue.length는 내용을 비교하지 않고 길이를 비교함. -> test 메서드 사용해서 true, false 반환 && 4자리 숫자를 입력해도 alert가 안뜸 ㅠ -> 뒤에 $를 작성
  if (!/^\d{3,3}$/.test(userInputValue)) {
    alert("서로 다른 3자리 숫자를 입력해야 합니다.");
    return;
  } else {
    let userInputNumber = userInputValue.split("").map(Number);
    console.log(userInputNumber, typeof userInputNumber);
    console.log(guess, typeof guess);
    //trouble shooting : inputText.value
    //inputText.value로 가져온 값은 string -> parseInt()
    //for 구문이 아예 안먹힘 [456] vs [4,5,6] split("").map(Number) cf)map은 배열을 토해냄
    let B = 0;
    let S = 0;

    count++;

    //추가할 것: 엔터 눌러도 submit 되게 변경
    for (let a = 0; a < 3; a++) {
      if (guess[a] === userInputNumber[a]) {
        S++;
      } else if (guess.includes(userInputNumber[a])) {
        B++;
      }
      console.log(`S: ${S}, B: ${B}`);
    }
    //trouble shooting: {userInputNumber}\n`; 이게 한줄에 나타남
    // \n말고 <br>을 삽입. attempt.textContent말고 innerHTML로 변경
    //textContent는 br 같은 태그가 그대로 출력, 텍스트의 문자열만 설정가능
    //innerText는 html코드를 포함한 문자열을 설정
    attemptsText += `${count}번째 시도 : ${userInputNumber}<br>${S}S ${B}B<br><br>`;

    attempt.innerHTML = attemptsText;
    //trouble shooting: count에 따른 attemptsText가 매번 사라짐..누적!!
    //해결: let attemptsText = ""; 이게 이벤트 리스너 밖으로 빠져야 한다. 안에 있으면 새로운 시도를 하려고 버튼 누를 때 마다 내용이 삭제됨

    if (S === 3) {
      final.textContent = `${count} 번만에 맞히셨습니다. 게임을 종료합니다.`;
    } else if (count >= maxCountC) {
      final.textContent = `${count} 번의 시도가 지났습니다. You LOSE. `;
    }
  }
});

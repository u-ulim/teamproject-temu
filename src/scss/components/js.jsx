import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Box from "./components/Box";
const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }
  ul, li {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 100%;
  height: 100vh;
`;
const BoxGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const Button = styled.button`
  display: inline-block;
  width: 80px;
  padding: 10px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;
const choice = {
  rock: {
    name: "rock",
    img: "https://nationaltoday.com/wp-content/uploads/2021/08/National-Pet-Rock-Day.jpg",
  },
  scissors: {
    name: "scissors",
    img: "https://previews.123rf.com/images/yupiramos/yupiramos1608/yupiramos160824999/61749072-%EA%B0%80%EC%9C%84-%EC%BA%90%EB%A6%AD%ED%84%B0-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98-%EA%B7%B8%EB%9E%98%ED%94%BD%EC%9D%84-%EC%9E%98%EB%9D%BC.jpg",
  },
  paper: {
    name: "paper",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9x2Zc7xAYGPAHIFn0if2f49cSHqAv64bmsQ&s",
  },
};
const App = () => {
  // NUll과 UNDEFINED의 차이 => null은 의도적으로, undefined는 정의되지 않은,
  const [userSelect, setUserSelect] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);
  const [result, setResult] = useState("");
  const play = (userChoice) => {
    setUserSelect(() => choice[userChoice]);
    let computerChoice = randomChoice();
    setComputerSelect(() => computerChoice);

    setResult(() => judgeMent(userSelect, computerSelect));

    console.log(result);
    // setResult(judgeMent(choice[userChoice], computerChoice));
  };
  const randomChoice = () => {
    let itemArray = Object.keys(choice);
    let randomItem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomItem];
    return choice[final];
  };
  const judgeMent = (user, computer) => {
    console.log(user, computer);
    if (user.name === computer.name) {
      return "tie";
    } else if (user.name === "rock") {
      return computer.name === "scissors" ? "win" : "lose";
    } else if (user.name === "scissors") {
      return computer.name === "paper" ? "win" : "lose";
    } else if (user.name === "paper") {
      return computer.name === "rock" ? "win" : "lose";
    }
    return result;
  };
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <BoxGroup>
          <Box title={"You"} item={userSelect} result={result} />
          <Box title={"Computer"} item={computerSelect} result={result} />
        </BoxGroup>
        <ButtonGroup>
          <Button onClick={() => play("scissors")}>가위</Button>
          <Button onClick={() => play("rock")}>바위</Button>
          <Button onClick={() => play("paper")}>보</Button>
        </ButtonGroup>
      </Wrapper>
    </>
  );
};
export default App;

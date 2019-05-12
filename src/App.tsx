import React, { useState } from 'react';
import styled from '@emotion/styled';

const App: React.FC = () => {
  const [turn, setTrun] = useState<number>(0);
  const [player1, setPlayer1] = useState<number[]>([]);
  const [player2, setPlayer2] = useState<number[]>([]);
  const [use, setUse] = useState<number[]>([]);
  const [winner, setWinner] = useState<string>('');

  // * Winner 계산 함수 ( data는 player가 보유한 위치 배열 )
  const calcWinner = (data: number[]) => {
    let result = false;
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // * 승리 조건 반복
    win.forEach((item) => {
      const [a, b, c] = item; // * 내부에 담긴 숫자 3개를 추출합니다.

      // * 3개의 값이 모두 만족할때 즉 3개를 모두 보유해서 승리를 하였을때 결과를 true로 바꿉니다.
      if (
        data.indexOf(a) > -1 &&
        data.indexOf(b) > -1 &&
        data.indexOf(c) > -1
      ) {
        result = true;
      }
    });

    // * 내용을 반환합니다.
    return result;
  };

  const handleInit = () => {
    setTrun(0);
    setPlayer1([]);
    setPlayer2([]);
    setWinner('');
  };

  const handleClick = async (position: number) => {
    let useTemp = [...use]; // * 현재의 use를 temp에 추가
    if (use.length !== [...player1, ...player2].length) {
      useTemp = [...player1, ...player2];
    }

    if (winner !== '') return false;
    if (useTemp.indexOf(position) === -1) {
      if (turn % 2 === 0) {
        // ! Trun Player1
        setPlayer1([...player1, position]);
        const result = calcWinner([...player1, position]);
        if (result) {
          setWinner('Player1');
        }
      } else {
        // ! Trun Player2
        setPlayer2([...player2, position]);
        const result = calcWinner([...player2, position]);
        if (result) {
          setWinner('Player2');
        }
      }

      setUse([...useTemp, position]);
      setTrun(turn + 1);
    }
  };

  const handleReturn = (num: number) => {
    const { player1, player2 } = use.reduce<{
      player1: number[];
      player2: number[];
    }>(
      (acc, curr, index) => {
        if (num >= index) {
          if (index % 2 === 0) {
            acc.player1.push(curr);
          } else {
            acc.player2.push(curr);
          }
        }
        return acc;
      },
      { player1: [], player2: [] }
    );

    const result1 = calcWinner(player1);
    if (result1) {
      setWinner('Player1');
    }

    const result2 = calcWinner(player2);
    if (result2) {
      setWinner('Player2');
    }

    if (!result1 && !result2) {
      setWinner('');
    }

    setPlayer1(player1);
    setPlayer2(player2);
    setTrun(num - 1);
  };

  return (
    <React.Fragment>
      <Title>Tic Tec Toe Game</Title>
      <Container>
        <GamePanel>
          {new Array(9).fill(0).map((item, index) => (
            <Box key={index} onClick={() => handleClick(index)}>
              {player1.indexOf(index) > -1 ? 'O' : null}
              {player2.indexOf(index) > -1 ? 'X' : null}
            </Box>
          ))}
        </GamePanel>
        <InfoPanel>
          {winner === '' ? (
            <h4>
              NextPlayer:{' '}
              {[...player1, ...player2].length % 2 === 0 ? 'O' : 'X'}
            </h4>
          ) : (
            <h4>Winner: {winner}</h4>
          )}
          <div>
            1. <button onClick={handleInit}>Go to game start</button>
          </div>
          {use.map((item, index) => (
            <div key={item}>
              {index + 2}.&nbsp;
              <button onClick={() => handleReturn(index)}>
                Go to move #{index + 1}
              </button>
            </div>
          ))}
        </InfoPanel>
      </Container>
    </React.Fragment>
  );
};

export default App;

const Title = styled.h1`
  text-align: center;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const GamePanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 150px;
  height: 150px;
`;

const Box = styled.div`
  width: 50px;
  height: 50px;
  line-height: 50px;
  border: 1px solid #aaa;
  box-sizing: border-box;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
`;

const InfoPanel = styled.div`
  margin-left: 10px;
  text-align: left;

  h4 {
    margin: 0 0 5px 0;
  }
`;

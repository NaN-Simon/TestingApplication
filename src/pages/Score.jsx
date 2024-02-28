import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Button from '../components/UI/button/Button';

import { fetchUsers } from '../api/users';
import { resetScore, resetAnswer } from '../store/reducers/questSlice';

const StyledScore = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Score = () => {
  /* redux */
  const dispatch = useDispatch();
  const { questScore } = useSelector((state) => state.questReducer);

  /* результаты тестов */
  const [score, setScore] = useState(questScore);

  /* получение вопросов теста (mock данные) */
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  /* сброс результатов */
  const resetHandler = () => {
    dispatch(resetScore());
    dispatch(resetAnswer());
    setScore([]);
  };

  return (
    <StyledScore data-name='score'>
      {score.map((item) => {
        return (
          <div id={item.id} key={item.id}>
            Имя: {item.username === '' ? 'Anon ' : item.username}- Результат:{' '}
            {item.score} - Дата прохождения: {item.date} - Название пака:{' '}
            {item.questPackName}
          </div>
        );
      })}
      <div style={{ display: 'flex', gap: '20px' }}>
        <Button link='/'>На домашнюю страницу</Button>
        <Button onClick={resetHandler}>Сброс</Button>
      </div>
    </StyledScore>
  );
};

export default Score;

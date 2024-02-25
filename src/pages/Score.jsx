import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Button from '../components/UI/button/Button';

import { fetchUsers } from '../api/users';
import { resetScore } from '../store/reducers/questSlice';

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
  const { results } = useSelector((state) => state.questReducer);

  /* результаты тестов */
  const [score, setScore] = useState(results);

  /* получение вопросов теста (mock данные) */
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  /* сброс результатов */
  const resetHandler = () => {
    dispatch(resetScore());
    setScore([]);
  };

  return (
    <StyledScore data-name='score'>
      {score.map((item) => {
        return (
          <div id={item.id} key={item.id}>
            Username: {item.username === '' ? 'Anon ' : item.username}- Score:{' '}
            {item.score}- Date: {item.date} - testPackName: {item.testPackName}
          </div>
        );
      })}
      <div style={{ display: 'flex', gap: '20px' }}>
        <Button link='/'>Home</Button>
        <Button onClick={resetHandler}>Reset</Button>
      </div>
    </StyledScore>
  );
};

export default Score;

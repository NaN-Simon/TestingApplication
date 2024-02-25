import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import TestCard from '../components/card/TestCard';
import Input from '../components/UI/input/Input';
import Button from '../components/UI/button/Button';

import { fetchUsers } from '../api/users';
import { setStoreUsername } from '../store/reducers/questSlice';

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const StyledQuestPacks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const Home = () => {
  const { quest, questUsername } = useSelector((state) => state.questReducer);
  const dispatch = useDispatch();

  /* получение вопросов теста (mock данные) */
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  /* установка текущего имени пользователя.*/
  const [username, setUsername] = useState(questUsername);

  /* Если уже было введено ранее, будет вставлено из localStorage */
  useEffect(() => {
    setUsername(questUsername);
  }, [questUsername]);

  /* запись нового имени в localStorage */
  useEffect(() => {
    dispatch(setStoreUsername(username));
  }, [dispatch, username]);

  return (
    <StyledHome data-name='home'>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Input
          type='text'
          name='username'
          placeholder='Enter your name'
          value={username}
          setValue={setUsername}
        />
      </div>

      {/* Паки тестов */}
      <StyledQuestPacks>
        {quest?.tests.map((test) => (
          <TestCard
            key={test.testName}
            header={test.testName}
            count={test.questions.length}
            btnLink={'test/' + test.id}
          />
        ))}
      </StyledQuestPacks>
      <Button style={{ padding: '10px' }} link='/score'>
        Показать результат
      </Button>
    </StyledHome>
  );
};

export default Home;

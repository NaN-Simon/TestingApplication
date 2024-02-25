import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import QuestCard from '../../components/card/QuestCard';
import Button from '../../components/UI/button/Button';
import StatusBar from '../../components/statusBar/StatusBar';

import {
  setTestsAnswers,
  setQuestName,
  getResult,
} from '../../store/reducers/questSlice';
import { fetchUsers } from '../../api/users';

const StyledTestId = styled.div`
  min-width: 300px;
`;
const StyledQuestions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const StyledNavigation = styled.div`
  display: flex;
  gap: 15px;
`;

const TestId = () => {
  /* роутинг */
  const navigate = useNavigate();
  /* redux */
  const dispatch = useDispatch();
  const { quest, testsAnswers } = useSelector((state) => state.questReducer);

  /* id текущего пака */
  const { id: questPackId } = useParams();

  /* данные текущего пака */
  const testPackData = quest?.tests[questPackId];

  const testPackName = `Test ${+questPackId + 1} - ${
    testPackData && testPackData.testName
  }`;

  /* получение вопросов теста (mock данные) */
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  /* установка в store названия текущего теста */
  useEffect(() => {
    testPackData && dispatch(setQuestName(testPackData.testName));
  }, [dispatch, testPackData]);

  /* текущий номер вопроса в рендере */
  const [currentQuestNumber, setCurrentQuestNumber] = useState(0);

  /* общий процент прохождения теста */
  const percentOfQuest = Math.floor(
    (currentQuestNumber * 100) / testPackData?.questions.length
  );

  /* запись ответа в store */
  const answerHandler = (answer) => {
    const data = answer;
    data.questPackId = questPackId;
    dispatch(setTestsAnswers(data));
  };

  /* увеличение счетчика номера вопроса в рендере  */
  const incrementQuestion = () => {
    setCurrentQuestNumber((prev) => prev + 1);
  };

  /* уменьшение счетчика номера вопроса в рендере  */
  const decrementQuestion = () => {
    currentQuestNumber > 0 && setCurrentQuestNumber((prev) => prev - 1);
  };

  /* вернуться обратно на домашнюю страницу */
  const backHandler = () => {
    navigate('/');
  };

  /* получить результат теста */
  const resultHandler = () => {
    dispatch(getResult());
    navigate('/score');
  };

  /* если url теста не существует, будет предупреждение  */
  if (!testPackData)
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <span>Test doesn’t exist</span>
        <Button link='/'>Home</Button>
      </div>
    );

  return (
    <StyledTestId data-name='test-id'>
      {testPackData && <span>{testPackName}</span>}

      {testPackData?.questions.map((item, index) => {
        const initialValue = testsAnswers[index]?.answer;
        const isExistNextQuestion = index + 1 !== testPackData.questions.length;
        const isLastQuestion = index + 1 === testPackData.questions.length;

        if (index === currentQuestNumber)
          return (
            <StyledQuestions key={item.id}>
              {/* Карточки с вопросами */}

              <QuestCard
                {...item}
                onClick={answerHandler}
                initialSelectedValue={initialValue}
              />

              {/* Элементы навигации */}

              <StyledNavigation>
                {currentQuestNumber === 0 && (
                  <Button onClick={backHandler}>Назад</Button>
                )}
                {currentQuestNumber > 0 && (
                  <Button onClick={decrementQuestion}>Предыдущий вопрос</Button>
                )}

                {isExistNextQuestion && (
                  <Button onClick={incrementQuestion}>Следующий вопрос</Button>
                )}

                {isLastQuestion && (
                  <Button onClick={resultHandler}>Получить результат</Button>
                )}
              </StyledNavigation>
            </StyledQuestions>
          );
      })}

      {/* общий процент прохождения теста */}

      <StatusBar status={percentOfQuest} style={{ marginTop: '30px' }} />
    </StyledTestId>
  );
};

export default TestId;

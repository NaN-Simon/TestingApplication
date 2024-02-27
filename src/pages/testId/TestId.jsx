import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import QuestCard from '../../components/card/QuestCard';
import StatusBar from '../../components/statusBar/StatusBar';
import CardNavigation from '../../components/navigation/CardNavigation';

import {
  setTestsAnswers,
  setQuestName,
  getResult,
} from '../../store/reducers/questSlice';

import { fetchUsers } from '../../api/users';
import NotFound from '../NotFound';

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

const TestId = () => {
  /* текущий номер вопроса в рендере */
  const [currentQuestNumber, setCurrentQuestNumber] = useState(0);

  /* роутинг */
  const navigate = useNavigate();
  /* redux */
  const dispatch = useDispatch();
  const { quest, questAnswers } = useSelector((state) => state.questReducer);

  /* id текущего пака вопросов */
  const { id: questPackId } = useParams();

  /* данные текущего пака вопросов */
  const questPackData = quest?.tests[questPackId];

  /* число вопросов пака вопросов */
  const questPackLength = questPackData?.questions.length;

  /* имя пака вопросов */
  const questPackName = `Test ${+questPackId + 1} - ${questPackData?.testName}`;

  /* если пред. вопроса нет возврат на Home page,
   * если есть след. вопрос */
  const prevHandler = () => {
    currentQuestNumber <= 0
      ? navigate('/')
      : setCurrentQuestNumber((prev) => prev - 1);
  };

  /* если след. вопрос есть след.вопрос,
   * если нет вычислить результат перейти на страницу Score page */
  const nextHandler = () => {
    currentQuestNumber + 1 < questPackLength
      ? setCurrentQuestNumber((prev) => prev + 1)
      : (dispatch(getResult()), navigate('/score'));
  };

  const ButtonPrevTitle =
    currentQuestNumber <= 0 ? 'На домашнюю страницу' : 'Назад';
  const ButtonNextTitle =
    currentQuestNumber + 1 < questPackLength
      ? 'Продолжить'
      : 'Получить результат';

  /* получение вопросов теста (mock данные) */
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  /* установка в store названия текущего теста */
  useEffect(() => {
    questPackData && dispatch(setQuestName(questPackData.testName));
  }, [dispatch, questPackData]);

  if (!questPackData) {
    /* если url теста не существует, будет предупреждение  */
    return <NotFound />;
  } else {
    return (
      <StyledTestId data-name='test-id'>
        {questPackData && <span>{questPackName}</span>}

        {questPackData?.questions.map((item, index) => {
          const initialValue = questAnswers[currentQuestNumber]?.answer;
          if (index === currentQuestNumber)
            return (
              <StyledQuestions key={item.id}>
                {/* Карточки с вопросами */}

                <QuestCard
                  {...item}
                  /* запись ответа в store */
                  onClick={(answer) => {
                    dispatch(setTestsAnswers(answer));
                  }}
                  /* предыдущее значение из store */
                  initialSelectedValue={initialValue}
                />

                {/* Элементы навигации */}

                <CardNavigation
                  prevHandler={prevHandler}
                  nextHandler={nextHandler}
                  ButtonPrevTitle={ButtonPrevTitle}
                  ButtonNextTitle={ButtonNextTitle}
                />
              </StyledQuestions>
            );
        })}

        {/* общий процент прохождения теста */}

        <StatusBar
          status={Math.floor(
            (currentQuestNumber * 100) / questPackData?.questions.length
          )}
          style={{ marginTop: '30px' }}
        />
      </StyledTestId>
    );
  }
};

export default TestId;

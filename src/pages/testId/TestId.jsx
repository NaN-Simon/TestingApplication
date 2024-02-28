import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import QuestCard from '../../components/card/QuestCard';
import StatusBar from '../../components/statusBar/StatusBar';
import CardNavigation from '../../components/navigation/CardNavigation';

import {
  setQuestCurrentAnswerId,
  setTestsAnswers,
  setQuestName,
  getResult,
  resetAnswer,
  resetQuestCurrentAnswerId,
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
  /* id текущего пака вопросов */
  const { id: questPackId } = useParams();

  /* роутинг */
  const navigate = useNavigate();

  /* redux */
  const dispatch = useDispatch();
  const { quest, questAnswers, questPackName, questCurrentAnswerId } =
    useSelector((state) => state.questReducer);

  /* текущий номер вопроса в рендере */
  const [currentQuestNumber, setCurrentQuestNumber] =
    useState(questCurrentAnswerId);

  /* данные текущего пака вопросов */
  const questPackData = useMemo(
    () => quest?.tests[questPackId],
    [quest?.tests, questPackId]
  );
  // const questPackData = quest?.tests[questPackId];

  /* число вопросов пака вопросов */
  const questPackLength = useMemo(
    () => questPackData?.questions.length,
    [questPackData?.questions.length]
  );

  /* имя пака вопросов */
  const questPackTitle = useMemo(
    () => `Test ${+questPackId + 1} - ${questPackData?.testName}`,
    [questPackData?.testName, questPackId]
  );

  /* если пред. вопроса нет возврат на Home page,
   * если есть след. вопрос */
  const prevHandler = () => {
    questCurrentAnswerId <= 0
      ? navigate('/')
      : (setCurrentQuestNumber((prev) => prev - 1),
        dispatch(setQuestCurrentAnswerId(questCurrentAnswerId - 1)));
  };

  /* если след. вопрос есть след.вопрос,
   * если нет вычислить результат перейти на страницу Score page */
  const nextHandler = () => {
    questCurrentAnswerId < questPackLength - 1
      ? (setCurrentQuestNumber((prev) => prev + 1),
        dispatch(setQuestCurrentAnswerId(questCurrentAnswerId + 1)))
      : (dispatch(getResult()),
        navigate('/score'),
        dispatch(setQuestCurrentAnswerId(0)));
  };

  const ButtonPrevTitle =
    questCurrentAnswerId <= 0 ? 'На домашнюю страницу' : 'Назад';
  const ButtonNextTitle =
    questCurrentAnswerId < questPackLength - 1
      ? 'Продолжить'
      : 'Получить результат';

  /* получение вопросов теста (mock данные) */
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);


  /* установка в store названия текущего теста */
  useEffect(() => {
    questPackData && dispatch(setQuestName(questPackData.testName));
    if (questPackName) {
      if (questPackName !== questPackData?.testName) {
        dispatch(resetAnswer());
        dispatch(resetQuestCurrentAnswerId());
      }
    }
  }, [dispatch, questPackData, questPackName]);


  if (!questPackData) {
    /* если url теста не существует, будет предупреждение  */
    return <NotFound />;
  } else {
    return (
      <StyledTestId data-name='test-id'>
        {questPackData && <span>{questPackTitle}</span>}

        {questPackData?.questions.map((item, index) => {
          const initialValue = questAnswers[questCurrentAnswerId]?.answer;
          if (index === questCurrentAnswerId)
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

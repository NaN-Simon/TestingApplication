import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';

import { shuffleArray } from '../../utils/shuffleArray';

const StyledQuestCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const StyledLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid
    ${(props) => (props.$active ? 'transparent' : 'rgba(34, 60, 80, 1)')};
  box-shadow: 0px 0px 10px 2px
    ${(props) => (props.$active ? 'rgba(34,  60,  80,  1)' : 'transparent')};
  -webkit-box-shadow: 0px 0px 10px 2px
    ${(props) => (props.$active ? 'rgba(34,  60,  80,  1)' : 'transparent')};
  -moz-box-shadow: 0px 0px 10px 2px
    ${(props) => (props.$active ? 'rgba(34,  60,  80,  1)' : 'transparent')};
  color: ${(props) => (props.$active ? 'white' : 'grey')};
  font-family: Roboto;
  font-style: normal;
  font-weight: ${(props) => (props.$active ? 700 : 500)};
  font-size: 14px;
  transition: border 0.5s, opacity 0.5s;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const QuestCard = (props) => {
  const {
    id,
    question,
    answers,
    right,
    initialSelectedValue = null,
    onClick,
  } = props;
  const [selectedValue, setSelectedValue] = useState(initialSelectedValue);

  const handleRadioChange = (value) => {
    setSelectedValue(value);
    onClick({
      id: id - 1,
      answer: value,
      right: right,
    });
  };

  const [shuffledAnswers] = useState(shuffleArray([...answers]));

  return (
    <StyledQuestCard data-name='quest-card'>
      <h5>{id + '. ' + question}</h5>
      {shuffledAnswers.map((item) => {
        return (
          <div key={item}>
            <input
              type='radio'
              id={item}
              value={item}
              checked={selectedValue === item}
              onChange={() => handleRadioChange(item)}
              style={{ display: 'none' }}
            />
            <StyledLabel $active={selectedValue === item} htmlFor={item}>
              {item}
            </StyledLabel>
          </div>
        );
      })}
    </StyledQuestCard>
  );
};

export default QuestCard;

QuestCard.propTypes = {
  id: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  right: PropTypes.string.isRequired,
  initialSelectedValue: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../UI/button/Button';

const StyledTest = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 200px;
  height: 200px;
  -webkit-box-shadow: 0px 0px 10px 2px rgba(34, 60, 80, 1);
  -moz-box-shadow: 0px 0px 10px 2px rgba(34, 60, 80, 1);
  box-shadow: 0px 0px 10px 2px rgba(34, 60, 80, 1);
`;

const QuestPackCover = ({ header, count, btnLink }) => {
  return (
    <StyledTest data-name='test-card'>
      <div>Название теста:</div>
      <div style={{ fontWeight: 700 }}>{header}</div>
      <div>Кол-во вопросов:</div>
      <div style={{ fontWeight: 700 }}>{count}</div>
      <Button link={btnLink}>Запуск</Button>
    </StyledTest>
  );
};

export default QuestPackCover;

QuestPackCover.propTypes = {
  header: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  btnLink: PropTypes.string.isRequired,
};

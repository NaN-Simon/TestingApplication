import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../UI/button/Button';

const StyledCardNavigation = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 15px;
  width: 100%;
`;

const CardNavigation = ({
  prevHandler,
  nextHandler,
  ButtonPrevTitle,
  ButtonNextTitle,
}) => {
  return (
    <StyledCardNavigation>
      <Button style={{ width: '100%', height: '50px' }} onClick={prevHandler}>
        {ButtonPrevTitle}
      </Button>
      <Button style={{ width: '100%', height: '50px' }} onClick={nextHandler}>
        {ButtonNextTitle}
      </Button>
    </StyledCardNavigation>
  );
};

export default CardNavigation;

CardNavigation.propTypes = {
  prevHandler: PropTypes.func.isRequired,
  nextHandler: PropTypes.func.isRequired,
  ButtonPrevTitle: PropTypes.string.isRequired,
  ButtonNextTitle: PropTypes.string.isRequired,
};

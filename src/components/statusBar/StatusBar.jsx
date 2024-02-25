import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledStatusBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20px;
  -webkit-box-shadow: 0px 0px 10px 2px rgba(34, 60, 80, 1);
  -moz-box-shadow: 0px 0px 10px 2px rgba(34, 60, 80, 1);
  box-shadow: 0px 0px 10px 2px rgba(34, 60, 80, 1);
  color: #000000;
  font-size: 12px;
  background: ${(props) =>
    props.$color > 76 ? 'green' : props.$color > 51 ? 'yellow' : 'red'};
  opacity: 0.75;
  cursor: context-menu;
`;

const StatusBar = ({ status, style }) => {
  return (
    <StyledStatusBar style={{ ...style }} $color={status}>
      {status}% completed
    </StyledStatusBar>
  );
};

export default StatusBar;

StatusBar.propTypes = {
  status: PropTypes.number.isRequired,
  style: PropTypes.object,
};

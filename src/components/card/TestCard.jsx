import styled from 'styled-components';
import Button from '../UI/button/Button';

const StyledTest = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  -webkit-box-shadow: 0px 0px 10px 2px rgba(34, 60, 80, 1);
  -moz-box-shadow: 0px 0px 10px 2px rgba(34, 60, 80, 1);
  box-shadow: 0px 0px 10px 2px rgba(34, 60, 80, 1);
`;

const TestCard = ({ header, count, btnLink }) => {
  return (
    <StyledTest data-name='test-card'>
      <div>Name: {header}</div>
      <div>quest count: {count}</div>
      <Button link={btnLink}>Run</Button>
    </StyledTest>
  );
};

export default TestCard;

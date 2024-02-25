import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  min-width: 50px;
  height: 35px;
  padding: 10px;
  border-radius: 6px;
  outline: none;
  border: none;
  -webkit-box-shadow: 0px 0px 10px 2px rgba(34, 60, 80, 1);
  -moz-box-shadow: 0px 0px 10px 2px rgba(34, 60, 80, 1);
  box-shadow: 0px 0px 10px 2px rgba(34, 60, 80, 1);
  color: #ffffff;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  background: transparent;
  transition: 0.25s all;
  cursor: pointer;
  &:hover {
    opacity: 0.75;
  }
`;
const StyledLink = styled(Link)`
  display: inherit;
  justify-content: inherit;
  align-items: inherit;
  gap: 4px;
  width: 100%;
  height: inherit;
  color: inherit;
  text-decoration: none;
`;

const Button = forwardRef((props, ref) => {
  const { children, link, style, className, onClick, ...datum } = props;

  return (
    <StyledButton
      style={{ ...style }}
      className={className}
      ref={ref}
      onClick={onClick}
      {...datum}
    >
      {link && <StyledLink to={link}>{children}</StyledLink>}
      {!link && children}
    </StyledButton>
  );
});

export default Button;

Button.displayName = 'Button';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  link: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
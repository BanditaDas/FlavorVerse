import React from 'react';
import styled from 'styled-components';

const Button = ( {bname, isActive} ) => {
  return (
    <StyledWrapper isActive={isActive}>
      <button className={`cta ${isActive ? 'active' : ''}`}>
        <span className="hover-underline-animation"> {bname} </span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .cta {  
    border: none;
    background: none;
    cursor: pointer;
  }

  .cta span {
    padding-bottom: 7px;
    letter-spacing: 4px;
    font-size: 14px;
    padding-right: 15px;
    text-transform: uppercase;
  }

  .cta.active span, .cta:hover span {
    color: #9A3412; /* orange-800 */
  }

  .cta svg {
    transform: translateX(-8px);
    transition: all 0.3s ease;
  }

  .cta:hover svg {
    transform: translateX(0);
  }

  .cta:active svg {
    transform: scale(0.9);
  }

  .hover-underline-animation {
    position: relative;
    color: #000;
    padding-bottom: 20px;
    transition: color 0.25s ease-out;
  }

  .hover-underline-animation:after {
    content: "";
    position: absolute;
    width: 79%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #9A3412; /* orange-800 */
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }
  .cta.active .hover-underline-animation:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }

  .cta:hover .hover-underline-animation:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }`;

export default Button;

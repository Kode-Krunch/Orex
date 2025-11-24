import React from 'react';
import styled from 'styled-components';
import { RiArrowUpFill } from 'react-icons/ri';
import { RiArrowDownFill } from 'react-icons/ri';
import { BLUE_500 } from './constants/tw_colors';

function GrowthCard({
  color = BLUE_500,
  icon: Icon,
  iconSize = 20,
  title,
  value,
  growth,
}) {
  /* CUSTOM ELEMENTS */
  const StyledDiv = styled.div`
    &::before {
      background-image: linear-gradient(
        to right,
        ${color} 60%,
        transparent 40%
      ) !important;
    }

    &::after {
      background-image: linear-gradient(
        180deg,
        rgba(255, 0, 0, 0),
        ${color}
      ) !important;
    }
  `;

  const StyledSpan = styled.span`
    &::before {
      background-image: linear-gradient(
        to left,
        ${color} 60%,
        transparent 40%
      ) !important;
    }

    &::after {
      background-image: linear-gradient(
        360deg,
        rgba(255, 0, 0, 0),
        ${color}
      ) !important;
    }
  `;

  return (
    <div
      className={`web-card animate__animated onlythis flex justify-center col-span-1 cursor-pointer  dark:!bg-[#1f2639]
          !bg-[#fff] dark:!border-stone-800
           dark:!border`}
    >
      <div className="card-bodyR">
        <div
          className={`flex justify-between border-l-2 py-2 pl-4`}
          style={{ borderColor: color }}
        >
          <div className="text-white opacity-80">
            <p className="font-regular">{title}</p>
            <p className="text-xl font-semibold">{value}</p>
          </div>
          <StyledDiv
            className={` animate__animated onlythis2 order`}
            style={{ width: '40px', height: '40px' }}
          >
            <StyledSpan>
              <Icon style={{ fontSize: iconSize, color: color }} />
            </StyledSpan>
          </StyledDiv>
        </div>
        {growth && (
          <div className="mt-2">
            {growth > 0 ? (
              <div className="flex items-center gap-1 text-green-600">
                <RiArrowUpFill />
                +&nbsp;{growth}%
              </div>
            ) : (
              <div className="flex items-center gap-1 text-red-600">
                <RiArrowDownFill />
                -&nbsp;{Math.abs(growth)}%
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default GrowthCard;

import React, { useState } from 'react';
import styled from 'styled-components';
import { DateRangePicker } from 'react-dates';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import 'moment/locale/ko';
import {
  flexSpaceBetweenCenter,
  flexColumnSpaceBetween,
  flexColumn,
  theme,
} from '../../styles/theme';
import { MdStar } from 'react-icons/md';
import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';

const PropertyReservation = ({
  focus,
  endDate,
  startDate,
  handleOnDateChange,
  setFocus,
}) => {
  const [isCapacityModalOn, setCapacityModal] = useState(false);
  const [capacity, setCapacity] = useState([
    { id: 1, value: '성인', name: 'adult', count: 0 },
    { id: 2, value: '어린이', name: 'child', count: 0 },
    { id: 3, value: '유아', name: 'infant', count: 0 },
  ]);

  const handleIncrement = (event) => {
    const newCapacity = capacity.map((person) => {
      if (person.id == event.target.id) {
        return { ...person, count: person.count + 1 };
      }
      return person;
    });
    setCapacity(newCapacity);
  };

  const handleDecrement = (event) => {
    const newCapacity = capacity.map((person) => {
      if (person.id == event.target.id) {
        const res = person.count - 1;
        return { ...person, count: res < 0 ? 0 : res };
      }
      return person;
    });
    setCapacity(newCapacity);
  };

  return (
    <>
      <PropertyReservationTab>
        <div className='flexCon'>
          <div className='leftCon'>
            <span className='propertyPrice'>₩65,000</span>
            <span>/박</span>
          </div>
          <div className='rightCon'>
            <span className='propertyRate'>
              <MdStar color={theme.pink} size={20} />
              4.86
            </span>
            <span className='propertyReviewNum'>(85)</span>
          </div>
        </div>
        <CalenderBox>
          <DateRangePicker
            numberOfMonths={2}
            displayFormat='YYYY.MM.DD'
            startDatePlaceholderText='체크인'
            endDatePlaceholderText='체크아웃'
            startDate={startDate}
            endDate={endDate}
            onDatesChange={handleOnDateChange}
            showClearDates={true}
            focusedInput={focus}
            onFocusChange={(focus) => setFocus(focus)}
            startDateId='startDate'
            endDateId='endDate'
            minimumNights={1}
          />
        </CalenderBox>
        <CapacityBox>
          <div
            className='capacitySelector'
            onClick={() => {
              setCapacityModal(!isCapacityModalOn);
            }}>
            <p>인원</p>
            <div className='capacityTotal'>
              게스트 {capacity[0]?.count}명, 어린이 {capacity[1]?.count}명, 유아{' '}
              {capacity[2]?.count}명
            </div>
            <button>
              {isCapacityModalOn ? (
                <IoIosArrowUp size={23} />
              ) : (
                <IoIosArrowDown size={23} />
              )}
            </button>
          </div>
          <div className={isCapacityModalOn ? 'capacityModal' : 'displayNone'}>
            {capacity.map((person) => (
              <div key={person.id} className='switch'>
                <span>{person.value}</span>
                <div>
                  <button
                    className='minus'
                    id={person.id}
                    onClick={handleDecrement}>
                    --
                  </button>
                  <span className='switchNum'>{person.count}</span>
                  <button
                    className='plus'
                    id={person.id}
                    onClick={handleIncrement}>
                    +
                  </button>
                </div>
              </div>
            ))}

            <span>최대 2명. 유아는 숙박인원에 포함되지 않습니다.</span>
            <div
              className='closeBtn'
              onClick={() => {
                setCapacityModal(!isCapacityModalOn);
              }}>
              닫기
            </div>
          </div>
        </CapacityBox>
        <button className='reservationBtn'>예약하기</button>
        <span className='smallText'>
          예약 확정 전에는 요금이 청구되지 않습니다.
        </span>
        <PropertyBill>
          <div>
            <span>65,000 * 2박</span>
            <span>₩130,000</span>
          </div>
          <div>
            <span>서비스 수수료</span>
            <span>₩18,353</span>
          </div>
          <div>
            <span>숙박세와 수수료</span>
            <span>₩1,835</span>
          </div>
          <div className='total'>
            <span>총 합계</span>
            <span>₩150,188</span>
          </div>
        </PropertyBill>
      </PropertyReservationTab>
    </>
  );
};

export default PropertyReservation;

const PropertyReservationTab = styled.div`
  ${flexColumn}
  position: sticky;
  top: 20px;
  padding: 30px 20px;
  margin: 0 0 0 20px;
  border: 1px solid #cccccc;
  border-radius: 15px;
  -webkit-box-shadow: -1px 11px 12px 6px rgba(102, 102, 102, 0.1);
  box-shadow: -1px 11px 12px 6px rgba(102, 102, 102, 0.1);
  .flexCon {
    display: flex;
    justify-content: space-between;
    height: 40px;
    .propertyPrice {
      font-size: 22px;
    }
    .propertyReviewNum {
      color: #b1b1b1;
    }
  }
  .reservationBtn {
    width: 100%;
    height: 48px;
    margin: 15px 0;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 600;
    color: white;
    background-color: ${theme.pink};
  }
  .smallText {
    margin: 5px 0 25px 0;
    font-size: 14px;
    text-align: center;
  }
`;

const CalenderBox = styled.div`
  .DateRangePicker {
    width: 100%;
    .DateRangePickerInput {
      display: flex;
      width: 100%;
      height: 75px;
      margin: 10px 0 0 0;
      border: 1px solid #cccccc;
      border-radius: 10px;
      padding: 5px;
      #startDate {
        font-size: 16px;
        font-weight: 400;
        width: 80%;
      }
      #endDate {
        width: 80%;
        font-size: 16px;
        font-weight: 400;
      }
    }
  }

  .CalendarDay__highlighted_calendar span.highlighted {
    background: #8db909;
    border-radius: 50%;
    padding: 8px 10px;
    color: #fff;
  }
`;
const CapacityBox = styled.div`
  .capacitySelector {
    position: relative;
    height: 60px;
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 0 0 8px 8px;

    &::after {
      content: '.';
      position: absolute;
      top: -10px;
      left: -1px;
      width: 100%;
      color: white;
      background-color: white;
      border-top: 1px solid #cccccc;
      border-left: 1px solid #cccccc;
      border-right: 1px solid #cccccc;
    }

    p {
      font-size: 12px;
      margin: -3px 0 8px 0;
    }

    button {
      background-color: white;
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
    }
  }
  .displayNone {
    display: none;
  }
  .capacityModal {
    ${flexColumnSpaceBetween}
    position: absolute;
    height: 300px;
    width: 88%;
    padding: 20px 10px;
    border: 1px solid #e2e2e2;
    border-radius: 8px;
    background-color: white;
    -webkit-box-shadow: -1px 11px 12px 6px rgba(102, 102, 102, 0.1);
    box-shadow: -1px 11px 12px 6px rgba(102, 102, 102, 0.1);
    .switch {
      ${flexSpaceBetweenCenter}
      width: 100%;
      height: 50px;
      span {
        font-size: 16px;
      }
      p {
        font-size: 12px;
        margin-top: 3px;
      }
      button {
        width: 32px;
        height: 32px;
        font-size: 22px;
        color: #6b6b6b;
        background-color: white;
        border: 1px solid #cccccc;
        border-radius: 50%;
        letter-spacing: -2px;
        cursor: pointer;
      }
      .switchNum {
        margin: 0 10px;
      }
    }
    span {
      margin-top: 10px;
      font-size: 14px;
    }
    .closeBtn {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: end;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const PropertyBill = styled.div`
  div {
    ${flexSpaceBetweenCenter}
    margin-bottom: 15px;
    font-size: 17px;
    &:nth-child(4) {
      padding-top: 30px;
      font-weight: 500;
      border-top: 1px solid #cccccc;
    }
  }
`;

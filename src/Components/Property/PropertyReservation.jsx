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
  const [capacityModalOn, setCapacityModal] = useState(false);

  return (
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
        <div className='capacitySelector'>
          <p>인원</p>
          <div className='capacityTotal'>게스트 2명, 유아 5명</div>
          <button>
            <IoIosArrowUp size={20} />
            <IoIosArrowDown size={20} />
          </button>
        </div>
        <div className='capacityModal'>
          <div className='switch'>
            <span>성인</span>
            <div>
              <button className='minus'>--</button>
              <span className='switchNum'>0</span>
              <button className='plus'>+</button>
            </div>
          </div>
          <div className='switch'>
            <div className='switchLeft'>
              <span>어린이</span>
              <p>2~12세</p>
            </div>
            <div>
              <button className='minus'>--</button>
              <span className='switchNum'>0</span>
              <button className='plus'>+</button>
            </div>
          </div>
          <div className='switch'>
            <div className='switchLeft'>
              <span>유아</span>
              <p>2세 미만</p>
            </div>
            <div>
              <button className='minus'>--</button>
              <span className='switchNum'>0</span>
              <button className='plus'>+</button>
            </div>
          </div>
          <span>최대 2명. 유아는 숙박인원에 포함되지 않습니다.</span>
          <div className='closeBtn'>닫기</div>
        </div>
      </CapacityBox>
    </PropertyReservationTab>
  );
};

export default PropertyReservation;

const PropertyReservationTab = styled.div`
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
    height: 50px;
    .propertyPrice {
      font-size: 22px;
    }
    .propertyReviewNum {
      color: #b1b1b1;
    }
  }
`;

const CalenderBox = styled.div`
  .DateRangePicker {
    width: 100%;
    .DateRangePickerInput {
      display: flex;
      width: 100%;
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

    p {
      font-size: 12px;
      margin-bottom: 3px;
    }

    button {
      background-color: white;
      position: absolute;
      right: 10px;
      top: 13px;
    }
  }

  .capacityModal {
    ${flexColumnSpaceBetween}
    position: absolute;

    height: 300px;
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
    }
  }
`;

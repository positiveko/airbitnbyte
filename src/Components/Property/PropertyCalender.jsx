import React, { useState } from 'react';
import styled from 'styled-components';
import { DayPickerRangeController } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'moment/locale/ko';

const PropertyCalender = ({
  setFocusedInput,
  focusedInput,
  focus,
  endDate,
  startDate,
  handleOnDateChange,
  setFocus,
}) => {
  return (
    <>
      <DayPickerRangeController
        numberOfMonths={window.innerWidth < 600 ? 1 : 2}
        startDate={startDate}
        endDate={endDate}
        onDatesChange={handleOnDateChange}
        focusedInput={focusedInput}
        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
        onFocusChange={(focus) => setFocus(focus)}
        focusedInput={focus}
        focus={focus}
        minimumNights={1}
      />
    </>
  );
};
export default PropertyCalender;

import React, { useEffect, useState } from 'react';
import PropertyGallery from './PropertyGallery';
import PropertyDetail from './PropertyDetail';
import PropertyCalender from './PropertyCalender';
import PropertyReview from './PropertyReview';
import PropertyMap from './PropertyMap';
import PropertyReservation from './PropertyReservation';
import styled from 'styled-components';
import {
  flexSpaceBetweenCenter,
  flexColumnCenter,
  theme,
} from '../../styles/theme';
import axios from 'axios';

import { MdStar } from 'react-icons/md';
import { FaMedal } from 'react-icons/fa';
import { FiShare2 } from 'react-icons/fi';
import { BsHeart } from 'react-icons/bs';
import PropertyHost from './PropertyHost';

const Property = (props) => {
  const [propertyImages, setPropertyImages] = useState([]);
  const [propertyInfo, setPropertyInfo] = useState({});

  useEffect(() => {
    axios
      .get('/data/propertyImages.json')
      .then(({ data: { image } }) => setPropertyImages(image));
  }, []);

  useEffect(() => {
    axios
      .get('/data/property.json')
      .then(({ data: { result } }) => setPropertyInfo(result));
  }, {});

  // 달력
  const [focus, setFocus] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [dateRange, setdateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const { startDate, endDate } = dateRange;
  const handleOnDateChange = ({ startDate, endDate }) => {
    setdateRange({ startDate, endDate });
    console.log(startDate.format());
  };

  return (
    <PropertyWrapper>
      <Header>
        <div className='propertyTitle'>{propertyInfo.propertyName}</div>
        <div className='headerInfo'>
          <div className='headerInfoLeft'>
            <MdStar color={theme.pink} size={20} />
            <span className='propertyRate'>4.86</span>
            <span className='propertyReviewNum'>
              ({propertyInfo.reviews?.length})
            </span>
            <span className='superhost'>
              <FaMedal color={theme.pink} />
              슈퍼호스트
            </span>
            <span className='propertyLocation'>
              제주시, 제주특별자치도, 한국
            </span>
          </div>
          <div className='headerInfoRight'>
            <button className='shareBtn'>
              <FiShare2 style={{ marginRight: 5 }} />
              공유하기
            </button>
            <button className='wishlistBtn'>
              <BsHeart style={{ marginRight: 5 }} />
              저장
            </button>
          </div>
        </div>
      </Header>
      {propertyImages.length > 0 && (
        <PropertyGallery propertyImages={propertyImages} />
      )}

      <ParagraphContainer>
        <div className='propertyLeft'>
          <PropertyDetail />
          <PropertyCalender
            setFocusedInput={setFocusedInput}
            setFocus={setFocus}
            focusedInput={focusedInput}
            focus={focus}
            endDate={endDate}
            startDate={startDate}
            handleOnDateChange={handleOnDateChange}
          />
        </div>
        <div className='proeprtyRight'>
          <PropertyReservation
            propertyInfo={propertyInfo}
            setFocusedInput={setFocusedInput}
            focusedInput={focusedInput}
            focus={focus}
            setFocus={setFocus}
            endDate={endDate}
            startDate={startDate}
            handleOnDateChange={handleOnDateChange}
          />
        </div>
      </ParagraphContainer>
      {propertyInfo.propertyId && (
        <PropertyReview reviews={propertyInfo.reviews} />
      )}
      {propertyInfo.propertyId && <PropertyMap propertyInfo={propertyInfo} />}
      <PropertyHost />
      <section className='propertyFooter'>
        <div className='propertyFooterTitle title'>알아두어야 할 사항</div>
        <div className='footerRule'>
          <p className='subtitle'>숙소 이용규칙</p>
          <p>체크인 시간: 오후 3:00 이후</p>
          <p>흡연 금지</p>
          <p>반려동물 동반 가능</p>
        </div>
        <div className='footerSafety'>
          <p className='subtitle'>건강과 안전</p>
          <p>
            에어비트앤바이트의 강화된 청소 절차 준수에 동의했습니다. 자세히
            알아보기
          </p>
          <p>
            에이비트앤바이트의 사회적 거리 두기 및 관련 가이드라인이 적용됩니다.
          </p>
          <p>일산화탄소 경보기</p>
          <p>화재경보기</p>
        </div>
        <div className='footerRefund'>
          <p className='subtitle'>환불 정책</p>
          <p>체크인 24시간 전까지 수수료 없이 예약 취소 가능</p>
          <p>
            그 이후로는 체크인 전에 취소하면 첫 1박 요금과 서비스 수수료를
            제외한 전액이 환불됩니다.
          </p>
        </div>
      </section>
      <section className='otherProperty'>
        <div className='otherPropertyHeader'>
          <div className='otherPropertyTitle title'>숙소 더 보기</div>
          <button>←</button> <button>→</button>
        </div>
        <div className='propertyList'>
          <div className='propertyBox'>
            <img src='/images/property1.png' alt='other property' />
            <p className='propertyRate'>★ 4.81(21)</p>
            <p className='propertyInfo'>호텔 객실 침대 2개</p>
            <p className='propertyName'>패밀리 스위트 트윈</p>
          </div>
        </div>
      </section>
    </PropertyWrapper>
  );
};

const PropertyWrapper = styled.div`
  ${flexColumnCenter};
  padding: 0 20px;
`;

const Header = styled.header`
  max-width: 1130px;
  width: 100%;
  height: 90px;
  .propertyTitle {
    font-size: 26px;
    font-weight: 600;
    margin: 20px 0;
  }
  .headerInfo {
    ${flexSpaceBetweenCenter}
    font-size: 14px;
    .superhost,
    .propertyReviewNum {
      color: #8f8f8f;
      &::after {
        content: '·';
        margin: 0 7px;
      }
    }
    .propertyLocation {
      text-decoration: underline;
    }
    button {
      width: 90px;
      height: 36px;
      border-radius: 10px;
      background-color: #fff;
      text-decoration: underline;
      &:hover {
        background-color: #f1f1f1;
      }
    }
  }
`;

const ParagraphContainer = styled.div`
  display: flex;
  flex-basis: 100%;
  max-width: 1130px;
  width: 100%;
  min-width: 500px;
  padding: 0 0 80px 0;
  border-bottom: 1px solid #dadada;
  .propertyLeft {
    width: 68%;
  }
  .propertyRight {
    position: relative;
    width: 100%;
  }
`;

export default Property;

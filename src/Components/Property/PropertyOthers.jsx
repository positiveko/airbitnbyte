import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import {
  flexCenter,
  flexColumnCenter,
  flexSpaceBetweenCenter,
  theme,
} from '../../styles/theme';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { MdStar } from 'react-icons/md';
import { FaMedal } from 'react-icons/fa';
import { BsHeart } from 'react-icons/bs';
import { BsHeartFill } from 'react-icons/bs';

const PropertyOthers = ({ properties }) => {
  const settings = {
    slidesToShow: 4,
    slidesToScroll: 4,
    slide: 'div',
    infinite: false,
    rows: 1,
    dots: true,
    centerPadding: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const money = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <OtherProperties>
      <section>
        <div className='otherPropertyHeader'>
          <div className='otherPropertyTitle title'>숙소 더 보기</div>
          <div>
            <button>
              <AiOutlineArrowLeft />
            </button>
            <button>
              <AiOutlineArrowRight />
            </button>
          </div>
        </div>
        <div className='properties'>
          <Slider {...settings}>
            {properties.map((property) => (
              <div key={property.propertyId} className='propertyBox'>
                <div className='pictureBox'>
                  <img src={property.propertyImage[0]} alt='other property' />
                  <i>슈퍼호스트</i>
                  <button>
                    <BsHeart color='white' size={20} />
                  </button>
                  <button>
                    <BsHeartFill color={theme.pink} size={20} />
                  </button>
                </div>
                <p className='propertyRate'>
                  <MdStar color={theme.pink} size={20} /> 4.81(21)
                </p>
                <p className='propertyInfo'>{property.sizes[0].sizeContent}</p>
                <p className='propertyName'>{property.propertyName}</p>
                <p className='propertyPrice'>
                  <b>₩{money(Math.floor(property.price))}</b>/1박
                </p>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </OtherProperties>
  );
};

export default PropertyOthers;

const OtherProperties = styled.div`
  ${flexCenter}
  width: 100%;
  background-color: #f7f7f7;

  section {
    width: 100%;
    max-width: 1130px;

    .otherPropertyHeader {
      ${flexSpaceBetweenCenter}
      height: 56px;

      .otherPropertyTitle {
      }
      button {
        width: 32px;
        height: 32px;
        margin-right: 10px;
        border-radius: 50%;
        background-color: white;
        -webkit-box-shadow: 1px 0px 5px 2px rgba(0, 0, 0, 0.14);
        box-shadow: 1px 0px 5px 2px rgba(0, 0, 0, 0.14);
        svg {
          padding-top: -10px;
          margin: 0;
        }
      }
    }
    .properties {
      margin-bottom: 60px;
      /* display: flex; */
      height: 400px;

      .propertyBox {
        width: 270px;
        height: 278px;
        margin-bottom: 20px;

        .pictureBox {
          position: relative;
          width: 270px;
          height: 180px;
          overflow: hidden;
          margin-bottom: 15px;

          img {
            object-fit: cover;
            width: 100%;
            height: 100%;
            border: 1px solid #c9c9c9;
            border-radius: 8px;
          }

          i {
            position: absolute;
            ${flexCenter}
            top: 10px;
            left: 10px;
            width: 75px;
            height: 25px;
            font-size: 12px;
            font-weight: 700;
            background-color: white;
            border: 1px solid ${theme.black};
            border-radius: 7px;
            z-index: 1000;
          }

          button {
            position: absolute;
            ${flexCenter}
            right: 10px;
            top: 8px;
            background-color: transparent;
          }
        }

        .propertyRate {
          svg {
            padding: 0px;
            margin-bottom: -3px;
          }
        }
        p {
          margin-bottom: 5px;
        }
        .propertyName {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        b {
          font-weight: 600;
        }
      }
    }
  }
`;

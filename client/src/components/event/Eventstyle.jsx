import styled from "styled-components";
import { BgImg } from "../../styledComponent/Image";
import { secondary, error } from "./../../styledComponent/Variables";

export const PreviewPhoto = styled(BgImg)`
  width: 226px;
  height: 258px;
  position: absolute;
  top: 165px;
  left: 56px;
  border: 2px solid #33468b;
  border-radius: 11px;
`;

export const FirstPageContainer = styled(BgImg)`
  #photoBtn {
    width: 150px;
    height: 49px;
    font-size: 17px;
    color: #fff;
    background: ${secondary};

    border-radius: 15px;
  }

  .en-name {
    @media only screen and (max-width: 830px) {
      font-size: ${(props) => props.enNameSz} !important;
      margin: 12px 0 0 0 !important;
    }
  }

  #PhotoPlaceholderBox {
    width: 212px;
    height: 249px;
    position: absolute;
    top: 169px;
    left: 61px;
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
      margin: 24px 0 18px 0;
      width: 120px;
      height: 108px;
    }
    p {
      font-size: 12.5px;
      margin-bottom: 10px;
    }
  }

  #confirm {
    width: 173px;
    height: 49px;
    font-size: 23.5px;
    color: #fff;
    background: ${secondary};
    position: absolute;
    top: 426px;
    border-radius: 15px;
    left: 401px;

    @media only screen and (max-width: 830px) {
      width: 77px;
      height: 30px;
      font-size: 12.5px;
      color: #fff;
      background: #e95650;
      position: absolute;
      top: 128px;
      border-radius: 11px;
      left: 149px;
    }
  }

  #nameBtn {
    position: absolute;
    top: 230px;
    border-radius: 15px;

    right: 18rem;
    font-size: 17px;
    width: 375px;
    height: 49px;
    color: #fff;
    background: ${secondary};
  }

  #Date {
    position: absolute;
    font-size: 20px;
    top: 39rem;
    left: 34rem;

    letter-spacing: -1px;

    @media only screen and (max-width: 830px) {
      letter-spacing: -0.5px;
      top: 11rem;
      left: 14rem;
      font-size: 11px;
    }
  }

  #editIcon {
    position: absolute;
    top: 23rem;
    right: 4rem;
    color: ${error};
    width: 40px;
    height: 40px;
    cursor: pointer;

    @media only screen and (max-width: 830px) {
      top: 3.5rem;
      right: 1rem;
      width: 23px;
      height: 23px;
    }
  }
`;

export const NameBoxBeforeSave = styled.div`
  // top: 219px;
  // position: absolute;
  // left: 41rem;
  // width: 47rem;
  padding: 1rem 3rem 14rem 3rem;
`;

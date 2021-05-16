import styled from "styled-components";

export const Img = styled.img`
  padding: ${(props) => props.p};
  margin: ${(props) => props.m};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
`;

export const DivImg = styled.div`
  background-image: url(${(props) => props.imgUrl});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: ${(props) => props.p};
  margin: ${(props) => props.m};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border-radius: ${(props) => props.borderradious};
`;

export const BgImg = styled.div`
  background-image: url(${(props) => props.imgUrl});
  background-position: center;
  background-size: 90%;
  background-repeat: no-repeat;
  background-color: ${(props) => props.holder};
  padding: ${(props) => props.p};
  margin: ${(props) => props.m};
  margin-bottom: ${(props) => props.mb};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border-radius: ${(props) => props.borderradious};
  position: relative;
  cursor: ${(props) => props.cursor};
`;

import styled from "styled-components";
import { defaultFs, smallFs, largeFs } from "./Variables";

export const Text = styled.p`
  font-size: ${(props) => (props.sz ? props.sz : defaultFs)};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.cr};
  margin: ${(props) => props.m};
  margin-bottom: ${(props) => props.mb};
  display: ${(props) => props.display};
  text-align: ${(props) => props.textalign};
`;

export const SmallText = styled.p`
  font-size: ${(props) => (props.sz ? props.sz : smallFs)};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.cr};
  margin: ${(props) => props.m};
  margin-bottom: ${(props) => props.mb};
  display: ${(props) => props.display};
  text-align: ${(props) => props.textalign};
`;

export const LargeText = styled.p`
  font-size: ${(props) => (props.sz ? props.sz : largeFs)};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.cr};
  margin: ${(props) => props.m};
  margin-bottom: ${(props) => props.mb};
  display: ${(props) => props.display};
  text-align: ${(props) => props.textalign};
`;

export const HeadThree = styled.h3`
  font-size: 1.8rem;
  font-weight: ${(props) => props.weight};
  margin: ${(props) => props.m};
  text-transform: ${(props) =>
    props.transform ? props.transform : "uppercase"};
`;

export const HeadTwo = styled.h2`
  font-size: ${(props) => (props.sz ? props.sz : "2rem")};
  margin: ${(props) => props.m};
  font-weight: ${(props) => props.weight};
  text-transform: ${(props) =>
    props.transform ? props.transform : "uppercase"};
`;

export const HeadOne = styled.h1`
  font-size: ${(props) => (props.sz ? props.sz : "3.5rem")};
  font-weight: ${(props) => props.weight};
  text-transform: uppercase;
  margin: ${(props) => props.m};
  cursor: pointer;
  text-transform: ${(props) =>
    props.transform ? props.transform : "uppercase"};
`;

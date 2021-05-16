import { Grid } from "@material-ui/core";
import styled from "styled-components";

export const CusGrid = styled(Grid)`
  background-color: ${(props) => props.bg};
  max-width: ${(props) => props.maxwidth};
  width: ${(props) => props.width};
  padding: ${(props) => props.p};
  margin: ${(props) => props.m};
  height: ${(props) => props.height};
  border-bottom: ${(props) => props.bb};
  border: ${(props) => props.border};
  position: ${(props) => props.position};
  opacity: ${(props) => props.opacity};
  flex-grow: ${(props) => props.flexgrow};
  margin-bottom: ${(props) => props.mb};
`;

export const Box = styled.div`
  background-color: ${(props) => props.bg};
  max-width: ${(props) => props.maxwidth};
  width: ${(props) => props.width};
  padding: ${(props) => props.p};
  margin: ${(props) => props.m};
  height: ${(props) => props.height};
  border-bottom: ${(props) => props.bb};
  border: ${(props) => props.border};
  position: ${(props) => props.position};
  opacity: ${(props) => props.opacity};
`;

export const Form = styled.form`
  margin: ${(props) => props.m};
  background-color: ${(props) => props.bg};
  padding: ${(props) => props.p};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: center;
`;

export const OutLiner = styled.div`
  border-bottom: ${(props) =>
    props.linestyle ? props.linestyle : `1px solid white`};
  margin: ${(props) => props.m};
`;

export const UnOrderedList = styled.ul`
  list-style: none;
`;

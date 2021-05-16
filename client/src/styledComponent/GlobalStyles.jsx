import styled, { createGlobalStyle } from "styled-components";

import { Box } from "@material-ui/core";

export const FlexedBox = styled(Box)`
  display: flex;
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.alginitems};
  flex-di
`;

const GlobalStyles = createGlobalStyle`


  @media screen and (max-width: 800px) {
  
  .uprism_guide .check-box {
    position: absolute;
    bottom: 1px !important;
    top: unset;
    right: 2rem;
    padding: 0;
    left: auto;
   }
.uprism_guide img {
  height: 100% !important;
}
}

.banner-game,
.playground {
  display: block !important;
}


`;

export default GlobalStyles;

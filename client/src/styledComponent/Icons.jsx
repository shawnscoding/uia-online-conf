import RefreshIcon from "@material-ui/icons/Refresh";
import { secondary, darkGrey } from "./Variables";
import Sms from "@material-ui/icons/Sms";
import styled from "styled-components";

export const StyledSmsIcon = styled(Sms)`
  font-size: 1.6rem;
  color: ${darkGrey};
  :hover {
    color: ${secondary};
  }
`;

export const StyledRefreshIcon = styled(RefreshIcon)`
  font-size: 3rem;
  color: ${darkGrey};
  cursor: pointer;
  :hover {
    color: ${secondary};
  }
`;

import React from "react";
import {
  withStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import { Text } from "./../../styledComponent/Text";
import { JoinAlertModalZindex } from "./../../styledComponent/Variables";
import { CusGrid } from "../../styledComponent/Layouts";
import { Button } from "@material-ui/core";
import styled from "styled-components";

const theme = createMuiTheme({
  zIndex: {
    modal: 99991,
  },
});

const StyledDialog = styled(Dialog)`
  .MuiDialog-scrollPaper {
    display: flex;
    align-items: flex-start;
    justify-content: center;

    z-index: 99991;
  }

  .MuiBackdrop-root {
    z-index: ;
  }
`;

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Text sz="2rem">{children}</Text>
      {onClose ? (
        <IconButton
          fontSize="large"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const JoinAlertModal = ({ open, join, cancel, msg }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledDialog open={open}>
        <DialogContent dividers>
          <Text m="0 0 2rem 0" sz="2rem">
            {msg}
          </Text>
        </DialogContent>
        <CusGrid justify="flex-end" p="1rem" container>
          <Button
            style={{ margin: "0  1rem 0 0" }}
            color="primary"
            variant="contained"
            size="large"
            onClick={join}
          >
            accept
          </Button>
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={cancel}
          >
            cancel
          </Button>
        </CusGrid>
      </StyledDialog>
    </ThemeProvider>
  );
};

JoinAlertModal.propType = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  nearestContent: PropTypes.object.isRequired,
};

JoinAlertModal.defaultProps = {
  inWorkshop: false,
};

export default JoinAlertModal;

import styled from "styled-components";
import { white, primary, secondary } from "../../styledComponent/Variables";
import { NavLink } from "react-router-dom";

const navbarZ = 0;

export const navPaddingTop = "30px";
export const menuIconTop = `calc(${navPaddingTop} + 20px)`;

export const navPadding = `${navPaddingTop} 30px 0 30px`;

// this is content width
export const navWidth = "28rem";
export const totalWidth = "40rem";
const shirnkedWidth = "8rem";
export const shrinkedNavWidth = `calc(-${totalWidth} + ${shirnkedWidth})`;
// menuIcon

const right = "-30px";
export const logoHeight = "120px";

export const photoWidth = "80px";

// font-size
export const linkSize = "21px";
export const subLinkSize = "16px";
export const bottomLinkSize = "18px";
export const emailSize = "18px";

// common
export const mbSmall = "10px";

export const ListItem = styled.li`
  width: 100%;
  margin-bottom: ${mbSmall};

  color: ${white};

  a.notInLobby {
    color: ${white} !important;
  }
  a.active {
    color: ${secondary};

    div {
      color: ${secondary};
    }
  }

  a {
    text-decoration: none;
    color: ${white};
    font-size: ${bottomLinkSize};
    cursor: pointer;

    div {
      font-size: ${bottomLinkSize};
    }

    :hover {
      text-decoration: none;
    }
    :focus {
      outline: none;
    }
  }

  #styledButton {
    color: ${white};
    font-size: ${bottomLinkSize};
    background-color: ${primary};
    outline: none;

    border: ${(props) => (props.border ? props.border : "none")};

    div {
      font-size: ${bottomLinkSize};
    }

    :hover {
      outline: none;
      border: ${(props) => (props.border ? props.border : "none")};
    }
    :focus {
      outline: none;
      border: ${(props) => (props.border ? props.border : "none")};
    }
  }
`;

export const IconBox = styled.div`
  margin: -3px 2rem 0 0;

  svg {
    width: 30px;
    height: 30px;
  }
`;

export const SubListItem = styled.li`
  display: flex;
  padding: 0 0 0 3px;
  width: 100%;

  background-color: ${(props) => props.selected};

  a.active {
    color: ${secondary} !important;
  }

  a {
    display: flex;
    text-decoration: none;
    color: ${white};
    font-size: ${subLinkSize};

    :hover {
      text-decoration: none;
    }
    :focus {
      outline: none;
    }
  }
`;

export const Container = styled.div`
  height: 100%;
  /* left: ${shrinkedNavWidth}; */
  left: 0;
  position: fixed;
  padding: ${navPadding};
  background-color: ${primary};
  opacity: 0.8;
  transition: left 1s ease;


  #logo {
    width: 100%;
  height: 110px;
  margin-bottom: 40px;
  }

  #profileContainer {
    margin-bottom: 49px;
    height: 36px;
    width: 100%;
    display: flex;

  #profile {
    margin-top: 11px;
    border-radius: 50px;
    width: 36px;
    height: 36px;
    cursor: pointer;

  

  }

  #logout {
    font-size:14px;
    background: none;
  }
    
  }

  #titleBox {
    font-size: 20px;
    margin-bottom: 32px ;
    display: flex;
    justify-content: flex-start;
    
  #titleMark {
  width: 5px;
  height: 18px;
  margin: 7px 8px 0 0;
  }

  

  }


  .bottomLinkItem {
    margin-bottom: 10px;
    width: 100%;
    font-size: ${bottomLinkSize};

    #icon {
      width: 30px;
      height: 30px;
      margin-right: 20px;
    }
  }

  #menuIcon {
    position: absolute;
    top: ${menuIconTop};
    right: ${right};
    transition: left 1s ease;

    z-index: ${navbarZ + 10};
  }

  #box {
   
  }


`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  justify-content: flex-start;
`;

export const StyledNButton = styled.button`
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
`;

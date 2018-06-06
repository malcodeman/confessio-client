import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../auth/actions/auth_actions";
import { findMe } from "../../users/actions";

import user from "../images/user.svg";

const Button = styled.button`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.8);
  margin: 0 6px;
  border: 0;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
`;

const Image = styled.img`
  height: ${props => props.height};
  width: ${props => props.width};
  ${props => {
    if (props.circle) {
      return "border-radius: 50%";
    } else if (props.margin) {
      return "margin: 0 6px";
    }
  }};
  object-fit: cover;
`;

class Toolbar extends Component {
  componentDidMount = () => {
    const { me, findMe } = this.props;
    if (me === null) {
      findMe();
    }
  };
  logoutHandler = () => {
    const { logout, me } = this.props;
    logout(me);
  };
  renderUser = () => {
    const { me } = this.props;
    if (me !== null) {
      return (
        <Link to={`${me.username}`}>
          <Image height="20" width="20" margin src={user} />
        </Link>
      );
    } else return null;
  };
  render() {
    return (
      <React.Fragment>
        <Button onClick={this.logoutHandler}>
          <span>Log Out</span>
        </Button>
        {this.renderUser()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    me: state.users.me
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: user => dispatch(logout(user)),
    findMe: () => dispatch(findMe())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);

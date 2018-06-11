import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Modal from "../components/Modal";
import ProfilePhotoForm from "./ProfilePhotoForm";

import { updateMe } from "../actions";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PhotoContainer = styled.div`
  border-radius: 50%;
  height: 64px;
  width: 64px;
  background-color: #007aff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  cursor: ${props => (props.cursor ? props.cursor : "default")};
`;

const Photo = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
  border-radius: 50%;
`;

class ProfilePhoto extends Component {
  state = {
    openModal: false
  };
  componentDidMount() {
    document.addEventListener("keydown", this.handleEscape, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEscape, false);
  }
  handleClick = () => {
    this.setState(prevState => ({
      openModal: !prevState.openModal
    }));
  };
  handleEscape = event => {
    if (event.keyCode === 27) {
      this.setState({ openModal: false });
    }
  };
  renderModal = () => {
    const { openModal } = this.state;
    if (openModal) {
      return (
        <Modal>
          <ProfilePhotoForm
            closeModal={this.handleClick}
            updateMe={this.props.updateMe}
          />
        </Modal>
      );
    }
  };
  renderProfilePhoto = () => {
    const { profile, profilePhotoURL, nameFirstLetter } = this.props;
    if (profile && profilePhotoURL) {
      return (
        <PhotoContainer cursor="pointer">
          <Photo onClick={this.handleClick} src={profilePhotoURL} />
        </PhotoContainer>
      );
    } else if (profile && nameFirstLetter) {
      return (
        <PhotoContainer onClick={this.handleClick} cursor="pointer">
          {nameFirstLetter}
        </PhotoContainer>
      );
    } else {
      if (profilePhotoURL) {
        return (
          <PhotoContainer>
            <Photo src={profilePhotoURL} />
          </PhotoContainer>
        );
      } else {
        return <PhotoContainer>{nameFirstLetter}</PhotoContainer>;
      }
    }
  };
  render() {
    return (
      <Wrapper>
        {this.renderProfilePhoto()}
        {this.renderModal()}
      </Wrapper>
    );
  }
}

export default connect(
  null,
  { updateMe }
)(ProfilePhoto);

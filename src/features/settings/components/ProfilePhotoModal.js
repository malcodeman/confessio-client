import React from "react";
import styled from "styled-components";

import ProfilePhotoURLForm from "./ProfilePhotoURLForm";
import { XIcon } from "../styles/settingsStyles";

const Wrapper = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  transition: width 0.3s cubic-bezier(0.84, 0.02, 0.37, 0.74),
    height 0.3s cubic-bezier(0.84, 0.02, 0.37, 0.74);
  @media (min-width: 768px) {
    width: 50vw;
    height: 50vh;
  }
`;

const Main = styled.main`
  display: grid;
  grid-template-rows: auto 1fr;
  padding: 16px;
  background-color: ${props => props.theme.backgroundSecondary};
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: normal;
  margin-left: auto;
  color: ${props => (props.active ? props.theme.brand : props.theme.primary)};
`;

const ProfilePhotoForm = props => {
  const { toggleProfilePhotoForm } = props;

  return (
    <Wrapper>
      <Main>
        <Header>
          <Title>Link (URL)</Title>
          <XIcon onClick={toggleProfilePhotoForm} />
        </Header>
        <>
          <ProfilePhotoURLForm
            toggleProfilePhotoForm={toggleProfilePhotoForm}
          />
        </>
      </Main>
    </Wrapper>
  );
};

export default ProfilePhotoForm;

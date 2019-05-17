import React from "react";
import * as Yup from "yup";
import { Form, Field, withFormik } from "formik";
import { connect } from "react-redux";
import styled from "styled-components";

import Loader from "../../loader/components/Loader";
import { ErrorMessage, LinkIcon } from "../styles/settingsStyles";
import { updateProfilePhotoURL } from "../actions/settingsActionCreators";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledForm = styled(Form)`
  width: 100%;
  @media (min-width: 992px) {
    width: 50%;
  }
`;

const FormItem = styled.div`
  display: flex;
`;

const Input = styled(Field)`
  min-height: 36px;
  font-size: 0.8rem;
  padding: 0 4px;
  outline: 0;
  width: 100%;
  border: 0;
  color: ${props => props.theme.primary};
  border-radius: ${props => props.theme.borderRadius} 0 0
    ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.backgroundPrimary};
`;

const Submit = styled.button`
  color: #fff;
  border: 0;
  cursor: pointer;
  min-height: 36px;
  font-size: 0.8rem;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.brand};
  border-radius: 0px ${props => props.theme.borderRadius}
    ${props => props.theme.borderRadius} 0px;
`;

const FormikForm = props => {
  const { errors, touched, isSubmitting } = props;

  return (
    <Wrapper>
      <StyledForm>
        <FormItem>
          <Input type="text" name="profilePhotoURL" placeholder="Enter a URL" />
          <Submit disabled={isSubmitting}>
            {isSubmitting ? <Loader /> : <LinkIcon />}
          </Submit>
        </FormItem>
        <ErrorMessage>
          {(touched.profilePhotoURL && errors.profilePhotoURL && (
            <ErrorMessage>{errors.profilePhotoURL}</ErrorMessage>
          )) ||
            errors.general}
        </ErrorMessage>
      </StyledForm>
    </Wrapper>
  );
};

const ProfilePhotoURLForm = withFormik({
  enableReinitialize: true,
  validationSchema: Yup.object().shape({
    profilePhotoURL: Yup.string()
      .required("URL is required")
      .url("Please enter a URL")
  }),
  mapPropsToValues: props => ({
    profilePhotoURL: ""
  }),
  handleSubmit(payload, bag) {
    bag.props.updateProfilePhotoURL(payload, {
      setSubmitting: bag.setSubmitting,
      setFieldError: bag.setFieldError,
      toggleProfilePhotoForm: bag.props.toggleProfilePhotoForm
    });
  }
})(FormikForm);

export default connect(
  null,
  { updateProfilePhotoURL }
)(ProfilePhotoURLForm);

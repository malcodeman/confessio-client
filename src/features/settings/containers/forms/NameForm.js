import React, { Component } from "react";
import { withFormik, Form, Field } from "formik";
import { connect } from "react-redux";
import Yup from "yup";
import styled from "styled-components";

import Loader from "../../../loader/components/Loader";

import { updateName } from "../../actions/settingsActionCreators";

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  padding: 24px 0;
`;

const Input = styled(Field)`
  color: #3a3133;
  height: 36px;
  font-size: 0.8rem;
  padding: 0 4px;
  outline: 0;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 2px;
`;

const Button = styled.button`
  background-color: #3a3133;
  color: #fff;
  border: 0;
  cursor: pointer;
  min-height: 36px;
  border-radius: 2px;
  font-size: 0.8rem;
  padding: 0;
  &:disabled {
    opacity: 0.8;
  }
`;

const ErrorMessage = styled.span`
  font-size: 0.8rem;
  color: #b00e23;
`;

class FormikForm extends Component {
  render() {
    const { errors, touched, isSubmitting } = this.props;
    return (
      <StyledForm>
        <Input type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && (
          <ErrorMessage>{errors.name}</ErrorMessage>
        )}
        <Button disabled={isSubmitting}>
          {isSubmitting ? <Loader message={"Saving"} /> : "Save"}
        </Button>
      </StyledForm>
    );
  }
}

const NameForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => ({
    name: props.me.name || ""
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Name is required")
  }),
  handleSubmit(payload, bag) {
    bag.props.updateName(payload, { setSubmitting: bag.setSubmitting });
  }
})(FormikForm);

const mapStateToProps = state => {
  return {
    me: state.users.me
  };
};

export default connect(
  mapStateToProps,
  { updateName }
)(NameForm);

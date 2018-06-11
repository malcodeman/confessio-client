import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "../components/Header";
import Posts from "../components/Posts";
import { findUserByUsername, unloadUser } from "../actions";

class User extends Component {
  componentDidMount = () => {
    const { username } = this.props;
    const { findUserByUsername } = this.props;
    findUserByUsername(username);
  };
  componentWillUnmount = () => {
    const { unloadUser } = this.props;
    unloadUser();
  };
  renderUser = () => {
    const { user, loading, error } = this.props;
    if (loading) {
      return <p>Loading...</p>;
    } else if (error) {
      return <p>Sorry, this page isn't available.</p>;
    } else if (user !== null && loading === false && error === false) {
      return (
        <React.Fragment>
          <Header
            profilePhotoURL={user.profilePhotoURL}
            nameFirstLetter={user.nameFirstLetter}
            username={user.username}
            name={user.name}
            email={user.email}
            postsLength={user.posts.length}
          />
          <Posts posts={user.posts} />
        </React.Fragment>
      );
    }
  };
  render() {
    return <div>{this.renderUser()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.users.user,
    loading: state.users.loading,
    error: state.users.error
  };
};

export default connect(
  mapStateToProps,
  { findUserByUsername, unloadUser }
)(User);

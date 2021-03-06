import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

import PostLoading from "../components/PostLoading";
import Post from "../components/Post";
import NewPostForm from "./PostsNewForm";
import Suggestions from "../components/Suggestions";
import footerLinks from "../data/footerLinks";

import { getPosts } from "../actions/postsActionCreators";

const Container = styled.div`
  display: grid;
  padding: 0 24px;
  @media (min-width: 768px) {
    padding: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 2fr 1fr;
    grid-gap: 24px;
  }
`;

const PostsContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 576px;
  @media (min-width: 992px) {
    max-width: initial;
  }
`;

const SidebarContainer = styled.div`
  display: none;
  @media (min-width: 992px) {
    display: flex;
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  position: sticky;
  top: 88px;
`;

const Footer = styled.footer``;

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

const ListItem = styled.li`
  :not(:last-child) {
    margin-right: 4px;
  }
`;

const StyledLink = styled(Link)`
  font-size: 0.8rem;
  color: ${(props) => props.theme.secondary};
`;

const Copyright = styled.span`
  font-size: 0.8rem;
  text-transform: uppercase;
  color: ${(props) => props.theme.secondary};
`;

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const me = useSelector((state) => state.users.me);

  React.useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Container>
      <PostsContainer>
        <NewPostForm me={me} />
        {posts.length === 0 && loading && <PostLoading />}
        {posts.map((post) => {
          return <Post key={post.id} post={post} me={me} />;
        })}
      </PostsContainer>
      <SidebarContainer>
        <Sidebar>
          <Suggestions />
          <Footer>
            <List>
              {footerLinks.map((link) => {
                return (
                  <ListItem key={link.label}>
                    <StyledLink to={link.route}>{link.label}</StyledLink>
                  </ListItem>
                );
              })}
            </List>
            <Copyright>© Polaroid</Copyright>
          </Footer>
        </Sidebar>
      </SidebarContainer>
    </Container>
  );
};

export default Posts;

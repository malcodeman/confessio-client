import React from "react";
import styled from "styled-components";
import { distanceInWordsToNow } from "date-fns";
import { Link } from "react-router-dom";

import Actions from "../components/Actions";
import Likes from "./Likes";
import Comments from "./Comments";
import CommentForm from "../containers/CommentForm";

const Article = styled.article`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  background-color: ${props => props.theme.backgroundSecondary};
`;

const Header = styled.header`
  padding: 16px;
  border-left: 1px solid ${props => props.theme.borderColor};
  border-top: 1px solid ${props => props.theme.borderColor};
  border-right: 1px solid ${props => props.theme.borderColor};
  border-top-left-radius: ${props => props.theme.borderRadius};
  border-top-right-radius: ${props => props.theme.borderRadius};
`;

const ProfilePhoto = styled.img`
  height: 34px;
  width: 34px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const NameFirstLetter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  width: 34px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
  color: #fff;
  font-size: 0.8rem;
  background-color: #007aff;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.primary};
`;

const Photo = styled.img`
  max-width: 100%;
  object-fit: cover;
`;

const Time = styled.time`
  font-size: 0.6rem;
  text-transform: uppercase;
  padding: 0 16px;
  margin-bottom: 8px;
  color: ${props => props.theme.secondary};
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  border-left: 1px solid ${props => props.theme.borderColor};
  border-right: 1px solid ${props => props.theme.borderColor};
  border-bottom: 1px solid ${props => props.theme.borderColor};
  border-bottom-left-radius: ${props => props.theme.borderRadius};
  border-bottom-right-radius: ${props => props.theme.borderRadius};
`;

const Post = props => {
  const { post } = props;

  return (
    <Article>
      <Header>
        <StyledLink to={`/${post.user.username}`}>
          {post.user.profilePhotoURL ? (
            <ProfilePhoto src={post.user.profilePhotoURL} />
          ) : (
            <NameFirstLetter>{post.user.nameFirstLetter}</NameFirstLetter>
          )}
          <Username>{post.user.username}</Username>
        </StyledLink>
      </Header>
      <Photo src={post.photoURL} />
      <Footer>
        <Actions
          createLike={props.createLike}
          createBookmark={props.createBookmark}
          destroyBookmark={props.destroyBookmark}
          destroyLike={props.destroyLike}
          postId={post.id}
          liked={post.liked}
          bookmarked={post.bookmarked}
        />
        <Likes
          likesCount={post.likesCount}
          postId={post.id}
          createLike={props.createLike}
        />
        <Comments comments={post.comments} />
        <Time>{distanceInWordsToNow(post.createdAt)} ago</Time>
        <CommentForm createComment={props.createComment} postId={post.id} />
      </Footer>
    </Article>
  );
};

export default Post;

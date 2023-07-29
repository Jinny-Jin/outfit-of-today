import React from 'react';
import styled from 'styled-components';
import FeedImage from '../FeedImage/FeedImage';
import { useNavigate } from 'react-router-dom';

const ContentPosting = ({ feedOrLike, feed, feedGet }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Posting>
        {(feed === undefined || feed.length === 0) && (
          <PostingNone>
            {feedOrLike ? (
              <span
                className="firstPost"
                onClick={() => navigate('/post-upload')}
              >
                + 첫 게시물을 올려보세요!
              </span>
            ) : (
              '+ 게시물을 좋아요 해보세요!'
            )}
          </PostingNone>
        )}
        {feed !== undefined &&
          feed.length > 0 &&
          feed.map(posting => {
            // contentsUrl의 min id 값의 index 반환
            let minId = posting.contentUrls[0].id;
            let minIndex = 0;
            for (let i = 0; i < posting.contentUrls.length; i++) {
              if (minId > posting.contentUrls[i].id) {
                minId = posting.contentUrls[i].id;
                minIndex = i;
              }
            }
            return (
              <FeedImage
                key={posting.feedId}
                image={posting.contentUrls[minIndex].contentUrl}
                feedOrLike={feedOrLike}
                feedId={posting.feedId}
                feedGet={feedGet}
              />
            );
          })}
      </Posting>
    </Container>
  );
};

export default ContentPosting;

const Container = styled.div`
  width: 65%;
`;

const Posting = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const PostingNone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dotted orange;
  width: 100%;
  height: 200px;
  color: lightgray;
  .firstPost {
    cursor: pointer;
  }
`;

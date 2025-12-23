import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import Comment from './Comment';
import {
  getMyReviewLike,
  getReviewDetail,
  getReviewLikeCount,
  likeReview,
  unlikeReview,
} from '../../../api/ReviewAndCommentApi';

const DentistReviewView = () => {
  const { user } = useUser();
  const [like, setLike] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [review, setReview] = useState({});
  const [commentCount, setCommentCount] = useState(0);

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const reviewId = query.get('reviewId'); // requestParam에 있는 값 가져오기

  // 리뷰 불러오기
  const reviewFetch = async () => {
    try {
      const data = await getReviewDetail(reviewId);
      setReview(Array.isArray(data) ? data[0] : {});
    } catch (error) {
      console.error('Detailed Review Fetch Erorr', error);
      setReview({});
    }
  };

  // 좋아요 수 불러오기
  const likeCountFetch = async () => {
    try {
      const data = await getReviewLikeCount(reviewId);
      setLikeCount(data);
    } catch (error) {
      console.error('Like Count Fetch Error', error);
    }
  };

  // 좋아요
  const likeFetch = async () => {
    try {
      const data = await getMyReviewLike({
        userId: user.id,
        reviewId,
      });

      if (data) {
        setLike(true);
        setLikeId(data.l_id);
      } else {
        setLike(false);
        setLikeId(null);
      }
    } catch (error) {
      console.error('Like Fetch Error', error);
    }
  };

  const likeClicked = async () => {
    // 로그인 체크
    if (!user || !user.id) {
      alert('로그인이 필요합니다.');
      return;
    }
    try {
      await likeReview({
        reviewId,
        userId: user.id,
      });
      setLike(true);
      likeCountFetch();
    } catch (error) {
      console.error('like error', error);
    }
  };

  const likeUnclicked = async () => {
    // 로그인 체크
    if (!user || !user.id) {
      alert('로그인이 필요합니다.');
      return;
    }
    try {
      await unlikeReview({
        likeId,
        reviewId,
        userId: user.id,
      });

      setLike(false);
      likeCountFetch();
    } catch (error) {
      console.error('unlike error', error);
    }
  };

  useEffect(() => {
    if (user?.id) likeFetch();
  }, [user]);

  useEffect(() => {
    if (reviewId) {
      reviewFetch();
      likeCountFetch();
    }
  }, [reviewId]);

  return (
    <>
      {/* 리뷰 */}
      <div className="wrap">
        <div className="review mb-5">
          <div className="flex items-center gap-[5px] mb-5">
            <span className="material-icons">edit_calendar</span>
            <h4>{review?.r_title ?? '의사 선생님이 친절한 곳!!'}</h4>
          </div>
          <div className="imgWithReviewEval mb-5">
            <img
              src="https://ocnuykfvdtebmondqppu.supabase.co/storage/v1/object/public/images/TESTIMG.png"
              alt=""
              className="mb-[11px] "
            />
            {/*  별 개수 계산 및 조회수  */}
            <div className="reviewEvaluation flex justify-between">
              <div className="stars flex flex-row text-point items-center">
                <span className="mr-1">{review?.r_eval_pt ?? '4.4'}</span>
                <div className="flex flex-row text-point items-center">
                  {Array.from({ length: 5 }).map((_, i) => {
                    if (review?.r_eval_pt >= i + 1)
                      return (
                        <span key={i} className="material-icons">
                          star
                        </span>
                      );
                    if (review?.r_eval_pt > i && review?.r_eval_pt < i + 1)
                      return (
                        <span key={i} className="material-icons">
                          star_half
                        </span>
                      );
                    return (
                      <span key={i} className="material-icons">
                        star_outline
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="dummy text-black">조회수 : {review?.r_views ?? '0'}</div>
            </div>
          </div>
          <div className="dummy md:text-base!">{review?.r_content || '리뷰가 없습니다.'}</div>
          <div className="count flex gap-4 justify-end mt-7">
            <div className="like flex gap-2 items-center">
              <span
                className="material-icons cursor-pointer text-point-hov"
                onClick={() => (like ? likeUnclicked() : likeClicked())}
              >
                {like ? 'favorite' : 'favorite_border'}
              </span>
              <span className="dummy w-1">{likeCount || '0'}</span>
            </div>
            <div className="comment flex gap-2 items-center">
              <span className="material-icons">chat_bubble_outline</span>
              <span className="dummy">{commentCount || '0'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 댓글 */}
      <Comment reviewId={reviewId} countFn={setCommentCount} />
    </>
  );
};

export default DentistReviewView;

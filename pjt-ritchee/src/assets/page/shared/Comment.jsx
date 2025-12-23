import React, { useEffect, useState } from 'react';
import Button from '../../../componetns/Button';
import moment from 'moment';
import { useUser } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { createComment, getCommentsByReviewId } from '../../../api/ReviewAndCommentApi';

const Comment = ({ reviewId, countFn }) => {
  const { user } = useUser();
  const nav = useNavigate();
  const [comment, setComment] = useState();
  const [formData, setFormData] = useState(''); // 댓글 입력 track state
  const commentFetch = async () => {
    try {
      const data = await getCommentsByReviewId(reviewId);
      console.log(data);
      setComment({
        comments: data.comments,
      });
      countFn(data.commentCount || 0);
    } catch (error) {
      console.error('Comment Fetch error', error);
      setComment({
        comments: [],
      });
      countFn(0);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // 로그인 체크
    if (!user || !user.id) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (formData.trim() == '') {
      alert('댓글을 작성해 주세요.');
      return;
    }

    try {
      await createComment({
        reviewId: +reviewId,
        content: formData,
        userId: user?.id,
      });

      setFormData('');
      alert('댓글이 작성되었습니다.');
      await commentFetch();
    } catch (error) {
      console.error('에러 발생!!', error.message);
      setFormData('');
      return;
    }
  };

  useEffect(() => {
    commentFetch();
  }, [reviewId]);

  return (
    <ul className="comments">
      {comment?.comments.length > 0 ? (
        comment?.comments?.map((c, i) => (
          <li
            className={`myBg bg-light-02 border border-x-0 ${
              i == 0 ? 'border-y-main-01' : 'border-b-main-01 border-t-0'
            }`}
            key={i}
          >
            <div className="comment dummy md:text-base! py-3.5! container">
              <div className="commentContent mb-5">{c.c_content || '댓글 없음'}</div>
              <div className="commentEtc text-gray-deep flex justify-between">
                <div className="commentWriter">작성자 : {c?.name || '작성자 없음'}</div>
                <div className="date">
                  {c?.createdAt ? moment(c.createdAt).format('YYYY-MM-DD HH:mm:ss') : '2025-02-11 14:25:41'}
                </div>
              </div>
            </div>
          </li>
        ))
      ) : (
        <p className="w-full text-center text-gray-500 pt-10 py-5 myBg bg-light-02">작성된 댓글이 없습니다.</p>
      )}

      {/* 댓글 작성 */}
      <li className="myBg bg-light-02 border border-b-main-01 border-t-0 border-x-0">
        <form className="comment dummy md:text-base! py-3.5! container" onSubmit={submitHandler}>
          <textarea
            id="comment"
            name="comment"
            rows="4"
            placeholder="댓글을 작성해 주세요"
            className="outline-none placeholder-gray-mid rounded-sm text-[12px] md:text-base! bg-white w-full py-2.5 pl-3 pr-2 border border-main-01 focus:border-main-02"
            onChange={(e) => setFormData(e.target.value)}
            value={formData}
            style={{ resize: 'none' }}
          ></textarea>
          <Button className={'mt-5 mb-2.5 cursor-pointer'} type="submit">
            댓글 작성
          </Button>
        </form>
      </li>
    </ul>
  );
};

export default Comment;

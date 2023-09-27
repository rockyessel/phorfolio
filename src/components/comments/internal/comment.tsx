import React from 'react';
import CommentCard from '../card';
import { CommentProps } from '@/interface';
import CreateCommentInput from '../create-input';

interface Props {
  commentHistory: CommentProps[];
  id: string;
}

const MainComment = (props: Props) => {
  return (
    <div>
      <section className='bg-white antialiased p-4'>
        <div className=''>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-lg lg:text-2xl font-bold text-rose-900'>
              Comments ({props.commentHistory?.length})
            </h2>
          </div>
          <CreateCommentInput
            type='create'
            id={props.id}
            parentCommentId={undefined}
            style={undefined}
          />

          {props.commentHistory?.map((comment, index) => (
            <CommentCard key={index} comment={comment} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainComment;

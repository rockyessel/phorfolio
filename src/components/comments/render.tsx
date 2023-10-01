import React from 'react';
import { CommentProps } from '@/interface';
import MainComment from './internal/comment';
import DisqusCommentsEngine from './external/disqus';

interface Props {
  id: string;
  systemType: string;
  commentHistory: CommentProps[];
}

const CommentSystemRender = (props: Props) => {
  switch (props.systemType) {
    case 'Internal':
      return (
        <MainComment
          id={props.id}
          commentHistory={props.commentHistory}
        />
      );
    default:
      return <DisqusCommentsEngine />;
  }
};

export default CommentSystemRender;

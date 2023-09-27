import React from 'react';
import CommentSystemRender from './render';
import { CommentProps } from '@/interface';
import CommentSystemSelector from './selector';

interface Props {
  commentHistory: CommentProps[];
  id: string;
}

const CommentEngineWrapper = (props: Props) => {
  const [commentSystem, setCommentSystem] = React.useState('Internal');
  return (
    <section>
      <CommentSystemSelector setCommentSystem={setCommentSystem} />
      <CommentSystemRender
        id={props.id}
        commentHistory={props.commentHistory}
        systemType={commentSystem}
      />
    </section>
  );
};

export default CommentEngineWrapper;

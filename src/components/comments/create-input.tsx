import React from 'react';
import { useRouter } from 'next/router';
import { IdGen } from '@/utils/helpers';
import { useSession } from 'next-auth/react';
import { CommentProps, User } from '@/interface';
import { createComment, createReply } from '@/utils/outerbase-req/comment';

interface Props {
  type: string;
  id: string;
  style: string | undefined;
  parentCommentId: string | undefined;
}

const CreateCommentInput = (props: Props) => {
  const [commentContent, setCommentContent] = React.useState('');
  const router = useRouter();
  const isProjectPath = router.asPath.includes('projects') ? props.id : '';
  const isArticlePath = router.asPath.includes('articles') ? props.id : '';

  const { data: session } = useSession();
  const user = { ...session?.user } as User;

  const handleSubmission = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      let obj: CommentProps;
      obj = {
        reply_id: '',
        comment_id: '',
        article_id: '',
        project_id: '',
        user_id: user.id,
        content: commentContent,
        parent_comment_id: '',
        created_at: new Date().toISOString(),
      };
      if (props.type === 'create') {
        obj.comment_id = IdGen('COMMENT');
        obj.article_id = isArticlePath;
        obj.project_id = isProjectPath;
        await createComment(obj);
      }
      if (props.type === 'reply') {
        obj.reply_id = IdGen('REPLY');
        obj.parent_comment_id = props.parentCommentId;
        obj.article_id = isArticlePath;
        obj.project_id = isProjectPath;
        await createReply(obj);
      }
      router.replace(router.asPath);
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmission} className='mt-1 w-full mb-6'>
      <div className={`py-2 px-4 mb-2 ${props.style ? props.style : ''}`}>
        <label className='sr-only'>Your comment</label>
        <textarea
          id='comment'
          className='w-full py-2.5 h-20 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 px-2 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
          placeholder='Write a comment...'
          required
          value={commentContent}
          onChange={(event) => setCommentContent(event.target.value)}
        ></textarea>
      </div>
      <button
        title='Post Comment'
        type='submit'
        className='inline-flex m-5 items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
      >
        Post Comment
      </button>
    </form>
  );
};

export default CreateCommentInput;

import { CommentProps } from '@/interface';
import axios from 'axios';

const baseURL = 'https://minimum-aqua.cmd.outerbase.io';

export const createComment = async (comment: any) => {
  const { data } = await axios.post(`${baseURL}/comments/create`, {
    ...comment,
  });
  if (data.success) return data.success;
};

export const createReply = async (reply: any) => {
  const { data } = await axios.post(`${baseURL}/comments/replies`, {
    ...reply,
  });
  if (data.success) return data.success;
};

export const getReplies = async () => {
  const { data } = await axios.get(`${baseURL}/comments/article-replies`);
  if (data.success) return data.response.items;
  return [];
};

export const getComments = async () => {
  const { data } = await axios.get(`${baseURL}/comments/all/only`);
  if (data.success) return data.response.items;
  return [];
};

export const getFormatCommentsAndReplies = async (id: string, type: string) => {
  const replies: Reply[] = await getReplies();
  const comments: Comment[] = await getComments();

  console.log('replies: ', replies);
  console.log('comments: ', comments);

  interface Comment {
    comment_id: string;
    reply_id: string | '';
    user_id: string;
    content: string;
    article_id: string;
    project_id: string;
    parent_comment_id?: string | '';
    created_at: string;
  }

  interface Reply {
    comment_id: string;
    reply_id: string | '';
    user_id: string;
    content: string;
    article_id: string;
    project_id: string;
    parent_comment_id?: string | '';
    created_at: string;
  }

  if (comments && replies) {
    const structuredData = comments.map((comment) => ({
      comment_id: comment.comment_id,
      article_id: comment.article_id,
      project_id: comment.project_id,
      user_id: comment.user_id,
      content: comment.content,
      parent_comment_id: comment.parent_comment_id,
      created_at: comment.created_at,
      replies: replies
        .filter((reply) => reply.parent_comment_id === comment.comment_id)
        .map((reply) => ({
          reply_id: reply.reply_id,
          article_id: reply.article_id,
          project_id: comment.project_id,
          user_id: reply.user_id,
          content: reply.content,
          parent_comment_id: reply.parent_comment_id,
          created_at: reply.created_at,
        }))
        .sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateA.getTime() - dateB.getTime();
        }), // Sort replies by created_at
    }));

    if (type === 'projects') {
      // Filter structured data to include only comments and replies associated with the specified article ID
      const filteredData = structuredData.filter(
        (item) => item.project_id === id
      );

      // Sort comments by created_at
      filteredData.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateA.getTime() - dateB.getTime();
      });

      if (filteredData.length > 0) {
        return filteredData as CommentProps[];
      }

      return [];
    } else {
      // Filter structured data to include only comments and replies associated with the specified article ID
      const filteredData = structuredData.filter(
        (item) => item.article_id === id
      );

      // Sort comments by created_at
      filteredData.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateA.getTime() - dateB.getTime();
      });

      if (filteredData.length > 0) {
        return filteredData as CommentProps[];
      }

      return [];
    }
  }
};

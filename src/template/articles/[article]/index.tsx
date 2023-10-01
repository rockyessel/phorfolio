import React from 'react';
import ArticleHeader from '@/components/articles/header';
import CommentEngineWrapper from '@/components/comments/wrapper';
import ArticleDetailedCard from '@/components/articles/detailed-card';
import {
  increaseArticleViewCount,
  updateCommentOnLoad,
} from '@/utils/outerbase-req/articles';
import { ArticleItem, CommentProps } from '@/interface';

interface Props {
  article: ArticleItem;
  comments: CommentProps[];
}

const ArticleDetailedPage = (props: Props) => {
  const [hasIncremented, setHasIncremented] = React.useState<boolean>(false);

  // Update the comment count after a comment is made.
  React.useEffect(() => {
    updateCommentOnLoad(props.article.id)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, [props.article.id]);

  // Increase view count after the users spends 5 seconds on the article
  React.useEffect(() => {
    if (!hasIncremented) {
      const time = setTimeout(() => {
        if (props.article) {
          increaseArticleViewCount(props.article.id)
            .then(() => {
              setHasIncremented(true);
            })
            .catch((error) => console.error(error));
        }
      }, 5000);

      return () => clearTimeout(time);
    }
  }, [hasIncremented, props.article]);

  return (
    <main className=' px-4 lg:px-14 xl:px-20 2xl:px-40 py-2 '>
      <ArticleHeader data={props.article} />
      <ArticleDetailedCard data={props.article} />
      {props.comments && props.article.is_comment_disabled === true ? (
        <p>The author disabled comment for this post.</p>
      ) : (
        <CommentEngineWrapper
          id={props.article?.id}
          commentHistory={props.comments}
        />
      )}
    </main>
  );
};

export default ArticleDetailedPage;

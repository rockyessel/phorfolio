import React from 'react';
import ArticleHeader from '@/components/articles/header';
import CommentEngineWrapper from '@/components/comments/wrapper';
import ArticleDetailedCard from '@/components/articles/detailed-card';
import {
  increaseArticleViewCount,
  updateCommentOnLoad,
} from '@/utils/outerbase-req/articles';
import { ArticleItem, CommentProps, User } from '@/interface';
import TemplateLayout from '@/components/template/layout';
import { getUserById } from '@/utils/outerbase-req/users';

interface Props {
  article: ArticleItem;
  comments: CommentProps[];
}

const ArticleDetailedPage = (props: Props) => {
  const [hasIncremented, setHasIncremented] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    if (props.article.user_id) {
      getUserById(props.article.user_id).then((user) => setUser(user));
    }
  }, [props.article.user_id]);

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
    <TemplateLayout
      description={props.article.description}
      title={props.article.title}
      image={props.article.image}
      type={'Article'}
      alt={props.article.title}
      keywords={props.article.keywords}
      publishedAt={props.article.published_datetime}
      updatedAt={new Date().toISOString()}
      MIME={`${props.article.image.split('.').pop()}`}
      author_name={`${user?.name}`}
    >
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
    </TemplateLayout>
  );
};

export default ArticleDetailedPage;

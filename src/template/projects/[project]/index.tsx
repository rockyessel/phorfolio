import React from 'react';
import ProjectDetailsCard from '@/components/projects/detailed-card';
import CommentEngineWrapper from '@/components/comments/wrapper';
import { CommentProps, ProjectItem, User } from '@/interface';
import { updateCommentOnLoad } from '@/utils/outerbase-req/articles';
import { increaseProjectViewCount } from '@/utils/outerbase-req/projects';
import TemplateLayout from '@/components/template/layout';
import { getUserById } from '@/utils/outerbase-req/users';

interface Props {
  project: ProjectItem;
  comments: CommentProps[];
}

const ProjectDetailedPage = (props: Props) => {
  const [hasIncremented, setHasIncremented] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    if (props.project.user_id) {
      getUserById(props.project.user_id).then((user) => setUser(user));
    }
  }, [props.project.user_id]);

  // Update the comment count after a comment is made.
  React.useEffect(() => {
    updateCommentOnLoad(props.project.id)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, [props.project.id]);

  // Increase view count after the users spends 5 seconds on the project
  React.useEffect(() => {
    if (!hasIncremented) {
      const time = setTimeout(() => {
        if (props.project) {
          increaseProjectViewCount(props.project.id)
            .then(() => {
              setHasIncremented(true);
            })
            .catch((error) => console.error(error));
        }
      }, 5000);
      return () => clearTimeout(time);
    }
  }, [hasIncremented, props.project]);

  return (
    <TemplateLayout
      description={props.project.description}
      title={props.project.title}
      image={`${props.project.images.split(',').pop()}`}
      type={'Projects'}
      alt={props.project.title}
      keywords={props.project.keywords}
      publishedAt={props.project.published_datetime}
      updatedAt={new Date().toISOString()}
      MIME={`${props.project.images.split(',').pop()}`}
      author_name={`${user?.name}`}
    >
      <ProjectDetailsCard data={props.project} />
      {props.comments && props.project.is_comment_disabled === true ? (
        <p>The author disabled comment for this post.</p>
      ) : (
        <CommentEngineWrapper
          id={props.project?.id}
          commentHistory={props.comments}
        />
      )}
    </TemplateLayout>
  );
};

export default ProjectDetailedPage;

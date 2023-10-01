import React from 'react';
import ProjectDetailsCard from '@/components/projects/detailed-card';
import CommentEngineWrapper from '@/components/comments/wrapper';
import { CommentProps, ProjectItem } from '@/interface';
import { updateCommentOnLoad } from '@/utils/outerbase-req/articles';
import { increaseProjectViewCount } from '@/utils/outerbase-req/projects';

interface Props {
  project: ProjectItem;
  comments: CommentProps[];
}

const ProjectDetailedPage = (props: Props) => {
  const [hasIncremented, setHasIncremented] = React.useState<boolean>(false);

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
    <main className='px-4 lg:px-14 xl:px-20 2xl:px-40 py-2  mt-5 md:mt-28'>
      <ProjectDetailsCard data={props.project} />
      {props.comments && props.project.is_comment_disabled === true ? (
        <p>The author disabled comment for this post.</p>
      ) : (
        <CommentEngineWrapper
          id={props.project?.id}
          commentHistory={props.comments}
        />
      )}
    </main>
  );
};

export default ProjectDetailedPage;
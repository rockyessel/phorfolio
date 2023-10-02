import React from 'react';
import { OutputData } from '@editorjs/editorjs';
import EditorOutput from '@/components/EditorOutput';
import TemplateLayout from '@/components/template/layout';
import { findUserByUsername } from '@/utils/outerbase-req/users';
import useSubdomain from '@/hooks/subdomain';
import { User } from '@/interface';

interface Props {
  resumeData: OutputData;
}

const ResumePageTemp = (props: Props) => {
  const [user, setUser] = React.useState<User>();
  const subdomain = useSubdomain(0);

  React.useEffect(() => {
    if (subdomain) {
      findUserByUsername(subdomain).then((user) => setUser(user));
    }
  }, [subdomain]);

  return (
    <TemplateLayout
      description={''}
      title={`${user?.name}'s Articles`}
      image={`${user && user.image}`}
      type={`Articles - ${user?.name}`}
      alt={`${user?.username}`}
      keywords={''}
      publishedAt={new Date().toISOString()}
      updatedAt={new Date().toISOString()}
      MIME={`${user && user.image.split('.').pop()}`}
      author_name={`${user?.name}`}
    >
      <EditorOutput content={props?.resumeData} />
    </TemplateLayout>
  );
};

export default ResumePageTemp;

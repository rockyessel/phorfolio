import React from 'react';
import { ProjectItem } from '@/interface';
import { OutputData } from '@editorjs/editorjs';
import DashboardDisplay from '../articles/create';
import ProjectMetadata from '../projects/metadata';
import serializeJavascript from 'serialize-javascript';
import { initProjectValue } from '@/utils/constants/projects';
import { getProjectBySlug, updateProject } from '@/utils/outerbase-req/projects';
import { decodeBase64ToObject, deserialize, encodeObjectToBase64, getTextFromEditorContent } from '@/utils/helpers';

interface Props {
  e: string;
  slug: string;
}

const EditProjectPage = (props: Props) => {
  const [editContent, setEditContent] = React.useState<OutputData>();
  const [showMetaDataDrawer, setShowMetaDataDrawer] = React.useState<boolean>(false);
  const [projectContent, setProjectContent] = React.useState<OutputData>();
  const [totalCharacters, setTotalCharacters] = React.useState<number>(0);
  const [totalWords, setTotalWords] = React.useState<number>(0);
  const [projectMetaData, setProjectMetaData] = React.useState<ProjectItem>(initProjectValue);

  const handleReset = () => setProjectMetaData(initProjectValue);

  const handleSubmission = async (type: string) => {
    if (projectContent && projectMetaData) {
      const serializedArticleContent = serializeJavascript(projectContent);
      projectMetaData.content = encodeObjectToBase64(serializedArticleContent);
    }

    const isContentAdded = projectMetaData.content.length > 10; // Denoting that content is not empty.;

    switch (type) {
      case 'draft':
        projectMetaData.is_published = false;
        if (isContentAdded) updateProject(projectMetaData, projectMetaData.id);
        break;
      case 'publish':
        projectMetaData.is_published = true;
        if (isContentAdded) updateProject(projectMetaData, projectMetaData.id);
        break;

      default:
        break;
    }
  };
  const table = `public.${props.e}`;
  React.useEffect(() => {
    getProjectBySlug(`${props.slug}`).then((content) => {
      if (content) {
        const editContentData = content as any;
        setProjectMetaData(content);
        const encodedContent = editContentData.content;
        const decodedContent = decodeBase64ToObject(encodedContent);
        const deserializeContent: OutputData = deserialize(decodedContent);
        setEditContent(deserializeContent);
      }
    });
  }, [props.slug, table]);

  const handleMetadataChange = (event: | React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const formUpdates = {
      ...projectMetaData,
      [event.target.name]: event.target.value,
    };
    setProjectMetaData(formUpdates);
  };

  React.useEffect(() => {
    const plainText = getTextFromEditorContent(projectContent);
    setTotalCharacters(plainText.length);
    setTotalWords(plainText.split(' ').length);
  }, [projectContent, props.slug, table]);

  React.useEffect(() => {});
  return (
    <main className='relative w-full h-screen overflow-y-auto flex flex-col'>
      <DashboardDisplay
        oldContent={editContent}
        modalWrapperButtonName=''
        draftButtonTitle='Saves as Draft'
        postButtonTitle='Publish Update'
        textEditorContent={projectContent}
        setTextEditorContent={setProjectContent}
        handleSubmission={handleSubmission}
        totalCharacters={totalCharacters}
        totalWords={totalWords}
        showMetadataDrawer={showMetaDataDrawer}
      >
        <ProjectMetadata
          handleMetadataChange={handleMetadataChange}
          stateValue={projectMetaData}
          setStateValue={setProjectMetaData}
          setShowMetaDataDrawer={setShowMetaDataDrawer}
          showMetaDataDrawer={showMetaDataDrawer}
          handleReset={handleReset}
        />
      </DashboardDisplay>
    </main>
  );
};

export default EditProjectPage;

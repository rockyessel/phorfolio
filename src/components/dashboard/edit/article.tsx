import MetaDataDrawer from '@/components/dashboard/global/metadata-drawer';
import { ArticleItem } from '@/interface';
import { OutputData } from '@editorjs/editorjs';
import React from 'react';
import serializeJavascript from 'serialize-javascript';
import DashboardDisplay from '../articles/create';
import { initArticleValue } from '@/utils/constants/articles';
import { decodeBase64ToObject, deserialize, encodeObjectToBase64, getTextFromEditorContent } from '@/utils/helpers';
import { getArticleBySlug, updateArticle } from '@/utils/outerbase-req/articles';

interface Props {
  e: string;
  slug: string;
}

const EditArticlePage = (props: Props) => {
  const [editContent, setEditContent] = React.useState<OutputData>();
  const [showMetaDataDrawer, setShowMetaDataDrawer] = React.useState<boolean>(false);
  const [articleContent, setArticleContent] = React.useState<OutputData>();
  const [totalCharacters, setTotalCharacters] = React.useState<number>(0);
  const [totalWords, setTotalWords] = React.useState<number>(0);
  const [articleMetaData, setArticleMetaData] = React.useState<ArticleItem>(initArticleValue);


  const handleReset = () => setArticleMetaData(initArticleValue);

  const handleSubmission = async (type: string) => {
    if (articleContent && articleMetaData) {
      const serializedArticleContent = serializeJavascript(articleContent);
      articleMetaData.content = encodeObjectToBase64(serializedArticleContent);
    }

    const isContentAdded = articleMetaData.content.length > 10; // Denoting that content is not empty.; Because no one in the right mind will write obj characters

    switch (type) {
      case 'draft':
        articleMetaData.is_published = false;
        if (isContentAdded) updateArticle(articleMetaData, articleMetaData.id);
        console.log('handleSubmission articleMetaData', handleSubmission);
        break;
      case 'publish':
        articleMetaData.is_published = true;
        console.log('handleSubmission articleMetaData', articleMetaData);
        if (isContentAdded) updateArticle(articleMetaData, articleMetaData.id);
        break;

      default:
        break;
    }
  };
  console.log('editContent', editContent);
  const table = `public.${props.e}`;
  React.useEffect(() => {
    getArticleBySlug( `${props.slug}`).then((content) => {
      if (content) {
        console.log('content content', content);
        const editContentData = content as any;
        setArticleMetaData(content);
        const encodedContent = editContentData.content;
        const decodedContent = decodeBase64ToObject(encodedContent);
        const deserializeContent: OutputData = deserialize(decodedContent);
        setEditContent(deserializeContent);
      }
    });
  }, [props.slug, table]);

  const handleMetadataChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const formUpdates = {
      ...articleMetaData,
      [event.target.name]: event.target.value,
    };
    setArticleMetaData(formUpdates);
  };

  React.useEffect(() => {
    const plainText = getTextFromEditorContent(articleContent);
    setTotalCharacters(plainText.length);
    setTotalWords(plainText.split(' ').length);
  }, [articleContent, props.slug, table]);

  React.useEffect(() => {});
  return (
    <main className='relative w-full h-screen overflow-y-auto flex flex-col'>
      <DashboardDisplay
        oldContent={editContent}
        modalWrapperButtonName=''
        draftButtonTitle='Saves as Draft'
        postButtonTitle='Publish Update'
        textEditorContent={articleContent}
        setTextEditorContent={setArticleContent}
        handleSubmission={handleSubmission}
        totalCharacters={totalCharacters}
        totalWords={totalWords}
        showMetadataDrawer={showMetaDataDrawer}
      >
        <MetaDataDrawer
          handleMetadataChange={handleMetadataChange}
          stateValue={articleMetaData}
          setStateValue={setArticleMetaData}
          setShowMetaDataDrawer={setShowMetaDataDrawer}
          showMetaDataDrawer={showMetaDataDrawer}
          handleReset={handleReset}
        />
      </DashboardDisplay>
    </main>
  );
};

export default EditArticlePage;

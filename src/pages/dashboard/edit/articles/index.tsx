import React from 'react';
import { ArticleItem } from '@/interface';
import { OutputData } from '@editorjs/editorjs';
import serializeJavascript from 'serialize-javascript';
import { initArticleValue } from '@/utils/constants/articles';
import MetaDataDrawer from '@/components/dashboard/articles/metadata-drawer';
import {
  getArticleBySlug,
  updateArticle,
} from '@/utils/outerbase-req/articles';
import {
  decodeBase64ToObject,
  deserialize,
  encodeObjectToBase64,
  getTextFromEditorContent,
} from '@/utils/helpers';
import DashboardDisplay from '@/components/dashboard/articles/create';
import { useRouter } from 'next/router';

const EditArticlePage = () => {
  const [editContent, setEditContent] = React.useState<OutputData>();
  const [showMetaDataDrawer, setShowMetaDataDrawer] =
    React.useState<boolean>(false);
  const [articleContent, setArticleContent] = React.useState<OutputData>();
  const [totalCharacters, setTotalCharacters] = React.useState<number>(0);
  const [totalWords, setTotalWords] = React.useState<number>(0);
  const [articleMetaData, setArticleMetaData] =
    React.useState<ArticleItem>(initArticleValue);

  const handleReset = () => setArticleMetaData(initArticleValue);

  const handleSubmission = async (type: string) => {
    if (articleContent && articleMetaData) {
      const serializedArticleContent = serializeJavascript(articleContent);
      articleMetaData.content = encodeObjectToBase64(serializedArticleContent);
    }

    const isContentAdded = articleMetaData.content.length > 10; // Denoting that content is not empty.; Because no one in their..

    switch (type) {
      case 'draft':
        articleMetaData.is_published = false;
        if (isContentAdded) updateArticle(articleMetaData, articleMetaData.id);
        break;
      case 'publish':
        articleMetaData.is_published = true;
        if (isContentAdded) updateArticle(articleMetaData, articleMetaData.id);
        break;

      default:
        break;
    }
  };

  const router = useRouter();
  const { slug } = router.query;

  const table = `public.articles`;
  React.useEffect(() => {
    if (slug) {
      getArticleBySlug(slug as string).then((content) => {
        if (content) {
          const editContentData = content as any;
          setArticleMetaData(content);
          const encodedContent = editContentData.content;
          const decodedContent = decodeBase64ToObject(encodedContent);
          const deserializeContent: OutputData = deserialize(decodedContent);
          setEditContent(deserializeContent);
        }
      });
    }
  }, [slug, table]);

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
  }, [articleContent, slug, table]);

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

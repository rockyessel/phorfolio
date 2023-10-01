import DashboardLayout from '@/components/dashboard/layout';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { ProjectItem, ProjectResponse, User } from '@/interface';
import { OutputData } from '@editorjs/editorjs';
import serialize from 'serialize-javascript';
import DashboardDisplay from '@/components/dashboard/articles/create';
import ViewButtons from '@/components/dashboard/articles/view-button';
import ItemsHeader from '@/components/dashboard/articles/items-header';
import PaginateButton from '@/components/dashboard/articles/paginate-button';
import CurrentPageInfo from '@/components/dashboard/articles/current-page';
import { articleTableHeaders } from '@/utils/constants/articles';
import {
  createProject,
  getUserProjectTotalPageNumber,
  getUsersProjects,
} from '@/utils/outerbase-req/projects';
import { initProjectValue } from '@/utils/constants/projects';
import ProjectTable from '@/components/dashboard/projects/table';
import ProjectMetadata from '@/components/dashboard/projects/metadata';
import { generateTextToAudioURL } from '@/utils/req';
import {
  IdGen,
  encodeObjectToBase64,
  getTextFromEditorContent,
} from '@/utils/helpers';
import { useSession } from 'next-auth/react';

const DashboardProject = () => {
  const [view, setView] = React.useState('all');
  const [showMetaDataDrawer, setShowMetaDataDrawer] =
    React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(true);
  const [totalPages, setTotalPages] = React.useState<number>();
  const [activePage, setActivePage] = React.useState<number>(0);
  const [pageNumLimit, setPageNumLimit] = React.useState(1);
  const [projects, setProjects] = React.useState<ProjectResponse>();
  const [projectMetaData, setProjectMetaData] =
    React.useState<ProjectItem>(initProjectValue);
  const [projectContent, setProjectContent] = React.useState<OutputData>();
  const [totalCharacters, setTotalCharacters] = React.useState<number>(0);
  const [totalWords, setTotalWords] = React.useState<number>(0);
  const [plainText, setPlainText] = React.useState<string>('');
  const { data: session } = useSession();

  const user = { ...session?.user } as User;
  React.useEffect(() => {
    if (user.id) {
      getUserProjectTotalPageNumber(user.id).then((totalPageNum) =>
        setTotalPages(totalPageNum)
      );
    }
  },[user.id]);

  React.useEffect(() => {
    if (user.id)
      getUsersProjects(user.id, activePage).then((projects) => {
        setProjects(projects);
        setLoading(false);
      });
  }, [activePage, user.id]);

  const handleReset = () => setProjectMetaData(initProjectValue);

  console.log('projectMetaData: ', projectMetaData);

  const handleSubmission = async (type: string) => {
    const audio = await generateTextToAudioURL(plainText);
    if (audio !== '' && projectContent && projectMetaData) {
      const serializedArticleContent = serialize(projectContent);
      projectMetaData.content = encodeObjectToBase64(serializedArticleContent);
    }
    const wordsPerMinute = 200;
    const totalReadingMinutes = Math.ceil(totalWords / wordsPerMinute);
    projectMetaData.word_count = totalWords;
    projectMetaData.character_count = totalCharacters;
    projectMetaData.reading_minutes = totalReadingMinutes;
    projectMetaData.id = IdGen('PROJECT');
    projectMetaData.audio_url = audio;
    projectMetaData.published_datetime = new Date().toISOString();
    projectMetaData.user_id = user.id;

    // Make sure there's no empty string inn projectContent
    const isContentAdded = projectMetaData.content.length > 10; // Denoting that content is not empty.;

    switch (type) {
      case 'draft':
        if (isContentAdded) createProject(projectMetaData);
        console.log('projectMetaData', projectMetaData);
        break;
      case 'publish':
        projectMetaData.is_published = true;
        console.log('projectMetaData', projectMetaData);
        if (isContentAdded) createProject(projectMetaData);
        break;
      default:
        console.log('article handleSubmission invalid type.');
        break;
    }
  };

  const handlePagination = (type: 'next' | 'previous') => {
    if (type === 'next' && pageNumLimit < totalPages!) {
      setActivePage((prevActivePage) => prevActivePage + 10);
      setPageNumLimit((prevPageNumLimit) => prevPageNumLimit + 1);
    } else if (type === 'previous' && pageNumLimit > 1) {
      setActivePage((prevActivePage) => prevActivePage - 10);
      setPageNumLimit((prevPageNumLimit) => prevPageNumLimit - 1);
    }
  };

  const handleMetadataChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const formUpdates = {
      ...projectMetaData,
      [event.target.name]: event.target.value,
    };
    setProjectMetaData(formUpdates);
  };

  React.useEffect(() => {
    setPlainText(getTextFromEditorContent(projectContent));
    setTotalCharacters(plainText.length);
    setTotalWords(plainText.split(' ').length);
  }, [projectContent, plainText]);

  const allItems = projects?.response?.items;
  let filteredItems: ProjectItem[] | undefined = [];

  if (view === 'published') {
    filteredItems = allItems!.filter((item) => item.is_published === true);
  } else if (view === 'unpublished') {
    filteredItems = allItems?.filter((item) => item.is_published === false);
  } else {
    filteredItems = allItems;
  }

  return (
    <DashboardLayout>
      <section className='container px-4 mx-auto'>
        {/* Header section */}
        <div className='sm:flex sm:items-center sm:justify-between'>
          <ItemsHeader
            title='Projects'
            totalItemLength={filteredItems?.length}
          />

          <DashboardDisplay
            oldContent={undefined}
            modalWrapperButtonName='Add a Project'
            draftButtonTitle='Saves as Draft'
            postButtonTitle='Publish Project'
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
        </div>
        {/* DashboardFilterButtons & Search */}
        <div className='w-full mt-6 md:flex flex-wrap md:items-center md:justify-between'>
          <ViewButtons
            filteredItems={filteredItems}
            setView={setView}
            view={view}
          />
          <div className='relative flex items-center mt-4 md:mt-0'>
            <span className='absolute'>
              <AiOutlineSearch className='w-5 h-5 mx-3 text-gray-400' />
            </span>
            <input
              type='text'
              placeholder='Search'
              className='block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </div>
        </div>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 md:px-6 lg:px-8'>
          <ProjectTable
            headers={articleTableHeaders}
            loading={loading}
            data={filteredItems}
          />
        </div>
        {/* DashboardFooter */}
        <div className='mt-6 sm:flex sm:items-center sm:justify-between '>
          <CurrentPageInfo
            currentPageNumber={activePage / 10 + 1}
            totalPagerNumber={totalPages}
          />
          <PaginateButton
            handlePagination={handlePagination}
            pageNumberLimit={pageNumLimit}
            totalPageNumber={totalPages || 1}
          />
        </div>
      </section>
    </DashboardLayout>
  );
};

export default DashboardProject;

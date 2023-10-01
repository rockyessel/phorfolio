import React from 'react';
import { AboutMe, User } from '@/interface';
import DashboardLayout from '@/components/dashboard/layout';
import GithubGraph from '@/components/dashboard/pages/about/github-graph';
import FeatureLists from '@/components/dashboard/pages/about/feature-lists';
import AboutDeveloper from '@/components/dashboard/pages/about/about-developer';
import { developerToolsAndTech, initialAboutMe } from '@/utils/constants/about';
import SocialPlatforms from '@/components/dashboard/pages/about/social-platforms';
import WritingPlatforms from '@/components/dashboard/pages/about/writing-platform';
import AboutProfile from '@/components/dashboard/pages/about/about-profile-upload';
import ProgrammingLanguageDropdown from '@/components/dashboard/pages/about/programming-lan';
import ModalWrapper from '@/components/dashboard/modal-wrapper';
import TextEditor from '@/components/dashboard/global/text-editor';
import { OutputData } from '@editorjs/editorjs';
import {
  IdGen,
  decodeBase64ToObject,
  deserialize,
  encodeObjectToBase64,
} from '@/utils/helpers';
import { useSession } from 'next-auth/react';
import serializeJavascript from 'serialize-javascript';
import {
  createAboutMe,
  getAboutMeByUserId,
  isAboutMeAlreadyCreated,
  updateAboutMe,
} from '@/utils/outerbase-req/about';
import { useRouter } from 'next/router';

const DashboardAboutPage = () => {
  const [aboutMeForm, setAboutMeForm] = React.useState<AboutMe>(initialAboutMe);
  const [aboutMeContent, setAboutMeContent] = React.useState<OutputData>();
  const [isAboutMeCreated, setIsAboutMeCreated] = React.useState(false);
  const [showMore, setShowMore] = React.useState(false);
  const [oldContent, setOldContent] = React.useState<OutputData>();

  const { data: session } = useSession();
  const user = { ...session?.user } as User;
  const router = useRouter();

  console.log('aboutMeContent: ', aboutMeContent);

  React.useEffect(() => {
    if (user.id) {
      isAboutMeAlreadyCreated(user.id).then((bool) =>
        setIsAboutMeCreated(bool)
      );
    }
  }, [user.id, router]);

  React.useEffect(() => {
    if (user.id && isAboutMeCreated) {
      getAboutMeByUserId(user.id).then((about_content) => {
        setAboutMeForm(about_content);
        console.log('about_content: ', about_content);
        const editContentData = about_content?.content as any;
        const decodedContent = decodeBase64ToObject(editContentData);
        const deserializeContent: OutputData = deserialize(decodedContent);
        setOldContent(deserializeContent);
      });
    }
  }, [isAboutMeCreated, user.id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    if (target.type === 'checkbox') {
      setAboutMeForm((preAboutMe) => ({
        ...preAboutMe,
        [target.name]: target.checked,
      }));
      console.log('checkbox');
    } else {
      setAboutMeForm((preAboutMe) => ({
        ...preAboutMe,
        [target.name]: target.value,
      }));
    }
  };

  const handleSubmission = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    
    if (isAboutMeCreated) {
      await updateAboutMe(aboutMeForm);
    } else {
      aboutMeForm.id = IdGen('ABOUT');
      aboutMeForm.user_id = user.id;
      const serializedArticleContent = serializeJavascript(aboutMeContent);
      aboutMeForm.content = encodeObjectToBase64(serializedArticleContent);
      await createAboutMe(aboutMeForm);
    }
  };

  return (
    <DashboardLayout>
      <section className='col-span-8 overflow-hidden rounded-xl sm:px-8 sm:shadow pb-10'>
        {/* Title */}
        <div className='w-full pt-4 inline-flex items-center justify-between'>
          <h1 className='py-2 text-2xl font-semibold'>About Page</h1>

          {/* TextEditor */}
          <div className='flex items-center mt-4 gap-x-3'>
            <ModalWrapper buttonName={' Write bio'}>
              <section className='w-full h-screen overflow-y-auto'>
                <TextEditor
                  oldContent={oldContent}
                  value={aboutMeContent}
                  set={setAboutMeContent}
                />
              </section>
            </ModalWrapper>
          </div>
        </div>
        <hr className='mt-4 mb-8' />
        {/* About Developer */}
        <AboutDeveloper aboutMeForm={aboutMeForm} handleChange={handleChange} />
        <hr className='mt-4 mb-8' />
        {/* Profile Picture */}
        <AboutProfile
          image={aboutMeForm.profile_url}
          setAboutMeForm={setAboutMeForm}
        />
        <hr className='mt-4 mb-8' />
        {/* Featured Project */}
        <FeatureLists />
        <hr className='mt-4 mb-8' />
        {/* Github Graph */}
        <GithubGraph aboutMeForm={aboutMeForm} handleChange={handleChange} />
        <hr className='mt-4 mb-8' />
        {/* Technical Writing Platform @ */}
        <WritingPlatforms
          aboutMeForm={aboutMeForm}
          handleChange={handleChange}
        />
        <hr className='mt-4 mb-8' />
        {/* Social Platform @ */}
        <SocialPlatforms
          handleChange={handleChange}
          aboutMeForm={aboutMeForm}
        />
        <hr className='mt-4 mb-8' />
        {/* Tools & Technologies */}
        <button
          onClick={() => setShowMore((preState) => !preState)}
          type='button'
          title='Show Tech-Stack'
          className='inline-flex m-5 items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
        >
          Show Tech-Stack
        </button>
        {showMore && (
          <div>
            {developerToolsAndTech.map((toolsAndTech, index) => (
              <React.Fragment key={index}>
                <div className='mb-10'>
                  <p className='py-2 text-xl font-semibold'>
                    {toolsAndTech.title}
                  </p>
                  <div>
                    <ProgrammingLanguageDropdown
                      setAboutMeForm={setAboutMeForm}
                      toolType={toolsAndTech.toolType}
                      initialStateValues={toolsAndTech.developerTools}
                    />
                  </div>
                </div>
                <hr className='mt-4 mb-8' />
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSubmission}
          type='button'
          title='Save'
          className='inline-flex m-5 items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
        >
          {isAboutMeCreated ? 'Update' : 'Save'}
        </button>
      </section>
    </DashboardLayout>
  );
};

export default DashboardAboutPage;

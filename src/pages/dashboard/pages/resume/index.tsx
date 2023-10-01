import TextEditor from '@/components/dashboard/global/text-editor';
import DashboardLayout from '@/components/dashboard/layout';
import { OutputData } from '@editorjs/editorjs';
import React from 'react';

const DashboardResumePage = () => {
  const [textEditorContentAbout, setTextEditorContentAbout] = React.useState<OutputData>();

  // const handleSaveContent = async () => {
  //   if (textEditorContentAbout) {
  //     await createOrUpdateContent(1,textEditorContentAbout,'public.resume_dev');
  //   }
  // };

  return (
    <DashboardLayout>
      <div className='sticky top-0 left-0 z-[20] w-full p-4 bg-[rgba(255,255,255,0.1)] shadow md:flex md:items-center md:justify-between md:p-6'>
        <p className='text-sm'>
          Use{' '}
          <kbd className='rounded-md border text-white bg-muted px-1 text-xs uppercase'>
            Tab
          </kbd>{' '}
          to open the command menu.
        </p>
        <div className='flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0'>
          <button
            className='flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
            // onClick={handleSaveContent}
          >
            Save
          </button>
        </div>
      </div>
      {/* <TextEditor
        oldContent={props?.resumeData}
        value={textEditorContentAbout}
        set={setTextEditorContentAbout}
      /> */}
    </DashboardLayout>
  );
};

export default DashboardResumePage;

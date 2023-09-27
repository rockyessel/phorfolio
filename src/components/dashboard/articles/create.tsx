import React from 'react';
import ModalWrapper from '../modal-wrapper';
import TextEditor from '../global/text-editor';
import { OutputData } from '@editorjs/editorjs';

interface Props {
  showMetadataDrawer: boolean;
  textEditorContent: OutputData | undefined;
  setTextEditorContent: React.Dispatch<React.SetStateAction<OutputData | undefined>>;
  handleSubmission: (type: string) => void;
  totalCharacters: number;
  totalWords: number;
  children: React.ReactNode;
  postButtonTitle: string;
  draftButtonTitle: string;
  modalWrapperButtonName: string;
  oldContent: OutputData | undefined;
}

const DashboardDisplay = (props: Props) => {
  return (
    <div className='flex items-center mt-4 gap-x-3'>
      <ModalWrapper buttonName={props.modalWrapperButtonName}>
        {/* Renders Metadata */}
        {props.children}

        {/* TextEditor */}
        <section className='w-full h-screen overflow-y-auto'>
          <TextEditor
            oldContent={props.oldContent}
            value={props.textEditorContent}
            set={props.setTextEditorContent}
          />
        </section>

        {/* Button for Draft and Publish */}
        {!props.showMetadataDrawer && (
          <section className='px-4 py-2 flex items-center justify-between'>
            <div>
              <button
                type='submit'
                onClick={() => props.handleSubmission('draft')}
                className='inline-flex m-5 items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-transparent border border-rose-700 rounded-md sm:w-auto gap-x-2 hover:bg-rose-700 hover:text-white hover:border-rose-700 active:ring-2 active:ring-rose-700'
              >
                {props.draftButtonTitle}
              </button>
              <button
                type='submit'
                onClick={() => props.handleSubmission('publish')}
                className='inline-flex m-5 items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
              >
                {props.postButtonTitle}
              </button>
            </div>

            <div className='inline-flex items-center gap-2'>
              <p>Characters: {props.totalCharacters}</p>
              <p>Words: {props.totalCharacters === 0 ? 0 : props.totalWords}</p>
            </div>
          </section>
        )}
      </ModalWrapper>
    </div>
  );
};

export default DashboardDisplay;

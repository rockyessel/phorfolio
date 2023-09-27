import React from 'react';
import { ArticleItem } from '@/interface';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { createSlug } from '@/utils/helpers';
import { getImageURL } from '@/utils/req';


// TODO refactor later

interface Props {
  showMetaDataDrawer: boolean;
  setShowMetaDataDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  setStateValue: React.Dispatch<React.SetStateAction<ArticleItem>>;
  stateValue: ArticleItem;
  handleMetadataChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleReset: () => void;
}

const MetaDataDrawer = (props: Props) => {
  const [selectedFile, setSelectedFile] = React.useState<File>();

  const handleFileUploads = async () => {
    if (selectedFile) {
      const imgURL = await getImageURL(selectedFile);
      if (imgURL) props.setStateValue({ ...props.stateValue, image: imgURL });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setSelectedFile(file);
    }
  };
  const handleGenerateSlug = () => {
    const generatedSlug = createSlug(props.stateValue.title);
    props.setStateValue({
      ...props.stateValue,
      slug: generatedSlug,
    });
  };

  return (
    <React.Fragment>
      {props.showMetaDataDrawer === true ? null : (
        <div className='text-center'>
          <button
            className='flex m-5 items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
            type='button'
            onClick={() =>
              props.setShowMetaDataDrawer((previousState) => !previousState)
            }
          >
            Metadata
          </button>
        </div>
      )}

      {props.showMetaDataDrawer === true && (
        <aside className='border-r-[1px] border-opacity-50 border-rose-500 relative z-[100] md:w-[30rem] px-1.5'>
          <form className='float-right h-screen overflow-y-auto w-full divide-y-[1px] divide-opacity-50 divide-rose-500'>
            {/* Close Button */}
            <button
              className='flex m-5 items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
              type='button'
              onClick={() =>
                props.setShowMetaDataDrawer((previousState) => !previousState)
              }
            >
              Close
            </button>
            {/* Article/Projects */}
            <fieldset className='py-5'>
              <p className='text-left px-4'>Content Settings</p>
              <p className='text-left text-gray-400 text-sm px-4 mb-2'>
                When you fill this input your content get automatically promoted
                on the platform increasing your reach.
              </p>
              <fieldset className='w-full px-4 py-2'>
                <p className='text-left'>Cover Image</p>
                <fieldset>
                  <fieldset className='flex items-center justify-center w-full'>
                    {!selectedFile ? (
                      <label className='flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50'>
                        <fieldset className='flex flex-col items-center justify-center pt-5 pb-6'>
                          <AiOutlineCloudUpload />
                          <p className='mb-2 text-sm text-gray-500'>
                            <span className='font-semibold'>
                              Click to upload
                            </span>{' '}
                            or drag and drop
                          </p>
                          <p className='text-xs text-gray-500'>
                            SVG, PNG, JPG or GIF (MAX. 1200x600px)
                          </p>
                        </fieldset>
                        <input
                          title='File'
                          onChange={handleFileChange}
                          type='file'
                          multiple
                          className='hidden'
                        />
                      </label>
                    ) : (
                      <fieldset className='w-full h-40 flex flex-col border-rose-800 gap-2.5 border-dashed border-2 items-center justify-center rounded-lg'>
                        <button
                          className='inline-flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
                          onClick={handleFileUploads}
                          type='button'
                        >
                          <AiOutlineCloudUpload /> Upload Now
                        </button>
                        <button
                          className='flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
                          type='button'
                        >
                          Cancel Upload
                        </button>
                      </fieldset>
                    )}
                  </fieldset>
                </fieldset>
              </fieldset>

              <fieldset className='w-full px-4 py-2'>
                <p className='text-left'>Article Tittle</p>

                <fieldset className='w-full'>
                  <input
                    type='text'
                    value={props.stateValue.title}
                    onChange={props.handleMetadataChange}
                    name='title'
                    title='Article Tittle'
                    placeholder='Article Tittle'
                    className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </fieldset>
              </fieldset>

              <fieldset className='w-full px-4 py-2'>
                <p className='text-left'>Post URL</p>

                <fieldset className='flex items-center gap-2'>
                  <input
                    type='text'
                    value={createSlug(props.stateValue.slug)}
                    name='slug'
                    onChange={props.handleMetadataChange}
                    className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                    placeholder='Enter some tags'
                  />
                  <button
                    onClick={handleGenerateSlug}
                    title='Generate'
                    type='button'
                    className='flex items-center justify-center w-fit p-2 text-sm capitalize transition-colors duration-200 bg-transparent border rounded-md sm:w-auto gap-x-2 hover:bg-rose-700 hover:text-white hover:border-rose-700 active:ring-2 active:ring-rose-700'
                  >
                    Generate
                  </button>
                </fieldset>
              </fieldset>

              <fieldset className='w-full px-4 py-2'>
                <p className='text-left'>Tags</p>

                <fieldset>
                  <input
                    title='Tags'
                    type='text'
                    value={props.stateValue.tags.replaceAll(' ', '-')}
                    name='tags'
                    onChange={props.handleMetadataChange}
                    className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </fieldset>
              </fieldset>

              <fieldset className='w-full px-4 py-2'>
                <p className='text-left'>Caption</p>

                <fieldset>
                  <form className='w-full'>
                    <input
                      type='text'
                      value={props.stateValue.caption}
                      onChange={props.handleMetadataChange}
                      title='Caption'
                      name='caption'
                      placeholder='Enter'
                      className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                    />
                  </form>
                </fieldset>
              </fieldset>

              <fieldset className='w-full px-4 py-2'>
                <p className='text-left my-2.5'>Disable Comments</p>

                <fieldset className='w-full inline-flex items-start'>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input
                      checked={props.stateValue.is_comment_disabled}
                      className='sr-only peer'
                      type='checkbox'
                      onChange={props.handleMetadataChange}
                      title='Disable Comments'
                      name='is_comment_disabled'
                    />
                    <div className="w-11 h-6 bg-rose-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-rose-900 after:border-rose-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                    <span className='ml-3 text-sm font-medium'>
                      {props.stateValue.is_comment_disabled ? 'Yes' : 'No'}
                    </span>
                  </label>
                </fieldset>
              </fieldset>

              <fieldset className='w-full px-4 py-2'>
                <p className='text-left'>
                  Where else has the content been published.
                </p>
                <p className='text-left text-xs text-gray-400'>
                  Change the content a little bit if your&apos;re transferring
                  from another platform. Enter the content link below in the
                  input.
                </p>

                <fieldset>
                  <form className='w-full mt-2'>
                    <input
                      title='Also Published @'
                      value={props.stateValue.also_published_on}
                      name='also_published_on'
                      onChange={props.handleMetadataChange}
                      type='text'
                      className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                      placeholder='https://example.com/blog/....'
                    />
                  </form>
                </fieldset>
              </fieldset>

              <fieldset className='w-full px-4 py-2'>
                <p className='text-left'>
                  <p>Published on</p>
                  <span className='text-xs text-gray-400'>
                    You can also post on a previous date.
                  </span>
                </p>

                <fieldset className='w-full px-4 py-2'>
                  <input
                    title='Datetime'
                    value={props.stateValue.published_datetime}
                    name='published_datetime'
                    onChange={props.handleMetadataChange}
                    type='datetime-local'
                    className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </fieldset>
              </fieldset>
            </fieldset>

            {/* SEO */}
            <fieldset className='py-5 '>
              <p className='text-left px-4'>SEO</p>
              <p className='text-left text-gray-400 text-sm px-4 mb-2'>
                Twitter card, Facebook Card, Linkedin card are automatically
                generated for you based on the content below.
              </p>
              <fieldset className='w-full px-4 py-2'>
                <p className='text-left'>Keywords</p>

                <fieldset>
                  <form className='w-full'>
                    <input
                      type='text'
                      value={props.stateValue.keywords}
                      onChange={props.handleMetadataChange}
                      title='Keywords'
                      name='keywords'
                      placeholder='Enter'
                      className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                    />
                  </form>
                </fieldset>
              </fieldset>

              <fieldset className='w-full px-4 py-2'>
                <p className='text-left'>Description</p>

                <fieldset>
                  <textarea
                    value={props.stateValue.description}
                    onChange={props.handleMetadataChange}
                    name='description'
                    title='Description'
                    placeholder='Write a description for your title...'
                    className='block h-28 w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                  ></textarea>
                </fieldset>
              </fieldset>
            </fieldset>

            {/* Save Button */}
            <fieldset className='pt-5 pb-2 px-4'>
              <button
                onClick={props.handleReset}
                type='reset'
                className='flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
              >
                Reset
              </button>
            </fieldset>
          </form>
        </aside>
      )}
    </React.Fragment>
  );
};

export default MetaDataDrawer;

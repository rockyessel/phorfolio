import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import { ArticleItem } from '@/interface';
import EditorOutput from '../EditorOutput';
import { OutputData } from '@editorjs/editorjs';
import AudioCastPlayer from '../projects/audio';
import ShareButton from '../global/share-button';
import { decodeBase64ToObject, deserialize } from '@/utils/helpers';

interface Props {
  data: ArticleItem;
}

const ArticleDetailedCard = (props: Props) => {
  const decodedContent = decodeBase64ToObject(props.data?.content);
  const deserializeContent: OutputData = deserialize(decodedContent);

  return (
    <React.Fragment>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <h1 className='font-extrabold max_screen:text-4xl text-4xl capitalize mb-2'>
            {props.data?.title}
          </h1>
          <div className='flex items-center justify-between'>
            <ShareButton userId={props.data.user_id} text={props.data?.title} />
            <AudioCastPlayer audio_url={props.data.audio_url} />
          </div>
          <p className='w-full text-center font-medium inline-flex items-center justify-end gap-5 max_screen:text-xs'>
            <span>
              {moment(props.data?.published_datetime).format('MMM Do YY')}
            </span>
            {'•'}
            <span>{props.data?.reading_minutes} Minutes</span>
          </p>
        </div>
        <div className='h-[20rem] !overflow-hidden'>
          <Image
            className='w-full h-full srounded-md object-cover object-center mb-4 shadow-md'
            src={props.data?.image}
            width={1000}
            height={1000}
            alt={props.data?.title}
          />
        </div>
      </div>
      <EditorOutput content={deserializeContent} />
    </React.Fragment>
  );
};

export default ArticleDetailedCard;

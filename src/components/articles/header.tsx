import React from 'react';
import Link from 'next/link';
import {
  AiOutlineComment,
  AiOutlineEye,
  AiOutlineFieldTime,
} from 'react-icons/ai';
import moment from 'moment';
import { ArticleItem } from '@/interface';
import { AbbrevNumber } from '@/utils/helpers';

interface Props {
  data: ArticleItem;
}

const ArticleHeader = (props: Props) => {
  const viewCount = AbbrevNumber(props.data?.seen_count);
  return (
    <div className={`flex gap-2 font-medium max_screen:text-sm text-[1.3rem]`}>
      <Link
        passHref
        className={`inline-flex items-center rounded-md gap-2`}
        href={`#comment`}
      >
        <AiOutlineComment className={``} /> {props.data?.comments_count}
      </Link>
      <div className={`inline-flex items-center rounded-md gap-2`}>
        <AiOutlineEye className={`text-[1.3rem]`} /> {viewCount}
      </div>

      <div className={`inline-flex items-center rounded-md gap-2`}>
        <AiOutlineFieldTime className={`text-[1.3rem]`} />
        <span>•</span>
        {moment(props.data?.published_datetime).format('LT')}
      </div>
    </div>
  );
};

export default ArticleHeader;

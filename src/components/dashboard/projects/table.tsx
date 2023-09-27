import React from 'react';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { ProjectItem } from '@/interface';
import AudioBox from '@/components/dashboard/articles/audio-box';
import Link from 'next/link';

interface Props {
  data?: ProjectItem[];
  loading?: boolean;
  headers?: string[];
}

const ProjectTable = (props: Props) => {
  return (
    <table className='min-w-full divide-y divide-rose-700 my-10'>
      <thead className='bg-transparent'>
        <tr>
          {props.headers?.map((header, index) => (
            <th
              key={index}
              className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right'
            >
              <span>{header}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className='bg-transparent divide-y divide-rose-700'>
        {props.loading === true ? (
          <tr className='w-full relative h-10'>
            <td
              className='absolute inset-0 px-4 text-sm font-medium whitespace-nowrap'
              colSpan={100}
              rowSpan={100}
            >
              <span className='py-2.5 text-center w-full inline-flex items-center justify-center'>
                Loading...
              </span>
            </td>
          </tr>
        ) : props.data && props.data.length > 0 ? (
          props.data?.map((data, index) => (
            <tr key={index}>
              <td className='px-1 py-1 text-sm text-left font-medium whitespace-nowrap'>
                <p
                  title={data?.title}
                  className='w-[20rem] overflow-x-important '
                >
                  {data?.title}
                </p>
              </td>
              <td className='px-12 py-4 text-sm text-left font-medium whitespace-nowrap'>
                {data.is_published === true ? (
                  <p>Published</p>
                ) : (
                  <p>Not Published</p>
                )}
              </td>
              <td className='px-12 py-4 text-sm text-left font-medium whitespace-nowrap'>
                <span> {data.seen_count}</span>
              </td>

              <td className='px-1 py-1 text-sm text-left whitespace-nowrap'>
                <span className='inline-flex items-center gap-2'>
                  {data.is_comment_disabled === true ? 'Yes' : 'No'}
                </span>
              </td>
              <td className='px-1 py-1 text-sm text-left whitespace-nowrap'>
                <span>{data.comments_count}</span>
              </td>
              <td className='px-1 py-1 text-sm text-left whitespace-nowrap'>
                <AudioBox source={data.audio_url} />
              </td>
              <td className='px-1 py-1 text-left whitespace-nowrap'>
                <Link href={`/dashboard/edit/projects/${data.slug}`}>
                  <span
                    title='Edit'
                    className='inline-flex items-center justify-center p-4 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
                  >
                    <MdOutlineModeEditOutline />
                  </span>
                </Link>
              </td>
            </tr>
          ))
        ) : (
          <tr className='relative h-10'>
            <td
              className='absolute inset-0 px-4 text-sm font-medium whitespace-nowrap'
              colSpan={100}
              rowSpan={100}
            >
              <span className='py-2.5 text-center w-full inline-flex items-center justify-center'>
                No Data Yet
              </span>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ProjectTable;

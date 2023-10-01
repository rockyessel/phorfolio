import React from 'react';
import { Tooltip } from 'react-tooltip';
import { BsGithub } from 'react-icons/bs';
import { ProjectItem } from '@/interface';
import { PiCertificate } from 'react-icons/pi';
import { TbPlaneDeparture } from 'react-icons/tb';
import { SiVercel, SiWebmoney } from 'react-icons/si';

interface Props {
  data: ProjectItem;
}

const ProjectStatusSubHeader = (props: Props) => {
  return (
    <div className='w-full flex items-center justify-between gap-2 flex-wrap mb-2'>
      {/* Project Github & Demo */}
      <div className='flex items-center gap-2 flex-wrap mb-2'>
        <a
          target={`_blank`}
          href={props.data?.live_demo_url}
          className='p-1 rounded-lg group ring-[1px] ring-rose-700 ring-opacity-50 hover:ring-2 hover:ring-rose-600 '
        >
          <span className='flex items-center gap-2 m-0'>
            <SiWebmoney className='p-1 rounded-lg border-[1px] border-rose-700 text-4xl group-hover:border-white group-hover:text-rose-700' />
          </span>
        </a>
        <a
          target={`_blank`}
          href={props.data?.github_repo}
          className='p-1 rounded-lg group ring-[1px] ring-rose-700 ring-opacity-50 hover:ring-2 hover:ring-rose-600 '
        >
          <span className='flex items-center gap-2 m-0'>
            <BsGithub className='p-1 rounded-lg border-[1px] border-rose-700 text-4xl group-hover:border-white group-hover:text-rose-700' />
          </span>
        </a>
      </div>

      {/* Project Deployment Platform & Status */}
      <div className='flex items-center gap-2 flex-wrap mb-2'>
        {props.data.certificate_url && (
          <div
            data-tooltip-id='certificate_url'
            data-tooltip-content='Linked to certificate'
            title={props.data.certificate_url}
            className={`w-fit p-1 rounded-lg group ring-[1px]  ${
              props.data.certificate_url
                ? 'ring-rose-700 ring-opacity-50 hover:ring-2 hover:ring-green-600'
                : 'ring-rose-700 ring-opacity-50 hover:ring-2 hover:ring-rose-600'
            }`}
          >
            <span className='flex items-center gap-2 m-0'>
              <PiCertificate
                className={`p-1 rounded-lg border-[1px] border-rose-700 text-4xl group-hover:border-white  ${
                  props.data.certificate_url
                    ? 'hover:ring-green-600'
                    : ' border-rose-700 group-hover:text-rose-700'
                } `}
              />
            </span>
          </div>
        )}
        {props.data.deployment_status && (
          <div
            data-tooltip-id='deployment_status'
            data-tooltip-content={'Deployed'}
            title={props.data.deployment_status}
            className={`w-fit p-1 rounded-lg group ring-[1px]  ${
              props.data.deployment_status
                ? 'ring-rose-700 ring-opacity-50 hover:ring-2 hover:ring-green-600'
                : 'ring-rose-700 ring-opacity-50 hover:ring-2 hover:ring-rose-600'
            }`}
          >
            <span className='flex items-center gap-2 m-0'>
              <TbPlaneDeparture
                className={`p-1 rounded-lg border-[1px] border-rose-700 text-4xl group-hover:border-white  ${
                  props.data.deployment_status
                    ? 'hover:ring-green-600'
                    : ' border-rose-700 group-hover:text-rose-700'
                } `}
              />
            </span>
          </div>
        )}
        {props.data.deployment_platform.length >= 3 && (
          <div
            data-tooltip-id='deployment_platform'
            data-tooltip-content={`Deployed ${props.data.deployment_platform}`}
            title={props.data.deployment_platform}
            className={`w-fit p-1 rounded-lg group ring-[1px]  ${
              props.data.deployment_platform.length >= 3
                ? 'ring-rose-700 ring-opacity-50 hover:ring-2 hover:ring-green-600'
                : 'ring-rose-700 ring-opacity-50 hover:ring-2 hover:ring-rose-600'
            }`}
          >
            <span className='flex items-center gap-2 m-0'>
              <SiVercel
                className={`p-1 rounded-lg border-[1px] border-rose-700 text-4xl group-hover:border-white  ${
                  props.data.deployment_platform.length >= 3
                    ? 'hover:ring-green-600'
                    : ' border-rose-700 group-hover:text-rose-700'
                } `}
              />
            </span>
          </div>
        )}
      </div>

      <Tooltip
        style={{ backgroundColor: '#000', color: '#FFF' }}
        id='certificate_url'
      />
      <Tooltip
        style={{ backgroundColor: '#000', color: '#FFF' }}
        id='deployment_status'
      />
      <Tooltip
        style={{ backgroundColor: '#000', color: '#FFF' }}
        id='deployment_platform'
      />
    </div>
  );
};

export default ProjectStatusSubHeader;

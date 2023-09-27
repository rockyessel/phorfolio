import { BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs';

interface Props {
  data: {
    github: string;
    linkedin: string;
    x: string;
  };
}

const FollowButton = (props: Props) => {
  return (
    <div className='flex gap-2'>
      <a
        title='Github'
        rel='noopener'
        className='hover:scale-125 hover:text-rose-500 origin-center hover:origin-top transition-all duration-500'
        target={`_blank`}
        href={props.data.github}
      >
        <BsGithub />{' '}
      </a>{' '}
      <a
        title='Twitter'
        rel='noopener'
        className='hover:scale-125 hover:text-rose-500 origin-center hover:origin-top transition-all duration-500'
        target={`_blank`}
        href={props.data.x}
      >
        <BsTwitter />{' '}
      </a>{' '}
      <a
        title='Linkedin'
        rel='noopener'
        className='hover:scale-125 hover:text-rose-500 origin-center hover:origin-top transition-all duration-500'
        target={`_blank`}
        href={props.data.linkedin}
      >
        <BsLinkedin />{' '}
      </a>
    </div>
  );
};

export default FollowButton;

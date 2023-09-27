import Link from 'next/link';
import { WebDeveloper } from '@/interface';
import SkillsCard from '../skills-card';
import FollowButton from '../follow-btn';

interface Props {
  data: WebDeveloper;
}

const Hero = (props: Props) => {
  const tools = props.data?.tools?.split(',').map((tool) => tool.trim());
  const socialObj = {
    github: props.data?.github,
    linkedin: props.data?.linkedin,
    x: props.data?.x,
  };
  return (
    <section className=' mt-5 md:mt-28'>
      <div className='flex flex-col gap-5'>
        <div>
          <span className='text-white text-3xl capitalize'>
            {props.data?.title}
          </span>
          <p className='font-bold font-noe text-5xl md:text-7xl capitalize'>
            {props.data?.sub_title}
          </p>
        </div>
        <p className='text-lg md:text-2xl md font-light'>
          {props.data?.description}
        </p>
        <div className='flex flex-col gap-5'>
          <p className=' text-lg md:text-2xl font-light'>
            Here are my tools🧰:
          </p>

          <SkillsCard toolLists={tools} />
        </div>
        <div className='flex items-center gap-3 md:gap-5md:text-3xl text-2xl'>
          <FollowButton data={socialObj} />
          <Link href='/contact'>
            <button
              title='Contact me'
              type='button'
              className=' hover:scale-[1.1] md:ml-6 origin-center hover:origin-top transition-all duration-500 after:hover:re_li w-fit font-bold relative text-decoration-none after:content-[""] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-2 after:bg-rose-500'
            >
              Contact me
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

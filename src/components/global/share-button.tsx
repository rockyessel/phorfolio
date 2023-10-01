import React from 'react';
import { User } from '@/interface';
import { useRouter } from 'next/router';
import { GrReddit } from 'react-icons/gr';
import { FiLinkedin } from 'react-icons/fi';
import { CiFacebook } from 'react-icons/ci';
import { BsWhatsapp } from 'react-icons/bs';
import { RiTwitterXFill } from 'react-icons/ri';
import { getUserById } from '@/utils/outerbase-req/users';

interface ShareButtonProps {
  text: string;
  userId: string;
}

const ShareButton: React.FC<ShareButtonProps> = (props) => {
  const [user, setUser] = React.useState<User>();
  const router = useRouter();

  React.useEffect(() => {
    if (props.userId) {
      getUserById(props.userId).then((user) => setUser(user));
    }
  }, [props.userId]);

  const URL =
    process.env.NODE_ENV === 'production'
      ? `https://${user?.username}.phorfolio.site${router.asPath}`
      : `http://${user?.username}.localhost:3000${router.asPath}`;

  const d = [
    {
      icons: (
        <GrReddit className='p-1 rounded-full border-[1px] border-rose-700 text-4xl group-hover:border-white group-hover:text-rose-700' />
      ),
      name: 'Reddit',
      url: `https://www.reddit.com/submit?url=${URL}&mini=true`,
    },
    {
      icons: (
        <CiFacebook className='p-1 rounded-full border-[1px] border-rose-700 text-4xl group-hover:border-white group-hover:text-rose-700' />
      ),
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${URL}`,
    },
    {
      icons: (
        <BsWhatsapp className='p-1 rounded-full border-[1px] border-rose-700 text-4xl group-hover:border-white group-hover:text-rose-700' />
      ),
      name: 'Whatsapp',
      url: `https://web.whatsapp.com/send?text=${URL}`,
    },
    {
      icons: (
        <RiTwitterXFill className='p-1 rounded-full border-[1px] border-rose-700 text-4xl group-hover:border-white group-hover:text-rose-700' />
      ),
      name: 'X(Twitter)',
      url: `https://twitter.com/intent/tweet?url=${URL}&text=${props.text}`,
    },
    {
      icons: (
        <FiLinkedin className='p-1 rounded-full border-[1px] border-rose-700 text-4xl group-hover:border-white group-hover:text-rose-700' />
      ),
      name: 'Reddit',
      url: `https://www.linkedin.com/sharing/share-offsite?url=${URL}&mini=true`,
    },
  ];

  return (
    <div className='flex gap-1 flex-wrap text-[2rem]'>
      {d.map((sb, index) => (
        <a
          key={index}
          href={sb.url}
          title={sb.name}
          target={`_blank`}
          className='w-fit p-1 rounded-full group ring-[1px] ring-rose-700 ring-opacity-50 hover:ring-2 hover:ring-rose-600 '
        >
          <span className='flex items-center gap-2 m-0'>{sb.icons}</span>
        </a>
      ))}
    </div>
  );
};

export default ShareButton;

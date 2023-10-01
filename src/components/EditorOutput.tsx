import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { OutputData, BlockToolData } from '@editorjs/editorjs';
import Link from 'next/link';
import { RiTwitterXFill } from 'react-icons/ri';
import { FaWhatsapp } from 'react-icons/fa';
import { AiOutlineReddit } from 'react-icons/ai';
import { CSSProperties } from 'react';
import { MdOutlineContentCopy } from 'react-icons/md';

const Modal = (props: any) => {
  const styles: CSSProperties = {
    position: 'absolute',
    top: `${props.position.top}px`,
    left: `${props.position.left}px`,
    zIndex: 1000,
  };

  console.log(props);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!props.modalRef.current.contains(e.target)) {
        props.onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [props]);

  return (
    <div
      ref={props.modalRef} // Assign the ref to the modal's container
      className='px-4 py-2 w-[200px] border-[1px] border-opacity-50 border-rose-700 rounded-lg cursor-pointer text-white bg-[#131b24]'
      style={styles}
    >
      <div className='w-full flex flex-col gap-2'>
        <div className='p-1 rounded-lg group ring-[1px] ring-rose-700 ring-opacity-50 hover:ring-2 hover:ring-rose-600 '>
          <span className='flex items-center gap-2 m-0'>
            <RiTwitterXFill className='p-1 rounded-lg border-[1px] border-rose-700 text-4xl group-hover:border-white group-hover:text-rose-700' />
            <span className='text-[12px] text-gray-200'>Share with dev</span>
          </span>
        </div>
        <div className='p-1 rounded-lg group ring-[1px] ring-rose-700 ring-opacity-50 hover:ring-2 hover:ring-rose-600 '>
          <span className='flex items-center gap-2 m-0'>
            <FaWhatsapp className='p-1 rounded-lg border-[1px] border-rose-700 text-4xl group-hover:border-white group-hover:text-rose-700' />
            <span className='text-[12px] text-gray-200'>
              Share with a friend
            </span>
          </span>
        </div>
        <div className='p-1 rounded-lg group ring-[1px] ring-rose-700 ring-opacity-50 hover:ring-2 hover:ring-rose-600 '>
          <span className='flex items-center gap-2 m-0'>
            <AiOutlineReddit className='p-1 rounded-lg border-[1px] border-rose-700 text-4xl group-hover:border-white group-hover:text-rose-700' />
            <span className='text-[12px] text-gray-200'>
              Share with a community
            </span>
          </span>
        </div>
        <div className='p-1 rounded-lg group ring-[1px] ring-rose-700 ring-opacity-50 hover:ring-2 hover:ring-rose-600 '>
          <span className='flex items-center gap-2 m-0'>
            <MdOutlineContentCopy className='p-1 rounded-lg border-[1px] border-rose-700 text-4xl group-hover:border-white group-hover:text-rose-700' />
            <span className='text-[12px] text-gray-200'>Copy!</span>
          </span>
        </div>
      </div>
    </div>
  );
};

const CustomImageRenderer = ({ data }: { data: any }) => {
  const src = data.file.url;
  console.log('Image Src', data);
  const [showModal, setShowModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [selectedText, setSelectedText] = useState<string>('');

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const top = e.clientY - rect.top + window.scrollY;
    const left = e.clientX - rect.left + window.scrollX;
    setModalPosition({ top, left });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='relative w-full min-h-[15rem]' onClick={handleImageClick}>
      <Image
        width={1000}
        height={1000}
        alt='image'
        className='object-contain'
        src={src}
      />
      {showModal && (
        <Modal
          modalRef={modalRef}
          position={modalPosition}
          onClose={handleCloseModal}
          selectedText={selectedText}
        />
      )}
    </div>
  );
};

const CustomParagraphRenderer = ({ data }: { data: any }) => {
  const [selectedText, setSelectedText] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleTextSelect = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const isParagraph = e.target instanceof HTMLParagraphElement;
    if (isParagraph) {
      const selected = window?.getSelection()?.toString();
      if (selected) {
        setSelectedText(selected);
        const selection = window.getSelection();
        if (selection) {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const left = rect.left + window.scrollX;
          setModalPosition({ top, left });
        }
        setShowModal(true);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <p className='' onMouseUp={handleTextSelect}>
      {data.text}
      {showModal && (
        <Modal
          modalRef={modalRef}
          position={modalPosition}
          onClose={handleCloseModal}
          selectedText={selectedText}
        />
      )}
    </p>
  );
};

const Output = dynamic(
  async () => (await import('editorjs-react-renderer')).default,
  { ssr: false }
);

interface Props {
  content: OutputData | undefined;
}

function CustomCodeRenderer({ data }: { data: BlockToolData }) {
  return (
    <pre className='bg-gray-800 rounded-md p-4 overflow-x-auto'>
      <code className='text-gray-100 text-sm'>{data.code}</code>
    </pre>
  );
}

function CustomListRenderer({
  data,
}: {
  data: { style: string; items: any[] };
}) {
  // Render a simple list
  if (data.style === 'unordered') {
    return (
      <ul className='list-disc'>
        {data.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  } else if (data.style === 'ordered') {
    // Render an ordered list
    return (
      <ol className='list-decimal'>
        {data.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    );
  } else {
    // Handle other list styles if needed
    return null;
  }
}

function CustomLinkRenderer({ data }: { data: any }) {
  console.log('CustomLinkRenderer', data);
  return (
    <Link
      className='underline'
      href={`data.link?source=phorfolio`}
      target='_blank'
      rel='noopener noreferrer'
    >
      <span>{data.meta.title}</span>
    </Link>
  );
}

function CustomHeaderRenderer({ data }: { data: any }) {
  console.log('headers', data);
  switch (data.level) {
    case 1:
      return <h1>{data.text}</h1>;
    case 2:
      return <h2>{data.text}</h2>;
    case 3:
      return <h3>{data.text}</h3>;
    case 4:
      return <h4>{data.text}</h4>;
    case 5:
      return <h5>{data.text}</h5>;
    case 6:
      return <h6>{data.text}</h6>;
    default:
      return <div>{data.text}</div>; // Default to a div for unknown levels
  }
}

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
  paragraph: CustomParagraphRenderer,
  list: CustomListRenderer, // Add your custom list renderer here
  linkTool: CustomLinkRenderer, // Add your custom link renderer here
  header: CustomHeaderRenderer,
};

const EditorOutput = ({ content }: Props) => {
  return (
    <article className='typography'>
      {content && <Output renderers={renderers} data={content} />}
    </article>
  );
};

export default EditorOutput;

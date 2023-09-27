import React from 'react';
import { TbPlayerPauseFilled, TbPlayerPlayFilled } from 'react-icons/tb';

interface Props {
  audio_url: string;
}

const AudioCastPlayer: React.FC<Props> = ({ audio_url }) => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlayClick = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className='w-fit p-1 rounded-full group ring-[1px] ring-rose-700 ring-opacity-50 hover:ring-2 hover:ring-rose-600 '>
      <audio
        ref={audioRef}
        src={audio_url}
        onEnded={handleAudioEnded}
      ></audio>
      <span className='flex items-center gap-2 m-0'>
        {isPlaying ? (
          <TbPlayerPauseFilled
            onClick={handlePlayClick}
            className='p-1 rounded-full border-[1px] border-rose-700 text-4xl group-hover:border-white group-hover:text-rose-700'
          />
        ) : (
          <TbPlayerPlayFilled
            onClick={handlePlayClick}
            className='p-1 rounded-full border-[1px] border-rose-700 text-4xl group-hover:border-white group-hover:text-rose-700'
          />
        )}
      </span>
    </div>
  );
};

export default AudioCastPlayer;

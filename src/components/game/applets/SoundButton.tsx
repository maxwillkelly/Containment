/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState } from 'react';
import { GiSpeaker, GiSpeakerOff } from 'react-icons/gi';
import { getBgColour } from './shared';

const SoundButton = () => {
  const [muted, setMuted] = useState(false);

  return (
    <>
      <button
        className={`px-3 ${getBgColour(false)}`}
        type="button"
        onClick={() => setMuted((state) => !state)}
      >
        {muted ? (
          <GiSpeakerOff className="dark:text-gray-200 text-4xl" />
        ) : (
          <GiSpeaker className="dark:text-gray-200 text-4xl" />
        )}
      </button>
      <audio autoPlay muted={muted} loop>
        <source src="../music/bensound-epic.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
};

export default SoundButton;

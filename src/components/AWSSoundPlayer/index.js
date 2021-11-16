import React, { useState, useEffect, useRef } from "react";
import AudioControls from "../AudioControls";
import Backdrop from "../Backdrop";
import "./style.css";

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
 */
const AWSSoundPlayerComponent = ({ item }) => {

  // State
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  /*
    animation_original_url: "https://ipfs.io/ipfs/QmVpVdVwZeZTN6aFVWVUBzTrqR8ReGgjKgiNYX6j68RCcK"
    animation_url: "https://storage.opensea.io/files/f238c3d8dbe8b76170c5bc49395aa542.mp3"
    asset_contract: {address: '0x3e43944d977dea22511da6d33c0cab666a604515', asset_contract_type: 'non-fungible', created_date: '2021-04-23T08:21:20.930532', name: 'Async Music Limited Editions', nft_version: '3.0', …}
    background_color: null
    collection: {banner_image_url: 'https://lh3.googleusercontent.com/QzHcRAHyFKFe8vHc…dDMp0x3y7H0uTfx62S1MMkMord8f_g9m6xrY49J8ORg=s2500', chat_url: null, created_date: '2021-06-03T15:02:43.546844', default_to_fiat: false, description: 'Create and collect #ProgrammableArt and #Programma…o "Layers" which let YOU affect the overall work.', …}
    creator: {user: {…}, profile_img_url: 'https://storage.googleapis.com/opensea-static/opensea-profile/15.png', address: '0x9f7064dfe6ca5856b3afd7a3b3974686a35bdab5', config: ''}
    decimals: 0
    description: "‘Leaving' is a dynamic musical artwork that represents a new frontier in what art and music is, and should do; an experiment in storytelling, in sonic possibilities, in the value of art, and in the relationship between audience, collector, artist and authorship. The stem owners control everything: who sings the vocal part and with what melodies; what drums underpin the performance; the melodies, and even the lyrics. All the variations made possible work together seamlessly such that the artwork includes 6400 unique compositions - not trivially different, but each one its very own song, with the potential to be anything from a piano ballad to a 1980s synth track, to a sample-heavy piece of modern electronica. Each stem-owner has the power to alter the whole master, without knowing what the other stem owners will do - collectors might collaboratively arrive at a genre by responding to each others’ choices, create a genre-spanning hybrid, or actively seek out the most disharmonious composition possible.\r\n\r\nThe song explores the different states of a unique relationship between three people; a love triangle told from the perspective of all those involved. The three characters interweave and blur into each other, with the different primary emotional states as represented by the instrumental, and the different sides of the story as told by the lyrics, intermingling with unpredictable results - eventually, past present, and future; the betrayed, the betrayer and the object of the betrayal; loss, guilt and hope; all meld into one. In this way, the master track will dynamically reflect the intricate complexity of love and loss. Each individual part has been separately written, performed and recorded in a decentralised fashion by HMLTD and our collaborators, Tallulah Eden and Seth Evans. Each unique composition is a snapshot of a different angle of the love triangle in both time and perspective. The accompanying cover art, beautifully rendered by our collaborator Mike Raymond, is the visual representation of ‘Leaving'. Each possible composition; each distinct moment in the relationship, has a corresponding and distinct visual representation: three lovers, 6400 different dances, spinning and looping around in eternity."
    external_link: "https://async.art/music/master/0xb6dae651468e9593e4581705a09c10a76ac1e0c8-1605/player"
    id: 46319154
    image_original_url: "https://ipfs.io/ipfs/QmeuxDKwAftrp6iCF4JyfbperuTXu58mK5UniHL55wu6Mq"
    image_preview_url: "https://lh3.googleusercontent.com/Op-Wc4sZW8geL4wO9pvxYiqu5E0xqtEK95sx9zJDjc8cAfftwPNQlmOil7IBnN111xzutzwnjnbvjZQeu2PeTLqQ2ZZZpWoWU0qI2g=s250"
    image_thumbnail_url: "https://lh3.googleusercontent.com/Op-Wc4sZW8geL4wO9pvxYiqu5E0xqtEK95sx9zJDjc8cAfftwPNQlmOil7IBnN111xzutzwnjnbvjZQeu2PeTLqQ2ZZZpWoWU0qI2g=s128"
    image_url: "https://lh3.googleusercontent.com/Op-Wc4sZW8geL4wO9pvxYiqu5E0xqtEK95sx9zJDjc8cAfftwPNQlmOil7IBnN111xzutzwnjnbvjZQeu2PeTLqQ2ZZZpWoWU0qI2g"
    is_presale: false
    last_sale: null
    listing_date: null
    name: "LEAVING Silver Edition (Mix: 412002)"
    num_sales: 0
    owner: {user: {…}, profile_img_url: 'https://storage.googleapis.com/opensea-static/opensea-profile/15.png', address: '0x9f7064dfe6ca5856b3afd7a3b3974686a35bdab5', config: ''}
    permalink: "https://opensea.io/assets/0x3e43944d977dea22511da6d33c0cab666a604515/548"
    sell_orders: null
    token_id: "548"
    token_metadata: "https://ipfs.io/ipfs/QmPomwHKd7rYyTryUD1usQJZbVAfERznr3pSNf1BdH5HvB"
    top_bid: null
    traits: (2) [{…}, {…}]
    transfer_fee: null
    transfer_fee_payment_token: null
    
  */

  // Destructure for conciseness
    const title = item.props.item.name;
    const audioSrc = item.props.item.animation_url;
    const image = item.props.item.image_url;
    const color = "#00aeb0";

    
    // Refs
    const audioRef = useRef(new Audio(audioSrc));
    const intervalRef = useRef();
    const isReady = useRef(false);

  // Destructure for conciseness
  const { duration } = audioRef.current;

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const toPrevTrack = () => {
    setTrackIndex(0);
  };

  const toNextTrack = () => {
    setTrackIndex(0);
  };

  useEffect(() => {
    if (isPlaying) {
        console.log(audioRef.current.play());
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handles cleanup and setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="audio-player">
      <div className="track-info">
        {/**
         * <img
          className="artwork"
          src={image}
          alt={`track artwork for ${title}`}
        />
         * 
         */}
        <h2 className="title">{title}</h2>
        <br />
        <AudioControls
          isPlaying={isPlaying}
          onPrevClick={toPrevTrack}
          onNextClick={toNextTrack}
          onPlayPauseClick={setIsPlaying}
        />
        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          className="progress"
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={{ background: trackStyling }}
        />
      </div>
      <Backdrop
        trackIndex={trackIndex}
        activeColor={color}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default AWSSoundPlayerComponent;

import React from "react";
// importing font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import icons form font-awesome
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
// this file contains the function that lets the song playing if
// we skip while the song is being played

const Player = ({
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setSongs,
}) => {
  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((element) => {
      if (element.id === nextPrev.id) {
        return {
          ...element,
          active: true,
        };
      } else {
        return {
          ...element,
          active: false,
        };
      }
    });

    setSongs(newSongs);
  };
  const playSongHandler = () => {
    if (isPlaying) {
      // audioRef is a reference which can be used to select a partcular HTML
      //tag from document, in JS we did it as document.queryselector('.box')
      //audioRef.current is an inbuilt propert which grabs the audio object,
      //which then has properties such as currentTime and duration
      audioRef.current.pause(); //pause
      setIsPlaying(!isPlaying); //change the state by
      // setting setIsPlaying to opposite of isPlaying
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
      // setting setIsPlaying to opposite of isPlaying
    }
  };

  const dragHandler = (e) => {
    //audioRef.current is an inbuilt propert which grabs the audio object,
    //which then has properties such as currentTime and duration
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  // -------------MY WAY OF ADDING SKIP BUTTON FUNCTIONS ---------------
  // // here I will have to loop and find the song that is the next song and then set the
  // // current song to that song
  // const forwardSongHandler = () => {
  //   let index = songs.indexOf(currentSong);

  //   if (index < songs.length - 1) {
  //     setCurrentSong(songs[index + 1]);
  //   } else {
  //     setCurrentSong(songs[0]);
  //   }
  // };
  // const rewindSongHandler = () => {
  //   let index = songs.indexOf(currentSong);

  //   if (index > 0) {
  //     setCurrentSong(songs[index - 1]);
  //   } else {
  //     setCurrentSong(songs[0]);
  //   }
  // };

  //using async and await here to avoid errors that we get while
  //loading the song
  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex(
      (element) => element.id === currentSong.id
    );

    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]); // this means that once it
      //reaches the length then set the value back to 0
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play();
        // we have to define it again here because we used return
        return;
      } else {
        await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
      }
    }
    if (isPlaying) audioRef.current.play();
  };

  // function to format time (seconds) to minutes: seconds I.E 01:25
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  //State

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div className="track">
          <input
            min={0}
            max={songInfo.duration || 0} //using OR operator to add default value to avoid errors
            value={songInfo.currentTime}
            onChange={dragHandler} // everytime we drag the range bar this function runs
            type="range"
          />
          <div className="animate-track"></div>
        </div>
        <p>
          {songInfo.duration ? getTime(songInfo.duration) : "0:00"}
          {/* so if we have a duration then get the time otherwise show 0:00 */}
        </p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
          onClick={() => skipTrackHandler("skip-back")}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          // playSongHandler is going to be a function that will pause of play
          //the song
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          onClick={() => skipTrackHandler("skip-forward")}
        />
      </div>
    </div>
  );
};

export default Player;

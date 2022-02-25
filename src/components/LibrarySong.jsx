import { faL } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  id,
  audioRef,
  isPlaying,
  setSongs,
}) => {
  //Event handler
  const songSelecthandler = async () => {
    //playing the song that we click on
    await setCurrentSong(song); //we do this beacuse in our audio our
    //source for audio = currentSong
    audioRef.current.play();

    //check if this song is playing

    // Add active state
    const newSongs = songs.map((element) => {
      if (element.id === song.id) {
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
    setSongs(newSongs); // we have to say this in order to update
    // our songs, what the newSongs function does is it sets the
    // active property of the selcted song to true, however
    //it does not update the song state which is an array
    // the way to update the song array is to say setSongs and
    // then pass newSongs, the only difference between newSongs
    // and the previous value of the song is that it updates the active
    //state of each song
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div
      onClick={songSelecthandler}
      className={`librarys-song ${song.active ? "selected" : ""} `}
      //add selected class it it is active
      //active is a property of the song object in data file
    >
      <img alt={song.name} src={song.cover}></img>
      <div className="song-description">
        <h3>{song.name} </h3>
        <h4> {song.artist} </h4>
      </div>
    </div>
  );
};

export default LibrarySong;

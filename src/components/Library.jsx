import { library } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      {/* // so if the libraryStatus is acitve then add the class of 
      active-library to it or else add nothing  */}
      <h2>library</h2>
      <div className="library-songs"></div>
      {/* here we are mapping each song to the librarySong so we can have access to all 
      the information about each song */}
      {songs.map((song) => (
        <LibrarySong
          song={song} // relates to the map method that we defined rest all are other props
          //   that we want to pass down to LibrarySong
          setCurrentSong={setCurrentSong}
          songs={songs}
          id={song.id}
          key={song.id}
          audioRef={audioRef}
          isPlaying={isPlaying}
          setSongs={setSongs}
        />
      ))}
    </div>
  );
};

export default Library;

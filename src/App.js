import React, { useState, userRef, useRef } from "react";
//Importing styles
import "./styles/app.scss";
// Adding components
import Player from "./components/player";
import Song from "./components/song";
//Import app data
import data from "./data";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
  //Ref
  const audioRef = useRef(null);
  //state
  const [songs, setSongs] = useState(data());
  // we set use state to data because in our data file we define data() which return
  //list of all the songs
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [currentSong, setCurrentSong] = useState(songs[0]);
  // so this will grab first song as we define songs before in the state as list of songs
  const [isPlaying, setIsPlaying] = useState(false);
  // this can be used in the pause and play function that we define in player
  const [libraryStatus, setLibraryStatus] = useState(false);

  //Event Handlers
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime; // return the time passed every some mili seconds
    const duration = e.target.duration; // return the duration of the audio
    setSongInfo({ ...songInfo, currentTime: current, duration: duration });
    // update the state songInfo which is an object so we can set individual properties
    //to what we want to. Now everytime a song runs our state has currentime being
    //updated and duration remains the same
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex(
      (element) => element.id === currentSong.id
    );
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]); // this means that once it
    //reaches the length then set the value back to 0
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
      />
      <Library
        audioRef={audioRef}
        setCurrentSong={setCurrentSong}
        songs={songs}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      {/* passing the audioRef here  */}
      <audio
        onTimeUpdate={timeUpdateHandler} //onTimeUpdate basically runs the function
        // everytime the time changes
        onLoadedData={timeUpdateHandler} // running the function right when the page loads
        ref={audioRef} //passing reference to audio
        src={currentSong.audio}
        onEnded={songEndHandler}
        //runs when the audio comes to an end
      ></audio>
    </div>
  );
}

export default App;

import { useEffect, useRef, useState } from "react";
import playIcon from "./assets/play-icon.svg";
import pausedIcon from "./assets/paused-icon.svg";
import expandIcon from "./assets/expand-icon.svg";
import minimizeIcon from "./assets/minimize-icon.svg";
import volumeOn from "./assets/volume-on-icon.svg";
import volumeOff from "./assets/volume-off-icon.svg";
import "./styles/main.css";

function VidPlayer({ vidSrc }) {
  const [play, setPlay] = useState(false);
  const [mute, setMute] = useState(false);
  const [vol, setVol] = useState(0.5);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [curTrackTime, setCurTrackTime] = useState(0);
  const [vidDuration, setVidDuration] = useState(0);
  const [currMin, setCurrMin] = useState(0);
  const [currSec, setCurrSec] = useState(0);
  const [listIsVisible, setListIsVisible] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const vidRef = useRef(null);

  const durationMin = parseInt(parseInt(vidDuration) / 60);
  const durationSec = parseInt(parseInt(vidDuration) - durationMin * 60);

  const handlePlay = () => {
    if (play === false) {
      setPlay((prev) => !prev);
      vidRef.current.play();
    } else {
      setPlay((prev) => !prev);
      vidRef.current.pause();
    }
  };
  const handleMuted = () => {
    if (mute === false) {
      setMute((prev) => !prev);
      vidRef.current.muted = true;
    } else {
      setMute((prev) => !prev);
      vidRef.current.muted = false;
    }
  };
  const handleVolumeSeek = (e) => {
    e.preventDefault();
    setVol(e.target.value);
    vidRef.current.volume = vol;
  };

  const handleScreenToggle = () => {
    if (isFullScreen) {
      setIsFullScreen((prev) => !prev);
    } else {
      setIsFullScreen((prev) => !prev);
    }
  };
  const handleTimeUpdate = () => {
    setCurTrackTime(vidRef.current.currentTime);
    setCurrMin(parseInt(parseInt(curTrackTime) / 60));
    if (parseInt(curTrackTime) > 59) {
      setCurrSec(parseInt(curTrackTime) - currMin * 60);
    } else {
      setCurrSec(parseInt(curTrackTime));
    }
    if (parseInt(curTrackTime) === parseInt(vidDuration)) {
      setPlay(false);
    }
  };

  const setDefaultVolume = () => {
    vidRef.current.volume = 0.5;
  };

  useEffect(() => {
    const updateDuration = () => {
      if (vidRef.current) {
        setVidDuration(vidRef.current.duration);
      }
    };

    setDefaultVolume();

    const durationListener = () => {
      updateDuration();
      vidRef.current.removeEventListener("durationchange", durationListener);
    };

    if (vidRef.current) {
      vidRef.current.addEventListener("durationchange", durationListener);
    }
  }, []);

  const handleTrackBarChange = (e) => {
    const newTime = e.target.value;
    setCurTrackTime(newTime);
    vidRef.current.currentTime = newTime;
    console.log(e.target.value);
  };

  return (
    <div className={`container-${isFullScreen ? "wide" : "normal"}`}>
      <div className="vid-container">
        <video id="vid" ref={vidRef} onTimeUpdate={handleTimeUpdate}>
          <source src={vidSrc ? vidSrc : ""} type="video/mp4" />
        </video>
      </div>
      <div className="controls-container">
        <div
          className="panel"
          style={{ visibility: `${listIsVisible ? "visible" : "hidden"}` }}
        >
          <div className="track-bar-wrapper">
            <input
              type="range"
              id="track-seek-bar"
              min={0}
              max={`${vidDuration}`}
              value={curTrackTime}
              step={0.1}
              onChange={handleTrackBarChange}
            />
          </div>
          <div className="control-panel">
            <div className="play-pause">
              <button id="play-pause-btn" onClick={handlePlay}>
                {play ? (
                  <img src={pausedIcon} alt="paused-icon" />
                ) : (
                  <img src={playIcon} alt="play-icon" />
                )}
              </button>
            </div>
            <div className="vid-timeline">
              <div id="current-time">
                <span>
                  {vidRef.current
                    ? currMin < 10
                      ? `0${currMin}`
                      : `${currMin}`
                    : "00"}
                </span>
                <span>:</span>
                <span>
                  {vidRef.current
                    ? currSec < 10
                      ? `0${currSec}`
                      : `${currSec}`
                    : "00"}
                </span>
              </div>
              <div id="seperator">
                <span>/</span>
              </div>
              <div id="duration">
                <span>
                  {vidRef.current
                    ? durationMin < 10
                      ? `0${durationMin}`
                      : `${durationMin}`
                    : "00"}
                </span>
                <span>:</span>
                <span>
                  {vidRef.current
                    ? durationSec < 10
                      ? `0${durationSec}`
                      : `${durationSec}`
                    : "00"}
                </span>
              </div>
            </div>
            <div className="vid-player-volume">
              <span>
                <button id="mute" onClick={handleMuted}>
                  {mute ? (
                    <img src={volumeOff} alt="volume-off" />
                  ) : (
                    <img src={volumeOn} alt="volume-on" />
                  )}
                </button>
              </span>
              <span id="volume-seekbar-wrapper">
                <input
                  type="range"
                  id="volume-seekbar"
                  min={0}
                  max={1}
                  value={vol}
                  step={0.01}
                  onChange={handleVolumeSeek}
                />
              </span>
            </div>
            <div className="vid-playback-rate-wrapper">
              <div
                id="current-playback-rate"
                onClick={() => setListIsVisible((prev) => !prev)}
                style={{ color: `${listIsVisible ? "#ff813d" : "#f6f6f6"}` }}
              >
                {playbackSpeed}x
              </div>
              <div
                id="playback-rate-list"
                className={`playback-list-${
                  listIsVisible ? "visible" : "hidden"
                }`}
              >
                <span
                  onClick={() => {
                    setPlaybackSpeed(0.25);
                    vidRef.current.playbackRate = 0.25;
                  }}
                >
                  0.25x
                </span>
                <span
                  onClick={() => {
                    setPlaybackSpeed(0.5);
                    vidRef.current.playbackRate = 0.5;
                  }}
                >
                  0.5x
                </span>
                <span
                  onClick={() => {
                    setPlaybackSpeed(0.75);
                    vidRef.current.playbackRate = 0.75;
                  }}
                >
                  0.75x
                </span>
                <span
                  onClick={() => {
                    setPlaybackSpeed(1);
                    vidRef.current.playbackRate = 1;
                  }}
                >
                  1x
                </span>
                <span
                  onClick={() => {
                    setPlaybackSpeed(1.25);
                    vidRef.current.playbackRate = 1.25;
                  }}
                >
                  1.25x
                </span>
                <span
                  onClick={() => {
                    setPlaybackSpeed(1.5);
                    vidRef.current.playbackRate = 1.5;
                  }}
                >
                  1.5x
                </span>
                <span
                  onClick={() => {
                    setPlaybackSpeed(1.75);
                    vidRef.current.playbackRate = 1.75;
                  }}
                >
                  1.75x
                </span>
              </div>
            </div>
            <div className="vid-screen-toggle">
              <button id="screen-toggle-btn" onClick={handleScreenToggle}>
                {isFullScreen ? (
                  <img src={minimizeIcon} alt="minimize-icon" />
                ) : (
                  <img src={expandIcon} alt="expand-icon" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VidPlayer;

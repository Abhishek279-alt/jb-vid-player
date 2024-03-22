"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = require("react");
var _playIcon = _interopRequireDefault(require("./assets/play-icon.svg"));
var _pausedIcon = _interopRequireDefault(require("./assets/paused-icon.svg"));
var _expandIcon = _interopRequireDefault(require("./assets/expand-icon.svg"));
var _minimizeIcon = _interopRequireDefault(require("./assets/minimize-icon.svg"));
var _volumeOnIcon = _interopRequireDefault(require("./assets/volume-on-icon.svg"));
var _volumeOffIcon = _interopRequireDefault(require("./assets/volume-off-icon.svg"));
require("./styles/main.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function VidPlayer(_ref) {
  var vidSrc = _ref.vidSrc;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    play = _useState2[0],
    setPlay = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    mute = _useState4[0],
    setMute = _useState4[1];
  var _useState5 = (0, _react.useState)(0.5),
    _useState6 = _slicedToArray(_useState5, 2),
    vol = _useState6[0],
    setVol = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isFullScreen = _useState8[0],
    setIsFullScreen = _useState8[1];
  var _useState9 = (0, _react.useState)(0),
    _useState10 = _slicedToArray(_useState9, 2),
    curTrackTime = _useState10[0],
    setCurTrackTime = _useState10[1];
  var _useState11 = (0, _react.useState)(0),
    _useState12 = _slicedToArray(_useState11, 2),
    vidDuration = _useState12[0],
    setVidDuration = _useState12[1];
  var _useState13 = (0, _react.useState)(0),
    _useState14 = _slicedToArray(_useState13, 2),
    currMin = _useState14[0],
    setCurrMin = _useState14[1];
  var _useState15 = (0, _react.useState)(0),
    _useState16 = _slicedToArray(_useState15, 2),
    currSec = _useState16[0],
    setCurrSec = _useState16[1];
  var _useState17 = (0, _react.useState)(false),
    _useState18 = _slicedToArray(_useState17, 2),
    listIsVisible = _useState18[0],
    setListIsVisible = _useState18[1];
  var _useState19 = (0, _react.useState)(1),
    _useState20 = _slicedToArray(_useState19, 2),
    playbackSpeed = _useState20[0],
    setPlaybackSpeed = _useState20[1];
  var vidRef = (0, _react.useRef)(null);
  var durationMin = parseInt(parseInt(vidDuration) / 60);
  var durationSec = parseInt(parseInt(vidDuration) - durationMin * 60);
  var handlePlay = function handlePlay() {
    if (play === false) {
      setPlay(function (prev) {
        return !prev;
      });
      vidRef.current.play();
    } else {
      setPlay(function (prev) {
        return !prev;
      });
      vidRef.current.pause();
    }
  };
  var handleMuted = function handleMuted() {
    if (mute === false) {
      setMute(function (prev) {
        return !prev;
      });
      vidRef.current.muted = true;
    } else {
      setMute(function (prev) {
        return !prev;
      });
      vidRef.current.muted = false;
    }
  };
  var handleVolumeSeek = function handleVolumeSeek(e) {
    e.preventDefault();
    setVol(e.target.value);
    vidRef.current.volume = vol;
  };
  var handleScreenToggle = function handleScreenToggle() {
    if (isFullScreen) {
      setIsFullScreen(function (prev) {
        return !prev;
      });
    } else {
      setIsFullScreen(function (prev) {
        return !prev;
      });
    }
  };
  var handleTimeUpdate = function handleTimeUpdate() {
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
  var setDefaultVolume = function setDefaultVolume() {
    vidRef.current.volume = 0.5;
  };
  (0, _react.useEffect)(function () {
    var updateDuration = function updateDuration() {
      if (vidRef.current) {
        setVidDuration(vidRef.current.duration);
      }
    };
    setDefaultVolume();
    var durationListener = function durationListener() {
      updateDuration();
      vidRef.current.removeEventListener("durationchange", durationListener);
    };
    if (vidRef.current) {
      vidRef.current.addEventListener("durationchange", durationListener);
    }
  }, []);
  var handleTrackBarChange = function handleTrackBarChange(e) {
    var newTime = e.target.value;
    setCurTrackTime(newTime);
    vidRef.current.currentTime = newTime;
    console.log(e.target.value);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "container-".concat(isFullScreen ? "wide" : "normal")
  }, /*#__PURE__*/React.createElement("div", {
    className: "vid-container"
  }, /*#__PURE__*/React.createElement("video", {
    id: "vid",
    ref: vidRef,
    onTimeUpdate: handleTimeUpdate
  }, /*#__PURE__*/React.createElement("source", {
    src: vidSrc ? vidSrc : "",
    type: "video/mp4"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "controls-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      visibility: "".concat(listIsVisible ? "visible" : "hidden")
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "track-bar-wrapper"
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    id: "track-seek-bar",
    min: 0,
    max: "".concat(vidDuration),
    value: curTrackTime,
    step: 0.1,
    onChange: handleTrackBarChange
  })), /*#__PURE__*/React.createElement("div", {
    className: "control-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "play-pause"
  }, /*#__PURE__*/React.createElement("button", {
    id: "play-pause-btn",
    onClick: handlePlay
  }, play ? /*#__PURE__*/React.createElement("img", {
    src: _pausedIcon["default"],
    alt: "paused-icon"
  }) : /*#__PURE__*/React.createElement("img", {
    src: _playIcon["default"],
    alt: "play-icon"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "vid-timeline"
  }, /*#__PURE__*/React.createElement("div", {
    id: "current-time"
  }, /*#__PURE__*/React.createElement("span", null, vidRef.current ? currMin < 10 ? "0".concat(currMin) : "".concat(currMin) : "00"), /*#__PURE__*/React.createElement("span", null, ":"), /*#__PURE__*/React.createElement("span", null, vidRef.current ? currSec < 10 ? "0".concat(currSec) : "".concat(currSec) : "00")), /*#__PURE__*/React.createElement("div", {
    id: "seperator"
  }, /*#__PURE__*/React.createElement("span", null, "/")), /*#__PURE__*/React.createElement("div", {
    id: "duration"
  }, /*#__PURE__*/React.createElement("span", null, vidRef.current ? durationMin < 10 ? "0".concat(durationMin) : "".concat(durationMin) : "00"), /*#__PURE__*/React.createElement("span", null, ":"), /*#__PURE__*/React.createElement("span", null, vidRef.current ? durationSec < 10 ? "0".concat(durationSec) : "".concat(durationSec) : "00"))), /*#__PURE__*/React.createElement("div", {
    className: "vid-player-volume"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("button", {
    id: "mute",
    onClick: handleMuted
  }, mute ? /*#__PURE__*/React.createElement("img", {
    src: _volumeOffIcon["default"],
    alt: "volume-off"
  }) : /*#__PURE__*/React.createElement("img", {
    src: _volumeOnIcon["default"],
    alt: "volume-on"
  }))), /*#__PURE__*/React.createElement("span", {
    id: "volume-seekbar-wrapper"
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    id: "volume-seekbar",
    min: 0,
    max: 1,
    value: vol,
    step: 0.01,
    onChange: handleVolumeSeek
  }))), /*#__PURE__*/React.createElement("div", {
    className: "vid-playback-rate-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    id: "current-playback-rate",
    onClick: function onClick() {
      return setListIsVisible(function (prev) {
        return !prev;
      });
    },
    style: {
      color: "".concat(listIsVisible ? "#ff813d" : "#f6f6f6")
    }
  }, playbackSpeed, "x"), /*#__PURE__*/React.createElement("div", {
    id: "playback-rate-list",
    className: "playback-list-".concat(listIsVisible ? "visible" : "hidden")
  }, /*#__PURE__*/React.createElement("span", {
    onClick: function onClick() {
      setPlaybackSpeed(0.25);
      vidRef.current.playbackRate = 0.25;
    }
  }, "0.25x"), /*#__PURE__*/React.createElement("span", {
    onClick: function onClick() {
      setPlaybackSpeed(0.5);
      vidRef.current.playbackRate = 0.5;
    }
  }, "0.5x"), /*#__PURE__*/React.createElement("span", {
    onClick: function onClick() {
      setPlaybackSpeed(0.75);
      vidRef.current.playbackRate = 0.75;
    }
  }, "0.75x"), /*#__PURE__*/React.createElement("span", {
    onClick: function onClick() {
      setPlaybackSpeed(1);
      vidRef.current.playbackRate = 1;
    }
  }, "1x"), /*#__PURE__*/React.createElement("span", {
    onClick: function onClick() {
      setPlaybackSpeed(1.25);
      vidRef.current.playbackRate = 1.25;
    }
  }, "1.25x"), /*#__PURE__*/React.createElement("span", {
    onClick: function onClick() {
      setPlaybackSpeed(1.5);
      vidRef.current.playbackRate = 1.5;
    }
  }, "1.5x"), /*#__PURE__*/React.createElement("span", {
    onClick: function onClick() {
      setPlaybackSpeed(1.75);
      vidRef.current.playbackRate = 1.75;
    }
  }, "1.75x"))), /*#__PURE__*/React.createElement("div", {
    className: "vid-screen-toggle"
  }, /*#__PURE__*/React.createElement("button", {
    id: "screen-toggle-btn",
    onClick: handleScreenToggle
  }, isFullScreen ? /*#__PURE__*/React.createElement("img", {
    src: _minimizeIcon["default"],
    alt: "minimize-icon"
  }) : /*#__PURE__*/React.createElement("img", {
    src: _expandIcon["default"],
    alt: "expand-icon"
  })))))));
}
var _default = exports["default"] = VidPlayer;

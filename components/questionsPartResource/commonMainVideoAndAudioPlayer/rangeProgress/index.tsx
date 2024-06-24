import React from "react";
import "./style.scss";

function RangeProgress({ currentTime, player, playing, togglePlayer }) {
  return (
    <div className="range">
      <input
        type="range"
        name="rng"
        min="0"
        step="0.25"
        value={currentTime}
        onChange={(e) => {
          const { value } = e?.target;
          player.current.currentTime =
            (value * player?.current?.duration) / 100;

          if (!playing) togglePlayer();
        }}
      />
    </div>
  );
}

export default RangeProgress;

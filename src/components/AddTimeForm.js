import { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { getDateTimeToday } from "../utils";

const AddTimeForm = ({ tracks }) => {
  const [track, setTrack] = useState("");
  const [time, setTime] = useState("");

  const shortcutOptions = [
    { key: 0, value: "Shortcut", text: "Shortcut" },
    { key: 1, value: "Non shortcut", text: "Non shortcut" },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const validTimeRegExp = /0[0-2]:[0-5][0-9].[0-9][0-9][0-9]/g;
    if (!validTimeRegExp.test(time)) {
      alert("Invalid time entered!");
    } else if (track === "") {
      alert("Forgot to select track!");
    } else {
      alert(`Your time ${time} has been submitted! for ${track.value}`);
      const dateAchieved = getDateTimeToday();
      const formData = {
        time,
        name: track.value,
        id: track.key,
        dateAchieved,
      };
      console.log(formData);
    }
  };

  const handleInputChange = ({ target }) => {
    const lettersRegExp = /[a-zA-Z]/g;
    if (!lettersRegExp.test(target.value)) {
      setTime(target.value);
    }
  };

  const handleTrackChange = ({ target }) => {
    const selectedTrack = tracks.find((t) => t.value === target.innerText);
    setTrack(selectedTrack);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Dropdown
        placeholder="Select track"
        search
        selection
        options={tracks}
        name="tracks"
        onChange={handleTrackChange}
        required
      />
      {track.has_shortcut && (
        <Dropdown
          placeholder="Select format"
          search
          selection
          options={shortcutOptions}
          required
        />
      )}
      <div className="ui action input">
        <input
          type="text"
          value={time}
          onChange={handleInputChange}
          name="time"
          placeholder="Enter time in format MM:SS:mmm"
          required
        />
        <button className="ui button" type="submit">
          Save time
        </button>
      </div>
    </form>
  );
};

export default AddTimeForm;
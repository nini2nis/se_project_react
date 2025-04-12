import React, { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  return (
    <>
      <label className="toggle-switch-label" htmlFor={`toggle-switch`}>
        <input
          onChange={handleToggleSwitchChange}
          className="toggle-switch-checkbox"
          id="toggle-switch"
          type="checkbox"
        />
        <span className="toggle-switch-button" />
        <span className="toggle-switch__text toggle-switch__text_F">F</span>
        <span className="toggle-switch__text toggle-switch__text_C">C</span>
      </label>
    </>
  );
};

export default ToggleSwitch;

"use client";

import { cn } from "@/lib/utils";

interface LeverSwitchProps {
  checked: boolean;
  onToggle: (checked: boolean) => void;
}

export const LeverSwitch = ({ checked, onToggle }: LeverSwitchProps) => {
  return (
    <div className="toggle-container" onClick={() => onToggle(!checked)}>
      <input
        className="toggle-input"
        type="checkbox"
        checked={checked}
        readOnly
      />
      <div className="toggle-handle-wrapper">
        <div className="toggle-handle">
          <div className="toggle-handle-knob"></div>
          <div className="toggle-handle-bar-wrapper">
            <div className="toggle-handle-bar"></div>
          </div>
        </div>
      </div>
      <div className="toggle-base">
        <div className="toggle-base-inside"></div>
      </div>
    </div>
  );
};

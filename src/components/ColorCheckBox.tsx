"use client"

import { useState } from "react";
import GradientPicker, { GradientPickerProps } from "./GradientColorPicker";
import ColorPicker, {ColorPickerProps} from "./ColorPicker";

interface ColorCheckBoxProps {
    gradientPickerProps: GradientPickerProps;
    colorPickerProps: ColorPickerProps;
}

const ColorCheckBox: React.FC<ColorCheckBoxProps> = ({colorPickerProps,gradientPickerProps}) => {
    const [isGradient, setIsGradient] = useState<boolean>(true);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsGradient(event.target.checked);
    };
    return (
        <div className="flex flex-col items-center space-x-2">
            <label htmlFor="toggle" className="flex items-center space-x-2 mb-2">
                <input
                    type="checkbox"
                    id="toggle"
                    checked={isGradient}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-5 w-5 text-indigo-600"
                />
                <span className="text-sm font-medium text-gray-300">Use Gradient</span>
            </label>
            {isGradient ? (
                <GradientPicker {...gradientPickerProps} />
            ) : (
                <ColorPicker {...colorPickerProps} />
            )}
        </div>
    )
}

export default ColorCheckBox
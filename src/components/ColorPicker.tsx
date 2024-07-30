"use client"

export interface ColorPickerProps {
  label: string;
  id: string;
  value: string
  setValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({id,label,setValue,value})=> {
    return (
        <div>
          <label htmlFor={id} className="block text-sm font-medium text-gray-300">
            {label}
          </label>
          <input
            type="color"
            id={id}
            value={value}
            onChange={setValue}
            className="mt-1 block w-full rounded-md border-gray-900 shadow-sm focus:border-indigo-900 focus:ring focus:ring-indigo-700 focus:ring-opacity-50"
          />
        </div>
    )
}

export default ColorPicker
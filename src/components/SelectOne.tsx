"use client"

interface SelectOneProps {
    id: string;
    value?: string;
    setValue: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Array<{value: string; label: string}>
}

const SelectOne: React.FC<SelectOneProps> = ({options, setValue,value, id}) =>{
    
    return (
        <select id={id}  className='bg-gray-800 max-w-52 flex text-sm font-medium text-gray-300' onChange={setValue} value={value}>
          {options.map(option=>(<option key={option.value} value={option.value}>{option.label}</option>))}
        </select>
    )
}

export default SelectOne
import React, { useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import qrcode from 'qrcode';

interface QRDesignerProps {
  value: string;
  onDesignChange: (design: QRDesign) => void;
}

interface QRDesign {
  backgroundColor: string;
  foregroundColor: string;
}

const QRDesigner: React.FC<QRDesignerProps> = ({ value, onDesignChange }) => {
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const qrRef = useRef<HTMLDivElement>(null);

  const handleColorChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(event.target.value);
    updateDesign();
  };


  const updateDesign = () => {
    onDesignChange({
      backgroundColor,
      foregroundColor,
    });
  };

  const downloadQRCode = async () => {
    if (!qrRef.current) return;

    try {
      // Generate QR code as data URL
      const qrDataURL = await qrcode.toDataURL(value, {
        width: 512,
        margin: 2,
        color: {
          dark: foregroundColor,
          light: backgroundColor,
        },
      });

      // Create a canvas to combine QR code and logo
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = qrDataURL;
        link.click();
        
      };
      img.src = qrDataURL;
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div ref={qrRef} className="relative">
        <QRCode
          value={value}
          bgColor={backgroundColor}
          fgColor={foregroundColor}
          size={256}
          level="H"
        />
      </div>
      <div className="flex space-x-4">
        <div>
          <label htmlFor="bgColor" className="block text-sm font-medium text-gray-300">
            Background Color
          </label>
          <input
            type="color"
            id="bgColor"
            value={backgroundColor}
            onChange={(e) => handleColorChange(e, setBackgroundColor)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="fgColor" className="block text-sm font-medium text-gray-300">
            Foreground Color
          </label>
          <input
            type="color"
            id="fgColor"
            value={foregroundColor}
            onChange={(e) => handleColorChange(e, setForegroundColor)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>
      <button
        onClick={downloadQRCode}
        type="button"
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Download QR Code
      </button>
    </div>
  );
};

export default QRDesigner;
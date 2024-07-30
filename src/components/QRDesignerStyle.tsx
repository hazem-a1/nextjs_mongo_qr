import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling, { FileExtension, Options } from 'qr-code-styling';
import { setNestedValue } from '@/helper/setNestedValue';
import { getDefaultQrOptions } from '@/helper/getDefaultQrOptions';
import SelectOne from './SelectOne';
import { Gradient } from './GradientColorPicker';
import ColorCheckBox from './ColorCheckBox';
import { cornersDotOptions, cornersSquareOptions, defaultColor, defaultGradient, dotsOptions, extensionOptions } from '@/constant/QRDesignerConstant';

interface QRDesignerStyleProps {
  value: string;
  onDesignChange: (design: Options) => void;
}

const QRDesignerStyle: React.FC<QRDesignerStyleProps> = ({ value, onDesignChange }) => {

  const [options, setOptions] = useState<Options>(getDefaultQrOptions(value))

  const [downloadExtension, setDownloadExtension] = useState<FileExtension>("jpeg")

  const qrRef = useRef<HTMLDivElement>(null);

  const [qrCode] = useState<QRCodeStyling>(
    new QRCodeStyling(options)
  );

  useEffect(() => {
    setOptions(prev => ({ ...prev, data: value }))
  }, [value]);

  useEffect(() => {
    if (qrRef.current) {
      qrCode.append(qrRef.current);
    }
  }, [qrCode, qrRef]);

  useEffect(() => {
    if (!qrCode) return;
    qrCode.update(options);
  }, [qrCode, options]);


  const genericSetter = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    let value = event.target.value;
    let id = event.target.id;
    const nestedPath = id.split(".")
    let newOptionsObject = options
    // remove gradient
    if (nestedPath[nestedPath.length - 1] === 'color') {
      newOptionsObject = setNestedValue(options, id.replace('color', 'gradient'), null)
    }

    newOptionsObject = setNestedValue(newOptionsObject, id, value)

    setOptions(newOptionsObject);
    // callback to parent
    onDesignChange(newOptionsObject);
  }

  const colorGradientSetter = (gradient: Gradient, id: string) => {
    const nestedPath = id.split(".")
    let newOptionsObject = options
    // remove color
    if (nestedPath[nestedPath.length - 1] === 'gradient') {
      newOptionsObject = setNestedValue(newOptionsObject, id.replace('gradient', 'color'), null)
    }
    newOptionsObject = setNestedValue(newOptionsObject, id, gradient)
    setOptions(newOptionsObject);
    // callback to parent
    onDesignChange(newOptionsObject);
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOptions(prev => ({ ...prev, image: e.target?.result as string }));
        onDesignChange(options);
      };
      reader.readAsDataURL(file);
    }
  };


  const downloadQRCode = async () => {
    if (!qrRef.current) return;
    const nameS = value.split("/")
    const name = nameS[nameS.length - 1]
    try {
      qrCode.download({ extension: downloadExtension, name });
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sticky QR code preview on the left */}
      <div className="md:w-1/2 p-4 md:sticky md:top-0 md:h-screen">
        <div ref={qrRef} className="w-full h-full flex items-center justify-center" />
      </div>
  
      {/* Scrollable customization options on the right */}
      <div className="md:w-1/2 p-4 overflow-y-auto">
        <div className="space-y-8">
          {/* Background options */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Background</h2>
            <ColorCheckBox
              colorPickerProps={{
                setValue: genericSetter,
                id: 'backgroundOptions.color',
                value: options.backgroundOptions?.color || defaultColor,
                label: 'Background Color'
              }}
              gradientPickerProps={{
                setValue: colorGradientSetter,
                id: 'backgroundOptions.gradient',
                value: options.backgroundOptions?.gradient || defaultGradient,
                label: 'Background Color'
              }}
            />
          </div>
  
          {/* Foreground options */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Foreground</h2>
            <ColorCheckBox
              colorPickerProps={{
                setValue: genericSetter,
                id: 'dotsOptions.color',
                value: options.dotsOptions?.color || defaultColor,
                label: 'Foreground Color'
              }}
              gradientPickerProps={{
                setValue: colorGradientSetter,
                id: 'dotsOptions.gradient',
                value: options.dotsOptions?.gradient || defaultGradient,
                label: 'Foreground Color'
              }}
            />
            <SelectOne id='dotsOptions.type' options={dotsOptions} value={options.dotsOptions?.type} setValue={genericSetter} />
          </div>
  
          {/* Corners Square options */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Corners Square</h2>
            <ColorCheckBox
              colorPickerProps={{
                setValue: genericSetter,
                id: 'cornersSquareOptions.color',
                value: options.cornersSquareOptions?.color || defaultColor,
                label: 'Corners Square Color'
              }}
              gradientPickerProps={{
                setValue: colorGradientSetter,
                id: 'cornersSquareOptions.gradient',
                value: options.cornersSquareOptions?.gradient || defaultGradient,
                label: 'Corners Square Color'
              }}
            />
            <SelectOne id='cornersSquareOptions.type' options={cornersSquareOptions} value={options.cornersSquareOptions?.type} setValue={genericSetter} />
          </div>
  
          {/* Corners Dot options */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Corners Dot</h2>
            <ColorCheckBox
              colorPickerProps={{
                setValue: genericSetter,
                id: 'cornersDotOptions.color',
                value: options.cornersDotOptions?.color || defaultColor,
                label: 'Corners Dot Color'
              }}
              gradientPickerProps={{
                setValue: colorGradientSetter,
                id: 'cornersDotOptions.gradient',
                value: options.cornersDotOptions?.gradient || defaultGradient,
                label: 'Corners Dot Color'
              }}
            />
            <SelectOne id='cornersDotOptions.type' options={cornersDotOptions} value={options.cornersDotOptions?.type} setValue={genericSetter} />
          </div>
  
          {/* Logo upload */}
          <div className="space-y-2">
            <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
              Upload Logo
            </label>
            <input
              type="file"
              id="logo"
              accept="image/*"
              onChange={handleLogoUpload}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
          </div>
  
          {/* Download options */}
          <div className="space-y-4">
            <SelectOne id='file-extension' options={extensionOptions} value={downloadExtension} setValue={(e) => setDownloadExtension(e.target.value as FileExtension)} />
            <button
              onClick={downloadQRCode}
              type="button"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Download QR Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRDesignerStyle;
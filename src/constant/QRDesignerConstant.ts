import { Gradient } from "qr-code-styling";

export const defaultGradient: Gradient = {
    type: "linear",
    rotation: 0,
    colorStops: [
      { offset: 0, color: "#ffffff" },
      { offset: 100, color: "#000000" }
    ]
  };
  
 export const defaultColor = "#000000"
 export const extensionOptions = [{ value: "svg", label: "SVG" },
    { value: "png", label: "PNG" },
    { value: "jpeg", label: "JPEG" },
    { value: "webp", label: "WEBP" }]
  
   export const dotsOptions = [{ value: "square", label: "Square" }, { value: "dots", label: "Dots" }, { value: "rounded", label: "Rounded" }, { value: "classy", label: "Classy" }, { value: "classy-rounded", label: "Classy Rounded" }, { value: "extra-rounded", label: "Extra Rounded" }]
  
   export const cornersDotOptions =[{ value: "square", label: "Square" },{ value: "dot", label: "Dot" }]
  
   export const cornersSquareOptions =[{ value: "square", label: "Square" },{ value: "extra-rounded", label: "Extra Rounded" },{ value: "dot", label: "Dot" }]
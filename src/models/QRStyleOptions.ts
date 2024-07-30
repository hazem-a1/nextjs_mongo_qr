import mongoose from "mongoose";

const enumMode = ["Numeric" , "Alphanumeric" , "Byte" , "Kanji"]
  const enumErrorCorrectionLevel = ["L" , "M" , "Q" , "H"]
  const QrOptions = new mongoose.Schema({
    typeNumber: {
      type: Number,
      min: 0,
      max: 40,
      default: 7
    },
    mode: {
      type: String,
      enum: enumMode,
      default: "Byte"
    },
    errorCorrectionLevel: {
      type: String,
      enum: enumErrorCorrectionLevel,
      default: "Q",
    }
  })
  
  const ImageOptions = new mongoose.Schema({
    hideBackgroundDots: Boolean,
    imageSize: Number,
    crossOrigin: {
      type: String,
      default: "anonymous"
    },
    margin: Number,
  })
  
  const ColorStops = new mongoose.Schema({
    offset: Number,
    color: String,
  })
  const enumGradientType = ["radial" , "linear"]
  const GradientType = new mongoose.Schema({
    type: enumGradientType,
    rotation: Number,
    colorStops: [ColorStops]
  })
  
  const enumDotsOptions = ["square" , "dots" , "rounded" , "classy" , "classy-rounded" , "extra-rounded"]
  
  const DotsOptions = new mongoose.Schema({
    color: String,
    gradient: GradientType,
    type: {
      type: String,
      enum: enumDotsOptions
    }
  })
  
  const enumCornersSquareOptions =  ["square" , "dot", "extra-rounded"]
  
  const CornersSquareOptions = new mongoose.Schema({
    color: String,
    gradient: GradientType,
    type: {
      type: String,
      enum: enumCornersSquareOptions
    }
  })
  
  const enumCornerDotType = ["square" , "dot"];

  const CornersDotOptions = new mongoose.Schema({
    color: String,
    gradient: GradientType,
    type: {
      type: String,
      enum: enumCornerDotType
    }
  })
  
  const BackgroundOptions = new mongoose.Schema({
    color: String,
    gradient: GradientType,
    round: Number
  })
  
  const enumTypes = ["canvas" , "svg"]
  const enumShape = ["square" , "circle"]
  
 export const QrStyleOptions = new mongoose.Schema({
    type: {
      enum: enumTypes,
      type: String,
      default: "svg"
    },
    shape: {
      enum: enumShape,
      type: String,
      default: "square"
    },
    width: Number,
    height: Number,
    margin: Number,
    data: String,
    image: String,
    qrOptions: QrOptions,
    imageOptions: ImageOptions,
    dotsOptions: DotsOptions,
    cornersSquareOptions: CornersSquareOptions,
    backgroundOptions: BackgroundOptions,
    cornersDotOptions: CornersDotOptions
  })
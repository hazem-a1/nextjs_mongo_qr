import { Options } from "qr-code-styling";

export function getDefaultQrOptions(url:string):Options {
    return {
        width: 300,
        height: 300,
        data: url,
        margin: 0,
        type: "svg",
        shape: "square",
        qrOptions: {
            typeNumber: 6,
            mode: "Byte",
            errorCorrectionLevel: "Q"
        },
        imageOptions: {
          hideBackgroundDots: false,
          imageSize: 0.4,
          margin: 3,
          crossOrigin: 'anonymous',
        },
        dotsOptions: {
            type: "extra-rounded",
            color: "#1429c8",
            gradient: {
                type: 'linear', // 'radial'
                rotation: 0,
                colorStops: [{ offset: 0, color: '#8688B2' }, { offset: 1, color: '#77779C' }]
          },
        },
        backgroundOptions: {
            color: "#ce3b3b",
            round: 0.1,
            gradient: {
                type: 'linear', // 'radial'
                rotation: 0,
                colorStops:[{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
          },
        },
        // image: "10cc19bd484118dbcd0a7886a38ceddc.png",
        cornersSquareOptions: {
            type: "extra-rounded",
            color: "#000000",
            gradient: {
                type: 'linear', // 'radial'
                rotation: 0,
                colorStops:[{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
          },
        },
        cornersDotOptions: {
            type: "dot",
            color: "#000000",
            gradient: {
            type: 'linear', // 'radial'
            rotation: 0,
            colorStops:[{ offset: 0, color: '#00266e' }, { offset: 1, color: '#4060b3' }]
      },
        },
      }
}
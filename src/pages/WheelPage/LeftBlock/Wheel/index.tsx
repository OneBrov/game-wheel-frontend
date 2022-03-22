import React from 'react';
import { GameType } from '../../../../utils/types/GameType';


interface WheelProps {
  games: GameType[]
}

  
let wheelSize = 600;

const Wheel:React.FC<WheelProps> = ({
  games = []
}) => {

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  console.log('Rerender');

  React.useEffect(() => {
    drawWheel(games.length);
  }, [games]);


  const drawWheel = (sectorCount: number = 1) => {
    if (!canvasRef?.current ) return;
    const canvas = getHighDPICanvas(canvasRef.current);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const xCenter = wheelSize  / 2;
    const yCenter = wheelSize / 2 ;
    const radius  = (wheelSize - 4) / 2;

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#fffffe';
    ctx.stroke();
    ctx.save();
    ctx.closePath();

    ctx.translate(wheelSize/2, wheelSize/2);
    ctx.save();
    // draw sectors
    for (let i = 0; i < sectorCount; i++) {
      ctx.beginPath();

      ctx.strokeStyle = '#fffffe';
      ctx.rotate(toRad(360/sectorCount));
      ctx.moveTo(0, 0);
      ctx.lineTo(radius, 0);
      ctx.arc(0, 0, radius, 0, toRad(360/sectorCount));
      ctx.lineTo(0, 0);
      ctx.fillStyle = getRandomColor();
      ctx.fill();

      ctx.closePath();
    }
    //Draw inner sector borders
    ctx.restore();

    drawSectorSeparators(ctx, sectorCount, radius);

    const gameNames = games.map(g => g.name);

    drawGameNames(ctx, gameNames, sectorCount, radius);


    ctx.restore();
    //Draw outer circle border
    ctx.arc(xCenter, yCenter, radius, 0, 2 * Math.PI);
    ctx.stroke();

  
  };

  const getHighDPICanvas = (
    can: HTMLCanvasElement,

  ) => {
    const pixelRatio = Math.max(2, window.devicePixelRatio);

    can.width  =  wheelSize*pixelRatio;
    can.height =  wheelSize*pixelRatio;

    can.style.width =  '' + wheelSize + 'px';
    can.style.height = '' + wheelSize + 'px';
    const ctx = can.getContext('2d');

    ctx?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    return can;
  };

  //Draw game names
  const drawSectorSeparators = (
    ctx: CanvasRenderingContext2D, 
    sectorCount: number, 
    radius: number
  ) => {
    for (let i = 0; i < sectorCount; i++) {
      ctx.fillStyle = '#fffffe';
      ctx.strokeStyle = '#fffffe';
      ctx.rotate(toRad(360/sectorCount));
      ctx.moveTo(0, 0);
      ctx.lineTo(radius, 0);
      ctx.stroke();
    }
    return;
  };

  const drawGameNames = (
    ctx: CanvasRenderingContext2D, 
    names: string[],
    sectorCount: number,
    radius: number
  ) => {
    const maxNameWidth = radius - radius/2;
    ctx.moveTo(0, 0);
    ctx.save();
    ctx.rotate(toRad(360/sectorCount)/2);
    ctx.lineWidth = 1;
    for (let name of names) {
      ctx.font = 'normal 100 18px "Roboto"';
      ctx.rotate(-toRad(360/sectorCount));
      ctx.textAlign = 'center';
      const drawingName = getDrawingName(ctx, name, maxNameWidth);
      
      ctx.fillText(drawingName, radius - radius/3, 0, maxNameWidth);

    }
    ctx.restore();

  };

  const getDrawingName = (
    ctx: CanvasRenderingContext2D,
    gameName: string, 
    maxWidth: number
  ) => {
    let drawingName = '';

    for (let word of gameName.split(' ')){
      const { width } = ctx.measureText(drawingName + ' ' + word);
      if (width < maxWidth) {
        drawingName += ' ' + word;
      } else {
        drawingName += '...';
        return drawingName;
      }
    }

    return drawingName;
  };

  const toRad = (num: number) => {
    return num * Math.PI / 180;
  };

  const getRandomColor = () => {
    const baseColors = [
      '176,11,105' , 
      '211,175,133',
      '246,146,115',
      '116,144,199',
      '143,227,136',
      '209,180,212',
      '234,238,245',
      '250,176,186'
    ];
    const randomColor = baseColors[
      Math.floor(Math.random()*baseColors.length)
    ];
    const randomOpacity = Math.random();
    return `rgba(${randomColor}, ${randomOpacity})`;
  };

  return (
    <canvas ref={canvasRef} width={wheelSize} height={wheelSize} />
  );
};

export const MemoWheel = React.memo(Wheel);


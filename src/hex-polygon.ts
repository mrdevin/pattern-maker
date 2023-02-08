import { svg } from 'lit';

export enum TileType {
  Pointed = "pointed",
  Flat = "flat"
}
export interface HexPolygonProps {
  size?: number,
  column?: number,
  row?: number,
  tileType?: TileType,
  clickHandler: Function
}

export const HexPolygon = ({ size = 55.0145, column = 0, row = 0, tileType = TileType.Pointed, clickHandler = () => { } }: HexPolygonProps) => {
  const hexWidth = 55.0145;
  console.log("🚀 ~ file: hex-polygon.ts:20 ~ HexPolygon ~ hexWidth", hexWidth)
  const hexHeight = hexWidth * Math.sqrt(3) / 2;
  const hexX = (column * hexWidth) + (row % 2 === 0 ? hexWidth / 2 : 0) ;
  const hexY = row * hexHeight ;
  const hexRadius = size / 2;



  function translations() {
    const spacingFactor = 100/100
    return `${((hexRadius + hexX) * spacingFactor) - (size)},
            ${((hexRadius + hexY) * spacingFactor) - ((size * 1.8))}`
  }

  function rotations(){
    return `0, 0, 0`;
  }

  if (tileType ===  TileType.Flat){
    return svg`
        <path
        class="hex"
        transform="translate(${translations()}) rotate(${rotations()})"
        @click=${clickHandler}
        d="M47.6 13.8v27.5L23.8 55 0 41.3V13.8L23.8 0z"></path>
    `
  }else{
    return svg`
      <g  transform="translate(${translations()}) rotate(${rotations()})" >
        <path
          class="hex"
          @click=${clickHandler}
          d="M47.6 13.8v27.5L23.8 55 0 41.3V13.8L23.8 0z"></path>
        <g class="shadows" >
          <path class="shad1" d="M47.6 13.8 23.8 27.5l23.8 13.8V13.8z"></path>
          <path class="shad2" d="m23.8 55 23.8-13.7-23.8-13.8z"></path>
          <path class="shad3" d="M0 41.3 23.8 55V27.5z"></path>
          <path class="shad4" d="M0 13.8v27.5l23.8-13.8z"></path>
          <path class="shad1" d="M23.8 0 0 13.8l23.8 13.7z"></path>
          <path class="shad5" d="M47.6 13.8 23.8 0v27.5z"></path>
        </g>
      </g>
    `
  }
};


import { svg } from 'lit';
// import { styleMap } from 'lit-html/directives/style-map.js';
// import ShopButtonStyles from '../css/shop-button.css?inline';

export enum TitleType {
  Pointed = "pointed",
  Flat = "flat"
}
export interface HexTilePolygonProps {
  size?: number,
  column?: number,
  row?: number
  titleType?: TitleType
}
/**
 * Primary UI component for user interaction
 */
export const HexTilePolygon = ({ size = 80, column = 0, row = 0, titleType = TitleType.Pointed }: HexTilePolygonProps) => {
  // const mode = primary ? 'shop-button--primary' : 'shop-button--secondary';
  const hexWidth = size;
  const hexHeight = hexWidth * Math.sqrt(3) / 2;
  const hexX = (column * hexWidth) + (row % 2 === 0 ? hexWidth / 2 : 0) ;
  const hexY = row * hexHeight ;
  const hexRadius = size / 2;

  function hexagonPoints() {
    const points = Array(6).fill(0).map((x, i) => {
      var angle_deg = 60 * i - 30;
      var angle_rad = Math.PI / 180 * angle_deg;
      const xPoint = (hexWidth / 2 + hexRadius * Math.cos(angle_rad));
      const yPoint = hexHeight / 2 + hexRadius * Math.sin(angle_rad)
      return `${xPoint}, ${yPoint}`;
    })
    return points
  }


  function translations() {
    const spacingFactor = 90/100
    return `${((hexRadius + hexX) * spacingFactor) - (size)},
            ${((hexRadius + hexY) * spacingFactor) - ((size * 1.8))}`
  }

  function rotations(){
    return `0, 0, 0`;
  }

  return svg`
    <polygon
      points=" ${hexagonPoints()}"
      transform="translate(${translations()}), rotate(${rotations()})"
      style="fill:red">
    </polygon>
  `;
};
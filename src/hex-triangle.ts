import {svg} from "lit-html";
import { cache } from 'lit/directives/cache.js';

interface HexTriangleProps{
   column: number,
   row: number,
   size?:number
}



export const HexTriangle = ({column=0, row=0, size=80}: HexTriangleProps) => {
console.log("🚀 ~ file: hex-triangle.ts:12 ~ HexTriangle ~ size", size)

  const hexWidth = size;
  const hexHeight = hexWidth * Math.sqrt(3) / 2;
  const hexRadius = size / 2;

  const hexX = (column * hexWidth) + (row % 2 === 0 ? hexWidth / 2 : 0);
  const hexY = row * hexHeight;

  const hexagonSides = 6;
  const radius = size / Math.sqrt(3);
  const centerX = -172;
  const centerY = -90;

  const points = [];
  for (let i = 0; i < hexagonSides; i++) {
    const angle = (2 * Math.PI * i) / hexagonSides;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push([x, y]);
  }

  const triangles = [];
  for (let i = 0; i < hexagonSides; i++) {
    const j = (i + 1) % hexagonSides;
    const triangle = [[centerX, centerY],
    [points[i][0], points[i][1]],
    [points[j][0], points[j][1]]
    ];
    triangles.push(triangle);
  }
  const spacingFactor = 117 / 100
  function translations() {

    return `${((hexRadius + hexX) * spacingFactor) },
            ${((hexRadius + hexY) * spacingFactor) }`
  }

  function rotations() {
    return `0, 0, 0`;
  }

  function calcFill(){

    if (column % 2 || (row % 2)) {
      return 'red';
    }
    return 'green';
  }

  function toggleFill(event){
    // console.log("🚀 ~ file: hex-triangle.ts:58 ~ toggleFill ~ event", event.target)
    let currentFill  = event.target.style.fill;
    console.log("🚀 ~ file: hex-triangle.ts:61 ~ toggleFill ~ currentFill", currentFill)

    let newFill = 'pink';
    if ( currentFill === newFill){
      newFill = 'lightblue';
    }
    event.target.style.fill =  newFill;
  }

  // let fill = calcFill()

  return svg`

    <g  transform="translate(${translations()}), rotate(${rotations()})">

      ${cache(triangles
      .map(
        (triangle, i) => {
          if ([1, 4].includes(i)){
            return svg`<polygon class="sf1" @click="${toggleFill}"  points="${cache(triangle
              .map(p => p.join(","))
              .join(" "))}" fill="none" stroke="black"></polygon>
              <g transform="translate(${hexRadius * spacingFactor}, 0 )">
              <polygon class="sf1"  @click="${toggleFill}"  points="${cache(triangle
                .map(p => p.join(","))
                .join(" "))}" fill="none" stroke="black"></polygon></g>
              `

          }else{
            return svg`<polygon class="sf1" @click="${toggleFill}"  points="${cache(triangle
              .map(p => p.join(","))
              .join(" "))}" fill="none" stroke="black"></polygon>`
          }
        }
      ))}
    </g>
  `;
};

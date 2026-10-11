// tools/generate-globe-data.mjs
//
// Regenerates the land-dot data embedded in js/globe.js.
// Dev-only: the site itself needs no build step and never runs this.
//
//   mkdir /tmp/globe && cd /tmp/globe
//   npm init -y && npm i world-atlas@2 topojson-client@3 d3-geo@3
//   cp <repo>/tools/generate-globe-data.mjs . && node generate-globe-data.mjs
//
// Output: land.json — a flat [lat, lon, lat, lon, …] array. Paste it over the
// LAND constant in js/globe.js. Source data: Natural Earth 110m land
// (public domain), via the `world-atlas` package.
import { readFileSync, writeFileSync } from 'fs';
import { feature } from 'topojson-client';
import { geoContains } from 'd3-geo';

const topo = JSON.parse(readFileSync('node_modules/world-atlas/land-110m.json'));
const land = feature(topo, topo.objects.land);

const STEP = 1.8; // degrees between dot rows; smaller = denser = bigger file
const pts = [];
for (let lat = -58; lat <= 84; lat += STEP) {
  // Widen the longitude step toward the poles so dots stay evenly spaced.
  const k = Math.max(Math.cos((lat * Math.PI) / 180), 0.12);
  const lonStep = STEP / k;
  for (let lon = -180; lon < 180; lon += lonStep) {
    if (geoContains(land, [lon, lat])) {
      pts.push([Math.round(lat * 10) / 10, Math.round(lon * 10) / 10]);
    }
  }
}
console.log(`${pts.length} land dots`);
writeFileSync('land.json', JSON.stringify(pts.flat()));

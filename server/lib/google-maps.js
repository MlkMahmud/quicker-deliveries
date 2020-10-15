import { stringify } from 'querystring';
import { Client } from '@googlemaps/google-maps-services-js';

async function getOptimizedWaypointOrder({ origin, destination, waypoints }) {
  const client = new Client({});
  const config = {
    params: {
      origin,
      destination,
      waypoints,
      optimize: true,
      key: process.env.GCP_KEY,
    },
  };

  const { data: { status, routes, error_message } } = await client.directions(config);
  if (status !== 'OK') {
    throw new Error(error_message || status);
  }
  return routes[0].waypoint_order;
}

async function generateRouteUrl({
  origin, destination, waypoints, waypointOrder,
}) {
  const baseUrl = 'https://www.google.com/maps/dir/';
  const optimizedWaypoints = [];
  for (let i = 0, len = waypoints.length; i < len; i += 1) {
    optimizedWaypoints.push(waypoints[waypointOrder[i]]);
  }
  if (waypoints.length <= 3) {
    const params = {
      api: 1,
      origin,
      destination,
      travelmode: 'driving',
      waypoints: optimizedWaypoints.join('|'),
    };
    return `${baseUrl}?${stringify(params)}`;
  }
  optimizedWaypoints.unshift(origin);
  optimizedWaypoints.push(destination);
  return `${baseUrl}${optimizedWaypoints.join('/')}`;
}

export default {
  generateRouteUrl,
  getOptimizedWaypointOrder,
};

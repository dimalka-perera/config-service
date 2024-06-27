import { check, sleep } from 'k6';
import http from 'k6/http';
import { rampingArrivalScenario } from './scenarios/ramping-requests-scenario.js';
// import { v4 as uuid } from 'uuid' - Seems normal node modules are not working in K6
// have to use the libraries provided by K6 - Eg: See data.js
import { generateSubscriber } from './data.js';
import { BASE_URL, CREATE_CONFIG_PATH } from './endpoints.js';
import { createConfigScenario } from './scenarios/create-config-scenario.js';

export const options = {
  /*Following stages ramp up the requests to 100 during
    first 2s, and be stable for 10s and ramp down to 0 in 10s
  */
  // stages:[
  //   {duration: '2s', target: 100},
  //   {duration: '10s', target: 100},
  //   {duration: '10s', target: 0}
  // ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  },

  //cannot use simultaneously with stages
  scenarios: {
    'constant-arrival-scenario': {
      executor: 'constant-arrival-rate',
      duration: '30s', // total duration
      preAllocatedVUs: 25, // to allocate runtime resources
      rate: 250, // number of constant iterations given `timeUnit`
      timeUnit: '1s',
    },
    'ramping-arrival-scenario': rampingArrivalScenario,
    'create-config-scenario': createConfigScenario,
  },

  cloud: {
    projectID: 3702715,
    name: 'CONFIG-SERVICE-TEST',
  },
};

export function createConfig() {
  const data = generateSubscriber();
  const res = http.request('POST', `${BASE_URL}${CREATE_CONFIG_PATH}`, {
    serviceName: `Service${Math.random()}${data.name}`,
    config: {
      port: 3080,
      host: 'localhost',
    },
    createdAt: '2024-06-05T07:34:22.728Z',
    updatedAt: '2024-05-05T07:34:22.728Z',
  });
}

export default function () {
  const serviceName = 'inventoryservice-1';
  const res = http.request(
    'GET',
    `${BASE_URL}${CREATE_CONFIG_PATH}/${serviceName}`,
    {
      secret: 'secret text',
    },
  );
  check(res, {
    'status code 200': (res) => res.status == 200,
  });
  sleep(0.2);
}

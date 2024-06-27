export const rampingArrivalScenario = {
    executor: 'ramping-arrival-rate',
    stages: [
      { duration: '2s', target: 100 },
      { duration: '10s', target: 100 },
      { duration: '10s', target: 0 },
    ],
    preAllocatedVUs: 50,
  }
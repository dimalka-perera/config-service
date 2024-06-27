export const createConfigScenario= {
    exec:'createConfig',
    executor: 'constant-arrival-rate',
    rate: 150,
    timeUnit: '1s',
    duration: '25s',
    preAllocatedVUs: 10

  }
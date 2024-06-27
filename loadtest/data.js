//generating custom data for the performance test
import faker from "https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js";


export const generateSubscriber = () => ({
    name: `SUBSCRIPTION_TEST - ${faker.name.firstName()} ${faker.name.lastName()}`,
    title: faker.name.jobTitle(),
    company: faker.company.companyName(),
    email: faker.internet.email(),
    country: faker.address.country()
});
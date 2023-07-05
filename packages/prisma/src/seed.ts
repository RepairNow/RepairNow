import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { createJobs } from './jobsSeeds';

const prisma = new PrismaClient();
async function main() {
  const {
    bricolageJOB,
    plomberieJOB,
    electromenagerJOB,
    reparation2rouesJOB,
    electriciteJOB,
    serrurierJOB,
    jardinageJOB,
    reparationVoitureJOB,
  } = await createJobs();

  /** USERS */
  const client = await prisma.user.upsert({
    where: { email: 'client@gmail.com' },
    update: {},
    create: {
      email: 'client@gmail.com',
      password: await hash('password', 10),
      firstname: 'Client',
      lastname: 'Crocky',
      phoneNumber: '0606060606',
    },
  });
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      role: 'ADMIN',
      email: 'admin@gmail.com',
      password: await hash('admin', 10),
      firstname: 'Admin',
      lastname: 'Acajoumaboule',
      phoneNumber: '0707070707',
    },
  });
  const contractor = await prisma.user.upsert({
    where: { email: 'contractor@gmail.com' },
    update: {},
    create: {
      role: 'CONTRACTOR',
      email: 'contractor@gmail.com',
      password: await hash('contractor', 10),
      firstname: 'Contractor',
      lastname: 'Chouffeglotte',
      phoneNumber: '0712345678',
      jobs: {
        connect: [
          { id: bricolageJOB.id },
          { id: plomberieJOB.id },
          { id: electromenagerJOB.id },
          { id: reparation2rouesJOB.id },
          { id: electriciteJOB.id },
          { id: serrurierJOB.id },
          { id: jardinageJOB.id },
          { id: reparationVoitureJOB.id },
        ],
      },
    },
  });
  console.log({ client, admin, contractor });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

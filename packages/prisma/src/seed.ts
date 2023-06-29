import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();
async function main() {
  const client = await prisma.user.upsert({
    where: { email: 'client@gmail.com' },
    update: {},
    create: {
      email: 'client@gmail.com',
      password: await hash('password', 10),
      firstname: 'Client',
      lastname: 'Crocky',
      phoneNumber: '0606060606',
      jobs: {
        create: [
          {
            title: 'Follow Prisma on Facebook',
          },
          {
            title: 'Follow Nexus on Twitter',
          },
        ],
      },
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

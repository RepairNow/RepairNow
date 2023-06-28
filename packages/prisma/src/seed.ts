import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      password: await hash('password', 10),
      firstname: 'Alice',
      lastname: 'Dupont',
      phoneNumber: '0606060606',
      jobs: {
        create: {
          title: 'Check out Prisma with Next 13',
        },
      },
    },
  });
  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      password: await hash('password', 10),
      firstname: 'Bob',
      lastname: 'Le bricoleur',
      phoneNumber: '0707070707',
      jobs: {
        create: [
          {
            title: 'Follow Prisma on FB',
          },
          {
            title: 'Follow Nexus on FB',
          },
        ],
      },
    },
  });
  console.log({ alice, bob });
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

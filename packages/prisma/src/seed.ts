import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      password: 'password',
      firstname: 'Alice',
      lastname: 'Dupont',
      phoneNumber: '0606060606',
      jobs: {
        create: {
          title: 'Check out Prisma with Next.js',
        },
      },
    },
  });
  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      password: 'password',
      firstname: 'Bob',
      lastname: 'Le bricoleur',
      phoneNumber: '0707070707',
      jobs: {
        create: [
          {
            title: 'Follow Prisma on Twitter',
          },
          {
            title: 'Follow Nexus on Twitter',
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

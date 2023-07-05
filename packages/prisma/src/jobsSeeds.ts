import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function createJobs() {
  /** JOBS */
  const bricolageJOB = await prisma.job.upsert({
    where: { title: 'Bricolage' },
    update: {},
    create: {
      title: 'Bricolage',
    },
  });
  const electriciteJOB = await prisma.job.upsert({
    where: { title: 'Electricité' },
    update: {},
    create: {
      title: 'Electricité',
    },
  });
  const plomberieJOB = await prisma.job.upsert({
    where: { title: 'Plomberie' },
    update: {},
    create: {
      title: 'Plomberie',
    },
  });
  const serrurierJOB = await prisma.job.upsert({
    where: { title: 'Serrurier' },
    update: {},
    create: {
      title: 'Serrurier',
    },
  });
  const electromenagerJOB = await prisma.job.upsert({
    where: { title: 'Electroménager' },
    update: {},
    create: {
      title: 'Electroménager',
    },
  });
  const jardinageJOB = await prisma.job.upsert({
    where: { title: 'Jardinage' },
    update: {},
    create: {
      title: 'Jardinage',
    },
  });
  const reparation2rouesJOB = await prisma.job.upsert({
    where: { title: 'Réparation 2 roues (vélo, moto, scooter)' },
    update: {},
    create: {
      title: 'Réparation 2 roues (vélo, moto, scooter)',
    },
  });
  const reparationVoitureJOB = await prisma.job.upsert({
    where: { title: 'Réparation voiture' },
    update: {},
    create: {
      title: 'Réparation voiture',
    },
  });

  return {
    bricolageJOB,
    plomberieJOB,
    electromenagerJOB,
    reparation2rouesJOB,
    electriciteJOB,
    serrurierJOB,
    jardinageJOB,
    reparationVoitureJOB,
  };
}

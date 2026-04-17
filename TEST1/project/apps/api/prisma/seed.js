import { PrismaClient } from '@prisma/client';
import { createHash } from 'node:crypto';

const prisma = new PrismaClient();

async function main() {
  const password = createHash('sha256').update('password123').digest('hex');
  const user = await prisma.user.upsert({
    where: { email: 'demo@agileflow.io' },
    update: {},
    create: { email: 'demo@agileflow.io', name: 'Demo User', password },
  });
  console.log('Seeded user:', user.email);
}

main().finally(() => prisma.$disconnect());

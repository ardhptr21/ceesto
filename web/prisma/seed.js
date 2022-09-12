import { PrismaClient } from '@prisma/client';
import randomSiswa from '../faker/randomSiswa.js';

const prisma = new PrismaClient();
async function main() {
  try {
    // Siswa data seeding
    const siswa = randomSiswa(50);
    await prisma.siswa.createMany({ data: siswa });

    // when is success
    console.log('Data seeding success');
  } catch (err) {
    console.log(err.message);
  }
}

try {
  main();
} catch (err) {
  console.log(err.message);
} finally {
  prisma.$disconnect();
}

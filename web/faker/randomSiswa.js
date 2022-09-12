import { faker } from '@faker-js/faker';

const schema = () => {
  return {
    nama: faker.name.fullName(),
    kelas: 'XII SIJA 1',
    nis: faker.random.numeric(10),
  };
};

const siswa = [];

export default function randomSiswa(n) {
  for (let i = 0; i < n; i++) {
    siswa.push(schema());
  }
  return siswa;
}

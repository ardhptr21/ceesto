import prisma from '@/lib/prisma';

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return await handleGET(res);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const handleGET = async (res) => {
  try {
    const siswa = await prisma.siswa.findMany();
    return res.status(200).json({ status: 'success', siswa });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

export default handler;

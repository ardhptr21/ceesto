import prisma from '@/lib/prisma';

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return await handleGET(res);
    case 'DELETE':
      return await handleDELETE(req, res);
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

const handleDELETE = async (req, res) => {
  const { deletedIds } = req.body;
  const { all } = req.query;

  if (all === 'true') {
    try {
      const deleted = await prisma.siswa.deleteMany();
      return res.status(200).json({ status: 'success', deleted });
    } catch (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
  }

  if (!deletedIds) return res.status(400).json({ status: 'error', message: 'deletedIds is required' });

  try {
    const deleted = await prisma.siswa.deleteMany({ where: { id: { in: deletedIds } } });
    return res.status(200).json({ status: 'success', deleted });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

export default handler;

import { useState } from 'react';
import Tr from '../components/tables/Tr';
import { SiMicrosoftexcel } from 'react-icons/si';
import { BsTrash, BsInfoCircle } from 'react-icons/bs';
import useSWR from 'swr';
import axios from 'axios';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Head from 'next/head';
import * as XLSX from 'xlsx';

export default function Home() {
  const [selectedFields, setSelectedFields] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const { data } = useSWR('/api/siswa');
  const router = useRouter();
  const [currentlyUpdate, setCurrentlyUpdate] = useState(false);

  const handleChangeSelectAll = () => {
    setIsSelectAll(!isSelectAll);
    setSelectedFields([]);
  };

  const handleChange = (e, id) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedFields([...selectedFields, id]);
    } else {
      setSelectedFields(selectedFields.filter((item) => item !== id));
    }
  };

  const handleDelete = async () => {
    const isConfirm = window.confirm(
      `Apakah anda yakin ingin menghapus ${isSelectAll ? 'semua' : selectedFields.length} data?`
    );
    if (!isConfirm) return false;

    let uri = '/api/siswa';
    if (isSelectAll) {
      uri += '?all=true';
    }

    try {
      const res = await axios.delete(uri, { data: { deletedIds: selectedFields } });
      if (res.status === 200) {
        toast.success(`Berhasil menghapus ${isSelectAll ? 'semua' : selectedFields.length} data`);
        setCurrentlyUpdate(true);
      } else {
        toast.error('Terjadi kesalahan');
      }
    } catch (err) {
      toast.error('Data gagal dihapus');
      console.log(err.message);
    } finally {
      setSelectedFields([]);
      setIsSelectAll(false);
    }
  };

  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data?.siswa);
    XLSX.utils.book_append_sheet(wb, ws, 'Daftar Absen');
    XLSX.writeFile(wb, 'Daftar Absen.xlsx');
  };

  return (
    <>
      <Head>
        <title>Ceesto Dashboard</title>
      </Head>
      <div className="space-y-5">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold">Ceesto Dashboard</h1>
          <p>Kelola dan lihat absensi aplikasi Ceesto</p>
        </div>
        {data?.siswa?.length ? (
          <>
            <div className="flex justify-between items-center">
              <div className="space-x-3">
                <button onClick={handleExport} type="button" className="btn gap-2 btn-success">
                  <SiMicrosoftexcel />
                  Export
                </button>
                {(isSelectAll || !!selectedFields.length) && (
                  <button type="button" onClick={handleDelete} className="btn btn-error gap-2">
                    <BsTrash />
                    Hapus
                  </button>
                )}
              </div>
              {(isSelectAll || !!selectedFields.length) && (
                <div>
                  <p className="text-lg">
                    {isSelectAll ? 'Semua item dipilih' : `${selectedFields.length} item dipilih`}
                  </p>
                </div>
              )}
            </div>
            {currentlyUpdate && (
              <div class="alert shadow-lg">
                <div>
                  <BsInfoCircle className="text-info" size={18} />
                  <span>Tidak terjadi perubahan?</span>
                </div>
                <div class="flex-none">
                  <button type="button" onClick={() => setCurrentlyUpdate(false)} class="btn btn-sm btn-ghost">
                    Tutup
                  </button>
                  <button type="button" class="btn btn-sm btn-primary" onClick={router.reload}>
                    Refresh
                  </button>
                </div>
              </div>
            )}
            <div className="overflow-x-auto w-full rounded-xl border-2">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Kelas</th>
                    <th>NIS</th>
                    <th>
                      <label className="tooltip tooltip-left" data-tip="Pilih semua">
                        <input
                          type="checkbox"
                          onChange={handleChangeSelectAll}
                          checked={isSelectAll}
                          className="checkbox"
                        />
                      </label>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.siswa?.map((data, idx) => (
                    <Tr
                      key={data.id}
                      idx={idx + 1}
                      checked={isSelectAll ? isSelectAll : selectedFields.includes(data.id)}
                      onChange={(e) => handleChange(e, data.id)}
                      nama={data.nama}
                      kelas={data.kelas}
                      nis={data.nis}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="flex flex-col">
            <div className="h-72 relative">
              <Image src="/no-data.svg" alt="no data" layout="fill" className="h-full w-full" />
            </div>
            <div className="text-center space-y-3">
              <h3 className="text-3xl mt-10 font-extrabold">Data masih kosong</h3>
              <p>
                Belum ada data absensi yang masuk untuk saat ini.{' '}
                <span onClick={router.reload} className="underline cursor-pointer">
                  Refresh
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

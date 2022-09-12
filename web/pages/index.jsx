import { useState } from 'react';
import Tr from '../components/tables/Tr';
import { SiMicrosoftexcel } from 'react-icons/si';
import { BsTrash } from 'react-icons/bs';
import useSWR from 'swr';

export default function Home() {
  const [selectedFields, setSelectedFields] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const { data } = useSWR('/api/siswa');

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

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h1 className="text-4xl font-extrabold">Cheesto Dashboard</h1>
        <p>Kelola dan lihat absensi aplikasi Cheesto</p>
      </div>
      <div className="space-x-3">
        <button type="button" className="btn gap-2 btn-success">
          <SiMicrosoftexcel />
          Export
        </button>
        {(isSelectAll || !!selectedFields.length) && (
          <button type="button" className="btn btn-error gap-2">
            <BsTrash />
            Hapus
          </button>
        )}
      </div>
      <div className="overflow-x-auto w-full rounded-xl border-2">
        <table className="table w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Kelas</th>
              <th>NIS</th>
              <th>
                <label>
                  <input type="checkbox" onChange={handleChangeSelectAll} checked={isSelectAll} className="checkbox" />
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
    </div>
  );
}

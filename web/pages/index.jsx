import { useState } from 'react';
import Tr from '../components/tables/Tr';

const datas = [
  {
    id: 1,
    nama: 'Ardhi Putra Pradana',
    kelas: 'XII SIJA 1',
    nis: '2919392939',
  },
  {
    id: 2,
    nama: 'Raul Maldini',
    kelas: 'XII SIJA 1',
    nis: '1029392939',
  },
  {
    id: 3,
    nama: 'Ronaldo Nazario',
    kelas: 'XII SIJA 1',
    nis: '2939392939',
  },
];

export default function Home() {
  const [selectedFields, setSelectedFields] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);

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
      {(isSelectAll || !!selectedFields.length) && (
        <div>
          <button type="button" className="btn btn-error">
            Hapus
          </button>
        </div>
      )}
      <div className="overflow-x-auto w-full rounded-xl border-2">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" onChange={handleChangeSelectAll} checked={isSelectAll} className="checkbox" />
                </label>
              </th>
              <th>Nama</th>
              <th>Kelas</th>
              <th>NIS</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data) => (
              <Tr
                key={data.id}
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

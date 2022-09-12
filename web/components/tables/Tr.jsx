export default function Tr({ idx, nama, kelas, nis, ...props }) {
  return (
    <tr>
      <td>{idx}</td>
      <td>{nama}</td>
      <td>{kelas}</td>
      <td>{nis}</td>
      <th>
        <label>
          <input type="checkbox" className="checkbox" {...props} />
        </label>
      </th>
    </tr>
  );
}

export default function Tr({ nama, kelas, nis, ...props }) {
  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox" {...props} />
        </label>
      </th>
      <td>{nama}</td>
      <td>{kelas}</td>
      <td>{nis}</td>
    </tr>
  );
}

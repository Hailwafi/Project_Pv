import { useLocation } from 'react-router-dom';

function TesIsi2() {
  const location = useLocation();
  const ticketData = location.state?.ticketData; // Data tiket dari state navigasi

  if (!ticketData) {
    return <p>Data tiket tidak tersedia. Coba ulangi pencarian.</p>;
  }

  return (
    <div>
      <h1>Detail Tiket</h1>
      <p><strong>Kode Tiket:</strong> {ticketData.data.kode_tiket}</p>
      <p><strong>Status:</strong> {ticketData.status}</p>
      <p><strong>Tipe:</strong> {ticketData.type}</p>
      {/* Tampilkan informasi lain yang relevan dari ticketData */}
    </div>
  );
}


export default TesIsi2;

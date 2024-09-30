import { useNavigate } from 'react-router-dom';

function TesIsi() {
  const navigate = useNavigate();

  const handleButtonClick = (reportName, category) => {
    navigate('/FromPb', { state: { reportName, category } });
  };

  return (
    <div>
      <button onClick={() => handleButtonClick('Laporan 1', 'Kategori A')}>
        Laporan 1 - Kategori A
      </button>
      <button onClick={() => handleButtonClick('Laporan 2', 'Kategori B')}>
        Laporan 2 - Kategori B
      </button>
      <button onClick={() => handleButtonClick('Laporan 3', 'Kategori C')}>
        Laporan 3 - Kategori C
      </button>
    </div>
  );
};
export default TesIsi;
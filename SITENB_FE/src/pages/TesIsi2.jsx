import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function TesIsi2() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    reportName: '',
    category: ''
  });

  useEffect(() => {
    if (location.state) {
      setFormData({
        reportName: location.state.reportName || '',
        category: location.state.category || ''
      });
    }
  }, [location.state]);

  // Fungsi untuk menangani onClick di form
  const handleSubmit = () => {
    // Lakukan sesuatu dengan formData, misalnya kirim ke API atau console log
    console.log('Data Form:', formData);

    // Contoh pengiriman data ke server
    // axios.post('/api/saveForm', formData)
    //   .then(response => {
    //     console.log('Data tersimpan', response);
    //   })
    //   .catch(error => {
    //     console.error('Error saat menyimpan data', error);
    //   });
  };

  return (
    <form>
      <div>
        <label>Report Name:</label>
        <input
          type="text"
          value={formData.reportName}
          onChange={(e) =>
            setFormData({ ...formData, reportName: e.target.value })
          }
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        />
      </div>
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}
export default TesIsi2;

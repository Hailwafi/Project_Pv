import { useState } from 'react';

const TesIsi = () => {

  const ticketData = {
    "Kategori A": {
      "Laptop": ["Permohonan", "Kendala"],
      "Komputer": ["Permohonan", "Kendala"],
      "WiFi": ["Permohonan", "Kendala"],
      "Printer": ["Permohonan"]
    },
    "Kategori B": {
      "Kebocoran Data": ["Laporan Insiden"],
      "Web Defacement": ["Laporan Insiden"]
    },
    "Kategori C": {
      "Unauthorized Access": ["Laporan Insiden"],
      "Malicious Code": ["Laporan Insiden"],
      "Denial Of Service": ["Laporan Insiden"]
    }
  };


  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedTicketType, setSelectedTicketType] = useState("");
  
  // Fungsi untuk menangani perubahan kategori
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCategory(""); 
    setSelectedTicketType("");
  };

  // Fungsi untuk menangani perubahan sub-kategori
  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
    setSelectedTicketType("");
  };

  // Fungsi untuk menangani perubahan jenis tiket
  const handleTicketTypeChange = (e) => {
    setSelectedTicketType(e.target.value);
  };

  return (
    <form className="space-y-4">
      {/* Dropdown untuk Kategori */}
      <div>
        <label htmlFor="kategori" className="block text-sm font-medium text-gray-700">
          Kategori
        </label>
        <select
          id="kategori"
          name="kategori"
          value={selectedCategory}
          // onChange={handleCategoryChange}
          onChange={(e) =>
            setFormData({ ...formData, kategori: e.target.value })
          }
        
          className="block w-full mt-1 rounded-md border-gray-300 shadow-sm"
        >
          <option value="">Pilih Kategori</option>
          {Object.keys(ticketData).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown untuk Sub-Kategori */}
      {selectedCategory && (
        <div>
          <label htmlFor="sub_kategori" className="block text-sm font-medium text-gray-700">
            Sub Kategori
          </label>
          <select
            id="sub_kategori"
            name="sub_kategori"
            value={selectedSubCategory}
            onChange={handleSubCategoryChange}
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm"
          >
            <option value="">Pilih Sub Kategori</option>
            {Object.keys(ticketData[selectedCategory]).map((subCategory) => (
              <option key={subCategory} value={subCategory}>
                {subCategory}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Dropdown untuk Jenis Tiket */}
      {selectedSubCategory && (
        <div>
          <label htmlFor="jenis_tiket" className="block text-sm font-medium text-gray-700">
            Jenis Tiket
          </label>
          <select
            id="jenis_tiket"
            name="jenis_tiket"
            value={selectedTicketType}
            onChange={handleTicketTypeChange}
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm"
          >
            <option value="">Pilih Jenis Tiket</option>
            {ticketData[selectedCategory][selectedSubCategory].map((ticketType) => (
              <option key={ticketType} value={ticketType}>
                {ticketType}
              </option>
            ))}
          </select>
        </div>
      )}
    </form>
  );
};

export default TesIsi;
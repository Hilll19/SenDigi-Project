import React from 'react';
import Navbar from '../../components/Navbar';

const DownloadPage = () => {
  const handleDownload = (url, filename) => {
    // Buat elemen <a> untuk memicu unduhan
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.setAttribute('download', filename);

    // Sembunyikan elemen link dari tampilan
    downloadLink.style.display = 'none';

    // Tambahkan elemen ke dalam dokumen
    document.body.appendChild(downloadLink);

    // Klik secara otomatis pada elemen link untuk memulai unduhan
    downloadLink.click();

    // Hapus elemen link setelah unduhan selesai
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Download Release</h2>
        <p className="mb-4">
          Temporarily while the state of the app is in beta, we provide a download section here to accommodate faster delivery in beta state. When the application is available in the store, this page will be removed.
        </p>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">v1.1-beta (Latest Release)</h3>
          <h4 className="font-bold mb-2">What's Changed?</h4>
          <ul className="list-disc pl-4">
            <li>Refactor Lock UI by @nathanpasca in #13</li>
            <li>Refactor English by @nathanpasca in #15 Full</li>
          </ul>
          <button 
            className="bg-[#00df9a] hover:bg-[#50cba4] text-black font-bold py-2 px-4 rounded mt-2"
            onClick={() => handleDownload('https://github.com/resqiar/sendigi-app/releases/download/v1.1-beta/sendigi-release.apk', 'sendigi-release-v1.1-beta.apk')}
          >
            Download Release
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">v1.0-beta</h3>
          <h4 className="font-bold mb-2">What's Changed?</h4>
          <ul className="list-disc pl-4">
            {/* Tambahkan item-item lainnya di sini */}
          </ul>
          <button 
            className="bg-[#00df9a] hover:bg-[#50cba4] text-black font-bold py-2 px-4 rounded"
            onClick={() => handleDownload('https://github.com/resqiar/sendigi-app/releases/download/v1.0-beta/sendigi-release.apk', 'sendigi-release-v1.0-beta.apk')}
          >
            Download Release
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;

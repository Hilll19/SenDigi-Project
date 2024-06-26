import React from "react";
import { FaAndroid } from "react-icons/fa";

function Connect() {
  const handleDownload = () => {
    // URL download APK yang ditentukan
    const apkDownloadUrl = 'https://github.com/resqiar/sendigi-app/releases/download/v1.1-beta/sendigi-release.apk';

    // Buat elemen <a> untuk memicu unduhan
    const downloadLink = document.createElement('a');
    downloadLink.href = apkDownloadUrl;
    downloadLink.setAttribute('download', 'sendigi-release.apk');

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
    <div className='w-full py-16 text-black px-4 bg-[#FAF9F6] '>
      <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Want to try APK Project now?</h1>
          <p>Install APK in your kids gadget account to start monitoring!</p>
        </div>
        <div className='my-4'>
          <button className='bg-[#0197b2] w-[200px] rounded-md font-medium ml-4 my-6 px-6 py-3 text-white transition duration-300 ease-in-out hover:scale-105 transform flex items-center justify-center' onClick={handleDownload}>
            <FaAndroid size={24} className="mr-2" />
            Download APK
          </button>
          <p className="text-black mt-2">
            Download APK to try <span className='text-[#0197b2]'>SenDigi Project</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Connect;

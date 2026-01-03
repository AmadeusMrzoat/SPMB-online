<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Penerimaan Siswa Baru Online</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <!-- Screenshot Lib -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <!-- Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <style>
        body { font-family: 'Inter', sans-serif; }
        .form-label { display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500; color: #111827; }
        .form-input { display: block; width: 100%; padding: 0.625rem; background-color: #ffffff; border: 1px solid #d1d5db; border-radius: 0.5rem; font-size: 0.875rem; color: #111827; transition: all 0.2s; }
        .form-input:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2); }
        .section-title { font-size: 1.25rem; font-weight: 700; color: #1f2937; margin-top: 2rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #e5e7eb; display: flex; align-items: center; gap: 0.5rem; }
        
        @media print {
            body * { visibility: hidden; }
            #modal, #modal * { visibility: visible; }
            #modal { position: absolute; left: 0; top: 0; width: 100%; height: 100%; background: white; display: flex !important; justify-content: center; align-items: flex-start; padding-top: 20px; }
            #download-area { box-shadow: none; border: none; width: 100%; max-width: 400px; }
            .no-print { display: none !important; }
        }
    </style>
</head>
<body class="bg-gray-50 text-gray-900 py-8">

    <div id="app-container" class="container mx-auto px-4 max-w-4xl">
        <header class="text-center mb-10">
            <h1 class="text-3xl font-bold text-gray-900">Formulir SPMB & Seleksi Online</h1>
            <p class="text-gray-500 mt-2">SDIT Al Madinah Pontianak - Tahun Ajaran 2026/2027</p>
        </header>

        <div class="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
            <form id="ppdb-form">
                
                <!-- BAGIAN A -->
                <div class="mb-8">
                    <h2 class="section-title text-blue-600">A. Keterangan Peserta Didik</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="md:col-span-2">
                            <label class="form-label">Nama Lengkap</label>
                            <input type="text" id="inputNama" name="Nama Lengkap" required class="form-input" placeholder="Sesuai Akta Kelahiran">
                        </div>
                        <div><label class="form-label">NIK</label><input type="number" name="NIK" required class="form-input"></div>
                        <div><label class="form-label">NISN</label><input type="number" name="NISN" required class="form-input"></div>
                        <div><label class="form-label">No. KK</label><input type="number" name="No KK" required class="form-input"></div>
                        <div>
                            <label class="form-label">Jenis Kelamin</label>
                            <select name="Jenis Kelamin" required class="form-input"><option value="">Pilih...</option><option value="Laki-laki">Laki-laki</option><option value="Perempuan">Perempuan</option></select>
                        </div>
                        <div><label class="form-label">Tempat Lahir</label><input type="text" name="Tempat Lahir" required class="form-input"></div>
                        <div><label class="form-label">Tanggal Lahir</label><input type="date" name="Tanggal Lahir" required class="form-input"></div>
                        <div><label class="form-label">Asal Sekolah</label><input type="text" name="Asal Sekolah" required class="form-input"></div>
                        <div><label class="form-label">NPSN TK</label><input type="number" name="NPSN TK" class="form-input"></div>
                    </div>

                    <div class="mt-8 mb-4">
                        <h3 class="font-semibold text-gray-800 border-b pb-2 mb-4">Alamat & Domisili</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="md:col-span-2"><label class="form-label">Alamat Sesuai KK</label><textarea name="Alamat KK" rows="2" required class="form-input"></textarea></div>
                            <div class="md:col-span-2"><label class="form-label">Alamat Domisili</label><textarea name="Alamat Lengkap" rows="2" required class="form-input"></textarea></div>
                            <div><label class="form-label">RT</label><input type="number" name="RT" required class="form-input"></div>
                            <div><label class="form-label">RW</label><input type="number" name="RW" required class="form-input"></div>
                            <div><label class="form-label">Kelurahan</label><input type="text" name="Kelurahan" required class="form-input"></div>
                            <div><label class="form-label">Kecamatan</label><input type="text" name="Kecamatan" required class="form-input"></div>
                            <div><label class="form-label">Kabupaten/Kota</label><input type="text" name="Kabupaten/Kota" required class="form-input"></div>
                            
                            <!-- UPDATE TEMPAT TINGGAL -->
                            <div>
                                <label class="form-label">Tempat Tinggal</label>
                                <select name="Tempat Tinggal" class="form-input">
                                    <option value="Bersama orang tua">Bersama orang tua</option>
                                    <option value="Wali">Wali</option>
                                    <option value="Asrama">Asrama</option>
                                    <option value="Lainnya">Lainnya</option>
                                </select>
                            </div>

                            <!-- UPDATE MODA TRANSPORTASI -->
                            <div>
                                <label class="form-label">Moda Transportasi</label>
                                <select name="Moda Transportasi" class="form-input">
                                    <option value="Jalan kaki">Jalan kaki</option>
                                    <option value="Sepeda">Sepeda</option>
                                    <option value="Sepeda motor">Sepeda motor</option>
                                    <option value="Ojek">Ojek</option>
                                    <option value="Mobil">Mobil</option>
                                    <option value="Mobil/bus antarjemput">Mobil/bus antarjemput</option>
                                    <option value="Angkutan umum">Angkutan umum</option>
                                    <option value="Lainnya">Lainnya</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="mt-8 mb-4">
                        <h3 class="font-semibold text-gray-800 border-b pb-2 mb-4">Data Fisik</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div><label class="form-label">Penyakit Berat</label><input type="text" name="Penyakit Berat" class="form-input"></div>
                            <div><label class="form-label">Pantangan Makan</label><input type="text" name="Pantangan Makan" class="form-input"></div>
                            <div><label class="form-label">Tinggi (cm)</label><input type="number" name="Tinggi Badan" class="form-input"></div>
                            <div><label class="form-label">Berat (kg)</label><input type="number" name="Berat Badan" class="form-input"></div>
                            <div><label class="form-label">Jarak (km)</label><input type="number" step="0.1" name="Jarak Rumah" class="form-input"></div>
                            <div><label class="form-label">Waktu Tempuh (menit)</label><input type="number" name="Waktu Tempuh" class="form-input"></div>
                            <div><label class="form-label">Anak Ke</label><input type="number" name="Anak Ke" class="form-input"></div>
                            <div><label class="form-label">Jml Saudara</label><input type="number" name="Jumlah Saudara" class="form-input"></div>
                            <div><label class="form-label">Hobby</label><input type="text" name="Hobby" class="form-input"></div>
                            <div><label class="form-label">Cita-cita</label><input type="text" name="Cita-cita" class="form-input"></div>
                            <div class="md:col-span-2"><label class="form-label text-blue-600">Saudara di SDIT?</label><input type="text" name="Saudara di SDIT" class="form-input bg-blue-50"></div>
                        </div>
                    </div>
                </div>

                <!-- BAGIAN B: ORANG TUA -->
                <div class="mb-8">
                    <h2 class="section-title text-emerald-600">B. Data Orang Tua</h2>
                    <div class="space-y-6">
                        <!-- AYAH -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="md:col-span-2"><label class="form-label">Nama Ayah</label><input type="text" name="Nama Ayah" required class="form-input"></div>
                            
                            <!-- TAMBAHAN: NIK AYAH -->
                            <div><label class="form-label">NIK Ayah</label><input type="number" name="NIK Ayah" required class="form-input"></div>

                            <div><label class="form-label">Tahun Lahir</label><input type="number" name="Tahun Lahir Ayah" class="form-input"></div>
                            <div><label class="form-label">Kewarganegaraan</label><select name="WN Ayah" class="form-input"><option value="WNI">WNI</option><option value="WNA">WNA</option></select></div>
                            
                            <!-- UPDATE PENDIDIKAN AYAH -->
                            <div>
                                <label class="form-label">Pendidikan Terakhir</label>
                                <select name="Pendidikan Ayah" class="form-input">
                                    <option value="">Pilih...</option>
                                    <option value="SD/sederajat">SD/sederajat</option>
                                    <option value="SMP/sederajat">SMP/sederajat</option>
                                    <option value="SMA/sederajat">SMA/sederajat</option>
                                    <option value="D1">D1</option>
                                    <option value="D2">D2</option>
                                    <option value="D3">D3</option>
                                    <option value="D4/S1">D4/S1</option>
                                    <option value="S2">S2</option>
                                    <option value="S3">S3</option>
                                    <option value="lainnya">lainnya</option>
                                </select>
                            </div>
                            
                            <!-- Pekerjaan Lengkap -->
                            <div>
                                <label class="form-label">Pekerjaan Utama</label>
                                <select name="Pekerjaan Ayah" required class="form-input">
                                    <option value="">Pilih Pekerjaan...</option>
                                    <option value="PNS/TNI/POLRI">PNS/TNI/POLRI</option>
                                    <option value="Wiraswasta">Wiraswasta</option>
                                    <option value="Wirausaha">Wirausaha</option>
                                    <option value="Karyawan Swasta">Karyawan Swasta</option>
                                    <option value="Pedagang Kecil">Pedagang Kecil</option>
                                    <option value="Pedagang Besar">Pedagang Besar</option>
                                    <option value="Buruh">Buruh</option>
                                    <option value="Nelayan">Nelayan</option>
                                    <option value="Peternak">Peternak</option>
                                    <option value="Pensiunan">Pensiunan</option>
                                    <option value="Sudah Meninggal">Sudah Meninggal</option>
                                    <option value="Tidak Bekerja">Tidak Bekerja</option>
                                    <option value="Lainnya">Lainnya</option>
                                </select>
                            </div>

                            <div>
                                <label class="form-label">Penghasilan</label>
                                <select name="Penghasilan Ayah" class="form-input">
                                    <option value="">Pilih...</option>
                                    <option value="Kurang dari Rp. 500.000">Kurang dari Rp. 500.000</option>
                                    <option value="Rp. 500.000 - Rp 999.999">Rp. 500.000 - Rp 999.999</option>
                                    <option value="Rp. 1.000.000 - Rp. 1.999.999">Rp. 1.000.000 - Rp. 1.999.999</option>
                                    <option value="Rp. 2.000.000 - Rp. 4.999.999">Rp. 2.000.000 - Rp. 4.999.999</option>
                                    <option value="Rp. 5.000.000 - Rp. 20.000.000">Rp. 5.000.000 - Rp. 20.000.000</option>
                                    <option value="Lebih dari Rp. 20.000.000">Lebih dari Rp. 20.000.000</option>
                                    <option value="Tidak Berpenghasilan">Tidak Berpenghasilan</option>
                                </select>
                            </div>
                            <div><label class="form-label">No. WA</label><input type="tel" name="Telp Ayah" required class="form-input"></div>
                        </div>

                        <!-- IBU -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-4">
                            <div class="md:col-span-2"><label class="form-label">Nama Ibu</label><input type="text" name="Nama Ibu" required class="form-input"></div>
                            
                            <!-- TAMBAHAN: NIK IBU -->
                            <div><label class="form-label">NIK Ibu</label><input type="number" name="NIK Ibu" required class="form-input"></div>

                            <div><label class="form-label">Tahun Lahir</label><input type="number" name="Tahun Lahir Ibu" class="form-input"></div>
                            <div><label class="form-label">Kewarganegaraan</label><select name="WN Ibu" class="form-input"><option value="WNI">WNI</option><option value="WNA">WNA</option></select></div>
                            
                            <!-- UPDATE PENDIDIKAN IBU -->
                            <div>
                                <label class="form-label">Pendidikan Terakhir</label>
                                <select name="Pendidikan Ibu" class="form-input">
                                    <option value="">Pilih...</option>
                                    <option value="SD/sederajat">SD/sederajat</option>
                                    <option value="SMP/sederajat">SMP/sederajat</option>
                                    <option value="SMA/sederajat">SMA/sederajat</option>
                                    <option value="D1">D1</option>
                                    <option value="D2">D2</option>
                                    <option value="D3">D3</option>
                                    <option value="D4/S1">D4/S1</option>
                                    <option value="S2">S2</option>
                                    <option value="S3">S3</option>
                                    <option value="lainnya">lainnya</option>
                                </select>
                            </div>
                            
                            <!-- Pekerjaan Lengkap -->
                            <div>
                                <label class="form-label">Pekerjaan Utama</label>
                                <select name="Pekerjaan Ibu" required class="form-input">
                                    <option value="">Pilih Pekerjaan...</option>
                                    <option value="PNS/TNI/POLRI">PNS/TNI/POLRI</option>
                                    <option value="Wiraswasta">Wiraswasta</option>
                                    <option value="Wirausaha">Wirausaha</option>
                                    <option value="Karyawan Swasta">Karyawan Swasta</option>
                                    <option value="Pedagang Kecil">Pedagang Kecil</option>
                                    <option value="Pedagang Besar">Pedagang Besar</option>
                                    <option value="Buruh">Buruh</option>
                                    <option value="Nelayan">Nelayan</option>
                                    <option value="Peternak">Peternak</option>
                                    <option value="Pensiunan">Pensiunan</option>
                                    <option value="Sudah Meninggal">Sudah Meninggal</option>
                                    <option value="Tidak Bekerja">Tidak Bekerja</option>
                                    <option value="IRT">Ibu Rumah Tangga</option>
                                    <option value="Lainnya">Lainnya</option>
                                </select>
                            </div>

                            <div>
                                <label class="form-label">Penghasilan</label>
                                <select name="Penghasilan Ibu" class="form-input">
                                    <option value="">Pilih...</option>
                                    <option value="Kurang dari Rp. 500.000">Kurang dari Rp. 500.000</option>
                                    <option value="Rp. 500.000 - Rp 999.999">Rp. 500.000 - Rp 999.999</option>
                                    <option value="Rp. 1.000.000 - Rp. 1.999.999">Rp. 1.000.000 - Rp. 1.999.999</option>
                                    <option value="Rp. 2.000.000 - Rp. 4.999.999">Rp. 2.000.000 - Rp. 4.999.999</option>
                                    <option value="Rp. 5.000.000 - Rp. 20.000.000">Rp. 5.000.000 - Rp. 20.000.000</option>
                                    <option value="Lebih dari Rp. 20.000.000">Lebih dari Rp. 20.000.000</option>
                                    <option value="Tidak Berpenghasilan">Tidak Berpenghasilan</option>
                                </select>
                            </div>
                            <div><label class="form-label">No. WA</label><input type="tel" name="Telp Ibu" required class="form-input"></div>
                        </div>
                    </div>
                </div>

                <!-- BAGIAN C: WALI -->
                <div class="mb-8">
                    <h2 class="section-title text-gray-600">C. Wali (Jika Ada)</h2>
                    <div class="bg-gray-50 p-6 rounded-lg border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="md:col-span-2"><label class="form-label">Nama Wali</label><input type="text" name="Nama Wali" class="form-input"></div>
                        <div><label class="form-label">Hubungan</label><input type="text" name="Hubungan Wali" class="form-input"></div>
                        <div><label class="form-label">Tahun Lahir</label><input type="number" name="Tahun Lahir Wali" class="form-input"></div>
                        <div><label class="form-label">Agama</label><select name="Agama Wali" class="form-input"><option value="Islam">Islam</option></select></div>
                        <div class="md:col-span-2"><label class="form-label">Alamat</label><textarea name="Alamat Wali" rows="2" class="form-input"></textarea></div>
                        
                        <!-- ADDED PENDIDIKAN WALI -->
                        <div>
                            <label class="form-label">Pendidikan Terakhir</label>
                            <select name="Pendidikan Wali" class="form-input">
                                <option value="">Pilih...</option>
                                <option value="SD/sederajat">SD/sederajat</option>
                                <option value="SMP/sederajat">SMP/sederajat</option>
                                <option value="SMA/sederajat">SMA/sederajat</option>
                                <option value="D1">D1</option>
                                <option value="D2">D2</option>
                                <option value="D3">D3</option>
                                <option value="D4/S1">D4/S1</option>
                                <option value="S2">S2</option>
                                <option value="S3">S3</option>
                                <option value="lainnya">lainnya</option>
                            </select>
                        </div>

                        <!-- Dropdown Pekerjaan Lengkap (Wali) -->
                        <div>
                            <label class="form-label">Pekerjaan</label>
                            <select name="Pekerjaan Wali" class="form-input">
                                <option value="">Pilih Pekerjaan...</option>
                                <option value="PNS/TNI/POLRI">PNS/TNI/POLRI</option>
                                <option value="Wiraswasta">Wiraswasta</option>
                                <option value="Wirausaha">Wirausaha</option>
                                <option value="Karyawan Swasta">Karyawan Swasta</option>
                                <option value="Pedagang Kecil">Pedagang Kecil</option>
                                <option value="Pedagang Besar">Pedagang Besar</option>
                                <option value="Buruh">Buruh</option>
                                <option value="Nelayan">Nelayan</option>
                                <option value="Peternak">Peternak</option>
                                <option value="Pensiunan">Pensiunan</option>
                                <option value="Sudah Meninggal">Sudah Meninggal</option>
                                <option value="Tidak Bekerja">Tidak Bekerja</option>
                                <option value="Lainnya">Lainnya</option>
                            </select>
                        </div>
                        
                        <!-- Dropdown Penghasilan Wali -->
                        <div>
                            <label class="form-label">Penghasilan</label>
                            <select name="Penghasilan Wali" class="form-input">
                                <option value="">Pilih...</option>
                                <option value="Kurang dari Rp. 500.000">Kurang dari Rp. 500.000</option>
                                <option value="Rp. 500.000 - Rp 999.999">Rp. 500.000 - Rp 999.999</option>
                                <option value="Rp. 1.000.000 - Rp. 1.999.999">Rp. 1.000.000 - Rp. 1.999.999</option>
                                <option value="Rp. 2.000.000 - Rp. 4.999.999">Rp. 2.000.000 - Rp. 4.999.999</option>
                                <option value="Rp. 5.000.000 - Rp. 20.000.000">Rp. 5.000.000 - Rp. 20.000.000</option>
                                <option value="Lebih dari Rp. 20.000.000">Lebih dari Rp. 20.000.000</option>
                                <option value="Tidak Berpenghasilan">Tidak Berpenghasilan</option>
                            </select>
                        </div>

                        <div><label class="form-label">No. Telepon</label><input type="tel" name="Telp Wali" class="form-input"></div>
                    </div>
                </div>

                <!-- INFORMASI JADWAL OTOMATIS -->
                <div class="mb-8 bg-blue-50 p-6 rounded-xl border border-blue-100 text-center">
                    <h2 class="text-blue-800 font-bold text-lg mb-2">
                        <i data-lucide="calendar-check" class="inline mr-1"></i> Informasi Jadwal Observasi
                    </h2>
                    <p class="text-sm text-gray-600">
                        Jadwal Observasi akan <strong>ditentukan secara otomatis</strong> oleh sistem setelah Anda menekan tombol kirim di bawah. 
                        Pastikan data yang diisi sudah benar.
                    </p>
                    <input type="hidden" name="tglSeleksi" value="AUTO">
                    <input type="hidden" name="jamSeleksi" value="AUTO">
                    <input type="hidden" name="noAntrian" value="AUTO">
                </div>

                <!-- Submit -->
                <div class="mt-10 pt-6 border-t">
                    <button type="submit" id="submit-btn" class="w-full bg-blue-600 text-white font-bold text-lg px-8 py-4 rounded-lg hover:bg-blue-700 transition shadow-sm flex justify-center items-center gap-2">
                        <span>Kirim & Dapatkan Jadwal</span><i data-lucide="send" class="w-5 h-5"></i>
                    </button>
                    <p class="text-xs text-center text-gray-400 mt-2">Mohon tunggu beberapa saat setelah menekan tombol kirim.</p>
                </div>
            </form>
        </div>
    </div>

    <!-- MODAL HASIL -->
    <div id="modal" class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 hidden opacity-0 transition-opacity duration-300 overflow-y-auto">
        <div class="bg-white rounded-xl shadow-2xl max-w-lg w-full transform scale-95 transition-transform duration-300 flex flex-col my-8">
            <div class="flex justify-between items-center p-4 border-b bg-gray-50 rounded-t-xl no-print">
                <h3 class="font-bold text-gray-700">Pendaftaran Berhasil!</h3>
                <div class="flex gap-2">
                    <button onclick="window.print()" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><i data-lucide="printer" class="w-4 h-4"></i> Cetak</button>
                    <button onclick="location.reload()" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300">Tutup</button>
                </div>
            </div>
            <div class="p-8 flex justify-center bg-gray-100 overflow-auto">
                <div id="download-area" class="bg-white w-full max-w-[400px] p-8 shadow-lg border border-gray-200 relative text-center">
                    <div class="flex items-start gap-3 mb-6 text-left">
                        <div class="w-14 h-14 bg-green-700 rounded-full flex items-center justify-center text-white flex-shrink-0"><i data-lucide="school" class="w-8 h-8"></i></div>
                        <div><h1 class="text-lg font-bold text-gray-900 leading-tight">SDIT AL MADINAH PONTIANAK</h1><h2 class="text-green-600 text-sm font-bold uppercase tracking-wide">Kartu Seleksi Peserta</h2></div>
                    </div>
                    <div class="flex justify-center mb-4"><div class="w-32 h-44 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 bg-gray-50"><span class="font-bold text-xs">FOTO 3X4</span><span class="font-bold text-xs">BERWARNA</span></div></div>
                    <div class="mb-8"><p class="text-gray-400 text-[10px] uppercase tracking-widest mb-1">NAMA CALON SISWA</p><h3 id="card-nama" class="text-2xl font-bold text-black uppercase break-words leading-tight">...</h3></div>
                    <div class="flex justify-between items-start border-t border-b border-gray-100 py-4 mb-6">
                        <div class="w-1/2 pr-2 border-r border-gray-200"><p class="text-gray-400 text-[10px] uppercase tracking-widest mb-1">WAKTU SELEKSI</p><p id="card-tgl" class="text-sm font-bold text-gray-800">...</p><p id="card-jam" class="text-sm font-medium text-gray-600">...</p></div>
                        <div class="w-1/2 pl-2"><p class="text-gray-400 text-[10px] uppercase tracking-widest mb-1">RUANGAN</p><p class="text-sm font-bold text-gray-800">R. TATA USAHA</p><div class="mt-1 bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded inline-block">Antrian: <span id="card-antrian">...</span></div></div>
                    </div>
                    <p class="text-gray-500 text-xs italic leading-relaxed">Harap datang 10 menit sebelum jadwal.</p>
                </div>
            </div>
            <div class="p-4 bg-white border-t text-center no-print">
                 <button id="btn-download-img" class="text-blue-600 hover:text-blue-800 text-sm font-medium underline flex items-center justify-center gap-2 w-full"><i data-lucide="download" class="w-4 h-4"></i> Download Gambar</button>
            </div>
        </div>
    </div>

    <script>
        if (typeof lucide !== 'undefined') lucide.createIcons();

        // GANTI URL INI
        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbybTujk3E61lCPMInZC5AsUAeegvWQ7i9L9G8-sXZ2GvhkBumHkTBUwHTBOgrpYTvjW/exec"; 

        const form = document.getElementById('ppdb-form');
        const submitBtn = document.getElementById('submit-btn');
        const modal = document.getElementById('modal');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if(!SCRIPT_URL || SCRIPT_URL.includes("AKfycbz...")) { 
                 alert("Harap update SCRIPT_URL di file HTML dengan URL Web App Anda yang baru.");
                 return;
            }

            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Memproses Jadwal...`;

            try {
                const formData = new FormData(form);
                const response = await fetch(SCRIPT_URL, { method: 'POST', body: formData });
                const result = await response.json();

                if (result.result === 'success') {
                    // Update Data Kartu dari Response Backend
                    const data = result.data;
                    document.getElementById('card-nama').innerText = data.nama;
                    document.getElementById('card-tgl').innerText = data.tgl;
                    document.getElementById('card-jam').innerText = data.jam;
                    document.getElementById('card-antrian').innerText = data.antrian;
                    
                    modal.classList.remove('hidden');
                    setTimeout(() => modal.classList.remove('opacity-0'), 10);
                } else {
                    throw new Error(result.error);
                }
            } catch (error) {
                alert("Gagal: " + error.message);
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });

        document.getElementById('btn-download-img').addEventListener('click', function() {
            html2canvas(document.getElementById('download-area')).then(canvas => {
                const link = document.createElement('a');
                link.download = 'Kartu-Seleksi-' + document.getElementById('inputNama').value + '.png';
                link.href = canvas.toDataURL();
                link.click();
            });
        });
    </script>
</body>
</html>

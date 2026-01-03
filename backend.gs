/**
 * KONFIGURASI SPREADSHEET
 */
const SPREADSHEET_ID = "1-NbaOEcOguIs1NOkyFwtLjX3K90aGb5SlCq6IyVeHQw"; 
const SHEET_NAME = "Data Pendaftar"; 

/* =========================================
   FUNGSI UTAMA
   ========================================= */

function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('PPDB Online - SDIT Al Madinah')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  // Kunci script agar nomor antrian tidak bentrok jika ada yg daftar bersamaan
  try {
    lock.waitLock(10000); 
  } catch (e) {
    return createJSONOutput("error", "Server sibuk. Silakan tekan kirim lagi.");
  }

  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    const params = e.parameter;

    // 1. HITUNG NOMOR URUT PENDAFTAR (AUTO-INCREMENT)
    // Asumsi baris 1 adalah Header. Jadi Pendaftar 1 masuk ke baris 2.
    // Jumlah Data saat ini = getLastRow() - 1.
    // Maka Pendaftar baru ini adalah urutan ke:
    const lastRow = sheet.getLastRow();
    // Jika sheet kosong (cuma header), lastRow=1, maka currentSequence=1.
    const currentSequence = lastRow < 1 ? 1 : lastRow; 

    // 2. HITUNG JADWAL BERDASARKAN NOMOR URUT
    const schedule = calculateSchedule(currentSequence);

    if (!schedule) {
      return createJSONOutput("error", "Mohon maaf, Kuota Pendaftaran (12-23 Jan) sudah PENUH.");
    }

    // 3. SIMPAN DATA
    const timestamp = new Date();
    
    const rowData = [
      timestamp,                    // 1
      params['Nama Lengkap'],       // 2
      params['NIK'],                // 3
      params['NISN'],               // 4
      params['No KK'],              // 5
      params['Jenis Kelamin'],      // 6
      params['Tempat Lahir'],       // 7
      params['Tanggal Lahir'],      // 8
      params['Asal Sekolah'],       // 9
      params['NPSN TK'],            // 10
      params['Alamat KK'],          // 11
      params['Alamat Lengkap'],     // 12
      params['RT'],                 // 13
      params['RW'],                 // 14
      params['Kelurahan'],          // 15
      params['Kecamatan'],          // 16
      params['Kabupaten/Kota'],          // 17
      params['Tempat Tinggal'],     // 18
      params['Moda Transportasi'],  // 19
      params['Penyakit Berat'],     // 20
      params['Pantangan Makan'],    // 21
      params['Tinggi Badan'],       // 22
      params['Berat Badan'],        // 23
      params['Jarak Rumah'],        // 24
      params['Waktu Tempuh'],       // 25
      params['Anak Ke'],            // 26
      params['Jumlah Saudara'],     // 27
      params['Hobby'],              // 28
      params['Cita-cita'],          // 29
      params['Saudara di SDIT'],    // 30
      // Data Ayah
      params['Nama Ayah'],          // 31
      "'"+params['NIK Ayah'],       // BARU (Pakai tanda kutip agar angka tidak terpotong)
      params['Tahun Lahir Ayah'],   // 32
      params['WN Ayah'],            // 33
      params['Pendidikan Ayah'],    // 34
      params['Pekerjaan Ayah'],     // 35
      params['Penghasilan Ayah'],   // 36
      params['Telp Ayah'],          // 37
      // Data Ibu
      params['Nama Ibu'],           // 38
      "'"+params['NIK Ibu'],        // BARU (Pakai tanda kutip agar angka tidak terpotong)
      params['Tahun Lahir Ibu'],    // 39
      params['WN Ibu'],             // 40
      params['Pendidikan Ibu'],     // 41
      params['Pekerjaan Ibu'],      // 42
      params['Penghasilan Ibu'],    // 43
      params['Telp Ibu'],           // 44
      // Data Wali
      params['Nama Wali'],          // 45
      params['Hubungan Wali'],      // 46
      params['Tahun Lahir Wali'],   // 47
      params['Agama Wali'],         // 48
      params['Alamat Wali'],        // 49
      params['Pekerjaan Wali'],     // 50
      params['Telp Wali'],          // 51
      
      // JADWAL HASIL KALKULASI (Disimpan ke Sheet)
      "'" + schedule.dateStr,   // 52
      schedule.timeStr,         // 53
      schedule.queueNo          // 54
    ];

    sheet.appendRow(rowData);

    // 4. KEMBALIKAN DATA JADWAL KE FRONTEND UNTUK DICETAK
    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      data: {
        nama: params['Nama Lengkap'],
        tgl: schedule.dateDisplay,
        jam: schedule.timeStr,
        antrian: schedule.queueNo
      }
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return createJSONOutput("error", "Error: " + error.toString());
  } finally {
    lock.releaseLock();
  }
}

/* =========================================
   LOGIKA PENGHITUNG JADWAL
   ========================================= */
function calculateSchedule(sequenceNumber) {
  // KONFIGURASI
  const START_DATE = new Date("2026-01-12"); // Senin
  const MAX_PER_DAY = 20; 
  const MAX_DAYS = 10; // 12 Jan - 23 Jan (tanpa sabtu minggu) = 10 hari kerja
  const TOTAL_CAPACITY = MAX_PER_DAY * MAX_DAYS;

  if (sequenceNumber > TOTAL_CAPACITY) return null; // Kuota Habis

  // 1. Tentukan Hari ke-berapa (0-based)
  // Contoh: Seq 1-20 -> Day 0. Seq 21-40 -> Day 1.
  const dayIndex = Math.floor((sequenceNumber - 1) / MAX_PER_DAY);
  
  // 2. Tentukan Nomor Antrian dalam hari itu (1-20)
  const queueInDay = ((sequenceNumber - 1) % MAX_PER_DAY) + 1;

  // 3. Hitung Tanggal Sebenarnya (Skip Sabtu Minggu)
  let targetDate = new Date(START_DATE);
  let daysAdded = 0;
  
  // Loop untuk menambah hari, tapi lewati Sabtu(6)/Minggu(0)
  while (daysAdded < dayIndex) {
    targetDate.setDate(targetDate.getDate() + 1);
    const day = targetDate.getDay();
    if (day !== 0 && day !== 6) {
      daysAdded++;
    }
  }

  // 4. Hitung Jam Berdasarkan Antrian Harian (1-20)
  // Sesi 1 (1-10): 07:20 start. 2 org/slot (20 menit).
  // Sesi 2 (11-20): 09:20 start. 2 org/slot (20 menit).
  
  let startHour, startMin;
  let slotIndex; // Slot ke berapa dalam sesi itu (0-4)

  if (queueInDay <= 10) {
    // Sesi 1 (07:20 - 09:00)
    startHour = 7;
    startMin = 20;
    // (1,2)->0, (3,4)->1, (5,6)->2, dst
    slotIndex = Math.ceil(queueInDay / 2) - 1;
  } else {
    // Sesi 2 (09:20 - 11:00)
    startHour = 9;
    startMin = 20;
    // (11,12)->0, (13,14)->1, dst
    slotIndex = Math.ceil((queueInDay - 10) / 2) - 1;
  }

  // Tambahkan menit berdasarkan slot index
  let totalMin = startMin + (slotIndex * 20);
  // Handle overflow jam (misal 60 menit jadi +1 jam)
  let finalStartH = startHour + Math.floor(totalMin / 60);
  let finalStartM = totalMin % 60;

  // Hitung Waktu Selesai (Start + 20 menit)
  let endMinRaw = totalMin + 20;
  let finalEndH = startHour + Math.floor(endMinRaw / 60);
  let finalEndM = endMinRaw % 60;

  const timeStr = 
    `${String(finalStartH).padStart(2,'0')}:${String(finalStartM).padStart(2,'0')} - ` +
    `${String(finalEndH).padStart(2,'0')}:${String(finalEndM).padStart(2,'0')} WIB`;

  // Format Tanggal
  const y = targetDate.getFullYear();
  const m = String(targetDate.getMonth() + 1).padStart(2, '0');
  const d = String(targetDate.getDate()).padStart(2, '0');
  const dateStr = `${y}-${m}-${d}`;
  
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateDisplay = targetDate.toLocaleDateString('id-ID', options);

  return {
    dateStr: dateStr,
    dateDisplay: dateDisplay,
    timeStr: timeStr,
    queueNo: queueInDay // Nomor antrian harian
  };
}

function createJSONOutput(result, errorMsg) {
  return ContentService.createTextOutput(JSON.stringify({
    result: result,
    error: errorMsg
  })).setMimeType(ContentService.MimeType.JSON);
}

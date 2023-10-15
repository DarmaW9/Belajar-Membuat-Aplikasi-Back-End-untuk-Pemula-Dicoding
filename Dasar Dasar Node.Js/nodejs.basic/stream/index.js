const fs = require('fs');
const path = require('path');

// Menentukan lokasi file secara dinamis dengan path.resolve()
const inputFilePath = path.resolve(__dirname, 'input.txt');
const outputFilePath = path.resolve(__dirname, 'output.txt');

// Membuat readable stream dari file input.txt dengan highWaterMark sebesar 15
const readStream = fs.createReadStream(inputFilePath, {
    encoding: 'utf8',
    highWaterMark: 15
});

// Membuat writable stream ke file output.txt
const writeStream = fs.createWriteStream(outputFilePath);

// Saat data diterima dari readable stream, data tersebut akan diteruskan ke writable stream
// dengan penambahan baris baru di akhir
readStream.on('data', chunk => {
    writeStream.write(chunk + '\n');
});

// Jika ada error, kita bisa menanganinya juga
readStream.on('error', err => {
    console.error('Terjadi error saat membaca:', err);
});

writeStream.on('error', err => {
    console.error('Terjadi error saat menulis:', err);
});

// Ketika pembacaan selesai
readStream.on('end', () => {
    writeStream.end(); // Menutup writable stream setelah semua data ditulis
});

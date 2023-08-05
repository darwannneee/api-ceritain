import { BlobServiceClient } from "@azure/storage-blob";

const AZURE_STORAGE_CONNECTION_STRING = 'DefaultEndpointsProtocol=https;AccountName=ceritainimage;AccountKey=CV/na++9tNjMIaYJJloWSu1wukIINImEBi6nJuxQMB2pruHivDchtR40MkIvB1o5t8ZSO757QraN+AStGvm5EQ==;EndpointSuffix=core.windows.net';
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerName = 'dokterimage';
const containerClient = blobServiceClient.getContainerClient(containerName);

// Fungsi untuk mengunggah gambar ke Azure Blob Storage
const uploadImageToBlob = async (imageBuffer, imageName) => {
  const blockBlobClient = containerClient.getBlockBlobClient(imageName);
  const uploadResponse = await blockBlobClient.uploadData(imageBuffer);
  return uploadResponse;
};

// Controller untuk mengunggah gambar
export const uploadImage = async (req, res) => {
  try {
    // Pastikan Anda telah menggunakan middleware multer sebelumnya untuk mengunggah gambar
    // Middleware multer akan menyimpan gambar dalam "req.file.buffer"
    if (!req.file) {
      return res.status(400).json({ msg: 'Gambar tidak ditemukan' });
    }

    const imageBuffer = req.file.buffer;
    const imageName = 'profile' + "test.jpg"; // Sesuaikan dengan pola nama gambar yang Anda inginkan

    // Panggil fungsi untuk mengunggah gambar ke Azure Blob Storage
    const result = await uploadImageToBlob(imageBuffer, imageName);

    // Respon dengan URL gambar jika perlu
    const imageUrl = result.blobUrl;
    res.status(200).json({ msg: "Gambar berhasil diunggah", imageUrl });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Kesalahan Server Internal" });
  }
};

export {uploadImageToBlob}

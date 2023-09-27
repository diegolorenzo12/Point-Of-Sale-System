const containerClient = require("./containerClient");

async function deleteBlobFromAzure(blobName) {
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  try {
    await blockBlobClient.delete();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  deleteBlobFromAzure,
};

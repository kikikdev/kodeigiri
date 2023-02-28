const StorageConfig = {
    projectId: process.env.GCS_PROJECT_ID,
    private_key: process.env.GCS_PRIVATE_KEY,
    client_email: process.env.GCS_CLIENT_EMAIL,
    mediaBucket: process.env.GCS_STORAGE_MEDIA_BUCKET,
};

export default StorageConfig;
export const environment = {
	production: true,
	// BasePath: 'http://adatdemo7629api.trackbox.co.in:3532/'adatdemoapi.trackbox.co.in
	// BasePath: "https://reserpapi.trackbox.in/",
	// FilePath: "https://reserpapi.trackbox.in/uploads/",
	BasePath: "http://localhost:3502/",
	// BasePath: "https://neotronicsapi.trackbox.live/",
	FilePath: "http://localhost:3502/uploads/",
	// FilePath: "https://neotronicsapi.trackbox.live/uploads/",

	// Cloudflare R2 / AWS S3 Configuration
	aws: {
		accessKeyId: '25a6f7532742385ba2a9e9c25e18d198',
		secretAccessKey: 'c1825d7a0178c0c81d125ec010e1b749de9f12ec376c40a97a86f0993aaf1881',
		region: 'auto',
		bucket: 'neotronics',
		endpoint: 'https://538b13d4d239da205337637dc6b57ff0.r2.cloudflarestorage.com',
		publicUrl: 'https://pub-d0e49e885c3f4699bddb39f83c6c7274.r2.dev'
	}
};

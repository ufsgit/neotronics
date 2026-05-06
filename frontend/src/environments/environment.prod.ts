export const environment = {
	production: true,
	// BasePath: 'http://adatdemo7629api.trackbox.co.in:3532/'adatdemoapi.trackbox.co.in
	// BasePath: "https://reserpapi.trackbox.in/",
	// FilePath: "https://reserpapi.trackbox.in/uploads/",
	BasePath: "https://neotronicsapi.trackbox.live/",

	// BasePath: "https://perfecthillsapi.trackbox.live/",
	FilePath: "https://perfecthillsapi.trackbox.live/uploads/",

	// AWS S3 Configuration — inject real values via CI/CD environment secrets, never commit keys here
	aws: {
		accessKeyId: '',
		secretAccessKey: '',
		region: 'us-east-2',
		bucket: 'ufsnabeelphotoalbum'
	}
};

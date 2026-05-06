// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
	production: false,

	//BasePath: 'http://Localhost:3503/',
	// // BasePath:"https://a382-103-214-232-130.ngrok-free.app",
	// // FilePath: "https://reserpapi.trackbox.in/uploads/",
	// BasePath: "http://localhost:3502/",
	BasePath: "https://neotronicsapi.trackbox.live/",
	FilePath: "https://ufsnabeelphotoalbum.s3.us-east-2.amazonaws.com/",


	// 	BasePath: "https://perfecthillsapi.trackbox.net.in/",
	// FilePath: "https://perfecthillsapi.trackbox.net.in/uploads/"

	// AWS S3 Configuration — set real values in environment.prod.ts or via CI/CD secrets
	aws: {
		accessKeyId: '',
		secretAccessKey: '',
		region: 'us-east-2',
		bucket: 'ufsnabeelphotoalbum'
	}
};

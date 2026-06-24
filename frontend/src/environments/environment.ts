// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
	production: false,

	// BasePath: 'http://Localhost:3502/',
	// BasePath:"https://a382-103-214-232-130.ngrok-free.app",
	// // FilePath: "https://reserpapi.trackbox.in/uploads/",
	BasePath: "http://localhost:3502/",
	FilePath: "http://localhost:3502/uploads/",
	// BasePath: "https://neotronicsapi.trackbox.live/",
	// FilePath: "https://neotronicsapi.trackbox.live/uploads/",

 
	// 	BasePath: "https://perfecthillsapi.trackbox.net.in/",
	// FilePath: "https://perfecthillsapi.trackbox.net.in/uploads/"

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

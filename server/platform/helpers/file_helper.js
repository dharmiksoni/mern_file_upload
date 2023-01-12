const fs = require("fs");
const FileHelper = module.exports;

const baseUrl = "http://localhost:5000/";

// FileHelper.upload = async (params) => {
// 	// const { state_payload } = req.query;
// 	try {
// 		return res.status(200).send(rv);
// 	} catch (error) {
// 		throw error;
// 	}
// };

FileHelper.download = async (params) => {
	try {
		const rv = await FileHelper.download();
		return res.status(200).send(rv);
	} catch (error) {
		throw error;
	}
};

FileHelper.getfiles = async (params) => {
	try {
		const directoryPath = __basedir + "/resources";
		const fileInfos = [];
		const files = fs.readdirSync(directoryPath).forEach((file) => {
			console.log(file);
            fileInfos.push({
                name: file,
                url: baseUrl + file,
            });
		});
        return fileInfos;
	} catch (error) {
		throw error;
	}
};


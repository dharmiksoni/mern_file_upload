// const FileHelper = require("../helpers/file_helper");
const fs = require("fs");

const FileApi = module.exports;
const baseUrl = "http://localhost:5000/";

FileApi.upload = async (req, res) => {
	if (req.files === null) {
		return res.status(400).json({ msg: "No file uploaded" });
	}

	const file = req.files && req.files.file;

	file.mv(`${__basedir}/resources/${file.name}`, (err) => {
		if (err) {
			console.error(err);
			return res.status(500).send(err);
		}

		res.json({ fileName: file.name });
	});
};

FileApi.download = async (req, res) => {
	try {
		const fileName = req.query.name;
		console.log('filename: ', fileName);
		const path = __basedir + `/resources/${fileName}`;

		res.download(path + fileName, (err) => {
			if (err) {
				res.status(500).send({
					message: "File can not be downloaded: " + err,
				});
			}
		});
		// const rv = await FileHelper.download();
		// return res.status(200).send(rv);
	} catch (error) {
		throw error;
	}
};

FileApi.getfiles = async (req, res) => {
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
		return res.status(200).send(fileInfos);
	} catch (error) {
		throw error;
	}
};

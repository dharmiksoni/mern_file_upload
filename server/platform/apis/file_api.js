const FileHelper = require("../helpers/file_helper");
const FileApi = module.exports;

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
		const rv = await FileHelper.download();
		return res.status(200).send(rv);
	} catch (error) {
		throw error;
	}
};

FileApi.getfiles = async (req, res) => {
	try {
		const rv = await FileHelper.getfiles();
		return res.status(200).send(rv);
	} catch (error) {
		throw error;
	}
};

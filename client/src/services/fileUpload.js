// import http from "../http-common";
import axios from "axios";
// import formData from 'f'

const upload = async (file, onUploadProgress) => {
	const formData = new FormData();
	formData.append("file", file);
	axios({
		method: "post",
		url: "http://localhost:5000/upload",
		data: formData,
		headers: {
			"Content-Type": 'multipart/form-data',
		},
	})
		.then(function (response) {
			console.log(response);
		})
		.catch(function (response) {
			console.log(response);
		});
};

const getFiles = async () => {
	return axios
		.get("http://localhost:5000/files")
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error;
		});
};

const FileUploadService = {
	upload,
	getFiles,
};

export default FileUploadService;

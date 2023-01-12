// import http from "../http-common";
import axios from "axios";
import download from "js-file-download";
// import formData from 'f'

const upload = async (file, onUploadProgress) => {
	const token = sessionStorage.getItem("token");
	const formData = new FormData();
	formData.append("file", file);
	axios({
		method: "post",
		url: "http://localhost:5000/upload",
		data: formData,
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: token,
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
	const token = sessionStorage.getItem("token");
	return axios({
		method: "get",
		url: "http://localhost:5000/files",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
	})
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			return error;
		});
};

const downloadfile = async (name, index) => {
	console.log("name:", name);
	const token = sessionStorage.getItem("token");
	// return (
	return await axios.get("http://localhost:5000/files", {
		params: { name: name, index },
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
	});
	// axios({
	// 	method: "get",
	// 	url: `http://localhost:5000/files/${name}`,
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 		Authorization: token,
	// 	},
	// })
	// 	// .then(function (response) {
	// 	// 	return response.data;
	// 	// })
	// 	.catch(function (error) {
	// 		return error;
	// 	})
	// );
};

const FileUploadService = {
	upload,
	getFiles,
	downloadfile,
};

export default FileUploadService;

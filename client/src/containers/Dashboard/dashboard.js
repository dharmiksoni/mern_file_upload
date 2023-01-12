import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Message from "./Message";
import Progress from "./Progress";
import UploadService from "../../services/fileUpload";
import withTemplate from "../../hoc/withTemplate";

const Dashboard = () => {
	const [selectedFiles, setSelectedFiles] = useState(undefined);
	const [currentFile, setCurrentFile] = useState(undefined);
	const [progress, setProgress] = useState(0);
	const [message, setMessage] = useState("");
	const [fileInfos, setFileInfos] = useState([]);

	useEffect(() => {
		fetchMyAPI();
	}, []);
	async function fetchMyAPI() {
		let response = await UploadService.getFiles();
		console.log("response : ", response);
		//   response = await response.json()
		setFileInfos(response);
	}
	const selectFile = (event) => {
		setSelectedFiles(event.target.files);
	};
	const upload = async (event) => {
		event.preventDefault();
		let currentFile = selectedFiles[0];

		setProgress(0);
		setCurrentFile(currentFile);

		UploadService.upload(currentFile, (event) => {
			// event.preventDefault();
			setProgress(Math.round((100 * event.loaded) / event.total));
		})
			.then((response) => {
				setMessage(response.data.message);
				fetchMyAPI();
			})
			.then((files) => {
				setFileInfos(files.data);
			})
			.catch(() => {
				setProgress(0);
				setMessage("Could not upload the file!");
				setCurrentFile(undefined);
			});

		setSelectedFiles(undefined);
	};

	return (
		<Fragment>
			{message ? <Message msg={message} /> : null}
			<form onSubmit={(e) => upload(e)}>
				<div className="custom-file mb-4">
					<input
						type="file"
						className="custom-file-input"
						id="customFile"
						onChange={selectFile}
					/>
					<label className="custom-file-label" htmlFor="customFile">
						{currentFile}
					</label>
				</div>
				<Progress percentage={progress} />

				<input
					type="submit"
					value="Upload"
					className="btn btn-primary btn-block mt-4"
				/>
			</form>
			{currentFile ? (
				<div className="row mt-5">
					<div className="col-md-6 m-auto">
						<h3 className="text-center">{currentFile.fileName}</h3>
						<img style={{ width: "100%" }} src={currentFile.filePath} alt="" />
					</div>
				</div>
			) : null}
			<div className="card">
				<div className="card-header">List of Files</div>
				<ul className="list-group list-group-flush">
					{fileInfos &&
						fileInfos.map((file, index) => (
							<li className="list-group-item" key={index}>
								<a href={file.url}>{file.name}</a>
							</li>
						))}
				</ul>
			</div>
		</Fragment>
	);
};

export default withTemplate(Dashboard);

import React, { useEffect, useState } from "react";
import { unsetHeadersWithUserToken } from "../../services/axios";

const Header = (props) => {
	console.log("props in header : ", props);
	const logout = async (e) => {
        e.preventDefault();
		sessionStorage.removeItem("isLogin");
		unsetHeadersWithUserToken();
		await logout();
		props.history.push("/");
	};
	return (
		<header>
			<div className="header-area header-transparrent">
				<button onClick={(e) => logout(e)} className="btn head-btn2">
					Logout
				</button>
			</div>
		</header>
	);
};

export default Header;

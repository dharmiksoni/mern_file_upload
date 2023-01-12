const express = require('express');
const router = express.Router();
const GSuiteApi = require('../apis/gsuite_api');
const fileApi = require('../apis/file_api');
const AuthHelper = require('../../utils/auth_utils');

router.get('/auth', GSuiteApi.handleGoogleOAuth);
router.get('/callback', GSuiteApi.handleGoogleOAuthRedirect);
// router.get('/verify', GSuiteApi.handleGoogleOAuthVerification);
router.get('/logout', GSuiteApi.logout);

router.post("/upload", fileApi.upload);
router.get("/files/:name", AuthHelper.authenticateJWTToken, fileApi.download);
router.get("/files", fileApi.getfiles);

module.exports = router;
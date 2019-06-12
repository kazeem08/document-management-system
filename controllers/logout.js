class LogoutController {
	//method for logging out
	async logout(req, res) {
		res.send('logged out');
	}
}

const logoutController = new LogoutController();

export { logoutController };

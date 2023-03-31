class Authentication {
	authenticate(config) {
		return Promise.resolve(config.apiKey);
	}
}

module.exports = new Authentication();

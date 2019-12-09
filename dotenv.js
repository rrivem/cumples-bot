const path = require('path');

function configureDotEnv() {
	if (!process.env.NODE_ENV || process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'production') {
		require('dotenv').config({ path: path.resolve(__dirname, '.env') });
	}
}

configureDotEnv();

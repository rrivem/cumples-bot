const fetch = require('./fetch');
const config = require('./config').googleImages;

class GoogleImagesService {
	async getRandomImage(query) {
		const start = Math.floor(Math.random() * 10);
		const url = 'https://www.googleapis.com/customsearch/v1?cx=[engineKey]&key=[apiKey]&q=[query]&searchType=image&safe=high&start=[start]'
			.replace('[engineKey]', config.engineKey)
			.replace('[apiKey]', config.apiKey)
			.replace('[query]', query)
			.replace('[start]', start);

		const { items } = await fetch(url).then(res => res.json());
		return items[Math.floor(Math.random() * items.length)].link;
	}
}

module.exports = new GoogleImagesService();

class Images {
	getImage(id: string) {
		try {
			return `${import.meta.env.VITE_BACKEND_URL}/uploads/${id}`;
		} catch (err) {
			throw err;
		}
	}
}

const imageService = new Images();

export default imageService;

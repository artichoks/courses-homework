OrderInfo = {
	id			: "",
	createdAt	: "",
	customer	: "",
	status		: "",
	shippedAt	: ""
};

Product = {
	name		: "",
	id			: "",
	price		: "",
	currency	: "",
	quantity	: "",
	totalPrice	: ""
};


ShipTo = {
	name	: "",
	street	: "",
	ZIP		: "",
	city	: "",
	Region	: "",
	Country	: ""
};

CustomerInfo = {
	firstName	: "",
	lastName	: "",
	address		: "",
	phone		: "",
	email		: "",
	photo		: ""
};

Order = {
	id			: "",
	OrderInfo	: {},
	ShipTo		: {},
	CustomerInfo: {},
	products	: []
};
pub trait Summary {

	fn info(&self) -> String;
	fn summarize(&self) -> String {
		format!("This is {}", self.info())	
	}
}

pub struct News {
	pub name: String,
}

pub struct Tweet {
	pub name: String,
}

impl Summary for News {
	fn info(&self) -> String {
		format!("{}",self.name)
	}
}
impl Summary for Tweet {
	fn info(&self) -> String {
		format!("{}", self.name)
	}
}


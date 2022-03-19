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

pub fn largest<T: PartialOrd>(list: &[T]) -> &T {
	
	let mut largest = &list[0];
	for item in list {
		if item > largest {
			largest = item;
		}
	}

	largest
}



use trait_tutorial::{Summary,Tweet,News};

fn main() {
	
	let tweet = Tweet {
		name: String::from("tweeter")
	};

	let news = News {
		name: String::from("news")
	}; 
	
	notify(&tweet);
	notify(&news);
}

pub fn notify(item: &impl Summary) {
	println!("{}",item.summarize());
}

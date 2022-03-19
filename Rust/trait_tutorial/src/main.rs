
use trait_tutorial::{Summary,Tweet,News};
use trait_tutorial::{largest};

fn main() {
	
	let tweet = Tweet {
		name: String::from("tweeter")
	};

	let news = News {
		name: String::from("news")
	}; 
	
	notify(&tweet);
	notify(&news);

	let list = vec![10,1,4,20,9];
	println!("{}",largest(&list));
}

fn notify(item: &impl Summary) {
	println!("{}",item.summarize());
}


use enum_tutorial::{Coin,value_in_cents,SpreadSheetCell, test};

fn main() {
	
	let penny: Coin = Coin::Penny;
	let nickel: Coin = Coin::Nickel;
	let dime: Coin = Coin::Dime;
	let quarter: Coin = Coin::Quarter;
	let _row = vec![
		SpreadSheetCell::Float(1.0),
		SpreadSheetCell::Int(1),
		SpreadSheetCell::Text(String::from("one")),
	];

	println!("{}",value_in_cents(penny));
  println!("{}",value_in_cents(nickel));
	println!("{}",value_in_cents(dime));
	println!("{}",value_in_cents(quarter));
	test(&_row);
}	

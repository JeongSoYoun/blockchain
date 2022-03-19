
pub enum Coin {
	Penny,
	Nickel,
	Dime,
	Quarter,
}

pub fn value_in_cents(coin: Coin) -> u8 {
		match coin {
			Coin::Penny => 1,
			Coin::Nickel => 5,
			Coin::Dime => 10,
			Coin::Quarter => 25,
		}
}

pub enum SpreadSheetCell {
	Int(i32),
	Float(f64),
	Text(String),
}

pub fn test(cell: &[SpreadSheetCell]) {
	match &cell[0] {
		SpreadSheetCell::Int(i) => println!("{}",i),
		_other => println!("None"),
	}
}

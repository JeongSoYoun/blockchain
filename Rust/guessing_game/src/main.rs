use std::io;
use rand::Rng;
use std::cmp::Ordering;

fn main() {
    
    let random_number = rand::thread_rng().gen_range(1..101);
    loop {
        let mut guess = String::new();
        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read line");
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };
        
        match guess.cmp(&random_number) {
            Ordering::Less => println!("up"),
            Ordering::Greater => println!("down"),
            Ordering::Equal => {
                println!("correct!");
                break;
            }
        }
    }
}
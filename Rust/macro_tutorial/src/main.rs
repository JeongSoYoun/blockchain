use macro_tutorial::{scanline, custom_vec, custom_println_tt, custom_println_expr};

fn main() {
    println!();
    println!("2");
    custom_println_expr!("{} {}", (2), "there") ;
    custom_println_expr!("{} {} {}", (2), "there", "this is macro learning");
    let mut input = String::new();
    scanline!(input);
    println!("I read: {:?}", input);
}
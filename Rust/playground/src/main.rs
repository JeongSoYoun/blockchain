use playground::List::{Cons, Nil};
use std::rc::Rc;

fn main() {

    let a = Rc::new(Cons(1, Rc::new(Nil)));
    let b = Rc::new(Cons(2, Rc::clone(&a)));
    println!("{:?}", b);
}
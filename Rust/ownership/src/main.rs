fn main() {
    let mut s = String::from("hello");
    {
        let r1 = &mut s;
        r1.push_str(", world!");
        println!("{}",s);
    }
    let r2 = &mut s;
    r2.push_str("hi");
    println!("{}",s);
}

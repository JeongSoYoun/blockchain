fn main() {
    let mut _str = String::from("hello world");
    let word = first_word(&_str);
    _str.clear();
    println!("the first word is: {}", word);
}

fn first_word(s: &String) -> &str {

    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        } 
    }
    &s[..]
}

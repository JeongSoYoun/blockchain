use macro_tutorial::{custom_vec, Screen, Button, TextField};

fn main() {
    let btn = Button{
        width: 10,
        height: 10,
    };
    let text = TextField{
        width: 10,
        height: 5,
    };
    let screen = Screen {
        components: vec![
            Box::new(btn),
            Box::new(text),
        ]
    };
    screen.run();
    let v: Vec<u32> = custom_vec![1,2,3,4,5];
    for i in &v {
        println!("{}", i);
    }
    {
        let b = Box::new(5);
        println!("{}",b);
    }
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        let result = 2 + 2;
        assert_eq!(result, 4);
    }

    #[test]
    fn custom_vec_should_work() {
        use super::custom_vec;
        let test = custom_vec![1,2,3,4,5];
        assert_eq!(test, [1,2,3,4,5]);
    } 
}

pub mod pallet {
    use crate::*;
    pub trait Config {
        type Origin: Into<RawOrigin<Self::AccountId>>;
        type AccountId;
    }
    pub type Origin<T> = RawOrigin<<T as Config>::AccountId>;
}

pub enum RawOrigin<AccountId> {
	Root,
	Signed(AccountId),
	None,
}

#[macro_export]
macro_rules! custom_vec {
    ($($x: expr), *) => {
        {
            let mut temp = Vec::new();
            $(
                temp.push($x);
            )*
            temp
        }
    };
}

pub trait Draw {
    fn draw(&self);
}

pub struct Screen {
    pub components: Vec<Box<dyn Draw>>,
}

impl Screen {
    pub fn run(&self) {
        for component in self.components.iter() {
            component.draw();
        }
    }
}

pub struct Button {
    pub width: u32,
    pub height: u32,
}

impl Draw for Button {
    fn draw(&self) {
        println!("This is Button Drawing");
    }
}

pub struct TextField {
    pub width: u32,
    pub height: u32,
}

impl Draw for TextField {
    fn draw(&self) {
        println!("This is TextField Drawing!");
    }
}
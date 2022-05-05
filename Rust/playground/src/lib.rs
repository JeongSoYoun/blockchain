use std::rc::Rc;

#[cfg(test)]
mod tests {
    #[test]
    fn rc_should_work() {

    }
}

#[derive(Debug)]
pub enum List {
    Cons(i32, Rc<List>),
    Nil,
}

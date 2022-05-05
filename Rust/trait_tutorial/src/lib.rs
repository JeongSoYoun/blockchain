#[cfg(test)]
mod tests {

}

struct String {}

impl From<String> for i32 {
	fn from(_: String) -> i32 {
		5
	}
}
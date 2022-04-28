#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        let result = 2 + 2;
        assert_eq!(result, 4);
    }
}

pub mod frame_system {
    use super::{RawOrigin};
    
    pub trait Config {
        type Origin: Into<Result<RawOrigin<Self::AccountId>, Self::Origin>>;
        type AccountId;
    }
}

pub mod frame_system_prelude {
    pub type OriginFor<T> = <T as crate::frame_system::Config>::Origin;
}

pub mod custom_pallet {
    use crate::frame_system::Config as system_config;
    use crate::frame_system_prelude;
    pub trait Config: system_config {
        
    }
}

pub fn ensure_signed<OuterOrigin, AccountId> (o: OuterOrigin) -> Result<AccountId, BadOrigin> 
where 
    OuterOrigin: Into<Result<RawOrigin<AccountId>, OuterOrigin>>
{
    match o.into() {
        Ok(RawOrigin::Signed(t)) => Ok(t),
        _ => Err(BadOrigin),
    }
} 

pub struct BadOrigin;
pub enum RawOrigin<AccountId> {
    Root,
    Signed(AccountId),
    None,
}
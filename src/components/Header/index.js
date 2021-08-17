import React from 'react';
import { Image } from 'react-native';

import logo from '../../assets/logo.png';

import { Container } from './styles';

const Header = () => {
    return(
        <Container>
            <Image 
            source={logo} 
            resizeMode='center'
            style={{}}
            />
        </Container>
        
    )
}

export default Header;
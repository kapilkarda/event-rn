import React from 'react';
import {
  Body,
  Header,
  Left,
  Right,
  Title
} from 'native-base';
import {TouchableOpacity,Image} from 'react-native';
import PropTypes from 'prop-types'


class AppHeader extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }
  render () {
    const {headerTitle,leftImg,rightImg,addevent,goBack} = this.props;
    return (
    
      <Header style={{ backgroundColor: '#1e244a',alignContent:'center', }}>
        <Left>

          <TouchableOpacity 
           onPress = {goBack}
          >
            <Image source={leftImg} resizeMode = "contain"
              style={{ width: 20, height: 20, marginLeft: 10, tintColor: '#fff',}}>
            </Image>
          </TouchableOpacity>
        </Left>
        <Body style={{ }}>
          <Title style={{ color: '#fff',fontSize:20  }}>{headerTitle}</Title>
        </Body>
        <Right style={{ }}>
        <TouchableOpacity 
        onPress = {addevent}
        >
            <Image source={rightImg} resizeMode = "contain"
              style={{ width: 20, height: 20, marginRight: 10, tintColor: '#fff',}}>
            </Image>
          </TouchableOpacity>
          

        </Right>

      </Header>

    );
  }
}

AppHeader.propTypes = {
  onPress: PropTypes.func,
  icon: PropTypes.string,
  onPressRight: PropTypes.func,
  iconRight: PropTypes.string,
  title: PropTypes.string.isRequired
};

export default AppHeader;
import React, { Component } from 'react';
import { FacebookProvider, EmbeddedPost } from 'react-facebook'
import _ from 'lodash';
import styled from 'styled-components'
import config from './config';
import  Preview from './component/preview';

const shop=[
  {id: 0, name: 'jean', price:500 ,img :'https://www.stickpng.com/assets/images/580b57fbd9996e24bc43bf39.png'},
  {id: 1, name: 'shoe', price:1400, img :'https://s1.r29static.com/bin/shop/83a/x/2196108/image.png'},
  {id: 2, name: 'T-shirt', price:900, img :'https://purepng.com/public/uploads/large/purepng.com-t-shirtt-shirtfabrict-shapegramnets-1421526429337ircsl.png'}
];

class App extends Component {
state={
  shop:shop,
}
componentDidMount(){
  let dbCon = config.database().ref('production1/');
  dbCon.on('value', async (snapshot) => { 
    const snapshotValue = snapshot.val(); 
    let data = _(snapshotValue).value();
    this.setState({
      data:data
    })
    if(data !== null){
      this.setState({
        videoLink:data.videoLink,
        status:data.status,
        select:data.select,
        title1:data.popup1.title,
        description1:data.popup1.description,
        product1:data.popup1.product,

        title2:data.popup2.title,
        description2:data.popup2.description,
        product2:data.popup2.product,
      })
    }
  })
}
  render() {
    return (
      !this.state.videoLink?null:
      <Center>
          <Container>
              <Overlay status={this.state.status}>
                <Preview
                  {...this.state}
                />
              </Overlay>   
                <FacebookProvider appId="2136930476607017">
                  <EmbeddedPost showText={false} href={this.state.videoLink} width="720"/>
                </FacebookProvider>
          </Container>
      </Center>
    );
   }
  }

  export default App;

  const Container = styled.div`
  position: relative;
  padding: 0;
`;
  const Center = styled.div`
  margin-top:50px; 
  display: flex;
  justify-content: center;
  align-items: center;
  `;

  const Overlay = styled.div`
    bottom: 0;
    width: 100%;
    display: ${props => props.status ? "block" : "none"};
    z-index: 50;
    background-color: #565656;
    position: absolute;
`;
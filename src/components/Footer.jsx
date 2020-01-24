import * as React from 'react';


export default class Footer extends React.Component {

  render(){
    return (
      <footer className="footer w3-padding">
        <p>TCM {process.env.REACT_APP_VERSION}</p>
        <p>Copyright &copy; 2020 Krzysztof Telech - TSoftware</p>
      </footer>
    );
  }
}
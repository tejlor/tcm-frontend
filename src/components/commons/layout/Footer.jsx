import * as React from 'react';

export default class Footer extends React.Component {

  render() {
    return (
      <footer className="w3-container w3-padding-32 w3-dark-grey">
        <div className="w3-row-padding">
          <div className="w3-third">
            <h3>FOOTER</h3>
            <p>Praesent tincidunt sed tellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.</p>
            <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" >w3.css</a></p>
          </div>

          <div className="w3-third">
            <h3>BLOG POSTS</h3>
            <ul className="w3-ul w3-hoverable">
              <li className="w3-padding-16">
                <img src="/img/workshop.jpg" className="w3-left w3-margin-right" style={{ width: "50px" }} alt=""/>
                <span className="w3-large">Lorem</span><br />
                <span>Sed mattis nunc</span>
              </li>
              <li className="w3-padding-16">
                <img src="/img/workshop.jpg" className="w3-left w3-margin-right" style={{ width: "50px" }} alt=""/>
                <span className="w3-large">Ipsum</span><br />
                <span>Praes tinci sed</span>
              </li>
            </ul>
          </div>

          <div className="w3-third">
            <h3>POPULAR TAGS</h3>
            <p>
              <span className="w3-tag w3-black w3-small w3-margin-bottom">Travel</span> {" "}
              <span className="w3-tag w3-grey w3-small w3-margin-bottom">New York</span>  {" "}
              <span className="w3-tag w3-grey w3-small w3-margin-bottom">London</span> {" "}
              <span className="w3-tag w3-grey w3-small w3-margin-bottom">IKEA</span> {" "}
              <span className="w3-tag w3-grey w3-small w3-margin-bottom">NORWAY</span>  {" "}
              <span className="w3-tag w3-grey w3-small w3-margin-bottom">DIY</span> {" "}
              <span className="w3-tag w3-grey w3-small w3-margin-bottom">Ideas</span> {" "}
              <span className="w3-tag w3-grey w3-small w3-margin-bottom">Baby</span> {" "}
              <span className="w3-tag w3-grey w3-small w3-margin-bottom">Family</span> {" "}
              <span className="w3-tag w3-grey w3-small w3-margin-bottom">News</span>  {" "}
              <span className="w3-tag w3-grey w3-small w3-margin-bottom">Clothing</span>  {" "}
              <span className="w3-tag w3-grey w3-small w3-margin-bottom">Shopping</span> {" "}
              <span className="w3-tag w3-grey w3-small w3-margin-bottom">Sports</span> {" "}
              <span className="w3-tag w3-grey w3-small w3-margin-bottom">Games</span>
            </p>
          </div>

        </div>
      </footer>
    );
  }
}
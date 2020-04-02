import React from "react";
import { Modal } from "antd";
import Constants from "../Constants";
import SFPlaces from "../CityData/Places";
import axios from "axios";

class AskForHelpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      place: {
        name: "",
        address: "",
        placeID: ""
      },
      placeCollagePicture: ""
    };

    const params = window.location.pathname.slice(1).split("/");
    if(params[0] === 'ask-for-help'){
      const placeKey = params[1];
      const currentPlace = SFPlaces.find(
        placeKey => this.key = placeKey
      )
      if(currentPlace){
        this.state.visible = true;
        this.state.placeCollagePicture= "/api/places/collage_picture?place_id=" + placeKey;
        this.fetchPlaceInfo(this.elementRef, placeKey);
      }
    }
  }

  fetchPlaceInfo = (scrollElementRef, placeKey) => {
    axios
      .get("/api/places/detail", {
        params: {
          place_id: placeKey
        }
      })
      .then(response => {
        const place = response.data.place;
        this.setState((state, props) => {
          return { place: place };
        });
      });
  };

  renderLink(url, text, target) {
    target = target || "_blank";
    return <a target={target} href={url} >{text}</a>;
  };

  renderDownloadLink(url, text, target) {
    target = target || "_blank";
    return <a target={target} href={url} download="SaveYourVenue-Collage.jpg">{text}</a>;
  };

  renderImage(url) {
    return <img src={url} alt=""/>;
  };

  addPlaceLink(text) {
    return this.renderLink(Constants.AddPlaceURL, text, "_self");
  };

  getBody = () => {
    return { __html: this.props.body };
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Modal
          title="Ask For Help"
          visible={this.state.visible}
          width="80%"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <h2>We are here for you</h2>
          <p>We understand that this must be difficult time for you, your family and your customers. Our mission is to help you surive the Covid-19 pandemic. 
            We believe that if you follow the steps provided on this help page, you will increase the likelyhood of getting more help from your local community allowing you to get through this unforseen circumstances.</p>
          <h2>Steps</h2>
          <ol>
            <li>Create a donation page for your business on {this.renderLink("https://uk.gofundme.com/", "GoFundMe")}</li>
            <li>If we don't have your restaurant on our website yet, add it {this.addPlaceLink("here")} along with your donation, takeaway and/or gift card links</li>
            <li>Find and reach out to your local community on {this.renderLink("https://www.facebook.com/groups/", "Facebook Groups")} using the template below - feel free to personalize it!</li>
            <li>Ask any questions at {this.renderLink("mailto:info@saveyourvenue.org", "info@saveyourvenue.org")}</li>
          </ol> 
          <h2>Facebook Post Template to copy</h2>
          <ol>
            <li>{this.renderDownloadLink(this.state.placeCollagePicture, "Download", "_self")} collage picture we created for you</li>
            <li>Copy the text from the template below and post it in your local community on {this.renderLink("https://www.facebook.com/groups/", "Facebook Groups")}</li>
            <li>In case you need it, this is a link to your restaurant on SaveYourVenue.org: {this.renderLink("https://www.saveyourvenue.org/place/" + this.state.place.placeID, "https://www.saveyourvenue.org/place/" + this.state.place.placeID)}</li>
          </ol>
          <div className="fb-template">
            <div className="header">
              <div>
                <img class="profile-picture" src={this.state.place.imageURL} alt="" />
              </div>
              <div>
                <div><a className="name">{this.state.place.name}</a></div>
                <div><span className="date">3 hr</span></div>
              </div>
            </div>
            <p>We are dying! <br/>
              Its hard to write these things in a local facebook group. But it's time to ask for help from local people.<br/>
              We are {this.state.place.name}, {this.state.place.address}<br/>
              The business had been running quite well until the coronavirus started.<br/>
              🙁 People fear to come to the restaurant. But we know you still need to eat.<br/>
              ✅ You can order takeaway or donate at {this.renderLink("https://www.saveyourvenue.org/place/" + this.state.place.placeID, "https://www.saveyourvenue.org/place/" + this.state.place.placeID)}<br/><br/>
              Without your support, our restaurant will die!<br/>
              It's so hard at the moment. Thank you very much for reading! Wish you all to stay safe and together we will overcome this difficult times!<br/>
            </p>
            {this.renderImage(this.state.placeCollagePicture)}<br/>
            <div class="buttons">
              <div class="_2pi4 _36iq _4lk2 _3xre _2165" title="Like">
                <i class="_3-8_ _2yf7 _5jp _2166 img sp_post-plugin sx_post-plugin_like-light"></i>87K
              </div>
              <div class="_2pi4 _36iq _4lk2 _3xre _1p4p" title="Comment">
                <i class="_3-8_ _2yf7 _5jp _4mlr img sp_post-plugin sx_post-plugin_comment-light"></i>8.2K
              </div>
              <div class="_2pi4 _36iq _4lk2 _3xre _50sk" title="Share">
                <i class="_3-8_ _2yf7 _5jp _2167 img sp_post-plugin sx_post-plugin_share-light"></i>15K
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default AskForHelpModal;

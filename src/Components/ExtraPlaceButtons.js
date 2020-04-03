import React from "react";
import { Button, Tooltip, message } from "antd";
import { ShareAltOutlined } from "@ant-design/icons";
import { LogEngagementEvent } from "../Logging";
import AskForHelpModal from "./AskForHelpModal";

export class ExtraPlaceButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAskForHelp: false
    };
  }

  copyToClipboard(str){
    if(navigator.clipboard){
      navigator.clipboard.writeText(str)
    }
    else{
      const el = document.createElement('textarea');
      el.value = str
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    message.success('Copied');
  }

  hideModal = (e) => {
    window.history.pushState({}, null, window.history.state.prevUrl);
    this.setState({ showAskForHelp: false });
  }

  showModal = (e) => {
    window.history.pushState({prevUrl: window.location.href}, null, "/place/" + this.props.place.placeID + "/ask-for-help/");
            this.setState({showAskForHelp: true});
            LogEngagementEvent(
              "user-click",
              "ask-for-help",
              this.props.place.placeID);
  }

  render() {
    var place = this.props.place;
    return (
      <div className="place-buttons">
        <Button 
          type="link" 
          size="small"
          onClick={this.showModal}
        >
        Own this place?
        </Button>
        <AskForHelpModal visible={this.state.showAskForHelp} onCancel={this.hideModal}  place={this.props.place} />
        <Tooltip title="copy">
          <Button
            shape="circle"
            size="small"
            type="default"
            icon={<ShareAltOutlined />}
            onClick={(event) => {
              LogEngagementEvent(
                "user-click",
                "share",
                place.placeID
              );
              this.copyToClipboard(window.location.origin + "/place/" + place.placeID)
            }}
          >
          </Button>
        </Tooltip>
      </div>
    );
  }
}
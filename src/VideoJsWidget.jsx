import { Component, createElement } from "react";

// import { VideoJS } from "./components/VideoJS";
import { NuevoJS } from "./components/NuevoJS";
import "./ui/VideoJsWidget.css";
// import "video.js/dist/video-js.css"
import "./videojs/skins/shaka/videojs.min.css"

export default class VideoJsWidget extends Component {
    constructor(props) {
        super(props);
    }

    // render() {
    //     return (
    //         <VideoJS
    //             value={this.props.URL ? this.props.URL.displayValue : ""}
    //             height={this.props.height }
    //             width={this.props.width }
    //             poster={this.props.poster.displayValue }
    //             aspectRatio = {this.props.aspectRatio}
    //         />
    //     );
    // }


    render() {
    return (
        <NuevoJS
            value={this.props.URL ? this.props.URL.displayValue : ""}
            height={this.props.height }
            width={this.props.width }
            poster={this.props.poster.displayValue }
            aspectRatio = {this.props.aspectRatio}
        />
    );
}

}

import { Component, createElement } from "react";
import classNames from "classnames";
import videojs from 'video.js';
import "../videojs/video.min.js"
import "../videojs/nuevo.min.js"
require('videojs-share');
import {Helmet} from "react-helmet";
// require('videojs-rotatezoom');

// require('videojs.zoomrotate')


export class NuevoJS extends Component {

  updateNeuvo = false;
  componentDidMount() {

    this.player = videojs(this.videoNode);

  }

  componentDidUpdate(){
    var shareButton = document.querySelector('.vjs-share-button');
    if (shareButton !== null){
      shareButton.addEventListener('click', event => {
      var embed = document.querySelector("input.embed-code");
      if (embed !== null){
        embed.removeAttribute('readonly');
        embed.value = "<iframe src= '"+encodeURI(this.props.value)+"' width='560' height='315' frameborder='0' allowfullscreen></iframe>";
      }
      });
    }

  }


  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    
    if (this.player !== undefined){
      this.player.src(this.props.value);
      this.player.height(this.props.height);
      this.player.width(this.props.width);
      this.player.autoplay(true);
      this.player.poster(this.props.poster);
      this.player.aspectRatio(this.props.aspectRatio);
      if (this.updateNeuvo == false){
        this.player.nuevo({ 
          title: "HiCast Sports Network",
          url: "https://hicast-test.mendixcloud.com/",
          embed: "<iframe src= '"+encodeURI(this.props.value)+"' width='560' height='315' frameborder='0' allowfullscreen></iframe>",
          zoonInfo:true,
          zoomWheel:true,	liveTimeout:10});
      }

        this.updateNeuvo = true;
    // debugger;
    //   var embed = document.querySelector("input.embed-code");
    //   if (embed !== null){
    //     embed.removeAttribute('readonly');
    //     embed.value = "<iframe src= '"+encodeURI(this.props.value)+"' width='560' height='315' frameborder='0' allowfullscreen></iframe>";
    //   }



    }
    return (
      <div>	
        <div data-vjs-player>
          <video ref={ node => this.videoNode = node } className="video-js vjs-big-play-centered"></video>
        </div> 
      </div>

    );
  }
}

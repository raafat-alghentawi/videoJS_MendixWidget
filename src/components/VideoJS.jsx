import { Component, createElement } from "react";
import classNames from "classnames";
import videojs from 'video.js';
// import "../ui/nuevo.min.js"
require('videojs-share');
// require('videojs-rotatezoom');

// require('videojs.zoomrotate')


export class VideoJS extends Component {

  
  componentDidMount() {

    let videoJsOptions = {
      autoplay: true,
      controls: true,
      playbackRates: [0.25, 0.5, 1, 1.5, 2]
    
    }
    
    this.player = videojs(this.videoNode, videoJsOptions);


    // this.player = videojs(this.videoNode, videoJsOptions, function onPlayerReady() {
    //   console.log('onPlayerReady', this)
    // });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }
  // socials: ['fb', 'tw', 'reddit', 'gp', 'messenger', 'linkedin', 'telegram', 'whatsapp', 'viber', 'vk', 'ok', 'mail'],
  render() {

    if (this.player !== undefined){

      this.player.src(this.props.value);
      this.player.height(this.props.height);
      this.player.width(this.props.width);
      this.player.autoplay(true);
      this.player.poster(this.props.poster);
      this.player.aspectRatio(this.props.aspectRatio);
      // this.player.zoomrotate({
      //   zoom: 1.5
      // });


      var shareOptions = {
        // socials: ['fb', 'tw', 'linkedin', 'telegram', 'whatsapp', 'mail'],
        socials: ['fb', 'tw','whatsapp', 'linkedin', 'mail', 'reddit', 'gp', 'messenger',  'telegram', 'viber', 'vk', 'ok'],
        url: this.props.value,
        title: 'Sahre',
        description: 'Socail share',
        image: 'https://dummyimage.com/1200x630',
      
        // required for Facebook and Messenger
        fbAppId: '187883512684704',
        // optional for Facebook
        redirectUri: window.location.href + '#close',
      
        // optional for VK
        isVkParse: true,
        
        // optinal embed code
        embedCode : "<iframe src= '"+encodeURI(this.props.value)+"' width='560' height='315' frameborder='0' allowfullscreen></iframe>"
      }

     this.player.share(shareOptions);

    }
    return (

      <div>	
        <div data-vjs-player>
          <video ref={ node => this.videoNode = node } className="video-js vjs-big-play-centered"></video>
        </div>      
      </div>
    )
  }
}

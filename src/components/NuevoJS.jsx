import { Component, createElement } from "react";
import classNames from "classnames";
import videojs from 'video.js';
import "../videojs/video.min.js"
import "../videojs/nuevo.min.js"
import "../lib/canvas2image.js"
require('videojs-share');
import {Helmet} from "react-helmet";
// import {captureVideoFrame} from "capture-video-frame.js";
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
    var player = this.player;


    this.player.on('play', () => { 

      var captureTimer = setInterval(function(){
      var pausetime = 1;
      var currentTime = player.currentTime() ;
      if ( currentTime >= pausetime) {
        
        clearInterval(captureTimer);

        debugger;
        var video = document.getElementById('my-video_html5_api');
        video.setAttribute('crossorigin', 'anonymous'); // works for me
        // video.crossOrigin = "Anonymous";
        // var w, h, ratio;
        // ratio = 500/ 700;
        var w = player.width();
        var h = player.height();
        var canvas = document.createElement('canvas');
        // canvas.setAttribute('crossorigin', 'anonymous'); // works for me
        canvas.width = w;
        canvas.height = h;
        var ctx = canvas.getContext('2d');
        // 
        ctx.drawImage(video, 0, 0, w, h);
        // var pixels = ctx.getImageData(0, 0, w, h);
        const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
        var link = document.getElementById('link');
        
        link.setAttribute('download', 'MintyPaper.png');
        link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
        link.click();

        // canvas.toBlob(function(blob) {
        //   debugger;
        //  

          
        //   var newImg = document.createElement('img'),
        //       url = URL.createObjectURL(blob);
        
        //   newImg.onload = function() {
        //     // no longer need to read the blob so it's revoked
        //     URL.revokeObjectURL(url);
        //   };
        
        //   newImg.src = url;
        //   document.body.appendChild(newImg);
        // });


        // canvas.toBlob() = (blob) => {
        //   const img = new Image();
        //   img.src = window.URL.createObjectUrl(blob);
        // };

        

        // document.getElementById("preview").appendChild(canvas);
        // window.location.href=image;

        // Canvas2Image.saveAsPNG(canvas);


        // console.log('canvas data: ', data); 





        alert('Capture here');
        
    }

   }, 1000);//
      
    });


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
      this.player
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
          <video id="my-video" ref={ node => this.videoNode = node } className="video-js vjs-big-play-centered"  ></video>
        </div> 
        <div id="preview"></div>
        <a id="link"></a>
      </div>

    );
  }
}

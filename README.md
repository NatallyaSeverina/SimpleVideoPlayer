This project is meant to show an understanding and ability to use the html <video> tag and
its API.
Natives controls are hidden
 A personalised progress bar is visible and update during playback
 A custom play/pause button(s) implemented and control the video
 Implementation with  javascript (document.querySelector..)
 Some units testing. (mocha)

## Deploy of player 

Add script to your html page
```html
<script src="https://cdn.rawgit.com/NatallyaSeverina/SimpleVideoPlayer/dc2ac31b/src/js/SimpleVideoPlayer.js"></script>
```

Below that add this script with your div element and video url

```javascript
(function () {
   new SimpleVideoPlayer
   (document.getElementById("videoContainer"),//your container id
   "https://s3-eu-west-1.amazonaws.com/onrewind-test-bucket/big_buck_bunny.mp4");// source of video
  })();
```

And add style tag with this content

```css
    .progressBar {
			width: 650px;
		}
		[data-role="play-pause"].paused:after {
			font-weight: bold;
			content: '>';
		}
		[data-role="play-pause"].played:after {
			font-weight: bold;
			content: '||';
		}
```

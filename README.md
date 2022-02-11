## DISCLAIMER: THIS PROJECT IS NOT READY FOR COMMERCIAL USE 
This project is still in its development stages, and needs much security improvements before suitable for commercial use. **Use a test network to send transactions.**
-----------
### **CREATED AT**: https://showcase.ethglobal.com/roadtoweb3/web3player

![](https://dl.airtable.com/.attachments/388f9fa5c2e25024013766c335512504/7af06419/road_to_web3_banner_4.png)

# Web3Player
<img width="300" alt="web3player logo 2" src="https://user-images.githubusercontent.com/52806204/152709033-f2fe11f8-a1a1-44ab-8789-db2d29c28fe8.PNG">


## An open-source Web3 enabled video player for you to embed in your website.
### Demo
View demo at https://mubarakone.github.io/Web3Player/.
Change the branch from `main` to `site` if you want to view the `index.html` html file being used.

### Prerequisites 
1) Have an Ethereum address ready to use for transactions.
2) Have a video file (`.mp4`,`.wmv`, etc...) stored in the cloud with a URL linked directly to it.
3) Have a price to charge users per stream (meaning from start to end of video), **price is only in ETH**.

### Installation
Download the `web3-player.js` file into your workspace folder.

Open your HTML file and add these Javascript files to your script tags.

```
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
<script src="https://unpkg.com/moralis@latest/dist/moralis.js"></script>
```
Including the file you downloaded in your workspace
```
<script src="web3-player.js"></script>
```

Then you can embed the video player with these custom elements:

```
<web3-video></web3-video>
```
Once you have the video on your page, be sure to include the attribute `insertLink=""` and insert your video source link you uploaded to the cloud.
```
<web3-video 
insertLink="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4">
</web3-video>
```


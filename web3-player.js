//ADD YOUR ETHEREUM ADDRESS HERE:

let walletAddress = "0x0BC58805c5e5B1b020AfE6013Eeb6BcDa74DF7f0"

//ADD YOUR PRICE PER VIDEO IN ETH HERE:

let price = "0.00005" //ETH

//ADD YOUR URL TO YOUR VIDEO SOURCE HERE:

let insertLink = "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"


function submitInput() {
    price = document.getElementById("inputPrice").value
    walletAddress = document.getElementById("inputAddress").value
    insertLink = document.getElementById("inputLink").value
}

 /** Connect to Moralis server */
 const serverUrl = "https://lncdodnxyziw.usemoralis.com:2053/server";
 const appId = "CWG11Qpxn8R1QQhMmDpmnxmDvmrWxVvyHTkMrMAf";

 Moralis.start({ serverUrl, appId });


 let user
 async function logIn() {
    user = Moralis.User.current(); 
   if (user) {
    try {
       user = await Moralis.authenticate({ signingMessage: "Hello World!" })
       console.log(user)
       console.log(user.get('ethAddress'))
    } catch(error) {
      console.log(error)
      alert("Install Metamask to your browser!")
    }
   }
   return Boolean(user)
 }
 
 async function logOut() {
   let result = Boolean(await Moralis.User.logOut());
   console.log("logged out")
    return result 
 }
 
 async function payToPlay() {
     await Moralis.enableWeb3();
     const web3 = new Web3(Moralis.provider)
     const options = {type: "native", amount: Moralis.Units.ETH(price), receiver: 
     walletAddress}
     const transaction = await Moralis.transfer(options) 
     let result = Boolean(await transaction.wait())
     return result
 }
 
 /** Useful Resources  */
 
 // https://docs.moralis.io/moralis-server/users/crypto-login
 // https://docs.moralis.io/moralis-server/getting-started/quick-start#user
 // https://docs.moralis.io/moralis-server/users/crypto-login#metamask
 
 /** Moralis Forum */
 
 // https://forum.moralis.io/
 
 const template = document.createElement('template');
 template.innerHTML = `
 <style>
     .btn-logout{
        display: none; left: 100%; margin: 0 auto; padding: 19px 14px; position: absolute; right: 0; top: 40%; font-size: 18px; font-weight: bold; z-index: 1;
    }
    .btn-login{
        display: none; left: 100%; margin: 0 auto; padding: 19px 14px; position: absolute; right: 0; top: 40%; font-size: 18px; font-weight: bold; z-index: 1;
    }
    .payToPlay{
        display: block; left: 80%; margin: 0 auto; padding: 19px 14px; position: absolute; right: 0; top: 40%; font-size: 18px; font-weight: bold; z-index: 1;
    }
 </style>
 <div>
     <div style="position: relative; width: 350px;">
         <button id="payToPlay" class="payToPlay">Play</button>
         <button id="btn-login" class="btn-login">Login</button>
         <button id="btn-logout" class="btn-logout">Logout</button>
         <video 
             controlsList="nodownload"
             oncontextmenu="return false;"
             preload="auto" 
             class="web3-video" 
             style="z-index: -1;"
         >
         </video>
     </div>
 </div>
 `
 
 class web3Video extends HTMLElement {
     constructor() {
         super();
         this.showInfo = true;
         this.attachShadow({ mode : 'open'});
         this.shadowRoot.appendChild(template.content.cloneNode(true));
         this.shadowRoot.querySelector('video').innerHTML = this.getAttribute('src');
         this.shadowRoot.querySelector('video').src = insertLink;
     }

     async switchOut(){
         //this.showInfo = this.showInfo;
         const login = this.shadowRoot.querySelector("#btn-login");
         const logout = this.shadowRoot.querySelector("#btn-logout")
         if(await logOut()){
             login.style.display = "inline-block";
             logout.style.display = "none"
         }else{
             login.style.display = "none";
         }
     }

     async switch(){
         //this.showInfo = this.showInfo;
         const login = this.shadowRoot.querySelector("#btn-login");
         const logout = this.shadowRoot.querySelector("#btn-logout")
         if(await logIn()){
             login.style.display = "none";
             logout.style.display = "inline-block"
             
         }else{
             login.style.display = "inline-block";
         } 
      }

       playVideo() {
         // Show loading animation.
        const login = this.shadowRoot.querySelector("#btn-login")
        const logout = this.shadowRoot.querySelector("#btn-logout")
        const playButton = this.shadowRoot.querySelector("#payToPlay")
        const videoElement = this.shadowRoot.querySelector('video')
        var playPromise = videoElement.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                videoElement.setAttribute("controls","controls") 
                playButton.style.display = "none"
                login.style.display = "none"
                logout.style.display = "none"     
                console.log("Automatic playback started!")
                // Show playing UI.
                })
                .catch(error => {
                console.log("Auto-play was prevented")
                // Show paused UI.
                });
            }
        videoElement.addEventListener('ended', myHandler, false)
        function myHandler(e) {
            videoElement.removeAttribute("controls", "controls")
            playButton.style.display = "block"
            playButton.style.left = "10%"
            playButton.style.right = "0"
            logout.style.display = "block"
        }
      }

      async getResults(){
          if (await payToPlay()) {
              this.playVideo()
          } else {
              console.log("getResults() function did not work")
              alert("Install Metamask to your browser!")
          }
      }
 
     connectedCallback() {
         this.shadowRoot.querySelector('#btn-login').addEventListener('click', () => this.switch());
         this.shadowRoot.querySelector('#btn-logout').addEventListener('click', () => this.switchOut());
         this.shadowRoot.querySelector('#payToPlay').addEventListener('click', () => this.getResults());
      }  
 }

 customElements.define("web3-video", web3Video);

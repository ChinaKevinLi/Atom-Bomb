const { app, BrowserWindow,Notification } = require('electron')

let mainWindow
let WelcomeWindow
let UIWindow

aria2token = ""

function createUIWindow () {
  UIWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false
  })
  UIWindow.loadFile('./resource/webui/index.html')
  mainWindow = UIWindow
  UIWindow.on('closed', function () {
    mainWindow = null
  })
}

function createWelcomeWindow () {
  WelcomeWindow = new BrowserWindow({
    width: 500,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false
  })
  WelcomeWindow.loadFile('./resource/html/welcome.html')
  mainWindow = WelcomeWindow
  const stringRandom = require('string-random');
  aria2token = stringRandom(20);
  var aria2c = require('child_process').spawn;
  const os = require('os');
  aria2c('aria2c.exe', ['--enable-rpc', '--rpc-listen-all','--rpc-secret=zkinMD4wJuDFjldb6uRHrR6V4', '--dir=' + os.homedir() + '\\Downloads', '--max-connection-per-server=16','--continue=true','--bt-tracker=udp://tracker.coppersurfer.tk:6969/announce,udp://tracker.internetwarriors.net:1337/announce,udp://tracker.opentrackr.org:1337/announce,udp://9.rarbg.to:2710/announce,udp://9.rarbg.me:2710/announce,http://tracker3.itzmx.com:6961/announce,http://tracker1.itzmx.com:8080/announce,udp://tracker.openbittorrent.com:80/announce,udp://exodus.desync.com:6969/announce,udp://tracker.torrent.eu.org:451/announce,udp://tracker.tiny-vps.com:6969/announce,udp://retracker.lanta-net.ru:2710/announce,udp://open.demonii.si:1337/announce,udp://bt.xxx-tracker.com:2710/announce,udp://tracker2.itzmx.com:6961/announce,udp://tracker.cyberia.is:6969/announce,udp://open.stealth.si:80/announce,udp://denis.stalker.upeer.me:6969/announce,udp://tracker4.itzmx.com:2710/announce,http://open.acgnxtracker.com:80/announce','--enable-dht=true','--enable-peer-exchange=true','--dht-listen-port=60000']);
  setTimeout(function(){createUIWindow ();WelcomeWindow.close();},3500);
}

app.on('ready', function(){
  createWelcomeWindow();
  const betanotificationcontent = {
    title: 'Atom Bomb内测',
    body: '您正在使用Atom Bomb内测版本，请勿外传。'
  };

  const betanotification = new Notification(betanotificationcontent);
  betanotification.show();
}
)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWelcomeWindow()
  }
})

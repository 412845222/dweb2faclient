const { ipcMain } = require("electron");
const sqlite3 = require("sqlite3").verbose();
const otplib = require("otplib");
class Dweb2FA {
  db = new sqlite3.Database("accountDB");
  constructor(option) {
    ipcMain.on("dweb2fa", this.msgToRenderer);
    this.init();
  }

  msgToRenderer = (event, msg) => {
    if (msg.event == "totp") {
      console.log("----totp auth----");
      console.log(msg);
      let token = this.totpAuth(msg.data.secret);
      if (token) {
        event.reply("totp", { data: {
          token: token,
          account: msg.data.account,
        } });
      }else{
        event.reply("totp", { data: false });
      }
    }
    if (msg.event=="saveAccount") {
      console.log("----save account----");
      console.log(msg);
      this.insert(event,msg.data)
    }
    if (msg.event=="deleteAccount") {
      console.log("----delete account----");
      console.log(msg);
      this.delete(event,msg.data)
    }
    if (msg.event=="queryAll") {
      console.log("----query all account----");
      console.log(msg);
      this.query(event,{method:"all"})
    }
  };

  totpAuth(secret) {
    try {
      const token = otplib.authenticator.generate(secret);
      console.log("current token:", token);
      return token;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  delete(event,data){
    console.log("------msg delete sql----")
    console.log(data)
    let str = "DELETE FROM ACCOUNTLIST WHERE id=?"
    this.db.run(str,[data.id],(res,err)=>{
      if (err) {
        console.log(err);
        return;
      }
      console.log(res);
      this.query(event,{method:"all"})
    })
  }

  query(event,data){
    if (data.method=="all") {
      console.log("------msg query sql----")
      let str = "SELECT * FROM ACCOUNTLIST";
      this.db.all(str, (err, res) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(res);
        
        res.forEach((item) => {
          item.token = this.totpAuth(item.secret);
        });
        event.reply("query-all",res)
      })
    }
  }

  insert(event,data){
    console.log("------msg insert sql----")
    console.log(data)
    let str = "INSERT INTO ACCOUNTLIST (secret,account) VALUES (?,?)";
    this.db.run(str, [data.secret, data.account], (res, err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(res);
      this.query(event,{method:"all"})
    });
  }

  init() {
    let str = "CREATE TABLE ACCOUNTLIST (" + "secret TEXT," + "account TEXT," + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT" + ");";

    this.db.run(str, (res, err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(res);
    });
  }
}

module.exports = {
  Dweb2FA: Dweb2FA,
};

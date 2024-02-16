
import jsQR from 'jsqr';

export class DwebCanvas {

  width: number = 0;
  height: number = 0;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D|null;

  erweimaPixel: ImageData|null = null;
  erweimaSecret: string|null = '';

  constructor(option:{
    width: number,
    height: number,
    canvas: HTMLCanvasElement,
  }) {
    this.width = option.width;
    this.height = option.height;
    this.canvas = option.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.init()
  }

  init(){
    this.ctx!.fillStyle = '#3AA9B480';
    this.ctx!.fillRect(0, 0, this.width, this.height);
  }

  drawImage(file: File){
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      this.ctx!.drawImage(img, 0, 0, this.width, this.height);
      let imgData = this.ctx!.getImageData(0, 0, this.width, this.height);
      this.erweimaPixel = imgData;
    }
  }

  scanErweima(){
    //开始扫描二维码
    if (this.erweimaPixel) {
      const code = jsQR(this.erweimaPixel.data, this.erweimaPixel.width, this.erweimaPixel.height);
      if (code) {
        console.log(code.data)
        let username = code.data.split('?')[0].split('//')[1];
        let ret = {
          username:username,
          secret: new URLSearchParams(new URL(code.data).search).get('secret')
        }
        return ret
      } else {
        console.log('未能识别到二维码');
      }
    }
  }

}
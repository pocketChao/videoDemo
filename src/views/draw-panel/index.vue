<template>
  <div class="draw-panel">
    <canvas id="image"></canvas>
    <canvas
      id="panel"
      style="position: absolute; left: 0; top: 0; z-index: 1"
    ></canvas>
    <div class="tools">
      <div class="tools-box">
        <div id="brush" @click="clickWithToolNum(1)">画笔</div>
        <div id="eraser" @click="clickWithToolNum(2)">橡皮擦</div>
        <div id="save">保存</div>
        <div id="clear" @click="clickWithToolNum(4)">清屏</div>
        <div id="undo" @click="revert">撤销</div>
        <div id="redo" @click="unRevert">反撤销</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "draw-panel",
  data() {
    return {
      panelCanvas: undefined,
      panelContext: undefined,
      imageCanvas: undefined,
      imageContext: undefined,
      imagePath: require("@/assets/images/f.jpg"),
      // 工具编号 1.画笔 2.橡皮
      toolNumber: 0,
      // 是否正在用编辑面板
      painting: false,
      // 记录画笔最后一次的位置
      lastPoint: { x: undefined, y: undefined },
      // canvas每次绘制的快照数组
      panelCanvasHistory: [],
      // 记录画板一共花绘制几次
      paintingStep: -1
    };
  },
  mounted() {
    const clientWidth = document.documentElement.clientWidth / 2;
    const clientHeight = document.documentElement.clientHeight / 2;
    // // 初始化背景图片
    this.imageCanvas = document.getElementById("image");
    this.imageContext = this.imageCanvas.getContext("2d");
    this.imageCanvas.width = clientWidth;
    this.imageCanvas.height = clientHeight;
    const img = new Image();
    img.src = this.imagePath;
    img.onload = () => {
      this.imageContext.drawImage(img, 0, 0, clientWidth, clientHeight);
    };
    // 初始化画板
    this.panelCanvas = document.getElementById("panel");
    this.panelContext = this.panelCanvas.getContext("2d");
    this.panelCanvas.width = clientWidth;
    this.panelCanvas.height = clientHeight;
    this.listenToUser();
    // window.addEventListener("resize", this.panelReSize);
  },
  methods: {
    clickWithToolNum(toolNum) {
      this.toolNumber = toolNum;
      if (toolNum === 4) {
        this.clearAll();
      }
    },
    clearAll() {
      this.panelContext.beginPath();
      this.panelContext.clearRect(
        0,
        0,
        this.panelCanvas.width,
        this.panelCanvas.height
      );
    },
    panelReSize() {
      const imgData = this.panelContext.getImageData(
        0,
        0,
        this.panelCanvas.width,
        this.panelCanvas.height
      );
      const panelWidth = document.documentElement.clientWidth;
      const panelHeight = document.documentElement.clientHeight;
      this.panelCanvas.width = panelWidth;
      this.panelCanvas.height = panelHeight;
      this.panelContext.putImageData(imgData, 0, 0);
    },
    listenToUser() {
      // 鼠标按下事件
      this.panelCanvas.onmousedown = e => {
        const x = e.clientX;
        const y = e.clientY;
        if (this.toolNumber === 1) {
          this.painting = true;
          this.lastPoint = { x: x, y: y };
          // this.drawCircle(x, y, 5);
        } else if (this.toolNumber === 2) {
          this.painting = true;
          //要使用eraser
          this.panelContext.clearRect(x - 5, y - 5, 10, 10);
        }
      };

      // 鼠标移动事件
      this.panelCanvas.onmousemove = e => {
        if (!this.painting) {
          return;
        }
        const x = e.clientX;
        const y = e.clientY;
        if (this.toolNumber === 1) {
          if (this.painting) {
            const newPoint = { x: x, y: y };
            this.drawLine(
              this.lastPoint.x,
              this.lastPoint.y,
              newPoint.x,
              newPoint.y
            );
            this.lastPoint = newPoint;
          }
        } else if (this.toolNumber === 2) {
          this.panelContext.clearRect(x - 5, y - 5, 10, 10);
        }
      };

      // 鼠标松开事件
      this.panelCanvas.onmouseup = () => {
        console.log("mouseup");
        if (this.painting) {
          console.log("保存步骤");
          this.painting = false;
          this.recordCanvasDraw();
        }
      };
    },
    recordCanvasDraw() {
      this.paintingStep++;
      if (this.paintingStep < this.panelCanvasHistory.length) {
        this.panelCanvasHistory.length = this.paintingStep; // 截断数组
      }
      // 添加新的绘制到历史记录
      this.panelCanvasHistory.push(
        JSON.stringify(this.panelCanvas.toDataURL())
      );
    },
    // 撤销
    revert() {
      console.log(this.paintingStep);
      console.log(this.panelCanvasHistory);
      if (this.paintingStep > 0) {
        this.paintingStep--;
        const canvasPic = new Image();
        console.log(this.paintingStep);
        canvasPic.src = this.panelCanvasHistory[this.paintingStep];
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;
        canvasPic.onload = function() {
          console.log("wtf!!!");
          console.log("load!!!");
          console.log(canvasPic);
          console.log(that.panelContext);
          that.panelContext.drawImage(
            canvasPic,
            0,
            0,
            that.panelCanvas.width,
            that.panelCanvas.height
          );
        };
      }
    },
    unRevert() {
      if (this.paintingStep < this.panelCanvasHistory.length - 1) {
        this.paintingStep++;
        const canvasPic = new Image();
        canvasPic.src = this.panelCanvasHistory[this.paintingStep];
        canvasPic.onload = () => {
          // ctx.clearRect(0,0,canvas.width,canvas.height);
          this.panelContext.drawImage(canvasPic, 0, 0);
        };
      }
    },
    // 画点函数
    drawCircle(x, y, radius) {
      // 新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
      this.panelContext.beginPath();
      // 画一个以（x,y）为圆心的以radius为半径的圆弧（圆），
      // 从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。
      this.panelContext.arc(x, y, radius, 0, Math.PI * 2);
      // 通过填充路径的内容区域生成实心的图形
      this.panelContext.fill();
      // 闭合路径之后图形绘制命令又重新指向到上下文中。
      this.panelContext.closePath();
    },
    drawLine(x1, y1, x2, y2) {
      this.panelContext.beginPath();
      // 设置线条宽度
      this.panelContext.lineWidth = 10;
      // 设置线条末端样式。
      this.panelContext.lineCap = "round";
      // 设定线条与线条间接合处的样式
      this.panelContext.lineJoin = "round";
      // moveTo(x,y)将笔触移动到指定的坐标x以及y上
      this.panelContext.moveTo(x1, y1);
      // lineTo(x, y) 绘制一条从当前位置到指定x以及y位置的直线
      this.panelContext.lineTo(x2, y2);
      // 通过线条来绘制图形轮廓
      this.panelContext.stroke();
      this.panelContext.closePath();
    }
  }
};
</script>

<style lang="scss" scoped>
.draw-panel {
  height: 100vh;
  background: gray;
  .tools {
    width: 50%;
    height: 80px;
    .tools-box {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>

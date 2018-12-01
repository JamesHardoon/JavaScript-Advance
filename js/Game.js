	//自调用函数---游戏对象
(function () {
	//该变量的目的就是为了保存游戏Game的实例对象
	var that = null;

	//游戏的构造函数
	function Game(map) {
		this.food = new Food();//食物对象
		this.snake = new Snake();//小蛇对象
		this.map = map;//地图
		that = this;//保存当前的实例对象到that变量中---此时that就是this
	}

	//初始化游戏---可以设置小蛇和食物显示出来
	Game.prototype.init = function () {//初始化游戏
		//食物初始化
		this.food.init(this.map);
		//小蛇初始化
		this.snake.init(this.map);
		//调用自动移动小蛇的方法
		this.runSnake(this.food , this.map);
		//调用按键的方法
		this.bindKey();
	};

	//添加原型方法---设置小蛇可以自动的跑起来
	Game.prototype.runSnake = function (food , map) {

		//设置定时器,让小蛇自动的去移动
		var timeId = setInterval(function () {
			//此时setInterval函数里面的this是指window
			//移动小蛇
			this.snake.move(food , map);
			//初始化小蛇
			this.snake.init(map);
			//横坐标的最大值
			var maxX = map.offsetWidth / this.snake.width;
			//纵坐标的最大值
			var maxY = map.offsetHeight / this.snake.height;
			//小蛇的头的坐标
			var headX = this.snake.body[0].x;
			var headY = this.snake.body[0].y;
			//判断横坐标的范围
			if (headX < 0 || headX >= maxX) {
				//撞墙了,停止定时器
				clearInterval(timeId);
				alert("游戏结束");
			}
			//判断纵坐标的范围
			if (headY < 0 || headY >= maxY) {
				//撞墙了,停止定时器
				clearInterval(timeId);
				alert("游戏结束");
			}

		}.bind(that), 100);//bind(that)指改变定时器里面的this,让其指向Game的实例化对象
	};
	//添加原型方法---设置用户按键,改变小蛇移动的方向
	Game.prototype.bindKey = function () {
		//获取用户的按键,改变小蛇的方向
		document.addEventListener("keydown", function (e) {
			//这里的this应该是触发keydown的事件对象---document
			//所以,这里的this就是document
			//获取按键的值
			switch (e.keyCode) {
				case 37: this.snake.direction = "left"; break;
				case 38: this.snake.direction = "top"; break;
				case 39: this.snake.direction = "right"; break;
				case 40: this.snake.direction = "bottom"; break;
			}
		}.bind(that) , false);
	};

	//把Game暴露给window,使外部可以访问到Game对象
	window.Game = Game;
}());
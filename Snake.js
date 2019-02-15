    //自调用函数---小蛇
    (function () {
        var elements = [];

        function Snake(width, height, direction) {
            this.width = width || 20;
            this.height = height || 20;
            this.body = [{
                    x: 3,
                    y: 2,
                    color: "red"
                }, //头
                {
                    x: 2,
                    y: 2,
                    color: "orange"
                },
                {
                    x: 1,
                    y: 2,
                    color: "orange"
                }
            ];
            this.direction = direction || "right";
        };
        Snake.prototype.init = function (map) {
            remove();
            for (var i = 0; i < this.body.length; i++) {
                var obj = this.body[i];
                var div = document.createElement("div");

                div.style.position = "absolute";
                div.style.width = this.width + "px";
                div.style.height = this.height + "px";

                div.style.left = obj.x * this.width + "px";
                div.style.top = obj.y * this.height + "px";
                div.style.backgroundColor = obj.color;
                elements.push(div);
                map.appendChild(div);
            }
        };
        Snake.prototype.move = function (food, map) {
            var i = this.body.length - 1; //2 蛇身
            for (; i > 0; i--) {
                this.body[i].x = this.body[i - 1].x;
                this.body[i].y = this.body[i - 1].y;
            }
            //头部位置改变需要判断方向
            switch (this.direction) {
                case "right":
                    this.body[0].x += 1;
                    break;
                case "left":
                    this.body[0].x -= 1;
                    break;
                case "top":
                    this.body[0].y -= 1;
                    break;
                case "bottom":
                    this.body[0].y += 1;
                    break;
            }

            //判断有没有吃到食物
            var headX = this.body[0].x * this.width;
            var headY = this.body[0].y * this.height;
            //食物的横纵坐标
            var foodX = food.x;
            var foodY = food.y;
            if (headX == foodX && headY == foodY) {
                food.init(map);
                //添加身体
                var last = this.body[this.body.length - 1];
                this.body.push({
                    x: last.x,
                    y: last.y,
                    color: last.color
                });
            }
        };

        function remove() {
            console.log(elements)
            var i = elements.length - 1;
            for (; i >= 0; i--) {
                var ele = elements[i];
                ele.parentNode.removeChild(ele);
                elements.splice(i, 1);
            }

        }
        window.Snake = Snake;
    }());
var gamePattern = ["Hello there! My name is Astro! Do you know who I share my birthday with? I share my birthday with Parker Solar Probe! It was launched on 12 August 2018. So fun, huh?", "Hello! Astro is here!!I was wondering when was the first time I ate. I asked my mom and she said I was not even a year old. Do you know our Parker Solar Probe made it's first approach to the Sun, yes the big ball of fire! - on 11 November 2018? bravo!","Hello! Astro here!! Did you know Parker solar probe completed its eight close approach to the sun, coming within a record 6.5 million miles of the sun's surface on 9 April, 2019? So cool, right?","Hello! Astro is back! I won the first prize in a Racing Competition today!! I'm the fastest! But do you know who's faster than me? The Parker solar probe travels at the speed of 213,200 miles per hour. Wooo,so fast!","Hello there! It really gets hot in summers, doesn't it? Do you know, Parker can survive the Sun's harsh conditions because cutting-edge thermal engineering advances protect the spacecraft during its dangerous journey. So strong!","Hey its your friend Astro! I was named Astro because my mom wanted me to become an astronaut. That reminds me, that Parker Solar Probe was the first NASA mission named for a living person in honor of Eugene Parker, an Astrophysicist. We truly have so much in common, haha!"];






const score=document.querySelector('.score');
            const startScreen=document.querySelector('.startScreen');
            const gameArea=document.querySelector('.gameArea');
            /*console.log(gameArea);*/
            startScreen.addEventListener('click',start);
            let player={speed:5,score:0};
            let keys ={ArrowUp:false,ArrowDown:false,ArrowLeft:false,ArrowRight:false}

            document.addEventListener('keydown',keyDown);
            document.addEventListener('keyup',keyUp);

            function keyDown(e){
                e.preventDefault();
                keys[e.key]=true;
                // console.log(e.key);
                // console.log(keys);
            }
            function keyUp(e){
                e.preventDefault();
                keys[e.key]=false;
                // console.log(e.key);
                // console.log(keys);
            }

            function isCollide(a,b){
                aRect=a.getBoundingClientRect();
                bRect=b.getBoundingClientRect();
                return !((aRect.bottom<bRect.top)||(aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right))
            }

            function moveLines(){
                let lines=document.querySelectorAll('.lines');
                lines.forEach(function(item){
                    if(item.y >=650){
                        item.y-=740;
                    }
                    item.y+=player.speed;
                    item.style.top=item.y+"px";
                })
            }
            function endGame(){


                var randomNumber = Math.floor(Math.random()*6);
                var randomEvent = gamePattern[randomNumber];
                console.log(randomEvent);
                // console.log("my code");





                player.start=false;
                startScreen.classList.remove('hide');
                startScreen.innerHTML=randomEvent+" "+"<br>Press again to restart";
            }
            function moveEnemy(car){
                let enemy=document.querySelectorAll('.enemy');
                enemy.forEach(function(item){

                    if(isCollide(car,item)){
                        console.log("Bang!");
                        endGame();
                    }
                    if(item.y >=750){
                        item.y=-300;
                        item.style.left=Math.floor(Math.random()*350)+"px";
                    }
                    item.y+=player.speed;
                    item.style.top=item.y+"px";
                })
            }
            function gamePlay(){
                // console.log("here we go");

                let car=document.querySelector('.car');
                let road=gameArea.getBoundingClientRect();
                /*console.log(road);*/
                if(player.start){
                    moveLines();
                    moveEnemy(car);

                    if(keys.ArrowUp && player.y>(road.top+70)){
                        player.y-=player.speed
                    }
                    if(keys.ArrowDown && player.y<(road.bottom-85)){
                        player.y+=player.speed
                    }
                    if(keys.ArrowLeft && player.x>0 ){
                        player.x-=player.speed
                    }
                    if(keys.ArrowRight && player.x<(road.width-50)){
                        player.x+=player.speed
                    }
                    car.style.top=player.y+"px";
                    car.style.left=player.x+"px";
                    window.requestAnimationFrame(gamePlay);
                    // console.log(player.score++);
                    player.score++;
                    let ps=player.score-1;
                    score.innerText="Score: "+ps;
                }
            }
            function start(){
                //gameArea.classList.remove('hide');
                startScreen.classList.add('hide');
                gameArea.innerHTML="";
                player.start=true;
                player.score=0;
                window.requestAnimationFrame(gamePlay);

                for(x=0;x<5;x++){
                    let roadLine=document.createElement('div');
                    roadLine.setAttribute('class','lines');
                    roadLine.y=(x*150);
                    roadLine.style.top=roadLine.y+"px";
                    gameArea.appendChild(roadLine);
                }

                let car=document.createElement('div');
                car.setAttribute('class','car');
                /*car.innerText="Hey I am car";*/
                gameArea.appendChild(car);

                player.x=car.offsetLeft;
                player.y=car.offsetTop;


               /* console.log(car.offsetTop);
                console.log(car.offsetLeft);*/

                for(x=0;x<3;x++){
                    let enemyCar=document.createElement('div');
                    enemyCar.setAttribute('class','enemy');
                    enemyCar.y=((x+1)*350)*-1;
                    enemyCar.style.top=enemyCar.y+"px";
                    enemyCar.style.backgroundColor=randomColor();
                    enemyCar.style.left=Math.floor(Math.random()*350)+"px";
                    gameArea.appendChild(enemyCar);
                }


            }
            function randomColor(){
                function c(){
                    // let hex=Math.floor(Math.random()*256).toString(16);
                    // return ("0"+String(hex)).substr(-2);
                }
                return "#"+c()+c()+c();
            }
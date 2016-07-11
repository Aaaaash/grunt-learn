var board=new Array();
var score=0;            //存储游戏数据的数组
var hasConflicted=new Array();
var startx=0;
var starty=0;
var endx=0;
var endy=0;
$(function(){
    prepareForMobile();
    newgame();
});
function prepareForMobile(){
    if(documentWidth>768){
        gridContainerWidth=400;
        cellSpace=16;
        cellSideLength=80
    }
    $('#grid-container').css('width',gridContainerWidth-2*cellSpace);
    $('#grid-container').css('height',gridContainerWidth-2*cellSpace);
    $('#grid-container').css('padding',cellSpace);
    $('#grid-container').css('border-radius',0.02*gridContainerWidth);

    $('.grid-cell').css('width',cellSideLength);
    $('.grid-cell').css('height',cellSideLength);
    $('.grid-cell').css('border-radius',0.02*cellSideLength);
}
function newgame(){
    $('#gameover').fadeOut("normal");
    // 初始化游戏棋盘格
    init();
    // 随机两个格子中生成数字
    generateOneNumber();
    generateOneNumber();
};

function init(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            // 初始化方格位置
            var gridCell=$("#grid-cell-"+i+"-"+j);
            gridCell.css('top',getPosTop(i,j));
            gridCell.css('left',getPosLeft(i,j));
        }
    }
    for(var i=0;i<4;i++){
        // 初始化游戏数据（方格中的值）
        board[i]=new Array();
        hasConflicted[i]=new Array();
        for(var j=0;j<4;j++){
            board[i][j]=0;
            hasConflicted[i][j]=false;
        }
    }
    updateBoardView();
    score=0;
}

function updateBoardView(){
    // 根据board的值操作数字值
    $('.number-cell').remove();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            // number-cell里面放数字
            $('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell=$("#number-cell-"+i+'-'+j);
            if(board[i][j]==0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j)+cellSideLength/2);
                theNumberCell.css('left',getPosLeft(i,j)+cellSideLength/2);
            }else{
                theNumberCell.css('width',cellSideLength);
                theNumberCell.css('height',cellSideLength);
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
            hasConflicted[i][j]=false;
        }
    }
    $('.number-cell').css('line-height',cellSideLength+'px');
    $('.number-cell').css('font-size',0.6*cellSideLength+'px')
}
// 判断是否可以生成随机数
function generateOneNumber(){
    if(noscpace(board)){
        return false;
    }
    // 随机一个位置
    var randx=parseInt(Math.floor(Math.random()*4));
    var randy=parseInt(Math.floor(Math.random()*4));
    var times=0
    while(times<50){
        if(board[randx][randy]==0){
            break;
        }
        randx=parseInt(Math.floor(Math.random()*4));
        randy=parseInt(Math.floor(Math.random()*4));
        times++;
    }
    if(times==50){
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(board[i][j]=0){
                    randx=i;
                    randy=j;
                }
            }
        }
    }
    // 在随机位置上随机一个数字
    var randNumber=Math.random()<0.5?2:4;
    // 显示数字
    board[randx][randy]=randNumber;
    showNumberWidthAnimate(randx,randy,randNumber);     //动画函数
    return true;
}

$(document).keydown(function(event){
    switch (event.keyCode){
        case 37:
            // left
            event.preventDefault();
            if(moveLeft()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 38:
            // up
            event.preventDefault();
            if(moveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 39:
            // right
            event.preventDefault();
            if(moveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 40:
            // down
            event.preventDefault();
            if(moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",400);
            }
            break;
        default:
            break;
    }
});
document.addEventListener('touchstart',function(event){
    // 滑动起始点
    startx=event.touches[0].pageX;
    starty=event.touches[0].pageY;
});
document.addEventListener('touchmove',function(event){
    event.preventDefault();
});
document.addEventListener('touchend',function(event){
    // 滑动结束点
    endx=event.changedTouches[0].pageX;
    endy=event.changedTouches[0].pageY;
    var deltax=endx-startx;
    var deltay=endy-starty;
    if(Math.abs(deltax)<0.2*documentWidth&&Math.abs(deltay)<0.2*documentWidth){
        return false;
    }
    if(Math.abs(deltax)>=Math.abs(deltay)){
        // X
        if(deltax>0){
            // 右
            if(moveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }else{
            // 左
            if(moveLeft()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
    }else{
        // Y
        if(deltay>0){
            // 下
            if(moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",400);
            }
        }else{
            // 上
            if(moveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
    }
});
function isgameover(){
    // 游戏结束
    if(noscpace(board)&&nomove(board)){
        gameover();
    }
};
function gameover(){
    $('#gameover').fadeIn("normal");
}
function moveLeft(){
    // 判断是否可以左移
    if(!canMoveLeft(board)){
        return false;
    }
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(board[i][j]!=0){
                for(var k=0;k<j;k++){
                    if(board[i][k]==0&&noBlockHorizontal(i,k,j,board)){
                        // move
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)&&!hasConflicted[i][k]){
                        // move
                        showMoveAnimation(i,j,i,k);
                        // 叠加
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        // 加分
                        score+=board[i][k];
                        uodateScore(score);
                        hasConflicted[i][k]=true;
                        continue;
                    }
                }
            }
        }
    }
    var timer=setTimeout("updateBoardView()",200);
    return true;
}
function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }
    // moveRight
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            if(board[i][j]!=0){
                for(var k=3;k>j;k--){
                    if(board[i][k]==0&&noBlockHorizontal(i,j,k,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)&&!hasConflicted[i][k]){
                        // move
                        showMoveAnimation(i,j,i,k);
                        // 叠加
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        // 加分
                        score+=board[i][k];
                        uodateScore(score);
                        hasConflicted[i][k]=true;
                        continue;
                    }
                }
            }
        }
    }
    var timer=setTimeout("updateBoardView()",200);
    return true;
}
function moveUp(){
    // 判断是否可以上移
    if(!canMoveUp(board)){
        return false;
    }
    for(var i=1;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]!=0){
                for(var k=0;k<i;k++){
                    if(board[k][j]==0&&noBlockVertical(i,k,j,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[k][j]==board[i][j]&&noBlockVertical(i,k,j,board)&&!hasConflicted[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        score+=board[k][j];
                        uodateScore(score);
                        hasConflicted[k][j]=true;
                        continue;
                    }
                }
            }
        }
    }
    var timer=setTimeout("updateBoardView()",200);
    return true;
}
function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }
    for(var j=0;j<4;j++){
        for(var i=2;i>=0;i--){
            if(board[i][j]!=0){
                for(var k=3;k>i;k--){
                    if(board[k][j]==0&&noBlockVertical(i,k,j,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[k][j]==board[i][j]&&noBlockVertical(i,k,j,board)&&!hasConflicted[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        score+=board[k][j];
                        uodateScore(score);
                        hasConflicted[k][j]=true
                        continue;
                    }
                }
            }
        }
    }
    var timer=setTimeout("updateBoardView()",200);
    return true;
}

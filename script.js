let data = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
];
let game = {status:undefined,winner:undefined};

let currentPlayer = 1;

document.querySelectorAll(".box").forEach((el)=>{

    el.addEventListener("click",(e)=>{

        let dataId = e.target.getAttribute('data-id');
        let row = dataId.split("-")[0];
        let column = dataId.split("-")[1];
        
        if(data[row][column] == 0){
            data[row][column] = currentPlayer;

            let symbol = (currentPlayer === 1) ? "<span style='color:#21db98;'>X</span>" : "<span style='color:#547cf3;'>O</span>";
            e.target.innerHTML = symbol;

            checkGame();

            if(game.status === "DONE"){
                resetGame();
            }else{
                currentPlayer = (currentPlayer === 1) ? -1 : 1;
            }
        }

    });

});

function checkGame(){
   //CHECK ROWS
   data.forEach((row,idx)=>{updateGameStatus(row);});

   //CHECK COLUMNS
   data.forEach((row1,rowIdx)=>{

    let columnArray = [];

    data.forEach((row2)=>{
        row2.forEach((column,columnIdx)=>{
            if(rowIdx === columnIdx) columnArray.push(column)
        });
    });

    updateGameStatus(columnArray);
   });
   
   //CHECK DIAGONALS
   let diagonals = [
    [data[0][0],data[1][1],data[2][2]],//LEFT
    [data[0][2],data[1][1],data[2][0]]//RIGHT
   ];
   diagonals.forEach((diagonal)=>{updateGameStatus(diagonal);});
}
function updateGameStatus(arr){
    let count = arr.reduce((a,b)=>a+b);
    if(count === 3 || count === -3){
        game.status = "DONE";
        game.winner = currentPlayer;
    }
}
function resetGame(){
    
    let model = nodefy("<div class='model-container'><div class='model'><div class='model-body'>Player &nbsp;"+((game.winner === 1) ? " <span style='color:#21db98;'> X </span> " : " <span style='color:#547cf3;'> O </span> ")+"&nbsp; won!!!</div><div class='model-btn-container'></div></div></div>");
    document.getElementsByTagName("BODY")[0].appendChild(model);

    let modelBtn = nodefy("<div class='model-btn'>Play again</div>");   
    model.childNodes[0].childNodes[1].appendChild(modelBtn);
    modelBtn.onclick = function(){

        document.getElementsByTagName("BODY")[0].removeChild(model);

        data = [[0,0,0],[0,0,0],[0,0,0]];
        document.querySelectorAll(".box").forEach((el)=>{
            el.innerText = "";
        });
        game = {status:undefined,winner:undefined};
    }
}

function nodefy(el){
    let container = document.createElement("DIV");
    container.innerHTML = el;
    return container.childNodes[0];
}
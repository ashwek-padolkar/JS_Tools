function f1(){
    return '';
}

function f2(){
    return ' ';
}

function f3(){
    return '-';
}

function f4(){
    return '+';
}

function f5(){
    let customText = document.getElementById('customtext').value;
    return customText;
}

document.getElementById('mergeButton').addEventListener('click', function(){
    let separator;

    let space = document.getElementById('space');
    let minus = document.getElementById('minus');
    let plus = document.getElementById('plus');
    let custom = document.getElementById('custom');

    if(space.checked){
        separator = f2();
    }
    else if(minus.checked){
        separator = f3();
    }
    else if(plus.checked){
        separator = f4();
    }
    else if(custom.checked){
        separator = f5();
    }
    else{
        separator = f1();
    }
})

function display(separator){
    let textArea1 = document.getElementById('textarea1').value;
    let textArea2 = document.getElementById('textarea2').value;
    let textArea3 = document.getElementById('textarea3').value;

    let output = textArea1+separator+textArea2+separator+textArea3;
    let displayBox = document.getElementById('displaybox');
    displayBox.value = output;
}












<div class="wrapper">
                <label for="wrap_in">Wrap in: </label>
                <input type="button" value="Nothing" id="nothing_wrap">
                <input type="button" value='" "' id="space_wrap">
                <input type="button" value="[]" id="bracket_wrap">
            </div>
let i = 0;
let mark = 0;

$(document).ready(function () {
    $('#btnFinish').hide();
    $('#result').hide();
    $('#questionList').hide();
});

$(btnStart).click(function () {
    $('#btnFinish').hide();
    $('#questionList').show();
    $('.startPage').hide();
    updatingQuestionList();
});

$(btnNext).click(function () {

    //selected option index
    console.log($("input[name='options']:checked").val());

    if(data[i].Answer == data[i].Options[$("input[name='options']:checked").val()]) mark = mark + 1;

    i++;
    if(i==4){
        $('#btnFinish').show();
        $('#btnNext').hide();
        updatingQuestionList();
    }
    else
        updatingQuestionList();
});

$(btnFinish).click(function () {
    if(data[i].Answer == data[i].Options[$("input[name='options']:checked").val()]) mark = mark + 1;

    $("#questionList").hide();
    $("#result").show();

    $("#marks").text(mark*5);
    $("#correctAnswer").text(mark);
    $("#percentage").text(mark/5*100);
});

$(btnStartAgain).click(function (){
    location.reload();
});

function updatingQuestionList() {
    $('input:radio[name=options]').each(function () { $(this).prop('checked', false); });
    $('#question').text(data[i].Question);
    $('#option1').text(data[i].Options[0]);
    $('#option2').text(data[i].Options[1]);
    $('#option3').text(data[i].Options[2]);
    $('#option4').text(data[i].Options[3]);

    $("#btnNext").addClass("disabled");
    $("#btnFinish").addClass("disabled");

    $("input[type=radio][name='options']").change(function () {
        $("#btnNext").removeClass("disabled");
        $("#btnFinish").removeClass("disabled");
    });
}

let data = [
    {
        "Question": "1) Which is the largest river in the world ?",
        "Options": [
            "Nile",
            "Congo",
            "Amazon",
            "Zambezi"
        ],
        "Answer": "Amazon"
    },
    {
        "Question": "2) Who is the highest earning businessman in India ?",
        "Options": [
            "Mukesh Ambani",
            "Gutam Aadani",
            "Lakhmi Mittal",
            "Shiv Nadar"
        ],
        "Answer": "Mukesh Ambani"
    },
    {
        "Question": "3) Who is the best painter int the world ?",
        "Options": [
            "Michelangelo",
            "Leonardo da Vinci",
            "Rembrandt",
            "Pablo Picasso"
        ],
        "Answer": "Leonardo da Vinci"
    },
    {
        "Question": "4) Who is the President of India ?",
        "Options": [
            "Ram Nath Kovind",
            "Pranab Mukherjee",
            "Pratibha Patil",
            "A. P. J. Adbul Kalam"
        ],
        "Answer": "Ram Nath Kovind"
    },
    {
        "Question": "5) Which is the smallest country in the world ?",
        "Options": [
            "Tuvalu",
            "Manaco",
            "Nauru",
            "Vatican City"
        ],
        "Answer": "Vatican City"
    }
]
var questions = ["1.Which SQL statement used to extract data from a database?",
                "2.Which SQL statement used to update data from a database?", 
                "3.Which SQL statement used to insert new data in a database?",
                "4.Which SQL statement is used to create a database table called 'Customers'?", 
                "5.With SQL, how do you select all the columns from a table named 'Persons'?", 
                "6.With SQL, how do you select all the records from a table named 'Persons' where the value of the column 'FirstName' is 'Peter'?",
                "7.With SQL, how do you select all the records from a table named 'Persons' where the value of the column 'FirstName' starts with an 'a'?",
                "8.Which SQL keyword is used to sort the result-set?", 
                "9.With SQL, how can you return all the records from a table named 'Persons' sorted descending by 'FirstName' ?", 
                "10.What is the most common type of JOIN?"];
var question_choices = {"0":["SELECT", "GET", "OPEN", "EXTRACT" ],
                        "1":["UPDATE", "SAVE", "SAVE AS", "MODIFY" ],
                        "2":["ADD NEW", "ADD RECORD", "INSERT INTO", "INSERT NEW" ],
                        "3":["CREATE DATABASE TAB Customers", "CREATE TABLE Customers", "CREATE DATABASE TABLE Customers", "CREATE DB Customers" ],
                        "4":["SELECT [all] FROM Persons", "SELECT*.Persons", "SELECT Persons", "SELECT * FROM Persons" ],
                        "5":["SELECT [all] FROM Persons WHERE FirstName=\"Peter\"", "SELECT * FROM Persons WHERE FirstName= \"Peter\"", "SELECT [all] FROM Persons WHERE FirstName LIKE \"Peter\"", "SELECT * FROM Persons WHERE FirstName<>\"Peter\"" ],
                        "6":["SELECT * FROM Persons WHERE FirstName LIKE \"a%\"", "SELECT * FROM Persons WHERE FirstName='\"a\"'", "SELECT * FROM Persons WHERE FirstName=\"%a%\"", "SELECT * FROM Persons WHERE FirstName LIKE \"%a\"" ],
                        "7":["SORT", "SORT BY", "ORDER", "ORDER BY" ],
                        "8":["SELECT * FROM Persons SORT BY \"FirstName\" DESC", "SELECT * FROM Persons ORDER BY \"FirstName\" DESC", "SELECT * FROM Persons ORDER FirstName DESC", "SELECT * FROM Persons SORT \"FirstName\" DESC" ],
                        "9":["JOINED TABLE", "INSIDE JOIN", "INNER JOIN", "OUTER JOIN" ]}
var user_ans = Array(10);
var right_ans = [" SELECT ",
            " UPDATE ",
            " INSERT INTO ",
            " CREATE TABLE Customers ",
            " SELECT * FROM Persons ",
            " SELECT * FROM Persons WHERE FirstName= \"Peter\" ",
            " SELECT * FROM Persons WHERE FirstName LIKE \"a%\" ",
            " ORDER BY ",
            " SELECT * FROM Persons ORDER BY \"FirstName\" DESC ",
            " INNER JOIN " ]

var question, idx, ans, test_ans, Name, surname, msg, test, header, bilgi, result, rslt_header, write_score;         
$(document).ready(function() {
    question = document.getElementById("question");
    ans = document.getElementById("answer");
    idx = questions.indexOf(question.innerHTML);
    test_ans = document.getElementsByName('choices'); 
    msg = document.getElementById("alertmsg");
    test = document.getElementById("test_page");
    header = document.getElementById("test_header")
    bilgi = document.getElementById("log_in_page");
    result = document.getElementById("result");


question.innerHTML = questions[0];

write_test_choices();

})

function user_checked_answer(){
    for(i = 0; i < test_ans.length; i++) { 
        if(test_ans[i].checked){ 
        user_ans[idx] = test_ans[i].value;
        break;
        }
    }
}

function write_test_choices(){
    idx = questions.indexOf(question.innerHTML);
    ans.innerHTML="";
    for (i=0; i<=3; i++){
        ans.insertAdjacentHTML("beforeend","<label><input type = 'radio' name = 'choices' value = ' " + question_choices[idx][i] + " '/> " + question_choices[idx][i] + "</label><br>" );
        }
}

function next_click() {
    user_checked_answer();
    console.log(question.innerHTML);
    console.log(idx)
    if (idx<8) {
        idx ++;
        question.innerHTML = questions[idx];
        document.getElementById("prevBtn").disabled = false;
        write_test_choices();
    }
    else{
        idx ++;
        question.innerHTML = questions[idx];
        document.getElementById("nxtBtn").disabled = true;
        write_test_choices();
    }
    rBtn();

    }
function prev_click() {
    user_checked_answer();
    if (idx==1) {
        idx --;
        question.innerHTML = questions[idx];
        document.getElementById("prevBtn").disabled = true;
        write_test_choices();

    }
    else{
        idx --;
        question.innerHTML = questions[idx];
        document.getElementById("nxtBtn").disabled = false;
        write_test_choices();
    }
    rBtn();
    
}
function rBtn() {
        for(i=0; i<5; i++){
            if(user_ans[idx] == test_ans[i].value){
                test_ans[i].checked = true;
            }
    }
}

function calculate_score() {
    var puan = 0;
    for(i=0; i < 10 ; i++){
        if (user_ans[i] === right_ans[i]) {
            puan += 1;
        }
        
    }
    return puan;
}

function login_click() {
    Name = document.getElementById("name").value;
    surname = document.getElementById("Sname").value;
    

    if (Name.length == 0) {
        msg.innerHTML = "You can not leave your name blank!";
        return; 
    }
    else if (Name.length < 3) {
        msg.innerHTML = "Your name must be minimum 3 charachters";
        return;
    }
    if (surname.length == 0) {
        msg.innerHTML = "You can not leave your surname blank!";
        return;
    }
    else if (surname.length < 3) {
        msg.innerHTML = "Your surname must be minimum 3 charachters";
        return;
    }

    alert("If you click OK, test will begin!");
    result.style.display = "none";
    bilgi.style.display = "none";
    test.style.display = "inline-block";
    header.innerHTML = "Welcome to test " + Name + " " + surname;

};

function finish_click() {
    var r = confirm("You won't return this page again, are you sure you want to finish the test?")
    if(r == true){
        user_checked_answer();
        rslt_header = document.getElementById("result_header");
        write_score = document.getElementById("score");
        bilgi.style.display = "none";
        test.style.display = "none";
        result.style.display = "inline-block";
        rslt_header.innerHTML = "Congrutulations test finished! " + Name + " " + surname;
        write_score.innerHTML = "Number of your right answers: " + calculate_score();
    }
    
}

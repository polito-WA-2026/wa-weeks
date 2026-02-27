// # Exercise 3: Q&A

/*
Each answer should contain:
  Response (text)
  Respondent name
  Score (integer number, positive or negative)
  Date
*/

function Answer(text, respondent, score, date) {

}

/*
A question, instead, is made of:
  Question (text)
  Questioner name
  Date
  List of answers
*/

function Question(text, questioner, date) {

    //add ;

    //findAll ;

    //afterDate ;

    //listByDate ;

    //listByScore ;
}

//const q1 = new Question("How are you today?", 'enrico', "2025-03-02");

const answers_text = [
    ["hello world", 'antonio', '0', "2025-03-03"], // a1
    ["hello world 2", 'enrico', '0', "2025-03-03"],  // a2
    ["fine", 'antonio', '1', "2025-03-02"]  // a3
]
console.log(answers_text);

/*
const answers_obj = [];
for (let i = 0; i < answers_text.length; i++) {
    const ans = answers_text[i];
    const a = new Answer(ans[0], ans[1], ans[2], ans[3]);
    answers_obj.push(a);
}

console.log('q1', q1)
*/

// find all answers to q1 with respondent equal to 'antonio'
//console.log('q1 findAll', q1.findAll('antonio'))

// find all answers to q1 that have respondent equal to 'antonio'
// transform the array of Answers into an array of strings, i.e., the answer response text


// find all answers to q1 that have a date after yesterday
/*
console.log(
    q1.afterDate(dayjs().subtract(1,'day'))
)
*/

/*
console.log('listByDate',
    q1.listByDate()
)

console.log('listByScore',
    q1.listByScore()
)
*/
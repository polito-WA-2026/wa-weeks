// # Exercise 3: Q&A

import dayjs from 'dayjs';

/*
Each answer should contain:
  Response (text)
  Respondent name
  Score (integer number, positive or negative)
  Date
*/

function Answer(text, respondent, score, date) {

    this.text = text;
    this.respondent = respondent;
    this.score = score;
    this.date = dayjs(date);

    this.str = () => {
        return `${this.text} by ${this.respondent} on ${this.date.format('YYYY-MM-DD')} (score: ${this.score})`
    }

}

/*
A question, instead, is made of:
  Question (text)
  Questioner name
  Date
  List of answers
*/

function Question(text, questioner, date) {
    this.text = text;
    this.questioner = questioner;
    this.date = date;
    this.answers = [];

    this.add = function (answer) {
        this.answers.push(answer);
    }

    this.findAll = function (name) {
        return this.answers.filter(a => a.respondent === name);
    }

    this.afterDate = function (date) {
        return this.answers.filter(a => a.date.isAfter(date));
    }

    this.listByDate = function () {
        return this.answers.sort((a, b) => a.date.diff(b.date));
    }

    this.listByScore = function () {
        return this.answers.sort((a, b) => b.score - a.score);
    }
}

const q1 = new Question("How are you today?", 'enrico', "2025-03-02");


const answers_text = [
    ["hello world", 'antonio', '0', "2026-03-03"], // a1
    ["hello world 2", 'enrico', '2', "2026-03-04"],  // a2
    ["fine", 'antonio', '1', "2025-03-02"]  // a3
]
console.log(answers_text);


console.log(q1);


//const answers_obj = [];
for (let i = 0; i < answers_text.length; i++) {
    const ans = answers_text[i];
    const a = new Answer(ans[0], ans[1], ans[2], ans[3]);
    q1.add(a);
}

console.log('q1', q1)


// find all answers to q1 with respondent equal to 'antonio'
console.log('q1 findAll');
q1.findAll('antonio').forEach(a => console.log(a.str()));

// find all answers to q1 that have respondent equal to 'antonio'
// transform the array of Answers into an array of strings, i.e., the answer response text


// find all answers to q1 that have a date after yesterday
console.log('afterDate');
q1.afterDate(dayjs().subtract(1,'day')).forEach(a => console.log(a.str()));



console.log('listByDate');
q1.listByDate().forEach(a => console.log(a.str()));


console.log('listByScore');
q1.listByScore().forEach(a => console.log(a.str()));

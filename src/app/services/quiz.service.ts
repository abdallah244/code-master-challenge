import { Injectable } from '@angular/core';
import { Question, DifficultyLevel } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  getQuestions(level: DifficultyLevel, count: number = 50): Question[] {
    const questions = this.generateSampleQuestions(level, count);
    // جعل الإجابات عشوائية
    return questions.map(question => this.randomizeAnswers(question));
  }

  private randomizeAnswers(question: Question): Question {
    const correctAnswer = question.options[question.correctAnswer];
    const shuffledOptions = this.shuffleArray([...question.options]);
    const newCorrectAnswer = shuffledOptions.indexOf(correctAnswer);

    return {
      ...question,
      options: shuffledOptions,
      correctAnswer: newCorrectAnswer
    };
  }

  private shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  private generateSampleQuestions(level: DifficultyLevel, count: number): Question[] {
    const questionGenerators: Record<DifficultyLevel, () => Question[]> = {
      student: this.getStudentQuestions.bind(this),
      junior: this.getJuniorQuestions.bind(this),
      mid: this.getMidQuestions.bind(this),
      expert: this.getExpertQuestions.bind(this),
      senior: this.getSeniorQuestions.bind(this),
      master: this.getMasterQuestions.bind(this),
      legendary: this.getLegendaryQuestions.bind(this)
    };

    const questions = questionGenerators[level]();
    return questions.slice(0, count);
  }

  private getStudentQuestions(): Question[] {
    return [
      {
        id: 1,
        text: "ما هي نتيجة عملية 5 + 3 في JavaScript؟",
        options: ["8", "53", "35", "undefined"],
        correctAnswer: 0,
        explanation: "5 + 3 = 8، هذه عملية حسابية أساسية في البرمجة.",
        codeSnippet: "console.log(5 + 3);",
        difficulty: 'student'
      },
      {
        id: 2,
        text: "أي من الكلمات التالية تستخدم لتعريف متغير في JavaScript؟",
        options: ["var", "function", "class", "import"],
        correctAnswer: 0,
        explanation: "كلمة 'var' تستخدم لتعريف متغير في JavaScript.",
        codeSnippet: "var x = 5;",
        difficulty: 'student'
      },
      {
        id: 3,
        text: "ماذا يعني اختصار HTML؟",
        options: [
          "HyperText Markup Language",
          "HighTech Modern Language",
          "Hyper Transfer Markup Language",
          "Home Tool Markup Language"
        ],
        correctAnswer: 0,
        explanation: "HTML تعني HyperText Markup Language، وهي لغة ترميز لإنشاء صفحات الويب.",
        difficulty: 'student'
      },
      {
        id: 4,
        text: "ما هو الرمز المستخدم للتعليقات ذات السطر الواحد في JavaScript؟",
        options: ["//", "#", "/* */", "--"],
        correctAnswer: 0,
        explanation: "// تستخدم للتعليقات ذات السطر الواحد في JavaScript.",
        codeSnippet: "// هذا تعليق",
        difficulty: 'student'
      },
      {
        id: 5,
        text: "كيف تنشئ دالة في Python؟",
        options: [
          "def function_name():",
          "function function_name()",
          "create function_name()",
          "func function_name()"
        ],
        correctAnswer: 0,
        explanation: "في Python نستخدم 'def' لتعريف الدوال.",
        codeSnippet: "def greet():\n    print('Hello')",
        difficulty: 'student'
      },
      {
        id: 6,
        text: "ما هو output الكود التالي: console.log('Hello' + 'World')؟",
        options: ["HelloWorld", "Hello World", "undefined", "Error"],
        correctAnswer: 0,
        explanation: "عامل + يدمج النصوص في JavaScript.",
        codeSnippet: "console.log('Hello' + 'World');",
        difficulty: 'student'
      },
      {
        id: 7,
        text: "أي نوع بيانات يمثل القيم true/false؟",
        options: ["Boolean", "String", "Number", "Array"],
        correctAnswer: 0,
        explanation: "Boolean هو نوع البيانات الذي يمثل true أو false.",
        difficulty: 'student'
      },
      {
        id: 8,
        text: "ما هو الغرض من CSS؟",
        options: [
          "تنسيق وتصميم صفحات الويب",
          "إضافة منطق البرمجة",
          "تخزين البيانات",
          "إنشاء قواعد البيانات"
        ],
        correctAnswer: 0,
        explanation: "CSS تستخدم لتنسيق وتصميم مظهر صفحات الويب.",
        difficulty: 'student'
      },
      {
        id: 9,
        text: "كيف تكتب جملة شرطية IF في JavaScript؟",
        options: [
          "if (condition) { }",
          "if condition then",
          "when condition do",
          "check condition"
        ],
        correctAnswer: 0,
        explanation: "if (condition) { } هي الصيغة الصحيحة في JavaScript.",
        codeSnippet: "if (x > 5) {\n    console.log('x is greater than 5');\n}",
        difficulty: 'student'
      },
      {
        id: 10,
        text: "ما هي الطريقة الصحيحة لإنشاء مصفوفة في JavaScript؟",
        options: [
          "let arr = [1, 2, 3];",
          "let arr = {1, 2, 3};",
          "let arr = (1, 2, 3);",
          "let arr = '1,2,3';"
        ],
        correctAnswer: 0,
        explanation: "الأقواس المربعة [] تستخدم لإنشاء مصفوفات في JavaScript.",
        codeSnippet: "let numbers = [1, 2, 3];",
        difficulty: 'student'
      },
      {
        id: 11,
        text: "ما هو operator المسؤول عن عملية الجمع في البرمجة؟",
        options: ["+", "-", "*", "/"],
        correctAnswer: 0,
        explanation: "+ يستخدم لعملية الجمع في معظم لغات البرمجة.",
        difficulty: 'student'
      },
      {
        id: 12,
        text: "كيف تعلن عن متغير ثابت (constant) في JavaScript؟",
        options: ["const", "let", "var", "static"],
        correctAnswer: 0,
        explanation: "const تستخدم لإعلان متغير ثابت لا يمكن تغيير قيمته.",
        codeSnippet: "const PI = 3.14;",
        difficulty: 'student'
      },
      {
        id: 13,
        text: "ما هي لغة البرمجة المستخدمة لإضافة التفاعل لصفحات الويب؟",
        options: ["JavaScript", "HTML", "CSS", "Python"],
        correctAnswer: 0,
        explanation: "JavaScript هي لغة البرمجة الرئيسية لإضافة التفاعل لصفحات الويب.",
        difficulty: 'student'
      },
      {
        id: 14,
        text: "كيف تكتب حلقة for في JavaScript؟",
        options: [
          "for (let i = 0; i < 5; i++)",
          "for i in range(5)",
          "loop i from 0 to 5",
          "for (i = 0; i < 5)"
        ],
        correctAnswer: 0,
        explanation: "for (let i = 0; i < 5; i++) هي الصيغة الصحيحة في JavaScript.",
        codeSnippet: "for (let i = 0; i < 5; i++) {\n    console.log(i);\n}",
        difficulty: 'student'
      },
      {
        id: 15,
        text: "ما هو الـ output من: console.log(typeof 'Hello')؟",
        options: ["string", "number", "boolean", "undefined"],
        correctAnswer: 0,
        explanation: "typeof 'Hello' يرجع 'string' لأن 'Hello' هو نص.",
        codeSnippet: "console.log(typeof 'Hello');",
        difficulty: 'student'
      },
      {
        id: 16,
        text: "كيف تنشئ كائن (object) في JavaScript؟",
        options: [
          "let obj = { key: 'value' };",
          "let obj = [ key: 'value' ];",
          "let obj = ( key: 'value' );",
          "let obj = 'key:value';"
        ],
        correctAnswer: 0,
        explanation: "الأقواس المعقوفة {} تستخدم لإنشاء كائنات في JavaScript.",
        codeSnippet: "let person = { name: 'John', age: 30 };",
        difficulty: 'student'
      },
      {
        id: 17,
        text: "ما هي نتيجة 10 % 3 في البرمجة؟",
        options: ["1", "3", "0", "undefined"],
        correctAnswer: 0,
        explanation: "% هو operator الباقي، و 10 % 3 = 1 لأن 10 ÷ 3 = 3 والباقي 1.",
        codeSnippet: "console.log(10 % 3);",
        difficulty: 'student'
      },
      {
        id: 18,
        text: "كيف تتحقق إذا كان المتغير x يساوي 5 في JavaScript؟",
        options: [
          "if (x === 5)",
          "if x = 5",
          "if x == 5 then",
          "check x equals 5"
        ],
        correctAnswer: 0,
        explanation: "if (x === 5) هي الصيغة الصحيحة للمقارنة في JavaScript.",
        difficulty: 'student'
      },
      {
        id: 19,
        text: "ما هي الدالة المستخدمة لطباعة النص في Python؟",
        options: ["print()", "console.log()", "echo()", "display()"],
        correctAnswer: 0,
        explanation: "print() هي الدالة المستخدمة لطباعة النص في Python.",
        codeSnippet: "print('Hello World')",
        difficulty: 'student'
      },
      {
        id: 20,
        text: "كيف تضيف عنصر لنهاية مصفوفة في JavaScript؟",
        options: ["push()", "add()", "append()", "insert()"],
        correctAnswer: 0,
        explanation: "push() تضيف عنصر لنهاية المصفوفة في JavaScript.",
        codeSnippet: "let arr = [1, 2];\narr.push(3);",
        difficulty: 'student'
      },
      {
        id: 21,
        text: "ما هو الـ Boolean value لـ false؟",
        options: ["false", "0", "null", "undefined"],
        correctAnswer: 0,
        explanation: "false هو الـ Boolean value نفسه، بينما 0 و null و undefined قيم مختلفة.",
        difficulty: 'student'
      },
      {
        id: 22,
        text: "كيف تحصل على طول نص (string) في JavaScript؟",
        options: [".length", ".size", ".count", ".length()"],
        correctAnswer: 0,
        explanation: ".length خاصية وليست دالة، تعيد طول النص.",
        codeSnippet: "let text = 'Hello';\nconsole.log(text.length);",
        difficulty: 'student'
      },
      {
        id: 23,
        text: "ما هو الـ operator للمقارنة 'يساوي' في JavaScript؟",
        options: ["===", "=", "==", "!="],
        correctAnswer: 0,
        explanation: "=== هو operator المقارنة الصارمة الذي يتحقق من القيمة والنوع.",
        difficulty: 'student'
      },
      {
        id: 24,
        text: "كيف تعلن عن دالة في JavaScript؟",
        options: [
          "function myFunction() {}",
          "def myFunction() {}",
          "func myFunction() {}",
          "method myFunction() {}"
        ],
        correctAnswer: 0,
        explanation: "function هي الكلمة المفتاحية لتعريف الدوال في JavaScript.",
        codeSnippet: "function greet() {\n    return 'Hello';\n}",
        difficulty: 'student'
      },
      {
        id: 25,
        text: "ما هي نتيجة Boolean(0) في JavaScript؟",
        options: ["false", "true", "0", "undefined"],
        correctAnswer: 0,
        explanation: "Boolean(0) ترجع false لأن 0 يعتبر false في JavaScript.",
        codeSnippet: "console.log(Boolean(0));",
        difficulty: 'student'
      },
      {
        id: 26,
        text: "كيف تتحقق إذا كان المتغير معرف (defined) في JavaScript؟",
        options: [
          "if (typeof x !== 'undefined')",
          "if x exists",
          "if defined(x)",
          "if x.isDefined()"
        ],
        correctAnswer: 0,
        explanation: "typeof x !== 'undefined' تتحقق إذا كان المتغير معرف.",
        difficulty: 'student'
      },
      {
        id: 27,
        text: "ما هو الـ output من: console.log(2 + '2')؟",
        options: ["'22'", "4", "NaN", "Error"],
        correctAnswer: 0,
        explanation: "عند جمع عدد مع نص، يحول العدد لنص ويتم الدمج.",
        codeSnippet: "console.log(2 + '2');",
        difficulty: 'student'
      },
      {
        id: 28,
        text: "كيف تنشئ تعليق متعدد الأسطر في JavaScript؟",
        options: ["/* */", "//", "#", "--"],
        correctAnswer: 0,
        explanation: "/* */ تستخدم للتعليقات المتعددة الأسطر في JavaScript.",
        codeSnippet: "/* هذا تعليق\n   متعدد الأسطر */",
        difficulty: 'student'
      },
      {
        id: 29,
        text: "ما هي القيمة الافتراضية للمتغير غير المهيأ في JavaScript؟",
        options: ["undefined", "null", "0", "false"],
        correctAnswer: 0,
        explanation: "المتغير غير المهيأ تكون قيمته undefined.",
        difficulty: 'student'
      },
      {
        id: 30,
        text: "كيف تحول نص لعدد صحيح في JavaScript؟",
        options: ["parseInt()", "Number()", "toInt()", "int()"],
        correctAnswer: 0,
        explanation: "parseInt() تحول النص لعدد صحيح في JavaScript.",
        codeSnippet: "let num = parseInt('10');",
        difficulty: 'student'
      },
      {
        id: 31,
        text: "ما هو الـ operator للضرب في البرمجة؟",
        options: ["*", "+", "-", "/"],
        correctAnswer: 0,
        explanation: "* هو operator الضرب في البرمجة.",
        difficulty: 'student'
      },
      {
        id: 32,
        text: "كيف تتحقق إذا كانت القيمة null في JavaScript؟",
        options: [
          "if (x === null)",
          "if x is null",
          "if null(x)",
          "if x.equals(null)"
        ],
        correctAnswer: 0,
        explanation: "x === null تتحقق إذا كانت القيمة null.",
        difficulty: 'student'
      },
      {
        id: 33,
        text: "ما هي الدالة المستخدمة لتوليد عدد عشوائي في JavaScript؟",
        options: ["Math.random()", "random()", "Math.rand()", "rand()"],
        correctAnswer: 0,
        explanation: "Math.random() تولد عدد عشوائي بين 0 و 1 في JavaScript.",
        codeSnippet: "let randomNum = Math.random();",
        difficulty: 'student'
      },
      {
        id: 34,
        text: "كيف تنشئ مصفوفة فارغة في JavaScript؟",
        options: ["let arr = [];", "let arr = {};", "let arr = ();", "let arr = '';"],
        correctAnswer: 0,
        explanation: "[] تنشئ مصفوفة فارغة في JavaScript.",
        difficulty: 'student'
      },
      {
        id: 35,
        text: "ما هو الـ output من: console.log(typeof [])؟",
        options: ["object", "array", "list", "undefined"],
        correctAnswer: 0,
        explanation: "typeof [] يرجع 'object' لأن المصفوفات نوع من الكائنات في JavaScript.",
        difficulty: 'student'
      },
      {
        id: 36,
        text: "كيف تضيف عنصر لبداية مصفوفة في JavaScript؟",
        options: ["unshift()", "push()", "addFirst()", "prepend()"],
        correctAnswer: 0,
        explanation: "unshift() تضيف عنصر لبداية المصفوفة في JavaScript.",
        codeSnippet: "let arr = [2, 3];\narr.unshift(1);",
        difficulty: 'student'
      },
      {
        id: 37,
        text: "ما هو الـ operator للقسمة في البرمجة؟",
        options: ["/", "*", "+", "-"],
        correctAnswer: 0,
        explanation: "/ هو operator القسمة في البرمجة.",
        difficulty: 'student'
      },
      {
        id: 38,
        text: "كيف تحول نص لأحرف كبيرة (uppercase) في JavaScript؟",
        options: [".toUpperCase()", ".upper()", ".toUpper()", ".capitalize()"],
        correctAnswer: 0,
        explanation: ".toUpperCase() تحول النص لأحرف كبيرة في JavaScript.",
        codeSnippet: "let text = 'hello';\nconsole.log(text.toUpperCase());",
        difficulty: 'student'
      },
      {
        id: 39,
        text: "ما هي نتيجة Boolean('') في JavaScript؟",
        options: ["false", "true", "''", "undefined"],
        correctAnswer: 0,
        explanation: "Boolean('') ترجع false لأن النص الفارغ يعتبر false.",
        difficulty: 'student'
      },
      {
        id: 40,
        text: "كيف تزيل عنصر من نهاية مصفوفة في JavaScript؟",
        options: ["pop()", "remove()", "delete()", "shift()"],
        correctAnswer: 0,
        explanation: "pop() تزيل عنصر من نهاية المصفوفة في JavaScript.",
        codeSnippet: "let arr = [1, 2, 3];\narr.pop();",
        difficulty: 'student'
      },
      {
        id: 41,
        text: "ما هو الـ operator للطرح في البرمجة؟",
        options: ["-", "+", "*", "/"],
        correctAnswer: 0,
        explanation: "- هو operator الطرح في البرمجة.",
        difficulty: 'student'
      },
      {
        id: 42,
        text: "كيف تتحقق إذا كان النص يحتوي على كلمة معينة في JavaScript؟",
        options: [".includes()", ".contains()", ".has()", ".find()"],
        correctAnswer: 0,
        explanation: ".includes() تتحقق إذا كان النص يحتوي على كلمة معينة.",
        codeSnippet: "let text = 'Hello World';\nconsole.log(text.includes('World'));",
        difficulty: 'student'
      },
      {
        id: 43,
        text: "ما هو الـ output من: console.log(3 * '3')؟",
        options: ["9", "'9'", "33", "NaN"],
        correctAnswer: 0,
        explanation: "عند ضرب عدد في نص، يحول النص لعدد ويتم الضرب.",
        difficulty: 'student'
      },
      {
        id: 44,
        text: "كيف تنشئ تاريخ (date) جديد في JavaScript؟",
        options: ["new Date()", "Date.now()", "Date()", "currentDate()"],
        correctAnswer: 0,
        explanation: "new Date() تنشئ كائن تاريخ جديد في JavaScript.",
        codeSnippet: "let now = new Date();",
        difficulty: 'student'
      },
      {
        id: 45,
        text: "ما هي نتيجة Boolean(1) في JavaScript؟",
        options: ["true", "false", "1", "undefined"],
        correctAnswer: 0,
        explanation: "Boolean(1) ترجع true لأن 1 يعتبر true في JavaScript.",
        difficulty: 'student'
      },
      {
        id: 46,
        text: "كيف تزيل عنصر من بداية مصفوفة في JavaScript؟",
        options: ["shift()", "pop()", "removeFirst()", "unshift()"],
        correctAnswer: 0,
        explanation: "shift() تزيل عنصر من بداية المصفوفة في JavaScript.",
        codeSnippet: "let arr = [1, 2, 3];\narr.shift();",
        difficulty: 'student'
      },
      {
        id: 47,
        text: "ما هو الـ operator للأس (exponent) في JavaScript؟",
        options: ["**", "^", "pow()", "exp()"],
        correctAnswer: 0,
        explanation: "** هو operator الأس في JavaScript.",
        codeSnippet: "console.log(2 ** 3); // 8",
        difficulty: 'student'
      },
      {
        id: 48,
        text: "كيف تحول نص لعدد عشري في JavaScript؟",
        options: ["parseFloat()", "parseInt()", "Number()", "toFloat()"],
        correctAnswer: 0,
        explanation: "parseFloat() تحول النص لعدد عشري في JavaScript.",
        codeSnippet: "let num = parseFloat('10.5');",
        difficulty: 'student'
      },
      {
        id: 49,
        text: "ما هو الـ output من: console.log([] + [])؟",
        options: ["''", "[]", "[object Object]", "Error"],
        correctAnswer: 0,
        explanation: "عند جمع مصفوفتين فارغتين، تتحولان لنص فارغ.",
        difficulty: 'student'
      },
      {
        id: 50,
        text: "كيف تنشئ نسخة من مصفوفة في JavaScript؟",
        options: ["[...arr]", "arr.copy()", "arr.slice()", "Array.from(arr)"],
        correctAnswer: 0,
        explanation: "[...arr] تنشئ نسخة سطحية من المصفوفة باستخدام spread operator.",
        codeSnippet: "let arr1 = [1, 2, 3];\nlet arr2 = [...arr1];",
        difficulty: 'student'
      }
    ];
  }

 private getJuniorQuestions(): Question[] {
  return [
    // الأسئلة السابقة (1-15)
    {
      id: 51,
      text: "ما هو output الكود التالي: console.log(typeof [1,2,3])؟",
      options: ["object", "array", "string", "number"],
      correctAnswer: 0,
      explanation: "المصفوفات في JavaScript هي نوع من الكائنات (objects).",
      codeSnippet: "console.log(typeof [1,2,3]);",
      difficulty: 'junior'
    },
    {
      id: 52,
      text: "كيف تنشئ class في JavaScript ES6؟",
      options: [
        "class MyClass { }",
        "function MyClass() { }",
        "create class MyClass",
        "new Class MyClass"
      ],
      correctAnswer: 0,
      explanation: "في ES6 نستخدم كلمة class لإنشاء classes.",
      codeSnippet: "class Car {\n  constructor(name) {\n    this.name = name;\n  }\n}",
      difficulty: 'junior'
    },
    {
      id: 53,
      text: "ما هو الغرض من كلمة 'this' في JavaScript؟",
      options: [
        "تشير إلى الكائن الحالي",
        "تشير إلى الدالة الأم",
        "تشير إلى المتغير العالمي",
        "كلمة محجوزة لا معنى لها"
      ],
      correctAnswer: 0,
      explanation: "'this' تشير إلى الكائن الحالي الذي ينفذ الدالة.",
      difficulty: 'junior'
    },
    {
      id: 54,
      text: "أي دالة تحول JSON string إلى JavaScript object؟",
      options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.toObject()"],
      correctAnswer: 0,
      explanation: "JSON.parse() تحول JSON string إلى JavaScript object.",
      codeSnippet: "const obj = JSON.parse('{\"name\":\"John\"}');",
      difficulty: 'junior'
    },
    {
      id: 55,
      text: "ما هو الـ closure في JavaScript؟",
      options: [
        "دالة تستطيع الوصول إلى النطاق الخارجي",
        "دالة داخل دالة أخرى",
        "دالة بدون اسم",
        "دالة سريعة التنفيذ"
      ],
      correctAnswer: 0,
      explanation: "الـ closure هو دالة تستطيع الوصول إلى المتغيرات في النطاق الخارجي.",
      codeSnippet: "function outer() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}",
      difficulty: 'junior'
    },
    {
      id: 56,
      text: "ما الفرق بين == و === في JavaScript؟",
      options: [
        "== تقارن القيمة فقط، === تقارن القيمة والنوع",
        "لا فرق بينهما",
        "=== أسرع من ==",
        "== أحدث من ==="
      ],
      correctAnswer: 0,
      explanation: "== تقارن القيمة فقط، بينما === تقارن القيمة ونوع البيانات.",
      difficulty: 'junior'
    },
    {
      id: 57,
      text: "كيف يعمل الـ event loop في JavaScript؟",
      options: [
        "يدير تنفيذ الكود غير المتزامن",
        "ينفذ الكود سطراً سطراً",
        "يحسن سرعة التنفيذ",
        "يتحكم في الذاكرة"
      ],
      correctAnswer: 0,
      explanation: "Event loop يدير تنفيذ الكود غير المتزامن عن طريق معالجة call stack و callback queue.",
      difficulty: 'junior'
    },
    {
      id: 58,
      text: "ما هي template literals في JavaScript؟",
      options: [
        "نصوص يمكن تضمين تعبيرات فيها",
        "قوالب للـ HTML",
        "أنواع بيانات جديدة",
        "دوال لمعالجة النصوص"
      ],
      correctAnswer: 0,
      explanation: "Template literals تسمح بتضمين تعبيرات في النصوص باستخدام ${}.",
      codeSnippet: "const name = 'John';\nconsole.log(`Hello ${name}`);",
      difficulty: 'junior'
    },
    {
      id: 59,
      text: "كيف تستخدم destructuring assignment مع objects؟",
      options: [
        "const {name, age} = person;",
        "const [name, age] = person;",
        "const name, age = person;",
        "const person = {name, age};"
      ],
      correctAnswer: 0,
      explanation: "Destructuring assignment يستخرج الخصائص من objects.",
      codeSnippet: "const person = {name: 'John', age: 30};\nconst {name, age} = person;",
      difficulty: 'junior'
    },
    {
      id: 60,
      text: "ما هو spread operator في JavaScript؟",
      options: [
        "يستخدم لنشر العناصر",
        "يستخدم للجمع",
        "يستخدم للتصفية",
        "يستخدم للترتيب"
      ],
      correctAnswer: 0,
      explanation: "Spread operator ... ينشر عناصر المصفوفة أو خصائص الكائن.",
      codeSnippet: "const arr1 = [1, 2];\nconst arr2 = [...arr1, 3, 4];",
      difficulty: 'junior'
    },
    {
      id: 61,
      text: "ما هي الـ arrow functions في JavaScript؟",
      options: [
        "دوال ذات صيغة مختصرة و this مرتبط",
        "دوال سريعة التنفيذ",
        "دوال للأسهم فقط",
        "دوال قديمة"
      ],
      correctAnswer: 0,
      explanation: "Arrow functions لها صيغة مختصرة و this مرتبط بالنطاق المحيط.",
      codeSnippet: "const add = (a, b) => a + b;",
      difficulty: 'junior'
    },
    {
      id: 62,
      text: "كيف تنشئ Promise في JavaScript؟",
      options: [
        "new Promise((resolve, reject) => {})",
        "Promise.create()",
        "new Promise()",
        "Promise()"
      ],
      correctAnswer: 0,
      explanation: "new Promise() تنشئ promise جديد مع functions resolve و reject.",
      codeSnippet: "const promise = new Promise((resolve, reject) => {\n  setTimeout(() => resolve('Success'), 1000);\n});",
      difficulty: 'junior'
    },
    {
      id: 63,
      text: "ما هو الـ async/await في JavaScript؟",
      options: [
        "طريقة للتعامل مع الكود غير المتزامن",
        "دوال سريعة",
        "مكتبة خارجية",
        "نوع بيانات جديد"
      ],
      correctAnswer: 0,
      explanation: "async/await هي طريقة للتعامل مع الكود غير المتزامن بشكل متزامن.",
      codeSnippet: "async function fetchData() {\n  const data = await fetch('/api');\n  return data.json();\n}",
      difficulty: 'junior'
    },
    {
      id: 64,
      text: "كيف تتعامل مع الأخطاء في async/await؟",
      options: [
        "try/catch",
        "then/catch",
        "error()",
        "catch()"
      ],
      correctAnswer: 0,
      explanation: "try/catch تستخدم للتعامل مع الأخطاء في async/await.",
      codeSnippet: "async function getData() {\n  try {\n    const data = await fetch('/api');\n    return data.json();\n  } catch (error) {\n    console.error(error);\n  }\n}",
      difficulty: 'junior'
    },
    {
      id: 65,
      text: "ما هو الـ module system في JavaScript؟",
      options: [
        "نظام لتنظيم الكود في وحدات",
        "مكتبة للوحدات",
        "أداة بناء",
        "نوع من الملفات"
      ],
      correctAnswer: 0,
      explanation: "Module system يسمح بتنظيم الكود في وحدات منفصلة قابلة للاستيراد.",
      codeSnippet: "import { functionName } from './module.js';",
      difficulty: 'junior'
    },

    // الأسئلة الجديدة (16-50)
    {
      id: 66,
      text: "ما هو الـ callback function في JavaScript؟",
      options: [
        "دالة يتم تمريرها كمعطى لدالة أخرى",
        "دالة ترجع قيمة",
        "دالة تنفذ فوراً",
        "دالة غير متزامنة"
      ],
      correctAnswer: 0,
      explanation: "Callback function هي دالة يتم تمريرها كمعطى لدالة أخرى ليتم استدعاؤها لاحقاً.",
      codeSnippet: "function processData(data, callback) {\n  // معالجة البيانات\n  callback(result);\n}",
      difficulty: 'junior'
    },
    {
      id: 67,
      text: "كيف تستخدم الـ map method على المصفوفات؟",
      options: [
        "لتحويل كل عنصر في المصفوفة",
        "لتصفية المصفوفة",
        "لدمج المصفوفات",
        "لترتيب المصفوفة"
      ],
      correctAnswer: 0,
      explanation: "map() تنشئ مصفوفة جديدة بنتائج استدعاء دالة على كل عنصر.",
      codeSnippet: "const numbers = [1, 2, 3];\nconst doubled = numbers.map(n => n * 2);",
      difficulty: 'junior'
    },
    {
      id: 68,
      text: "ما هو الـ filter method في JavaScript؟",
      options: [
        "ينشئ مصفوفة جديدة بالعناصر التي تمرر الاختبار",
        "يحذف العناصر من المصفوفة",
        "يغير المصفوفة الأصلية",
        "يرجع أول عنصر فقط"
      ],
      correctAnswer: 0,
      explanation: "filter() ينشئ مصفوفة جديدة بالعناصر التي تمرر دالة الاختبار.",
      codeSnippet: "const numbers = [1, 2, 3, 4, 5];\nconst even = numbers.filter(n => n % 2 === 0);",
      difficulty: 'junior'
    },
    {
      id: 69,
      text: "كيف يعمل الـ reduce method؟",
      options: [
        "يختزل المصفوفة إلى قيمة واحدة",
        "يزيد حجم المصفوفة",
        "يقسم المصفوفة",
        "يعكس المصفوفة"
      ],
      correctAnswer: 0,
      explanation: "reduce() يطبق دالة على كل عنصر لاختزال المصفوفة إلى قيمة واحدة.",
      codeSnippet: "const numbers = [1, 2, 3, 4];\nconst sum = numbers.reduce((acc, curr) => acc + curr, 0);",
      difficulty: 'junior'
    },
    {
      id: 70,
      text: "ما هو الـ scope في JavaScript؟",
      options: [
        "النطاق الذي يمكن الوصول فيه للمتغير",
        "حجم الملف",
        "سرعة التنفيذ",
        "نوع البيانات"
      ],
      correctAnswer: 0,
      explanation: "Scope يحدد إمكانية الوصول للمتغيرات في أجزاء مختلفة من الكود.",
      difficulty: 'junior'
    },
    {
      id: 71,
      text: "ما الفرق بين let و const؟",
      options: [
        "let يمكن إعادة التعيين، const لا يمكن",
        "const أسرع من let",
        "let للمتغيرات العالمية فقط",
        "لا فرق بينهما"
      ],
      correctAnswer: 0,
      explanation: "let يسمح بإعادة التعيين، بينما const يمنع إعادة التعيين بعد التعريف الأولي.",
      codeSnippet: "let x = 5;\nx = 10; // مسموح\n\nconst y = 5;\ny = 10; // خطأ",
      difficulty: 'junior'
    },
    {
      id: 72,
      text: "كيف تنشئ كائن Date في JavaScript؟",
      options: [
        "new Date()",
        "Date.create()",
        "Date.now()",
        "currentDate()"
      ],
      correctAnswer: 0,
      explanation: "new Date() ينشئ كائن تاريخ يمثل اللحظة الحالية.",
      codeSnippet: "const now = new Date();\nconsole.log(now);",
      difficulty: 'junior'
    },
    {
      id: 73,
      text: "ما هي الـ default parameters في JavaScript؟",
      options: [
        "قيم افتراضية لمعطيات الدالة",
        "متغيرات عالمية",
        "إعدادات المتصفح",
        "قيم ثابتة"
      ],
      correctAnswer: 0,
      explanation: "Default parameters تسمح بتعيين قيم افتراضية لمعطيات الدالة.",
      codeSnippet: "function greet(name = 'Guest') {\n  return `Hello ${name}`;\n}",
      difficulty: 'junior'
    },
    {
      id: 74,
      text: "كيف تتحقق إذا كان المتغير مصفوفة في JavaScript؟",
      options: [
        "Array.isArray()",
        "typeof variable",
        "variable.isArray()",
        "instanceof Array"
      ],
      correctAnswer: 0,
      explanation: "Array.isArray() تتحقق إذا كانت القيمة مصفوفة.",
      codeSnippet: "const arr = [1, 2, 3];\nconsole.log(Array.isArray(arr)); // true",
      difficulty: 'junior'
    },
    {
      id: 75,
      text: "ما هو الـ rest parameter في JavaScript؟",
      options: [
        "يمثل عدد غير محدد من المعطيات كمصفوفة",
        "يوقف تنفيذ الدالة",
        "يرجع القيمة المتبقية",
        "يحفظ الحالة"
      ],
      correctAnswer: 0,
      explanation: "Rest parameter ... يجمع المعطيات المتبقية في مصفوفة.",
      codeSnippet: "function sum(...numbers) {\n  return numbers.reduce((acc, curr) => acc + curr, 0);\n}",
      difficulty: 'junior'
    },
    {
      id: 76,
      text: "كيف تعمل الـ setTimeout function؟",
      options: [
        "تنفذ الدالة بعد تأخير محدد",
        "تنفذ الدالة فوراً",
        "توقف التنفيذ",
        "تكرر التنفيذ"
      ],
      correctAnswer: 0,
      explanation: "setTimeout() تنفذ دالة بعد عدد محدد من المللي ثانية.",
      codeSnippet: "setTimeout(() => {\n  console.log('Hello after 2 seconds');\n}, 2000);",
      difficulty: 'junior'
    },
    {
      id: 77,
      text: "ما الفرق بين setTimeout و setInterval؟",
      options: [
        "setTimeout مرة واحدة، setInterval يتكرر",
        "setTimeout أسرع",
        "setInterval للفترات القصيرة فقط",
        "لا فرق بينهما"
      ],
      correctAnswer: 0,
      explanation: "setTimeout تنفذ مرة واحدة، setInterval تكرر التنفيذ بفترات منتظمة.",
      codeSnippet: "setInterval(() => {\n  console.log('Repeats every second');\n}, 1000);",
      difficulty: 'junior'
    },
    {
      id: 78,
      text: "كيف تلغي الـ setTimeout؟",
      options: [
        "clearTimeout()",
        "cancelTimeout()",
        "stopTimeout()",
        "removeTimeout()"
      ],
      correctAnswer: 0,
      explanation: "clearTimeout() تلغي timeout الذي تم إنشاؤه بواسطة setTimeout().",
      codeSnippet: "const timeoutId = setTimeout(() => {}, 1000);\nclearTimeout(timeoutId);",
      difficulty: 'junior'
    },
    {
      id: 79,
      text: "ما هو الـ JSON.stringify()؟",
      options: [
        "يحول JavaScript object إلى JSON string",
        "يحول JSON string إلى object",
        "ينسق النص",
        "يشفر البيانات"
      ],
      correctAnswer: 0,
      explanation: "JSON.stringify() تحول JavaScript object إلى JSON string.",
      codeSnippet: "const obj = { name: 'John', age: 30 };\nconst json = JSON.stringify(obj);",
      difficulty: 'junior'
    },
    {
      id: 80,
      text: "كيف تتحقق إذا كان الكائن يحتوي على خاصية معينة؟",
      options: [
        "hasOwnProperty()",
        "contains()",
        "includes()",
        "has()"
      ],
      correctAnswer: 0,
      explanation: "hasOwnProperty() تتحقق إذا كان الكائن يحتوي على خاصية معينة.",
      codeSnippet: "const obj = { name: 'John' };\nconsole.log(obj.hasOwnProperty('name')); // true",
      difficulty: 'junior'
    },
    {
      id: 81,
      text: "ما هو الـ 'use strict' في JavaScript؟",
      options: [
        "وضع صارم يمنع بعض الأخطاء",
        "نوع من المتغيرات",
        "مكتبة خارجية",
        "أداة تطوير"
      ],
      correctAnswer: 0,
      explanation: "'use strict' يفعّل الوضع الصارم الذي يمنع بعض الأخطاء الشائعة.",
      codeSnippet: "'use strict';\nx = 5; // خطأ لأن x غير معرف",
      difficulty: 'junior'
    },
    {
      id: 82,
      text: "كيف تنشئ رقم عشوائي بين 0 و 1 في JavaScript؟",
      options: [
        "Math.random()",
        "random()",
        "Math.rand()",
        "Number.random()"
      ],
      correctAnswer: 0,
      explanation: "Math.random() ترجع رقم عشوائي بين 0 (شامل) و 1 (غير شامل).",
      codeSnippet: "const random = Math.random();\nconsole.log(random);",
      difficulty: 'junior'
    },
    {
      id: 83,
      text: "كيف تقرب رقم لأقرب عدد صحيح في JavaScript؟",
      options: [
        "Math.round()",
        "Math.floor()",
        "Math.ceil()",
        "Math.trunc()"
      ],
      correctAnswer: 0,
      explanation: "Math.round() تقرب الرقم لأقرب عدد صحيح.",
      codeSnippet: "console.log(Math.round(4.7)); // 5\nconsole.log(Math.round(4.3)); // 4",
      difficulty: 'junior'
    },
    {
      id: 84,
      text: "ما الفرق بين Math.floor() و Math.ceil()؟",
      options: [
        "floor تقرب لأسفل، ceil تقرب لأعلى",
        "floor أسرع من ceil",
        "ceil للكسور فقط",
        "لا فرق بينهما"
      ],
      correctAnswer: 0,
      explanation: "Math.floor() تقرب لأسفل، Math.ceil() تقرب لأعلى.",
      codeSnippet: "console.log(Math.floor(4.7)); // 4\nconsole.log(Math.ceil(4.3)); // 5",
      difficulty: 'junior'
    },
    {
      id: 85,
      text: "كيف تحول نص إلى أحرف صغيرة في JavaScript؟",
      options: [
        ".toLowerCase()",
        ".toLower()",
        ".small()",
        ".lower()"
      ],
      correctAnswer: 0,
      explanation: ".toLowerCase() تحول النص إلى أحرف صغيرة.",
      codeSnippet: "const text = 'HELLO';\nconsole.log(text.toLowerCase()); // 'hello'",
      difficulty: 'junior'
    },
    {
      id: 86,
      text: "ما هي الـ ternary operator في JavaScript؟",
      options: [
        "condition ? expr1 : expr2",
        "if else then",
        "condition then else",
        "?: operator"
      ],
      correctAnswer: 0,
      explanation: "Ternary operator هي صيغة مختصرة لـ if-else.",
      codeSnippet: "const age = 20;\nconst status = age >= 18 ? 'adult' : 'minor';",
      difficulty: 'junior'
    },
    {
      id: 87,
      text: "كيف تدمج مصفوفتين في JavaScript؟",
      options: [
        "concat() أو spread operator",
        "merge()",
        "combine()",
        "join()"
      ],
      correctAnswer: 0,
      explanation: "يمكن استخدام concat() أو spread operator ... لدمج المصفوفات.",
      codeSnippet: "const arr1 = [1, 2];\nconst arr2 = [3, 4];\nconst merged = [...arr1, ...arr2];",
      difficulty: 'junior'
    },
    {
      id: 88,
      text: "ما هو الـ NaN في JavaScript؟",
      options: [
        "Not-a-Number",
        "Null Number",
        "Not Available Number",
        "New Number"
      ],
      correctAnswer: 0,
      explanation: "NaN تمثل قيمة ليست رقم (Not-a-Number).",
      codeSnippet: "console.log(0 / 0); // NaN\nconsole.log(isNaN('hello')); // true",
      difficulty: 'junior'
    },
    {
      id: 89,
      text: "كيف تتحقق إذا كانت القيمة NaN؟",
      options: [
        "isNaN()",
        "=== NaN",
        "Number.isNaN()",
        "value.isNaN()"
      ],
      correctAnswer: 0,
      explanation: "isNaN() تتحقق إذا كانت القيمة NaN.",
      codeSnippet: "console.log(isNaN('hello')); // true\nconsole.log(isNaN(123)); // false",
      difficulty: 'junior'
    },
    {
      id: 90,
      text: "ما هو الـ null في JavaScript؟",
      options: [
        "قيمة تمثل لا شيء متعمد",
        "قيمة غير معرفة",
        "صفر",
        "قيمة خاطئة"
      ],
      correctAnswer: 0,
      explanation: "null تمثل قيمة متعمدة لعدم وجود قيمة.",
      difficulty: 'junior'
    },
    {
      id: 91,
      text: "ما الفرق بين null و undefined؟",
      options: [
        "null متعمد، undefined غير متعمد",
        "null أسرع من undefined",
        "undefined للمتغيرات فقط",
        "لا فرق بينهما"
      ],
      correctAnswer: 0,
      explanation: "null قيمة متعمدة، undefined يعني أن المتغير لم يتم تعيين قيمة له.",
      difficulty: 'junior'
    },
    {
      id: 92,
      text: "كيف تنشئ دالة تقبل عدد متغير من المعطيات؟",
      options: [
        "باستخدام rest parameters ...",
        "باستخدام arguments object",
        "باستخدام parameters متعددة",
        "لا يمكن ذلك"
      ],
      correctAnswer: 0,
      explanation: "Rest parameters ... تسمح للدالة بقبول عدد متغير من المعطيات.",
      codeSnippet: "function sum(...numbers) {\n  return numbers.reduce((acc, curr) => acc + curr, 0);\n}",
      difficulty: 'junior'
    },
    {
      id: 93,
      text: "ما هو الـ arguments object في JavaScript؟",
      options: [
        "كائن يحتوي على جميع المعطيات الممررة للدالة",
        "قائمة الوسائط",
        "كائن للجدال",
        "نوع من المصفوفات"
      ],
      correctAnswer: 0,
      explanation: "arguments object هو كائن يشبه المصفوفة يحتوي على المعطيات الممررة للدالة.",
      codeSnippet: "function showArgs() {\n  console.log(arguments);\n}",
      difficulty: 'junior'
    },
    {
      id: 94,
      text: "كيف تحول مصفوفة إلى نص في JavaScript؟",
      options: [
        "join()",
        "toString()",
        "stringify()",
        "concat()"
      ],
      correctAnswer: 0,
      explanation: "join() تحول المصفوفة إلى نص مع فاصل اختياري بين العناصر.",
      codeSnippet: "const arr = ['a', 'b', 'c'];\nconsole.log(arr.join('-')); // 'a-b-c'",
      difficulty: 'junior'
    },
    {
      id: 95,
      text: "ما هو الـ localStorage في JavaScript؟",
      options: [
        "تخزين محلي في المتصفح",
        "ذاكرة مؤقتة",
        "قاعدة بيانات",
        "ملف تخزين"
      ],
      correctAnswer: 0,
      explanation: "localStorage يسمح بتخزين البيانات محلياً في متصفح المستخدم.",
      codeSnippet: "localStorage.setItem('key', 'value');\nconst value = localStorage.getItem('key');",
      difficulty: 'junior'
    },
    {
      id: 96,
      text: "كيف تخزن بيانات في localStorage؟",
      options: [
        "setItem()",
        "save()",
        "store()",
        "put()"
      ],
      correctAnswer: 0,
      explanation: "setItem() تخزن زوج مفتاح-قيمة في localStorage.",
      codeSnippet: "localStorage.setItem('username', 'john');",
      difficulty: 'junior'
    },
    {
      id: 97,
      text: "كيف تسترجع بيانات من localStorage؟",
      options: [
        "getItem()",
        "retrieve()",
        "fetch()",
        "load()"
      ],
      correctAnswer: 0,
      explanation: "getItem() تسترجع قيمة بناءً على المفتاح من localStorage.",
      codeSnippet: "const username = localStorage.getItem('username');",
      difficulty: 'junior'
    },
    {
      id: 98,
      text: "كيف تحذف بيانات من localStorage؟",
      options: [
        "removeItem()",
        "delete()",
        "clear()",
        "erase()"
      ],
      correctAnswer: 0,
      explanation: "removeItem() تحذف زوج مفتاح-قيمة محدد من localStorage.",
      codeSnippet: "localStorage.removeItem('username');",
      difficulty: 'junior'
    },
    {
      id: 99,
      text: "ما هو الـ sessionStorage؟",
      options: [
        "تخزين للجلسة فقط",
        "تخزين دائم",
        "تخزين للمستخدم",
        "تخزين للملفات"
      ],
      correctAnswer: 0,
      explanation: "sessionStorage يشبه localStorage لكن البيانات تُحذف عند إغلاق الجلسة.",
      codeSnippet: "sessionStorage.setItem('temp', 'data');",
      difficulty: 'junior'
    },
    {
      id: 100,
      text: "كيف تتحقق من نوع البيانات في JavaScript؟",
      options: [
        "typeof",
        "typeOf",
        "getType",
        "whatType"
      ],
      correctAnswer: 0,
      explanation: "typeof operator يرجع نوع البيانات كـ string.",
      codeSnippet: "console.log(typeof 42); // 'number'\nconsole.log(typeof 'hello'); // 'string'",
      difficulty: 'junior'
    }
  ];
}
 private getMidQuestions(): Question[] {
  return [
    {
      id: 101,
      text: "ما هو الـ time complexity لخوارزمية merge sort؟",
      options: ["O(n log n)", "O(n²)", "O(log n)", "O(n)"],
      correctAnswer: 0,
      explanation: "Merge sort له O(n log n) لأنه يقسم المصفوفة ويندمجها بشكل متكرر.",
      difficulty: 'mid'
    },
    {
      id: 102,
      text: "كيف يعمل الـ React reconciliation؟",
      options: [
        "يقارن Virtual DOM القديم بالجديد ويحدد التغييرات",
        "يعيد تصيير كل المكونات",
        "يستخدم الـ DOM مباشرة",
        "يغير حالة التطبيق كاملاً"
      ],
      correctAnswer: 0,
      explanation: "Reconciliation يقارن شجرتي Virtual DOM ويحدد الحد الأدنى من التغييرات.",
      difficulty: 'mid'
    },
    {
      id: 103,
      text: "ما هو الـ React context ومتى تستخدمه؟",
      options: [
        "لتمرير البيانات عبر شجرة المكونات دون props drilling",
        "لتحسين الأداء",
        "لإدارة الحالة المحلية",
        "للتوجيه بين الصفحات"
      ],
      correctAnswer: 0,
      explanation: "Context يمرر البيانات عبر شجرة المكونات دون الحاجة لتمرير props يدوياً.",
      difficulty: 'mid'
    },
    {
      id: 104,
      text: "ما الفرق بين useCallback و useMemo في React؟",
      options: [
        "useCallback يحفظ الدوال، useMemo يحفظ القيم",
        "لا فرق بينهما",
        "useCallback للقيم، useMemo للدوال",
        "useCallback أحدث من useMemo"
      ],
      correctAnswer: 0,
      explanation: "useCallback يحفظ مرجع الدالة، useMemo يحفظ نتيجة الحساب.",
      difficulty: 'mid'
    },
    {
      id: 105,
      text: "كيف تعمل الـ React hooks؟",
      options: [
        "تسمح باستخدام state و features أخرى في functional components",
        "تحل محل class components",
        "تستخدم فقط في lifecycle methods",
        "هي مجرد syntactic sugar"
      ],
      correctAnswer: 0,
      explanation: "Hooks تسمح باستخدام state و lifecycle features في functional components.",
      difficulty: 'mid'
    },
    {
      id: 106,
      text: "ما هو الـ Redux ومتى تستخدمه؟",
      options: [
        "مكتبة لإدارة حالة التطبيق في تطبيقات كبيرة",
        "مكتبة للتوجيه",
        "مكتبة للتصيير",
        "مكتبة للاختبار"
      ],
      correctAnswer: 0,
      explanation: "Redux لإدارة حالة التطبيق في تطبيقات كبيرة ومعقدة.",
      difficulty: 'mid'
    },
    {
      id: 107,
      text: "كيف يعمل الـ Redux data flow؟",
      options: [
        "View -> Action -> Reducer -> Store -> View",
        "Action -> View -> Reducer -> Store",
        "Store -> Action -> Reducer -> View",
        "View -> Reducer -> Action -> Store"
      ],
      correctAnswer: 0,
      explanation: "Data flow: View يرسل Action إلى Reducer الذي يحدث Store الذي يحدث View.",
      difficulty: 'mid'
    },
    {
      id: 108,
      text: "ما هي الـ middleware في Redux؟",
      options: [
        "وظائف تعالج Actions قبل وصولها للـ Reducers",
        "مكتبات للتوجيه",
        "أدوات للتطوير",
        "أنواع من الـ Reducers"
      ],
      correctAnswer: 0,
      explanation: "Middleware تعالج Actions وتنفذ منطق جانبي قبل وصولها للـ Reducers.",
      difficulty: 'mid'
    },
    {
      id: 109,
      text: "ما هو الـ Redux Thunk؟",
      options: [
        "middleware للتعامل مع الـ async actions",
        "نوع من الـ actions",
        "أداة للتطوير",
        "مكتبة للتوجيه"
      ],
      correctAnswer: 0,
      explanation: "Redux Thunk middleware يسمح بكتابة async actions ترجع دوال بدلاً من objects.",
      difficulty: 'mid'
    },
    {
      id: 110,
      text: "كيف تتحقق من نوع البيانات في TypeScript؟",
      options: [
        "استخدام interfaces و types",
        "استخدام typeof فقط",
        "استخدام classes فقط",
        "لا يمكن التحقق من الأنواع"
      ],
      correctAnswer: 0,
      explanation: "TypeScript يستخدم interfaces و types للتحقق من أنواع البيانات أثناء التطوير.",
      difficulty: 'mid'
    },
    {
      id: 111,
      text: "ما هي الـ generics في TypeScript؟",
      options: [
        "أنواع يمكن إعادة استخدامها مع أنواع مختلفة",
        "دوال عامة",
        "أنواع ثابتة",
        "مكتبات خارجية"
      ],
      correctAnswer: 0,
      explanation: "Generics تسمح بإنشاء مكونات تعمل مع أنواع متعددة مع الحفاظ على type safety.",
      difficulty: 'mid'
    },
    {
      id: 112,
      text: "ما الفرق بين interface و type في TypeScript؟",
      options: [
        "interface يمكن extendها، type يمكن استخدام union",
        "لا فرق بينهما",
        "interface للـ classes فقط",
        "type أحدث من interface"
      ],
      correctAnswer: 0,
      explanation: "interface يمكن extendها بسهولة، type تدعم union types بشكل أفضل.",
      difficulty: 'mid'
    },
    {
      id: 113,
      text: "كيف تعمل الـ Webpack؟",
      options: [
        "يحزم modules التطبيق في حزم (bundles)",
        "ينشئ servers للتطوير",
        "يدير قواعد البيانات",
        "ينشئ واجهات المستخدم"
      ],
      correctAnswer: 0,
      explanation: "Webpack module bundler يحزم modules التطبيق في ملفات static للاستخدام في المتصفح.",
      difficulty: 'mid'
    },
    {
      id: 114,
      text: "ما هو الـ tree shaking في Webpack؟",
      options: [
        "إزالة الكود غير المستخدم من الحزمة النهائية",
        "تحسين سرعة التحميل",
        "ضغط الملفات",
        "تحويل الكود إلى صيغة أخرى"
      ],
      correctAnswer: 0,
      explanation: "Tree shaking يزيل الكود غير المستخدم من الحزمة النهائية لتقليل حجمها.",
      difficulty: 'mid'
    },
    {
      id: 115,
      text: "ما هو الـ code splitting في React؟",
      options: [
        "تقسيم الكود إلى حزم أصغر يتم تحميلها عند الحاجة",
        "تقسيم المكونات إلى ملفات منفصلة",
        "تقسيم البيانات",
        "تقسيم التطبيق إلى صفحات"
      ],
      correctAnswer: 0,
      explanation: "Code splitting يقسم الكود إلى حزم أصغر يتم تحميلها فقط عند الحاجة لها.",
      difficulty: 'mid'
    },
    {
      id: 116,
      text: "كيف تستخدم React.lazy للـ lazy loading؟",
      options: [
        "React.lazy(() => import('./Component'))",
        "React.lazy(Component)",
        "import lazy from './Component'",
        "React.load(Component)"
      ],
      correctAnswer: 0,
      explanation: "React.lazy يسمح بعمل lazy loading للمكونات باستخدام dynamic import.",
      difficulty: 'mid'
    },
    {
      id: 117,
      text: "ما هو الـ React.memo؟",
      options: [
        "Higher Order Component يمنع إعادة التصيير غير الضرورية",
        "hook لإدارة الحالة",
        "أداة للتطوير",
        "مكتبة للتوجيه"
      ],
      correctAnswer: 0,
      explanation: "React.memo يحفظ المكون ويعيد استخدامه إذا لم تتغير الـ props.",
      difficulty: 'mid'
    },
    {
      id: 118,
      text: "ما الفرق بين controlled و uncontrolled components؟",
      options: [
        "Controlled تتحكم فيها React عبر state، uncontrolled تتحكم فيها الـ DOM",
        "لا فرق بينهما",
        "Controlled أسرع",
        "Uncontrolled أحدث"
      ],
      correctAnswer: 0,
      explanation: "Controlled components تتحكم فيها React عبر state، uncontrolled تتحكم فيها الـ DOM مباشرة.",
      difficulty: 'mid'
    },
    {
      id: 119,
      text: "كيف تتعامل مع forms في React؟",
      options: [
        "استخدام controlled components مع state",
        "استخدام الـ DOM مباشرة",
        "استخدام jQuery",
        "استخدام vanilla JavaScript فقط"
      ],
      correctAnswer: 0,
      explanation: "في React نستخدم controlled components مع state لإدارة قيم النماذج.",
      difficulty: 'mid'
    },
    {
      id: 120,
      text: "ما هو الـ React portal؟",
      options: [
        "طريقة لعرض المكونات خارج تسلسل الـ DOM العادي",
        "نوع من المكونات",
        "أداة للتوجيه",
        "مكتبة خارجية"
      ],
      correctAnswer: 0,
      explanation: "Portals تسمح بعرض المكونات في جزء مختلف من شجرة الـ DOM.",
      difficulty: 'mid'
    },
    {
      id: 121,
      text: "كيف تنشئ custom hook في React؟",
      options: [
        "دالة تبدأ بـ use وتستخدم hooks أخرى",
        "دالة عادية ترجع JSX",
        "class component",
        "higher order component"
      ],
      correctAnswer: 0,
      explanation: "Custom hooks هي دوال تبدأ بـ use ويمكنها استخدام hooks أخرى داخلها.",
      difficulty: 'mid'
    },
    {
      id: 122,
      text: "ما هو الـ useEffect cleanup؟",
      options: [
        "دالة ترجعها useEffect لتنظيف side effects",
        "حذف الـ state",
        "إزالة المكون من الـ DOM",
        "حذف الـ props"
      ],
      correctAnswer: 0,
      explanation: "useEffect يمكنها ترجيع دالة cleanup لتنظيف side effects قبل إزالة المكون.",
      difficulty: 'mid'
    },
    {
      id: 123,
      text: "كيف تتحقق من أنواع الـ props في React مع TypeScript؟",
      options: [
        "استخدام interface للـ props",
        "استخدام PropTypes",
        "استخدام JavaScript فقط",
        "لا يمكن التحقق من الأنواع"
      ],
      correctAnswer: 0,
      explanation: "في TypeScript نستخدم interfaces لتعريف أنواع الـ props.",
      difficulty: 'mid'
    },
    {
      id: 124,
      text: "ما هو الـ React suspense؟",
      options: [
        "مكون يسمح بعرض fallback أثناء تحميل المكونات",
        "نوع من الـ state",
        "أداة للتطوير",
        "مكتبة للتوجيه"
      ],
      correctAnswer: 0,
      explanation: "Suspense يسمح للمكونات 'بالانتظار' لشيء ما وعرض fallback أثناء الانتظار.",
      difficulty: 'mid'
    },
    {
      id: 125,
      text: "كيف تعمل الـ React error boundaries؟",
      options: [
        "مكونات تتعامل مع الأخطاء في شجرة المكونات الفرعية",
        "دوال تتعامل مع الأخطاء",
        "أدوات للتطوير",
        "مكتبات خارجية"
      ],
      correctAnswer: 0,
      explanation: "Error boundaries تتعامل مع الأخطاء في شجرة المكونات الفرعية وتمنع crash التطبيق.",
      difficulty: 'mid'
    },
    {
      id: 126,
      text: "ما هو الـ React strict mode؟",
      options: [
        "أداة تساعد في اكتشاف المشاكل المحتملة",
        "وضع للإنتاج فقط",
        "مكتبة للتوجيه",
        "نوع من المكونات"
      ],
      correctAnswer: 0,
      explanation: "Strict Mode يساعد في اكتشاف المشاكل المحتملة أثناء التطوير.",
      difficulty: 'mid'
    },
    {
      id: 127,
      text: "كيف تختبر React components؟",
      options: [
        "باستخدام Jest و React Testing Library",
        "باستخدام console.log فقط",
        "باستخدام alert",
        "لا يمكن اختبار المكونات"
      ],
      correctAnswer: 0,
      explanation: "Jest و React Testing Library هما الأدوات الأساسية لاختبار React components.",
      difficulty: 'mid'
    },
    {
      id: 128,
      text: "ما هو الـ React fragment؟",
      options: [
        "مكون يسمح بتجميع عناصر دون إضافة عقدة DOM إضافية",
        "نوع من الـ state",
        "أداة للتطوير",
        "مكتبة خارجية"
      ],
      correctAnswer: 0,
      explanation: "Fragment يسمح بتجميع قائمة من الأطفال دون إضافة عقدة إضافية لشجرة الـ DOM.",
      difficulty: 'mid'
    },
    {
      id: 129,
      text: "كيف تعمل الـ React keys؟",
      options: [
        "تساعد React في تحديد العناصر التي تغيرت",
        "تستخدم للتشفير",
        "تستخدم للتوجيه",
        "تستخدم للتصيير فقط"
      ],
      correctAnswer: 0,
      explanation: "Keys تساعد React في تحديد العناصر التي تغيرت، أضيفت، أو أزيلت.",
      difficulty: 'mid'
    },
    {
      id: 130,
      text: "ما هو الـ React context API؟",
      options: [
        "طريقة لتمرير البيانات عبر شجرة المكونات دون props drilling",
        "مكتبة لإدارة الحالة",
        "أداة للتوجيه",
        "نوع من الـ hooks"
      ],
      correctAnswer: 0,
      explanation: "Context API يسمح بتمرير البيانات عبر شجرة المكونات دون الحاجة لتمرير props يدوياً.",
      difficulty: 'mid'
    },
    {
      id: 131,
      text: "كيف تنشئ theme في React؟",
      options: [
        "باستخدام React context",
        "باستخدام CSS فقط",
        "باستخدام JavaScript فقط",
        "باستخدام HTML attributes"
      ],
      correctAnswer: 0,
      explanation: "يمكن إنشاء theme system باستخدام React context لتمرير إعدادات التصميم.",
      difficulty: 'mid'
    },
    {
      id: 132,
      text: "ما هو الـ React forwardRef؟",
      options: [
        "تقنية لتمرير ref عبر مكونات",
        "نوع من الـ state",
        "أداة للتطوير",
        "مكتبة خارجية"
      ],
      correctAnswer: 0,
      explanation: "forwardRef يسمح بتمرير ref عبر المكونات إلى عناصر DOM أو مكونات class.",
      difficulty: 'mid'
    },
    {
      id: 133,
      text: "كيف تعمل الـ React performance optimization؟",
      options: [
        "باستخدام React.memo, useMemo, useCallback",
        "باستخدام JavaScript فقط",
        "باستخدام CSS فقط",
        "لا يمكن تحسين الأداء"
      ],
      correctAnswer: 0,
      explanation: "يمكن تحسين أداء React باستخدام React.memo, useMemo, و useCallback.",
      difficulty: 'mid'
    },
    {
      id: 134,
      text: "ما هو الـ React concurrent mode؟",
      options: [
        "مجموعة من الميزات لتحسين تجربة المستخدم",
        "وضع للإنتاج فقط",
        "مكتبة للتوجيه",
        "نوع من الـ state"
      ],
      correctAnswer: 0,
      explanation: "Concurrent Mode مجموعة ميزات تساعد React في البقاء مستجيباً.",
      difficulty: 'mid'
    },
    {
      id: 135,
      text: "كيف تتعامل مع الـ side effects في React؟",
      options: [
        "باستخدام useEffect hook",
        "باستخدام componentDidMount فقط",
        "باستخدام JavaScript فقط",
        "لا يمكن التعامل مع side effects"
      ],
      correctAnswer: 0,
      explanation: "useEffect hook هو الطريقة الأساسية للتعامل مع side effects في functional components.",
      difficulty: 'mid'
    },
    {
      id: 136,
      text: "ما هو الـ React state management؟",
      options: [
        "طريقة لإدارة حالة التطبيق",
        "مكتبة للتوجيه",
        "أداة للتطوير",
        "نوع من الـ hooks"
      ],
      correctAnswer: 0,
      explanation: "State management يشير إلى كيفية إدارة حالة التطبيق وتحديثها.",
      difficulty: 'mid'
    },
    {
      id: 137,
      text: "كيف تعمل الـ React hooks rules؟",
      options: [
        "لا تستدع hooks داخل loops, conditions, أو nested functions",
        "يمكن استدعاء hooks في أي مكان",
        "hooks للـ class components فقط",
        "لا توجد قواعد لـ hooks"
      ],
      correctAnswer: 0,
      explanation: "Hooks يجب استدعاؤها فقط في top level من functional components.",
      difficulty: 'mid'
    },
    {
      id: 138,
      text: "ما هو الـ React component lifecycle؟",
      options: [
        "سلسلة الأحداث من إنشاء المكون إلى إزالته",
        "مكتبة خارجية",
        "أداة للتطوير",
        "نوع من الـ state"
      ],
      correctAnswer: 0,
      explanation: "Component lifecycle يشمل mounting, updating, و unmounting phases.",
      difficulty: 'mid'
    },
    {
      id: 139,
      text: "كيف تنشئ reusable component في React؟",
      options: [
        "باستخدام props و composition",
        "باستخدام CSS فقط",
        "باستخدام JavaScript فقط",
        "لا يمكن إنشاء reusable components"
      ],
      correctAnswer: 0,
      explanation: "Reusable components تنشأ باستخدام props للتمرير customization و composition لإعادة الاستخدام.",
      difficulty: 'mid'
    },
    {
      id: 140,
      text: "ما هو الـ React prop drilling؟",
      options: [
        "تمرير props عبر مستويات متعددة من المكونات",
        "نوع من الـ state",
        "أداة للتطوير",
        "مكتبة خارجية"
      ],
      correctAnswer: 0,
      explanation: "Prop drilling يحدث عندما نمرر props عبر مستويات متعددة من المكونات.",
      difficulty: 'mid'
    },
    {
      id: 141,
      text: "كيف تتجنب prop drilling في React؟",
      options: [
        "باستخدام React context أو state management",
        "باستخدام JavaScript فقط",
        "باستخدام CSS فقط",
        "لا يمكن تجنب prop drilling"
      ],
      correctAnswer: 0,
      explanation: "يمكن تجنب prop drilling باستخدام React context أو state management libraries.",
      difficulty: 'mid'
    },
    {
      id: 142,
      text: "ما هو الـ React composition؟",
      options: [
        "بناء واجهات مستخدم من مكونات أصغر",
        "مكتبة خارجية",
        "أداة للتطوير",
        "نوع من الـ state"
      ],
      correctAnswer: 0,
      explanation: "Composition هو بناء واجهات مستخدم معقدة من مكونات أبسط وأصغر.",
      difficulty: 'mid'
    },
    {
      id: 143,
      text: "كيف تعمل الـ React event handling؟",
      options: [
        "باستخدام synthetic events",
        "باستخدام DOM events مباشرة",
        "باستخدام jQuery",
        "باستخدام vanilla JavaScript فقط"
      ],
      correctAnswer: 0,
      explanation: "React uses synthetic events التي تعمل عبر جميع المتصفحات.",
      difficulty: 'mid'
    },
    {
      id: 144,
      text: "ما هو الـ React conditional rendering؟",
      options: [
        "عرض مكونات مختلفة بناءً على conditions",
        "مكتبة خارجية",
        "أداة للتطوير",
        "نوع من الـ state"
      ],
      correctAnswer: 0,
      explanation: "Conditional rendering يعني عرض مكونات مختلفة بناءً على شروط معينة.",
      difficulty: 'mid'
    },
    {
      id: 145,
      text: "كيف تعمل الـ React lists و keys؟",
      options: [
        "عرض قوائم من البيانات باستخدام keys للتعريف",
        "مكتبة خارجية",
        "أداة للتطوير",
        "نوع من الـ state"
      ],
      correctAnswer: 0,
      explanation: "عند عرض lists, يجب توفير keys فريدة لمساعدة React في التعرف على العناصر.",
      difficulty: 'mid'
    },
    {
      id: 146,
      text: "ما هو الـ React higher-order component؟",
      options: [
        "دالة تأخذ مكوناً وترجع مكوناً جديداً",
        "نوع من الـ state",
        "أداة للتطوير",
        "مكتبة خارجية"
      ],
      correctAnswer: 0,
      explanation: "Higher-order component هي دالة تأخذ مكوناً وترجع مكوناً جديداً مع props إضافية.",
      difficulty: 'mid'
    },
    {
      id: 147,
      text: "كيف تعمل الـ React render props؟",
      options: [
        "تقنية لمشاركة الكود باستخدام prop تكون دالة",
        "مكتبة خارجية",
        "أداة للتطوير",
        "نوع من الـ state"
      ],
      correctAnswer: 0,
      explanation: "Render props هي تقنية لمشاركة الكود بين المكونات باستخدام prop تكون دالة.",
      difficulty: 'mid'
    },
    {
      id: 148,
      text: "ما هو الـ React code splitting؟",
      options: [
        "تقسيم الكود إلى حزم أصغر يتم تحميلها عند الحاجة",
        "مكتبة خارجية",
        "أداة للتطوير",
        "نوع من الـ state"
      ],
      correctAnswer: 0,
      explanation: "Code splitting يقسم الكود إلى حزم أصغر يتم تحميلها فقط عند الحاجة لها.",
      difficulty: 'mid'
    },
    {
      id: 149,
      text: "كيف تعمل الـ React server-side rendering؟",
      options: [
        "تصيير المكونات على الخادم وإرسال HTML جاهز",
        "مكتبة خارجية",
        "أداة للتطوير",
        "نوع من الـ state"
      ],
      correctAnswer: 0,
      explanation: "Server-side rendering يعني تصيير المكونات على الخادم وإرسال HTML جاهز للمتصفح.",
      difficulty: 'mid'
    },
    {
      id: 150,
      text: "ما هو الـ React static site generation؟",
      options: [
        "إنشاء صفحات HTML static أثناء البناء",
        "مكتبة خارجية",
        "أداة للتطوير",
        "نوع من الـ state"
      ],
      correctAnswer: 0,
      explanation: "Static site generation يعني إنشاء صفحات HTML static أثناء عملية البناء.",
      difficulty: 'mid'
    }
  ];
}

  private getExpertQuestions(): Question[] {
  return [
    {
      id: 151,
      text: "كيف تنفذ دالة debounce من الصفر؟",
      options: [
        "تؤخر التنفيذ حتى يتوقف الإدخال",
        "تنفذ فوراً",
        "تلغي التنفيذ",
        "تكرر التنفيذ"
      ],
      correctAnswer: 0,
      explanation: "Debounce تؤخر تنفيذ الدالة حتى يتوقف الإدخال لفترة محددة.",
      codeSnippet: `function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}`,
      difficulty: 'expert'
    },
    {
      id: 152,
      text: "ما هو React fiber architecture؟",
      options: [
        "هندسة إعادة البناء لـ React",
        "مكتبة جديدة لـ React",
        "نوع من المكونات",
        "أداة تطوير"
      ],
      correctAnswer: 0,
      explanation: "Fiber هي هندسة إعادة بناء لخوارزمية React تمكن من التصيير التدريجي.",
      difficulty: 'expert'
    },
    {
      id: 153,
      text: "ما الفرق بين microtask و macrotask؟",
      options: [
        "microtask تنفذ قبل macrotask",
        "لا فرق بينهما",
        "macrotask أسرع",
        "microtask للعمليات الكبيرة"
      ],
      correctAnswer: 0,
      explanation: "Microtasks تنفذ بعد الكود الحالي وقبل الـ rendering، بينما Macrotasks تنفذ بعد الـ rendering.",
      codeSnippet: `console.log('Script start');
setTimeout(() => console.log('setTimeout'), 0);
Promise.resolve().then(() => console.log('Promise'));
console.log('Script end');`,
      difficulty: 'expert'
    },
    {
      id: 154,
      text: "كيف تقوم بتحسين React component بطيء؟",
      options: [
        "استخدام React.memo و useMemo",
        "إعادة كتابة الكود بلغة أخرى",
        "حذف المكون",
        "إضافة المزيد من الميزات"
      ],
      correctAnswer: 0,
      explanation: "React.memo و useMemo يساعدان في منع إعادة التصيير غير الضرورية.",
      codeSnippet: `const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => expensiveCalculation(data), [data]);
  return <div>{processedData}</div>;
});`,
      difficulty: 'expert'
    },
    {
      id: 155,
      text: "ما هو الـ Virtual DOM diffing algorithm؟",
      options: [
        "خوارزمية لمقارنة Virtual DOM وتحديث Real DOM",
        "أداة لإنشاء DOM",
        "مكتبة للتحكم في DOM",
        "طريقة لحذف DOM"
      ],
      correctAnswer: 0,
      explanation: "Virtual DOM diffing يقارن شجرتي Virtual DOM ويحدد الحد الأدنى من التغييرات لتطبيقها على Real DOM.",
      difficulty: 'expert'
    },
    {
      id: 156,
      text: "ما هو الـ OAuth 2.0 flow؟",
      options: [
        "بروتوكول تفويض للوصول إلى الموارد",
        "بروتوكول تشفير",
        "بروتوكول اتصال",
        "بروتوكول تخزين"
      ],
      correctAnswer: 0,
      explanation: "OAuth 2.0 هو بروتوكول تفويض يسمح للتطبيقات بالحصول على وصول محدود إلى حسابات المستخدمين.",
      difficulty: 'expert'
    },
    {
      id: 157,
      text: "ما هو الـ GraphQL وكيف يختلف عن REST؟",
      options: [
        "GraphQL يطلب بيانات محددة، REST يرجع بيانات ثابتة",
        "لا فرق بينهما",
        "REST أحدث من GraphQL",
        "GraphQL للخوادم فقط"
      ],
      correctAnswer: 0,
      explanation: "GraphQL يسمح للعميل بطلب بيانات محددة، بينما REST يرجع هياكل بيانات ثابتة.",
      difficulty: 'expert'
    },
    {
      id: 158,
      text: "ما هو الـ database sharding؟",
      options: [
        "تقسيم قاعدة البيانات إلى أجزاء أفقية",
        "تقسيم قاعدة البيانات إلى أجزاء رأسية",
        "نسخ قاعدة البيانات",
        "حذف قاعدة البيانات"
      ],
      correctAnswer: 0,
      explanation: "Sharding يقسم قاعدة البيانات إلى أجزاء أفقية لتوزيع الحمل.",
      difficulty: 'expert'
    },
    {
      id: 159,
      text: "ما هي الـ microservices architecture؟",
      options: [
        "هندسة تقسم التطبيق إلى خدمات صغيرة",
        "هندسة تستخدم خدمة واحدة كبيرة",
        "هندسة للتطبيقات الصغيرة فقط",
        "هندسة قديمة"
      ],
      correctAnswer: 0,
      explanation: "Microservices architecture تقسم التطبيق إلى خدمات صغيرة مستقلة.",
      difficulty: 'expert'
    },
    {
      id: 160,
      text: "ما هو الـ Docker؟",
      options: [
        "منصة لحزم وتشغيل التطبيقات في حاويات",
        "لغة برمجة",
        "مكتبة JavaScript",
        "أداة اختبار"
      ],
      correctAnswer: 0,
      explanation: "Docker منصة تستخدم الحاويات لتسهيل نشر وتشغيل التطبيقات.",
      difficulty: 'expert'
    },
    {
      id: 161,
      text: "كيف تنفذ دالة throttle من الصفر؟",
      options: [
        "تحد من عدد مرات تنفيذ الدالة في فترة زمنية",
        "تنفذ الدالة فوراً",
        "تلغي التنفيذ",
        "تكرر التنفيذ باستمرار"
      ],
      correctAnswer: 0,
      explanation: "Throttle تمنع تنفيذ الدالة أكثر من مرة في فترة زمنية محددة.",
      codeSnippet: `function throttle(func, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}`,
      difficulty: 'expert'
    },
    {
      id: 162,
      text: "ما هو الـ WebSocket وكيف يختلف عن HTTP؟",
      options: [
        "WebSocket اتصال ثنائي الاتجاه مستمر، HTTP طلب-استجابة",
        "لا فرق بينهما",
        "HTTP أسرع من WebSocket",
        "WebSocket للصفحات الثابتة فقط"
      ],
      correctAnswer: 0,
      explanation: "WebSocket يوفر اتصالاً ثنائي الاتجاه مستمراً، بينما HTTP يعتمد على نموذج طلب-استجابة.",
      difficulty: 'expert'
    },
    {
      id: 163,
      text: "كيف تعمل خوارزمية reconciliation في React؟",
      options: [
        "تقارن Virtual DOM القديم بالجديد وتحدد التغييرات",
        "تنشئ DOM جديد كاملاً",
        "تحديث DOM مباشرة",
        "لا تعمل على DOM"
      ],
      correctAnswer: 0,
      explanation: "Reconciliation تقارن شجرتي Virtual DOM وتحدد الحد الأدنى من التغييرات المطلوبة.",
      difficulty: 'expert'
    },
    {
      id: 164,
      text: "ما هو الـ Service Worker ومتى نستخدمه؟",
      options: [
        "برنامج نصي يعمل في الخلفية للتخزين المؤقت والدفع",
        "موظف خدمة العملاء",
        "أداة تطوير",
        "مكتبة UI"
      ],
      correctAnswer: 0,
      explanation: "Service Worker هو برنامج نصي يعمل في الخلفية للتخزين المؤقت، الدفع، وغيرها من الميزات.",
      difficulty: 'expert'
    },
    {
      id: 165,
      text: "كيف تنفذ الـ lazy loading للمكونات في React؟",
      options: [
        "باستخدام React.lazy و Suspense",
        "باستخدام setTimeout",
        "باستخدام CSS display none",
        "باستخدام jQuery"
      ],
      correctAnswer: 0,
      explanation: "React.lazy و Suspense يسمحان بتحميل المكونات بشكل كسول عند الحاجة.",
      codeSnippet: `const LazyComponent = React.lazy(() => import('./LazyComponent'));
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}`,
      difficulty: 'expert'
    },
    {
      id: 166,
      text: "ما هو الـ Redux Saga ومتى نستخدمه؟",
      options: [
        "مكتبة لإدارة التأثيرات الجانبية في Redux",
        "نوع من المكونات",
        "أداة بناء",
        "مكتبة للتوجيه"
      ],
      correctAnswer: 0,
      explanation: "Redux Saga هي مكتبة لإدارة التأثيرات الجانبية في تطبيقات Redux باستخدام Generators.",
      difficulty: 'expert'
    },
    {
      id: 167,
      text: "كيف تنفذ الـ memoization يدوياً؟",
      options: [
        "باستخدام cache لتخزين النتائج المحسوبة مسبقاً",
        "باستخدام قاعدة بيانات",
        "باستخدام localStorage",
        "باستخدام cookies"
      ],
      correctAnswer: 0,
      explanation: "Memoization تقنية تخزن نتائج الدوال المكلفة لتجنب إعادة الحساب.",
      codeSnippet: `function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}`,
      difficulty: 'expert'
    },
    {
      id: 168,
      text: "ما هو الـ Tree Shaking في JavaScript؟",
      options: [
        "إزالة الكود غير المستخدم أثناء البناء",
        "تقليم أشجار DOM",
        "تحسين الذاكرة",
        "ضغط الملفات"
      ],
      correctAnswer: 0,
      explanation: "Tree Shaking هي تقنية لإزالة الكود غير المستخدم من الحزمة النهائية.",
      difficulty: 'expert'
    },
    {
      id: 169,
      text: "كيف تنفذ الـ dependency injection في JavaScript؟",
      options: [
        "بتمرير التبعيات كمعاملات للدوال أو المنشئات",
        "باستخدام المتغيرات العالمية",
        "باستخدام localStorage",
        "باستخدام الوراثة"
      ],
      correctAnswer: 0,
      explanation: "Dependency Injection تمكن من تمرير التبعيات بدلاً من إنشائها داخلياً.",
      codeSnippet: `class UserService {
  constructor(database, logger) {
    this.database = database;
    this.logger = logger;
  }
}`,
      difficulty: 'expert'
    },
    {
      id: 170,
      text: "ما هو الـ Event Sourcing pattern؟",
      options: [
        "نمط تخزين يخزن الأحداث بدلاً من الحالة الحالية",
        "نمط لتسجيل الأخطاء",
        "نمط للتصميم المرئي",
        "نمط للشبكات"
      ],
      correctAnswer: 0,
      explanation: "Event Sourcing يخزن سلسلة الأحداث بدلاً من الحالة الحالية للنظام.",
      difficulty: 'expert'
    },
    {
      id: 171,
      text: "كيف تنفذ الـ Circuit Breaker pattern؟",
      options: [
        "بإيقاف الطلبات عند فشل الخدمة المتكرر",
        "بإغلاق المتصفح",
        "بإيقاف الخادم",
        "بحذف قاعدة البيانات"
      ],
      correctAnswer: 0,
      explanation: "Circuit Breaker يمنع الطلبات للخدمة الفاشلة حتى تتعافى.",
      codeSnippet: `class CircuitBreaker {
  constructor(failureThreshold, timeout) {
    this.failureThreshold = failureThreshold;
    this.timeout = timeout;
    this.failures = 0;
    this.state = 'CLOSED';
  }
}`,
      difficulty: 'expert'
    },
    {
      id: 172,
      text: "ما هو الـ CQRS pattern؟",
      options: [
        "فصل عمليات القراءة عن عمليات الكتابة",
        "دمج القراءة والكتابة",
        "نمط للاستعلامات فقط",
        "نمط للكتابة فقط"
      ],
      correctAnswer: 0,
      explanation: "CQRS يفصل عمليات القراءة (Queries) عن عمليات الكتابة (Commands) في النظام.",
      difficulty: 'expert'
    },
    {
      id: 173,
      text: "كيف تنفذ الـ retry logic للطلبات الفاشلة؟",
      options: [
        "بإعادة المحاولة بعد فترات زمنية متزايدة",
        "بالمحاولة مرة واحدة فقط",
        "بإيقاف التطبيق",
        "بحذف الطلب"
      ],
      correctAnswer: 0,
      explanation: "Retry logic يعيد محاولة الطلبات الفاشلة مع زيادة الفترات الزمنية بين المحاولات.",
      codeSnippet: `async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
}`,
      difficulty: 'expert'
    },
    {
      id: 174,
      text: "ما هو الـ WebAssembly ومتى نستخدمه؟",
      options: [
        "تنسيق تعليمات ثنائي لأداء عالي في المتصفح",
        "لغة برمجة جديدة",
        "مكتبة JavaScript",
        "أداة بناء"
      ],
      correctAnswer: 0,
      explanation: "WebAssembly تنسيق تعليمات ثنائي يمكنه تشغيل كود عالي الأداء في المتصفح.",
      difficulty: 'expert'
    },
    {
      id: 175,
      text: "كيف تنفذ الـ real-time collaboration مثل Google Docs؟",
      options: [
        "باستخدام Operational Transform أو CRDT",
        "باستخدام قاعدة بيانات تقليدية",
        "باستخدام الملفات المحلية",
        "باستخدام البريد الإلكتروني"
      ],
      correctAnswer: 0,
      explanation: "الأنظمة التعاونية في الوقت الحقيقي تستخدم خوارزميات مثل Operational Transform لإدارة التغييرات المتزامنة.",
      difficulty: 'expert'
    },
    {
      id: 176,
      text: "ما هو الـ Server-Sent Events (SSE)؟",
      options: [
        "تقنية لدفع البيانات من الخادم للعميل عبر HTTP",
        "تقنية لطلب البيانات من العميل",
        "نوع من قواعد البيانات",
        "بروتوكول تشفير"
      ],
      correctAnswer: 0,
      explanation: "SSE تمكن الخادم من إرسال تحديثات تلقائية للعميل عبر اتصال HTTP مستمر.",
      difficulty: 'expert'
    },
    {
      id: 177,
      text: "كيف تنفذ الـ rate limiting في Node.js؟",
      options: [
        "باستخدام middleware مثل express-rate-limit",
        "بإيقاف الخادم",
        "بحذف الطلبات",
        "باستخدام قاعدة البيانات فقط"
      ],
      correctAnswer: 0,
      explanation: "Rate limiting يحدد عدد الطلبات المسموح بها من عميل معين في فترة زمنية.",
      codeSnippet: `const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});`,
      difficulty: 'expert'
    },
    {
      id: 178,
      text: "ما هو الـ IndexedDB ومتى نستخدمه؟",
      options: [
        "قاعدة بيانات NoSQL على جانب العميل للتخزين الكبير",
        "قاعدة بيانات على الخادم",
        "نظام ملفات",
        "ذاكرة مؤقتة"
      ],
      correctAnswer: 0,
      explanation: "IndexedDB هي قاعدة بيانات NoSQL على جانب العميل مناسبة لتخزين كميات كبيرة من البيانات المنظمة.",
      difficulty: 'expert'
    },
    {
      id: 179,
      text: "كيف تنفذ الـ background sync في Progressive Web Apps؟",
      options: [
        "باستخدام Service Worker و Background Sync API",
        "باستخدام setTimeout",
        "باستخدام Web Workers",
        "باستخدام localStorage"
      ],
      correctAnswer: 0,
      explanation: "Background Sync تمكن من مزامنة البيانات عندما يتوفر اتصال الشبكة مرة أخرى.",
      difficulty: 'expert'
    },
    {
      id: 180,
      text: "ما هو الـ JWT (JSON Web Token)؟",
      options: [
        "معيار مفتوح لإنشاء tokens للتفويض",
        "نوع من قواعد البيانات",
        "مكتبة للتشفير",
        "بروتوكول اتصال"
      ],
      correctAnswer: 0,
      explanation: "JWT هو معيار مفتوح لإنشاء tokens يمكن استخدامها للتفويض وتبادل المعلومات.",
      difficulty: 'expert'
    },
    {
      id: 181,
      text: "كيف تنفذ الـ two-factor authentication (2FA)؟",
      options: [
        "بدمج كلمة المرور مع رمز مؤقت من تطبيق أو SMS",
        "باستخدام كلمة مرور فقط",
        "باستخدام البريد الإلكتروني فقط",
        "باستخدام اسم المستخدم فقط"
      ],
      correctAnswer: 0,
      explanation: "2FA تضيف طبقة أمان إضافية بتطلب عاملين للتحقق: شيء تعرفه (كلمة المرور) وشيء تمتلكه (الهاتف).",
      difficulty: 'expert'
    },
    {
      id: 182,
      text: "ما هو الـ OWASP Top 10؟",
      options: [
        "قائمة بأهم 10 ثغرات أمنية في تطبيقات الويب",
        "قائمة بأفضل 10 مكتبات",
        "قائمة بأفضل 10 أطر عمل",
        "قائمة بأفضل 10 لغات برمجة"
      ],
      correctAnswer: 0,
      explanation: "OWASP Top 10 هي قائمة معيارية لأهم المخاطر الأمنية في تطبيقات الويب.",
      difficulty: 'expert'
    },
    {
      id: 183,
      text: "كيف تمنع هجمات XSS (Cross-Site Scripting)؟",
      options: [
        "بتهريب وترميز البيانات المعروضة للمستخدم",
        "باستخدام HTTPS فقط",
        "بحذف JavaScript",
        "باستخدام cookies فقط"
      ],
      correctAnswer: 0,
      explanation: "لمنع XSS، يجب تهريب وترميز جميع البيانات المعروضة للمستخدم لتجنب تنفيذ scripts ضارة.",
      difficulty: 'expert'
    },
    {
      id: 184,
      text: "ما هو الـ CSRF (Cross-Site Request Forgery) وكيف تمنعه؟",
      options: [
        "هجوم يجبر المستخدم على تنفيذ requests غير مرغوب فيها، نمنعه بـ CSRF tokens",
        "هجوم لسرقة البيانات، نمنعه بـ HTTPS",
        "هجوم للتجسس، نمنعه بـ VPN",
        "هجوم للاختراق، نمنعه بكلمات مرور قوية"
      ],
      correctAnswer: 0,
      explanation: "CSRF tokens تضمن أن الطلبات تأتي من التطبيق الشرعي وليس من موقع ضار.",
      difficulty: 'expert'
    },
    {
      id: 185,
      text: "كيف تنفذ الـ end-to-end encryption؟",
      options: [
        "بالتشفير حيث只有 المرسل والمستقبل يمكنهم فك التشفير",
        "باستخدام HTTPS فقط",
        "باستخدام كلمات مرور قوية",
        "باستخدام VPN"
      ],
      correctAnswer: 0,
      explanation: "End-to-end encryption يضمن أن البيانات مشفرة أثناء النقل ولا يمكن فك تشفيرها إلا من قبل الطرفين المعنيين.",
      difficulty: 'expert'
    },
    {
      id: 186,
      text: "ما هو الـ Docker Compose؟",
      options: [
        "أداة لتعريف وتشغيل تطبيقات Docker متعددة الحاويات",
        "مكتبة لتركيب المكونات",
        "أداة للبناء",
        "محرر نصوص"
      ],
      correctAnswer: 0,
      explanation: "Docker Compose يسمح بتعريف وتشغيل تطبيقات متعددة الحاويات باستخدام ملف YAML.",
      difficulty: 'expert'
    },
    {
      id: 187,
      text: "كيف تنفذ الـ blue-green deployment؟",
      options: [
        "بإبقاء نسختين من التطبيق والتبديل بينهما",
        "بنشر نسخة واحدة فقط",
        "بحذف النسخة القديمة أولاً",
        "باستخدام خادم واحد"
      ],
      correctAnswer: 0,
      explanation: "Blue-green deployment تحافظ على نسختين من التطبيق (blue و green) للتبديل الفوري مع إمكانية التراجع.",
      difficulty: 'expert'
    },
    {
      id: 188,
      text: "ما هو الـ Kubernetes؟",
      options: [
        "نظام أوركسترا للحاويات لأتمتة النشر والقياس",
        "لغة برمجة",
        "قاعدة بيانات",
        "مكتبة JavaScript"
      ],
      correctAnswer: 0,
      explanation: "Kubernetes هو نظام مفتوح المصدر لأتمتة نشر وقياس وإدارة تطبيقات الحاويات.",
      difficulty: 'expert'
    },
    {
      id: 189,
      text: "كيف تنفذ الـ canary deployment؟",
      options: [
        "بنشر التغييرات تدريجياً لنسبة صغيرة من المستخدمين أولاً",
        "بنشر التغييرات لجميع المستخدمين مرة واحدة",
        "بعدم النشر أبداً",
        "باستخدام خوادم متعددة فقط"
      ],
      correctAnswer: 0,
      explanation: "Canary deployment تنشر التغييرات لنسبة صغيرة من المستخدمين أولاً للكشف عن المشاكل قبل النشر الكامل.",
      difficulty: 'expert'
    },
    {
      id: 190,
      text: "ما هو الـ Istio Service Mesh؟",
      options: [
        "طبقة للتحكم في اتصالات الخدمات في Kubernetes",
        "نوع من قواعد البيانات",
        "مكتبة للواجهة الأمامية",
        "أداة بناء"
      ],
      correctAnswer: 0,
      explanation: "Istio يوفر خدمة mesh لإدارة اتصالات الخدمات، الأمان، المراقبة، في بيئات microservices.",
      difficulty: 'expert'
    },
    {
      id: 191,
      text: "كيف تنفذ الـ distributed tracing؟",
      options: [
        "باستخدام أدوات مثل Jaeger أو Zipkin",
        "باستخدام console.log فقط",
        "باستخدام قاعدة البيانات",
        "باستخدام cookies"
      ],
      correctAnswer: 0,
      explanation: "Distributed tracing يتتبع الطلبات عبر خدمات متعددة في أنظمة موزعة.",
      difficulty: 'expert'
    },
    {
      id: 192,
      text: "ما هو الـ gRPC ومتى نستخدمه؟",
      options: [
        "إطار عمل RPC عالي الأداء يستخدم Protocol Buffers",
        "مكتبة للواجهة الأمامية",
        "نوع من قواعد البيانات",
        "أداة بناء"
      ],
      correctAnswer: 0,
      explanation: "gRPC هو إطار عمل RPC حديث وعالي الأداء يستخدم Protocol Buffers للاتصال بين الخدمات.",
      difficulty: 'expert'
    },
    {
      id: 193,
      text: "كيف تنفذ الـ circuit breaker في microservices؟",
      options: [
        "باستخدام مكتبات مثل Hystrix أو resilience4j",
        "بإيقاف جميع الخدمات",
        "بحذف الخدمات الفاشلة",
        "باستخدام قاعدة بيانات واحدة"
      ],
      correctAnswer: 0,
      explanation: "Circuit breaker يحمي النظام من الفشل المتسلسل بإيقاف الطلبات للخدمات الفاشلة.",
      difficulty: 'expert'
    },
    {
      id: 194,
      text: "ما هو الـ API Gateway pattern؟",
      options: [
        "نقطة دخول واحدة لجميع طلبات API",
        "نوع من قواعد البيانات",
        "مكتبة للعميل",
        "بروتوكول اتصال"
      ],
      correctAnswer: 0,
      explanation: "API Gateway يوفر نقطة دخول واحدة تدير الطلبات وتوجهها للخدمات المناسبة.",
      difficulty: 'expert'
    },
    {
      id: 195,
      text: "كيف تنفذ الـ service discovery في microservices؟",
      options: [
        "باستخدام أدوات مثل Consul أو Eureka",
        "باستخدام عناوين IP ثابتة",
        "باستخدام DNS فقط",
        "باستخدام قاعدة بيانات مركزية"
      ],
      correctAnswer: 0,
      explanation: "Service discovery تمكن الخدمات من العثور على بعضها البعض ديناميكياً في بيئات موزعة.",
      difficulty: 'expert'
    },
    {
      id: 196,
      text: "ما هو الـ event-driven architecture؟",
      options: [
        "هندسة تعتمد على إنتاج واستهلاك الأحداث",
        "هندسة تعتمد على الطلبات المباشرة فقط",
        "هندسة للواجهات الأمامية فقط",
        "هندسة قديمة"
      ],
      correctAnswer: 0,
      explanation: "Event-driven architecture تستخدم الأحداث للاتصال بين المكونات المتفككة.",
      difficulty: 'expert'
    },
    {
      id: 197,
      text: "كيف تنفذ الـ CQRS مع event sourcing؟",
      options: [
        "بفصل القراءة/الكتابة وتخزين الأحداث",
        "بدمج كل شيء في قاعدة بيانات واحدة",
        "باستخدام cache فقط",
        "باستخدام ملفات نصية"
      ],
      correctAnswer: 0,
      explanation: "CQRS مع event sourcing يفصل عمليات القراءة والكتابة ويخزن الأحداث بدلاً من الحالة الحالية.",
      difficulty: 'expert'
    },
    {
      id: 198,
      text: "ما هو الـ domain-driven design (DDD)؟",
      options: [
        "منهجية تصميم تركز على نموذج المجال",
        "منهجية للواجهات فقط",
        "منهجية للقواعد البيانات فقط",
        "منهجية قديمة"
      ],
      correctAnswer: 0,
      explanation: "DDD منهجية تصميم برمجي تركز على نموذج المجال وتعقيداته.",
      difficulty: 'expert'
    },
    {
      id: 199,
      text: "كيف تنفذ الـ hexagonal architecture؟",
      options: [
        "بعزل المجال الأساسي عن التبعيات الخارجية",
        "باستخدام ستة طبقات ثابتة",
        "باستخدام قاعدة بيانات واحدة",
        "باستخدام واجهة واحدة"
      ],
      correctAnswer: 0,
      explanation: "Hexagonal architecture تعزل منطق المجال الأساسي عن التبعيات الخارجية مثل قواعد البيانات والواجهات.",
      difficulty: 'expert'
    },
    {
      id: 200,
      text: "ما هو الـ clean architecture؟",
      options: [
        "هندسة تفصل الاهتمامات مع المجال في المركز",
        "هندسة تستخدم طبقة واحدة فقط",
        "هندسة للواجهات الأمامية فقط",
        "هندسة قديمة"
      ],
      correctAnswer: 0,
      explanation: "Clean architecture تفصل الاهتمامات مع وضع قواعد المجال في المركز، مستقلة عن التبعيات الخارجية.",
      difficulty: 'expert'
    }
  ];
}

  private getSeniorQuestions(): Question[] {
  return [
    {
      id: 201,
      text: "كيف تصمم نظام معالجة مدفوعات قابل للتوسع؟",
      options: [
        "تستخدم microservices مع معالجة غير متزامنة",
        "تستخدم خدمة واحدة كبيرة",
        "تستخدم قاعدة بيانات واحدة",
        "تستخدم الذاكرة المؤقتة فقط"
      ],
      correctAnswer: 0,
      explanation: "أنظمة المدفوعات القابلة للتوسع تستخدم هندسة microservices مع معالجة غير متزامنة للطلبات.",
      difficulty: 'senior'
    },
    {
      id: 202,
      text: "كيف تنشئ خوارزمية feed لشبكة اجتماعية؟",
      options: [
        "تجمع بين الترتيب الزمني والذكاء الاصطناعي",
        "تستخدم الترتيب الزمني فقط",
        "تستخدم الترتيب العشوائي",
        "تستخدم الترتيب الأبجدي"
      ],
      correctAnswer: 0,
      explanation: "خوارزميات feed تجمع بين الترتيب الزمني وخوارزميات التوصية الذكية.",
      difficulty: 'senior'
    },
    {
      id: 203,
      text: "كيف تصمم نظام توصيات للتجارة الإلكترونية؟",
      options: [
        "تستخدم collaborative filtering و content-based filtering",
        "تستخدم قاعدة بيانات فقط",
        "تستخدم الإحصائيات البسيطة",
        "تستخدم الرأي الشخصي"
      ],
      correctAnswer: 0,
      explanation: "أنظمة التوصية تستخدم أساليب مثل collaborative filtering و content-based filtering.",
      difficulty: 'senior'
    },
    {
      id: 204,
      text: "كيف تخطط نظام تعاون في الوقت الحقيقي؟",
      options: [
        "تستخدم Operational Transform أو CRDT",
        "تستخدم قاعدة بيانات تقليدية",
        "تستخدم الملفات المحلية",
        "تستخدم البريد الإلكتروني"
      ],
      correctAnswer: 0,
      explanation: "الأنظمة التعاونية في الوقت الحقيقي تستخدم خوارزميات مثل Operational Transform لإدارة التغييرات المتزامنة.",
      difficulty: 'senior'
    },
    {
      id: 205,
      text: "كيف تصمم نظام تحليل بيانات كبير (Big Data)؟",
      options: [
        "تستخدم Hadoop/Spark مع معالجة موزعة",
        "تستخدم قاعدة بيانات علائقية تقليدية",
        "تستخدم Excel فقط",
        "تستخدم الذاكرة المحلية"
      ],
      correctAnswer: 0,
      explanation: "أنظمة Big Data تستخدم إطارات مثل Hadoop و Spark للمعالجة الموزعة للبيانات الكبيرة.",
      difficulty: 'senior'
    },
    {
      id: 206,
      text: "كيف تنشئ نظام مراقبة (Monitoring) للتطبيقات الموزعة؟",
      options: [
        "تستخدم Prometheus/Grafana مع distributed tracing",
        "تستخدم console.log فقط",
        "تستخدم الإشعارات البريدية",
        "تستخدم السجلات المحلية"
      ],
      correctAnswer: 0,
      explanation: "أنظمة المراقبة للتطبيقات الموزعة تستخدم أدوات مثل Prometheus و Grafana مع distributed tracing.",
      difficulty: 'senior'
    },
    {
      id: 207,
      text: "كيف تصمم نظام تخزين ملفات موزع؟",
      options: [
        "تستخدم نظام مثل HDFS أو S3 مع replication",
        "تستخدم القرص الصلب المحلي",
        "تستخدم قاعدة البيانات",
        "تستخدم الذاكرة المؤقتة"
      ],
      correctAnswer: 0,
      explanation: "أنظمة تخزين الملفات الموزعة تستخدم أنظمة مثل HDFS أو Amazon S3 مع آلية replication للبيانات.",
      difficulty: 'senior'
    },
    {
      id: 208,
      text: "كيف تنشئ نظام تراسل (Messaging) عالي الأداء؟",
      options: [
        "تستخدم Kafka أو RabbitMQ مع clustering",
        "تستخدم HTTP requests مباشرة",
        "تستخدم البريد الإلكتروني",
        "تستخدم قواعد البيانات"
      ],
      correctAnswer: 0,
      explanation: "أنظمة التراسل عالية الأداء تستخدم بروكرات مثل Kafka أو RabbitMQ مع تكوين clusters.",
      difficulty: 'senior'
    },
    {
      id: 209,
      text: "كيف تصمم نظام بحث (Search) قابل للتوسع؟",
      options: [
        "تستخدم Elasticsearch مع sharding و replication",
        "تستخدم LIKE في SQL",
        "تستخدم البحث النصي البسيط",
        "تستخدم الذاكرة المؤقتة"
      ],
      correctAnswer: 0,
      explanation: "أنظمة البحث القابلة للتوسع تستخدم محركات مثل Elasticsearch مع sharding و replication.",
      difficulty: 'senior'
    },
    {
      id: 210,
      text: "كيف تنشئ نظام تحليلات في الوقت الحقيقي؟",
      options: [
        "تستخدم stream processing مع Apache Flink أو Spark Streaming",
        "تستخدم queries دورية على قاعدة البيانات",
        "تستخدم الإحصائيات البسيطة",
        "تستخدم التقارير اليدوية"
      ],
      correctAnswer: 0,
      explanation: "أنظمة التحليلات في الوقت الحقيقي تستخدم stream processing مع إطارات مثل Apache Flink.",
      difficulty: 'senior'
    },
    {
      id: 211,
      text: "كيف تصمم نظام إشعارات (Notifications) موزع؟",
      options: [
        "تستخدم message queue مع multiple channels",
        "تستخدم البريد الإلكتروني فقط",
        "تستخدم قاعدة بيانات مباشرة",
        "تستخدم HTTP calls مباشرة"
      ],
      correctAnswer: 0,
      explanation: "أنظمة الإشعارات الموزعة تستخدم message queues مع دعم multiple channels مثل email, push, SMS.",
      difficulty: 'senior'
    },
    {
      id: 212,
      text: "كيف تنشئ نظام تحويل فيديو موزع؟",
      options: [
        "تستخدم job queue مع worker nodes متعددة",
        "تستخدم معالجة محلية فقط",
        "تستخدم خدمات خارجية فقط",
        "تستخدم الذاكرة المؤقتة"
      ],
      correctAnswer: 0,
      explanation: "أنظمة تحويل الفيديو الموزعة تستخدم job queues مع worker nodes متعددة للمعالجة المتوازية.",
      difficulty: 'senior'
    },
    {
      id: 213,
      text: "كيف تصمم نظام إدارة محتوى (CMS) قابل للتوسع؟",
      options: [
        "تستخدم microservices مع CDN و caching",
        "تستخدم نظام monolithic",
        "تستخدم قاعدة بيانات واحدة",
        "تستخدم الملفات الثابتة"
      ],
      correctAnswer: 0,
      explanation: "أنظمة CMS القابلة للتوسع تستخدم هندسة microservices مع CDN و caching layers.",
      difficulty: 'senior'
    },
    {
      id: 214,
      text: "كيف تنشئ نظام تداول (Trading) عالي التردد؟",
      options: [
        "تستخدم low-latency systems مع direct market access",
        "تستخدم تطبيقات ويب عادية",
        "تستخدم قواعد البيانات التقليدية",
        "تستخدم APIs بطيئة"
      ],
      correctAnswer: 0,
      explanation: "أنظمة التداول عالي التردد تتطلب low-latency systems مع direct market access.",
      difficulty: 'senior'
    },
    {
      id: 215,
      text: "كيف تصمم نظام رحلات (Ride-sharing) مثل Uber؟",
      options: [
        "تستخدم real-time matching مع geospatial indexing",
        "تستخدم قوائم ثابتة",
        "تستخدم البحث اليدوي",
        "تستخدم الخرائط البسيطة"
      ],
      correctAnswer: 0,
      explanation: "أنظمة ride-sharing تستخدم real-time matching algorithms مع geospatial indexing.",
      difficulty: 'senior'
    },
    {
      id: 216,
      text: "كيف تنشئ نظام حجوزات (Booking) قابل للتوسع؟",
      options: [
        "تستخدم database sharding مع optimistic locking",
        "تستخدم قاعدة بيانات واحدة",
        "تستخدم pessimistic locking",
        "تستخدم الملفات النصية"
      ],
      correctAnswer: 0,
      explanation: "أنظمة الحجوزات القابلة للتوسع تستخدم database sharding مع optimistic locking لمنع conflicts.",
      difficulty: 'senior'
    },
    {
      id: 217,
      text: "كيف تصمم نظام أمن متعدد الطبقات؟",
      options: [
        "تستخدم defense in depth مع multiple security layers",
        "تستخدم جدار حماية فقط",
        "تستخدم كلمات مرور بسيطة",
        "تستخدم تشفير أساسي"
      ],
      correctAnswer: 0,
      explanation: "النظام الأمني المتعدد الطبقات يستخدم defense in depth مع multiple security layers.",
      difficulty: 'senior'
    },
    {
      id: 218,
      text: "كيف تنشئ نظام تحليلات سلوك المستخدم؟",
      options: [
        "تستخدم event streaming مع behavioral analytics platforms",
        "تستخدم سجلات الخادم فقط",
        "تستخدم استبيانات",
        "تستخدم التخمين"
      ],
      correctAnswer: 0,
      explanation: "أنظمة تحليلات سلوك المستخدم تستخدم event streaming مع منصات متخصصة مثل Mixpanel.",
      difficulty: 'senior'
    },
    {
      id: 219,
      text: "كيف تصمم نظام توصية فيديو مثل YouTube؟",
      options: [
        "تستخدم deep learning models مع collaborative filtering",
        "تستخدم الإحصائيات البسيطة",
        "تستخدم الترتيب العشوائي",
        "تستخدم أكثر الفيديوهات مشاهدة"
      ],
      correctAnswer: 0,
      explanation: "أنظمة توصية الفيديو تستخدم deep learning models مع collaborative filtering.",
      difficulty: 'senior'
    },
    {
      id: 220,
      text: "كيف تنشئ نظام ترجمة آلي موزع؟",
      options: [
        "تستخدم neural machine translation مع distributed inference",
        "تستخدم القواميس فقط",
        "تستخدم الترجمة الكلمة بالكلمة",
        "تستخدم خدمات خارجية فقط"
      ],
      correctAnswer: 0,
      explanation: "أنظمة الترجمة الآلية الموزعة تستخدم neural machine translation مع distributed inference.",
      difficulty: 'senior'
    },
    {
      id: 221,
      text: "كيف تصمم نظام اكتشاف احتيال (Fraud Detection)؟",
      options: [
        "تستخدم machine learning مع real-time pattern recognition",
        "تستخدم القواعد الثابتة فقط",
        "تستخدم الفحص اليدوي",
        "تستخدم الإحصائيات البسيطة"
      ],
      correctAnswer: 0,
      explanation: "أنظمة اكتشاف الاحتيال تستخدم machine learning مع real-time pattern recognition.",
      difficulty: 'senior'
    },
    {
      id: 222,
      text: "كيف تنشئ نظام تحويل عملات رقمي؟",
      options: [
        "تستخدم blockchain مع smart contracts",
        "تستخدم قواعد البيانات التقليدية",
        "تستخدم الملفات المحلية",
        "تخدم التحويل اليدوي"
      ],
      correctAnswer: 0,
      explanation: "أنظمة تحويل العملات الرقمية تستخدم blockchain technology مع smart contracts.",
      difficulty: 'senior'
    },
    {
      id: 223,
      text: "كيف تصمم نظام إدارة علاقات عملاء (CRM) متقدم؟",
      options: [
        "تستخدم microservices مع AI-powered insights",
        "تستخدم قاعدة بيانات واحدة",
        "تستخدم الجداول البسيطة",
        "تستخدم الإدخال اليدوي"
      ],
      correctAnswer: 0,
      explanation: "أنظمة CRM المتقدمة تستخدم هندسة microservices مع AI-powered insights.",
      difficulty: 'senior'
    },
    {
      id: 224,
      text: "كيف تنشئ نظام محاكاة (Simulation) معقد؟",
      options: [
        "تستخدم distributed computing مع parallel processing",
        "تستخدم معالجة تسلسلية",
        "تستخدم الحسابات البسيطة",
        "تستخدم التقديرات"
      ],
      correctAnswer: 0,
      explanation: "أنظمة المحاكاة المعقدة تستخدم distributed computing مع parallel processing.",
      difficulty: 'senior'
    },
    {
      id: 225,
      text: "كيف تصمم نظام توصية منتجات متقدم؟",
      options: [
        "تستخدم hybrid recommender systems",
        "تستخدم القوائم الثابتة",
        "تستخدم الترتيب العشوائي",
        "تستخدم أكثر المنتجات مبيعاً"
      ],
      correctAnswer: 0,
      explanation: "أنظمة التوصية المتقدمة تستخدم hybrid recommender systems تجمع بين multiple approaches.",
      difficulty: 'senior'
    },
    {
      id: 226,
      text: "كيف تنشئ نظام تحليل مشاعر (Sentiment Analysis)؟",
      options: [
        "تستخدم NLP models مع deep learning",
        "تستخدم القواميس فقط",
        "تستخدم البحث عن الكلمات",
        "تستخدم التخمين"
      ],
      correctAnswer: 0,
      explanation: "أنظمة تحليل المشاعر تستخدم NLP models مع deep learning techniques.",
      difficulty: 'senior'
    },
    {
      id: 227,
      text: "كيف تصمم نظام إدارة سلسلة توريد (Supply Chain)؟",
      options: [
        "تستخدم blockchain مع IoT integration",
        "تستخدم الجداول البسيطة",
        "تستخدم البريد الإلكتروني",
        "تستخدم المكالمات الهاتفية"
      ],
      correctAnswer: 0,
      explanation: "أنظمة إدارة سلسلة التوريد المتقدمة تستخدم blockchain مع IoT integration.",
      difficulty: 'senior'
    },
    {
      id: 228,
      text: "كيف تنشئ نظام تعرف على الصور (Image Recognition)؟",
      options: [
        "تستخدم convolutional neural networks",
        "تستخدم مقارنة البكسلات",
        "تستخدم القوائم الثابتة",
        "تستخدم الوصف النصي"
      ],
      correctAnswer: 0,
      explanation: "أنظمة التعرف على الصور تستخدم convolutional neural networks (CNNs).",
      difficulty: 'senior'
    },
    {
      id: 229,
      text: "كيف تصمم نظام تحليل شبكات اجتماعية؟",
      options: [
        "تستخدم graph algorithms مع network analysis",
        "تستخدم القوائم البسيطة",
        "تستخدم الإحصائيات الأساسية",
        "تستخدم التخمين"
      ],
      correctAnswer: 0,
      explanation: "أنظمة تحليل الشبكات الاجتماعية تستخدم graph algorithms مع network analysis.",
      difficulty: 'senior'
    },
    {
      id: 230,
      text: "كيف تنشئ نظام محادثة ذكي (Chatbot)؟",
      options: [
        "تستخدم NLP مع conversational AI",
        "تستخدم القوائم الثابتة",
        "تستخدم البحث النصي",
        "تستخدم الردود العشوائية"
      ],
      correctAnswer: 0,
      explanation: "أنظمة المحادثة الذكية تستخدم NLP مع conversational AI platforms.",
      difficulty: 'senior'
    },
    {
      id: 231,
      text: "كيف تصمم نظام توقعات طقس دقيق؟",
      options: [
        "تستخدم numerical weather prediction models",
        "تستخدم التوقعات التقليدية",
        "تستخدم مراقبة بسيطة",
        "تستخدم التخمين"
      ],
      correctAnswer: 0,
      explanation: "أنظمة توقعات الطقس الدقيقة تستخدم numerical weather prediction models.",
      difficulty: 'senior'
    },
    {
      id: 232,
      text: "كيف تنشئ نظام توصية موسيقى مثل Spotify؟",
      options: [
        "تستخدم audio analysis مع collaborative filtering",
        "تستخدم القوائم الشعبية",
        "تستخدم الترتيب العشوائي",
        "تستخدم أكثر الأغاني تشغيلاً"
      ],
      correctAnswer: 0,
      explanation: "أنظمة توصية الموسيقى تستخدم audio analysis مع collaborative filtering.",
      difficulty: 'senior'
    },
    {
      id: 233,
      text: "كيف تصمم نظام رعاية صحية إلكتروني؟",
      options: [
        "تستخدم HIPAA compliant systems مع secure data exchange",
        "تستخدم قواعد بيانات عادية",
        "تستخدم الملفات النصية",
        "تخدم البريد الإلكتروني"
      ],
      correctAnswer: 0,
      explanation: "أنظمة الرعاية الصحية الإلكترونية تتطلب HIPAA compliant systems مع secure data exchange.",
      difficulty: 'senior'
    },
    {
      id: 234,
      text: "كيف تنشئ نظام تحليل سوق مالي؟",
      options: [
        "تستخدم quantitative analysis مع machine learning",
        "تستخدم الرسوم البيانية البسيطة",
        "تستخدم التوقعات التقليدية",
        "تستخدم التخمين"
      ],
      correctAnswer: 0,
      explanation: "أنظمة تحليل السوق المالي تستخدم quantitative analysis مع machine learning.",
      difficulty: 'senior'
    },
    {
      id: 235,
      text: "كيف تصمم نظام إدارة مشاريع معقد؟",
      options: [
        "تستخدم critical path method مع resource optimization",
        "تستخدم القوائم البسيطة",
        "تستخدم الجداول التقليدية",
        "تستخدم التقديرات اليدوية"
      ],
      correctAnswer: 0,
      explanation: "أنظمة إدارة المشاريع المعقدة تستخدم critical path method مع resource optimization.",
      difficulty: 'senior'
    },
    {
      id: 236,
      text: "كيف تنشئ نظام تحويل نصوص للكلام (Text-to-Speech)؟",
      options: [
        "تستخدم neural voice synthesis",
        "تستخدم التسجيلات المسجلة",
        "تستخدم الصوت الرقمي الأساسي",
        "تخدم المحولات البسيطة"
      ],
      correctAnswer: 0,
      explanation: "أنظمة تحويل النصوص للكلام المتقدمة تستخدم neural voice synthesis.",
      difficulty: 'senior'
    },
    {
      id: 237,
      text: "كيف تصمم نظام توصية كتب متقدم؟",
      options: [
        "تستخدم content-based filtering مع user profiling",
        "تستخدم القوائم الأكثر مبيعاً",
        "تستخدم الترتيب العشوائي",
        "تستخدم التصنيفات الأساسية"
      ],
      correctAnswer: 0,
      explanation: "أنظمة توصية الكتب المتقدمة تستخدم content-based filtering مع user profiling.",
      difficulty: 'senior'
    },
    {
      id: 238,
      text: "كيف تنشئ نظام تحليل أداء تطبيقات؟",
      options: [
        "تستخدم APM tools مع distributed tracing",
        "تستخدم console.log فقط",
        "تستخدم التقارير اليدوية",
        "تستخدم المراقبة البسيطة"
      ],
      correctAnswer: 0,
      explanation: "أنظمة تحليل أداء التطبيقات تستخدم APM tools مع distributed tracing.",
      difficulty: 'senior'
    },
    {
      id: 239,
      text: "كيف تصمم نظام إدارة هوية موزع؟",
      options: [
        "تستخدم OAuth 2.0 مع distributed sessions",
        "تستخدم كلمات المرور البسيطة",
        "تستخدم الجلسات المحلية",
        "تستخدم المصادقة الأساسية"
      ],
      correctAnswer: 0,
      explanation: "أنظمة إدارة الهوية الموزعة تستخدم OAuth 2.0 مع distributed sessions.",
      difficulty: 'senior'
    },
    {
      id: 240,
      text: "كيف تنشئ نظام تحليل بيانات وسائل التواصل؟",
      options: [
        "تستخدم social media APIs مع big data processing",
        "تستخدم البحث اليدوي",
        "تستخدم الإحصائيات البسيطة",
        "تخدم التجميع الأساسي"
      ],
      correctAnswer: 0,
      explanation: "أنظمة تحليل بيانات وسائل التواصل تستخدم social media APIs مع big data processing.",
      difficulty: 'senior'
    },
    {
      id: 241,
      text: "كيف تصمم نظام توصية طعام ذكي؟",
      options: [
        "تستخدم nutritional analysis مع preference learning",
        "تستخدم القوائم الثابتة",
        "تستخدم الأطباق الشعبية",
        "تستخدم التصنيفات الأساسية"
      ],
      correctAnswer: 0,
      explanation: "أنظمة توصية الطعام الذكية تستخدم nutritional analysis مع preference learning.",
      difficulty: 'senior'
    },
    {
      id: 242,
      text: "كيف تنشئ نظام تحليل مخاطر ائتمانية؟",
      options: [
        "تستخدم risk scoring models مع machine learning",
        "تستخدم القواعد الثابتة",
        "تستخدم الفحص اليدوي",
        "تستخدم الإحصائيات البسيطة"
      ],
      correctAnswer: 0,
      explanation: "أنظمة تحليل المخاطر الائتمانية تستخدم risk scoring models مع machine learning.",
      difficulty: 'senior'
    },
    {
      id: 243,
      text: "كيف تصمم نظام إدارة علاقات موزع؟",
      options: [
        "تستخدم graph database مع relationship mapping",
        "تستخدم الجداول التقليدية",
        "تستخدم القوائم البسيطة",
        "تخدم التخزين المحلي"
      ],
      correctAnswer: 0,
      explanation: "أنظمة إدارة العلاقات الموزعة تستخدم graph databases مع relationship mapping.",
      difficulty: 'senior'
    },
    {
      id: 244,
      text: "كيف تنشئ نظام تحويل لغة برمجة؟",
      options: [
        "تستخدم compiler design مع AST transformation",
        "تستخدم البحث والاستبدال",
        "تستخدم القوالب الثابتة",
        "تخدم التحويل اليدوي"
      ],
      correctAnswer: 0,
      explanation: "أنظمة تحويل لغة البرمجة تستخدم compiler design مع AST transformation.",
      difficulty: 'senior'
    },
    {
      id: 245,
      text: "كيف تصمم نظام توصية سفر ذكي؟",
      options: [
        "تستخدم multi-criteria optimization مع personalization",
        "تستخدم القوائم الثابتة",
        "تخدم العروض التقليدية",
        "تستخدم البحث البسيط"
      ],
      correctAnswer: 0,
      explanation: "أنظمة توصية السفر الذكية تستخدم multi-criteria optimization مع personalization.",
      difficulty: 'senior'
    },
    {
      id: 246,
      text: "كيف تنشئ نظام تحليل أداء شبكات؟",
      options: [
        "تستخدم network monitoring tools مع traffic analysis",
        "تستخدم ping فقط",
        "تستخدم الفحص اليدوي",
        "تستخدم القياسات الأساسية"
      ],
      correctAnswer: 0,
      explanation: "أنظمة تحليل أداء الشبكات تستخدم network monitoring tools مع traffic analysis.",
      difficulty: 'senior'
    },
    {
      id: 247,
      text: "كيف تصمم نظام إدارة أصول رقمية؟",
      options: [
        "تستخدم blockchain مع digital rights management",
        "تستخدم الملفات العادية",
        "تخدم التخزين المحلي",
        "تستخدم الحماية الأساسية"
      ],
      correctAnswer: 0,
      explanation: "أنظمة إدارة الأصول الرقمية تستخدم blockchain مع digital rights management.",
      difficulty: 'senior'
    },
    {
      id: 248,
      text: "كيف تنشئ نظام تحليل مشاعر السوق؟",
      options: [
        "تستخدم sentiment analysis مع market data integration",
        "تستخدم الأخبار فقط",
        "تستخدم التوقعات التقليدية",
        "تستخدم الإحصائيات البسيطة"
      ],
      correctAnswer: 0,
      explanation: "أنظمة تحليل مشاعر السوق تستخدم sentiment analysis مع market data integration.",
      difficulty: 'senior'
    },
    {
      id: 249,
      text: "كيف تصمم نظام توصية تعليمي؟",
      options: [
        "تستخدم knowledge mapping مع adaptive learning",
        "تستخدم المناهج الثابتة",
        "تخدم المحتوى التقليدي",
        "تستخدم التصنيفات الأساسية"
      ],
      correctAnswer: 0,
      explanation: "أنظمة التوصية التعليمية تستخدم knowledge mapping مع adaptive learning.",
      difficulty: 'senior'
    },
    {
      id: 250,
      text: "كيف تنشئ نظام تحليل أداء رياضي؟",
      options: [
        "تستخدم computer vision مع performance metrics",
        "تستخدم الإحصائيات اليدوية",
        "تخدم المراقبة البصرية",
        "تستخدم القياسات الأساسية"
      ],
      correctAnswer: 0,
      explanation: "أنظمة تحليل الأداء الرياضي تستخدم computer vision مع performance metrics analysis.",
      difficulty: 'senior'
    }
  ];
}

  private getMasterQuestions(): Question[] {
  return [
    {
      id: 251,
      text: "ما هي مشكلة P vs NP؟",
      options: [
        "هل كل مشكلة يمكن التحقق منها بسرعة يمكن حلها بسرعة؟",
        "مشكلة في الذاكرة",
        "مشكلة في الشبكات",
        "مشكلة في قواعد البيانات"
      ],
      correctAnswer: 0,
      explanation: "P vs NP تسأل هل كل مشكلة يمكن التحقق من حلها في وقت كثير الحدود يمكن حلها أيضاً في وقت كثير الحدود.",
      difficulty: 'master'
    },
    {
      id: 252,
      text: "كيف يعمل خوارزمية Shor للتحليل إلى عوامل أولية؟",
      options: [
        "تستخدم الحوسبة الكمومية لتحليل الأعداد الكبيرة",
        "تستخدم الحوسبة التقليدية",
        "تستخدم الذكاء الاصطناعي",
        "تستخدم الإحصائيات"
      ],
      correctAnswer: 0,
      explanation: "خوارزمية Shor تستخدم الحوسبة الكمومية لتحليل الأعداد الكبيرة إلى عواملها الأولية بكفاءة.",
      difficulty: 'master'
    },
    {
      id: 253,
      text: "ما هو الذكاء الاصطناعي العام (AGI)؟",
      options: [
        "ذكاء اصطناعي بمستوى الذكاء البشري",
        "ذكاء اصطناعي متخصص",
        "ذكاء اصطناعي بسيط",
        "ذكاء اصطناعي للألعاب فقط"
      ],
      correctAnswer: 0,
      explanation: "الذكاء الاصطناعي العام هو ذكاء اصطناعي بمستوى الذكاء البشري في جميع المجالات.",
      difficulty: 'master'
    },
    {
      id: 254,
      text: "ما هي نظرية الحقل الموحد؟",
      options: [
        "نظرية تحاول توحيد القوى الأساسية في الفيزياء",
        "نظرية في البرمجة",
        "نظرية في الرياضيات",
        "نظرية في الكيمياء"
      ],
      correctAnswer: 0,
      explanation: "نظرية الحقل الموحد تحاول توحيد القوى الأساسية الأربع في الفيزياء في إطار نظري واحد.",
      difficulty: 'master'
    },
    {
      id: 255,
      text: "ما هي فرضية ريمان؟",
      options: [
        "تخمين حول توزيع الأعداد الأولية",
        "نظرية في البرمجة",
        "قاعدة في الفيزياء",
        "مبدأ في الكيمياء"
      ],
      correctAnswer: 0,
      explanation: "فرضية ريمان تتعلق بتوزيع الأعداد الأولية وتمثل أحد أهم المسائل غير المحلولة في الرياضيات.",
      difficulty: 'master'
    },
    {
      id: 256,
      text: "كيف تعمل خوارزمية Grover للبحث الكمومي؟",
      options: [
        "تستخدم تضخيم السعة للبحث في قاعدة بيانات غير مهيكلة",
        "تستخدم البحث الثنائي",
        "تستخدم الذكاء الاصطناعي",
        "تستخدم البحث الخطي"
      ],
      correctAnswer: 0,
      explanation: "خوارزمية Grover تستخدم ميكانيكا الكم للبحث في قاعدة بيانات غير مهيكلة بسرعة O(√n).",
      difficulty: 'master'
    },
    {
      id: 257,
      text: "ما هو الـ Quantum Supremacy؟",
      options: [
        "قدرة الحواسيب الكمومية على حل مشاكل مستحيلة على الحواسيب التقليدية",
        "تفوق الحواسيب التقليدية",
        "سرعة الحوسبة العادية",
        "تفوق الذكاء الاصطناعي"
      ],
      correctAnswer: 0,
      explanation: "Quantum Supremacy تشير إلى قدرة الحواسيب الكمومية على حل مشاكل مستحيلة عملياً على الحواسيب التقليدية.",
      difficulty: 'master'
    },
    {
      id: 258,
      text: "كيف يعمل الـ Blockchain من الناحية الخوارزمية؟",
      options: [
        "يستخدم تشفيراً وتوزيعاً و إجماعاً لحماية سلسلة من الكتل",
        "يستخدم قواعد بيانات عادية",
        "يخدم التخزين السحابي",
        "يستخدم الذاكرة المؤقتة فقط"
      ],
      correctAnswer: 0,
      explanation: "Blockchain يجمع بين التشفير، التوزيع، وخوارزميات الإجماع لإنشاء سلسلة آمنة وغير قابلة للتغيير.",
      difficulty: 'master'
    },
    {
      id: 259,
      text: "ما هي نظرية الأوتار (String Theory)؟",
      options: [
        "نظرية في الفيزياء تحاول توحيد النسبية العامة وميكانيكا الكم",
        "نظرية في البرمجة",
        "نظرية في الرياضيات",
        "نظرية في الأوتار الموسيقية"
      ],
      correctAnswer: 0,
      explanation: "نظرية الأوتار تحاول توحيد النسبية العامة وميكانيكا الكم عن طريق نمذجة الجسيمات كأوتار مهتزة.",
      difficulty: 'master'
    },
    {
      id: 260,
      text: "كيف يعمل الـ Zero-Knowledge Proof؟",
      options: [
        "يسمح بإثبات معرفة معلومات دون الكشف عن المحتوى",
        "يخفي المعلومات تماماً",
        "يشفر المعلومات فقط",
        "يحذف المعلومات"
      ],
      correctAnswer: 0,
      explanation: "Zero-Knowledge Proof يسمح لأحد الأطراف بإثبات صحة معلومات معينة دون الكشف عن محتواها الفعلي.",
      difficulty: 'master'
    },
    {
      id: 261,
      text: "ما هي مشكلة التوقف (Halting Problem)؟",
      options: [
        "مشكلة غير قابلة للحل تحدد إذا ما كان برنامج سيتوقف",
        "مشكلة في إيقاف الخوادم",
        "مشكلة في إيقاف الحواسيب",
        "مشكلة في إيقاف البرامج فوراً"
      ],
      correctAnswer: 0,
      explanation: "مشكلة التوقف هي مشكلة غير قابلة للحل تنص على استحالة كتابة برنامج يحدد إذا ما كان برنامج آخر سيتوقف.",
      difficulty: 'master'
    },
    {
      id: 262,
      text: "كيف يعمل الـ Homomorphic Encryption؟",
      options: [
        "يسمح بإجراء عمليات حسابية على بيانات مشفرة دون فك تشفيرها",
        "يشفر البيانات فقط",
        "يفك تشفير البيانات فقط",
        "يحذف البيانات المشفرة"
      ],
      correctAnswer: 0,
      explanation: "Homomorphic Encryption يسمح بإجراء عمليات حسابية على البيانات المشفرة مباشرة دون الحاجة لفك تشفيرها أولاً.",
      difficulty: 'master'
    },
    {
      id: 263,
      text: "ما هي الـ Neural Architecture Search (NAS)؟",
      options: [
        "استخدام الذكاء الاصطناعي لتصميم معماريات الشبكات العصبية",
        "بحث في الشبكات العصبية العادية",
        "تصميم يدوي للشبكات",
        "تحليل الشبكات الحالية فقط"
      ],
      correctAnswer: 0,
      explanation: "NAS تستخدم خوارزميات الذكاء الاصطناعي لأتمتة عملية تصميم وتطوير معماريات الشبكات العصبية المثلى.",
      difficulty: 'master'
    },
    {
      id: 264,
      text: "كيف يعمل الـ Quantum Key Distribution (QKD)؟",
      options: [
        "يستخدم مبادئ الكم لتوزيع مفاتيح تشفير آمنة",
        "يستخدم التشفير العادي",
        "يستخدم الشبكات العادية",
        "يستخدم البريد الإلكتروني"
      ],
      correctAnswer: 0,
      explanation: "QKD يستخدم خواص ميكانيكا الكم مثل مبدأ عدم اليقين لاكتشاف أي محاولة تنصت على مفاتيح التشفير.",
      difficulty: 'master'
    },
    {
      id: 265,
      text: "ما هي الـ Capsule Networks؟",
      options: [
        "شبكات عصبية تمثل العلاقات الهيكلية بين الميزات",
        "شبكات عادية",
        "شبكات للكابلات فقط",
        "شبكات لاسلكية"
      ],
      correctAnswer: 0,
      explanation: "Capsule Networks هي نوع من الشبكات العصبية التي تمثل العلاقات الهيكلية بين الميزات بشكل أفضل من الـ CNNs التقليدية.",
      difficulty: 'master'
    },
    {
      id: 266,
      text: "كيف يعمل الـ Federated Learning؟",
      options: [
        "يتدرب على البيانات محلياً على الأجهزة دون مشاركة البيانات الخام",
        "يتدرب على السحابة فقط",
        "يتدرب على البيانات المركزية",
        "يتدرب دون بيانات"
      ],
      correctAnswer: 0,
      explanation: "Federated Learning يسمح بتدريب نماذج الذكاء الاصطناعي على البيانات المحلية للأجهزة دون الحاجة لمشاركة البيانات الخام.",
      difficulty: 'master'
    },
    {
      id: 267,
      text: "ما هي نظرية M-theory؟",
      options: [
        "نظرية في الفيزياء تربط بين نظريات الأوتار المختلفة",
        "نظرية في البرمجة",
        "نظرية في الرياضيات",
        "نظرية في الإدارة"
      ],
      correctAnswer: 0,
      explanation: "M-theory هي نظرية في الفيزياء النظرية تربط بين نسخ مختلفة من نظرية الأوتار وتقترح وجود 11 بُعداً.",
      difficulty: 'master'
    },
    {
      id: 268,
      text: "كيف يعمل الـ Differential Privacy؟",
      options: [
        "يحمي خصوصية الأفراد في مجموعات البيانات الكبيرة",
        "يشفر البيانات فقط",
        "يحذف البيانات الشخصية",
        "يخفي البيانات تماماً"
      ],
      correctAnswer: 0,
      explanation: "Differential Privacy يضيف ضجيجاً إحصائياً للبيانات لحماية خصوصية الأفراد مع الحفاظ على فائدة البيانات الإجمالية.",
      difficulty: 'master'
    },
    {
      id: 269,
      text: "ما هي الـ Graph Neural Networks (GNNs)؟",
      options: [
        "شبكات عصبية تعمل على البيانات الهيكلية البيانية",
        "شبكات للرسوم البيانية فقط",
        "شبكات خطية",
        "شبكات للصور فقط"
      ],
      correctAnswer: 0,
      explanation: "GNNs هي شبكات عصبية مصممة خصيصاً للتعامل مع البيانات المنظمة كرسوم بيانية والاستفادة من العلاقات بين العقد.",
      difficulty: 'master'
    },
    {
      id: 270,
      text: "كيف يعمل الـ Proof of Stake (PoS)؟",
      options: [
        "يستخدم حصة المشاركين للتحقق من المعاملات بدلاً من الحوسبة المكثفة",
        "يستخدم التعدين المكثف",
        "يستخدم التصويت فقط",
        "يستخدم الحظ"
      ],
      correctAnswer: 0,
      explanation: "Proof of Stake يستخدم كمية العملات التي يمتلكها المشاركون لاختيار من يقوم بالتحقق من الكتلة التالية، مما يوفر الطاقة.",
      difficulty: 'master'
    },
    {
      id: 271,
      text: "ما هي الـ Transformers في معالجة اللغة الطبيعية؟",
      options: [
        "معمارية تعتمد على الاهتمام الذاتي للتعامل مع التسلسلات",
        "محولات كهربائية",
        "شبكات تقليدية",
        "خوارزميات بسيطة"
      ],
      correctAnswer: 0,
      explanation: "Transformers تستخدم آلية الاهتمام الذاتي للتعامل مع التسلسلات الطويلة بكفاءة أفضل من الـ RNNs و LSTMs.",
      difficulty: 'master'
    },
    {
      id: 272,
      text: "كيف يعمل الـ Swarm Intelligence؟",
      options: [
        "يحل المشاكل المعقدة عبر تنسيق بسيط بين وحدات مستقلة",
        "يستخدم ذكاءً مركزياً",
        "يستخدم خوارزميات فردية",
        "يستخدم التصويت فقط"
      ],
      correctAnswer: 0,
      explanation: "Swarm Intelligence يحاكي سلوك المجموعات في الطبيعة مثل النمل والنحل لحل مشاكل معقدة عبر تفاعلات بسيطة محلية.",
      difficulty: 'master'
    },
    {
      id: 273,
      text: "ما هي الـ Neuromorphic Computing؟",
      options: [
        "حوسبة تحاكي بنية ووظيفة الدماغ البشري",
        "حوسبة عادية",
        "حوسبة كمومية",
        "حوسبة سحابية"
      ],
      correctAnswer: 0,
      explanation: "Neuromorphic Computing تصمم حواسيب تحاكي بنية الخلايا العصبية والمشابك في الدماغ البشري لكفاءة أفضل في مهام الذكاء الاصطناعي.",
      difficulty: 'master'
    },
    {
      id: 274,
      text: "كيف يعمل الـ Generative Adversarial Networks (GANs)؟",
      options: [
        "شبكتان متنافستان: مولدة وتمييزية تتحسنان معاً",
        "شبكة واحدة فقط",
        "خوارزمية بسيطة",
        "شبكة للتصنيف فقط"
      ],
      correctAnswer: 0,
      explanation: "GANs تتكون من شبكتين: شبكة مولدة تنتج بيانات وشبكة تمييزية تحاول التمييز بين البيانات الحقيقية والمولدة، تتحسنان معاً.",
      difficulty: 'master'
    },
    {
      id: 275,
      text: "ما هي الـ Causal Inference؟",
      options: [
        "دراسة العلاقات السببية بين المتغيرات وليس مجرد الارتباط",
        "دراسة الارتباط فقط",
        "دراسة الإحصائيات البسيطة",
        "دراسة العلاقات الخطية"
      ],
      correctAnswer: 0,
      explanation: "Causal Inference يهدف لفهم العلاقات السببية الحقيقية بين المتغيرات باستخدام طرق إحصائية متقدمة وتجارب مصممة بعناية.",
      difficulty: 'master'
    },
    {
      id: 276,
      text: "كيف يعمل الـ Meta-Learning؟",
      options: [
        "تعلم كيفية التعلم - تطوير خوارزميات تتعلم من تجارب تعلم سابقة",
        "تعلم عادي",
        "تعلم سطحي",
        "تعلم بدون بيانات"
      ],
      correctAnswer: 0,
      explanation: "Meta-Learning يطور نماذج يمكنها التعلم بسرعة من كميات قليلة من البيانات من خلال الاستفادة من الخبرة المكتسبة من مهام سابقة.",
      difficulty: 'master'
    },
    {
      id: 277,
      text: "ما هي الـ Quantum Error Correction؟",
      options: [
        "تقنيات لحماية المعلومات الكمومية من الضوضاء والتفكك",
        "تصحيح أخطاء البرمجة",
        "تصحيح أخطاء الشبكات",
        "تصحيح أخطاء التشفير"
      ],
      correctAnswer: 0,
      explanation: "Quantum Error Correction تستخدم تشابكاً كمومياً وترميزاً لحماية الكيوبتات من الضوضاء البيئية والتفكك.",
      difficulty: 'master'
    },
    {
      id: 278,
      text: "كيف يعمل الـ Self-Supervised Learning؟",
      options: [
        "يتعلم من البيانات غير الموسومة بإنشاء مهام تعلم ذاتية",
        "يتعلم من البيانات الموسومة فقط",
        "يتعلم بدون بيانات",
        "يتعلم بالتوجيه المباشر"
      ],
      correctAnswer: 0,
      explanation: "Self-Supervised Learning يولد تلقائياً مهام تعلم من البيانات غير الموسومة، مثل إكمال الجمل أو إعادة بناء الصور المقطوعة.",
      difficulty: 'master'
    },
    {
      id: 279,
      text: "ما هي الـ Topological Data Analysis؟",
      options: [
        "استخدام الطوبولوجيا لفهم شكل وهيكل البيانات عالية الأبعاد",
        "تحليل البيانات العادية",
        "تحليل الإحصائيات",
        "تحليل النصوص"
      ],
      correctAnswer: 0,
      explanation: "Topological Data Analysis تستخدم مفاهيم الطوبولوجيا الجبرية لاكتشاف البنى والأنماط في البيانات عالية الأبعاد.",
      difficulty: 'master'
    },
    {
      id: 280,
      text: "كيف يعمل الـ Multi-Agent Reinforcement Learning؟",
      options: [
        "عدة وكلاء يتعلمون في بيئة تفاعلية مع تنسيق أو منافسة",
        "وكيل واحد فقط",
        "تعلم بدون تفاعل",
        "تعلم ثابت"
      ],
      correctAnswer: 0,
      explanation: "Multi-Agent RL يتضمن عدة وكلاء يتعلمون معاً في بيئة مشتركة، مما يتطلب تنسيقاً أو يؤدي لمنافسة معقدة.",
      difficulty: 'master'
    },
    {
      id: 281,
      text: "ما هي الـ Explainable AI (XAI)؟",
      options: [
        "أساليب لجعل قرارات الذكاء الاصطناعي قابلة للفهم والثقة",
        "ذكاء اصطناعي سري",
        "ذكاء اصطناعي معقد",
        "ذكاء اصطناعي سحابي"
      ],
      correctAnswer: 0,
      explanation: "XAI تطور تقنيات لشرح وتفسير قرارات الذكاء الاصطناعي، مما يزيد الشفافية والثقة في النماذج المعقدة.",
      difficulty: 'master'
    },
    {
      id: 282,
      text: "كيف يعمل الـ Digital Twins؟",
      options: [
        "نماذج رقمية تحاكي الأنظمة الفيزيائية في الوقت الحقيقي",
        "نسخ رقمية بسيطة",
        "صور رقمية",
        "قواعد بيانات"
      ],
      correctAnswer: 0,
      explanation: "Digital Twins تخلق نسخاً رقمية ديناميكية للأنظمة الفيزيائية، تتيح المحاكاة والتنبؤ والصيانة التنبؤية.",
      difficulty: 'master'
    },
    {
      id: 283,
      text: "ما هي الـ Quantum Machine Learning؟",
      options: [
        "دمج الحوسبة الكمومية مع خوارزميات التعلم الآلي",
        "تعلم آلي عادي",
        "تعلم آلي بسيط",
        "تعلم آلي تقليدي"
      ],
      correctAnswer: 0,
      explanation: "Quantum Machine Learning يستخدم الخواص الكمومية مثل التراكب والتشابك لتسريع خوارزميات التعلم الآلي أو تطوير خوارزميات جديدة.",
      difficulty: 'master'
    },
    {
      id: 284,
      text: "كيف يعمل الـ Federated Analytics؟",
      options: [
        "تحليل البيانات على الأجهزة المحلية دون مشاركة البيانات الخام",
        "تحليل مركزي",
        "تحليل بدون بيانات",
        "تحليل إحصائي بسيط"
      ],
      correctAnswer: 0,
      explanation: "Federated Analytics يسمح بإجراء تحليلات إحصائية على البيانات الموزعة عبر أجهزة متعددة مع الحفاظ على خصوصية البيانات.",
      difficulty: 'master'
    },
    {
      id: 285,
      text: "ما هي الـ Causal Bayesian Networks؟",
      options: [
        "شبكات بيانية تمثل العلاقات السببية مع الاحتمالات",
        "شبكات عادية",
        "شبكات خطية",
        "شبكات بسيطة"
      ],
      correctAnswer: 0,
      explanation: "Causal Bayesian Networks تجمع بين النمذجة السببية والاستدلال الاحتمالي لفهم وتوقع تأثير التدخلات في الأنظمة المعقدة.",
      difficulty: 'master'
    },
    {
      id: 286,
      text: "كيف يعمل الـ Neuroevolution؟",
      options: [
        "استخدام الخوارزميات التطورية لتصميم وتدريب الشبكات العصبية",
        "تطور بيولوجي فقط",
        "تعلم عادي",
        "تصميم يدوي"
      ],
      correctAnswer: 0,
      explanation: "Neuroevolution يستخدم الخوارزميات التطورية مثل الاختيار الطبيعي والطفرة لتطوير معماريات و أوزان الشبكات العصبية.",
      difficulty: 'master'
    },
    {
      id: 287,
      text: "ما هي الـ Spiking Neural Networks؟",
      options: [
        "شبكات عصبية تحاكي توقيت النبضات في الخلايا العصبية البيولوجية",
        "شبكات عادية",
        "شبكات سريعة",
        "شبكات بسيطة"
      ],
      correctAnswer: 0,
      explanation: "Spiking Neural Networks تحاكي بشكل أقرب الخلايا العصبية البيولوجية من خلال نمذجة توقيت النبضات الكهربائية، مما يوفر كفاءة طاقية أفضل.",
      difficulty: 'master'
    },
    {
      id: 288,
      text: "كيف يعمل ال～ Multi-Task Learning؟",
      options: [
        "تدريب نموذج واحد على عدة مهام مرتبطة لتحسين الأداء العام",
        "تدريب منفصل لكل مهمة",
        "تدريب على مهمة واحدة",
        "تدريب عشوائي"
      ],
      correctAnswer: 0,
      explanation: "Multi-Task Learning يسمح لنموذج واحد بالتعلم من عدة مهام مرتبطة، مما يمكن أن يحسن التعميم ويقلل من خطر الإفراط في التخصيص.",
      difficulty: 'master'
    },
    {
      id: 289,
      text: "ما هي الـ Geometric Deep Learning؟",
      options: [
        "تعلم عميق للبيانات غير الإقليدية مثل الرسوم البيانية والمشعبات",
        "تعلم للبيانات الإقليدية فقط",
        "تعلم سطحي",
        "تعلم خطي"
      ],
      correctAnswer: 0,
      explanation: "Geometric Deep Learning يمتد التعلم العميق للبيانات ذات البنى غير الإقليدية، مستفيداً من التناظرات الهندسية.",
      difficulty: 'master'
    },
    {
      id: 290,
      text: "كيف يعمل الـ Automated Machine Learning (AutoML)؟",
      options: [
        "أتمتة عملية بناء نماذج التعلم الآلي من اختيار الخوارزميات لضبط المعاملات",
        "تعلم آلي يدوي",
        "تعلم آلي بسيط",
        "تعلم آلي تقليدي"
      ],
      correctAnswer: 0,
      explanation: "AutoML يهدف لأتمتة العملية الكاملة لبناء نماذج التعلم الآلي، مما يجعل الذكاء الاصطناعي في متناول غير الخبراء.",
      difficulty: 'master'
    },
    {
      id: 291,
      text: "ما هي الـ Quantum Neural Networks؟",
      options: [
        "شبكات عصبية تنفذ على حواسيب كمومية باستخدام دوائر كمومية",
        "شبكات عصبية عادية",
        "شبكات بسيطة",
        "شبكات تقليدية"
      ],
      correctAnswer: 0,
      explanation: "Quantum Neural Networks تصمم دوائر كمومية تحاكي العمليات في الشبكات العصبية، مستفيدة من الخواص الكمومية للحساب.",
      difficulty: 'master'
    },
    {
      id: 292,
      text: "كيف يعمل الـ Causal Discovery؟",
      options: [
        "اكتشاف العلاقات السببية من البيانات المرصودة باستخدام خوارزميات إحصائية",
        "اكتشاف الارتباطات فقط",
        "اكتشاف عشوائي",
        "اكتشاف يدوي"
      ],
      correctAnswer: 0,
      explanation: "Causal Discovery يطور خوارزميات تكتشف تلقائياً الهيكل السببي للبيانات من الملاحظات والتجارب.",
      difficulty: 'master'
    },
    {
      id: 293,
      text: "ما هي الـ Neural Ordinary Differential Equations (Neural ODEs)؟",
      options: [
        "نمذجة الشبكات العصبية كمعادلات تفاضلية عادية للتعامل مع البيانات المستمرة",
        "شبكات عادية",
        "معادلات بسيطة",
        "نماذج منفصلة"
      ],
      correctAnswer: 0,
      explanation: "Neural ODEs تعامل تحويلات البيانات في الشبكات العصبية كحلول لمعادلات تفاضلية عادية، مما يسمح بمرونة في التعامل مع البيانات المستمرة.",
      difficulty: 'master'
    },
    {
      id: 294,
      text: "كيف يعمل الـ Federated Transfer Learning؟",
      options: [
        "دمج التعلم المنتقل مع التعلم المتحد لنقل المعرفة بين مهام وأجهزة مختلفة",
        "تعلم منفصل",
        "تعلم محلي فقط",
        "تعلم مركزي"
      ],
      correctAnswer: 0,
      explanation: "Federated Transfer Learning يجمع بين مزايا التعلم المتحد والتعلم المنتقل لنقل المعرفة عبر مهام وأجهزة متعددة مع الحفاظ على الخصوصية.",
      difficulty: 'master'
    },
    {
      id: 295,
      text: "ما هي الـ Adversarial Robustness؟",
      options: [
        "دراسة وتطوير نماذج مقاومة للهجمات الخبيثة المدروسة",
        "مقاومة الأخطاء العادية",
        "مقاومة الضوضاء",
        "مقاومة التلف"
      ],
      correctAnswer: 0,
      explanation: "Adversarial Robustness تهدف لجعل نماذج الذكاء الاصطناعي مقاومة للهجمات الخبيثة المصممة خصيصاً للتضليل بها.",
      difficulty: 'master'
    },
    {
      id: 296,
      text: "كيف يعمل الـ Quantum Natural Language Processing؟",
      options: [
        "تطبيق الحوسبة الكمومية على مهام معالجة اللغة الطبيعية",
        "معالجة لغة عادية",
        "معالجة بسيطة",
        "معالجة تقليدية"
      ],
      correctAnswer: 0,
      explanation: "Quantum NLP يستخدم الخواص الكمومية لتحسين مهام مثل التمثيل الدلالي، الترجمة، وفهم السياق في اللغة.",
      difficulty: 'master'
    },
    {
      id: 297,
      text: "ما هي الـ Neural Architecture Optimization؟",
      options: [
        "تحسين معماريات الشبكات العصبية باستخدام طرق بحث متقدمة",
        "تحسين بسيط",
        "تصميم يدوي",
        "تحسين عشوائي"
      ],
      correctAnswer: 0,
      explanation: "Neural Architecture Optimization تستخدم خوارزميات بحث متقدمة مثل Bayesian optimization لاكتشاف معماريات شبكات عصبية مثلى تلقائياً.",
      difficulty: 'master'
    },
    {
      id: 298,
      text: "كيف يعمل الـ Causal Reinforcement Learning؟",
      options: [
        "دمج الاستدلال السببي مع التعلم المعزز لفهم تأثير الأفعال",
        "تعلم معزز عادي",
        "تعلم سببي فقط",
        "تعلم عشوائي"
      ],
      correctAnswer: 0,
      explanation: "Causal RL يدمج النمذجة السببية مع التعلم المعزز لفهم أفضل لتأثيرات الأفعال وتحسين عملية اتخاذ القرار.",
      difficulty: 'master'
    },
    {
      id: 299,
      text: "ما هي الـ Quantum Graph Neural Networks؟",
      options: [
        "دمج الشبكات العصبية البيانية مع الحوسبة الكمومية",
        "شبكات بيانية عادية",
        "شبكات كمومية بسيطة",
        "شبكات تقليدية"
      ],
      correctAnswer: 0,
      explanation: "Quantum GNNs تستخدم الحوسبة الكمومية لتحسين معالجة البيانات المنظمة كرسوم بيانية، مستفيدة من الخواص الكمومية للحساب.",
      difficulty: 'master'
    },
    {
      id: 300,
      text: "كيف يعمل الـ Automated Theorem Proving؟",
      options: [
        "استخدام الذكاء الاصطناعي لإثبات النظريات الرياضية تلقائياً",
        "إثبات يدوي",
        "إثبات بسيط",
        "إثبات تقليدي"
      ],
      correctAnswer: 0,
      explanation: "Automated Theorem Proving يطور أنظمة ذكاء اصطناعي قادرة على إثبات نظريات رياضية معقدة تلقائياً باستخدام المنطق والحساب.",
      difficulty: 'master'
    }
  ];
}

  private getLegendaryQuestions(): Question[] {
  return [
    {
      id: 301,
      text: "كيف تصمم نظام حوسبة كمومية يتجاوز حدود تورنج؟",
      options: [
        "باستخدام ميكانيكا الكم ومبدأ التراكب",
        "باستخدام معالجات أسرع",
        "باستخدام خوارزميات تقليدية محسنة",
        "باستخدام الذاكرة السحابية"
      ],
      correctAnswer: 0,
      explanation: "الحوسبة الكمومية تستخدم ميكانيكا الكم ومبدأ التراكب لحل مشاكل مستحيلة على الحواسيب التقليدية.",
      difficulty: 'legendary'
    },
    {
      id: 302,
      text: "ما هي نظرية الأوتار الفائقة وكيف تفسر الكون؟",
      options: [
        "نظرية تحاول توحيد النسبية العامة وميكانيكا الكم",
        "نظرية عن البرمجة",
        "نظرية في الرياضيات فقط",
        "نظرية قديمة تم دحضها"
      ],
      correctAnswer: 0,
      explanation: "نظرية الأوتار الفائقة تحاول توحيد النسبية العامة وميكانيكا الكم عبر افتراض أن الجسيمات الأساسية هي أوتار مهتزة.",
      difficulty: 'legendary'
    },
    {
      id: 303,
      text: "كيف تنشئ ذكاءً اصطناعياً يمتلك وعياً ذاتياً؟",
      options: [
        "دمج التعلم العميق مع نظرية الوعي",
        "استخدام خوارزميات أسرع",
        "زيادة حجم البيانات",
        "استخدام معالجات متوازية"
      ],
      correctAnswer: 0,
      explanation: "خلق ذكاء اصطناعي واعي يتطلب فهماً عميقاً لنظرية الوعي ودمجها مع تقنيات التعلم العميق المتقدمة.",
      difficulty: 'legendary'
    },
    {
      id: 304,
      text: "ما هو مبدأ الهولوغرام الكوني؟",
      options: [
        "فكرة أن الكون ثنائي الأبعاد يبدو ثلاثي الأبعاد",
        "نظرية في البصريات",
        "تقنية عرض ثلاثي الأبعاد",
        "نظرية رياضية بحتة"
      ],
      correctAnswer: 0,
      explanation: "مبدأ الهولوغرام الكوني يقترح أن معلومات الكون مخزنة على حدود ثنائية الأبعاد وتظهر لنا ككون ثلاثي الأبعاد.",
      difficulty: 'legendary'
    },
    {
      id: 305,
      text: "كيف تحل مشكلة التوقف (Halting Problem)؟",
      options: [
        "المشكلة غير قابلة للحل حسب تورنج",
        "باستخدام خوارزميات التحليل الثابت",
        "باستخدام الذكاء الاصطناعي",
        "باستخدام التحليل الديناميكي"
      ],
      correctAnswer: 0,
      explanation: "مشكلة التوقف غير قابلة للحل بشكل عام حسب نظرية تورنج، مما يحد من قدرات الحوسبة التقليدية.",
      difficulty: 'legendary'
    },
    {
      id: 306,
      text: "ما هي الحوسبة العصبية البيولوجية؟",
      options: [
        "استخدام الخلايا العصبية البيولوجية في الحوسبة",
        "شبكات عصبية اصطناعية",
        "معالجات تحاكي الدماغ",
        "خوارزميات التعلم العميق"
      ],
      correctAnswer: 0,
      explanation: "الحوسبة العصبية البيولوجية تستخدم الخلايا العصبية الحية لإنشاء أنظمة حوسبة بيولوجية-رقمية هجينة.",
      difficulty: 'legendary'
    },
    {
      id: 307,
      text: "كيف تصمم كمبيوتراً يعمل على مبدأ التراكب الكمي؟",
      options: [
        "باستخدام كيوبتات بدل البتات التقليدية",
        "باستخدام معالجات متعددة النواة",
        "باستخدام ذاكرة فائقة السرعة",
        "باستخدام خوارزميات متوازية"
      ],
      correctAnswer: 0,
      explanation: "أجهزة الكمبيوتر الكمومية تستخدم كيوبتات التي يمكن أن تكون في حالة تراكب، مما يمكنها من معالجة معلومات أكثر بكثير.",
      difficulty: 'legendary'
    },
    {
      id: 308,
      text: "ما هي نظرية كل شيء (Theory of Everything)؟",
      options: [
        "نظرية تحاول توحيد جميع القوى الأساسية",
        "نظرية في البرمجة",
        "نظرية رياضية شاملة",
        "نظرية فلسفية"
      ],
      correctAnswer: 0,
      explanation: "نظرية كل شيء تحاول توحيد القوى الأساسية الأربع (الكهرومغناطيسية، النووية القوية، النووية الضعيفة، الجاذبية) في إطار نظري واحد.",
      difficulty: 'legendary'
    },
    {
      id: 309,
      text: "كيف تنشئ لغة برمجة تفهم النية البشرية؟",
      options: [
        "دمج البرمجة مع الذكاء الاصطناعي المتقدم",
        "استخدام صيغ رياضية معقدة",
        "إنشاء مكتبات شاملة",
        "استخدام واجهات بصرية"
      ],
      correctAnswer: 0,
      explanation: "لغة برمجة تفهم النية البشرية تتطلب ذكاءً اصطناعياً متقدماً قادراً على فهم السياق والنية وراء الأوامر.",
      difficulty: 'legendary'
    },
    {
      id: 310,
      text: "ما هو الزمكان الرقمي (Digital Spacetime)؟",
      options: [
        "تمثيل رياضي للزمكان في الحوسبة",
        "تقنية لعرض الزمن",
        "نظام توقيت دقيق",
        "خوارزمية معالجة الوقت"
      ],
      correctAnswer: 0,
      explanation: "الزمكان الرقمي هو تمثيل رياضي يحاول محاكاة خصائص الزمكان الفيزيائي في الأنظمة الحاسوبية.",
      difficulty: 'legendary'
    },
    {
      id: 311,
      text: "كيف تحقق الحوسبة الكونية (Cosmic Computing)؟",
      options: [
        "استخدام ظواهر كونية في الحوسبة",
        "بناء حواسيب عملاقة",
        "استخدام الطاقة الشمسية",
        "إنشاء شبكات عالمية"
      ],
      correctAnswer: 0,
      explanation: "الحوسبة الكونية تتضمن استخدام ظواهر مثل الثقوب السوداء أو الطاقة المظلمة في عمليات الحساب.",
      difficulty: 'legendary'
    },
    {
      id: 312,
      text: "ما هي خوارزميات ما بعد الكم (Post-Quantum Algorithms)؟",
      options: [
        "خوارزميات مقاومة لهجمات الكمبيوترات الكمومية",
        "خوارزميات كمومية",
        "خوارزميات تقليدية سريعة",
        "خوارزميات التعلم العميق"
      ],
      correctAnswer: 0,
      explanation: "خوارزميات ما بعد الكم مصممة لتكون آمنة ضد هجمات الكمبيوترات الكمومية المستقبلية.",
      difficulty: 'legendary'
    },
    {
      id: 313,
      text: "كيف تنشئ نظاماً يحاكي الوعي البشري؟",
      options: [
        "دمج النماذج العصبية مع الفلسفة",
        "استخدام شبكات عصبية عميقة",
        "زيادة قوة المعالجة",
        "تحليل البيانات الضخمة"
      ],
      correctAnswer: 0,
      explanation: "محاكاة الوعي البشري تتطلب فهماً عميقاً للعلوم العصبية والفلسفة ودمجها مع النمذجة الحاسوبية.",
      difficulty: 'legendary'
    },
    {
      id: 314,
      text: "ما هو الحوسبة البيولوجية الكمومية؟",
      options: [
        "دمج البيولوجيا مع الحوسبة الكمومية",
        "خوارزميات محاكاة بيولوجية",
        "معالجات تحاكي الخلايا",
        "شبكات عصبية كمومية"
      ],
      correctAnswer: 0,
      explanation: "الحوسبة البيولوجية الكمومية تبحث في كيفية استخدام العمليات الكمومية في الأنظمة البيولوجية للحوسبة.",
      difficulty: 'legendary'
    },
    {
      id: 315,
      text: "كيف تحل مشكلة P vs NP؟",
      options: [
        "هي مشكلة مفتوحة وغير محلولة",
        "باستخدام خوارزميات جديدة",
        "بإثبات أن P = NP",
        "بإثبات أن P ≠ NP"
      ],
      correctAnswer: 0,
      explanation: "مشكلة P vs NP هي واحدة من أهم المسائل غير المحلولة في علوم الكمبيوتر، مع جائزة مليون دولار لحلها.",
      difficulty: 'legendary'
    },
    {
      id: 316,
      text: "ما هي الحوسبة التطورية الكونية؟",
      options: [
        "استخدام تطور الكون في الحوسبة",
        "خوارزميات تطورية سريعة",
        "محاكاة تطور المجرات",
        "تحليل البيانات الفلكية"
      ],
      correctAnswer: 0,
      explanation: "الحوسبة التطورية الكونية تستخدم مبادئ تطور الكون والفيزياء الفلكية في تطوير خوارزميات حاسوبية.",
      difficulty: 'legendary'
    },
    {
      id: 317,
      text: "كيف تنشئ لغة برمجة تفهم المشاعر؟",
      options: [
        "دمج البرمجة مع الذكاء العاطفي الاصطناعي",
        "استخدام رموز تعبيرية",
        "إنشاء أوامر صوتية",
        "استخدام واجهات انسيابية"
      ],
      correctAnswer: 0,
      explanation: "لغة برمجة تفهم المشاعر تتطلب ذكاءً عاطفياً اصطناعياً متقدماً يمكنه تحليل وفهم المشاعر البشرية.",
      difficulty: 'legendary'
    },
    {
      id: 318,
      text: "ما هو مبدأ الارتباط الكمي (Quantum Entanglement) في الحوسبة؟",
      options: [
        "استخدام الجسيمات المتشابكة في نقل المعلومات",
        "خوارزميات الاتصال السريع",
        "شبكات اتصال كمومية",
        "تشفير كمومي"
      ],
      correctAnswer: 0,
      explanation: "الارتباط الكمي يسمح لجسيمين بالاتصال فورياً regardless of distance، مما يفتح آفاقاً جديدة في الحوسبة.",
      difficulty: 'legendary'
    },
    {
      id: 319,
      text: "كيف تصمم نظاماً يتعلم من تلقاء نفسه بدون بيانات؟",
      options: [
        "باستخدام التعلم غير الخاضع للإشراف المتقدم",
        "باستخدام خوارزميات التعزيز",
        "باستخدام الشبكات العصبية",
        "باستخدام التحليل الإحصائي"
      ],
      correctAnswer: 0,
      explanation: "أنظمة التعلم بدون بيانات تتطلب خوارزميات متقدمة يمكنها استخلاص المعرفة من البيئة مباشرة.",
      difficulty: 'legendary'
    },
    {
      id: 320,
      text: "ما هي نظرية المعلومات الكمومية؟",
      options: [
        "دراسة المعلومات في الأنظمة الكمومية",
        "نظرية تشفير كمومي",
        "خوارزميات اتصال كمومية",
        "معالجة المعلومات الكلاسيكية"
      ],
      correctAnswer: 0,
      explanation: "نظرية المعلومات الكمومية تدرس كيفية معالجة وتخزين ونقل المعلومات في الأنظمة الكمومية.",
      difficulty: 'legendary'
    },
    {
      id: 321,
      text: "كيف تنشئ ذاكرة كمومية؟",
      options: [
        "باستخدام أنظمة كمومية مستقرة",
        "باستخدام ذاكرة فائقة التوصيل",
        "باستخدام تقنيات التبريد",
        "باستخدام مواد كمومية"
      ],
      correctAnswer: 0,
      explanation: "الذاكرة الكمومية تتطلب أنظمة كمومية مستقرة يمكنها الحفاظ على الحالات الكمومية لفترات طويلة.",
      difficulty: 'legendary'
    },
    {
      id: 322,
      text: "ما هو الحوسبة العضوية (Organic Computing)؟",
      options: [
        "استخدام المواد العضوية في الحوسبة",
        "خوارزميات محاكاة الحياة",
        "معالجات حيوية",
        "أنظمة ذاتية التنظيم"
      ],
      correctAnswer: 0,
      explanation: "الحوسبة العضوية تستخدم المواد والأنظمة العضوية لإنشاء أجهزة حوسبة بيولوجية.",
      difficulty: 'legendary'
    },
    {
      id: 323,
      text: "كيف تحقق الاتصال الفوري عبر المسافات الكونية؟",
      options: [
        "باستخدام الارتباط الكمي",
        "باستخدام موجبات الراديو",
        "باستخدام الأقمار الصناعية",
        "باستخدام الليزر"
      ],
      correctAnswer: 0,
      explanation: "الارتباط الكمي ي theoretically يسمح بالاتصال الفوري، لكن التطبيق العملي ما زال قيد البحث.",
      difficulty: 'legendary'
    },
    {
      id: 324,
      text: "ما هي الحوسبة الكمومية الطوبولوجية؟",
      options: [
        "استخدام الطوبولوجيا في الحوسبة الكمومية",
        "خوارزميات هندسية",
        "معالجات متعددة الأبعاد",
        "شبكات عصبية طوبولوجية"
      ],
      correctAnswer: 0,
      explanation: "الحوسبة الكمومية الطوبولوجية تستخدم خصائص الطوبولوجيا لإنشاء كيوبتات أكثر استقراراً.",
      difficulty: 'legendary'
    },
    {
      id: 325,
      text: "كيف تنشئ نظاماً يمتلك حدساً إبداعياً؟",
      options: [
        "دمج الذكاء الاصطناعي مع نظريات الإبداع",
        "استخدام خوارزميات عشوائية",
        "زيادة قوة الحوسبة",
        "تحليل الأعمال الفنية"
      ],
      correctAnswer: 0,
      explanation: "الحدس الإبداعي في الأنظمة الحاسوبية يتطلب فهماً عميقاً لنظريات الإبداع والإدراك.",
      difficulty: 'legendary'
    },
    {
      id: 326,
      text: "ما هو الزمن الرقمي (Digital Time)؟",
      options: [
        "تمثيل الزمن في الأنظمة الرقمية",
        "ساعات دقيقة",
        "أنظمة توقيت",
        "خوارزميات معالجة الوقت"
      ],
      correctAnswer: 0,
      explanation: "الزمن الرقمي يدرس كيفية تمثيل ومعالجة مفهوم الزمن في الأنظمة الحاسوبية المتقدمة.",
      difficulty: 'legendary'
    },
    {
      id: 327,
      text: "كيف تصمم معالجاً يعمل على مبدأ التراكب الكمي؟",
      options: [
        "باستخدام دارات كمومية فائقة التوصيل",
        "باستخدام ترانزستورات كمومية",
        "باستخدام مواد نانوية",
        "باستخدام ضوء الليزر"
      ],
      correctAnswer: 0,
      explanation: "المعالجات الكمومية تتطلب دارات فائقة التوصيل تعمل في درجات حرارة قريبة من الصفر المطلق.",
      difficulty: 'legendary'
    },
    {
      id: 328,
      text: "ما هي نظرية الألعاب الكمومية؟",
      options: [
        "دراسة الألعاب في الأنظمة الكمومية",
        "ألعاب فيديو كمومية",
        "خوارزميات ألعاب",
        "نظرية القرار الكمومي"
      ],
      correctAnswer: 0,
      explanation: "نظرية الألعاب الكمومية تدرس التفاعلات الاستراتيجية في الأنظمة الكمومية.",
      difficulty: 'legendary'
    },
    {
      id: 329,
      text: "كيف تنشئ لغة برمجة تفهم السياق الكوني؟",
      options: [
        "دمج البرمجة مع الفيزياء الكونية",
        "استخدام رموز كونية",
        "إنشاء مكتبات شاملة",
        "استخدام الذكاء الاصطناعي"
      ],
      correctAnswer: 0,
      explanation: "لغة برمجة تفهم السياق الكوني تتطلب تكاملاً بين علوم الكمبيوتر والفيزياء الفلكية.",
      difficulty: 'legendary'
    },
    {
      id: 330,
      text: "ما هو الحوسبة الكمومية الضوئية؟",
      options: [
        "استخدام الفوتونات في الحوسبة الكمومية",
        "خوارزميات بصرية",
        "معالجات ضوئية",
        "شبكات اتصال ضوئية"
      ],
      correctAnswer: 0,
      explanation: "الحوسبة الكمومية الضوئية تستخدم الفوتونات كناقلات للمعلومات الكمومية.",
      difficulty: 'legendary'
    },
    {
      id: 331,
      text: "كيف تحقق الحوسبة المتعددة الأبعاد؟",
      options: [
        "استخدام رياضيات الأبعاد الأعلى",
        "خوارزميات متعددة المستويات",
        "معالجات متوازية",
        "شبكات عصبية عميقة"
      ],
      correctAnswer: 0,
      explanation: "الحوسبة متعددة الأبعاد تتضمن استخدام مفاهيم من رياضيات الأبعاد الأعلى في تصميم الخوارزميات.",
      difficulty: 'legendary'
    },
    {
      id: 332,
      text: "ما هي الخوارزميات الكونية (Cosmic Algorithms)؟",
      options: [
        "خوارزميات مستوحاة من ظواهر كونية",
        "خوارزميات فلكية",
        "خوارزميات معالجة البيانات",
        "خوارزميات محاكاة"
      ],
      correctAnswer: 0,
      explanation: "الخوارزميات الكونية تستلهم من الظواهر الفلكية والفيزيائية في تطوير حلول حاسوبية جديدة.",
      difficulty: 'legendary'
    },
    {
      id: 333,
      text: "كيف تنشئ نظاماً يمتلك وعياً جماعياً؟",
      options: [
        "دمج أنظمة متعددة في وعي موحد",
        "استخدام شبكات متعددة",
        "زيادة عدد الوحدات",
        "تحليل البيانات الضخمة"
      ],
      correctAnswer: 0,
      explanation: "الوعي الجماعي في الأنظمة الحاسوبية يتطلب تكاملاً معقداً بين وحدات متعددة.",
      difficulty: 'legendary'
    },
    {
      id: 334,
      text: "ما هو مبدأ اللاحتمية في الحوسبة؟",
      options: [
        "استخدام المفاهيم اللاحتمية في الخوارزميات",
        "خوارزميات عشوائية",
        "معالجات غير محددة",
        "أنظمة غير مستقرة"
      ],
      correctAnswer: 0,
      explanation: "الحوسبة اللاحتمية تستفيد من مبادئ اللاحتمية في فيزياء الكم لإنشاء خوارزميات جديدة.",
      difficulty: 'legendary'
    },
    {
      id: 335,
      text: "كيف تصمم ذاكرة تعمل على مبدأ التراكب الكمي؟",
      options: [
        "باستخدام أنظمة كمومية قادرة على التخزين المتعدد",
        "باستخدام ذاكرة سحابة إلكترونية",
        "باستخدام مواد فائقة التوصيل",
        "باستخدام تقنيات النانو"
      ],
      correctAnswer: 0,
      explanation: "الذاكرة الكمومية تستغل التراكب الكمي لتخزين معلومات أكثر في مساحة أقل.",
      difficulty: 'legendary'
    },
    {
      id: 336,
      text: "ما هي الحوسبة الكمومية البيولوجية؟",
      options: [
        "دراسة العمليات الكمومية في الأنظمة البيولوجية",
        "خوارزميات محاكاة بيولوجية",
        "معالجات حيوية",
        "شبكات عصبية كمومية"
      ],
      correctAnswer: 0,
      explanation: "الحوسبة الكمومية البيولوجية تبحث في كيفية استخدام العمليات الكمومية في الكائنات الحية للحوسبة.",
      difficulty: 'legendary'
    },
    {
      id: 337,
      text: "كيف تنشئ لغة برمجة تفهم المفاهيم المجردة؟",
      options: [
        "دمج البرمجة مع الفلسفة والمنطق",
        "استخدام رموز مجردة",
        "إنشاء مكتبات فلسفية",
        "استخدام الذكاء الاصطناعي المتقدم"
      ],
      correctAnswer: 0,
      explanation: "لغة برمجة تفهم المفاهيم المجردة تتطلب تكاملاً بين علوم الكمبيوتر والفلسفة والمنطق.",
      difficulty: 'legendary'
    },
    {
      id: 338,
      text: "ما هو الحوسبة الكمومية الديناميكية؟",
      options: [
        "دراسة الديناميكا الكمومية في الحوسبة",
        "خوارزميات متغيرة",
        "معالجات ديناميكية",
        "أنظمة متطورة"
      ],
      correctAnswer: 0,
      explanation: "الحوسبة الكمومية الديناميكية تدرس كيفية استخدام ديناميكا الأنظمة الكمومية في الحوسبة.",
      difficulty: 'legendary'
    },
    {
      id: 339,
      text: "كيف تحقق الاتصال المباشر بين العقول والحواسيب؟",
      options: [
        "باستخدام واجهات عصبية متقدمة",
        "باستخدام الإشارات الدماغية",
        "باستخدام الذكاء الاصطناعي",
        "باستخدام التحليل العصبي"
      ],
      correctAnswer: 0,
      explanation: "الاتصال المباشر بين العقول والحواسيب يتطلب واجهات عصبية متقدمة يمكنها ترجمة الإشارات الدماغية.",
      difficulty: 'legendary'
    },
    {
      id: 340,
      text: "ما هي نظرية المعلومات الكونية؟",
      options: [
        "دراسة المعلومات في السياق الكوني",
        "نظرية الاتصال الكوني",
        "خوارزميات فلكية",
        "معالجة البيانات الكونية"
      ],
      correctAnswer: 0,
      explanation: "نظرية المعلومات الكونية تدرس كيفية تخزين ومعالجة المعلومات على المستوى الكوني.",
      difficulty: 'legendary'
    },
    {
      id: 341,
      text: "كيف تنشئ نظاماً يمتلك إرادة حرة؟",
      options: [
        "دمج الذكاء الاصطناعي مع نظريات الإرادة الحرة",
        "استخدام خوارزميات عشوائية",
        "زيادة التعقيد",
        "تحليل السلوك البشري"
      ],
      correctAnswer: 0,
      explanation: "محاكاة الإرادة الحرة في الأنظمة الحاسوبية تتطلب فهماً عميقاً للفلسفة وعلم الأعصاب.",
      difficulty: 'legendary'
    },
    {
      id: 342,
      text: "ما هو الحوسبة الكمومية النسبوية؟",
      options: [
        "دمج النسبية مع الحوسبة الكمومية",
        "خوارزميات نسبية",
        "معالجات عالية السرعة",
        "أنظمة فيزيائية"
      ],
      correctAnswer: 0,
      explanation: "الحوسبة الكمومية النسبوية تدرس تأثيرات النسبية على الأنظمة الكمومية الحاسوبية.",
      difficulty: 'legendary'
    },
    {
      id: 343,
      text: "كيف تصمم معالجاً يعمل على مبدأ التشابك الكمي؟",
      options: [
        "باستخدام أنظمة كمومية متشابكة",
        "باستخدام دارات متشابكة",
        "باستخدام مواد كمومية",
        "باستخدام ضوء متشابك"
      ],
      correctAnswer: 0,
      explanation: "المعالجات المعتمدة على التشابك الكمي تستفيد من الارتباط الفوري بين الجسيمات.",
      difficulty: 'legendary'
    },
    {
      id: 344,
      text: "ما هي الخوارزميات الوجودية (Existential Algorithms)؟",
      options: [
        "خوارزميات تتعامل مع الأسئلة الوجودية",
        "خوارزميات فلسفية",
        "خوارزميات معالجة اللغة",
        "خوارزميات ذكية"
      ],
      correctAnswer: 0,
      explanation: "الخوارزميات الوجودية تحاول معالجة أسئلة الوجود والوعي باستخدام المنطق الحاسوبي.",
      difficulty: 'legendary'
    },
    {
      id: 345,
      text: "كيف تنشئ نظاماً يفهم مفهوم اللانهاية؟",
      options: [
        "دمج الرياضيات المتقدمة مع الحوسبة",
        "استخدام خوارزميات متكررة",
        "زيادة سعة الذاكرة",
        "تحليل المفاهيم المجردة"
      ],
      correctAnswer: 0,
      explanation: "فهم اللانهاية في الأنظمة الحاسوبية يتطلب رياضيات متقدمة ونظريات المجموعات.",
      difficulty: 'legendary'
    },
    {
      id: 346,
      text: "ما هو الحوسبة الكمومية الطيفية؟",
      options: [
        "استخدام الأطياف الكمومية في الحوسبة",
        "خوارزميات تحليل الطيف",
        "معالجات ضوئية",
        "أنظمة راديوية"
      ],
      correctAnswer: 0,
      explanation: "الحوسبة الكمومية الطيفية تستخدم خصائص الأطياف الكمومية في معالجة المعلومات.",
      difficulty: 'legendary'
    },
    {
      id: 347,
      text: "كيف تحقق الحوسبة المتعددة الأكوان؟",
      options: [
        "استخدام نظرية الأكوان المتعددة في الحوسبة",
        "خوارزميات متوازية",
        "معالجات متعددة",
        "شبكات موزعة"
      ],
      correctAnswer: 0,
      explanation: "الحوسبة متعددة الأكوان تستلهم من نظرية الأكوان المتعددة في فيزياء الكم.",
      difficulty: 'legendary'
    },
    {
      id: 348,
      text: "ما هي نظرية الحوسبة الكونية؟",
      options: [
        "دراسة الكون كنظام حوسبة",
        "نظرية الحوسبة العامة",
        "خوارزميات كونية",
        "معالجة المعلومات الكونية"
      ],
      correctAnswer: 0,
      explanation: "نظرية الحوسبة الكونية تدرس إمكانية اعتبار الكون كله كنظام حوسبة عملاق.",
      difficulty: 'legendary'
    },
    {
      id: 349,
      text: "كيف تنشئ نظاماً يمتلك حدساً رياضياً؟",
      options: [
        "دمج الذكاء الاصطناعي مع الحدس الرياضي",
        "استخدام خوارزميات رياضية",
        "تحليل النظريات الرياضية",
        "محاكاة العقول الرياضية"
      ],
      correctAnswer: 0,
      explanation: "الحدس الرياضي في الأنظمة الحاسوبية يتطلب فهماً عميقاً لكيفية عمل العقل البشري في الرياضيات.",
      difficulty: 'legendary'
    },
    {
      id: 350,
      text: "ما هو مستقبل الحوسبة بعد حدود السيليكون؟",
      options: [
        "الحوسبة الكمومية والبيولوجية والجزيئية",
        "معالجات أسرع",
        "تقنيات النانو",
        "الحوسبة السحابية"
      ],
      correctAnswer: 0,
      explanation: "مستقبل الحوسبة يتجه نحو تقنيات ما بعد السيليكون مثل الحوسبة الكمومية والبيولوجية والجزيئية.",
      difficulty: 'legendary'
    }
  ];
}
}

import { isAppAccuplacer, isAppASVAB, isAppCDL, isAppCNA, isAppComptiaA, isAppDMV, isAppDrivingTheory, isAppG1, isAppGED, isAppMotorcycle, isAppPMP, isAppTEAS } from "../utils";

class Info {
    constructor({title, description}){
        this.title = title;
        this.description = description;
    }
}

class NumberInfo {
    constructor({ number1, number2, number3 }){
        this.number1 = number1;
        this.number2 = number2;
        this.number3 = number3;
    }
}

class MainColor {
    constructor({ colorFooter, mainColor, screenShotColor, buttonHeader }){
        this.colorFooter = colorFooter;
        this.mainColor = mainColor;
        this.screenShotColor = screenShotColor;
        this.buttonHeader = buttonHeader;
    }
}

export default class WebAppInfo {
    constructor({
        header,
        block1,
        block2,
        block3,
        block5,
        numberInfo,
        appName,
        mainColor
    }) {
        if(!appName){
            appName = ''
        }
        if(!header){
            header = new Info({
                title: "FREE "+appName+" PRACTICE TEST",
                description: `These practice questions will give you an idea of what to study for the ${appName} exam. 
                    Start your preparation with our free ${appName} practice test questions.
                    Practice with us and get the resources you need to succeed on your first try!`,
            })
        }
        if(!block1){
            block1 = [
                new Info({
                    title: "Free "+appName+" practice test",
                    description: `More effective than traditional ${appName}
                    classes. Every practice test is based on
                    authentic exam questions, and you can
                    study at your own pace. We'll shuffle the
                    questions every time you restart a test.`
                }),
                new Info({
                    title: "No registration or Login required",
                    description: `In the free mode, your test progress is
                    saved without an account, even if you
                    close your browser. No usernames or
                    passwords to remember - just frictionless ${appName} training.`
                }),
                new Info({
                    title: "Exam like the real test:",
                    description: `See if you're ready for the real thing with
                    the ${appName} Exam Simulator.`
                })
            ];
        }
        if(!block2){
            block2 = [
                new Info({
                    title: appName + " Exam Overview",
                    description: `The test measures your general knowledge.`,
                }),
                new Info({
                    title: "Free "+appName+" practice test",
                    description: `Our free practice test for the ${appName} test will help you find out where you 
                        need to work more and make the most of your study time.`,
                }),
                new Info({
                    title: 'Exam like the real test',
                    description: `Our ${appName} practice test has like the real test.`
                }),
                new Info({
                    title: "Detailed explanation",
                    description: `Every question has a detailed explanation. It helps you a lot when studying by yourself.`
                })
            ];
        }
        if(!block3){
            block3 = new Info({
                title: "Scientifically proven",
                description: `Research shows that studying in the same way that you’ll be tested can increase 
                    your self-assurance, as well as your ability to focus on the test questions. 
                    We’ve designed our website training course to duplicate the exam experience, so it becomes familiar.`
            })
        }
        if(!block5){
            block5 = new Info({
                title: "Total confidence. This is what you get",
                description: `You’ve finished your ${appName} course (or some other nursing assistant training program)
                    and now it’s time to prepare for your certification exam. You may have heard that the examination is challenging.
                    Maybe you’re even a little worried about passing. Wouldn’t it be great if you could be totally confident
                    when you walk in to take the test? With our help, you can!`
            })
        }
        if(!numberInfo){
            numberInfo = new NumberInfo({
                number1: 0,
                number2: 50,
                number3: 120
            });
        }
        if(!mainColor){
            mainColor = new MainColor({
                colorFooter: "#5B6695",
                mainColor: "#5B6695",
                screenShotColor: "#5B6695",
                buttonHeader: "#FAFAFA"
            })
        }
        this.header = header;
        this.block1 = block1;
        this.block2 = block2;
        this.block3 = block3;
        this.block5 = block5;
        this.numberInfo = numberInfo;
        this.mainColor = mainColor;
    }

    static getAppInfo(appId, appName) {
        if(isAppTEAS(appId)){
            return this.getTEAS();
        }
        if(isAppCDL(appId)){
            return this.getCDL();
        }
        if(isAppASVAB(appId)){
            return this.getASVAB();
        }
        if(isAppDMV(appId)){
            return this.getDMV();
        }
        if(isAppGED(appId)){
            return this.getGED();
        }
        if(isAppComptiaA(appId)){
            return this.getComptiaA();
        }
        if(isAppDrivingTheory(appId)){
            return this.getDrivingTheory();
        }
        if(isAppPMP(appId)){
            return this.getPMP();
        }
        if(isAppAccuplacer(appId)){
            return this.getAccuplacer();
        }
        if(isAppG1(appId)){
            return this.getG1();
        }
        let _this = new WebAppInfo({ appName: appName });
        if(isAppCNA(appId)){
            _this.mainColor = new MainColor({
                colorFooter: "#1C7BBE",
                mainColor: "#1C7BBE",
                screenShotColor: "#82AFD1",
                buttonHeader: "#1C7BBE"
            })
        }
        if(isAppMotorcycle(appId)){
            _this.mainColor = new MainColor({
                colorFooter: "#4E63BD",
                mainColor: "#495EBF",
                screenShotColor: "#6679CC",
                buttonHeader: "#FAFAFA"
            })
        }
        return _this;
    }

    static getTEAS() {
        return new WebAppInfo({
            header: new Info({
                title: "FREE TEAS PRACTICE TEST",
                description: `These practice questions will give you an idea of what to study for the TEAS exam. 
                    Start your preparation with our free TEAS practice test questions.
                    Practice with us and get the resources you need to succeed on your first try!`,
            }),
            block1: [
                new Info({
                    title: "Free TEAS practice test",
                    description: `More effective than traditional TEAS
                    classes. Every practice test is based on
                    authentic exam questions, and you can
                    study at your own pace. We'll shuffle the
                    questions every time you restart a test.`
                }),
                new Info({
                    title: "No registration or Login required",
                    description: `In the free mode, your test progress is
                    saved without an account, even if you
                    close your browser. No usernames or
                    passwords to remember - just frictionless TEAS training.`
                }),
                new Info({
                    title: "Exam like the real test:",
                    description: `See if you're ready for the real thing with
                    the TEAS Exam Simulator
                    Same number of questions presented
                    the same way as the Nurse Aide exam.`
                })
            ],
            block2: [
                new Info({
                    title: "TEAS Exam Overview",
                    description: `The test measures your general knowledge of four subjects: Mathematics, 
                        Science, English and Language Usage, and Reading. The latest updated 
                        version is the ATI TEAS (also referred to as the TEAS 6). There are 2 
                        versions of the test: electronic and paper and pencil. The type of test 
                        you take depends on where you are taking it. The content on the test is 
                        the same no matter which version you take.`,
                }),
                new Info({
                    title: "Free TEAS practice test",
                    description: `Our free practice test for the TEAS test will help you find out where you 
                        need to work more and make the most of your study time.`,
                }),
                new Info({
                    title: 'Exam like the real test',
                    description: `Our TEAS practice test has four subjects: Mathematics, Science, 
                        English and Language Usage, and Read like the real test.`
                }),
                new Info({
                    title: "Detailed explanation",
                    description: `Every question has a detailed explanation. It helps you a lot when studying by yourself.`
                })
            ],
            block3: new Info({
                title: 'Practice every time',
                description: `You can practice every time you want with our free ATI TEAS VI practice test. The more you practice, 
                    the higher score you can get. Practice actual TEAS questions and answers are effective to study.`
            }),
            block5: new Info({
                title: 'Save your time',
                description: `Our free  ATI TEAS VI practice test will save your time. You can use it whenever you are free. 
                    Our free ATI TEAS VI questions are like the real test so you can be similar to the real test and find 
                    your strengths and then concentrate on the areas you need to work hard on.`
            }),
            numberInfo: new NumberInfo({
                number1: "$100",
                number2: "Maximum 170 questions",
                number3: "209 minutes"
            })
        });
    }

    static getCDL() {
        return new WebAppInfo({
            header: new Info({
                title: "FREE CDL PRACTICE TEST",
                description: `If you are preparing for the DMV driving permit test and driver's license exam, 
                    try our free DMV practice test. That's very similar to the real DMV test. 
                    Practice with these sample tests and know what you need to study for this test.`,
            }),
            block1: [
                new Info({
                    title: "Free CDL practice test",
                    description: `More effective than traditional CDL
                    classes. Every practice test is based on
                    authentic exam questions, and you can
                    study at your own pace. We'll shuffle the
                    questions every time you restart a test.`
                }),
                new Info({
                    title: "No registration or Login required",
                    description: `In the free mode, your test progress is
                    saved without an account, even if you
                    close your browser. No usernames or
                    passwords to remember - just frictionless CDL training.`
                }),
                new Info({
                    title: "Exam like the real test",
                    description: `See if you're ready for the real thing with
                    the CDL Exam Simulator
                    Same number of questions presented
                    the same way as the Nurse Aide exam.`
                })
            ],
            block2: [
                new Info({
                    title: "CDL Exam Overview",
                    description: `Our thousands of FREE Commercial driver license practice questions and tests will 
                        ensure that you are completely prepared, taking you to the right direction to beginning an 
                        exciting career in trucking. From dump truck to passenger bus and even tractor trailer CDL 
                        driver training in all states, we divide each knowledge domain into small parts. 
                        All you need to do is taking your study round by round like a mini game with fully detailed 
                        explanations for each question!`,
                }),
                new Info({
                    title: "Free CDL practice test",
                    description: `We have hundreds of free CDL practice questions for you. It will ensure that 
                        you are completely prepared, taking you to the right direction to passing your CDL.`,
                }),
                new Info({
                    title: 'Exams like the real test',
                    description: `Our free CDL practice test gives you hundreds of free CDL 
                        practice questions like the real test with three types of CDL classes.`
                }),
                new Info({
                    title: "Detailed explanation",
                    description: `Every question has a detailed explanation. It helps you a lot when studying by yourself.`
                })
            ],
            block3: new Info({
                title: 'Familiar with the test',
                description: `Most drivers do not know how to study for these tests for the first time. 
                    Others do not know how to remember the amount of information that they think they need to know. 
                    Our free CDL practice test will help you study. When using sample questions like the real test 
                    you will be familiar with the test.`
            }),
            block5: new Info({
                title: 'Know information in your state’s driver manual',
                description: `Make sure that you know about it. Every state has a drivers manual and makes 
                    sure that you focus only on the areas that you are required to. It will help you a lot.`
            }),
            numberInfo: new NumberInfo({
                number1: "Varies depending on state",
                number2: "20-50 varies depending on state",
                number3: "45-60 minutes"
            }),
            mainColor: new MainColor({
                colorFooter: "#5B6695",
                mainColor: "#5B6695",
                screenShotColor: "#5B6695",
                buttonHeader: "#FAFAFA"
            })
        });
    }

    static getASVAB() {
        return new WebAppInfo({
            header: new Info({
                title: "FREE ASVAB PRACTICE TEST",
                description: `If you're nervous about the ASVAB test for the first time, 
                    try our free ASVAB practice test. It’s designed like the real test. 
                    Practice with us and get the resources you need to succeed on your first try!`,
            }),
            block1: [
                new Info({
                    title: "Free ASVAB practice test",
                    description: `More effective than traditional ASVAB
                    classes. Every practice test is based on
                    authentic exam questions, and you can
                    study at your own pace. We'll shuffle the
                    questions every time you restart a test.`
                }),
                new Info({
                    title: "No registration or Login required",
                    description: `In the free mode, your test progress is
                    saved without an account, even if you
                    close your browser. No usernames or
                    passwords to remember - just frictionless ASVAB training.`
                }),
                new Info({
                    title: "Exam like the real test",
                    description: `See if you're ready for the real thing with
                    the ASVAB Exam Simulator.`
                })
            ],
            block2: [
                new Info({
                    title: "ASVAB Exam Overview",
                    description: `Our thousands of FREE Commercial driver license practice questions and tests will 
                        ensure that you are completely prepared, taking you to the right direction to beginning an 
                        exciting career in trucking. From dump truck to passenger bus and even tractor trailer ASVAB 
                        driver training in all states, we divide each knowledge domain into small parts. 
                        All you need to do is taking your study round by round like a mini game with fully detailed 
                        explanations for each question!`,
                }),
                new Info({
                    title: "Free ASVAB practice test",
                    description: `Hundreds of ASVAB practice questions help you pass your test and get started with a career in the army.`,
                }),
                new Info({
                    title: 'Exam like the real test',
                    description: `Our ASVAB practice test must be completed in a specific time limit and has 4 domains like the real test.`
                }),
                new Info({
                    title: "Detailed explanation",
                    description: `Every question has a detailed explanation. It helps you a lot when studying by yourself.`
                })
            ],
            block3: new Info({
                title: 'The ASVAB test is not hard',
                description: `You can find the right preparation, use of a quality study guide, and working hard. 
                    The more you practice, the higher score you can get. So you pass the test easily.`
            }),
            block5: new Info({
                title: 'The best way to pass the ASVAB is to study for it',
                description: `You can read through the book, talk to others who have taken the test 
                    and practice with our free ASVAB practice test as much as you can.`
            }),
            numberInfo: new NumberInfo({
                number1: "Free",
                number2: "154 in computer-based and 225 in paper-based ASVAB",
                number3: "154 minutes"
            }),
            mainColor: new MainColor({
                colorFooter: "#8A8862",
                mainColor: "#8A8862",
                screenShotColor: "#A6A480",
                buttonHeader: "#FAFAFA"
            })
        });
    }

    static getDMV() {
        return new WebAppInfo({
            header: new Info({
                title: "FREE DMV PRACTICE TEST",
                description: `If you are preparing for the DMV driving permit test and driver's 
                    license exam, try our free DMV practice test. That's very similar to the real DMV test. 
                    Practice with these sample tests and know what you need to study for this test.`,
            }),
            block1: [
                new Info({
                    title: "Free DMV practice test",
                    description: `More effective than traditional DMV
                    classes. Every practice test is based on
                    authentic exam questions, and you can
                    study at your own pace. We'll shuffle the
                    questions every time you restart a test.`
                }),
                new Info({
                    title: "No registration or Login required",
                    description: `In the free mode, your test progress is
                    saved without an account, even if you
                    close your browser. No usernames or
                    passwords to remember - just frictionless DMV training.`
                }),
                new Info({
                    title: "Exam like the real test",
                    description: `See if you're ready for the real thing with
                    the DMV Exam Simulator.`
                })
            ],
            block2: [
                new Info({
                    title: "DMV Exam Overview",
                    description: `Our thousands of FREE driver license practice questions and tests will 
                    ensure that you are completely prepared, taking you to the right direction to passing 
                    your DMV. We divide each knowledge domains into small parts. All you need to do is 
                    taking your study round by round as a mini game with fully detailed explanations for each questions!`,
                }),
                new Info({
                    title: "Free DMV practice test",
                    description: `We have hundreds of free DMV practice questions for you. It will ensure that you are 
                        completely prepared, taking you to the right direction to passing your DMV.`,
                }),
                new Info({
                    title: 'Exam like the real test',
                    description: `Study the main topics of the test: General Knowledge, Signs & Road Situations, 
                        Fines and limits … All of them are like the real test.`
                }),
                new Info({
                    title: "Detailed explanation",
                    description: `Every question has a detailed explanation. It helps you a lot when studying by yourself.`
                })
            ],
            block3: new Info({
                title: 'Familiar with the test',
                description: `Most drivers do not know how to study for these tests for the first time. 
                    Others do not know how to remember with the amount of information that they think they 
                    need to study. Our free DMV practice test which uses sample questions like the real test will help you study.`
            }),
            block5: new Info({
                title: 'Know information in your state’s driver manual',
                description: `Make sure that you know about it. Every state has a drivers manual 
                    and makes sure that you focus only on the areas that you are required to. It will help you a lot.`
            }),
            numberInfo: new NumberInfo({
                number1: "Varies depending on state",
                number2: "20-50 varies depending on state",
                number3: "20-20 minutes"
            }),
            mainColor: new MainColor({
                colorFooter: "#4E63BD",
                mainColor: "#495EBF",
                screenShotColor: "#6679CC",
                buttonHeader: "#FAFAFA"
            })
        });
    }

    static getGED() {
        return new WebAppInfo({
            header: new Info({
                title: "FREE GED PRACTICE TEST",
                description: `Is the GED test hard? Our GED practice tests are perfect 
                    for your test prep and review with an interactive format. 
                    These practice questions and explanations will give you what you need to study.`,
            }),
            block1: [
                new Info({
                    title: "Free GED practice test",
                    description: `More effective than traditional GED
                    classes. Every practice test is based on
                    authentic exam questions, and you can
                    study at your own pace. We'll shuffle the
                    questions every time you restart a test.`
                }),
                new Info({
                    title: "No registration or Login required",
                    description: `In the free mode, your test progress is
                    saved without an account, even if you
                    close your browser. No usernames or
                    passwords to remember - just frictionless GED training.`
                }),
                new Info({
                    title: "Exam like the real test",
                    description: `See if you're ready for the real thing with
                    the GED Exam Simulator.`
                })
            ],
            block2: [
                new Info({
                    title: "GED Exam Overview",
                    description: `The GED test is consists of 4 subjects, broken into separate exams: 
                        Math, Reasoning Through Language Arts, Science, and Social study. These tests are 
                        designed to ensure that individuals who earn their GED have the skills and knowledge 
                        equivalent to high school graduates. You don’t have to take all 4 tests at once - 
                        you can space them out however it suits you and go at your own pace.`,
                }),
                new Info({
                    title: "Free GED practice test",
                    description: `We have hundreds of free GED practice questions for you. Practice with our free GED 
                        practice test will help you find out where you need to study and make the most of your study time.`,
                }),
                new Info({
                    title: 'Exam like the real test',
                    description: `Study the main topics of the test; Math, Science, English… All of them are like the real test.`
                }),
                new Info({
                    title: "Detailed explanation",
                    description: `Every question has a detailed explanation. It helps you a lot when studying by yourself.`
                })
            ],
            block3: new Info({
                title: 'Knowledge gaps by taking free practice tests',
                description: `Taking multiple free practice tests is helpful to find your
                     knowledge gaps. Ut doesn’t waste your time and you should try.`
            }),
            block5: new Info({
                title: 'Taking practice tests is a highly useful',
                description: `Taking practice tests is a highly useful tool for identifying your weaknesses and 
                    strengths. If you use the information that you get through practice tests wisely, 
                    you can much easier create an individual study plan for yourself efficiently.`
            }),
            numberInfo: new NumberInfo({
                number1: "120 for 4 sections",
                number2: "Maximum 161 questions",
                number3: "445 minutes"
            }),
            mainColor: new MainColor({
                colorFooter: "#E07730",
                mainColor: "#FA8E45",
                screenShotColor: "#FFA86C",
                buttonHeader: "#FA8E45"
            })
        });
    }

    static getComptiaA() {
        return new WebAppInfo({
            header: new Info({
                title: "FREE CompTIA A+ PRACTICE TEST",
                description: `Our free CompTIA A+ practice test includes everything you need to 
                    know to ace your upcoming A+ exam. It will give you a good idea of the kinds 
                    of questions you may see for A+ and know what you need to work hard for this test.`,
            }),
            block1: [
                new Info({
                    title: "Free CompTIA A+ practice test",
                    description: `More effective than traditional CompTIA A+
                    classes. Every practice test is based on
                    authentic exam questions, and you can
                    study at your own pace. We'll shuffle the
                    questions every time you restart a test.`
                }),
                new Info({
                    title: "No registration or Login required",
                    description: `In the free mode, your test progress is
                    saved without an account, even if you
                    close your browser. No usernames or
                    passwords to remember - just frictionless CompTIA A+ training.`
                }),
                new Info({
                    title: "Exam like the real test",
                    description: `See if you're ready for the real thing with
                    the CompTIA A+ Exam Simulator.`
                })
            ],
            block2: [
                new Info({
                    title: "CompTIA A+ Exam Overview",
                    description: `The CompTIA A+ certification lays the groundwork for all IT careers. 
                        Obtaining this certification indicates a thorough understanding of the basic 
                        components of PC installation and troubleshooting. It is required for those 
                        interested in a career in a wide range of IT support and security jobs. 
                        There are two CompTIA A+ exams that must be taken before you are certified - 
                        CompTIA A+ 220-1001 and CompTIA A+ 220-1002.`,
                }),
                new Info({
                    title: "Contains the complete Revision questions",
                    description: `Contains the complete Revision questions by the expert with detailed explanations.`,
                }),
                new Info({
                    title: 'Practice by topics',
                    description: `Test your knowledge by practicing by topics. CompTIA® A+ Exam Training divided topics into small parts helps you not be bored when studying.`
                }),
                new Info({
                    title: "Mock test",
                    description: `Mock test simulates the real test format. When you finish the test you will see your score and review all the questions.`
                })
            ],
            block3: new Info({
                title: 'COMPTIA A+ 220-901',
                description: `COMPTIA A+ 220-901 includes four main domains, each with several subdomains like Hardware- 34 %, 
                    Networking- 21%, Mobile Devices -17%, Hardware and Network Troubleshoooting- 28%. There is a lot to know 
                    and our free practice tests for the COMPTIA A+ 220-901 test will help you find out where you need to work more.`
            }),
            block5: new Info({
                title: 'COMPTIA A+ 220-902',
                description: `COMPTIA A+ 220-902 includes fine main domains, each with several subdomains 
                    like Windows Operating Systems- 29 %, Other OS and Technologies - 2%, SEcurity 22%, Software 
                    Troubleshooting 28%, Operational Procedures: 13%. This COMPTIA A+ app is organized to closely
                    follow the actual objectives for the CompTIA A+.`
            }),
            numberInfo: new NumberInfo({
                number1: "$340",
                number2: "No more than 90 questions each core",
                number3: "90 minutes"
            })
        });
    }

    static getDrivingTheory() {
        return new WebAppInfo({
            header: new Info({
                title: "Driving Theory UK Practice Test 2020",
                description: `Prepare for your driving theory test with ABC elearning. All of the multiple-choice 
                    questions you'll see on our Driving Theory UK Practice Test is similar to the official exam. 
                    Practice with these sample tests and know what you need to study for this test.`,
            }),
            block1: [
                new Info({
                    title: "Free Driving theory UK practice test",
                    description: `More effective than traditional Driving theory
                    classes. Every practice test is based on
                    authentic exam questions, and you can
                    study at your own pace. We'll shuffle the
                    questions every time you restart a test.`
                }),
                new Info({
                    title: "No internet connection and registration required",
                    description: `In the free mode, your test progress is
                    saved without an account, even if you
                    close your browser. No usernames or
                    passwords to remember - just frictionless Driving theory training.`
                }),
                new Info({
                    title: "FREE and minimum ads that annoy you",
                    description: `See if you're ready for the real thing with
                    the Driving theory Exam Simulator.`
                })
            ],
            block2: [
                new Info({
                    title: "Driving theory UK practice test overview",
                    description: `We have designed this Driving Theory UK Practice Test 2020 tool to make 
                        learning process super easy and interesting. It’s proven fact that learning new things
                        in proper way helps you remember things quickly and for long-term!`,
                }),
                new Info({
                    title: "Practice by topics",
                    description: `Test your knowledge by practicing by topics. Driving Theory UK Practice Test 2020 
                        divides topics into small parts helps you not be bored when studying.`,
                }),
                new Info({
                    title: 'Mock test',
                    description: `Mock test simulates the real test format. When you finish the test you will see your score and review all the questions.`
                }),
                new Info({
                    title: "New questions every time",
                    description: `To keep you on your toes, we randomize questions and answers each time you restart a practice test.`
                })
            ],
            block3: new Info({
                title: 'Familiar with the test',
                description: `Most drivers do not know how to study for these tests for the first time. 
                    Others do not know how to remember with the amount of information that they think they need to study. 
                    Our free DMV practice test which uses sample questions like the real test will help you study.`
            }),
            block5: new Info({
                title: 'Know information in your state’s driver manual',
                description: `Make sure that 
                    you know about it. Every state has a drivers manual and makes sure that 
                    you focus only on the areas that you are required to. It will help you a lot.`
            }),
            numberInfo: new NumberInfo({
                number1: "$23",
                number2: "Maximum 50 questions",
                number3: "57 minutes"
            })
        });
    }

    static getPMP() {
        return new WebAppInfo({
            header: new Info({
                title: "PMP Exam Prep 6th edition",
                description: `A free practice test for the Project Management Professional PMP Exam. 
                    It will help you know what you need to improve for this test.`,
            }),
            block1: [
                new Info({
                    title: "PMP Exam Prep 6th edition",
                    description: `More effective than traditional PMP
                    classes. Every practice test is based on
                    authentic exam questions, and you can
                    study at your own pace. We'll shuffle the
                    questions every time you restart a test.`
                }),
                new Info({
                    title: "No internet connection and registration required",
                    description: `In the free mode, your test progress is
                    saved without an account, even if you
                    close your browser. No usernames or
                    passwords to remember - just frictionless PMP training.`
                }),
                new Info({
                    title: "FREE and minimum ads that annoy you",
                    description: `See if you're ready for the real thing with
                    the PMP Exam Simulator.`
                })
            ],
            block2: [
                new Info({
                    title: "PMP Exam Prep 6th edition practice test overview",
                    description: `The Project Management Professional (PMP®) certification is a difficult 
                        exam that is for only highly-experienced project managers. The Project Management 
                        Institute (PMI®) has decreed that only candidates with proven leadership ability 
                        and an extensive record of project management meet the requirements of this certification. 
                        The PMP® test covers the five stages of the project management process.`,
                }),
                new Info({
                    title: "Contains the complete Revision questions",
                    description: `Contains the complete Revision questions by the expert with detailed explanations.`,
                }),
                new Info({
                    title: 'Practice by topics',
                    description: `Test your knowledge by practicing by topics. PMP Exam Prep 6th edition app divides topics into small parts helps you not be bored when studying.`
                }),
                new Info({
                    title: "Mock test",
                    description: `Mock test simulates the real test format. When you finish the test you will see your score and review all the questions.`
                })
            ],
            block3: new Info({
                title: 'New questions every time',
                description: `To keep you on your toes, we randomize questions and answers each time you restart a practice test.`
            }),
            block5: new Info({
                title: 'Save your time',
                description: `Our free  PMP practice test will save your time. You can use it whenever you are free. 
                    Our free PMP questions are like the real test so you can be similar to the real test and find your 
                    strengths and then concentrate on the areas you need to work hard on.`
            }),
            numberInfo: new NumberInfo({
                number1: "$405 for PMI members and $555 for non-PMI members",
                number2: "Maximum 200 questions",
                number3: "240 minutes"
            })
        });
    }

    static getAccuplacer() {
        return new WebAppInfo({
            header: new Info({
                title: "COLLEGE BOARD ACCUPLACER STUDY APP",
                    description: `ACCUPLACER tests help colleges make accurate course placement decisions and 
                    set students up for success. So you need to prepare for this test. Our Accuplacer practice 
                    test will help you a lot. Let’s try it!`,
            }),
            block1: [
                new Info({
                    title: "Free Accuplacer practice test",
                    description: `More effective than traditional Accuplacer
                    classes. Every practice test is based on
                    authentic exam questions, and you can
                    study at your own pace. We'll shuffle the
                    questions every time you restart a test.`
                }),
                new Info({
                    title: "No registration or Login required",
                    description: `In the free mode, your test progress is
                    saved without an account, even if you
                    close your browser. No usernames or
                    passwords to remember - just frictionless Accuplacer training.`
                }),
                new Info({
                    title: "FREE and minimum ads that annoy you",
                    description: `See if you're ready for the real thing with
                    the Accuplacer Exam Simulator.`
                })
            ],
            block2: [
                new Info({
                    title: "Accuplacer practice test overview",
                    description: `ACCUPLACER® test scores are used to place students in college-level courses that
                         are appropriately challenging and not wildly above their skill level. When it comes to higher education, preparation is key.`,
                }),
                new Info({
                    title: "Contains the complete Revision questions",
                    description: `Contains the complete Revision questions by the expert with detailed explanations.`,
                }),
                new Info({
                    title: 'Practice by topics',
                    description: `Test your knowledge by practicing by topics. PMP Exam Prep 6th edition app divides topics into small parts helps you not be bored when studying.`
                }),
                new Info({
                    title: "Mock test",
                    description: `Mock test simulates the real test format. When you finish the test you will see your score and review all the questions.`
                })
            ],
            block3: new Info({
                title: 'Familiar with the test',
                description: `Our free practice questions for the Accuplacer test will help you study. 
                    When using sample questions like the real test you will be familiar with the test.`
            }),
            block5: new Info({
                title: 'New questions every time',
                description: `To keep you on your toes, we randomize questions and answers each time you restart a practice test.`
            }),
            numberInfo: new NumberInfo({
                number1: "Ranging from about $15 to $50",
                number2: "Maximum 40 questions",
                number3: "90 minutes"
            })
        });
    }

    static getG1() {
        return new WebAppInfo({
            header: new Info({
                title: "G1 Practice Test 2020",
                description: `If you are prepare for G1 test, this is app you need to try. Our G1 practice 
                    test is just like the actual G1 test. You can know what you need to study when using this app.`,
            }),
            block1: [
                new Info({
                    title: "Free G1 practice test",
                    description: `More effective than traditional G1 practice
                    classes. Every practice test is based on
                    authentic exam questions, and you can
                    study at your own pace. We'll shuffle the
                    questions every time you restart a test.`
                }),
                new Info({
                    title: "No registration or Login required",
                    description: `In the free mode, your test progress is
                    saved without an account, even if you
                    close your browser. No usernames or
                    passwords to remember - just frictionless G1 training.`
                }),
                new Info({
                    title: "FREE and minimum ads that annoy you",
                    description: `See if you're ready for the real thing with
                    the G1 Exam Simulator.`
                })
            ],
            block2: [
                new Info({
                    title: "G1 practice test overview",
                    description: `We have designed this G1 Practice Test 2020 tool to make learning process super 
                        easy and interesting. It’s proven fact that learning new things in proper way helps you remember things quickly and for long-term!`,
                }),
                new Info({
                    title: "Realistic",
                    description: `Just like the actual G1 test, our practice tests are based on the 
                        official 2018 driver's manual issued by the MTO (Ministry of Transportation of Ontario)`,
                }),
                new Info({
                    title: 'Detailed explanations',
                    description: `When you make a mistake, the app tells you straight away if a question is wrong and why. 
                        There is a reference to the exact chapter in the handbook. You understand and remember every wrong answer.`
                }),
                new Info({
                    title: "Practice by topics",
                    description: `Test your knowledge by practicing by topics. G1 Practice Test 2020 divides topics into small parts helps you not be bored when studying.`
                })
            ],
            block3: new Info({
                title: 'Mock test',
                description: `Mock test simulates the real test format. When you finish the test you will see your score and review all the questions.`
            }),
            block5: new Info({
                title: 'New questions every time',
                description: `To keep you on your toes, we randomize questions and answers each time you restart a practice test.`
            }),
            numberInfo: new NumberInfo({
                number1: "$158.25",
                number2: "Maximum 40 questions",
                number3: "About 20-30 minutes but no hard limit"
            })
        });
    }
}
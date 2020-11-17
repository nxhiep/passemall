
class Config {

    static TEST_MODE = true;

    static USER_ID = 'kienxxx';
    static SECRET_KEY = "koolsoft-web";
    static BASE_URL = `https://micro-enigma-235001.appspot.com`;
    // static BASE_URL = `https://utestwebapi-dot-micro-enigma-235001.appspot.com`;
    static NULL_STRING = "";
    static API_GET_CARDS_BY_IDS = "/get-card-by-ids";
    static API_GET_CARDS_FOR_TEST_SETTING = "/data?type=get_cards_for_test";
    static HTTP_REQUEST_TIMEOUT = 30000;
    static HTTP_REQUEST_SUCCESSS = 200;
    static HTTP_REQUEST_ERROR = 500;
    static LIMIT_USER_RATING = 10;

    static GAME_STATUS_TESTING = 0;
    static WEAK_QUESTION = { id: 1, name: 'Weak Question', image: '/images/weak.svg' };
    static MEDIUM_QUESTION = { id: 2, name: 'Medium Question', image: '/images/medium.svg' };
    static STRONG_QUESTION = { id: 3, name: 'Strong Question', image: '/images/strong.svg' };
    static ALL_FAMILIAR_QUESTION = { id: 4, name: 'All Familiar Question', image: '/images/test.svg' };
    static YOUR_FAVORITE_QUESTION = { id: 5, name: 'Your Favorite Question', image: '/images/heart.svg' };
    static LEVEL_QUESTION = [this.WEAK_QUESTION, this.MEDIUM_QUESTION, this.STRONG_QUESTION, this.ALL_FAMILIAR_QUESTION, this.YOUR_FAVORITE_QUESTION];
    static STUDY_GAME = 0;
    static TEST_GAME = 1;
    static REVIEW_GAME = 2;

    static GAME_STATUS_FAILED = -1;
    static GAME_STATUS_TESTING = 0;
    static GAME_STATUS_PASSED = 4;

    static QUESTION_NOT_ANSWERED = 0;
    static QUESTION_ANSWERED_INCORRECT = 1;
    static QUESTION_ANSWERED_CORRECT = 2;
    static QUESTION_ANSWERED_SKIP = 3;
    static QUESTION_SELECTED = 4;
    static START_STATUS = 0;
    static PLAYING_STATUS = 1;
    static FINISHED_STATUS = 2;

    static NEXT_PART_PROGRESS = 100;

    static TEST_TOTAL_QUESTION = 50;
    static TEST_ALLOW_MISTAKE = 15;
    static RECENT_POSTS_KEY = "RECENT_POSTS_KEY";
    static EASY_LEVEL = 1;
    static HARD_LEVEL = 2;
    static VERY_HARD_LEVEL = 3;

    static TEST_STATUS_NOTHING = 1;
    static TEST_STATUS_PLAYING = 3;
    static LISTBUCKET = ["ged", "cdl", "hesia2"]

    static APP_NEW_DOMAIN = 5722070642065408;
}
export default Config;
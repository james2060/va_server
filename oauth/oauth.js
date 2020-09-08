const passport = require("passport");

kakaoStrategy = require('passport-kakao').Strategy;

passport.use(new KakaoStragegy({
    clientId: clientID,
    clientSecret: clientSecret,
    callbackURL: callbackURL
},
function (accessToken, refreshToken, profile, done){
    //사용자의 정보는 profile에 저장된다.


}
))
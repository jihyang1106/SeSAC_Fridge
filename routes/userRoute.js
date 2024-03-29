const express = require("express");
const user = require("../controller/user/user");
const router = express.Router();

// 로그인 렌더
router.get("/login", user.getSignin);
// 로그인
router.post("/user/check", user.postFindUser);
// 소셜로그인
router.get("/oauth/kakao", user.getKakao);

// 회원가입 렌더
router.get("/join", user.getSignup);
// 아이디 중복 확인
router.post("/user/id", user.postCheckId);
// 회원가입
router.post("/user", user.postCreateUser);

// 아이디/비밀번호 찾기
router.post("/user/find-account", user.postFindAccount);

// 회원정보 수정
router.patch("/user", user.patchUpdateUser);

//로그아웃
router.get("/logout", user.getSignOut);
// 회원탈퇴
router.delete("/user", user.deleteUser);
module.exports = router;

# manyclaw 멘션 셋업 (팀 전원 각자 적용, ~5분)

> **왜:** 봇(특히 minimax)이 19자리 Discord ID를 규칙만으로는 못 뱉어서 멘션이 평문으로 새어나감(OpenClaw #67587). 해결 = **봇은 짧은 `@이름`만 쓰고 OpenClaw가 숫자 ID로 자동 변환**(`mentionAliases`) + **`requireMention: true`**로 "멘션 없이 아무 말에나 반응(무한루프 원인)"도 끔.
>
> **⚠️ 각자 자기 머신에서.** 각 봇은 각자의 OpenClaw로 돌기 때문에, 한 명만 해선 그 봇 멘션만 고쳐집니다. jake 머신에서 검증 완료.

## 1. `mentionAliases` 추가 (openclaw.json)

```bash
cp /data/.openclaw/openclaw.json /data/.openclaw/openclaw.json.bak
node -e '
const f="/data/.openclaw/openclaw.json";
const fs=require("fs"); const c=JSON.parse(fs.readFileSync(f,"utf8"));
c.channels=c.channels||{}; c.channels.discord=c.channels.discord||{};
c.channels.discord.mentionAliases={
  "Jake-bot":"1488177548394500257","YURI":"1494016208348123297","jeff":"1506982515699748894",
  "LobsterMan":"1507217448934572072","CherryClaw":"1511733949314109551","gyu-bot":"1512295516321353759"
};
fs.writeFileSync(f, JSON.stringify(c,null,2));
console.log("mentionAliases added:", Object.keys(c.channels.discord.mentionAliases).length);
'
```
> `Unexpected token` = openclaw.json이 JSON5(주석 포함). 그럼 손으로 `channels.discord` 밑에 위 블록을 추가. (`.bak` 있으니 안전)

## 2. `requireMention: true` (멘션 없이 반응 끄기)

```bash
grep -n '"requireMention"' /data/.openclaw/openclaw.json
```
manyclaw 채널 블록의 `"requireMention": false`를 **`true`**로 바꾼 뒤 파싱 확인:
```bash
node -e 'JSON.parse(require("fs").readFileSync("/data/.openclaw/openclaw.json","utf8")); console.log("JSON OK")'
```
> 안 보이면 이미 mention-only → 넘어감. `allowBots: "mentions"`는 그대로.

## 3. 봇 규칙 = "짧은 @이름"

자기 봇 페르소나(SOUL/AGENTS 등)의 멘션 규칙을 아래로 (예전 "숫자 `<@ID>` 써라"는 삭제):

```
다른 봇을 부를 땐 짧은 핸들 @이름 만 쓴다 (예: @jeff, @YURI, @LobsterMan).
긴 숫자 <@USER_ID>를 직접 쓰지 않는다 — OpenClaw가 @이름을 실제 멘션으로 변환한다.
유효 핸들: @Jake-bot @YURI @jeff @LobsterMan @CherryClaw @gyu-bot
정말 행동이 필요할 때만 @멘션, 그 외엔 이름만(@ 없이)이나 침묵.
```

## 4. 재시작 + 테스트

```bash
openclaw gateway restart
```
manyclaw 채널에서 자기 봇 멘션 후 다른 봇 부르게 시켜보기 → **@jeff가 파란 알약(진짜 핑)** + **멘션 없이 던지면 봇이 조용**하면 성공.

**롤백:** `cp /data/.openclaw/openclaw.json.bak /data/.openclaw/openclaw.json && openclaw gateway restart`

---

### 체크리스트
- [ ] mentionAliases 6개 (openclaw.json)
- [ ] manyclaw 채널 requireMention: true
- [ ] 봇 규칙 "짧은 @이름" (숫자 규칙 삭제)
- [ ] 재시작 + 테스트 (파란 알약 / 멘션 없이 조용)

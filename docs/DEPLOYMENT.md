# 배포 & 도메인 셋업

현재 운영 구조와 재현 절차. 정식 `tgwing.kr` 전까지 임시 무료 도메인으로 띄워둔다.

- **도메인**: `tgwing.dpdns.org` (DigitalPlat FreeDomain, 무료·임시)
- **DNS**: Cloudflare (Free)
- **호스팅**: Vercel (Hobby)
- **production 트리거**: `main` push

도메인 선택 근거·`tgwing.kr` 현황은 [DECISIONS.md](./DECISIONS.md) 6·7번.

---

## 구조

```
방문자 → DNS 조회 → Vercel 엣지(216.198.79.1) → main의 production 배포
              │
   DigitalPlat(등록처) ──NS 위임──▶ Cloudflare(DNS) ──A/TXT──▶ Vercel
```

**등록처 / DNS / 호스팅이 셋으로 쪼개진 이유:** DigitalPlat은 레코드 편집 UI를 안 준다.
네임서버 위임만 가능(공식: "host it with your favorite DNS provider, like Cloudflare …").
그래서 레코드를 둘 곳으로 Cloudflare를 끼운다.

**왜 Cloudflare 무료 존이 먹히나:** Cloudflare Free는 보통 서브도메인을 독립 존으로 안 받는데,
`dpdns.org`가 [PSL](https://publicsuffix.org/)에 등록돼 있어 `tgwing.dpdns.org`를 apex처럼 취급 → Free 존 OK.
(DigitalPlat NS를 Vercel 네임서버로 직접 넘기는 것도 가능은 하지만, Cloudflare를 끼우면 검증 TXT·향후 레코드를
한 패널에서 관리할 수 있고 DigitalPlat 공식 권장 경로이기도 하다.)

---

## 셋업 절차

1. **Vercel** → Settings → Domains → `tgwing.dpdns.org` 추가. 요구 레코드 값을 받는다.
   (도메인이 과거 다른 Vercel 계정에 붙었던 적 있으면 소유권 증명 `TXT`도 같이 요구함.)
2. **Cloudflare** → Add a site → `tgwing.dpdns.org` → Free. 기존 레코드 스캔 0개 정상. NS 2개를 받는다.
3. **DigitalPlat** → Nameservers에 2번의 Cloudflare NS 입력 → Update. 전파되면 Cloudflare Active.
4. **Cloudflare DNS**에 레코드 2개:

   | Type | Name | Content | Proxy |
   |------|------|---------|-------|
   | A | `@` | `216.198.79.1` | **DNS only** |
   | TXT | `_vercel` | `vc-domain-verify=tgwing.dpdns.org,<토큰>` | — |

   토큰은 1번에서 Vercel이 준 값. TXT는 검증 후 제거 가능.
5. **Vercel** → Domains → Refresh. valid면 도메인 설정은 끝. SSL 인증서는 검증 시점에 발급되지만,
   실제 `https://` 서빙은 production 배포가 있어야 한다(없으면 접속 시 `DEPLOYMENT_NOT_FOUND`). 배포 후 1~2분.

---

## 함정

- **A 레코드 Proxy는 반드시 OFF(DNS only).** 주황 구름이면 Cloudflare가 트래픽을 가로채 Vercel SSL 발급이 막힌다. "설정 다 맞는데 https 안 됨"의 주범.
- **"No production deployment"는 DNS 문제 아님.** 도메인은 정상이고 `main`에 production 배포가 없는 것. 앱이 feature 브랜치에만 있으면 main 머지 전까지 뜬다.
- Vercel **Hobby로 충분**. 커스텀 도메인·SSL 무료. Pro 불필요(상업적 사용일 때만).

확인:
```bash
getent hosts tgwing.dpdns.org    # → 216.198.79.1
curl -s "https://cloudflare-dns.com/dns-query?name=_vercel.tgwing.dpdns.org&type=TXT" -H "accept: application/dns-json"
curl -sI http://tgwing.dpdns.org # Server: Vercel / DEPLOYMENT_NOT_FOUND 이면 배포 없음
```

---

## `tgwing.kr` 전환

Vercel은 프로젝트에 도메인 다중 연결 가능. 코드 변경 0.

1. Vercel Domains에 `tgwing.kr` 추가.
2. `tgwing.kr` DNS 관리처에 Vercel이 주는 레코드(apex A + 선택 `www` CNAME `cname.vercel-dns.com`).
3. `tgwing.kr`을 primary(Production)로 지정.
4. 안정화 후 `tgwing.dpdns.org` Remove(또는 301로 유지).

---

## 현재 값

| 항목 | 값 |
|------|-----|
| 도메인 | `tgwing.dpdns.org` |
| 등록처 | DigitalPlat FreeDomain |
| DNS | Cloudflare Free (NS 위임) |
| A | `@` → `216.198.79.1` (Vercel, Proxy off) |
| TXT | `_vercel` → `vc-domain-verify=…` |
| 호스팅 | Vercel Hobby |
| production | `main` push |

IP·NS 값은 정책 따라 바뀐다. 각 대시보드의 최신 값 기준.

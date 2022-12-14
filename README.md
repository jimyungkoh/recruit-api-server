# ๐ณ Wanted Recruit Demo App ~~Open!~~ ๐ณ

- ์ง์ ๊ธฐ๊ฐ์ด ์ข๋ฃ๋์๊ธฐ ๋๋ฌธ์, ์๋ฒ๋ฅผ ๋ซ์์ต๋๋ค.
- [์ปค๋ฐ ๋ก๊ทธ](https://github.com/jimyungkoh/wanted_pre_onboarding/commits) ํ์ธ์ ์์ง ๋ง์์ฃผ์ธ์! ์ปค๋ฐ์ ๋ง์ ๊ณต์ ๋ค์์ต๋๋ค.

# ๊ธฐ์  ์คํ

![tech_stack](https://user-images.githubusercontent.com/30682847/186264967-64cf4c71-a56a-4b5a-b1b9-036fe02d5f21.png)

# ERD

![erd](https://user-images.githubusercontent.com/30682847/186382296-7db72ff6-d2e5-439b-8517-30b31e3dee9a.png)

# ์๊ตฌ์ฌํญ ๋ถ์๊ณผ ๊ตฌํ ๊ณผ์ 

## 1. ์ฑ์ฉ๊ณต๊ณ ๋ฅผ ๋ฑ๋กํฉ๋๋ค.

- ํ ํ์ฌ๋ ์ฌ๋ฌ ๊ฐ์ ์ฑ์ฉ๊ณต๊ณ ๋ฅผ ๊ฒ์ํ  ์ ์๋ค(1:N).
- ํ์ฌ(company)๋ ํ์ฌ id์ ํ๋๊ฐ์ ์ด์ฉํด ์ฑ์ฉ๊ณต๊ณ ๋ฅผ ๋ฑ๋กํ  ์ ์๋ค.
- ํ์ฌ id๋ ์ฑ์ฉ๊ณต๊ณ (opening) ํ์ด๋ธ์ ์ธ๋ํค์ด๋ฏ๋ก ํ์ฌ ํ์ด๋ธ์ ์กด์ฌํ๋ ๊ฐ์ด์ด์ผ ํ๋ค.
- ํ์ฌ id๊ฐ ์กด์ฌํ์ง ์์ ๊ฒฝ์ฐ
  - 404(NotFound) ์๋ต์ ๋ณด๋ธ๋ค.
- ์ฑ์ฉ๊ณต๊ณ ๊ฐ ์ฑ๊ณต์ ์ผ๋ก ๋ฑ๋ก๋ ๊ฒฝ์ฐ
  - 201(Created) ์๋ต์ ๋ณด๋ธ ๋ค ๋ฑ๋ก ๊ฒฐ๊ณผ๋ฅผ json ํ์์ผ๋ก ๋ฐํํ๋ค.

![postOpening](https://user-images.githubusercontent.com/30682847/186269005-45f1acc1-f0a4-4fb4-95e6-1c87baa59a70.png)

## 2. ์ฑ์ฉ๊ณต๊ณ ๋ฅผ ์์ ํฉ๋๋ค.

- ์ฑ์ฉ๊ณต๊ณ (opening) ํ์ด๋ธ์ id ๊ฐ์ ํ๋ผ๋ฏธํฐ๋ก ๋ฐ๋๋ค.
- ์ฑ์ฉ๊ณต๊ณ  ํ์ด๋ธ์ id(id)์ ํ์ฌ id(company_id) ๊ฐ์ ๋ณ๊ฒฝํ  ์ ์๋ค.
- ์ฑ์ฉ๊ณต๊ณ  id ๊ฐ์ด ํ์ด๋ธ์ ์กด์ฌํ๋์ง ํ์ธํ ํ ์กด์ฌํ์ง ์๋๋ค๋ฉด
    - 404(NotFound) ์๋ต์ ๋ณด๋ธ๋ค.
- ๋ง์ฝ body์ ์ฑ์ฉ๊ณต๊ณ ์ id ๋๋ company_id๊ฐ ์๋ ฅ๋๋ค๋ฉด
    - 400(BadRequest) ์๋ต์ ๋ณด๋ธ๋ค.
- id ๊ฐ์ ์ ์ธํ ํ๋ (country, location, position, reward, content, tech_stack) ์ค ์์ ํ  ๋ฐ์ดํฐ๊ฐ body์ ์๋ ฅ๋๋ฉด
    - ์ฑ์ฉ๊ณต๊ณ ๋ฅผ ์์ ํ๊ณ  200(OK) ์๋ต์ ๋ณด๋ธ ๋ค ์์  ๊ฒฐ๊ณผ๋ฅผ json ํ์์ผ๋ก ๋ฐํํ๋ค.

![patchOpening](https://user-images.githubusercontent.com/30682847/186272000-a8904ce5-c56c-46ac-bbbf-bafb54ee072f.png)

## 3. ์ฑ์ฉ๊ณต๊ณ ๋ฅผ ์ญ์ ํฉ๋๋ค.

- ์ฑ์ฉ๊ณต๊ณ (opening) ํ์ด๋ธ์ id ๊ฐ์ ํ๋ผ๋ฏธํฐ๋ก ๋ฐ๋๋ค.
- ์ฑ์ฉ๊ณต๊ณ  id ๊ฐ์ด ํ์ด๋ธ์ ์กด์ฌํ๋์ง ํ์ธํ ํ
    - ์กด์ฌํ์ง ์๋๋ค๋ฉด 404(NotFound) ์๋ต์ ๋ณด๋ธ๋ค.
    - ์กด์ฌํ๋ค๋ฉด 200(OK) ์๋ต์ ๋ณด๋ธ ๋ค ์ญ์  ๊ฒฐ๊ณผ๋ฅผ json ํ์์ผ๋ก ๋ฐํํ๋ค.

![deleteOpening](https://user-images.githubusercontent.com/30682847/186272818-fc2fa54e-9f87-4e3c-83a7-8c8f65ae9ad1.png)

## 4. ์ฑ์ฉ๊ณต๊ณ  ๋ชฉ๋ก์ ๊ฐ์ ธ์ต๋๋ค.

### 4-1. ์ฌ์ฉ์๋ ์ฑ์ฉ๊ณต๊ณ  ๋ชฉ๋ก์ ์๋์ ๊ฐ์ด ํ์ธํ  ์ ์์ต๋๋ค.

- '์ฑ์ฉ ๋ด์ฉ' ํ๋๋ฅผ ์ ์ธํ ๋ชจ๋  ์ฑ์ฉ๊ณต๊ณ  ๋ฐ์ดํฐ๋ฅผ 200(OK) ์๋ต์ ๋ณด๋ธ ๋ค json ํ์์ผ๋ก ๋ฐํํ๋ค.

![getAllOpenings](https://user-images.githubusercontent.com/30682847/186274364-a984141f-f926-445b-88cd-bd204c8a5a63.png)

### 4-2. ์ฑ์ฉ๊ณต๊ณ  ๊ฒ์ ๊ธฐ๋ฅ ๊ตฌํ(์ ํ์ฌํญ ๋ฐ ๊ฐ์ฐ์ ์์).

- ์ซ์๊ฐ ์๋ ํ๋(country, location, position, content, tech_stack) ๊ฐ์ด ์ฟผ๋ฆฌ ํ๋ผ๋ฏธํฐ๋ก ์ ๋ฌ๋๋ค.
- ํ๋ผ๋ฏธํฐ ๊ฐ์ด ๋ค๊ธ์ ์ด์์ผ๋ก ๊ตฌ์ฑ๋์ด์ผ ํ๋ค(MySQL ๋ํดํธ ์ค์ ).
- fulltext search๋ฅผ ์ด์ฉํด ๊ฒ์ ๊ฒฐ๊ด๊ฐ์ 200(OK) ์๋ต์ ๋ณด๋ธ ๋ค json ํ์์ผ๋ก ๋ฐํํ๋ค.

![searchBy](https://user-images.githubusercontent.com/30682847/186275129-6db2d346-26cf-4926-af70-2cf0a1c020bb.png)

## 5. ์ฑ์ฉ ์์ธ ํ์ด์ง๋ฅผ ๊ฐ์ ธ์ต๋๋ค(์ฑ์ฉ๋ด์ฉ, ํด๋น ํ์ฌ๊ฐ ์ฌ๋ฆฐ ๋ค๋ฅธ ์ฑ์ฉ๊ณต๊ณ ๊ฐ ์ถ๊ฐ์ ์ผ๋ก ํฌํจ๋ฉ๋๋ค).

- id ๊ฐ์ ํ๋ผ๋ฏธํฐ๋ก ์๋ ฅ๋ฐ๋๋ค.
- id ๊ฐ์ด ์ฑ์ฉ ํ์ด๋ธ(opening)์ ์กด์ฌํ์ง ์๋๋ค๋ฉด,
  - 404(NotFound) ์๋ต์ ๋ณด๋ธ๋ค.
- ์กด์ฌํ๋ค๋ฉด,
  - ํ์ฌ๊ฐ ์ฌ๋ฆฐ ๋ค๋ฅธ ์ฑ์ฉ๊ณต๊ณ ๊ฐ ์๋ค๋ฉด 'other_openings_by_same_company' ๋ฆฌ์คํธ๋ฅผ ์์ฑํ๊ณ  ์ฑ์ฉ ์์ธ ํ์ด์ง์ ๋ถ์ฌ 
  - 200(OK) ์๋ต์ ๋ณด๋ธ ๋ค json ํ์์ผ๋ก ๋ฐํํ๋ค.

```json
{
  "id": 1,
  "country": "๋ํ๋ฏผ๊ตญ",
  "location": "์์ธ",
  "position": "๋ฐฑ์๋ ์์ง๋์ด",
  "reward": 5000000,
  "content": "wanted is waiting for you!",
  "tech_stack": "express",
  "company_id": 1,
  "other_openings_by_same_company": [
    2,
    16,
    17
  ]
}
```

![findOneById](https://user-images.githubusercontent.com/30682847/186276738-4a775850-7218-48c8-8a2a-0c3bfd177c74.png)

## 6. ์ฌ์ฉ์๋ ์ฑ์ฉ๊ณต๊ณ ์ ์ง์ํฉ๋๋ค(์ ํ์ฌํญ ๋ฐ ๊ฐ์ฐ์ ์์).

- ์ฌ์ฉ์(applicant)๋ ๋์ผํ ์ฑ์ฉ๊ณต๊ณ ์ 'ํ๋ฒ๋ง' ์ง์ ๊ฐ๋ฅํ๋ค.
- ์ฌ์ฉ์์ ์ฑ์ฉ๊ณต๊ณ  id ๊ฐ์  body์ ์๋ ฅ๋ฐ๋๋ค.
- ์ฌ์ฉ์(applicant)์ ์ฑ์ฉ๊ณต๊ณ (opening) ํ์ด๋ธ์ ํด๋น id๊ฐ ์กด์ฌํ์ง ์๋ ๊ฒฝ์ฐ
  - 404(NotFound) ์๋ต์ ๋ณด๋ธ๋ค.
- ์ฌ์ฉ์๊ฐ ๋์ผํ ์ฑ์ฉ๊ณต๊ณ ์ ์ง์ํ๋ ๊ฒฝ์ฐ (์ง์ ๋ด์ญ ํ์ด๋ธ์ opening_id, applicant_id๊ฐ ๋งค์นญ๋๋ ๋ฐ์ดํฐ๊ฐ ์๋ ๊ฒฝ์ฐ)
  - 400(BadRequest) ์๋ต์ ๋ณด๋ธ๋ค.
- ์ฑ๊ณต์ ์ผ๋ก ์ง์ ๋ด์ญ ํ์ด๋ธ์ ๋ฑ๋ก๋ ๊ฒฝ์ฐ
  - 201(Created) ์๋ต์ ๋ณด๋ธ ๋ค ๋ฑ๋ก ๊ฒฐ๊ณผ๋ฅผ json ํ์์ผ๋ก ๋ฐํํ๋ค.

![enrollApplicant](https://user-images.githubusercontent.com/30682847/186277678-6919b139-3510-4a6b-b058-ddd512e09db7.png)

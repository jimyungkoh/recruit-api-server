# 기술 스택

![tech_stack](https://user-images.githubusercontent.com/30682847/186264967-64cf4c71-a56a-4b5a-b1b9-036fe02d5f21.png)

# 요구사항 분석과 구현 과정

## 1. 채용공고를 등록합니다.

- 한 회사는 여러 개의 채용공고를 게시할 수 있다(1:N).
- 회사(company)는 회사 id와 필드값을 이용해 채용공고를 등록할 수 있다.
- 회사 id는 채용공고(opening) 테이블의 외래키이므로 회사 테이블에 존재하는 값이어야 한다.
- 회사 id가 존재하지 않을 경우
  - 404(NotFound) 응답을 보낸다.
- 채용공고가 성공적으로 등록된 경우
  - 200(Created) 응답을 보낸다.

![postOpening](https://user-images.githubusercontent.com/30682847/186269005-45f1acc1-f0a4-4fb4-95e6-1c87baa59a70.png)

## 2. 채용공고를 수정합니다.

- 채용공고(opening) 테이블의 id 값을 파라미터로 받는다.
- 채용공고 테이블의 id(id)와 회사 id(company_id) 값은 변경할 수 없다.
- 채용공고 id 값이 테이블에 존재하는지 확인한 후 존재하지 않는다면
    - 404(NotFound) 응답을 보낸다.
- 만약 body에 채용공고의 id 또는 company_id가 입력된다면
    - 400(BadRequest) 응답을 보낸다.
- id 값을 제외한 필드 (country, location, position, reward, content, tech_stack) 중 수정할 데이터가 body에 입력되면
    - 채용공고를 수정하고 200(Ok) 응답을 보낸다.

![patchOpening](https://user-images.githubusercontent.com/30682847/186272000-a8904ce5-c56c-46ac-bbbf-bafb54ee072f.png)

## 3. 채용공고를 삭제합니다.

- 채용공고(opening) 테이블의 id 값을 파라미터로 받는다.
- 채용공고 id 값이 테이블에 존재하는지 확인한 후
    - 존재하지 않는다면 404(NotFound) 응답을 보낸다.
    - 존재한다면 200(OK) 응답을 보낸다.

![deleteOpening](https://user-images.githubusercontent.com/30682847/186272818-fc2fa54e-9f87-4e3c-83a7-8c8f65ae9ad1.png)

## 4. 채용공고 목록을 가져옵니다.

### 4-1. 사용자는 채용공고 목록을 아래와 같이 확인할 수 있습니다.

- '채용 내용' 필드를 제외한 모든 채용공고 데이터를 200(OK) 응답을 보낸 뒤 json 형식으로 반환한다.

![getAllOpenings](https://user-images.githubusercontent.com/30682847/186274364-a984141f-f926-445b-88cd-bd204c8a5a63.png)

### 4-2. 채용공고 검색 기능 구현(선택사항 및 가산점요소).

- 숫자가 아닌 필드(country, location, position, content, tech_stack) 값이 쿼리 파라미터로 전달된다.
- 파라미터 값이 네글자 이상으로 구성되어야 한다(MySQL 디폴트 설정).
- fulltext search를 이용해 검색 결괏값을 200(OK) 응답을 보낸 뒤 json 형식으로 반환한다.

![searchBy](https://user-images.githubusercontent.com/30682847/186275129-6db2d346-26cf-4926-af70-2cf0a1c020bb.png)

## 5. 채용 상세 페이지를 가져옵니다(채용내용, 해당 회사가 올린 다른 채용공고가 추가적으로 포함됩니다).

- id 값을 파라미터로 입력받는다.
- id 값이 채용 테이블(opening)에 존재하지 않는다면,
  - 404(NotFound) 응답을 보낸다.
- 존재한다면,
  - 회사가 올린 다른 채용공고가 있다면 'other_openings_by_same_company' 리스트를 생성하고 채용 상세 페이지에 붙여 
  - 200(OK) 응답을 보낸 뒤 json 형식으로 반환한다.

```json
{
  "id": 1,
  "country": "대한민국",
  "location": "서울",
  "position": "백엔드 엔지니어",
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

## 6. 사용자는 채용공고에 지원합니다(선택사항 및 가산점요소).

- 사용자(applicant)는 동일한 채용공고에 '한번만' 지원 가능하다.
- 사용자와 채용공고 id 값을  body에 입력받는다.
- 사용자(applicant)와 채용공고(opening) 테이블에 해당 id가 존재하지 않는 경우
  - 404(NotFound) 응답을 보낸다.
- 사용자가 동일한 채용공고에 지원하는 경우 (지원 내역 테이블에 opening_id, applicant_id가 매칭되는 데이터가 있는 경우)
  - 400(BadRequest) 응답을 보낸다.
- 성공적으로 지원 내역 테이블에 등록된 경우
  - 201(Created) 응답을 보낸다.

![enrollApplicant](https://user-images.githubusercontent.com/30682847/186277678-6919b139-3510-4a6b-b058-ddd512e09db7.png)

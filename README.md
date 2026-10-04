# Iris Commerce Admin

일본 이커머스 관리자 서비스(데모). Express(WAS) + PostgreSQL. 금액은 JPY(税込), 날짜는 JST 기준.

UI 언어는 한국어(기본)/일본어. 사이드바에서 전환하고 선택은 브라우저 localStorage에 저장된다. 번역은 `public/app.js`의 `I18N`에 있고, API 에러는 코드(`invalid_status` 등)로 응답해 클라이언트가 번역한다. 상품명·고객명 등 DB 데이터는 일본어 그대로다.

## 실행

```sh
npm install
npm start
```

`http://localhost:3000`. 포트는 `PORT` 환경변수(기본 3000).

- `DATABASE_URL` 없음: in-memory로 동작한다.
- `DATABASE_URL` 있음: PostgreSQL을 사용한다.

```sh
DATABASE_URL=postgres://<USER>:<PASSWORD>@<HOST>:5432/<DB> npm start
```

## 데이터 초기화

**프로세스가 시작될 때마다** `products`, `orders` 테이블을 DROP 후 재생성하고 더미 데이터(상품 24개, 주문 100건, 최근 30일)를 넣는다. 배포하면 항상 같은 초기 상태가 된다.

- 더미 데이터는 고정 시드로 생성되어 매번 동일하다. 주문 시각만 기동 시각 기준으로 다시 계산된다.
- 초기화가 끝난 뒤에야 포트를 열기 때문에, 초기화가 끝나기 전에는 요청을 받지 않는다. 실패하면 프로세스가 종료된다(exit 1).
- 여러 인스턴스가 동시에 기동해도 advisory lock으로 초기화를 직렬화한다.
- **주의:** 오토스케일링이나 재시작으로 인스턴스가 새로 뜰 때도 초기화된다. 해당 DB를 다른 용도로 쓰지 않는다.

시드 데이터 자체 검증: `node seed.js`

## API

상품은 CRUD 전체, 주문은 조회와 상태 변경만 제공한다. 화면의 토스트에 호출한 HTTP 메서드와 경로가 표시된다.

| Method | Path | 설명 |
| --- | --- | --- |
| `GET` | `/api/dashboard` | KPI, 일별 매출(14일), 상태별 건수, 매출 Top 5, 재고 경고 |
| `GET` | `/api/orders` | 주문 목록(최신순) |
| `PATCH` | `/api/orders/:id` | `{ "status": "pending\|preparing\|shipped\|delivered\|cancelled" }` |
| `GET` | `/api/products` | 상품 목록(최신순) + 카테고리 목록 |
| `POST` | `/api/products` | 상품 등록 `{ name, category, price, stock }` → `201` |
| `PUT` | `/api/products/:id` | 상품 수정(전체 필드) |
| `DELETE` | `/api/products/:id` | 상품 삭제 → `204`. 주문은 `product_name`을 따로 저장하므로 이력이 유지된다 |
| `GET` | `/health` | 상태·DB 연결·호스트명. DB 장애 시 `503` (LB 헬스체크용) |

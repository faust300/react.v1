export const ordersSummary = [
  { label: '신규 주문', value: '36건', description: '오늘 09:00 이후 접수' },
  { label: '배송 준비', value: '18건', description: '송장 발급 대기' },
  { label: '교환/환불', value: '7건', description: '처리 우선 순위 필요' },
]

export const ordersTable = [
  {
    id: 'ord-1001',
    orderNo: '20260414-1001',
    customer: '김서윤',
    product: '프리미엄 노트북 파우치',
    amount: '₩49,000',
    status: '결제 완료',
    date: '2026-04-14 09:12',
  },
  {
    id: 'ord-1002',
    orderNo: '20260414-1002',
    customer: '이준호',
    product: '무선 키보드',
    amount: '₩89,000',
    status: '배송 준비',
    date: '2026-04-14 09:34',
  },
  {
    id: 'ord-1003',
    orderNo: '20260414-1003',
    customer: '박민지',
    product: '27인치 모니터',
    amount: '₩279,000',
    status: '배송 중',
    date: '2026-04-14 10:01',
  },
  {
    id: 'ord-1004',
    orderNo: '20260414-1004',
    customer: '최유진',
    product: 'USB-C 허브',
    amount: '₩39,000',
    status: '환불 요청',
    date: '2026-04-14 10:28',
  },
]

export const membersSummary = [
  { label: '전체 회원', value: '12,480명', description: '이번 달 5.1% 증가' },
  { label: '휴면 예정', value: '214명', description: '30일 내 리텐션 대상' },
  { label: 'VIP 회원', value: '138명', description: '월 3회 이상 구매' },
]

export const membersTable = [
  {
    id: 'mem-01',
    name: '김하늘',
    email: 'sky@adminspace.kr',
    grade: 'VIP',
    orders: '28회',
    joinedAt: '2025-11-02',
    status: '활성',
  },
  {
    id: 'mem-02',
    name: '정지우',
    email: 'jiwoo@adminspace.kr',
    grade: 'Gold',
    orders: '12회',
    joinedAt: '2026-01-17',
    status: '활성',
  },
  {
    id: 'mem-03',
    name: '한도윤',
    email: 'doyun@adminspace.kr',
    grade: 'Basic',
    orders: '2회',
    joinedAt: '2026-03-04',
    status: '휴면 예정',
  },
  {
    id: 'mem-04',
    name: '오세린',
    email: 'serin@adminspace.kr',
    grade: 'Gold',
    orders: '9회',
    joinedAt: '2025-12-28',
    status: '주의',
  },
]

export const productsSummary = [
  { label: '판매 중 상품', value: '248개', description: '품절 제외 기준' },
  { label: '품절 임박', value: '14개', description: '재입고 검토 필요' },
  { label: '노출 중단', value: '9개', description: '운영 검수 대기' },
]

export const productsTable = [
  {
    id: 'prd-01',
    name: '프리미엄 노트북 파우치',
    category: '액세서리',
    stock: '42',
    price: '₩49,000',
    sales: '1,284',
    status: '판매 중',
  },
  {
    id: 'prd-02',
    name: '무선 키보드',
    category: '입력장치',
    stock: '8',
    price: '₩89,000',
    sales: '842',
    status: '품절 임박',
  },
  {
    id: 'prd-03',
    name: '27인치 모니터',
    category: '디스플레이',
    stock: '0',
    price: '₩279,000',
    sales: '315',
    status: '재입고 예정',
  },
  {
    id: 'prd-04',
    name: 'USB-C 허브',
    category: '액세서리',
    stock: '61',
    price: '₩39,000',
    sales: '1,112',
    status: '판매 중',
  },
]

export const contentSummary = [
  { label: '게시 중 콘텐츠', value: '64개', description: '배너, 공지, 이벤트 포함' },
  { label: '예약 발행', value: '6개', description: '이번 주 공개 예정' },
  { label: '검수 필요', value: '3개', description: '승인 대기 상태' },
]

export const contentTable = [
  {
    id: 'cnt-01',
    title: '4월 봄맞이 프로모션 배너',
    type: '메인 배너',
    owner: '마케팅팀',
    schedule: '2026-04-15 00:00',
    status: '예약 발행',
  },
  {
    id: 'cnt-02',
    title: '배송 지연 안내 공지',
    type: '공지사항',
    owner: '운영팀',
    schedule: '즉시 게시',
    status: '게시 중',
  },
  {
    id: 'cnt-03',
    title: '신규 회원 쿠폰 소개',
    type: '이벤트',
    owner: '콘텐츠팀',
    schedule: '2026-04-18 10:00',
    status: '검수 필요',
  },
  {
    id: 'cnt-04',
    title: '앱 업데이트 안내',
    type: '팝업',
    owner: '브랜드팀',
    schedule: '2026-04-16 09:00',
    status: '초안',
  },
]

export const analyticsSummary = [
  { label: '주간 방문자', value: '84,210', description: '전주 대비 8.2% 증가' },
  { label: '전환율', value: '4.82%', description: '상품 상세 개선 효과' },
  { label: '장바구니 이탈', value: '18.4%', description: '결제 단계 개선 필요' },
]

export const analyticsTable = [
  {
    id: 'ana-01',
    channel: '직접 유입',
    sessions: '24,180',
    conversion: '5.4%',
    revenue: '₩18.2M',
    trend: '상승',
  },
  {
    id: 'ana-02',
    channel: '검색 광고',
    sessions: '18,920',
    conversion: '4.1%',
    revenue: '₩11.9M',
    trend: '유지',
  },
  {
    id: 'ana-03',
    channel: 'SNS 캠페인',
    sessions: '22,310',
    conversion: '3.6%',
    revenue: '₩9.7M',
    trend: '상승',
  },
  {
    id: 'ana-04',
    channel: '이메일',
    sessions: '7,840',
    conversion: '6.2%',
    revenue: '₩6.4M',
    trend: '하락',
  },
]

export const settingsSummary = [
  { label: '활성 관리자', value: '12명', description: '이번 주 접속 기준' },
  { label: '권한 요청', value: '4건', description: '검토 대기 중' },
  { label: '연동 서비스', value: '7개', description: '정상 연결 상태' },
]

export const settingsTable = [
  {
    id: 'set-01',
    category: '권한 관리',
    item: '운영 매니저 계정 추가',
    owner: '김운영',
    updatedAt: '2026-04-14 08:20',
    status: '승인 필요',
  },
  {
    id: 'set-02',
    category: '알림 설정',
    item: '주문 실패 슬랙 알림',
    owner: '시스템',
    updatedAt: '2026-04-14 07:42',
    status: '사용 중',
  },
  {
    id: 'set-03',
    category: '결제 연동',
    item: 'PG사 키 갱신',
    owner: '개발팀',
    updatedAt: '2026-04-13 18:10',
    status: '점검 예정',
  },
  {
    id: 'set-04',
    category: '보안 정책',
    item: '관리자 2단계 인증',
    owner: '보안팀',
    updatedAt: '2026-04-12 13:25',
    status: '사용 중',
  },
]

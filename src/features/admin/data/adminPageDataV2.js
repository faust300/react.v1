const CUSTOMER_NAMES = ['김서윤', '이준호', '박민지', '최유진', '정하늘', '오세린', '한도윤', '윤지후', '서민아', '임주원']
const MEMBER_NAMES = ['김하늘', '정지우', '한도윤', '오세린', '이서준', '박유나', '최도현', '송지민', '윤서아', '강민준']
const PRODUCT_NAMES = [
  '프리미엄 노트북 파우치',
  '무선 키보드',
  '27인치 모니터',
  'USB-C 허브',
  '블루투스 마우스',
  '듀얼 모니터 암',
  '기계식 키보드',
  '노이즈 캔슬링 헤드셋',
]
const PRODUCT_CATEGORIES = ['액세서리', '입력장치', '디스플레이', '오디오']
const CONTENT_TITLES = ['봄맞이 프로모션 배너', '배송 지연 안내 공지', '신규 회원 쿠폰 소개', '앱 업데이트 안내', '주말 한정 할인전', '리뷰 이벤트 팝업']
const CONTENT_TYPES = ['메인 배너', '공지사항', '이벤트', '팝업']
const TEAM_NAMES = ['운영팀', '마케팅팀', '콘텐츠팀', '브랜드팀']
const CHANNELS = ['웹', '앱']
const ORDER_STATUS = ['결제 완료', '배송 준비', '배송 중', '환불 요청']
const MEMBER_STATUS = ['활성', '활성', '활성', '휴면 예정', '주의']
const MEMBER_GRADES = ['VIP', 'Gold', 'Basic', 'Gold']
const PRODUCT_STATUS = ['판매 중', '판매 중', '품절 임박', '재입고 예정']
const CONTENT_STATUS = ['게시 중', '예약 발행', '검수 필요', '초안']
const ANALYTICS_CHANNELS = ['직접 유입', '검색 광고', 'SNS 캠페인', '이메일', '제휴 링크']
const ANALYTICS_TRENDS = ['상승', '유지', '상승', '하락']
const SETTINGS_CATEGORIES = ['권한 관리', '알림 설정', '결제 연동', '보안 정책']
const SETTINGS_STATUS = ['승인 필요', '사용 중', '점검 예정', '사용 중']

function pad(value, length = 2) {
  return String(value).padStart(length, '0')
}

function formatCurrency(value) {
  return `₩${value.toLocaleString()}`
}

function cycle(list, index) {
  return list[index % list.length]
}

function formatDate(day, hour, minute) {
  return `2026-04-${pad(day)} ${pad(hour)}:${pad(minute)}`
}

function createRange(count, mapper) {
  return Array.from({ length: count }, (_, index) => mapper(index))
}

export const ordersSummary = [
  { label: '신규 주문', value: '128건', description: '오늘 09:00 이후 접수' },
  { label: '배송 준비', value: '48건', description: '송장 발급 대기' },
  { label: '교환 / 환불', value: '12건', description: '우선 확인 필요' },
]

export const ordersRows = createRange(100, (index) => {
  const status = cycle(ORDER_STATUS, index)
  const amount = 29000 + (index % 8) * 15000
  return {
    id: `ord-${1001 + index}`,
    orderNo: `20260414-${1001 + index}`,
    customer: cycle(CUSTOMER_NAMES, index),
    product: cycle(PRODUCT_NAMES, index),
    amount: formatCurrency(amount),
    status,
    date: formatDate((index % 14) + 1, 9 + (index % 10), (index * 7) % 60),
    channel: cycle(CHANNELS, index),
    address: `서울시 강남구 테헤란로 ${10 + index}`,
    payment: index % 3 === 0 ? '카드 결제' : index % 3 === 1 ? '간편 결제' : '무통장 입금',
    memo: status === '환불 요청' ? '제품 불량 접수' : status === '배송 준비' ? '오늘 출고 예정' : '일반 주문',
  }
})

export const membersSummary = [
  { label: '전체 회원', value: '12,480명', description: '이번 달 5.1% 증가' },
  { label: '휴면 예정', value: '214명', description: '리텐션 캠페인 대상' },
  { label: 'VIP 회원', value: '138명', description: '월 3회 이상 구매' },
]

export const membersRows = createRange(100, (index) => {
  const status = cycle(MEMBER_STATUS, index)
  const grade = cycle(MEMBER_GRADES, index)
  return {
    id: `mem-${pad(index + 1)}`,
    name: cycle(MEMBER_NAMES, index),
    email: `member${index + 1}@adminspace.kr`,
    grade,
    orders: `${(index % 28) + 1}회`,
    joinedAt: `2026-${pad((index % 4) + 1)}-${pad((index % 27) + 1)}`,
    status,
    phone: `010-${pad(1200 + index, 4)}-${pad(4300 + index, 4)}`,
    marketing: index % 4 === 0 ? '미동의' : '동의',
    lastVisit: formatDate((index % 14) + 1, 8 + (index % 12), (index * 5) % 60),
    memo: status === '휴면 예정' ? '리텐션 메시지 대상' : status === '주의' ? '반복 환불 이력 있음' : '일반 회원',
  }
})

export const productsSummary = [
  { label: '판매 중 상품', value: '248개', description: '품절 제외 기준' },
  { label: '품절 임박', value: '14개', description: '재입고 검토 필요' },
  { label: '노출 중단', value: '9개', description: '운영 검수 대기' },
]

export const productsRows = createRange(100, (index) => {
  const status = cycle(PRODUCT_STATUS, index)
  const price = 19000 + (index % 9) * 20000
  return {
    id: `prd-${pad(index + 1)}`,
    name: `${cycle(PRODUCT_NAMES, index)} ${index + 1}`,
    category: cycle(PRODUCT_CATEGORIES, index),
    stock: String((index * 7) % 84),
    price: formatCurrency(price),
    sales: (300 + index * 13).toLocaleString(),
    status,
    sku: `SKU-${pad(index + 1, 4)}`,
    supplier: cycle(['오피스랩', '타이핑웍스', '비주얼텍', '모바일기어'], index),
    updatedAt: formatDate((index % 14) + 1, 7 + (index % 9), (index * 6) % 60),
    memo: status === '품절 임박' ? '금주 재입고 예정' : status === '재입고 예정' ? '사전 알림 등록자 많음' : '정상 판매 중',
  }
})

export const contentSummary = [
  { label: '게시 중 콘텐츠', value: '64개', description: '배너, 공지, 이벤트 포함' },
  { label: '예약 발행', value: '6개', description: '이번 주 공개 예정' },
  { label: '검수 필요', value: '3개', description: '승인 대기 상태' },
]

export const contentRows = createRange(100, (index) => {
  const status = cycle(CONTENT_STATUS, index)
  return {
    id: `cnt-${pad(index + 1)}`,
    title: `${cycle(CONTENT_TITLES, index)} ${index + 1}`,
    type: cycle(CONTENT_TYPES, index),
    owner: cycle(TEAM_NAMES, index),
    schedule: index % 4 === 0 ? '즉시 게시' : formatDate((index % 14) + 1, 10 + (index % 8), (index * 4) % 60),
    status,
    channel: index % 3 === 0 ? '웹 / 앱' : cycle(CHANNELS, index),
    updatedAt: formatDate((index % 14) + 1, 8 + (index % 10), (index * 3) % 60),
    approver: cycle(['브랜드 리드', '운영 관리자', '마케팅 매니저', '미지정'], index),
    memo: status === '검수 필요' ? '배너 문구 재검토 필요' : status === '예약 발행' ? '타이밍 최종 검수 예정' : '정상 운영 콘텐츠',
  }
})

export const analyticsSummary = [
  { label: '주간 방문자', value: '84,210', description: '전주 대비 8.2% 증가' },
  { label: '전환율', value: '4.82%', description: '상품 상세 개선 효과' },
  { label: '장바구니 이탈', value: '18.4%', description: '결제 단계 개선 필요' },
]

export const analyticsRows = createRange(100, (index) => {
  const sessions = 7000 + index * 231
  const conversion = (3.1 + ((index % 12) * 0.23)).toFixed(1)
  const revenue = 4.2 + index * 0.18
  return {
    id: `ana-${pad(index + 1)}`,
    channel: `${cycle(ANALYTICS_CHANNELS, index)} ${index + 1}`,
    sessions: sessions.toLocaleString(),
    conversion: `${conversion}%`,
    revenue: `₩${revenue.toFixed(1)}M`,
    trend: cycle(ANALYTICS_TRENDS, index),
    bounce: `${(16 + (index % 18) * 0.8).toFixed(1)}%`,
    avgTime: `${pad(2 + (index % 4))}:${pad((index * 7) % 60)}`,
    campaign: cycle(['브랜드 검색', '상품 확장 캠페인', '봄맞이 해시태그', 'VIP 리텐션'], index),
    memo: index % 4 === 3 ? '세그먼트 재정의 검토' : '유입 효율 정상 추세',
  }
})

export const settingsSummary = [
  { label: '활성 관리자', value: '12명', description: '이번 주 접속 기준' },
  { label: '권한 요청', value: '4건', description: '검토 대기 중' },
  { label: '연동 서비스', value: '7개', description: '정상 연결 상태' },
]

export const settingsRows = createRange(100, (index) => {
  const status = cycle(SETTINGS_STATUS, index)
  return {
    id: `set-${pad(index + 1)}`,
    category: cycle(SETTINGS_CATEGORIES, index),
    item: `${cycle(['운영 매니저 계정 추가', '주문 실패 슬랙 알림', 'PG사 키 갱신', '관리자 2단계 인증'], index)} ${index + 1}`,
    owner: cycle(['김운영', '시스템', '개발팀', '보안팀'], index),
    updatedAt: formatDate((index % 14) + 1, 7 + (index % 11), (index * 8) % 60),
    status,
    scope: cycle(['주문 / 회원 관리', '운영 채널', '결제 서버', '전체 관리자'], index),
    target: index % 2 === 0 ? `ops_target_${index + 1}` : `admin_console_${index + 1}`,
    approver: cycle(['보안팀', '운영 관리자', '개발 리드', '보안 총괄'], index),
    memo: status === '승인 필요' ? '권한 검토 필요' : status === '점검 예정' ? '점검 시간 23:00 예정' : '정상 운영 중',
  }
})

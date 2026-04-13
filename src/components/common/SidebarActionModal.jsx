import { useEffect, useMemo, useState } from 'react'

function buildSectionConfig(activeItem, openItem) {
  return {
    eyebrow: 'Section Action',
    title: `${openItem.label} 섹션 설정`,
    description: `${activeItem?.title}에서 ${openItem.label} 섹션을 열기 위한 기본 옵션입니다.`,
    submitLabel: '섹션 열기',
    fields: [
      {
        key: 'sectionName',
        label: '섹션명',
        type: 'readonly',
        initialValue: openItem.label,
      },
      {
        key: 'viewMode',
        label: '보기 방식',
        type: 'select',
        options: ['기본 보기', '상세 우선', '상태별 묶음'],
        initialValue: '기본 보기',
      },
      {
        key: 'note',
        label: '작업 메모',
        type: 'textarea',
        initialValue: `${openItem.label} 섹션에서 확인할 내용을 기록합니다.`,
      },
    ],
  }
}

function buildActionConfig(activeItem, openItem) {
  const menuId = activeItem?.id
  const action = openItem.label

  const actionMap = {
    orders: {
      '송장 업로드': {
        title: '송장 업로드',
        description: '택배사와 송장 파일을 선택해 일괄 업로드합니다.',
        submitLabel: '업로드 시작',
        fields: [
          { key: 'actionName', label: '작업명', type: 'readonly', initialValue: '송장 업로드' },
          { key: 'carrier', label: '택배사', type: 'select', options: ['CJ대한통운', '한진택배', '로젠택배'], initialValue: 'CJ대한통운' },
          { key: 'invoiceFile', label: '송장 파일', type: 'file', accept: '.csv,.xlsx' },
          { key: 'memo', label: '업로드 메모', type: 'textarea', initialValue: '업로드 전 주문 상태를 한 번 더 확인합니다.' },
        ],
      },
      '주문 내보내기': {
        title: '주문 내보내기',
        description: '기간과 상태를 지정해 주문 데이터를 파일로 추출합니다.',
        submitLabel: '내보내기',
        fields: [
          { key: 'actionName', label: '작업명', type: 'readonly', initialValue: '주문 내보내기' },
          { key: 'period', label: '조회 기간', type: 'select', options: ['오늘', '최근 7일', '최근 30일'], initialValue: '최근 7일' },
          { key: 'status', label: '주문 상태', type: 'select', options: ['전체', '결제 완료', '배송 준비', '배송 중'], initialValue: '전체' },
          { key: 'format', label: '파일 형식', type: 'select', options: ['CSV', 'XLSX'], initialValue: 'CSV' },
        ],
      },
      '지연 주문 확인': {
        title: '지연 주문 확인',
        description: '출고 예정 시간을 넘긴 주문만 빠르게 추려 확인합니다.',
        submitLabel: '지연 주문 보기',
        fields: [
          { key: 'actionName', label: '작업명', type: 'readonly', initialValue: '지연 주문 확인' },
          { key: 'delayRange', label: '지연 기준', type: 'select', options: ['2시간 이상', '6시간 이상', '24시간 이상'], initialValue: '6시간 이상' },
          { key: 'priority', label: '우선 정렬', type: 'select', options: ['오래된 순', '금액 높은 순'], initialValue: '오래된 순' },
        ],
      },
    },
    members: {
      '회원 추가': {
        title: '회원 추가',
        description: '신규 회원 정보를 입력하고 기본 등급을 지정합니다.',
        submitLabel: '회원 생성',
        fields: [
          { key: 'actionName', label: '작업명', type: 'readonly', initialValue: '회원 추가' },
          { key: 'name', label: '회원명', type: 'text', initialValue: '' },
          { key: 'email', label: '이메일', type: 'text', initialValue: '' },
          { key: 'grade', label: '기본 등급', type: 'select', options: ['Basic', 'Gold', 'VIP'], initialValue: 'Basic' },
        ],
      },
      '등급 조정': {
        title: '등급 조정',
        description: '대상 회원의 등급을 변경하고 사유를 기록합니다.',
        submitLabel: '등급 변경',
        fields: [
          { key: 'actionName', label: '작업명', type: 'readonly', initialValue: '등급 조정' },
          { key: 'memberTarget', label: '대상 회원', type: 'text', initialValue: '' },
          { key: 'nextGrade', label: '변경 등급', type: 'select', options: ['Basic', 'Gold', 'VIP'], initialValue: 'Gold' },
          { key: 'reason', label: '변경 사유', type: 'textarea', initialValue: '' },
        ],
      },
      '휴면 알림 발송': {
        title: '휴면 알림 발송',
        description: '휴면 예정 회원에게 안내 메시지를 발송합니다.',
        submitLabel: '알림 발송',
        fields: [
          { key: 'actionName', label: '작업명', type: 'readonly', initialValue: '휴면 알림 발송' },
          { key: 'audience', label: '발송 대상', type: 'select', options: ['전체 휴면 예정', '최근 30일 미접속'], initialValue: '전체 휴면 예정' },
          { key: 'channel', label: '발송 채널', type: 'select', options: ['이메일', 'SMS', '앱 푸시'], initialValue: '이메일' },
          { key: 'message', label: '메시지 메모', type: 'textarea', initialValue: '혜택 포함 여부를 검토합니다.' },
        ],
      },
    },
    products: {
      '상품 등록': {
        title: '상품 등록',
        description: '신규 상품의 기본 정보를 입력합니다.',
        submitLabel: '상품 등록',
        fields: [
          { key: 'actionName', label: '작업명', type: 'readonly', initialValue: '상품 등록' },
          { key: 'productName', label: '상품명', type: 'text', initialValue: '' },
          { key: 'category', label: '카테고리', type: 'select', options: ['액세서리', '입력장치', '디스플레이', '오디오'], initialValue: '액세서리' },
          { key: 'price', label: '판매가', type: 'text', initialValue: '' },
        ],
      },
      '재고 수정': {
        title: '재고 수정',
        description: '대상 상품과 수량 조정값을 입력합니다.',
        submitLabel: '재고 반영',
        fields: [
          { key: 'actionName', label: '작업명', type: 'readonly', initialValue: '재고 수정' },
          { key: 'sku', label: '상품 SKU', type: 'text', initialValue: '' },
          { key: 'adjustment', label: '조정 수량', type: 'text', initialValue: '' },
          { key: 'reason', label: '조정 사유', type: 'textarea', initialValue: '' },
        ],
      },
      '진열 순서 변경': {
        title: '진열 순서 변경',
        description: '진열 그룹과 반영 범위를 선택해 순서를 변경합니다.',
        submitLabel: '순서 반영',
        fields: [
          { key: 'actionName', label: '작업명', type: 'readonly', initialValue: '진열 순서 변경' },
          { key: 'displayGroup', label: '진열 그룹', type: 'select', options: ['메인', '카테고리', '추천 상품'], initialValue: '메인' },
          { key: 'targetCount', label: '대상 수량', type: 'select', options: ['10개', '20개', '50개'], initialValue: '20개' },
        ],
      },
    },
    content: {
      '콘텐츠 작성': {
        title: '콘텐츠 작성',
        description: '콘텐츠 유형과 게시 채널을 선택해 초안을 생성합니다.',
        submitLabel: '초안 생성',
        fields: [
          { key: 'actionName', label: '작업명', type: 'readonly', initialValue: '콘텐츠 작성' },
          { key: 'contentType', label: '유형', type: 'select', options: ['메인 배너', '공지사항', '이벤트', '팝업'], initialValue: '메인 배너' },
          { key: 'channel', label: '게시 채널', type: 'select', options: ['웹', '앱', '웹 / 앱'], initialValue: '웹 / 앱' },
          { key: 'title', label: '콘텐츠 제목', type: 'text', initialValue: '' },
        ],
      },
      '예약 발행': {
        title: '예약 발행',
        description: '발행 대상과 공개 일정을 지정합니다.',
        submitLabel: '예약 저장',
        fields: [
          { key: 'actionName', label: '작업명', type: 'readonly', initialValue: '예약 발행' },
          { key: 'targetContent', label: '대상 콘텐츠', type: 'text', initialValue: '' },
          { key: 'publishAt', label: '발행 일정', type: 'text', initialValue: '2026-04-20 09:00' },
          { key: 'note', label: '발행 메모', type: 'textarea', initialValue: '' },
        ],
      },
      '검수 요청': {
        title: '검수 요청',
        description: '검수자와 요청 우선순위를 설정합니다.',
        submitLabel: '검수 요청',
        fields: [
          { key: 'actionName', label: '작업명', type: 'readonly', initialValue: '검수 요청' },
          { key: 'reviewer', label: '검수자', type: 'text', initialValue: '브랜드 리드' },
          { key: 'priority', label: '우선순위', type: 'select', options: ['보통', '높음', '긴급'], initialValue: '보통' },
          { key: 'note', label: '검수 메모', type: 'textarea', initialValue: '' },
        ],
      },
    },
    analytics: {
      '리포트 생성': {
        title: '리포트 생성',
        description: '리포트 기간과 형식을 선택해 생성합니다.',
        submitLabel: '리포트 생성',
        fields: [
          { key: 'actionName', label: '작업명', type: 'readonly', initialValue: '리포트 생성' },
          { key: 'range', label: '분석 기간', type: 'select', options: ['오늘', '최근 7일', '최근 30일'], initialValue: '최근 7일' },
          { key: 'format', label: '출력 형식', type: 'select', options: ['PDF', 'CSV', 'XLSX'], initialValue: 'PDF' },
          { key: 'metric', label: '중점 지표', type: 'select', options: ['매출', '전환율', '유입 채널'], initialValue: '매출' },
        ],
      },
      'CSV 다운로드': {
        title: 'CSV 다운로드',
        description: '다운로드 대상 데이터와 포함 컬럼을 선택합니다.',
        submitLabel: 'CSV 다운로드',
        fields: [
          { key: 'actionName', label: '작업명', type: 'readonly', initialValue: 'CSV 다운로드' },
          { key: 'dataset', label: '데이터셋', type: 'select', options: ['채널 성과', '세션 추이', '전환 상세'], initialValue: '채널 성과' },
          { key: 'columns', label: '포함 항목', type: 'textarea', initialValue: '채널, 세션 수, 전환율, 매출' },
        ],
      },
      '주간 비교': {
        title: '주간 비교',
        description: '비교 기준 주차와 기준 지표를 선택합니다.',
        submitLabel: '비교 보기',
        fields: [
          { key: 'actionName', label: '작업명', type: 'readonly', initialValue: '주간 비교' },
          { key: 'baseline', label: '기준 주차', type: 'select', options: ['이번 주 vs 지난 주', '지난 주 vs 전전 주'], initialValue: '이번 주 vs 지난 주' },
          { key: 'metric', label: '비교 지표', type: 'select', options: ['매출', '전환율', '세션 수'], initialValue: '매출' },
        ],
      },
    },
    settings: {
      '권한 승인': {
        title: '권한 승인',
        description: '승인 대상과 권한 레벨을 확인하고 반영합니다.',
        submitLabel: '승인 반영',
        fields: [
          { key: 'actionName', label: '작업명', type: 'readonly', initialValue: '권한 승인' },
          { key: 'targetUser', label: '대상 계정', type: 'text', initialValue: 'ops_manager_04' },
          { key: 'role', label: '권한 레벨', type: 'select', options: ['조회', '운영', '관리자'], initialValue: '운영' },
          { key: 'reason', label: '승인 메모', type: 'textarea', initialValue: '' },
        ],
      },
      '알림 테스트': {
        title: '알림 테스트',
        description: '알림 채널과 테스트 대상을 선택합니다.',
        submitLabel: '테스트 발송',
        fields: [
          { key: 'actionName', label: '작업명', type: 'readonly', initialValue: '알림 테스트' },
          { key: 'channel', label: '채널', type: 'select', options: ['이메일', 'Slack', 'SMS'], initialValue: 'Slack' },
          { key: 'target', label: '대상', type: 'text', initialValue: '#ops-alert' },
          { key: 'message', label: '테스트 메모', type: 'textarea', initialValue: '운영 테스트 메시지 전송' },
        ],
      },
      '보안 점검': {
        title: '보안 점검',
        description: '점검 범위와 체크 모드를 선택합니다.',
        submitLabel: '점검 시작',
        fields: [
          { key: 'actionName', label: '작업명', type: 'readonly', initialValue: '보안 점검' },
          { key: 'scope', label: '점검 범위', type: 'select', options: ['전체 관리자', '권한 정책', '로그인 이력'], initialValue: '전체 관리자' },
          { key: 'mode', label: '점검 모드', type: 'select', options: ['빠른 점검', '전체 점검'], initialValue: '빠른 점검' },
        ],
      },
    },
    dashboard: {
      '보고서 보기': {
        title: '보고서 보기',
        description: '대시보드 보고서 범위와 표시 방식을 선택합니다.',
        submitLabel: '보고서 열기',
        fields: [
          { key: 'actionName', label: '작업명', type: 'readonly', initialValue: '보고서 보기' },
          { key: 'range', label: '조회 범위', type: 'select', options: ['오늘', '이번 주', '이번 달'], initialValue: '이번 주' },
          { key: 'layout', label: '표시 방식', type: 'select', options: ['요약', '상세', '차트 중심'], initialValue: '요약' },
        ],
      },
      '알림 확인': {
        title: '알림 확인',
        description: '알림 우선순위와 범위를 선택합니다.',
        submitLabel: '알림 열기',
        fields: [
          { key: 'actionName', label: '작업명', type: 'readonly', initialValue: '알림 확인' },
          { key: 'priority', label: '우선순위', type: 'select', options: ['전체', '긴급', '일반'], initialValue: '전체' },
          { key: 'scope', label: '알림 범위', type: 'select', options: ['운영', '주문', '회원'], initialValue: '운영' },
        ],
      },
      '운영 브리핑': {
        title: '운영 브리핑',
        description: '브리핑 범위와 공유 대상을 선택합니다.',
        submitLabel: '브리핑 생성',
        fields: [
          { key: 'actionName', label: '작업명', type: 'readonly', initialValue: '운영 브리핑' },
          { key: 'summaryRange', label: '브리핑 범위', type: 'select', options: ['오늘', '최근 3일', '이번 주'], initialValue: '오늘' },
          { key: 'recipient', label: '공유 대상', type: 'select', options: ['운영팀', '리더십', '전체 관리자'], initialValue: '운영팀' },
        ],
      },
    },
  }

  return actionMap[menuId]?.[action] ?? {
    title: `${action} 실행`,
    description: `${action} 작업에 필요한 기본 설정을 입력합니다.`,
    submitLabel: '작업 실행',
    fields: [
      { key: 'actionName', label: '작업명', type: 'readonly', initialValue: action },
      { key: 'memo', label: '실행 메모', type: 'textarea', initialValue: '' },
    ],
  }
}

function buildConfig(openItem, activeItem) {
  return openItem.kind === 'section'
    ? buildSectionConfig(activeItem, openItem)
    : buildActionConfig(activeItem, openItem)
}

function renderField(field, formState, setFormState) {
  const value = formState[field.key] ?? ''

  if (field.type === 'readonly') {
    return (
      <label key={field.key} className="sidebar-form-field">
        <span>{field.label}</span>
        <input type="text" value={value} readOnly className="is-readonly" />
      </label>
    )
  }

  if (field.type === 'select') {
    return (
      <label key={field.key} className="sidebar-form-field">
        <span>{field.label}</span>
        <select
          value={value}
          onChange={(event) =>
            setFormState((current) => ({ ...current, [field.key]: event.target.value }))
          }
        >
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    )
  }

  if (field.type === 'file') {
    return (
      <label key={field.key} className="sidebar-form-field">
        <span>{field.label}</span>
        <input
          type="file"
          accept={field.accept}
          onChange={(event) =>
            setFormState((current) => ({
              ...current,
              [field.key]: event.target.files?.[0]?.name ?? '',
            }))
          }
        />
        <small className="sidebar-field-help">
          {value ? `선택된 파일: ${value}` : '업로드할 파일을 선택하세요.'}
        </small>
      </label>
    )
  }

  if (field.type === 'textarea') {
    return (
      <label key={field.key} className="sidebar-form-field">
        <span>{field.label}</span>
        <textarea
          rows={4}
          value={value}
          onChange={(event) =>
            setFormState((current) => ({ ...current, [field.key]: event.target.value }))
          }
        />
      </label>
    )
  }

  return (
    <label key={field.key} className="sidebar-form-field">
      <span>{field.label}</span>
      <input
        type="text"
        value={value}
        onChange={(event) =>
          setFormState((current) => ({ ...current, [field.key]: event.target.value }))
        }
      />
    </label>
  )
}

export function SidebarActionModal({ openItem, activeItem, onClose }) {
  const config = useMemo(
    () => (openItem ? buildConfig(openItem, activeItem) : null),
    [activeItem, openItem],
  )
  const [formState, setFormState] = useState({})

  useEffect(() => {
    if (!openItem || !config) {
      setFormState({})
      return
    }

    setFormState(
      config.fields.reduce(
        (accumulator, field) => ({ ...accumulator, [field.key]: field.initialValue ?? '' }),
        {},
      ),
    )
  }, [config, openItem])

  if (!openItem || !config) {
    return null
  }

  return (
    <div className="sidebar-modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="sidebar-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sidebar-modal-title"
      >
        <div className="sidebar-modal-header">
          <div>
            <p className="eyebrow">{config.eyebrow}</p>
            <h3 id="sidebar-modal-title">{config.title}</h3>
          </div>
          <button type="button" className="drawer-close-button" onClick={onClose}>
            닫기
          </button>
        </div>

        <div className="sidebar-modal-body">
          <div className="sidebar-modal-card">
            <span>기능 설명</span>
            <strong>{config.description}</strong>
          </div>

          <div className="sidebar-modal-form">
            {config.fields.map((field) => renderField(field, formState, setFormState))}
          </div>
        </div>

        <div className="sidebar-modal-footer">
          <button type="button" className="secondary-button" onClick={onClose}>
            취소
          </button>
          <button type="button" className="primary-button" onClick={onClose}>
            {config.submitLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

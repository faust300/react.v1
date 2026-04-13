export function HeroPanel() {
  return (
    <section className="hero-panel">
      <div>
        <p className="eyebrow">실시간 상태</p>
        <h2>이번 주 운영 지표가 안정적으로 유지되고 있어요.</h2>
        <p className="hero-copy">
          주문 처리 속도와 고객 응답 시간이 모두 개선되고 있습니다. 오늘은 미처리 문의와
          재고 부족 상품만 우선 확인하면 됩니다.
        </p>
      </div>

      <div className="hero-metrics">
        <div>
          <span>평균 응답 시간</span>
          <strong>12분</strong>
        </div>
        <div>
          <span>주간 전환율</span>
          <strong>4.82%</strong>
        </div>
      </div>
    </section>
  )
}

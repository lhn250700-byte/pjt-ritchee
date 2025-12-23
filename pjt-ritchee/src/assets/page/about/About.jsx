import React from 'react';

function About() {
  const textStyle = { fontSize: 'clamp(14px, 3vw, 20px)' };

  const mobileTexts = [
    '릿치는 구로구 주민들의 치아 건강 증진을 위해 구로구청의 지원으로 제작된 어플리케이션입니다.',
    '치아 건강은 일상생활의 질을 결정짓는 중요한 요소이지만, 개인마다 필요한 정보와 치과 선택 기준이 달라 올바른 선택이 쉽지 않아 이러한 문제를 해결하기 위해 주변 치과 정보와 전문적인 상담 내용을 한눈에 확인할 수 있도록 구성되었습니다.',
    '또한, 실제 이용자들의 솔직하고 생생한 후기를 제공하여 치과 선택에 대한 신뢰도를 높이고, 미리 경험을 참고할 수 있게 합니다.',
    '사용자들은 릿치를 통해 치과 위치, 진료 과목, 예약 가능 여부 등의 실시간 정보를 확인하고, 자신에게 맞는 최적의 치과를 선택할 수 있습니다. 구로구청과 함께 제작된 릿치는 주민들의 편리한 접근성과 건강한 치아 관리 생활을 돕기 위해 계속해서 업데이트 되고 발전하는 구로구 맞춤형 치아 관리 플랫폼입니다.',
  ];

  const tabletTexts = [
    '릿치는 구로구 주민들의 치아 건강 증진을 위해 구로구청의 지원으로 개발된 지역 맞춤형 치아 관리 플랫폼입니다. 다양한 치과 정보를 한곳에서 확인할 수 있어 사용자가 보다 쉽게 자신에게 맞는 진료 환경을 찾을 수 있도록 돕습니다.',
    '플랫폼에서는 치과 위치, 진료 과목, 운영 시간, 예약 가능 여부 등의 핵심 정보를 실시간으로 제공하며, 실제 이용자들의 생생한 후기까지 함께 확인할 수 있어 보다 신뢰도 높은 선택이 가능합니다.',
    '또한 릿치는 장기적인 치아 건강 관리를 위해 전문가가 검토한 구강관리 가이드와 생활 속 치아 건강 팁 등 유용한 정보를 꾸준히 업데이트하고 있습니다.',
    '태블릿 환경에서는 모바일보다 넓어진 화면을 활용하여 치과 비교 정보와 후기 콘텐츠를 더욱 보기 좋게 배치해 사용자들이 편리하게 필요한 정보를 찾을 수 있도록 구성했습니다.',
    '앞으로도 릿치는 구로구 주민들에게 정확하고 신뢰할 수 있는 치과 정보를 제공하기 위해 꾸준히 업데이트하며, 보다 편리한 기능과 맞춤형 안내 서비스를 확대해 나갈 예정입니다.',
  ];

  const pcTexts = [
    '릿치는 구로구 주민들의 치아 건강 증진을 목표로, 구로구청의 지원 아래 개발된 지역 특화 치아 관리 플랫폼입니다.',
    '구강 건강은 일상생활의 편안함과 삶의 질을 결정짓는 핵심 요소임에도 불구하고, 개인마다 필요로 하는 정보가 다르며 치과 선택 기준 또한 매우 다양해 자신에게 맞는 진료 환경을 찾는 것이 쉽지 않은 현실입니다. 많은 주민들은 진료 과목, 비용, 의료진 전문성, 예약 여건, 실제 이용 후기와 같은 중요한 정보를 한 번에 비교하기 어려워 치과 선택 과정에서 불편을 겪어 왔습니다. 릿치는 이러한 문제를 해결하기 위해 신뢰 기반의 치과 정보와 전문가 상담 콘텐츠를 통합 제공하는 플랫폼으로 기획되었습니다.',
    '구로구 내 치과의 위치, 진료 과목, 운영 시간, 예약 가능 여부 등 실질적이고 정확한 정보를 실시간으로 확인할 수 있으며, 각 치과의 분위기와 진료 만족도를 파악할 수 있는 지역 주민들의 생생한 이용 후기도 함께 제공됩니다. 이러한 정보를 바탕으로 사용자는 단순히 거리나 외관 위주가 아닌, 자신의 상황과 치료 목적에 가장 적합한 의료 서비스를 선택할 수 있는 환경을 갖추게 됩니다.',
    '또한 릿치는 단기적인 치과 방문 정보뿐 아니라, 주민들의 장기적인 치아 건강 관리를 지원하기 위한 다양한 콘텐츠도 지속적으로 업데이트하고 있습니다. 전문가가 검토한 구강관리 가이드, 생활 속 치아 건강 팁 등 일상생활에 유용한 정보들을 꾸준히 제공하여 구강 질환을 예방하고 건강한 치아 습관을 형성하는 데 도움을 줍니다.',
    '더불어 플랫폼은 사용자가 필요한 정보를 쉽게 찾고 이해할 수 있도록 직관적인 구조와 깔끔한 화면 구성으로 디자인되어 있으며, PC 환경에서는 보다 많은 정보를 한눈에 확인할 수 있도록 시각적 요소와 콘텐츠 배치를 확장했습니다. 이를 통해 사용자들은 여러 치과의 정보를 편리하게 비교하고, 개인에게 맞는 선택을 더욱 정확하게 진행할 수 있습니다.',
    '구로구청과 함께 만들어가는 릿치는 앞으로도 더욱 정확하고 최신의 정보를 제공하기 위해 데이터 업데이트를 지속적으로 강화하고, 보다 편리한 기능을 도입해 나갈 예정입니다. 향후 치과별 상세 진료비 정보, 의료 접근성을 높이기 위한 추천 시스템, 사용자 맞춤 안내 기능 등 다양한 서비스 확장을 계획하고 있으며, 이를 통해 주민들이 안심하고 이용할 수 있는 지역 의료 플랫폼으로 자리 잡고자 합니다.',
    '릿치는 단순한 정보 제공을 넘어, 구로구 주민들의 안전하고 편리한 치과 이용 경험을 적극적으로 지원하고 건강한 치아 관리 문화를 조성하기 위해 지속적으로 발전하는 플랫폼이 될 것입니다.',
  ];

  return (
    <>
      <div>
        <div className="w-full relative overflow-hidden myBg">
          <img
            src="https://uosmaiisnppqgxbcbawc.supabase.co/storage/v1/object/public/images/about.jpg"
            alt="img"
            className="w-full h-full object-cover object-center block md:hidden"
          />
          <div className='w-full lg:h-[50vh] hidden md:block xl:hidden'>
            <img
              src="https://uosmaiisnppqgxbcbawc.supabase.co/storage/v1/object/public/images/pabout.jpg"
              alt="img"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full xl:h-[60vh] 2xl:h-[70vh] hidden xl:block">
            <img
              src="https://uosmaiisnppqgxbcbawc.supabase.co/storage/v1/object/public/images/pabout.jpg"
              alt="img"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* gap-[5px] -> gap-[1.28vw], mt-[50px] -> mt-[5.88vh] mb-5 -> mb-[2.35vh]*/}
        <div className="container">
          <div className="mt-[5.88vh] mb-[2.35vh] flex items-center gap-[1.28vw]">
            <i className="fa-solid fa-tooth md:text-2xl lg:text-4xl xl:text-5xl text-deep"></i>
            <h4 className="text-deep" style={{ fontSize: 'clamp(20px, 3vw, 28px)' }}>
              구로구 리뷰 치과 릿치!
            </h4>
          </div>

          {/* 모바일 소개글 */}
          <div className="mb-[5.88vh] block md:hidden space-y-4">
            {mobileTexts.map((text, i) => (
              <p key={i} style={textStyle}>
                {text}
              </p>
            ))}
          </div>

          {/* 태블릿 소개글 */}
          <div className="mb-[5.88vh] hidden md:block xl:hidden space-y-5">
            {tabletTexts.map((text, i) => (
              <p key={i} style={textStyle}>
                {text}
              </p>
            ))}
          </div>

          {/* pc 소개글 */}
          <div className="mb-[5.88vh] hidden xl:block space-y-6">
            {pcTexts.map((text, i) => (
              <p key={i} style={textStyle}>
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default About;

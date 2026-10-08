export const departmentMap = {
  '도로 파손': { department: 'Demo 도로관리팀', reason: '신고 유형이 도로 파손으로 분류되어 도로 및 포장 관련 업무를 담당하는 부서로 추천했습니다.' },
  '불법 주정차': { department: 'Demo 교통관리팀', reason: '신고 유형이 불법 주정차로 분류되어 교통 단속 및 주차 질서 업무를 담당하는 부서로 추천했습니다.' },
  '시설물 파손': { department: 'Demo 시설관리팀', reason: '신고 유형이 시설물 파손으로 분류되어 공공시설물 정비 업무를 담당하는 부서로 추천했습니다.' },
  '침수·배수 문제': { department: 'Demo 물관리팀', reason: '신고 유형이 침수·배수 문제로 분류되어 수자원 및 배수 시설 관리 부서로 추천했습니다.' },
};

const mk = (o) => ({ reassignmentHistory: [], reassignmentCount: 0, deadlineExceeded: false, managerAttention: false, ...o });

export const initialReportsData = [
  mk({
    id: 'YJ-001', category: '도로 파손', riskLevel: 'HIGH',
    image: 'https://placehold.co/600x400/fef2f2/dc2626?text=Demo+Road+Damage',
    maskedImage: 'https://placehold.co/600x400/fef2f2/dc2626?text=Demo+Road+Damage+(Protected)',
    location: '경기도 양주시 덕정동 123-4',
    description: '양주시 덕정동 도로 표면에 큰 균열이 확인되어 안전사고가 우려됩니다.',
    aiReason: '- 도로 표면의 파손이 확인됨\n- 보행자 및 차량 통행에 영향을 줄 가능성이 있음',
    recommendedDepartment: 'Demo 도로관리팀', currentDepartment: '미지정', status: 'RECEIVED',
    reporter: { name: '홍*동', phone: '010-****-1234' }, createdAt: '2026-10-06 09:15',
  }),
  mk({
    id: 'YJ-002', category: '침수·배수 문제', riskLevel: 'HIGH',
    image: 'https://placehold.co/600x400/eff6ff/2563eb?text=Demo+Flooding',
    maskedImage: 'https://placehold.co/600x400/eff6ff/2563eb?text=Demo+Flooding+(Protected)',
    location: '경기도 양주시 회천로 150',
    description: '양주시 회천로 일대 배수 불량 및 물고임 현상이 발생하여 점검이 필요합니다.',
    aiReason: '- 물 고임 또는 배수 문제가 확인되어 보행자 및 시설물 안전에 영향을 줄 가능성이 있음',
    recommendedDepartment: 'Demo 물관리팀', currentDepartment: 'Demo 물관리팀', status: 'ASSIGNED',
    reassignmentHistory: [{ from: '미지정', to: 'Demo 물관리팀', changedAt: '2026-10-06 08:45' }],
    reporter: { name: '김*수', phone: '010-****-5678' }, createdAt: '2026-10-06 08:30',
  }),
  mk({
    id: 'YJ-003', category: '불법 주정차', riskLevel: 'MEDIUM',
    image: 'https://placehold.co/600x400/fffbeb/d97706?text=Demo+Illegal+Parking',
    maskedImage: 'https://placehold.co/600x400/fffbeb/d97706?text=Demo+Illegal+Parking+(Protected)',
    location: '경기도 양주시 고읍동 456',
    description: '소화전 반경 5m 이내 불법 주정차 차량으로 인해 통행에 지장을 줍니다.',
    aiReason: '- 차량이 통행 공간을 점유하고 있어 보행 및 차량 통행에 영향을 줄 가능성이 있음',
    recommendedDepartment: 'Demo 교통관리팀', currentDepartment: 'Demo 교통관리팀', status: 'PROCESSING',
    reassignmentHistory: [
      { from: '미지정', to: 'Demo 시설관리팀', changedAt: '2026-10-05 18:00' },
      { from: 'Demo 시설관리팀', to: 'Demo 교통관리팀', changedAt: '2026-10-05 18:30' },
    ],
    reassignmentCount: 1,
    reporter: { name: '이*영', phone: '010-****-9012' }, createdAt: '2026-10-05 17:40',
  }),
  mk({
    id: 'YJ-004', category: '시설물 파손', riskLevel: 'LOW',
    image: 'https://placehold.co/600x400/f0fdf4/059669?text=Demo+Facility+Damage',
    maskedImage: 'https://placehold.co/600x400/f0fdf4/059669?text=Demo+Facility+Damage+(Protected)',
    location: '경기도 양주시 광적면 덕도리',
    description: '공공 벤치 및 울타리 시설물 일부가 파손되어 정비가 필요합니다.',
    aiReason: '- 시설물의 일부가 파손된 상태로 확인됨',
    recommendedDepartment: 'Demo 시설관리팀', currentDepartment: 'Demo 시설관리팀', status: 'COMPLETED',
    reporter: { name: '박*준', phone: '010-****-3456' }, createdAt: '2026-10-04 14:20',
  }),
  mk({
    id: 'PING-PONG-DEMO', category: '도로 파손', riskLevel: 'HIGH',
    image: 'https://placehold.co/600x400/fef2f2/dc2626?text=Ping+Pong+Demo',
    maskedImage: 'https://placehold.co/600x400/fef2f2/dc2626?text=Ping+Pong+Demo+(Protected)',
    location: '경기도 양주시 백석읍 호수로',
    description: '반복되는 부서 이관으로 처리가 지연되고 있는 도로 파손 민원입니다.',
    aiReason: '- 도로 표면 파손 및 핑퐁 민원 테스트용 데이터',
    recommendedDepartment: 'Demo 도로관리팀', currentDepartment: 'Demo 교통관리팀', status: 'PROCESSING',
    reassignmentHistory: [
      { from: '미지정', to: 'Demo 도로관리팀', changedAt: '2026-10-03 10:10' },
      { from: 'Demo 도로관리팀', to: 'Demo 시설관리팀', changedAt: '2026-10-04 10:15' },
      { from: 'Demo 시설관리팀', to: 'Demo 교통관리팀', changedAt: '2026-10-05 10:22' },
    ],
    reassignmentCount: 2, managerAttention: true,
    reporter: { name: '오*민', phone: '010-****-4321' }, createdAt: '2026-10-03 10:00',
  }),
];

export const initialPipeline = {
  originalImage: null, autoMaskedImage: null, manualMasks: [], maskedImage: null,
  pipelineStatus: 'IDLE', location: '경기도 양주시 회천로 150 (덕정동)', description: '',
  selectedScenarioKey: 'road_damage', aiResult: null, hasDetectedFaces: true,
};

export const aiScenarios = {
  road_damage: {
    category: '도로 파손', riskLevel: 'HIGH', riskLabel: '높음',
    riskBadgeColor: 'bg-red-100 text-red-800 border-red-300',
    defaultImageUrl: 'https://placehold.co/600x400/fef2f2/dc2626?text=Test+01:+Road+Damage+(Faces+Detected)',
    hasFaces: true,
    aiReason: '- 도로 표면의 파손이 확인됨\n- 보행자 및 차량 통행에 영향을 줄 가능성이 있음',
    draftContent: '양주시 덕정동 도로에서 파손이 확인되었습니다. 보행자와 차량의 안전사고가 우려됩니다.',
  },
  illegal_parking: {
    category: '불법 주정차', riskLevel: 'MEDIUM', riskLabel: '보통',
    riskBadgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    defaultImageUrl: 'https://placehold.co/600x400/fffbeb/d97706?text=Test+02:+Illegal+Parking+(No+Faces+Detected)',
    hasFaces: false,
    aiReason: '- 차량이 통행 공간을 점유하고 있어 보행 및 차량 통행에 영향을 줄 가능성이 있음',
    draftContent: '양주시 덕정동 도로변에 차량이 불법 주정차되어 있어 통행에 지장을 줍니다.',
  },
  facility_damage: {
    category: '시설물 파손', riskLevel: 'LOW', riskLabel: '낮음',
    riskBadgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    defaultImageUrl: 'https://placehold.co/600x400/f0fdf4/059669?text=Test+03:+Facility+Damage+(Faces+Detected)',
    hasFaces: true,
    aiReason: '- 시설물의 일부가 파손된 상태로 확인됨',
    draftContent: '양주시 덕정동 인근 공공 시설물 파손이 확인되어 정비가 필요합니다.',
  },
  flooding: {
    category: '침수·배수 문제', riskLevel: 'HIGH', riskLabel: '높음',
    riskBadgeColor: 'bg-red-100 text-red-800 border-red-300',
    defaultImageUrl: 'https://placehold.co/600x400/eff6ff/2563eb?text=Test+04:+Flooding+(No+Faces+Detected)',
    hasFaces: false,
    aiReason: '- 물 고임 또는 배수 문제가 확인되어 보행자 및 시설물 안전에 영향을 줄 가능성이 있음',
    draftContent: '양주시 덕정동 일대 배수 불량 및 침수 우려 지역 점검 및 조치가 필요합니다.',
  },
};

export const fraudTestScenarios = {
  prosecutor: '서울중앙지검입니다. 귀하의 계좌가 범죄에 연루되었습니다. 즉시 아래 링크에 접속하여 확인하지 않으면 법적 조치가 진행됩니다. https://example.com/verify',
  bank: 'OO은행입니다. 고객님의 계좌에 이상 거래가 발생했습니다. 본인 확인을 위해 주민등록번호와 계좌 비밀번호를 입력해주세요.',
  benefit: '고객님께 새로운 특별 지원금 혜택이 도착했습니다. 아래 링크에서 확인하세요. https://yangju-support.kr',
  normal: '오늘 저녁 7시에 덕정역 근처 식당에서 만나기로 한 것 잊지 마세요!',
};

export const needsAttention = (r) => r.reassignmentCount >= 2 || r.deadlineExceeded === true;

export function analyzeFraudMessage(text) {
  const hasUrl = /https?:\/\/|www\./i.test(text);
  const rules = [
    { id: 'institution_impersonation', name: '기관 사칭', detected: /검찰|경찰|법원|금융기관|은행|카드사|공공기관/i.test(text), reason: '공공기관 또는 금융기관을 사칭하는 표현이 발견되었습니다.', w: 2 },
    { id: 'urgency', name: '긴급성/압박', detected: /즉시|지금|오늘까지|긴급|계좌가 정지됩니다|체포됩니다|법적 조치/i.test(text), reason: '사용자에게 즉각적인 대응을 압박하는 표현이 포함되어 있습니다.', w: 2 },
    { id: 'personal_info', name: '개인정보 요구', detected: /주민등록번호|계좌번호|비밀번호|인증번호|OTP|카드정보/i.test(text), reason: '민감한 개인정보나 금융 인증정보를 요구하는 표현이 있습니다.', w: 3 },
    { id: 'remittance', name: '송금/결제 요구', detected: /송금|입금|이체|결제|보증금|수수료|지원금/i.test(text), reason: '금전적 송금이나 결제를 유도하는 표현이 있습니다.', w: 3 },
    { id: 'url_detected', name: 'URL 포함', detected: hasUrl, reason: '메시지 내에 외부 링크(URL)가 포함되어 있습니다.', w: 2 },
  ];
  const score = rules.reduce((s, r) => s + (r.detected ? r.w : 0), 0);
  const riskLevel = score >= 6 ? 'HIGH' : score >= 3 ? 'MEDIUM' : 'LOW';
  const aiResults = riskLevel === 'HIGH'
    ? '기관 또는 금융사를 사칭하여 불안감과 긴급성을 유발한 뒤, 외부 링크 접속이나 민감 정보 입력을 유도하는 전형적인 피싱 사기 수법으로 분석됩니다.'
    : riskLevel === 'MEDIUM'
    ? '혜택 또는 비정상 거래를 빌미로 주의를 환기하고 있으나, 추가 확인이 필요한 의심 요소가 포함되어 있습니다.'
    : '일반적인 일상 대화 또는 특별한 위험 신호가 감지되지 않은 메시지입니다. (단, 안전을 100% 보장하지는 않습니다)';
  return {
    riskLevel, riskScore: score, ruleResults: rules, aiResults,
    detectedUrls: hasUrl ? text.match(/https?:\/\/[^\s]+|www\.[^\s]+/gi) || [] : [],
  };
}

export const getStatusLabel = (s) => ({ RECEIVED: '접수', ASSIGNED: '부서 배정', PROCESSING: '처리 중', COMPLETED: '완료' }[s] || '접수');
export const getRiskLabel = (r) => ({ HIGH: '높음', MEDIUM: '보통', LOW: '낮음' }[r] || '보통');
export const getRiskBadgeClass = (r) => ({
  HIGH: 'bg-red-100 text-red-800 border border-red-300',
  MEDIUM: 'bg-amber-100 text-amber-800 border border-amber-300',
  LOW: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
}[r] || 'bg-slate-100 text-slate-800 border border-slate-300');

export const screenMeta = {
  SELECT_MODE: ['모드 선택', '양주 생활안전 원스톱 서비스 데모'],
  'C-01': ['시민 홈', '신고는 한 번에, 사기는 먼저'],
  'C-02': ['사진 신고', '생활안전 현장 사진 파일 선택'],
  'C-03': ['개인정보 보호', '자동 블러 및 직접 마스킹 검토'],
  'C-04': ['AI 분석 결과', 'AI가 현장을 요약합니다 (maskedImage 전용)'],
  'C-05': ['신고 내용 확인', '최종 제출 전 확인'],
  'C-06': ['나의 신고 내역', '접수된 민원 및 처리 상태'],
  'C-07': ['의심 메시지 입력', '금융사기 예방 진단'],
  'C-08': ['금융사기 위험 신호등', '위험 신호등 및 행동 요령'],
  'A-01': ['민원 관리', '양주시 통합 민원 관리 대시보드'],
  'A-02': ['민원 상세', '신고 및 AI 분석 상세 검토'],
  'A-03': ['담당 부서 지정', '민원 처리 부서 배정 및 이관'],
};
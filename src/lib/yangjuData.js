export const getStatusLabel = (s) => ({ RECEIVED: '접수', ASSIGNED: '부서 배정', PROCESSING: '처리 중', COMPLETED: '완료' }[s] || '접수');
export const getRiskLabel = (r) => ({ HIGH: '높음', MEDIUM: '보통', LOW: '낮음' }[r] || '보통');
export const getRiskBadgeClass = (r) => ({
  HIGH: 'bg-red-100 text-red-800 border border-red-300',
  MEDIUM: 'bg-amber-100 text-amber-800 border border-amber-300',
  LOW: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
}[r] || 'bg-slate-100 text-slate-800 border border-slate-300');

export const departmentMap = {
  '도로 파손': { department: 'Demo 도로관리팀', reason: '신고 유형이 도로 파손으로 분류되어 도로 및 포장 관련 업무를 담당하는 부서로 추천했습니다.' },
  '불법 주정차': { department: 'Demo 교통관리팀', reason: '신고 유형이 불법 주정차로 분류되어 교통 단속 및 주차 질서 업무를 담당하는 부서로 추천했습니다.' },
  '시설물 파손': { department: 'Demo 시설관리팀', reason: '신고 유형이 시설물 파손으로 분류되어 공공시설물 정비 업무를 담당하는 부서로 추천했습니다.' },
  '침수·배수 문제': { department: 'Demo 물관리팀', reason: '신고 유형이 침수·배수 문제로 분류되어 수자원 및 배수 시설 관리 부서로 추천했습니다.' },
  '환경 문제': { department: 'Demo 환경관리팀', reason: '신고 유형이 환경 문제로 분류되어 생활환경 및 불법투기 단속 부서로 추천했습니다.' },
  '안전 시설': { department: 'Demo 안전시설팀', reason: '신고 유형이 안전 시설로 분류되어 도로 안전 시설물 정비 부서로 추천했습니다.' },
};

// 6개 유형 × 세부 18개 항목
const scenarioList = [
  ['road_damage', '도로 파손', '도로 표면 파손', 'HIGH', 'fef2f2/dc2626', true, '- 도로 표면의 파손이 확인됨\n- 보행자 및 차량 통행에 영향을 줄 가능성이 있음', '양주시 덕정동 도로에서 파손이 확인되었습니다. 보행자와 차량의 안전사고가 우려됩니다.'],
  ['pothole', '도로 파손', '포트홀', 'HIGH', 'fef2f2/dc2626', false, '- 도로에 깊은 구멍(포트홀)이 확인됨\n- 차량 통행 시 사고 위험 존재', '양주시 덕정동 도로에 포트홀이 확인되어 차량 사고 위험이 있습니다.'],
  ['sidewalk', '도로 파손', '보도 파손', 'MEDIUM', 'fef2f2/dc2626', true, '- 보도 일부가 파손되어 보행 안전에 영향', '양주시 덕정동 인근 보도가 파손되어 보행자 안전에 주의가 필요합니다.'],
  ['illegal_parking', '불법 주정차', '불법 주정차', 'MEDIUM', 'fffbeb/d97706', false, '- 차량이 통행 공간을 점유하고 있어 보행 및 차량 통행에 영향을 줄 가능성이 있음', '양주시 덕정동 도로변에 차량이 불법 주정차되어 있어 통행에 지장을 줍니다.'],
  ['traffic_signal', '불법 주정차', '신호등 고장', 'HIGH', 'fffbeb/d97706', false, '- 신호등이 정상 동작하지 않아 교차로 통행 위험 존재', '양주시 덕정동 교차로 신호등이 고장 나 교통사고 위험이 있습니다.'],
  ['sign_damage', '불법 주정차', '교통 표지 파손', 'LOW', 'fffbeb/d97706', false, '- 교통 표지판이 파손되어 안내 기능 저하', '양주시 덕정동 인근 교통 표지판이 파손되어 교통 안내에 지장이 있습니다.'],
  ['facility_damage', '시설물 파손', '공공 시설물 파손', 'LOW', 'f0fdf4/059669', true, '- 시설물의 일부가 파손된 상태로 확인됨', '양주시 덕정동 인근 공공 시설물 파손이 확인되어 정비가 필요합니다.'],
  ['streetlight', '시설물 파손', '가로등 고장', 'MEDIUM', 'f0fdf4/059669', false, '- 가로등이 점등되지 않아 야간 보행 안전 저하', '양주시 덕정동 가로등이 고장 나 야간 보행자 안전에 주의가 필요합니다.'],
  ['park_facility', '시설물 파손', '공원 시설 파손', 'LOW', 'f0fdf4/059669', true, '- 공원 내 시설물 파손 확인', '양주시 덕정동 공원 시설물이 파손되어 이용자 안전에 주의가 필요합니다.'],
  ['flooding', '침수·배수 문제', '침수', 'HIGH', 'eff6ff/2563eb', false, '- 물 고임 또는 배수 문제가 확인되어 보행자 및 시설물 안전에 영향을 줄 가능성이 있음', '양주시 덕정동 일대 배수 불량 및 침수 우려 지역 점검 및 조치가 필요합니다.'],
  ['drainage', '침수·배수 문제', '배수 불량', 'MEDIUM', 'eff6ff/2563eb', false, '- 배수구 정비 불량으로 물고임 우려', '양주시 덕정동 배수구 불량으로 우천 시 물고임 우려가 있습니다.'],
  ['stream_overflow', '침수·배수 문제', '하천 범람', 'HIGH', 'eff6ff/2563eb', false, '- 하천 수위 상승 및 범람 가능성 존재', '양주시 덕정동 인근 하천 수위 상승으로 범람 우려가 있어 점검이 필요합니다.'],
  ['illegal_dumping', '환경 문제', '불법 투기', 'LOW', 'f7fee7/65a30d', false, '- 지정된 장소 외 쓰레기 적치 확인', '양주시 덕정동 인근에 쓰레기가 불법 투기되어 정비가 필요합니다.'],
  ['odor', '환경 문제', '악취/오염', 'MEDIUM', 'f7fee7/65a30d', false, '- 악취 또는 오염원 확인', '양주시 덕정동 일대 악취 발생으로 주민 불편 및 환경 정비가 필요합니다.'],
  ['hazardous', '환경 문제', '유해물질', 'HIGH', 'f7fee7/65a30d', false, '- 유해 물질이 의심되어 즉시 조치 필요', '양주시 덕정동 인근 유해 물질 의심 물건이 확인되어 즉시 조치가 필요합니다.'],
  ['guardrail', '안전 시설', '가드레일 파손', 'MEDIUM', 'f1f5f9/475569', false, '- 가드레일 파손으로 추락/충돌 위험 존재', '양주시 덕정동 인근 가드레일이 파손되어 안전사고 위험이 있습니다.'],
  ['manhole', '안전 시설', '맨홀 파손', 'HIGH', 'f1f5f9/475569', true, '- 맨홀 뚜껑 파손 또는 이탈로 추락 위험 존재', '양주시 덕정동 도로 맨홀 뚜껑이 파손되어 추락 사고 위험이 있습니다.'],
  ['construction', '안전 시설', '공사장 위험', 'HIGH', 'f1f5f9/475569', true, '- 공사장 안전 조치 불량으로 보행자 노출 우려', '양주시 덕정동 인근 공사장 안전 조치가 불량하여 보행자 안전에 주의가 필요합니다.'],
];

export const aiScenarios = Object.fromEntries(
  scenarioList.map(([id, group, sub, risk, color, hasFaces, reason, draft], i) => [
    id,
    {
      category: group, subCategory: sub, riskLevel: risk, riskLabel: getRiskLabel(risk),
      riskBadgeColor: getRiskBadgeClass(risk),
      defaultImageUrl: `https://placehold.co/600x400/${color}?text=${encodeURIComponent(sub + ' (Demo)')}`,
      hasFaces, aiReason: reason, draftContent: draft,
      recommendedDepartment: (departmentMap[group] || { department: 'Demo 종합민원팀' }).department,
      confidence: 82 + (i % 13),
    },
  ])
);

export const scenarioGroups = () => {
  const g = {};
  Object.entries(aiScenarios).forEach(([k, v]) => { (g[v.category] ||= []).push([k, v]); });
  return g;
};

export const suggestAlternatives = (currentKey) => {
  const cur = aiScenarios[currentKey];
  if (!cur) return [];
  const others = Object.entries(aiScenarios).filter(([, v]) => v.category !== cur.category);
  const byGroup = {};
  others.forEach(([k, v]) => { (byGroup[v.category] ||= []).push(k); });
  return Object.values(byGroup).map((arr) => arr[0]).slice(0, 3);
};

export const riskUpgradeReasons = (ctx = {}) => {
  const r = [];
  if (ctx.childZone) r.push('어린이보호구역 인근');
  if (ctx.night) r.push('야간 시간대');
  if (ctx.rain) r.push('비 예보/강수');
  if (ctx.elderly) r.push('노인 보행 많은 구역');
  return r;
};
export const applyRiskUpgrade = (baseLevel, ctx = {}) => {
  const reasons = riskUpgradeReasons(ctx);
  if (reasons.length === 0) return { level: baseLevel, reasons: [], upgraded: false };
  const order = { LOW: 1, MEDIUM: 2, HIGH: 3 };
  const bumped = order[baseLevel] >= 3 ? 'HIGH' : { 1: 'MEDIUM', 2: 'HIGH' }[order[baseLevel]];
  return { level: bumped, reasons, upgraded: bumped !== baseLevel };
};

// AI 분류 결과(pipeline.aiResult)가 있으면用它, 없으면 선택된 시나리오의 정적 데이터 사용
export const resolveClassification = (pipeline) => {
  const ai = pipeline?.aiResult;
  if (ai && ai.subCategory) {
    const risk = ai.riskLevel || 'MEDIUM';
    return {
      category: ai.category,
      subCategory: ai.subCategory,
      riskLevel: risk,
      riskLabel: getRiskLabel(risk),
      riskBadgeColor: getRiskBadgeClass(risk),
      draftContent: ai.draftContent || '',
      aiReason: ai.reasoning || '',
      confidence: ai.confidence ?? null,
      recommendedDepartment: (departmentMap[ai.category] || { department: 'Demo 종합민원팀' }).department,
    };
  }
  return aiScenarios[pipeline?.selectedScenarioKey] || aiScenarios.road_damage;
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
  riskContext: { childZone: false, night: false, rain: false, elderly: false },
};

export const fraudTestScenarios = {
  prosecutor: '서울중앙지검입니다. 귀하의 계좌가 범죄에 연루되었습니다. 즉시 아래 링크에 접속하여 확인하지 않으면 법적 조치가 진행됩니다. https://example.com/verify',
  bank: 'OO은행입니다. 고객님의 계좌에 이상 거래가 발생했습니다. 본인 확인을 위해 주민등록번호와 계좌 비밀번호를 입력해주세요.',
  benefit: '고객님께 새로운 특별 지원금 혜택이 도착했습니다. 아래 링크에서 확인하세요. https://yangju-support.kr',
  messenger: '엄마 나 폰 고장났어 ㅠㅠ 번호 바뀌었어. 급한데 상품권 50만원어치 사서 보내줄 수 있어? 빨리 보내줘 ㅠㅠ',
  normal: '오늘 저녁 7시에 덕정역 근처 식당에서 만나기로 한 것 잊지 마세요!',
};

export const needsAttention = (r) => r.reassignmentCount >= 2 || r.deadlineExceeded === true;

export function analyzeFraudMessage(text) {
  const hasUrl = /https?:\/\/|www\./i.test(text);
  const rules = [
    { id: 'institution_impersonation', name: '기관 사칭', detected: /검찰|경찰|법원|금융기관|은행|카드사|공공기관/i.test(text), reason: '공공기관 또는 금융기관을 사칭하는 표현이 발견되었습니다.', w: 2 },
    { id: 'urgency', name: '긴급성/압박', detected: /즉시|지금|오늘까지|긴급|계좌가 정지됩니다|체포됩니다|법적 조치|빨리|급해/i.test(text), reason: '사용자에게 즉각적인 대응을 압박하는 표현이 포함되어 있습니다.', w: 2 },
    { id: 'personal_info', name: '개인정보 요구', detected: /주민등록번호|계좌번호|비밀번호|인증번호|OTP|카드정보/i.test(text), reason: '민감한 개인정보나 금융 인증정보를 요구하는 표현이 있습니다.', w: 3 },
    { id: 'remittance', name: '송금/결제 요구', detected: /송금|입금|이체|결제|보증금|수수료|지원금|상품권|기프트카드/i.test(text), reason: '금전적 송금이나 결제를 유도하는 표현이 있습니다.', w: 3 },
    { id: 'url_detected', name: 'URL 포함', detected: hasUrl, reason: '메시지 내에 외부 링크(URL)가 포함되어 있습니다.', w: 2 },
    { id: 'messenger_impersonation', name: '메신저 가족 사칭', detected: /(엄마|엄니|아빠|나\s*폰|폰\s*고장|번호\s*바뀌|번호가\s*바뀌|기기\s*교체|폰\s*망가)/i.test(text), reason: '가족 또는 지인을 사칭해 새 번호에서 긴급 송금을 유도하는 메신저 피싱 수법입니다.', w: 3 },
  ];
  const score = rules.reduce((s, r) => s + (r.detected ? r.w : 0), 0);
  const riskLevel = score >= 6 ? 'HIGH' : score >= 3 ? 'MEDIUM' : 'LOW';
  const aiResults = riskLevel === 'HIGH'
    ? '기관 또는 금융사를 사칭하거나 가족을 사칭하여 불안감과 긴급성을 유발한 뒤, 외부 링크 접속이나 민감 정보 입력·송금을 유도하는 전형적인 피싱 사기 수법으로 분석됩니다.'
    : riskLevel === 'MEDIUM'
    ? '혜택 또는 비정상 거래를 빌미로 주의를 환기하고 있으나, 추가 확인이 필요한 의심 요소가 포함되어 있습니다.'
    : '일반적인 일상 대화 또는 특별한 위험 신호가 감지되지 않은 메시지입니다. (단, 안전을 100% 보장하지는 않습니다)';
  return {
    riskLevel, riskScore: score, ruleResults: rules, aiResults,
    detectedUrls: hasUrl ? text.match(/https?:\/\/[^\s]+|www\.[^\s]+/gi) || [] : [],
  };
}

export const detectScheme = (text) => {
  if (/엄마|엄니|아빠|폰\s*고장|번호\s*바뀌|상품권|기프트카드/i.test(text)) return { scheme: '메신저 가족 사칭', desc: '가족을 사칭해 새 번호에서 급송금·상품권을 요구하는 수법' };
  if (/검찰|경찰|법원|검사|경위|수사/i.test(text)) return { scheme: '수사기관 사칭', desc: '검찰·경찰 등 수사기관을 사칭해 협박하는 수법' };
  if (/은행|금융|카드사|계좌/i.test(text)) return { scheme: '금융기관 사칭', desc: '은행·카드사를 사칭해 개인정보를 요구하는 수법' };
  if (/지원금|혜택|지급|수령|경로/i.test(text)) return { scheme: '혜택·지원금 빙자', desc: '정부 지원금을 빙자해 링크 접속을 유도하는 수법' };
  if (/투자|수익|로또|당첨|코인|차트/i.test(text)) return { scheme: '투자·로또 빙자', desc: '고수익 투자나 당첨금을 빙자해 송금을 유도하는 수법' };
  return null;
};

export const buildCounselingMemo = ({ message, result, scheme, sender, receivedAt, actions }) => {
  const lines = [];
  lines.push(`[상담 메모] ${receivedAt}`);
  lines.push(`발신: ${sender}`);
  lines.push(`의심 수법: ${scheme ? scheme.scheme + ' - ' + scheme.desc : '특정 수법 미분류'}`);
  lines.push(`위험도: ${result.riskLevel} (${result.riskScore}점)`);
  const detected = result.ruleResults.filter((r) => r.detected).map((r) => r.name).join(', ');
  lines.push(`탐지 신호: ${detected || '없음'}`);
  if (result.detectedUrls.length) lines.push(`URL: ${result.detectedUrls.join(', ')}`);
  lines.push(`내가 한 행동: ${actions.length ? actions.join(', ') : '없음'}`);
  lines.push(`메시지 요약: ${message.slice(0, 80)}${message.length > 80 ? '...' : ''}`);
  lines.push(`AI 분석: ${result.aiResults}`);
  return lines.join('\n');
};

export const victimGuidance = (result, actions) => {
  if (actions.includes('송금/이체')) {
    return [
      { t: '수취인 계좌 정보 확보', d: '입금한 계좌번호·예금주를 메모해 두세요.' },
      { t: '즉시 은행에 지급정지 요청', d: '송금한 은행 콜센터에 연락해 지급정지를 요청하세요.' },
      { t: '경찰 112 신고', d: '사이버수사대에 피해를 접수하세요.' },
      { t: '금융감독원 1332 피해구제', d: '피해구제 절차 안내를 받으세요.' },
    ];
  }
  if (actions.includes('앱 설치')) {
    return [
      { t: '비행기 모드 전환', d: '악성앱의 외부 통신을 즉시 차단하세요.' },
      { t: '의심 앱 삭제', d: '설치한 앱과 함께 깔린 패키지 앱을 모두 삭제하세요.' },
      { t: '기기 공장 초기화 검토', d: '악성코드 잔류가 의심되면 초기화를 고려하세요.' },
      { t: 'KISA 118 신고', d: '악성앱 유포 주소를 신고하세요.' },
    ];
  }
  if (actions.includes('카드/결제 정보 입력') || actions.includes('링크 클릭')) {
    return [
      { t: '결제 내역 확인', d: '이상 결제가 있으면 즉시 결제 취소를 요청하세요.' },
      { t: '카드사/은행에 결제 정지', d: '이용 중인 카드사 콜센터에 결제를 정지하세요.' },
      { t: '개인정보 유출 점검', d: '주민번호·비밀번호 입력 이력이 있으면 변경하세요.' },
      { t: '118 / 1332 신고', d: '피해 접수 후 안내를 받으세요.' },
    ];
  }
  return [
    { t: '송금·링크 클릭 중단', d: '추가 피해가 커지지 않도록 즉시 멈추세요.' },
    { t: '공식 기관에 직접 확인', d: '발신자가 사칭일 수 있으니 공식 번호로 확인하세요.' },
    { t: '증거 보존', d: '문자·통화내역을 캡처해 두세요.' },
    { t: '112 / 118 / 1332 신고', d: '상황에 맞는 기관에 접수하세요.' },
  ];
};

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
  'C-09': ['수신 문자 모의 알림', '의심 문자 알림 시연'],
  'A-01': ['민원 관리', '양주시 통합 민원 관리 대시보드'],
  'A-02': ['민원 상세', '신고 및 AI 분석 상세 검토'],
  'A-03': ['담당 부서 지정', '민원 처리 부서 배정 및 이관'],
};
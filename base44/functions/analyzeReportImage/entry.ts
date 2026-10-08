import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

const CATEGORIES = [
  { group: '도로 파손', subs: ['도로 표면 파손', '포트홀', '보도 파손'] },
  { group: '불법 주정차', subs: ['불법 주정차', '신호등 고장', '교통 표지 파손'] },
  { group: '시설물 파손', subs: ['공공 시설물 파손', '가로등 고장', '공원 시설 파손'] },
  { group: '침수·배수 문제', subs: ['침수', '배수 불량', '하천 범람'] },
  { group: '환경 문제', subs: ['불법 투기', '악취/오염', '유해물질'] },
  { group: '안전 시설', subs: ['가드레일 파손', '맨홀 파손', '공사장 위험'] },
];

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const { imageUrl, location, description, riskContext } = body || {};
    if (!imageUrl) return Response.json({ error: 'imageUrl is required' }, { status: 400 });

    const ctxParts = [];
    if (riskContext?.childZone) ctxParts.push('어린이보호구역 인근');
    if (riskContext?.night) ctxParts.push('야간 시간대');
    if (riskContext?.rain) ctxParts.push('비 예보/강수');
    if (riskContext?.elderly) ctxParts.push('노인 보행 많은 구역');
    const ctxStr = ctxParts.length ? ctxParts.join(', ') : '없음';

    const listStr = CATEGORIES.map((c) => `- ${c.group}: ${c.subs.join(', ')}`).join('\n');

    const prompt = `당신은 양주시 생활안전 신고 접수를 보조하는 AI입니다. 첨부된 현장 사진(개인정보 마스킹 완료)을 보고 아래 작업을 수행하세요.

[분류 후보]
${listStr}

[추가 정보]
- 발생 위치: ${location || '불명'}
- 신고자 메모: ${description || '없음'}
- 상황 컨텍스트: ${ctxStr}

[작업]
1. 사진과 정보를 종합해 위 분류 후보 중 가장 적합한 세부 항목(subCategory)과 대분류(category)를 정확히 하나 선택하세요.
2. 위험도(riskLevel)를 HIGH/MEDIUM/LOW 중 하나로 평가하세요. 상황 컨텍스트(어린이보호구역, 야간, 비, 노인 구역)가 있으면 위험도를 높게 평가하세요.
3. 분류 신뢰도(confidence)를 0~100 사이 정수로 제시하세요.
4. 판단 근거(reasoning)를 한국어로 2~4줄로 작성하세요.
5. 시민이 확인 후 제출할 신고 초안(draftContent)을 한국어로 작성하세요. 위치와 상황을 반영한 간결한 문장으로 작성하세요.

반드시 지정된 JSON 스키마로만 응답하세요.`;

    const schema = {
      type: 'object',
      properties: {
        subCategory: { type: 'string', enum: CATEGORIES.flatMap((c) => c.subs) },
        category: { type: 'string', enum: CATEGORIES.map((c) => c.group) },
        riskLevel: { type: 'string', enum: ['HIGH', 'MEDIUM', 'LOW'] },
        confidence: { type: 'number' },
        reasoning: { type: 'string' },
        draftContent: { type: 'string' },
      },
      required: ['subCategory', 'category', 'riskLevel', 'confidence', 'reasoning', 'draftContent'],
    };

    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
      file_urls: [imageUrl],
      response_json_schema: schema,
    });

    return Response.json({ result });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
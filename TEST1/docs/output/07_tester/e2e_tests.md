# E2E 테스트 시나리오 — AgileFlow

## 시나리오 1: 아이디어 입력 → 파이프라인 시작
```js
test('아이디어 입력 후 파이프라인이 시작되어야 한다', async ({ page }) => {
  await page.goto('/');
  await page.fill('textarea', '반려동물 건강관리 앱');
  await page.click('button:has-text("파이프라인 시작")');
  await expect(page).toHaveURL(/\/pipeline\//);
  await expect(page.locator('[data-testid="pipeline-monitor"]')).toBeVisible();
});
```

## 시나리오 2: 에이전트 단계 진행 실시간 표시
```js
test('에이전트 완료 시 상태 배지가 업데이트되어야 한다', async ({ page }) => {
  await page.goto('/pipeline/test-project-id');
  await expect(page.locator('[data-agent="01_idea_analyst"][data-status="completed"]')).toBeVisible({ timeout: 30000 });
});
```

## 시나리오 3: 산출물 뷰어 열기
```js
test('완료된 에이전트의 산출물 보기 버튼이 동작해야 한다', async ({ page }) => {
  await page.goto('/pipeline/completed-project-id');
  await page.click('[data-testid="view-artifact-01_idea_analyst"]');
  await expect(page.locator('[data-testid="artifact-viewer"]')).toContainText('아이디어 분석 보고서');
});
```

## 시나리오 4: ZIP 다운로드
```js
test('완료된 프로젝트 전체 산출물을 ZIP으로 다운로드할 수 있어야 한다', async ({ page }) => {
  const downloadPromise = page.waitForEvent('download');
  await page.click('[data-testid="download-zip"]');
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/agileflow-.+\.zip/);
});
```

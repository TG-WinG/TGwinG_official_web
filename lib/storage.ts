// 파일 저장 추상화 (DECISIONS §4, §17).
//
// dev  → 로컬 `public/uploads/`에 기록하고 `/uploads/<key>`로 바로 접근(정적 서빙).
//        → R2 키 없이도 업로드 기능이 동작한다.
// prod → Cloudflare R2 (S3 호환 SDK). 실제 연결은 스터디 자료 업로드 단계(#16).
//
// ⚠️ 서버 전용 모듈. `components/`에서 import 금지 (#6에서 server-only + 경계 규칙).
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const DEV_UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export type StoredFile = {
  /** 저장 키 (파일명). 삭제·조회에 사용 */
  key: string;
  /** 공개 접근 URL */
  url: string;
};

/**
 * 파일을 저장하고 접근 URL을 돌려준다.
 * dev에서는 R2 키 없이 로컬에 저장하므로 온보딩 시 스토리지 세팅이 필요 없다.
 */
export async function saveUpload(
  filename: string,
  data: Buffer,
): Promise<StoredFile> {
  if (process.env.NODE_ENV === "production") {
    // TODO(#16): R2 (S3 호환 SDK)로 업로드. R2_* 환경변수 사용.
    throw new Error("R2 업로드는 아직 구현되지 않았습니다 (#16).");
  }

  await mkdir(DEV_UPLOAD_DIR, { recursive: true });
  // 파일명 충돌 방지용 prefix. (Date.now()는 앱 런타임에서 사용 — 워크플로 제약과 무관)
  const key = `${Date.now()}-${path.basename(filename)}`;
  await writeFile(path.join(DEV_UPLOAD_DIR, key), data);
  return { key, url: `/uploads/${key}` };
}

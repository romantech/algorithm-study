/* eslint-disable no-continue */

import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 대기실은 5개, 각 대기실은 5x5 크기
 * 응시자들은 맨해튼 거리 2 이하로 앉으면 안됨
 * 맨해튼 거리(두 포인트 사이의 가장 긴 경로) = |(x1 - x2)| + |(y1 - y2)|
 *
 * 응시자 둘 사이에 파티션이 있으면 맨해튼 거리 2여도 허용 e.g. P(0,0) - X(0,1) - P(0,2)
 * 응시자 둘이 사선으로 앉아 있는 경우 둘 사이에 파티션 있으면 허용 e.g. P(0,0) P(1,1) 사이에 X(1,0) X(0,1) 파티션 존재
 *
 * 응시자가 앉아있는 자리 = P
 * 빈 테이블 = O
 * 파티션 = X
 *
 * 응시자, 대기실 정보를 담은 2차원 문자열 배열 places가 매개변수로 주어졌을 때,
 * 각 대기실별로 거리두기를 지키고 있으면 1, 한 명이라도 지키지 않으면 0을 배열에 담아서 반환
 *
 */

const MAX_SIZE = 5;
const isWithinRange = (r, c) => r >= 0 && c >= 0 && r < MAX_SIZE && c < MAX_SIZE;
const getManhattanDistance = (r1, c1, r2, c2) => Math.abs(r1 - r2) + Math.abs(c1 - c2);

const STRAIGHT_DIRECTIONS = [
	[-1, 0], // 상 (거리 1)
	[1, 0], // 하 (거리 1)
	[0, -1], // 좌 (거리 1)
	[0, 1], // 우 (거리 1)
];

const DIAGONAL_DIRECTIONS = [
	[-1, -1], // 대각선 좌상 (거리 2)
	[-1, 1], // 대각선 우상 (거리 2)
	[1, -1], // 대각선 좌하 (거리 2)
	[1, 1], // 대각선 우하 (거리 2)
];

const LONG_DIRECTIONS = [
	[-2, 0], // 2칸 상 (거리 2)
	[2, 0], // 2칸 하 (거리 2)
	[0, -2], // 2칸 좌 (거리 2)
	[0, 2], // 2칸 우 (거리 2)
];

const WHOLE_DIR = [...STRAIGHT_DIRECTIONS, ...DIAGONAL_DIRECTIONS, ...LONG_DIRECTIONS];

/**
 * [반복적 접근 방식]
 */
function iterative(place) {
	// 상하좌우, 대각선, 2칸 거리의 모든 방향을 나타내는 배열

	// 5x5 격자의 각 칸을 순회
	for (let r = 0; r < MAX_SIZE; r++) {
		for (let c = 0; c < MAX_SIZE; c++) {
			// 현재 칸에 사람이 있는 경우
			if (place[r][c] === 'P') {
				// 각 방향을 순회하며 새로운 위치 계산
				for (const [dr, dc] of WHOLE_DIR) {
					const nr = r + dr;
					const nc = c + dc;
					// 새로운 위치가 유효한지 확인
					if (isWithinRange(nr, nc)) {
						// 새로운 위치에 사람이 있는지 확인
						if (place[nr][nc] === 'P') {
							const distance = Math.abs(dr) + Math.abs(dc);
							// 1칸 거리일 때 규칙 위반
							if (distance === 1) return false;
							// 2칸 거리일 때 규칙 확인
							if (distance === 2) {
								// 상하좌우로 2칸 떨어진 경우 중간에 파티션이 있어야 함
								if (dr === 0 || dc === 0) {
									// 현재 좌표가 (5,5)이고 비교하는 곳이 (5,7) 이라면 midRow=(5+5)/2=5, midCol=(5+7)/2=6
									// 중간 위치에 파티션 없으면 규칙 위반
									if (place[(r + nr) / 2][(c + nc) / 2] !== 'X') return false;
								}
								// 대각선으로 2칸 떨어진 경우 두 위치 사이에 파티션 있어야 함
								else if (place[r][nc] !== 'X' || place[nr][c] !== 'X') return false;
							}
						}
					}
				}
			}
		}
	}
	// 모든 규칙을 지킨 경우 true 반환
	return true;
}

/**
 * [bfs를 이용한 접근 방식]
 * 1. 거리 1 상하좌우 확인
 * 1-2. X면 거리 2 대각선 자리에 어떤 값이 와도 상관없으므로 OK
 * 1-3. O면, 해당 자리를 기준으로 거리 1에 P가 있으면 Not OK
 * 1-4. P면, Not OK
 *
 * {@link https://jisunshine.tistory.com/148 참고하면 좋은 글}
 */
function bfs(place) {
	const isSafeDistance = ([startRow, startCol]) => {
		const queue = [[startRow, startCol]];

		while (queue.length > 0) {
			const [r, c] = queue.shift();
			for (const [dr, dc] of STRAIGHT_DIRECTIONS) {
				const nr = dr + r;
				const nc = dc + c;

				// 범위 벗어났을 때
				if (!isWithinRange(nr, nc)) continue;
				// 이동한 곳이 시작점과 같을 때
				if (nr === startRow && nc === startCol) continue;

				const state = place[nr][nc];
				// 시작점에서 다음 지점까지의 거리
				const distance = getManhattanDistance(startRow, startCol, nr, nc);

				// 거리가 1일 때
				if (distance < 2 && state === 'O') queue.push([nr, nc]);
				// 거리가 1 혹은 2 일 때
				else if (distance <= 2 && state === 'P') return false;
			}
		}

		return true;
	};

	for (let row = 0; row < MAX_SIZE; row++) {
		for (let col = 0; col < MAX_SIZE; col++) {
			if (place[row][col] === 'P' && !isSafeDistance([row, col])) {
				return false;
			}
		}
	}

	return true;
}

export function iterativeSolution(places) {
	return places.map((place) => (iterative(place) ? 1 : 0));
}

export function bfsSolution(places) {
	return places.map((place) => (bfs(place) ? 1 : 0));
}

export const cases = [
	generateTestPair(
		[
			[
				['POOOP', 'OXXOX', 'OPXPX', 'OOXOX', 'POXXP'],
				['POOPX', 'OXPXP', 'PXXXO', 'OXXXO', 'OOOPP'],
				['PXOPX', 'OXOXP', 'OXPOX', 'OXXOP', 'PXPOX'],
				['OOOXX', 'XOOOX', 'OOOXX', 'OXOOX', 'OOOOO'],
				['PXPXP', 'XPXPX', 'PXPXP', 'XPXPX', 'PXPXP'],
			], // places
		],
		[1, 0, 1, 1, 1], // result
	),
	generateTestPair(
		[
			[
				['POOOO', 'XPOOO', 'OOOOO', 'OOOOO', 'OOOOO'],
				['OOOOO', 'OOOOO', 'OOOOO', 'OOOOO', 'OOOOO'],
				['PXOPX', 'OXOXP', 'OXPOX', 'OXXOP', 'PXPOX'],
				['OOOXX', 'XOOOX', 'OOOXX', 'OXOOX', 'OOOOO'],
				['PXPXP', 'XPXPX', 'PXPXP', 'XPXPX', 'PXPXP'],
			], // places
		],
		[0, 1, 1, 1, 1], // result
	),
];

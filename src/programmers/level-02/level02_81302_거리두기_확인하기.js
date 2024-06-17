import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 대기실은 5개, 각 대기실은 5x5 크기
 * 응시자들은 맨해튼 거리 2 이하로 앉으면 안됨
 * 맨해튼 거리(두 포인트 사이의 가장 긴 경로) = |(x1 - x2)| + |(y1 - y2)|
 * 응시자가 앉아있는 자리 사이에 파티션이 있으면 허용
 *
 * 응시자가 앉아있는 자리 = P
 * 빈 테이블 = O
 * 파티션 = X
 *
 * 응시자, 대기실 정보를 담은 2차원 문자열 배열 places가 매개변수로 주어졌을 때,
 * 각 대기실별로 거리두기를 지키고 있으면 1, 한 명이라도 지키지 않으면 0을 배열에 담아서 반환
 */

function solution(places) {
	const answer = [];
	return answer;
}

const cases = [
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
];

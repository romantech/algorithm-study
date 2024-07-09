import { generateTestPair } from '../../utils.js';

/**
 * XX 게임에는 0 이상의 정수로 표현하는 피로도 시스템이 있음.
 * 이 피로도를 이용해서 던전을 탐험할 수 있음
 * 피로도는 탐험을 시작하기 위한 "최소 필요 피로도"와 탐험을 마쳤을 때 소모되는 "소모 피로도"로 구분
 * 예를들어 최소 필요 피로도가 80, 소모 피로도가 20이면 던전을 탐험하기 위해,
 * 최소 80의 피로도가 필요하고, 던전 탐험을 마친 후 피로도 20이 소모됨
 *
 * 게임에는 하루에 한 번씩 탐험할 수 있는 던전이 여러개 있는데, 한 유저가 이 던전들을
 * 최대한 많이 탐험하려고 함. 유저의 현재 피로도 k와 각 던전별 최소 필요 피로도, 소모 피로도가 담긴
 * 2차원 배열 dungeons 가 매개변수로 주어질 때 유저가 탐험할 수 있는 최대 던전 수 반환
 *
 * [제한사항]
 * k: 1 이상 5000 이하 자연수
 * dungeons: 가로 길이 2, 세로 길이 1 이상 8 이하, 각 행은 [최소 필요 피로도, 소모 피로도]
 * 피로도: 1 이상 1000 이하 자연수
 * 최소 피로도는 항상 소모 피로도보다 크거나 같음
 * */

const getPermutation = (arr, perm = [], max = 3) => {
	if (perm.length === max) return [perm]; // result 반환 방식 맞추기 위해 배열로 반환

	const result = [];
	for (let i = 0; i < arr.length; i++) {
		const newPerm = [...perm, arr[i]];
		const rest = arr.slice(0, i).concat(arr.slice(i + 1));
		result.push(...getPermutation(rest, newPerm, max)); // result.push(...[[1, 2, 3], [1, 3, 2]])
	}

	return result;
};

function solution(k, dungeons) {
	const perms = getPermutation(dungeons, [], dungeons.length);
	let maxCount = 0;

	for (const perm of perms) {
		let currentK = k;
		let count = 0;
		for (const [requiredK, consumeK] of perm) {
			if (currentK >= requiredK) {
				currentK -= consumeK;
				count++;
			} else {
				break;
			}
		}
		maxCount = Math.max(count, maxCount);
	}

	return maxCount;
}

const cases = [
	generateTestPair(
		[
			80, // k
			[
				[80, 20], // [최소 필요 피로도, 소모 피로도]
				[50, 40],
				[30, 10],
			], // dungeons
		],
		3, // result
	),
];

console.log(solution(...cases[0].input));

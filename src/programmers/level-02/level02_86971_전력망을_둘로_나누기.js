import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * n개의 송전탑이 전선을 통해 하나의 트리 형태로 연결돼 있음
 * 이 전설들 중 하나를 끊어서 현재의 전력망 네트워크를 2개로 분할하려고 함
 * 이때 두 전력망이 갖게 되는 송전탑 개수를 최대한 비슷하게 맞추고자 함
 *
 * 송전탑 개수 n, 전선 정보 wires 가 매개변수로 주어질 때,
 * 전선들 중 하나를 끊어서 송전탑 개수가 가능한 비슷하도록 두 전략망을 나누고,
 * 두 전력망이 가지고 있는 송전탑 개수의 차이(절대값) 반환
 *
 * [제한사항]
 *  n: 송전탑 개수를 나타내는 2 이상 100 이하
 *  wires : 길이 n - 1인 정수형 2차원 배열
 *  wires 각 요소는 [v1, v2] 2개의 자연수로 이루어져 있고, 두 송전탑의 연결됨을 의미
 * */

function solution(n, wires) {
	const adjacencyList = {}; // 인접리스트

	for (const [n1, n2] of wires) {
		if (!adjacencyList[n1]) adjacencyList[n1] = [];
		if (!adjacencyList[n2]) adjacencyList[n2] = [];
		adjacencyList[n1].push(n2);
		adjacencyList[n2].push(n1);
	}

	let minDiff = n;

	const getSubtreeSizes = (rootNode, cutNode) => {
		const visited = Array(n).fill(false);
		const stack = [rootNode];
		let size = 0;

		while (stack.length > 0) {
			const now = stack.pop();
			size++;
			visited[now] = true;

			adjacencyList[now].forEach((node) => {
				if (!visited[node] && node !== cutNode) stack.push(node);
			});
		}

		return [size, n - size];
	};

	for (const [n1, n2] of wires) {
		const [size1, size2] = getSubtreeSizes(n1, n2);
		const diff = Math.abs(size1 - size2);
		minDiff = Math.min(minDiff, diff);
	}

	return minDiff;
}

const cases = [
	generateTestPair(
		[
			9,
			[
				[1, 3],
				[2, 3],
				[3, 4],
				[4, 5],
				[4, 6],
				[4, 7],
				[7, 8],
				[7, 9],
			],
		],
		3,
	),
	generateTestPair(
		[
			4,
			[
				[1, 2],
				[2, 3],
				[3, 4],
			],
		],
		0,
	),
	generateTestPair(
		[
			7,
			[
				[1, 2],
				[2, 7],
				[3, 7],
				[3, 4],
				[4, 5],
				[6, 7],
			],
		],
		1,
	),
];

cases.forEach(({ input, output }, i) => {
	const isPassed = solution(...input) === output;
	const resultMsg = isPassed ? '통과' : '실패';
	console.log(`${i + 1}번 케이스 ${resultMsg}`);
});
